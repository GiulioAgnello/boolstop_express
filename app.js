// config
const express = require("express");
require("dotenv").config();
// require
const videogamesRouter = require("./routes/videogamesRouter");
const handlerError = require("./middleware/hendolerror");
const errorFound = require("./middleware/errorfound");
const app = express();
const port = 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());

// access all routers
app.use("/videogames", videogamesRouter);

// error middleware
app.use(handlerError);
app.use(errorFound);

// listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
