import { Pool } from "pg";
import "dotenv/config";

const Authentication = process.env.DB_NAME.replace(/^"|"$/g, "");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: Authentication,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
export default pool;
