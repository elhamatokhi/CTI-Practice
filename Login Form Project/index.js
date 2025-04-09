import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authenticate from "./auth.js";
import fs from "fs/promises";

// Init express app
const app = express();
const PORT = 3000;

// __dirname Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", authenticate, async (req, res) => {
  const page = req.loginFailed ? "failed.html" : "success.html";
  const filePath = path.join(__dirname, "public", page);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    res.status(req.loginFailed ? 401 : 200).send(content);
  } catch (err) {
    res.status(500).send(`<h3>Sever is not responding</h3>`);
  }
});

app.listen(PORT, () => {
  console.log(`The server is listening on port: ${PORT}`);
});
