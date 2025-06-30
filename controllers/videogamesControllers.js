const connection = require("./data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM videogames";
  // eseguiamo la query!
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
};

module.exports = {
  index,
};
