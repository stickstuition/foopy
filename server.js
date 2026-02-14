console.log("BOOT: top-level code running");
import { createRequire } from "module";
import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Database from "better-sqlite3";
import cookie from "cookie";
import { BADGES } from "./engine/badges.js";
import { Server as SocketIOServer } from "socket.io";


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
app.get("/", (req, res) => {
  res.status(200).send("Foopy backend running");
});

app.set("trust proxy", 1);

/**
 * ✅ REQUIRED for Render / HTTPS / secure cookies
 */
app.set("trust proxy", 1);

const server = http.createServer(app);
const db = new Database("foopy.sqlite");


/*
  One live socket per user.
  userId => socket
*/
const activeSocketByUser = new Map();

app.use(express.json());
app.use(cookieParser());

/* ---------- CORS ---------- */

const ALLOWED_ORIGINS = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ["http://localhost:3000", "http://localhost:5173"];


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (origin === process.env.FRONTEND_URL) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// IMPORTANT: explicitly handle preflight
app.options("*", cors());


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

/* ---------- DB SCHEMA ---------- */

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username_norm TEXT NOT NULL UNIQUE,
  username_display TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  games_played INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS password_resets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  mode TEXT NOT NULL,
  score INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  attempted INTEGER NOT NULL,
  accuracy REAL,
  longest_streak INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  coins_earned INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  week_key TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
