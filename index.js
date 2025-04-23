import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 3000;
app.set("view engine", "ejs");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index", {
    Daytype: "Weekday",
    Adv: "Its time to work hard",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
