const connection = require("../data/db");
const { gamesForPlatformList } = require("../query/queryData");

// Controller

const IndexForPlatform = (req, res) => {
  const { platform } = req.query;
  let sql = gamesForPlatformList;

  sql += `  WHERE platform = ${platform}
  GROUP BY videogames.id;`;

  // eseguiamo la query!
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({ results });
  });
};

module.exports = { IndexForPlatform };
