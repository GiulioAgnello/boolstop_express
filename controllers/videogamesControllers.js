const mysql = require("mysql2");
const db = require("../data/db");
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

function fixerValue(results) {
  results.map((game) => {
    game.image = "http://localhost:3000/img/" + game.image;
    game.original_price = parseFloat(game.original_price);
    game.discount_percentage = parseFloat(game.discount_percentage);
    return results;
  });
}

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
  const { sort, minPrice, genre, platform, name, direction } = req.query;

  // Mappa dei campi ordinabili
  const sortableFields = {
    name: "videogames.name",
    releaseDate: "release_date",
    price: "original_price",
  };

  // Default: nessun ordinamento
  let orderBy = "";
  if (sort && sortableFields[sort]) {
    // Solo asc o desc, default desc
    const dir = direction && direction.toLowerCase() === "asc" ? "ASC" : "DESC";
    orderBy = ` ORDER BY ${sortableFields[sort]} ${dir}`;
  }

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
  sql += orderBy;

  connection.query(sql, dataParams, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    const processedResults = results.map((game) => ({
      ...game,
      genres: game.genres ? game.genres.split(",") : [],
    }));

    fixerValue(processedResults);

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

      fixerValue(gameResults);

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

    fixerValue(results);
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
      fixerValue(gameResults);
      res.json(game);
    });
  });
};

const showBySlug = (req, res) => {
  const { slug } = req.params;

  console.log("Richiesta slug:", slug);

  const sql = `SELECT 
    videogames.*,
    GROUP_CONCAT(genres.name SEPARATOR ', ') AS genres
  FROM videogames
  LEFT JOIN genre_videogame ON genre_videogame.videogame_id = videogames.id
  LEFT JOIN genres ON genres.id = genre_videogame.genre_id
  WHERE slug = ?
  GROUP BY videogames.id`;
  db.query(sql, [slug], (err, results) => {
    if (err) {
      console.error("Errore Database", err);
      return res.status(500).json({ error: "Errore del server" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: " Videogioco non trovato" });
    }

    fixerValue(results);
    res.json(results[0]);
  });
};

module.exports = {
  index,
  show,
  indexRelated,
  showPlatform,
  indexPlatform,
  getAllGenres,
  showBySlug,
};
