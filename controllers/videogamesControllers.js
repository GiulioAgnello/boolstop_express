const mysql = require("mysql2");
const connection = require("../data/db");
const {
  videogamesListQuery,
  queryGame,
  gamesForXbox,
  gamesForPs5,
} = require("../query/queryData");

// controller
const index = (req, res) => {
  const { sort, minPrice } = req.query;
  const order = "desc";

  let dataParams = [];

  let sql = videogamesListQuery;

  if (minPrice) {
    sql += ` WHERE original_price >= ? `;
    dataParams.push(minPrice);
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
    if (err) {
      console.log("errore:", err);

      return res.status(500).json({ error: "database query failed" });
    }
    if (gameResults.length === 0)
      return res.status(404).json({ error: "game not found" });
    const game = gameResults[0];
    res.json(game);
  });
};

// controller xbox
const indexBox = (req, res) => {
  const { sort, minPrice } = req.query;
  const order = "desc";

  let dataParams = [];

  let sql = gamesForXbox;

  if (minPrice) {
    sql += ` AND original_price >= ? `;
    dataParams.push(minPrice);
  }

  if (sort) {
    sql += ` order by ${mysql.escapeId(sort)} ${order}`;
  }

  // eseguiamo la query!
  connection.query(sql, dataParams, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({ results });
  });
};

// controller Playstation
const indexPs = (req, res) => {
  const { sort, minPrice } = req.query;
  const order = "desc";

  let dataParams = [];

  let sql = gamesForPs5;

  if (minPrice) {
    sql += ` AND original_price >= ? `;
    dataParams.push(minPrice);
  }

  if (sort) {
    sql += ` order by ${mysql.escapeId(sort)} ${order}`;
  }

  // eseguiamo la query!
  connection.query(sql, dataParams, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({ results });
  });
};
module.exports = {
  index,
  show,
  indexBox,
  indexPs,
};