`);


db.exec(`
CREATE TABLE IF NOT EXISTS records (
  key TEXT PRIMARY KEY,
  value INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  game_id INTEGER,
  achieved_at INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(game_id) REFERENCES games(id)
);
`);



/* ---------- DB MIGRATIONS (ONBOARDING FIELDS) ---------- */

function safeAddColumn(sql) {
  try {
    db.exec(sql);
  } catch {
    // ignore "duplicate column name" etc.
  }
}

safeAddColumn(`ALTER TABLE users ADD COLUMN age_range TEXT;`);
safeAddColumn(`ALTER TABLE users ADD COLUMN state TEXT;`);
safeAddColumn(`ALTER TABLE users ADD COLUMN favourite_team TEXT;`);
safeAddColumn(`ALTER TABLE users ADD COLUMN onboarded INTEGER NOT NULL DEFAULT 0;`);
safeAddColumn(`ALTER TABLE users ADD COLUMN badge_equipped TEXT;`);
safeAddColumn(`ALTER TABLE users ADD COLUMN coins INTEGER NOT NULL DEFAULT 0;`);
safeAddColumn(`ALTER TABLE users ADD COLUMN email TEXT;`);
safeAddColumn(`ALTER TABLE users ADD COLUMN badges_owned TEXT;`);


// ---------- STATS FIELDS ----------

safeAddColumn(`ALTER TABLE users ADD COLUMN wins INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN losses INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN high_score INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN longest_streak INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN total_time_played INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN coins_earned INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN coins_spent INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN peak_coins INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN challenges_completed INTEGER NOT NULL DEFAULT 0`);
safeAddColumn(`ALTER TABLE users ADD COLUMN accuracy REAL`);
// ---------- GAME RESULT FIELD ----------
safeAddColumn(`ALTER TABLE games ADD COLUMN did_win INTEGER`);
safeAddColumn(`ALTER TABLE games ADD COLUMN opponent_name TEXT`);
safeAddColumn(`ALTER TABLE games ADD COLUMN opponent_score INTEGER`);






/* ---------- HELPERS ---------- */


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



function getSessionFromToken(token) {
  if (!token) return null;
  const tokenHash = sha256(token);
  const now = Date.now();

  const session = db
    .prepare(
      `SELECT user_id, token_hash
       FROM sessions
       WHERE token_hash = ? AND expires_at > ?`
    )
    .get(tokenHash, now);

  return session || null;
}

function getUserIdFromRequest(req) {
  const token = req.cookies[COOKIE_NAME];
  const session = getSessionFromToken(token);
  return session ? session.user_id : null;
}

function getSessionFromCookieHeader(cookieHeader) {
  if (!cookieHeader) return null;
  const cookies = cookie.parse(cookieHeader);
  const token = cookies[COOKIE_NAME];
  return getSessionFromToken(token);
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
function isSocketSessionStillValid(socket) {
  const now = Date.now();
  const row = db
    .prepare(
      `SELECT 1 FROM sessions
       WHERE token_hash = ? AND expires_at > ?`
    )
    .get(socket.sessionTokenHash, now);

  return !!row;
}

function refreshUserBadge(userId) {
  const row = db.prepare(`
    SELECT badge_equipped
    FROM users
    WHERE id = ?
  `).get(userId);

  const socket = activeSocketByUser.get(userId);
  if (socket) {
    socket.badgeEquipped = row?.badge_equipped ?? null;
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


    const emailExists = db
      .prepare(`SELECT id FROM users WHERE lower(email) = ?`)
      .get(email.toLowerCase());

    if (emailExists) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const exists = db
      .prepare(`SELECT id FROM users WHERE username_norm = ?`)
      .get(usernameNorm);

    if (exists) {
      return res.status(409).json({ error: "Username not available" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = Date.now();

    const info = db.prepare(`
      INSERT INTO users
        (username_norm, username_display, password_hash, email, created_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(
  usernameNorm,
  usernameDisplay,
  passwordHash,
  email,
  now
);


    const userId = Number(info.lastInsertRowid);

    db.prepare(`DELETE FROM sessions WHERE user_id = ?`).run(userId);

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(token);

    db.prepare(`
      INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
      VALUES (?, ?, ?, ?)
    `).run(userId, tokenHash, now + THIRTY_DAYS_MS, now);

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

    const user = db
      .prepare(
        `SELECT id, username_display, email, password_hash, games_played, favourite_team, onboarded, coins, badge_equipped
         FROM users
         WHERE username_norm = ?`
      )
      .get(usernameNorm);
console.log("[LOGIN] row from DB:", {
  id: user?.id,
  username: user?.username_display,
  coins: user?.coins
});

    if (!user) return res.status(401).json({ error: "Incorrect credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Incorrect credentials" });

    const userId = Number(user.id);
    const now = Date.now();

    // kick existing live socket (tab, browser, anything)
    forceLogoutUser(userId, "Logged in on another device");

    // rotate session
    db.prepare(`DELETE FROM sessions WHERE user_id = ?`).run(userId);

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256(token);

    db.prepare(
      `INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
       VALUES (?, ?, ?, ?)`
    ).run(userId, tokenHash, now + THIRTY_DAYS_MS, now);

    setSessionCookie(res, token);
console.log("[LOGIN] sending payload coins:", user.coins ?? 0);

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

app.get("/auth/me", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const user = db.prepare(`
SELECT
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

    WHERE id = ?
  `).get(userId);

  if (!user) return res.status(404).json({ error: "User not found" });

  // enforce entitlements once
  const entitlement = ensureEntitlementBadges(user);

  if (entitlement.changed) {
    db.prepare(`
      UPDATE users
      SET badges_owned = ?
      WHERE id = ?
    `).run(JSON.stringify(entitlement.badgesOwned), userId);

    user.badges_owned = JSON.stringify(entitlement.badgesOwned);
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


app.post("/auth/onboarding", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const { ageRange, state, favouriteTeam } = req.body;

  if (!ageRange || !state || !favouriteTeam) {
    return res.status(400).json({ error: "Missing fields" });
  }

const badgeId = TEAM_CODE_TO_BADGE_ID[favouriteTeam] ?? null;

db.prepare(`
  UPDATE users
  SET
    age_range = ?,
    state = ?,
    favourite_team = ?,
    badge_equipped = ?,
    badges_owned = ?,
    onboarded = 1
  WHERE id = ?
`).run(
  ageRange,
  state,
  favouriteTeam,
  badgeId,
  badgeId ? JSON.stringify([badgeId]) : JSON.stringify([]),
  userId
);



  res.json({
    ok: true,
    badge: {
      type: "team",
      team: favouriteTeam
    }
  });
});

app.post("/auth/logout", (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  const session = getSessionFromToken(token);

  if (session) {
    db.prepare(`DELETE FROM sessions WHERE token_hash = ?`).run(session.token_hash);
    forceLogoutUser(session.user_id, "Logged out");
  }

  clearSessionCookie(res);
  res.json({ ok: true });
});

app.post("/auth/change-password", async (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const user = db.prepare(
    `SELECT password_hash FROM users WHERE id = ?`
  ).get(userId);

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const ok = await bcrypt.compare(currentPassword, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: "Incorrect current password" });
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  db.prepare(
    `UPDATE users SET password_hash = ? WHERE id = ?`
  ).run(newHash, userId);

  // 🔒 Kill all other sessions
  db.prepare(`DELETE FROM sessions WHERE user_id = ?`).run(userId);

  // Create fresh session
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(token);
  const now = Date.now();

  db.prepare(
    `INSERT INTO sessions (user_id, token_hash, expires_at, created_at)
     VALUES (?, ?, ?, ?)`
  ).run(userId, tokenHash, now + THIRTY_DAYS_MS, now);

  setSessionCookie(res, token);

  res.json({ ok: true });
});

app.post("/auth/forgot-password", async (req, res) => {
  const { identifier } = req.body; // username OR email

  if (!identifier) {
    return res.status(400).json({ error: "Missing identifier" });
  }

  const idNorm = identifier.toLowerCase().trim();

  const user = db.prepare(`
  SELECT id, email
  FROM users
  WHERE username_norm = ? OR lower(email) = ?
`).get(idNorm, idNorm);


  // Do NOT reveal if user exists
  if (!user) {
    return res.json({ ok: true });
  }

  // Clear old reset tokens
  db.prepare(`DELETE FROM password_resets WHERE user_id = ?`)
    .run(user.id);

  const rawToken = crypto.randomBytes(20).toString("hex");
  const tokenHash = sha256(rawToken);
  const now = Date.now();

  db.prepare(`
    INSERT INTO password_resets
      (user_id, token_hash, expires_at, created_at)
    VALUES (?, ?, ?, ?)
  `).run(
    user.id,
    tokenHash,
    now + RESET_TOKEN_TTL_MS,
    now
  );

  // ⚠️ v1 ONLY: return token to client
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
});


app.post("/auth/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const tokenHash = sha256(token);
  const now = Date.now();

  const row = db.prepare(`
    SELECT user_id
    FROM password_resets
    WHERE token_hash = ? AND expires_at > ?
  `).get(tokenHash, now);

  if (!row) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  const newHash = await bcrypt.hash(newPassword, 10);

  db.prepare(`
    UPDATE users
    SET password_hash = ?
    WHERE id = ?
  `).run(newHash, row.user_id);

  // Burn token
  db.prepare(`DELETE FROM password_resets WHERE user_id = ?`)
    .run(row.user_id);

  // Kill all sessions
  db.prepare(`DELETE FROM sessions WHERE user_id = ?`)
    .run(row.user_id);

  res.json({ ok: true });
});




