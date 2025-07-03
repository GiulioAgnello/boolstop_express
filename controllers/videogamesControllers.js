const mysql = require("mysql2");
const connection = require("../data/db");
const {
  videogamesListQuery,
  videogamesRelated,

  gamePlatformQuery,
  gamesForPlatform,

  videogameGenresQuery,
  videogameQuery,
} = require("../query/queryData");

// Filter genre correlati
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
  const sql = videogameQuery;
  // query for movie
  connection.query(sql, [id], (err, gameResults) => {
    if (err) return res.status(500).json({ error: "database query failed" });
    if (gameResults.length === 0)
      return res.status(404).json({ error: "game not found" });
    const game = gameResults[0];

    const sqlGenres = videogameGenresQuery;

    connection.query(sqlGenres, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      game.genres = results.map((genre) => genre.name);

      res.json(game);
    });
  });
};

// controller platform
const indexPlatform = (req, res) => {
  const { sort, minPrice } = req.query;
  const { platform } = req.params;
  const order = "desc";

  let dataParams = [platform];

  let sql = gamesForPlatform;

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

const showPlatform = (req, res) => {
  // date to take a query for videogames
  const { platform, id } = req.params;
  const sql = gamePlatformQuery;
  // query for movie
  connection.query(sql, [platform, id], (err, gameResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (gameResults.length === 0)
      return res.status(404).json({ error: "game not found" });
    const game = gameResults[0];

    const sqlGenres = videogameGenresQuery;

    connection.query(sqlGenres, [id], (err, resutlts) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      game.genres = resutlts.map((genre) => genre.name);
      res.json(game);
    });
  });
};

module.exports = {
  index,
  show,
  indexRelated,

  showPlatform,
  indexPlatform,
};
