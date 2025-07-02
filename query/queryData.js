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

const videogamesListQuery = `SELECT * 
FROM videogames_store.videogames
`;

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
GROUP BY videogames.id;`;

const videogameGenresQuery = `SELECT 
genres.name
FROM videogames_store.genre_videogame
INNER JOIN videogames
on videogames.id = genre_videogame.videogame_id
inner join genres
on genres.id = genre_videogame.genre_id
where videogames.id = ?`;

// QUERY INDEX

// xbox
const gamesForXbox = `SELECT * FROM videogames_store.videogames
WHERE platform = "xbox" `;

//  playstation
const gamesForPs5 = `SELECT * FROM videogames_store.videogames
WHERE platform = "ps5" `;

//  nintendo
const gamesForNintendo = `SELECT * FROM videogames_store.videogames
WHERE platform = "Nintendo"`;

// pc
const gamesForPc = `SELECT * FROM videogames_store.videogames
WHERE platform = "pc"`;

// QUERY SHOW

//  playstation
const gamePsQuery = `SELECT * FROM videogames_store.videogames
WHERE platform = "ps5" AND id = ? `;

// pc
const gamePcQuery = `SELECT * FROM videogames_store.videogames
WHERE platform = "pc" AND id = ? `;

// xbox
const gameXboxQuery = `SELECT * FROM videogames_store.videogames
WHERE platform = "xbox" AND id = ? `;

//  nintendo
const gameNintendoQuery = `SELECT * FROM videogames_store.videogames
WHERE platform = "nintendo" AND id = ? `;

module.exports = {
  queryGamesList,
  queryGame,
  gamePcQuery,
  gameXboxQuery,
  videogamesListQuery,
  videogamesRelated,
  gamesForXbox,
  gamesForPs5,
  gamesForNintendo,
  gamesForPc,
  gamePsQuery,
  gameNintendoQuery,
  videogameGenresQuery,
};
