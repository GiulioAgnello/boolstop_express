const mysql = require("mysql2");
const connection = require("../data/db");
const { videogamesListQuery, queryGame } = require("../query/queryData");

// controller
const index = (req, res) => {
  const { sort, price } = req.query;
  const order = "desc";

  let dataParams = [];

  let sql = videogamesListQuery;

  if (price) {
    sql += ` WHERE original_price > ? `;
    dataParams.push(price);
  }

  if (sort) {
    sql += ` order by ${mysql.escapeId(sort)} ${order}`;
  }

  // eseguiamo la query!
  connection.query(sql, dataParams, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({ results });
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
