import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";
import router from "./Routes/index.js";

/**
 *
 * Pool in pg is a connection manager that efficiently handles
 * multiple PostgreSQL database connections by reusing them, improving performance and scalability.
 *
 * The methods of a Pool let you run SQL queries, get a client for advanced control,
 * close all connections, and listen to connection-related events.
 * **/
const app = express();
const PORT = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Authentication",
  password: "Sahil@456",
  port: 5432,
}); // you write the configuration of your DB here

// __dirname Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", router);
app.listen(PORT, () => {
  console.log("Server is listening...");
});
