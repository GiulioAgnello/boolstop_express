const connection = require(`../data/db`);
const { insertOrder, insertVideogameInOrder } = require("../query/queryData");
const { sendOrderConfirmationEmail } = require("../utils/mailer");

const addVideogameToOrder = (req, res) => {
  const { orderId } = req.params;
  const { videogame_id, amount } = req.body;

  if (!videogame_id || !amount) {
    return res.status(400).json({ error: `Missing videogame_id or amount` });
  }

  const insertQuery = `INSERT INTO order_videogame (order_id, videogame_id, amount) VALUES (?, ?, ?)`;

  connection.query(insertQuery, [orderId, videogame_id, amount], (err, result) => {
    if (err) return res.status(500).json({ error: `Database error on insert` });

    res.status(201).json({
      message: `Videogame added to order`,
      videogameId: result.insertId,
    });
  });
};

const addOrder = (req, res) => {
  console.log("Invio email a:", req.body.customer_email);
  console.log("Contenuto carrello:", req.body.cart);

  const {
    customer_name,
    customer_surname,
    shipping_address,
    customer_email,
    discount_code_id,
    videogames,
  } = req.body;

  let errors = [];

  if (!customer_name) errors.push({ message: `Customer name is required` });
  if (!customer_surname) errors.push({ message: `Customer surname is required` });
  if (!shipping_address) errors.push({ message: `Shipping address is required` });
  if (!customer_email) errors.push({ message: `Customer email is required` });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const videogamesId = videogames.map((vg) => vg.videogame_id);
  const vgPlaceholder = videogamesId.map(() => "?").join(",");

  const sqlVgPrice = `
    SELECT id, original_price, discount_percentage
    FROM videogames
    WHERE id IN (${vgPlaceholder})
  `;

  connection.query(sqlVgPrice, videogamesId, (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });

    let totalPrice = 0;

    videogames.forEach((vg) => {
      const dbVg = results.find((r) => r.id === vg.videogame_id);
      if (!dbVg) return;
      let price = dbVg.original_price;
      if (dbVg.discount_percentage && dbVg.discount_percentage > 0) {
        price = price * (1 - dbVg.discount_percentage / 100);
      }
      totalPrice += price * vg.amount;
    });

    const sql = insertOrder;

    connection.query(
      sql,
      [
        customer_name,
        customer_surname,
        shipping_address,
        customer_email,
        discount_code_id,
        totalPrice,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Database query failed" });
        }

        const orderId = result.insertId;
        const sqlVgOrder = insertVideogameInOrder;

        let counter = 0;
        let isError = false;

        videogames.forEach((videogame) => {
          connection.query(
            sqlVgOrder,
            [orderId, videogame.videogame_id, videogame.amount],
            (err, result) => {
              if (isError) return;
              if (err) {
                isError = true;
                return res.status(500).send({ message: "database query failed" });
              }

              counter++;
              if (counter === videogames.length) {
                res.status(201).json({ message: "Vg added into order", orderId });

                const orderDetails = {
                  items: videogames.map((vg) => ({
                    name: `ID_ ${vg.videogame_id}`,
                    amount: vg.amount,
                  })),
                  total: totalPrice.toFixed(2),
                };

                sendOrderConfirmationEmail(customer_email, orderDetails)
                  .then(() => {
                    console.log("Email inviata a:", customer_email);
                  })
                  .catch((error) => {
                    console.error("Errore invio email:", error.message);
                  });
              }
            }
          );
        });
      }
    );
  });

  console.log(req.body);
};

module.exports = {
  addOrder,
  addVideogameToOrder,
};
