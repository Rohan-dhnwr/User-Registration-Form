const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "experiment_db"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

// Display registration form
app.get("/", (req, res) => {
  res.render("register");
});

// Handle form submission (INSERT)
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      return res.send("Error while registering user!");
    }
    res.send("<h2>Registration Successful!</h2>");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
