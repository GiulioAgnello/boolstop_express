const connection = require("../data/db");
const { queryGamesList } = require("../query/queryData");

// controller
const index = (req, res) => {
  const sql = queryGamesList;
  // eseguiamo la query!
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
};

module.exports = {
  index,
};
