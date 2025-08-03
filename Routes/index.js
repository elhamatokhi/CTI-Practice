import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { user: null, name: null });
});

// GET /register — renders registration form
router.get("/register", (req, res) => {
  res.render("auth", { formType: "register" });
});
router.post("/register", registerUser);

// GET /login — renders login form
router.get("/login", (req, res) => {
  res.render("auth", { formType: "login" });
});

router.post("/login", loginUser);

export default router;
