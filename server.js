// const express = require("express");
// const bodyParser = require("body-parser");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "MySql@123", // Replace with your MySQL root password
//   database: "mydatabase", // Replace with your database name
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("MySQL connected...");
// });

// app.get("/search", (req, res) => {
//   const searchQuery = req.query.q;
//   const sql = `SELECT * FROM mytable WHERE name LIKE ? OR description LIKE ?`;
//   db.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.json(results);
//   });
// });

// const express = require("express");
// const mysql = require("mysql2");
// const app = express();
// const port = 3000;

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "MySql@123",
//   database: "mydatabase",
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("MySQL connected...");
// });

// // Serve static files (if any, like HTML or JS files)
// app.use(express.static("public"));

// // Handle search requests
// app.get("/search", (req, res) => {
//   const query = req.query.q;

//   if (!query) {
//     return res.status(400).json({ error: "Query parameter is required." });
//   }

//   // Execute a search query on your database
//   const sql = `
//         SELECT * FROM CHENOPODIACEAE
//         WHERE botanical_scientific_name LIKE ?
//         OR general_trade_name LIKE ?
//     `;
//   connection.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res.status(500).json({ error: "Error executing query." });
//     }

//     // Send results as JSON
//     res.json(results);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySql@123",
  database: "mydatabase",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/search", (req, res) => {
  const query = req.query.q;
  console.log("Search query:", query); // Log the search query

  const sql =
    "SELECT * FROM CHENOPODIACEAE WHERE botanical_scientific_name LIKE ?";
  connection.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Database query error" });
      return;
    }
    console.log("Query results:", results); // Log the query results
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
