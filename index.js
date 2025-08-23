import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import router from "./Routes/index.js";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

/**
 *
 * Pool in pg is a connection manager that efficiently handles
 * multiple PostgreSQL database connections by reusing them, improving performance and scalability.
 *
 * The methods of a Pool let you run SQL queries, get a client for advanced control,
 * close all connections, and listen to connection-related events.
 *
 **/
const app = express();
const PORT = 3000;

// __dirname Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    // maintain login state across requests.
    secret: "Passwordkey",
    resave: false, // no update if no change to cart , // resource friendly
    saveUninitialized: true, // creates a cookie for a new user
  })
);

// local-passport
app.use(passport.initialize()); // initializes the passport
app.use(passport.session()); // Enables use of session - usually JWT is preferred over session

app.set("view engine", "ejs");

app.use("/", router);
app.listen(PORT, () => {
  console.log("Server is listening...");
});
