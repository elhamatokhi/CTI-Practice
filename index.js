import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
// D:\CTI-Practiec\index.js
const __dirname = path.dirname(__filename);
// D:\CTI-Practiec ==> __dirname gives us the directory of a file
const customMiddleWare = (req, res, next) => {
  console.log(
    "Heyy, I am a custom middleware. Using next() is vital to have other middleware run as well"
  );
  next();
};
app.use(customMiddleWare);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/users", (req, res) => {
  const { fname, message } = req.body;
  res.send(`
    <h1>Submitted Data</h1>
    <p><b>Name</b>: ${fname}</p>
     <p><b>Message</b>: ${message}</p>
    `);
});
app.listen(PORT, () => {
  console.log(`The server is listening on port:${PORT}`);
});
