// config
const express = require("express");
require("dotenv").config();
const cors = require("cors");
// require
const videogamesRouter = require("./routes/videogamesRouter");
const ordersRouter = require("./routes/ordersRouter");
const genresRouter = require("./routes/genresRouter");

const handlerError = require("./middleware/hendolerror");
const errorFound = require("./middleware/errorfound");
const app = express();
const port = process.env.APP_PORT;
const urlHost = process.env.APP_HOST;
const corsConfig = {
  origin: "http://localhost:5173",
};

// cors middelware
app.use(cors(corsConfig));
// middleware
app.use(express.static("public"));
app.use(express.json());

// access all routers

app.use("/videogames", videogamesRouter);
app.use("/orders", ordersRouter);
app.use("/", genresRouter);

// error middleware
app.use(handlerError);
app.use(errorFound);

// listen
app.listen(port, () => {
  console.log(`App listening at ${urlHost}${port}`);
});
