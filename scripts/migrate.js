// scripts/migrate.js

import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false
});

async function migrate() {
  console.log("[migrate] connecting to Postgres...");

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        username_norm TEXT NOT NULL UNIQUE,
        username_display TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        games_played INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL,
        age_range TEXT,
        state TEXT,
        favourite_team TEXT,
        onboarded BOOLEAN NOT NULL DEFAULT FALSE,
        badge_equipped TEXT,
        coins INTEGER NOT NULL DEFAULT 0,
        email TEXT,
        badges_owned TEXT,
        wins INTEGER NOT NULL DEFAULT 0,
        losses INTEGER NOT NULL DEFAULT 0,
        high_score INTEGER NOT NULL DEFAULT 0,
        longest_streak INTEGER NOT NULL DEFAULT 0,
        total_time_played INTEGER NOT NULL DEFAULT 0,
        coins_earned INTEGER NOT NULL DEFAULT 0,
        coins_spent INTEGER NOT NULL DEFAULT 0,
        peak_coins INTEGER NOT NULL DEFAULT 0,
        challenges_completed INTEGER NOT NULL DEFAULT 0,
        accuracy DOUBLE PRECISION
      );
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique
      ON users (lower(email))
      WHERE email IS NOT NULL AND email <> '';
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        token_hash TEXT NOT NULL,
        expires_at BIGINT NOT NULL,
        created_at BIGINT NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        token_hash TEXT NOT NULL,
        expires_at BIGINT NOT NULL,
        created_at BIGINT NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS games (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        mode TEXT NOT NULL,
        score INTEGER NOT NULL,
        correct INTEGER NOT NULL,
        attempted INTEGER NOT NULL,
        accuracy DOUBLE PRECISION,
        longest_streak INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        coins_earned INTEGER NOT NULL,
        created_at BIGINT NOT NULL,
        week_key TEXT NOT NULL,
        did_win INTEGER,
        opponent_name TEXT,
        opponent_score INTEGER
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS records (
        key TEXT PRIMARY KEY,
        value INTEGER NOT NULL,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        game_id BIGINT REFERENCES games(id) ON DELETE SET NULL,
        achieved_at BIGINT NOT NULL
      );
    `);

    await client.query("COMMIT");

    console.log("[migrate] ✅ migrations applied successfully");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ migration failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();