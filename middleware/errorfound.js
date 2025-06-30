const errorFound = (req, res, next) => {
  res.status(404);
  res.json({
    error: "not found",
    message: "movie not found",
  });
};

module.exports = errorFound;
