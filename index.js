import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
// D:\CTI-Practiec\index.js
const __dirname = path.dirname(__filename);
// D:\CTI-Practiec ==> __dirname gives us the directory of a file

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/users", (req, res) => {
  console.log(req.body);
});
app.listen(PORT, () => {
  console.log(`The server is listening on port:${PORT}`);
});
