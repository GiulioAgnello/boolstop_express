const mysql = require("mysql2");
const connection = require("../data/db");
const {
  videogamesListQuery,
  videogamesRelated,

  gamePlatformQuery,
  gamesForPlatform,

  videogameGenresQuery,
  videogameQuery,
  allGenresQuery,
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

const getAllGenres = (req, res) => {
  const sql = "SELECT name FROM genres ORDER BY name";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel database" });
    }
    const genres = results.map((g) => g.name);
    res.json({ genres });
  });
};

const index = (req, res) => {
  const { sort, minPrice, genre, platform, name } = req.query;
  const order = "desc";

  let dataParams = [];
  let conditions = [];
  let joins = `
    LEFT JOIN genre_videogame ON genre_videogame.videogame_id = videogames.id
    LEFT JOIN genres ON genres.id = genre_videogame.genre_id
  `;

  let sql = `
    SELECT videogames.*, GROUP_CONCAT(genres.name) AS genres
    FROM videogames_store.videogames
    ${joins}
  `;

  if (minPrice) {
    conditions.push("original_price >= ?");
    dataParams.push(minPrice);
  }

  if (name) {
    conditions.push("videogames.name LIKE ?");
    dataParams.push(`%${name}%`);
  }

  if (genre) {
    conditions.push("genres.name = ?");
    dataParams.push(genre);
  }

  if (platform) {
    conditions.push("platform = ?");
    dataParams.push(platform);
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  sql += " GROUP BY videogames.id";

  if (sort) {
    sql += ` ORDER BY ${mysql.escapeId(sort)} ${order}`;
  }

  connection.query(sql, dataParams, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    const processedResults = results.map((game) => ({
      ...game,
      genres: game.genres ? game.genres.split(",") : [],
    }));

    res.json({ results: processedResults });
  });
};

const show = (req, res) => {
  // date to take a query for videogames
  const { id } = req.params;
  const sql = videogameQuery;
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

module.exports = {
  index,
  show,
  indexRelated,

  showPlatform,
  indexPlatform,
  getAllGenres,
};
