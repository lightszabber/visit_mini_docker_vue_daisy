import express from "express";
import cors from "cors";
import pg from "pg";

const { Client } = pg;
const app = express();

app.use(cors());
app.use(express.json());

const env = (k, d) => process.env[k] ?? d;

async function queryDb() {
  const client = new Client({
    host: env("PGHOST", "db"),
    user: env("PGUSER", "postgres"),
    password: env("PGPASSWORD", "postgres"),
    database: env("PGDATABASE", "demo"),
    port: Number(env("PGPORT", "5432")),
  });

  await client.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS visits (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
  await client.query(`INSERT INTO visits DEFAULT VALUES`);
  const { rows } = await client.query(`SELECT COUNT(*)::int AS count FROM visits`);
  await client.end();
  return rows[0].count;
}

app.get("/api/visits", async (_req, res) => {
  try {
    const visits = await queryDb();
    res.json({ ok: true, visits });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(3000, "0.0.0.0", () => {
  console.log("API on http://localhost:3000");
});
