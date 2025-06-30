const express = require("express");
const videogamesRouter = require("./routes/videogamesRouter");
require("dotenv").config();
const app = express();
const port = 3000;

// access all routers
app.use("/videogames", videogamesRouter);

// listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
