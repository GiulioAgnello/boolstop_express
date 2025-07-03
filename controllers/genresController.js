const connection = require(`../data/db`);

const getAllGenres = (req, res) => {
  const sql = "SELECT name FROM genres ORDER BY name";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel database" });
    }
    // results è un array di oggetti, es: [{name: 'Action'}, {name: 'Adventure'}, ...]
    const genres = results.map((g) => g.name);
    res.json({ genres });
  });
};

module.exports = { getAllGenres };