app.post("/stats/game-complete", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  db.prepare(`UPDATE users SET games_played = games_played + 1 WHERE id = ?`).run(userId);
  res.json({ ok: true });
});

app.post("/stats/award-coins", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const coinsToAdd = Number(req.body?.coins ?? 0);
  if (!Number.isFinite(coinsToAdd) || coinsToAdd <= 0) {
    return res.status(400).json({ error: "Invalid coins amount" });
  }

  db.prepare(`UPDATE users SET coins = coins + ? WHERE id = ?`).run(coinsToAdd, userId);

  const row = db.prepare(`SELECT coins FROM users WHERE id = ?`).get(userId);

  res.json({ ok: true, coins: row?.coins ?? 0 });
});

app.get("/stats/summary", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const row = db.prepare(`
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
    WHERE id = ?
  `).get(userId);

  res.json({ stats: row });
});

app.get("/stats/records", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const rows = db.prepare(`
    SELECT key, value, achieved_at
    FROM records
    WHERE user_id = ?
    ORDER BY achieved_at DESC
  `).all(userId);

  res.json({ records: rows });
});

app.get("/leaderboard/global", (req, res) => {
  const rows = db.prepare(`
    SELECT
      username_display AS username,
      high_score,
      games_played,
      accuracy
    FROM users
    WHERE games_played > 0
    ORDER BY high_score DESC
    LIMIT 50
  `).all();

    res.json({
    leaderboard: rows.map(r => ({
      ...r,
      username: safeDisplayUsername(r.username)
    }))
  });
});

app.get("/stats/recent-games", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const rows = db.prepare(`
SELECT
  mode,
  score,
  did_win,
  opponent_name,
  opponent_score,
  created_at

    FROM games
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 10
  `).all(userId);

res.json({
  games: rows.map(g => ({
    mode: g.mode,
    score: g.score,
    opponent: g.mode === "online" ? g.opponent_name : null,
    opponentScore: g.mode === "online" ? g.opponent_score : null,
    result:
      g.mode === "online"
        ? g.did_win === 1
          ? "WIN"
          : "LOSS"
        : null,
    date: new Date(g.created_at).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }))
});

});


