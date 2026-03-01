console.log("BOOT: top-level code running");
import { createRequire } from "module";
import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cookie from "cookie";
import { BADGES } from "./engine/badges.js";
import { Server as SocketIOServer } from "socket.io";
import { pool, transaction } from "./db.js";




import profanity from "leo-profanity";

profanity.add([
  "cunt",
  "fuck",
  "shit",
  "bitch",
  "slut",
  "whore"
]);

const PROFANE_STEMS = [
  "cunt",
  "fuck",
  "shit",
  "bitch",
  "slut",
  "whore",
  "nigger",
  "nigga",
  "paki"
];

const PORT = process.env.PORT || 3001;

function normalizeForProfanity(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")                 // strip accents
    .replace(/[\u0300-\u036f]/g, "")   // remove diacritics
    .replace(/[^a-z0-9]/g, "")         // remove ALL separators, emojis, symbols
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/8/g, "b");
}

function isProfane(text) {
  if (!text) return false;

  const normalized = text.toLowerCase();

  // dictionary check
  if (profanity.check(normalized)) return true;

  // stem check (cunt -> cunty, fuck -> fucker, etc)
  return PROFANE_STEMS.some(stem => normalized.includes(stem));
}


/* =========================================================
   ENGINE IMPORTS
   ========================================================= */

import teams from "./engine/players.js";
import { generateQuestion, validateAnswer } from "./engine/engine.js";


import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FOOPY_EMAIL,
    pass: process.env.FOOPY_EMAIL_PASSWORD
  }
});


/* ---------- APP + DB ---------- */

const TEAM_CODE_TO_BADGE_ID = {
  ADE: "adel",
  BRI: "bri",
  CAR: "car",
  COL: "col",
  ESS: "ess",
  FRE: "fre",
  GCS: "gcs",
  GWS: "gws",
  GEE: "gee",
  HAW: "haw",
  MEL: "mel",
  NM: "nth",
  PA: "port",
  RIC: "ric",
  STK: "stk",
  SYD: "syd",
  WCE: "wce",
  WBD: "wbd"
};


const app = express();
app.set("trust proxy", 1);

const server = http.createServer(app);


/*
  One live socket per user.
  userId => socket
*/
const activeSocketByUser = new Map();

app.use(express.json());
app.use(cookieParser());

/* ---------- CORS ---------- */

const ALLOWED_ORIGINS = (
  process.env.FRONTEND_URLS ||
  [
    "https://www.foopy.com.au",
    "https://foopy.com.au",
    "https://foopy-server.onrender.com",
    "http://localhost:5173"
  ].join(",")
)
  .split(",")
  .map(o => o.trim());


app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server & preflight
      if (!origin) return callback(null, true);

const isAllowedVercelPreview =
  /^https:\/\/foopy-.*-paddy-rushs-projects-4465df4f\.vercel\.app$/.test(origin);

const isAllowedVercelProd =
  /^https:\/\/foopy\.vercel\.app$/.test(origin); // change if your prod domain differs

if (ALLOWED_ORIGINS.includes(origin) || isAllowedVercelPreview || isAllowedVercelProd) {
  return callback(null, true);
}

console.warn("❌ CORS blocked origin:", origin);
return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);




/* =========================================================
   ROOT + HEALTH CHECK (Render)
   ========================================================= */

app.get("/", (req, res) => {
  res.send("Foopy API is running 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


/* ---------- CONSTANTS ---------- */

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const COOKIE_NAME = "foopy_session";
const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes
const WIN_SCORE = 5;
const ROUND_SECONDS = 20;


/* ---------- USERNAME VALIDATION ---------- */

function validateUsername(rawUsername) {
  if (!rawUsername) return "Username is required";

  const username = rawUsername.trim();

  if (username.length < 3 || username.length > 16) {
    return "Username must be between 3 and 16 characters";
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only contain letters, numbers, and underscores";
  }

  if (isProfane(username)) {
    return "Username contains inappropriate language";
  }

  const collapsed = username.replace(/[_0-9]/g, "").toLowerCase();
  if (isProfane(collapsed)) {
    return "Username contains inappropriate language";
  }

  return null;
}


/* ---------- SAFE DISPLAY ---------- */

function safeDisplayUsername(name) {
  if (!name) return "Player";
  if (isProfane(name)) return "Player";
  return name;
}


const sha256 = (input) => crypto.createHash("sha256").update(input).digest("hex");

function getWeekKey(ts = Date.now()) {
  const d = new Date(ts);
  const year = d.getUTCFullYear();
  const firstJan = new Date(Date.UTC(year, 0, 1));
  const week = Math.ceil(
    (((d - firstJan) / 86400000) + firstJan.getUTCDay() + 1) / 7
  );
  return `${year}-W${String(week).padStart(2, "0")}`;
}


function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "none",               // ✅ REQUIRED
    secure: true,                   // ✅ REQUIRED on HTTPS
    maxAge: THIRTY_DAYS_MS
  });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "none",
    secure: true
  });
}



async function getSessionFromToken(token) {
  if (!token) return null;

  try {
    const tokenHash = sha256(token);
    const now = Date.now();

    const result = await pool.query(
      `SELECT user_id, token_hash
       FROM sessions
       WHERE token_hash = $1 AND expires_at > $2`,
      [tokenHash, now]
    );

    return result.rows[0] || null;
  } catch (err) {
    console.error("[SESSION LOOKUP ERROR]", err);
    return null;
  }
}


async function getUserIdFromRequest(req) {
  if (!req.cookies) return null;

  const token = req.cookies[COOKIE_NAME];
  if (!token) return null;

  const session = await getSessionFromToken(token);
  return session ? session.user_id : null;
}


async function getSessionFromCookieHeader(cookieHeader) {
  if (!cookieHeader) return null;
  const cookies = cookie.parse(cookieHeader);
  const token = cookies[COOKIE_NAME];
  return await getSessionFromToken(token);
}

