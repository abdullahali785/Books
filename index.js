import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
import fs from "fs";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: fs.readFileSync("password.txt", "utf8"),
  port: 5432,
});
//db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});