app.get("/leaderboard", (req, res) => {
  const metric = req.query.metric || "high_score";
  const period = req.query.period || "all";

  const allowedMetrics = ["high_score", "coins", "games_played", "wins"];
  const allowedPeriods = ["all", "week", "today"];

  if (!allowedMetrics.includes(metric) || !allowedPeriods.includes(period)) {
    return res.status(400).json({ error: "Invalid metric or period" });
  }

  let timeWhere = "";
  let params = [];

  if (period === "today") {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    timeWhere = "AND g.created_at >= ?";
    params.push(startOfDay.getTime());
  }

  if (period === "week") {
    const startOfWeek = new Date();
    const day = startOfWeek.getDay() || 7;
    startOfWeek.setDate(startOfWeek.getDate() - day + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    timeWhere = "AND g.created_at >= ?";
    params.push(startOfWeek.getTime());
  }

  let valueExpr;
  let orderExpr;

  switch (metric) {
    case "high_score":
      valueExpr = "MAX(g.score)";
      orderExpr = "value DESC";
      break;

    case "coins":
      valueExpr = "MAX(u.peak_coins)";
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
            WHEN g.mode = 'online' AND g.did_win = 1
            THEN 1
            ELSE 0
          END
        )
      `;
      orderExpr = "value DESC";
      break;
  }

  const rows = db.prepare(`
    SELECT
      u.username_display AS username,
      ${valueExpr} AS value,
      COUNT(g.id) AS games_played,
      AVG(g.accuracy) AS accuracy
    FROM users u
    JOIN games g ON g.user_id = u.id
    WHERE 1=1
    ${timeWhere}
    GROUP BY u.id
    HAVING value > 0
    ORDER BY ${orderExpr}
    LIMIT 50
  `).all(...params);

  res.json({
    leaderboard: rows.map(r => ({
      ...r,
      username: safeDisplayUsername(r.username)
    }))
  });
});



app.post("/stats/commit-game", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const {
    mode,                 // "timed" | "online"
    score,
    correct,
    attempted,
    longestStreak,
    duration,
    coinsEarned,
    didWin                // boolean | null
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

// ---- PREVIOUS USER ACCURACY (for weighted average) ----
const prev = db.prepare(`
  SELECT games_played, accuracy
  FROM users
  WHERE id = ?
`).get(userId);

const prevGames = prev?.games_played ?? 0;
const prevAccuracy = prev?.accuracy ?? null;

const newAccuracy =
  prevAccuracy == null
    ? accuracy
    : ((prevAccuracy * prevGames) + accuracy) / (prevGames + 1);


  const tx = db.transaction(() => {
    // 1. Insert immutable game row
const result = db.prepare(`
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
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(
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
  mode === "online" ? (didWin === true ? 1 : 0) : null
);
;

    const gameId = result.lastInsertRowid;

const currentCoins = db
  .prepare(`SELECT coins FROM users WHERE id = ?`)
  .get(userId)?.coins ?? 0;

db.prepare(`
  UPDATE users SET
    games_played = games_played + 1,
    wins = wins + ?,
    losses = losses + ?,
    high_score = MAX(high_score, ?),
    longest_streak = MAX(longest_streak, ?),
    total_time_played = total_time_played + ?,
    coins = coins + ?,
    coins_earned = coins_earned + ?,
    peak_coins = MAX(peak_coins, ?),
    accuracy = ?
  WHERE id = ?
`).run(
  didWin === true ? 1 : 0,
  didWin === false ? 1 : 0,
  score,
  longestStreak,
  duration,
  coinsEarned,
  coinsEarned,
  currentCoins + coinsEarned,
  newAccuracy,
  userId
);



    // 3. Update RECORDS (safe overwrite only if better)

    function upsertRecord(key, value) {
      const row = db
        .prepare(`SELECT value FROM records WHERE key = ?`)
        .get(key);

      if (!row || value > row.value) {
        db.prepare(`
          INSERT INTO records (key, value, user_id, game_id, achieved_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(key) DO UPDATE SET
            value = excluded.value,
            user_id = excluded.user_id,
            game_id = excluded.game_id,
            achieved_at = excluded.achieved_at
        `).run(key, value, userId, gameId, now);
      }
    }

    upsertRecord("highest_single_game_score", score);
    upsertRecord("longest_streak", longestStreak);
    upsertRecord("most_coins_held", currentCoins + coinsEarned);
  });

  try {
    tx();
    res.json({ ok: true });
  } catch (err) {
    console.error("COMMIT GAME FAILED:", err);
    res.status(500).json({ error: "Failed to commit game" });
  }
});

