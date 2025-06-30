const mysql = require("mysql2");

// keys require
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

// connection
const connection = mysql.createConnection({
  host: `${host}`,
  user: `${user}`,
  password: `${password}`,
  database: `${database}`,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});
module.exports = connection;
