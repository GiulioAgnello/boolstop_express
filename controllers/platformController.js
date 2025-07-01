const connection = require("../data/db");
const { gamesForPlatformList } = require("../query/queryData");

// Controller

const IndexForPlatform = (req, res) => {
  const platform = req.params.platform;
  const sql = gamesForPlatformList;

  // eseguiamo la query!
  connection.query(sql, [platform], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({ results });
  });
};

module.exports = { IndexForPlatform };
