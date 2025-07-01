const connection = require(`../data/db`);

const addVideogameToOrder = (req, res) => {
  const { orderId } = req.params;
  const { videogame_id, amount } = req.body;

  if (!videogame_id || !amount) {
    return res.status(400).json({ error: `Missing videogame_id or amount` });
  }

  const insertQuery = `INSERT INTO order_videogame (order_id, videogame_id, amount) VALUES (?, ?, ?)`;

  connection.query(
    insertQuery,
    [orderId, videogame_id, amount],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: `Database error on insert` });

      res
        .status(201)
        .json({
          message: `Videogame added to order`,
          videogameId: result.insertId,
        });
    }
  );
};

module.exports = { addVideogameToOrder };
