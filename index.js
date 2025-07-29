import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";

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
  database: "Afghanistan",
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

/*------------------Here we start the app----------------- */
let userScore = 0;
let cities = [];
let hintRegion = undefined;
let hintDistrict = "";

pool.query('SELECT * FROM "Districts"', (error, result) => {
  if (error) {
    console.log("Error while fetching cities", error);
  } else {
    cities = result.rows;
  }
});

//  Routes

app.get("/", (req, res) => {
  if (cities.length > 0) {
    let randomDistrict;

    if (hintRegion) {
      randomDistrict = hintDistrict;
    } else {
      const randomIndex = Math.floor(Math.random() * cities.length);
      randomDistrict = cities[randomIndex].district;
    }
    res.render("index", { userScore, randomDistrict, hintRegion });
  } else {
    res.send(`شهری یافت نشد.`);
  }
});

app.post("/check", (req, res) => {
  const action = req.body.action;
  const userInput = req.body.cityInput;

  const district = req.body.district;
  if (action === "check") {
    pool.query(
      'SELECT province FROM "Districts" WHERE district = $1',
      [district],
      (err, result) => {
        if (err) {
          console.error("Something went wrong during executing query", err);
          res.status(500).send("خطا X!");
        } else {
          if (result.rows.length > 0) {
            const province = result.rows[0].province;
            hintRegion = undefined;
            if (userInput === province) {
              userScore++;
              res.redirect("/");
            } else {
              userScore--;
              if (userScore < 0) {
                res.redirect("/gameover");
              } else {
                res.redirect("/");
              }
            }
          }
        }
      }
    );
  }
  if (action === "hint") {
  }
});

app.listen(PORT, () => {
  console.log("Server is listening...");
});
