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
  const sort = req.query.sort || "rating";
  let orderBy = "rating DESC"; 

  if (sort === "date") orderBy = "date_read DESC";
  if (sort === "title") orderBy = "title ASC";

  const data = await db.query(`SELECT * FROM books ORDER BY ${orderBy};`);
  res.render("home.ejs", { books: data.rows, sort });
});


app.get("/add", (req, res) => {
  res.render("add.ejs");
});

app.post("/add", async (req, res) => {
  try {
    const { title, author, notes, coverID, rating, date } = req.body;

    await db.query("INSERT INTO books (title, author, notes, cover_id, rating, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, notes, coverID, rating, date]
    );
    console.log("Book added!");
    res.redirect("/");
  } catch (err) {
    console.log("/add post error: " + err);
  }
});


app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);

  res.render("edit.ejs", { book : result.rows[0] });
});

app.post("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, author, notes, coverid, rating, date } = req.body;

    await db.query("UPDATE books SET title = $1, author = $2, notes = $3, cover_id = $4, rating = $5, date_read = $6 WHERE id = $7",
      [title, author, notes, coverid, rating, date, id]
    );
    res.redirect("/");
  } catch (err) {
    console.log("/edit post error: " + err); 
  }
});


app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.render("delete.ejs", { book: result.rows[0] });
  } catch (err) {
    console.log("/delete get error: " + err);
  }
})

app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    console.log("Book deleted!");
    res.redirect("/");
  } catch (err) {
    console.log("/delete post error: " + err);
  }
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});