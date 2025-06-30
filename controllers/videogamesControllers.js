const connection = require("../data/db");
const { queryGamesList, queryGame } = require("../query/queryData");

// controller
const index = (req, res) => {
  const sql = queryGamesList;
  // eseguiamo la query!
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
};

const show = (req, res) => {
  // date to take a query for videogames
  const { id } = req.params;
  const sql = queryGame;
  // query for movie
  connection.query(sql, [id], (err, gameResults) => {
    if (err) return res.status(500).json({ error: `database query failed` });
    if (gameResults.length === 0)
      return res.status(404).json({ error: `game not found` });
    const game = gameResults[0];
    res.json(game);
  });
};

module.exports = {
  index,
  show,
};
