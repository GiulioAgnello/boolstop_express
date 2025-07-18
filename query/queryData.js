const videogamesListQuery = `SELECT * FROM videogames_store.videogames`;

const videogamesRelated = `SELECT 
  videogames.id,
  videogames.name,
  videogames.description,
  DATE(videogames.release_date) AS release_date,
  videogames.software_house,
  videogames.original_price,
  videogames.discount_percentage,
  videogames.image,
  videogames.pegi,
  videogames.rating,
  videogames.platform,
  videogames.physical_format,
  videogames.shipping_cost,
  GROUP_CONCAT(genres.name ORDER BY genres.name SEPARATOR ', ') AS genres
FROM videogames_store.videogames
INNER JOIN genre_videogame
  ON genre_videogame.videogame_id = videogames.id
INNER JOIN genres
  ON genres.id = genre_videogame.genre_id
  WHERE genres.name = ?
GROUP BY videogames.id`;

const videogameGenresQuery = `SELECT 
genres.name
FROM videogames_store.genre_videogame
INNER JOIN videogames
on videogames.id = genre_videogame.videogame_id
inner join genres
on genres.id = genre_videogame.genre_id
where videogames.id = ?`;

const videogameQuery = `SELECT * FROM videogames_store.videogames WHERE id = ?`;

// QUERY INDEX
const gamesForPlatform = `SELECT videogames.*, GROUP_CONCAT(genres.name SEPARATOR ', ') AS genres
FROM videogames
LEFT JOIN genre_videogame ON genre_videogame.videogame_id = videogames.id
LEFT JOIN genres ON genres.id = genre_videogame.genre_id
WHERE platform = ?
GROUP BY videogames.id`;

const gamesPlatform = `SELECT videogames.*, GROUP_CONCAT(genres.name SEPARATOR ', ') AS genres
FROM videogames
LEFT JOIN genre_videogame ON genre_videogame.videogame_id = videogames.id
LEFT JOIN genres ON genres.id = genre_videogame.genre_id
`;

// QUERY SHOW
const gamePlatformQuery = `SELECT * FROM videogames_store.videogames WHERE platform = ? AND id = ?`;

// QUERY GENRES
const allGenresQuery = `SELECT name FROM genres ORDER BY name`;
//QUERY ADD ORDER

const insertOrder = `INSERT INTO videogames_store.orders (customer_name, customer_surname, shipping_address, customer_email, discount_code_id, total_price, shipping_cost) VALUES (?, ?, ?, ?, ?, ?, ?)`;

const insertVideogameInOrder = `INSERT INTO videogames_store.order_videogame (order_id, videogame_id, amount) VALUES ( ?, ?, ? );`;

const selectDscCode = `SELECT * FROM discount_codes
where discount_codes.name = ? and curdate() between start_date and end_date`;

module.exports = {
  videogamesListQuery,
  videogamesRelated,
  gamesForPlatform,
  gamePlatformQuery,
  videogameGenresQuery,
  videogameQuery,
  allGenresQuery,
  insertOrder,
  insertVideogameInOrder,
  selectDscCode,
  gamesPlatform,
};
