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

module.exports = { queryGamesList };
