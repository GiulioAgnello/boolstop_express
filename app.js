const express = require("express");
const connection = require("./data/db");
const app = express();
const port = process.env.DB_PORT;

// router
app.get("/", (req, res) => {
  const sql = "SELECT * FROM videogames";
  // eseguiamo la query!
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
});

// listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