app.post("/badges/equip", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const { badgeId } = req.body;
  if (!badgeId) return res.status(400).json({ error: "Missing badgeId" });

  const row = db.prepare(`
    SELECT badges_owned
    FROM users
    WHERE id = ?
  `).get(userId);

  const owned = parseBadgesOwned(row?.badges_owned);

  if (!owned.includes(badgeId)) {
    return res.status(400).json({ error: "Badge not owned" });
  }

  db.prepare(`
    UPDATE users
    SET badge_equipped = ?
    WHERE id = ?
  `).run(badgeId, userId);

  refreshUserBadge(userId);

  res.json({ ok: true, badgeEquipped: badgeId });
});

app.post("/badges/buy", (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ error: "Not logged in" });

  const { badgeId } = req.body;
  const badge = BADGES[badgeId];
  if (!badge || badge.unlock.method !== "coins") {
    return res.status(400).json({ error: "Invalid badge" });
  }

  const row = db.prepare(`
    SELECT coins, badges_owned
    FROM users
    WHERE id = ?
  `).get(userId);

  const coins = row?.coins ?? 0;
  const owned = parseBadgesOwned(row?.badges_owned);

  if (owned.includes(badgeId)) {
    return res.json({ ok: true });
  }

  if (coins < badge.unlock.cost) {
    return res.status(400).json({ error: "Not enough coins" });
  }

  const nextOwned = [...owned, badgeId];

  db.prepare(`
    UPDATE users
    SET
      coins = coins - ?,
      coins_spent = coins_spent + ?,
      badges_owned = ?
    WHERE id = ?
  `).run(
    badge.unlock.cost,
    badge.unlock.cost,
    JSON.stringify(nextOwned),
    userId
  );

  res.json({
    ok: true,
    coins: coins - badge.unlock.cost,
    badgesOwned: nextOwned
  });
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

