const mysql = require("mysql2");
const connection = require("../data/db");
const {
  videogamesListQuery,
  queryGame,
  gamePcQuery,
  gameXboxQuery,
  gamesForXbox,
  gamesForPs5,
  gamesForNintendo,
  gamesForPc,
  gamePsQuery,
  gameNintendoQuery,
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
    if (err) return res.status(500).json({ error: "database query failed" });
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

const showXbox = (req, res) => {
  // date to take a query for videogames
  const { id } = req.params;
  const sql = gameXboxQuery;
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

const showPs = (req, res) => {
  const { id } = req.params;

  const sql = gamePsQuery;

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Game not found" });

    const game = results[0];

    res.json(game);
  });
};

// controller Nintendo
const indexNintendo = (req, res) => {
  const { sort, minPrice } = req.query;
  const order = "desc";

  let dataParams = [];

  let sql = gamesForNintendo;

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

const showNintendo = (req, res) => {
  const { id } = req.params;

  const sql = gameNintendoQuery;

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Game not found" });

    const game = results[0];

    res.json(game);
  });
};

// controller pc

const indexPc = (req, res) => {
  const { sort, minPrice } = req.query;
  const order = "desc";

  let dataParams = [];

  let sql = gamesForPc;

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

const showPc = (req, res) => {
  // date to take a query for videogames
  const { id } = req.params;
  const sql = gamePcQuery;
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

module.exports = {
  index,
  show,
  showPc,
  showXbox,
  indexBox,
  indexPs,
  indexNintendo,
  indexPc,
  showPs,
  showNintendo,
};
