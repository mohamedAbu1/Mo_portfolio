import mysql from "mysql2/promise";

let pool;

function getPool() {
  if (!pool) {
    const required = ["MYSQL_HOST", "MYSQL_DATABASE", "MYSQL_USER", "MYSQL_PASSWORD"];
    for (const key of required) {
      if (!process.env[key]) throw new Error(`Missing required database environment variable: ${key}`);
    }
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      waitForConnections: true,
      connectionLimit: 10,
      charset: "utf8mb4",
    });
  }
  return pool;
}

export async function query(sql, values = []) {
  const [rows] = await getPool().execute(sql, values);
  return rows;
}

export async function pingDatabase() {
  const connection = await getPool().getConnection();
  try { await connection.ping(); return true; }
  finally { connection.release(); }
}
