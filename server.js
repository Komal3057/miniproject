const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.static(__dirname));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySql@123",
  database: "mydatabase",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

const validTables = [
  "chenopodiaceae",
  "celastraceae",
  "asclepiadaceae",
  "asteraceae",
  "berberidaceae",
  "bignoniaceae",
  "caesalpiniaceae",
  "campanulaceae",
  "capparaceae",
  "caprifoliaceae",
];
// General function to get data from a specified table
const getData = (table, query, res) => {
  const sql = `SELECT * FROM ${table} WHERE botanical_scientific_name LIKE ?`;
  connection.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving data.");
      return;
    }
    console.log(`Data fetched from ${table}:`, results); // Add this line for debugging
    res.json(results);
  });
};

app.get("/search", (req, res) => {
  const table = req.query.table.toLowerCase();
  const query = req.query.q;

  if (!table || !query) {
    res.status(400).json({ error: "Table and query parameters are required" });
    return;
  }
  if (!validTables.includes(table)) {
    res.status(400).json({ error: "Invalid table name" });
    return;
  }
  console.log(`Searching in table: ${table} for query: ${query}`);
  getData(table, query, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
