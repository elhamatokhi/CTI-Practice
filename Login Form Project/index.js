import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Init express app
const app = express();
const PORT = 3000;

// __dirname Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`The server is listening on port: ${PORT}`);
});
