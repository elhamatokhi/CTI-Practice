import pool from "../models/db.js";
import bcrypt from "bcrypt";

const saltRound = 10;

export const registerUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // Check if the user already exists
    const checkQuery = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (checkQuery.rows.length > 0) {
      res.send("User already exists, please login.");
    } else {
      // Save the user to the DB
      bcrypt.hash(password, saltRound, async (err, hash) => {
        const query = ` INSERT INTO users (email, password,name)
        VALUES ($1,$2, $3)
        RETURNING *
        `;
        const values = [email, hash, name];

        const result = await pool.query(query, values);
        res.render("dashboard", { user: result.rows[0], restaurants: [] });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Login logic

export const loginUser = async (req, res) => {
  const email = req.body.email;
  const loginPassword = req.body.password;

  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      bcrypt.compare(loginPassword, storedPassword, (err, result) => {
        if (result) {
          res.render("dashboard", { user, restaurants: [] });
        } else {
          res.send(`Wrong password!`);
        }
      });
    } else {
      res.send("User not found!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
