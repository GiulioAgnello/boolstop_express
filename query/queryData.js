const queryGamesList = `SELECT 
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
INNER JOIN genres_videogames
  ON genres_videogames.videogame_id = videogames.id
INNER JOIN genres
  ON genres.id = genres_videogames.genre_id
GROUP BY videogames.id;`;

const queryGame = `SELECT 
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
  WHERE videogames.id = ?
GROUP BY videogames.id;`;

const queryGamePC = `SELECT 
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
  WHERE videogames.id = ? AND platform = "pc"
GROUP BY videogames.id;`;

const queryGameXbox = `SELECT 
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
  WHERE videogames.id = ? AND platform = "xbox"
GROUP BY videogames.id;`;

const videogamesListQuery = `SELECT * 
FROM videogames_store.videogames`;

const gamesForXbox = `SELECT * FROM videogames_store.videogames
WHERE platform = "xbox" `;

const gamesForPs5 = `SELECT * FROM videogames_store.videogames
WHERE platform = "ps5" `;

const gamesForNintendo = `SELECT * FROM videogames_store.videogames
WHERE platform = "Nintendo" `;
// query per la visualizzazione di tutti i videogiochi pc
const pcGamesListQuery = `SELECT * FROM videogames_store.videogames
WHERE platform = "pc"`;

module.exports = {
  queryGamesList,
  queryGame,
  queryGamePC,
  queryGameXbox,
  videogamesListQuery,
  gamesForXbox,
  gamesForPs5,
  gamesForNintendo,
  pcGamesListQuery,
};