function parseBadgesOwned(raw) {
  try {
    const arr = JSON.parse(raw || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function ensureEntitlementBadges(user) {
  let owned = parseBadgesOwned(user.badges_owned);
  let changed = false;


  // ---------- Founder badge ----------
  if (user.id <= 10000 && !owned.includes("founder")) {
    owned.push("founder");
    changed = true;
  }

  // ---------- Starter team badge ----------
  if (user.favourite_team) {
    const starterBadge = TEAM_CODE_TO_BADGE_ID[user.favourite_team];
    if (starterBadge && !owned.includes(starterBadge)) {
      owned.push(starterBadge);
      changed = true;
    }
  }

  return {
    badgesOwned: owned,
    changed
  };
}


/*
  Kick the currently tracked socket for this user.
  This is used on login rotation and on explicit logout.
*/
function forceLogoutUser(userId, reason = "Logged in on another device") {
  const existing = activeSocketByUser.get(userId);
  if (!existing) return;

  try {
    existing.emit("force-logout", { reason });
    existing.disconnect(true);
  } catch {
    // ignore
  }

  activeSocketByUser.delete(userId);
}

/*
  Validates that THIS socket's specific session token_hash is still valid.
*/
async function isSocketSessionStillValid(socket) {
  const now = Date.now();
  const { rows } = await pool.query(
    `SELECT 1 FROM sessions WHERE token_hash = $1 AND expires_at > $2`,
    [socket.sessionTokenHash, now]
  );
  return rows.length > 0;
}

async function refreshUserBadge(userId) {
  const { rows } = await pool.query(
    `SELECT badge_equipped FROM users WHERE id = $1`,
    [userId]
  );

  const socket = activeSocketByUser.get(userId);
  if (socket) {
    socket.badgeEquipped = rows[0]?.badge_equipped ?? null;
  }
}


/* ---------- AUTH ROUTES ---------- */


app.post("/auth/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const validationError = validateUsername(username);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    if (!password || !email) {
      return res.status(400).json({ error: "Missing password or email" });
    }

    const usernameDisplay = username.trim();
    const usernameNorm = usernameDisplay.toLowerCase();

    const emailCheck = await pool.query(
      `SELECT id FROM users WHERE lower(email) = $1`,
      [email.toLowerCase()]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const usernameCheck = await pool.query(
      `SELECT id FROM users WHERE username_norm = $1`,
      [usernameNorm]
    );

    if (usernameCheck.rows.length > 0) {
      return res.status(409).json({ error: "Username not available" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = Date.now();

    const insert = await pool.query(
      `INSERT INTO users
       (username_norm, username_display, password_hash, email, created_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [usernameNorm, usernameDisplay, passwordHash, email, now]
    );

    const userId = insert.rows[0].id;

    await pool.query(`DELETE FROM sessions WHERE user_id = $1`, [userId]);

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(token);

    await pool.query(
      `INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
       VALUES ($1, $2, $3, $4)`,
      [userId, tokenHash, now + THIRTY_DAYS_MS, now]
    );

    setSessionCookie(res, token);

    res.json({
      user: {
        id: userId,
        username: safeDisplayUsername(usernameDisplay),
        email,
        games_played: 0,
        favouriteTeam: null,
        onboarded: false,
        coins: 0,
        badgeEquipped: null
      }
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const usernameNorm = String(username || "").toLowerCase().trim();

    if (!usernameNorm || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    const result = await pool.query(
      `SELECT id, username_display, email, password_hash,
              games_played, favourite_team, onboarded,
              coins, badge_equipped
       FROM users
       WHERE username_norm = $1`,
      [usernameNorm]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    const userId = user.id;
    const now = Date.now();

    forceLogoutUser(userId, "Logged in on another device");

    await pool.query(`DELETE FROM sessions WHERE user_id = $1`, [userId]);

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(token);

    await pool.query(
      `INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
       VALUES ($1, $2, $3, $4)`,
      [userId, tokenHash, now + THIRTY_DAYS_MS, now]
    );

    setSessionCookie(res, token);

    res.json({
      user: {
        id: userId,
        username: safeDisplayUsername(user.username_display),
        email: user.email,
        games_played: user.games_played,
        favouriteTeam: user.favourite_team ?? null,
        onboarded: !!user.onboarded,
        coins: user.coins ?? 0,
        badgeEquipped: user.badge_equipped ?? null
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/auth/me", async (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const result = await pool.query(
    `SELECT
      id,
      username_display,
      email,
      games_played,
      wins,
      losses,
      age_range,
      state,
      favourite_team,
      onboarded,
      coins,
      badge_equipped,
      badges_owned
     FROM users
     WHERE id = $1`,
    [userId]
  );

  const user = result.rows[0];
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    user: {
      id: user.id,
      username: safeDisplayUsername(user.username_display),
      email: user.email,
      games_played: user.games_played,
      wins: user.wins ?? 0,
      losses: user.losses ?? 0,
      ageRange: user.age_range,
      state: user.state,
      favouriteTeam: user.favourite_team,
      onboarded: !!user.onboarded,
      coins: user.coins ?? 0,
      badgeEquipped: user.badge_equipped ?? null,
      badgesOwned: parseBadgesOwned(user.badges_owned)
    }
  });
});


app.post("/auth/onboarding", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { ageRange, state, favouriteTeam } = req.body;

  if (!ageRange || !state || !favouriteTeam) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const badgeId = TEAM_CODE_TO_BADGE_ID[favouriteTeam] ?? null;

  await pool.query(
    `UPDATE users
     SET age_range = $1,
         state = $2,
         favourite_team = $3,
         badge_equipped = $4,
         badges_owned = $5,
         onboarded = TRUE
     WHERE id = $6`,
    [
      ageRange,
      state,
      favouriteTeam,
      badgeId,
      badgeId ? JSON.stringify([badgeId]) : JSON.stringify([]),
      userId
    ]
  );

  res.json({
    ok: true,
    badge: { type: "team", team: favouriteTeam }
  });
});

app.post("/auth/logout", async (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  const session = await getSessionFromToken(token);

  if (session) {
    await pool.query(
      `DELETE FROM sessions WHERE token_hash = $1`,
      [session.token_hash]
    );

    forceLogoutUser(session.user_id, "Logged out");
  }

  clearSessionCookie(res);
  res.json({ ok: true });
});

app.post("/auth/change-password", async (req, res) => {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const result = await pool.query(
    `SELECT password_hash FROM users WHERE id = $1`,
    [userId]
  );

  const user = result.rows[0];
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const ok = await bcrypt.compare(currentPassword, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: "Incorrect current password" });
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `UPDATE users SET password_hash = $1 WHERE id = $2`,
    [newHash, userId]
  );

  await pool.query(
    `DELETE FROM sessions WHERE user_id = $1`,
    [userId]
  );

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const now = Date.now();

  await pool.query(
    `INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
     VALUES ($1, $2, $3, $4)`,
    [userId, tokenHash, now + THIRTY_DAYS_MS, now]
  );

  setSessionCookie(res, token);

  res.json({ ok: true });
});

app.post("/auth/forgot-password", async (req, res) => {
  try {
    const { identifier } = req.body; // username OR email
    if (!identifier) {
      return res.status(400).json({ error: "Missing identifier" });
    }

    const idNorm = identifier.toLowerCase().trim();

    // Find user by username_norm OR email
    const { rows } = await pool.query(
      `
      SELECT id, email
      FROM users
      WHERE username_norm = $1 OR lower(email) = $1
      LIMIT 1
      `,
      [idNorm]
    );

    // Do NOT reveal if user exists
    const user = rows[0];
    if (!user) return res.json({ ok: true });

    // Clear old reset tokens
    await pool.query(`DELETE FROM password_resets WHERE user_id = $1`, [user.id]);

    const rawToken = crypto.randomBytes(20).toString("hex");
    const tokenHash = sha256(rawToken);
    const now = Date.now();

    await pool.query(
      `
      INSERT INTO password_resets (user_id, token_hash, expires_at, created_at)
      VALUES ($1, $2, $3, $4)
      `,
      [user.id, tokenHash, now + RESET_TOKEN_TTL_MS, now]
    );

    await mailer.sendMail({
      from: '"Foopy" <foopygame@gmail.com>',
      to: user.email,
      subject: "Reset your Foopy password",
      text: `
You requested a password reset for your Foopy account.

Your reset token is:

${rawToken}

This token expires in 30 minutes.

If you did not request this, ignore this email.
`
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/auth/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const tokenHash = sha256(token);
    const now = Date.now();

    // Find valid reset token
    const { rows } = await pool.query(
      `
      SELECT user_id
      FROM password_resets
      WHERE token_hash = $1 AND expires_at > $2
      LIMIT 1
      `,
      [tokenHash, now]
    );

    const row = rows[0];
    if (!row) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    // Do it atomically
    await transaction(async (client) => {
      await client.query(
        `UPDATE users SET password_hash = $1 WHERE id = $2`,
        [newHash, row.user_id]
      );

      // Burn reset tokens
      await client.query(`DELETE FROM password_resets WHERE user_id = $1`, [row.user_id]);

      // Kill all sessions
      await client.query(`DELETE FROM sessions WHERE user_id = $1`, [row.user_id]);
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/stats/game-complete", async (req, res) => {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    await pool.query(
      `UPDATE users SET games_played = games_played + 1 WHERE id = $1`,
      [userId]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("STATS GAME-COMPLETE ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/stats/award-coins", async (req, res) => {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    const coinsToAdd = Number(req.body?.coins ?? 0);
    if (!Number.isFinite(coinsToAdd) || coinsToAdd <= 0) {
      return res.status(400).json({ error: "Invalid coins amount" });
    }

    const { rows } = await pool.query(
      `
      UPDATE users
      SET
        coins = coins + $1,
        coins_earned = COALESCE(coins_earned, 0) + $1,
        peak_coins = GREATEST(COALESCE(peak_coins, 0), coins + $1)
      WHERE id = $2
      RETURNING coins
      `,
      [coinsToAdd, userId]
    );

    res.json({ ok: true, coins: rows[0]?.coins ?? 0 });
  } catch (err) {
    console.error("STATS AWARD-COINS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/stats/summary", async (req, res) => {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    const { rows } = await pool.query(
      `
      SELECT
        games_played,
        wins,
        losses,
        high_score,
        longest_streak,
        total_time_played,
        coins_earned,
        coins_spent,
        peak_coins,
        challenges_completed,
        accuracy
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    res.json({ stats: rows[0] ?? null });
  } catch (err) {
    console.error("STATS SUMMARY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/stats/records", async (req, res) => {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    const { rows } = await pool.query(
      `
      SELECT key, value, achieved_at
      FROM records
      WHERE user_id = $1
      ORDER BY achieved_at DESC
      `,
      [userId]
    );

    res.json({ records: rows });
  } catch (err) {
    console.error("STATS RECORDS ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/leaderboard/global", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        username_display AS username,
        COALESCE(high_score, 0) AS high_score,
        COALESCE(games_played, 0) AS games_played,
        accuracy
      FROM users
      WHERE COALESCE(games_played, 0) > 0
      ORDER BY COALESCE(high_score, 0) DESC
      LIMIT 50
      `
    );

    res.json({
      leaderboard: result.rows.map((r) => ({
        ...r,
        username: safeDisplayUsername(r.username),
      })),
    });
  } catch (err) {
    console.error("LEADERBOARD GLOBAL ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/stats/recent-games", async (req, res) => {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    const { rows } = await pool.query(
      `
      SELECT
        mode,
        score,
        did_win,
        opponent_name,
        opponent_score,
        created_at
      FROM games
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 10
      `,
      [userId]
    );

    res.json({
      games: rows.map((g) => ({
        mode: g.mode,
        score: g.score,
        opponent: g.mode === "online" ? g.opponent_name : null,
        opponentScore: g.mode === "online" ? g.opponent_score : null,
        result:
          g.mode === "online"
            ? g.did_win === true || g.did_win === 1
              ? "WIN"
              : "LOSS"
            : null,
        date: new Date(Number(g.created_at)).toLocaleDateString("en-AU", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      }))
    });
  } catch (err) {
    console.error("STATS RECENT-GAMES ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const metric = req.query.metric || "high_score";
    const period = req.query.period || "all";

    const allowedMetrics = ["high_score", "coins", "games_played", "wins"];
    const allowedPeriods = ["all", "week", "today"];

    if (!allowedMetrics.includes(metric) || !allowedPeriods.includes(period)) {
      return res.status(400).json({ error: "Invalid metric or period" });
    }

    // time filter is based on games.created_at (ms)
    let timeWhere = "";
    const params = [];

    if (period === "today") {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      params.push(startOfDay.getTime());
      timeWhere = `AND g.created_at >= $${params.length}`;
    }

    if (period === "week") {
      const startOfWeek = new Date();
      const day = startOfWeek.getDay() || 7; // Mon=1..Sun=7
      startOfWeek.setDate(startOfWeek.getDate() - day + 1);
      startOfWeek.setHours(0, 0, 0, 0);
      params.push(startOfWeek.getTime());
      timeWhere = `AND g.created_at >= $${params.length}`;
    }

    // metric logic
    let valueExpr;
    let orderExpr;

    switch (metric) {
      case "high_score":
        valueExpr = "MAX(g.score)";
        orderExpr = "value DESC";
        break;

      case "coins":
        valueExpr = "MAX(COALESCE(u.peak_coins, 0))";
        orderExpr = "value DESC";
        break;

      case "games_played":
        valueExpr = "COUNT(g.id)";
        orderExpr = "value DESC";
        break;

      case "wins":
        valueExpr = `
          SUM(
            CASE
              WHEN g.mode = 'online' AND g.did_win = TRUE THEN 1
              ELSE 0
            END
          )
        `;
        orderExpr = "value DESC";
        break;
    }

    const sql = `
      SELECT
        u.username_display AS username,
        (${valueExpr}) AS value,
        COUNT(g.id) AS games_played,
        AVG(g.accuracy) AS accuracy
      FROM users u
      JOIN games g ON g.user_id = u.id
      WHERE 1=1
      ${timeWhere}
      GROUP BY u.id
      HAVING (${valueExpr}) > 0
      ORDER BY ${orderExpr}
      LIMIT 50
    `;

    const result = await pool.query(sql, params);

    res.json({
      leaderboard: result.rows.map((r) => ({
        ...r,
        username: safeDisplayUsername(r.username),
      })),
    });
  } catch (err) {
    console.error("LEADERBOARD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/stats/commit-game", async (req, res) => {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    const {
      mode, // "timed" | "online"
      score,
      correct,
      attempted,
      longestStreak,
      duration,
      coinsEarned,
      didWin // boolean | null
    } = req.body;

    // ---------- HARD VALIDATION ----------
    if (
      !mode ||
      !Number.isFinite(score) ||
      !Number.isFinite(correct) ||
      !Number.isFinite(attempted) ||
      !Number.isFinite(longestStreak) ||
      !Number.isFinite(duration) ||
      !Number.isFinite(coinsEarned)
    ) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const accuracy = attempted === 0 ? null : correct / attempted;
    const now = Date.now();
    const weekKey = getWeekKey(now);

    await transaction(async (client) => {
      // Lock user row to avoid race conditions when updating stats/coins
      const userRes = await client.query(
        `
        SELECT games_played, accuracy, coins
        FROM users
        WHERE id = $1
        FOR UPDATE
        `,
        [userId]
      );

      if (userRes.rows.length === 0) {
        throw new Error("User not found in users table");
      }

      const prevGames = Number(userRes.rows[0].games_played ?? 0);
      const prevAccuracy =
        userRes.rows[0].accuracy === null || userRes.rows[0].accuracy === undefined
          ? null
          : Number(userRes.rows[0].accuracy);

      const currentCoins = Number(userRes.rows[0].coins ?? 0);

      const newAccuracy =
        prevAccuracy == null
          ? accuracy
          : accuracy == null
            ? prevAccuracy
            : ((prevAccuracy * prevGames) + accuracy) / (prevGames + 1);

      // 1) Insert immutable game row
      const gameInsert = await client.query(
        `
        INSERT INTO games (
          user_id,
          mode,
          score,
          correct,
          attempted,
          accuracy,
          longest_streak,
          duration,
          coins_earned,
          created_at,
          week_key,
          did_win
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
        RETURNING id
        `,
        [
          userId,
          mode,
          score,
          correct,
          attempted,
          accuracy,
          longestStreak,
          duration,
          coinsEarned,
          now,
          weekKey,
          mode === "online" ? (didWin === true ? true : false) : null
        ]
      );

      const gameId = gameInsert.rows[0].id;

      // 2) Update user aggregate stats
      // Note: uses GREATEST for highs/peaks
      const winInc = didWin === true ? 1 : 0;
      const lossInc = didWin === false ? 1 : 0;
      const nextCoins = currentCoins + coinsEarned;

      await client.query(
        `
        UPDATE users SET
          games_played = games_played + 1,
          wins = COALESCE(wins, 0) + $1,
          losses = COALESCE(losses, 0) + $2,
          high_score = GREATEST(COALESCE(high_score, 0), $3),
          longest_streak = GREATEST(COALESCE(longest_streak, 0), $4),
          total_time_played = COALESCE(total_time_played, 0) + $5,
          coins = COALESCE(coins, 0) + $6,
          coins_earned = COALESCE(coins_earned, 0) + $6,
          peak_coins = GREATEST(COALESCE(peak_coins, 0), $7),
          accuracy = $8
        WHERE id = $9
        `,
        [
          winInc,
          lossInc,
          score,
          longestStreak,
          duration,
          coinsEarned,
          nextCoins,
          newAccuracy,
          userId
        ]
      );

      // 3) Records upsert (no ON CONFLICT needed)
      // We store "best ever" per-user per-key.
      async function upsertRecord(key, value) {
        const existing = await client.query(
          `
          SELECT value
          FROM records
          WHERE user_id = $1 AND key = $2
          `,
          [userId, key]
        );

        const shouldWrite =
          existing.rows.length === 0 || Number(value) > Number(existing.rows[0].value);

        if (!shouldWrite) return;

        if (existing.rows.length === 0) {
          await client.query(
            `
            INSERT INTO records (key, value, user_id, game_id, achieved_at)
            VALUES ($1,$2,$3,$4,$5)
            `,
            [key, value, userId, gameId, now]
          );
        } else {
          await client.query(
            `
            UPDATE records
            SET value = $1, game_id = $2, achieved_at = $3
            WHERE user_id = $4 AND key = $5
            `,
            [value, gameId, now, userId, key]
          );
        }
      }

      await upsertRecord("highest_single_game_score", score);
      await upsertRecord("longest_streak", longestStreak);
      await upsertRecord("most_coins_held", nextCoins);
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("COMMIT GAME FAILED:", err);
    res.status(500).json({ error: "Failed to commit game" });
  }
});

app.post("/badges/equip", async (req, res) => {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    const { badgeId } = req.body;
    if (!badgeId) return res.status(400).json({ error: "Missing badgeId" });

    const { rows } = await pool.query(
      `SELECT badges_owned FROM users WHERE id = $1`,
      [userId]
    );

    const owned = parseBadgesOwned(rows[0]?.badges_owned);

    if (!owned.includes(badgeId)) {
      return res.status(400).json({ error: "Badge not owned" });
    }

    await pool.query(
      `UPDATE users SET badge_equipped = $1 WHERE id = $2`,
      [badgeId, userId]
    );

    await refreshUserBadge(userId);

    res.json({ ok: true, badgeEquipped: badgeId });
  } catch (err) {
    console.error("BADGE EQUIP ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/badges/buy", async (req, res) => {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Not logged in" });

    const { badgeId } = req.body;
    const badge = BADGES[badgeId];

    if (!badge) {
      return res.status(400).json({ error: "Invalid badge" });
    }

    const { rows } = await pool.query(
      `SELECT coins, badges_owned FROM users WHERE id = $1`,
      [userId]
    );

    const coins = rows[0]?.coins ?? 0;
    const owned = parseBadgesOwned(rows[0]?.badges_owned);

    if (owned.includes(badgeId)) {
      return res.json({ ok: true });
    }

    // Secret badge logic
    if (badge.unlock.method === "all_teams") {
      const teamBadgeIds = Object.values(BADGES)
        .filter(b => b.type === "team")
        .map(b => b.id);

      const ownsAllTeams = teamBadgeIds.every(id => owned.includes(id));
      if (!ownsAllTeams) {
        return res.status(403).json({ error: "Secret badge locked" });
      }
    }

    if (
      badge.unlock.method !== "coins" &&
      badge.unlock.method !== "all_teams"
    ) {
      return res.status(400).json({ error: "Invalid badge" });
    }

    const cost = badge.unlock.cost ?? 0;

    if (coins < cost) {
      return res.status(400).json({ error: "Not enough coins" });
    }

    const nextOwned = [...owned, badgeId];

    await pool.query(
      `
      UPDATE users
      SET
        coins = coins - $1,
        coins_spent = COALESCE(coins_spent, 0) + $1,
        badges_owned = $2
      WHERE id = $3
      `,
      [cost, JSON.stringify(nextOwned), userId]
    );

    res.json({
      ok: true,
      coins: coins - cost,
      badgesOwned: nextOwned
    });
  } catch (err) {
    console.error("BADGE BUY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});



/* =========================================================
   SOCKET.IO SERVER
   ========================================================= */

const io = new SocketIOServer(server, {
  cors: {
    origin: ALLOWED_ORIGINS,
    credentials: true
  }
});

io.use(async (socket, next) => {
  try {
    const session = await getSessionFromCookieHeader(socket.handshake.headers.cookie);
    if (!session) return next(new Error("Not authenticated"));

    socket.userId = session.user_id;
    socket.sessionTokenHash = session.token_hash;

    const { rows } = await pool.query(
      `SELECT username_display, badge_equipped FROM users WHERE id = $1`,
      [socket.userId]
    );

    const user = rows[0];
    socket.username = safeDisplayUsername(user?.username_display);
    socket.badgeEquipped = user?.badge_equipped ?? null;

    next();
  } catch (err) {
    console.error("[socket auth] error:", err);
    next(new Error("Not authenticated"));
  }
});



/* ---------- GAME STATE ---------- */

const rooms = {};

/* ---------- SOCKET HELPERS ---------- */

function getRole(room, socketId) {
  if (!room) return null;
  if (socketId === room.hostId) return "host";
  if (socketId === room.guestId) return "guest";
  return null;
}

async function emitState(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;

  // 🔁 SAFELY refresh profiles AFTER room exists
  if (room.hostUserId) {
    room.hostProfile = await getProfileForUser(room.hostUserId);
  }

  if (room.guestUserId) {
    room.guestProfile = await getProfileForUser(room.guestUserId);
  }

  io.to(roomCode).emit("state-sync", {
    roomCode,
    playerCount: room.guestId ? 2 : 1,
    stage: room.stage,

    profiles: {
      host: room.hostProfile ?? null,
      guest: room.guestProfile ?? null
    },

    wager: room.wager ?? { host: null, guest: null, agreed: null },
    selector: room.selector,
    scores: room.scores,
    coin: room.coin,
    teamOptions: room.teamOptions,
    teams: {
      host: room.pickedTeams?.host ?? null,
      guest: room.pickedTeams?.guest ?? null
    },
    currentTeam: room.currentTeam ?? null,
    roundActive: room.roundActive,
    roundEndsAt: room.roundEndsAt
  });
}



function eligibleTeams() {
  const codes = Object.keys(teams || {});
  return codes.filter((code) => Array.isArray(teams[code]) && teams[code].length >= 3);
}

async function getProfileForUser(userId) {
  const { rows } = await pool.query(
    `
    SELECT username_display, badge_equipped, coins, wins, losses
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  const row = rows[0];

  return {
    userId,
    username: safeDisplayUsername(row?.username_display),
    badgeEquipped: row?.badge_equipped ?? null,
    coins: row?.coins ?? 0,
    wins: row?.wins ?? 0,
    losses: row?.losses ?? 0
  };
}

async function settleWagerIfNeeded(room, winnerRole) {
  if (!room) return;
  if (room.settled) return;

  const wagerAmount = Number(room.wager?.agreed ?? 0);
  if (!Number.isFinite(wagerAmount) || wagerAmount <= 0) {
    room.settled = true;
    return;
  }

  const winnerUserId =
    winnerRole === "host" ? room.hostUserId : room.guestUserId;

  const loserUserId =
    winnerRole === "host" ? room.guestUserId : room.hostUserId;

  if (!winnerUserId || !loserUserId) {
    room.settled = true;
    return;
  }

  room.settled = true;

  try {
    await transaction(async (client) => {
      // Lock loser to prevent negative/race
      const { rows } = await client.query(
        `SELECT coins FROM users WHERE id = $1 FOR UPDATE`,
        [loserUserId]
      );

      const loserCoins = Number(rows[0]?.coins ?? 0);

      if (loserCoins >= wagerAmount) {
        await client.query(
          `UPDATE users SET coins = coins - $1 WHERE id = $2`,
          [wagerAmount, loserUserId]
        );

        await client.query(
          `UPDATE users SET coins = coins + $1 WHERE id = $2`,
          [wagerAmount, winnerUserId]
        );
      } else {
        // If loser can't pay (shouldn't happen because start-match validates),
        // do nothing but still keep room.settled true to avoid loops.
        console.warn("[settleWagerIfNeeded] loser cannot pay", {
          loserUserId,
          loserCoins,
          wagerAmount
        });
      }
    });
  } catch (err) {
    console.error("[settleWagerIfNeeded] failed:", err);
    // keep settled=true to avoid repeated attempts in a broken state
  }
}



function randomPick3(arr) {
  const copy = [...arr];
  const chosen = [];
  while (chosen.length < 3 && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    chosen.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return chosen;
}

function startTeamStage(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;

  room.stage = "team";
  room.currentQuestion = null;
  room.roundActive = false;
  room.roundEndsAt = null;
  room.roundResolved = false;

  room.pickedTeams = { host: null, guest: null };
  room.currentTeam = null;

  const eligible = eligibleTeams();
  room.teamOptions = randomPick3(eligible);

  io.to(roomCode).emit("team-options", { options: room.teamOptions });
  io.to(roomCode).emit("stage-update", { stage: "team" });
  emitState(roomCode);
}
function questionKey(q, teamCode) {
  const p = (q?.players || [])
    .map((x) => (typeof x === "string" ? x : x?.name || ""))
    .join("|");

  const op = q?.operator || "";
  const ans = q?.answerPlayer?.name || "";
  return `${teamCode}::${op}::${p}::${ans}`;
}

function startQuestionStage(roomCode, teamCode) {
  const room = rooms[roomCode];
  if (!room) return;

  const roster = teams[teamCode];
  if (!Array.isArray(roster) || roster.length < 3) {
    startTeamStage(roomCode);
    return;
  }

  room.stage = "question";
  room.currentTeam = teamCode;
  room.teamOptions = null;

  let q = null;
let key = null;

for (let i = 0; i < 12; i++) {
  const candidate = generateQuestion(roster, "Medium");
  const candidateKey = questionKey(candidate, teamCode);

  if (candidateKey !== room.lastQuestionKey) {
    q = candidate;
    key = candidateKey;
    break;
  }
}

// fallback if we somehow never found a different one
if (!q) {
  q = generateQuestion(roster, "Medium");
  key = questionKey(q, teamCode);
}

room.lastQuestionKey = key;


  room.currentQuestion = {
    ...q,
    team: teamCode,
    answerName: q?.answerPlayer?.name || ""
  };

  room.roundActive = true;
  room.roundResolved = false;
  room.roundEndsAt = Date.now() + ROUND_SECONDS * 1000;

  io.to(roomCode).emit("stage-update", { stage: "question" });

  io.to(roomCode).emit("new-question", {
    question: {
      players: q.players,
      operator: q.operator,
      team: teamCode
    },
    duration: ROUND_SECONDS
  });

  emitState(roomCode);
}

function resolveRound(roomCode, winnerRole) {
  const room = rooms[roomCode];
  if (!room) return;
  if (room.stage !== "question") return;
  if (!room.currentQuestion) return;
  if (room.roundResolved) return;

  room.roundResolved = true;
  room.roundActive = false;
  room.roundEndsAt = null;

  if (winnerRole) {
    room.scores[winnerRole] += 1;
    room.selector = winnerRole;
  } else {
    if (room.selector === "host") room.selector = "guest";
    else if (room.selector === "guest") room.selector = "host";
    else room.selector = "host";
  }

  const gameOver = room.scores.host >= WIN_SCORE || room.scores.guest >= WIN_SCORE;

  if (gameOver) {
    room.stage = "gameover";
    io.to(roomCode).emit("round-ended", {
      scores: room.scores,
      selector: room.selector,
      stage: "gameover"
    });
    emitState(roomCode);
    return;
  }

  io.to(roomCode).emit("round-ended", {
    scores: room.scores,
    selector: room.selector,
    stage: "team"
  });

  emitState(roomCode);
  startTeamStage(roomCode);
}

/* ---------- SOCKET HANDLERS ---------- */

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id, "user:", socket.userId);

  // Enforce ONE live socket per user (duplicate tab gets booted or boots the old one)
  const existing = activeSocketByUser.get(socket.userId);
  if (existing && existing.id !== socket.id) {
    console.warn("❌ Duplicate socket for user", socket.userId, "kicking old socket");
    try {
      existing.emit("force-logout", { reason: "You opened Foopy in another tab." });
      existing.disconnect(true);
    } catch {
      // ignore
    }
  }
  activeSocketByUser.set(socket.userId, socket);

  // If session token_hash is rotated or expired, kick immediately.
socket.onAny(async () => {
  try {
    const ok = await isSocketSessionStillValid(socket);
    if (!ok) {
      console.warn("❌ Session rotated or expired, kicking socket:", socket.id);
      socket.emit("force-logout", { reason: "Logged in on another device" });
      socket.disconnect(true);
    }
  } catch (e) {
    console.error("[socket session check] failed:", e);
    socket.disconnect(true);
  }
});

socket.on("set-wager", ({ roomCode, amount }) => {
  const room = rooms[roomCode];
  if (!room) return;

  const wagerAmount = Number(amount);
  if (!Number.isFinite(wagerAmount) || wagerAmount <= 0) return;

  const role = socket.id === room.hostId ? "host" : "guest";
  const profile =
    role === "host" ? room.hostProfile : room.guestProfile;

  const coins = profile?.coins ?? 0;

  // ❌ Not enough coins (ROOM truth)
  if (coins < wagerAmount) {
    socket.emit("wager-denied", {
      reason: "NOT_ENOUGH_COINS",
      coins
    });
    return;
  }

  // ✅ Accept wager
  room.wager[role] = wagerAmount;

  // ✅ Agree if both match
  if (
    room.wager.host != null &&
    room.wager.guest != null &&
    room.wager.host === room.wager.guest
  ) {
    room.wager.agreed = wagerAmount;
  } else {
    room.wager.agreed = null;
  }

  emitState(roomCode);
});



socket.on("clear-wager", ({ roomCode }) => {
  const room = rooms[roomCode];
  if (!room) return;

  const role = getRole(room, socket.id);
  if (!role) return;

  if (room.stage !== "lobby") return;

  room.wager[role] = null;
  room.wager.agreed = null;

  emitState(roomCode);
});


socket.on("host-room", async (roomCode) => {
  if (!roomCode) return;

  rooms[roomCode] = {
    hostId: socket.id,
    guestId: null,

    hostUserId: socket.userId,
    guestUserId: null,

    hostProfile: await getProfileForUser(socket.userId),
    guestProfile: null,

    wager: {
      host: null,
      guest: null,
      agreed: null
    },

    stage: "host",
    selector: null,
    scores: { host: 0, guest: 0 },
    coin: { guestChoice: null, coinResult: null },
    teamOptions: null,
    pickedTeams: { host: null, guest: null },
    currentTeam: null,
    currentQuestion: null,
    roundActive: false,
    roundEndsAt: null,
    roundResolved: false,
lastQuestionKey: null,
settled: false,

  };

  socket.data.roomCode = roomCode;
  socket.join(roomCode);

  socket.emit("room-hosted", roomCode);
  emitState(roomCode);
});


  socket.on("join-room", async (roomCode) => {
    const room = rooms[roomCode];
    if (!room || room.guestId) {
      socket.emit("join-failed");
      return;
    }

    // Block self-join even if they somehow got a second socket
    if (room.hostUserId === socket.userId) {
      console.warn("❌ User tried to join their own room:", socket.userId);
      socket.emit("join-failed");
      return;
    }

room.guestId = socket.id;
room.guestUserId = socket.userId;
room.stage = "lobby";

room.guestProfile = await getProfileForUser(socket.userId);

socket.data.roomCode = roomCode;
socket.join(roomCode);

io.to(roomCode).emit("room-ready");
emitState(roomCode);
});

socket.on("start-match", async ({ roomCode }) => {
  const room = rooms[roomCode];
  if (!room) return;

  // Must have agreed wager
  const wager = room.wager.agreed;
  if (!wager) return;

  // 🚫 HARD coin validation (DB fresh)
  const hostFresh = await getProfileForUser(room.hostUserId);
  const guestFresh = await getProfileForUser(room.guestUserId);

  room.hostProfile = hostFresh;
  room.guestProfile = guestFresh;

  if (
    (hostFresh?.coins ?? 0) < wager ||
    (guestFresh?.coins ?? 0) < wager
  ) {
    io.to(roomCode).emit("match-denied", {
      reason: "INSUFFICIENT_COINS",
      hostCoins: hostFresh?.coins ?? 0,
      guestCoins: guestFresh?.coins ?? 0,
      wager
    });
    emitState(roomCode);
    return;
  }

  // ✅ RESET settlement flag here
  room.settled = false;

  // ✅ Safe to start
  room.stage = "coin";
  room.coin = { guestChoice: null, coinResult: null };
  emitState(roomCode);
});



  socket.on("coin-choice", ({ roomCode, choice }) => {
    const room = rooms[roomCode];
    if (!room) return;
    if (socket.id !== room.guestId) return;
    if (room.coin.coinResult) return;
    if (room.stage !== "coin") return;

    const coinResult = Math.random() < 0.5 ? "heads" : "tails";
    const selector = coinResult === choice ? "guest" : "host";

    io.to(roomCode).emit("coin-flip", { guestChoice: choice });

    setTimeout(() => {
      room.coin = { guestChoice: choice, coinResult };
      room.selector = selector;

      io.to(roomCode).emit("coin-result", { guestChoice: choice, coinResult, selector });
      emitState(roomCode);

      setTimeout(() => startTeamStage(roomCode), 900);
    }, 900);
  });

  socket.on("pick-team", ({ roomCode, team }) => {
    const room = rooms[roomCode];
    if (!room) return;

    const role = getRole(room, socket.id);
    if (!role) return;
    if (room.stage !== "team") return;
    if (role !== room.selector) return;
    if (!Array.isArray(room.teamOptions) || !room.teamOptions.includes(team)) return;

    room.pickedTeams = { host: team, guest: team };

    io.to(roomCode).emit("team-picked", {
      role,
      team,
      teams: { host: team, guest: team }
    });

    emitState(roomCode);
    startQuestionStage(roomCode, team);
  });

  socket.on("submit-guess", async ({ guess }) => {
    const roomCode = socket.data.roomCode;
    const room = rooms[roomCode];
    if (!room) return;

    const role = getRole(room, socket.id);
    if (!role) return;
    if (room.stage !== "question") return;
    if (!room.roundActive) return;
    if (!room.currentQuestion) return;
    if (room.roundResolved) return;

    const trimmed = String(guess || "").trim();
    if (!trimmed) return;

    const correct = validateAnswer(trimmed, room.currentQuestion.answerName);
 
    io.to(roomCode).emit("guess-feed", { player: role, guess: trimmed, correct });
    if (!correct) return;

    room.roundResolved = true;
    room.roundActive = false;
    room.roundEndsAt = null;

    io.to(roomCode).emit("round-correct", {
      winner: role,
      answer: room.currentQuestion.answerName,
      team: room.currentQuestion.team
    });

    setTimeout(async () => {
      room.scores[role] += 1;
      room.selector = role;

      const gameOver = room.scores.host >= WIN_SCORE || room.scores.guest >= WIN_SCORE;

if (gameOver) {
  const winnerRole = room.scores.host >= WIN_SCORE ? "host" : "guest";

  const hostUserId = room.hostUserId;
  const guestUserId = room.guestUserId;

  const hostScore = room.scores.host;
  const guestScore = room.scores.guest;

  const now = Date.now();
  const weekKey = getWeekKey(now);

try {
  await transaction(async (client) => {
    const now = Date.now();
    const weekKey = getWeekKey(now);

    const hostWon = winnerRole === "host" ? 1 : 0;
const guestWon = winnerRole === "guest" ? 1 : 0;

    await client.query(
      `
      INSERT INTO games (
        user_id,
        mode,
        score,
        correct,
        attempted,
        accuracy,
        longest_streak,
        duration,
        coins_earned,
        created_at,
        week_key,
        did_win,
        opponent_name,
        opponent_score
      )
      VALUES ($1,'online',$2,0,0,NULL,0,0,0,$3,$4,$5,$6,$7)
      `,
      [
        hostUserId,
        hostScore,
        now,
        weekKey,
        hostWon,
        room.guestProfile.username,
        guestScore
      ]
    );

    await client.query(
      `
      INSERT INTO games (
        user_id,
        mode,
        score,
        correct,
        attempted,
        accuracy,
        longest_streak,
        duration,
        coins_earned,
        created_at,
        week_key,
        did_win,
        opponent_name,
        opponent_score
      )
      VALUES ($1,'online',$2,0,0,NULL,0,0,0,$3,$4,$5,$6,$7)
      `,
      [
        guestUserId,
        guestScore,
        now,
        weekKey,
        guestWon,
        room.hostProfile.username,
        hostScore
      ]
    );

    await client.query(
      `
      UPDATE users
      SET
        games_played = games_played + 1,
        wins = COALESCE(wins,0) + $1,
        losses = COALESCE(losses,0) + $2
      WHERE id = $3
      `,
      [hostWon, hostWon ? 0 : 1, hostUserId]
    );

    await client.query(
      `
      UPDATE users
      SET
        games_played = games_played + 1,
        wins = COALESCE(wins,0) + $1,
        losses = COALESCE(losses,0) + $2
      WHERE id = $3
      `,
      [guestWon, guestWon ? 0 : 1, guestUserId]
    );
  });
} catch (err) {
  console.error("[online gameover] failed to commit results:", err);
  // IMPORTANT: do not block UI progression to gameover
}

// ✅ Settle wager on normal win (previously only forfeits settled)
await settleWagerIfNeeded(room, winnerRole);

  room.stage = "gameover";

  room.hostProfile = await getProfileForUser(room.hostUserId);
  room.guestProfile = await getProfileForUser(room.guestUserId);

  io.to(roomCode).emit("round-ended", {
    scores: room.scores,
    selector: winnerRole,
    stage: "gameover"
  });

  emitState(roomCode);
  return;
}

// ✅ If not game over, continue normally
io.to(roomCode).emit("round-ended", {
  scores: room.scores,
  selector: room.selector,
  stage: "team"
});

emitState(roomCode);
startTeamStage(roomCode);

}, 3000);   // closes setTimeout
});         // closes socket.on("submit-guess")



  socket.on("time-expired", () => {
    const roomCode = socket.data.roomCode;
    const room = rooms[roomCode];
    if (!room) return;
    if (room.stage !== "question") return;
    if (!room.roundActive) return;
    if (room.roundResolved) return;

    room.roundActive = false;
    room.roundEndsAt = null;

    io.to(roomCode).emit("round-correct", {
      winner: null,
      answer: room.currentQuestion?.answerName ?? "",
      team: room.currentQuestion?.team ?? null
    });

    setTimeout(() => resolveRound(roomCode, null), 3000);
  });
socket.on("leave-room", async () => {
  const roomCode = socket.data.roomCode;
  if (!roomCode) return;

  const room = rooms[roomCode];
  if (!room) return;

  const role = getRole(room, socket.id);
  if (!role) return;

  const winnerRole = role === "host" ? "guest" : "host";

  console.log("🚪 Leave detected:", role, "stage:", room.stage);

  // If match already in progress → FORFEIT
  if (
    room.wager?.agreed &&
    room.stage !== "lobby" &&
    room.stage !== "host" &&
    room.stage !== "gameover"
  ) {

await settleWagerIfNeeded(room, winnerRole);

    room.scores[winnerRole] = WIN_SCORE;
    room.stage = "gameover";

    room.hostProfile = await getProfileForUser(room.hostUserId);
    room.guestProfile = await getProfileForUser(room.guestUserId);

    io.to(roomCode).emit("round-ended", {
      scores: room.scores,
      selector: winnerRole,
      stage: "gameover"
    });

    emitState(roomCode);

    setTimeout(async () => {
      delete rooms[roomCode];
    }, 5000);

    return;
  }

  // Otherwise just close lobby
  delete rooms[roomCode];
  io.to(roomCode).emit("room-closed");
});


socket.on("disconnect", async () => {
  console.log("🔴 Socket disconnected:", socket.id);
console.log("DISCONNECT HANDLER FIRED", socket.id);

  const current = activeSocketByUser.get(socket.userId);
  if (current && current.id === socket.id) {
    activeSocketByUser.delete(socket.userId);
  }

  for (const roomCode in rooms) {
    const room = rooms[roomCode];

    const isHost = room.hostId === socket.id;
    const isGuest = room.guestId === socket.id;

    if (!isHost && !isGuest) continue;

    const leaverRole = isHost ? "host" : "guest";
    const winnerRole = isHost ? "guest" : "host";

    console.log("⚠️ Forfeit detected:", leaverRole);
console.log("Checking room:", roomCode);
console.log("HostId:", room.hostId);
console.log("GuestId:", room.guestId);
console.log("Match stage:", room.stage);


    // Only settle if match had started
    if (
      room.stage !== "lobby" &&
      room.stage !== "host" &&
      room.stage !== "join"
    ) {

      await settleWagerIfNeeded(room, winnerRole);

      room.scores[winnerRole] = WIN_SCORE;
      room.stage = "gameover";

      room.hostProfile = await getProfileForUser(room.hostUserId);
      room.guestProfile = await getProfileForUser(room.guestUserId);

      io.to(roomCode).emit("round-ended", {
        scores: room.scores,
        selector: winnerRole,
        stage: "gameover"
      });

      emitState(roomCode);
    }

    // Clean up room after short delay
    setTimeout(async () => {
      delete rooms[roomCode];
    }, 5000);
  }
});

}); // ✅ closes io.on("connection")

/* ---------- START ---------- */
console.log("BOOT: about to call server.listen");
server.listen(PORT, () => {
  console.log(`Foopy server running on port ${PORT}`);
});