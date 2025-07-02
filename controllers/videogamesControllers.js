const mysql = require("mysql2");
const connection = require("../data/db");
const {
  videogamesListQuery,
  videogamesRelated,
  queryGame,
  queryGamesList,
  gamePcQuery,
  gameXboxQuery,
  gamesForXbox,
  gamesForPs5,
  gamesForNintendo,
  gamesForPc,
  gamePsQuery,
  gameNintendoQuery,
  videogameGenresQuery,
} = require("../query/queryData");

// Filter genre
const indexRelated = (req, res) => {
  const { genres } = req.params;

  if (!genres) {
    return res.status(400).json({ error: "Missing 'genres' query parameter" });
  }

  const sql = videogamesRelated;

  connection.query(sql, [genres], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({ results });
  });
};

// controller
const index = (req, res) => {
  const { sort, minPrice } = req.query;
  const order = "desc";
  const { name } = req.query;

  let dataParams = [];
  let conditions = [];

  let sql = videogamesListQuery;

  if (minPrice) {
    conditions.push("original_price >= ?");
    dataParams.push(minPrice);
  }

  if (name) {
    conditions.push("videogames.name LIKE ?");
    dataParams.push(`%${name}%`);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  if (sort) {
    sql += ` ORDER BY ${mysql.escapeId(sort)} ${order}`;
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
    if (gameResults.length === 0) return res.status(404).json({ error: "game not found" });
    const game = gameResults[0];

    const sqlGenres = videogameGenresQuery;

    connection.query(sqlGenres, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      game.genres = results.map((genre) => genre.name);

      res.json(game);
    });
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
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (gameResults.length === 0) return res.status(404).json({ error: "game not found" });
    const game = gameResults[0];

    const sqlGenres = videogameGenresQuery;

    connection.query(sqlGenres, [id], (err, resutlts) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      game.genres = resutlts.map((genre) => genre.name);
      res.json(game);
    });
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
    if (results.length === 0) return res.status(404).json({ error: "Game not found" });

    const game = results[0];

    const sqlGenres = videogameGenresQuery;

    connection.query(sqlGenres, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      game.genres = results.map((genre) => genre.name);

      res.json(game);
    });
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
    if (results.length === 0) return res.status(404).json({ error: "Game not found" });

    const game = results[0];

    const sqlGenres = videogameGenresQuery;

    connection.query(sqlGenres, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      game.genres = results.map((genre) => genre.name);

      res.json(game);
    });
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
    if (gameResults.length === 0) return res.status(404).json({ error: "game not found" });
    const game = gameResults[0];

    const sqlGenres = videogameGenresQuery;

    connection.query(sqlGenres, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      game.genres = results.map((genre) => genre.name);

      res.json(game);
    });
  });
};

module.exports = {
  index,
  show,
  indexRelated,
  showPc,
  showXbox,
  indexBox,
  indexPs,
  indexNintendo,
  indexPc,
  showPs,
  showNintendo,
};