io.use((socket, next) => {
  const session = getSessionFromCookieHeader(socket.handshake.headers.cookie);
  if (!session) return next(new Error("Not authenticated"));

  socket.userId = session.user_id;
  socket.sessionTokenHash = session.token_hash;

  const user = db.prepare(`
    SELECT username_display, badge_equipped
    FROM users
    WHERE id = ?
  `).get(socket.userId);

  socket.username = safeDisplayUsername(user?.username_display);
  socket.badgeEquipped = user?.badge_equipped ?? null;

  next();
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

function emitState(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;

  // 🔁 SAFELY refresh profiles AFTER room exists
  if (room.hostUserId) {
    room.hostProfile = getProfileForUser(room.hostUserId);
  }

  if (room.guestUserId) {
    room.guestProfile = getProfileForUser(room.guestUserId);
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

function getProfileForUser(userId) {
  const row = db.prepare(`
    SELECT username_display, badge_equipped, coins, wins, losses
    FROM users
    WHERE id = ?
  `).get(userId);

  return {
    userId,
    username: safeDisplayUsername(row?.username_display),
    badgeEquipped: row?.badge_equipped ?? null,
    coins: row?.coins ?? 0,
    wins: row?.wins ?? 0,
    losses: row?.losses ?? 0
  };
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
  socket.onAny(() => {
    if (!isSocketSessionStillValid(socket)) {
      console.warn("❌ Session rotated or expired, kicking socket:", socket.id);
      socket.emit("force-logout", { reason: "Logged in on another device" });
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


socket.on("host-room", (roomCode) => {
  if (!roomCode) return;

  rooms[roomCode] = {
    hostId: socket.id,
    guestId: null,

    hostUserId: socket.userId,
    guestUserId: null,

    hostProfile: getProfileForUser(socket.userId),
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


  socket.on("join-room", (roomCode) => {
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

room.guestProfile = getProfileForUser(socket.userId);

socket.data.roomCode = roomCode;
socket.join(roomCode);

io.to(roomCode).emit("room-ready");
emitState(roomCode);
});

socket.on("start-match", ({ roomCode }) => {
  const room = rooms[roomCode];
  if (!room) return;

  // Must have agreed wager
  const wager = room.wager.agreed;
  if (!wager) return;

  // 🚫 HARD coin validation (DB fresh)
  const hostFresh = getProfileForUser(room.hostUserId);
  const guestFresh = getProfileForUser(room.guestUserId);

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

  socket.on("submit-guess", ({ guess }) => {
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

    setTimeout(() => {
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

  const tx = db.transaction(() => {
    // ----- INSERT HOST GAME -----
    db.prepare(`
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
      VALUES (?, 'online', ?, 0, 0, NULL, 0, 0, 0, ?, ?, ?, ?, ?)
    `).run(
      hostUserId,
      hostScore,
      now,
      weekKey,
      winnerRole === "host" ? 1 : 0,
      room.guestProfile.username,
      guestScore
    );

    // ----- INSERT GUEST GAME -----
    db.prepare(`
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
      VALUES (?, 'online', ?, 0, 0, NULL, 0, 0, 0, ?, ?, ?, ?, ?)
    `).run(
      guestUserId,
      guestScore,
      now,
      weekKey,
      winnerRole === "guest" ? 1 : 0,
      room.hostProfile.username,
      hostScore
    );

    // ----- UPDATE HOST USER STATS -----
    db.prepare(`
      UPDATE users SET
        games_played = games_played + 1,
        wins = wins + ?,
        losses = losses + ?
      WHERE id = ?
    `).run(
      winnerRole === "host" ? 1 : 0,
      winnerRole === "host" ? 0 : 1,
      hostUserId
    );

    // ----- UPDATE GUEST USER STATS -----
    db.prepare(`
      UPDATE users SET
        games_played = games_played + 1,
        wins = wins + ?,
        losses = losses + ?
      WHERE id = ?
    `).run(
      winnerRole === "guest" ? 1 : 0,
      winnerRole === "guest" ? 0 : 1,
      guestUserId
    );
  });

  tx();

  room.stage = "gameover";

  room.hostProfile = getProfileForUser(room.hostUserId);
  room.guestProfile = getProfileForUser(room.guestUserId);

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
socket.on("leave-room", () => {
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

    if (!room.settled) {
      room.settled = true;

      const wagerAmount = room.wager.agreed;

      if (wagerAmount > 0) {
        const winnerUserId =
          winnerRole === "host" ? room.hostUserId : room.guestUserId;

        const loserUserId =
          role === "host" ? room.hostUserId : room.guestUserId;

        const tx = db.transaction(() => {
          db.prepare(`
            UPDATE users SET coins = coins - ?
            WHERE id = ?
          `).run(wagerAmount, loserUserId);

          db.prepare(`
            UPDATE users SET coins = coins + ?
            WHERE id = ?
          `).run(wagerAmount, winnerUserId);
        });

        tx();
      }
    }

    room.scores[winnerRole] = WIN_SCORE;
    room.stage = "gameover";

    room.hostProfile = getProfileForUser(room.hostUserId);
    room.guestProfile = getProfileForUser(room.guestUserId);

    io.to(roomCode).emit("round-ended", {
      scores: room.scores,
      selector: winnerRole,
      stage: "gameover"
    });

    emitState(roomCode);

    setTimeout(() => {
      delete rooms[roomCode];
    }, 5000);

    return;
  }

  // Otherwise just close lobby
  delete rooms[roomCode];
  io.to(roomCode).emit("room-closed");
});


socket.on("disconnect", () => {
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

      if (!room.settled) {
        room.settled = true;

        const wagerAmount = room.wager?.agreed ?? 0;

        if (wagerAmount > 0) {

          const winnerUserId =
            winnerRole === "host" ? room.hostUserId : room.guestUserId;

          const loserUserId =
            leaverRole === "host" ? room.hostUserId : room.guestUserId;

          const tx = db.transaction(() => {

            const loserCoins = db.prepare(`
              SELECT coins FROM users WHERE id = ?
            `).get(loserUserId)?.coins ?? 0;

            if (loserCoins >= wagerAmount) {

              db.prepare(`
                UPDATE users
                SET coins = coins - ?
                WHERE id = ?
              `).run(wagerAmount, loserUserId);

              db.prepare(`
                UPDATE users
                SET coins = coins + ?
                WHERE id = ?
              `).run(wagerAmount, winnerUserId);
            }
          });

          tx();
        }
      }

      room.scores[winnerRole] = WIN_SCORE;
      room.stage = "gameover";

      room.hostProfile = getProfileForUser(room.hostUserId);
      room.guestProfile = getProfileForUser(room.guestUserId);

      io.to(roomCode).emit("round-ended", {
        scores: room.scores,
        selector: winnerRole,
        stage: "gameover"
      });

      emitState(roomCode);
    }

    // Clean up room after short delay
    setTimeout(() => {
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