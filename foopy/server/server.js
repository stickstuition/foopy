import { Server } from "socket.io";
import cookie from "cookie";
import crypto from "crypto";
import Database from "better-sqlite3";

// Engine + data
import teams from "../src/engine/players.js";
import { generateQuestion, validateAnswer } from "../src/engine/engine.js";

/* ---------- AUTH SHARED WITH AUTH SERVER ---------- */

const db = new Database("foopy.sqlite");
const COOKIE_NAME = "foopy_session";

const sha256 = (input) =>
  crypto.createHash("sha256").update(input).digest("hex");

function getUserFromCookie(cookieHeader) {
  if (!cookieHeader) return null;

  const cookies = cookie.parse(cookieHeader);
  const token = cookies[COOKIE_NAME];
  if (!token) return null;

  const tokenHash = sha256(token);
  const now = Date.now();

  const session = db.prepare(
    `SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?`
  ).get(tokenHash, now);

  if (!session) return null;
  return session.user_id;
}

/* ---------- SOCKET SERVER ---------- */

const io = new Server(3001, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
  }
});

console.log("🟢 Foopy socket server running on port 3001");

/* ---------- SOCKET AUTH MIDDLEWARE ---------- */

io.use((socket, next) => {
  const cookieHeader = socket.handshake.headers.cookie;
  const userId = getUserFromCookie(cookieHeader);

  if (!userId) {
    console.warn("❌ Socket auth failed");
    return next(new Error("Not authenticated"));
  }

  socket.userId = userId;
  next();
});

/* ---------- GAME STATE ---------- */

const WIN_SCORE = 11;
const ROUND_SECONDS = 20;
const rooms = {};

/* ---------- HELPERS ---------- */

function getRole(room, socket) {
  if (!room) return null;
  if (socket.id === room.hostId) return "host";
  if (socket.id === room.guestId) return "guest";
  return null;
}

function assertSessionAlive(socket) {
  const alive = db.prepare(
    `SELECT 1 FROM sessions WHERE user_id = ?`
  ).get(socket.userId);

  if (!alive) {
    console.warn("❌ Session expired mid-game, disconnecting", socket.id);
    socket.emit("error", "Session expired");
    socket.disconnect();
    return false;
  }
  return true;
}

/* ---------- SOCKET HANDLERS ---------- */

io.on("connection", (socket) => {
  console.log("🟢 Socket connected", socket.id, "user", socket.userId);

  socket.onAny(() => {
    if (!assertSessionAlive(socket)) return;
  });

  socket.on("host-room", (roomCode) => {
    rooms[roomCode] = {
      hostId: socket.id,
      guestId: null,
      hostUserId: socket.userId,
      guestUserId: null,
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
      roundResolved: false
    };

    socket.data.roomCode = roomCode;
    socket.join(roomCode);
    socket.emit("room-hosted", roomCode);
  });

  socket.on("join-room", (roomCode) => {
    const room = rooms[roomCode];
    if (!room || room.guestId) {
      socket.emit("join-failed");
      return;
    }

    room.guestId = socket.id;
    room.guestUserId = socket.userId;
    room.stage = "lobby";

    socket.data.roomCode = roomCode;
    socket.join(roomCode);

    io.to(roomCode).emit("room-ready");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected", socket.id);

    for (const code in rooms) {
      const room = rooms[code];
      if (room.hostId === socket.id || room.guestId === socket.id) {
        delete rooms[code];
        io.to(code).emit("room-closed");
      }
    }
  });

  /* ALL OTHER GAME EVENTS STAY UNCHANGED */
});
