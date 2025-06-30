const express = require("express");

require("dotenv").config();
const app = express();
const port = 3000;

// router

// listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
