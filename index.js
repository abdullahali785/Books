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
  database: "books",
  password: "abdullah2006ali",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM books ORDER BY id ASC;");
  console.log(data.rows);
  res.render("home.ejs", { books : data.rows });
});


app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.post("/add", (req, res) => {
  //Post /add form
});


app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);

  res.render("edit.ejs", { book : result.rows[0] });
  //const book = db.query("SELECT * FROM books WHERE id = $1", [id]);
  //res.render("edit.ejs", { book });
});

app.post("/edit/:id", (req, res) => {
  //Post /edit form.
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});