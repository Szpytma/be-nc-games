const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const { getReviewByID } = require("./controllers/reviews.controller");
const { errorHandler } = require("./controllers/pathDoesExistError.controller");

const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewByID);
app.get("/*", errorHandler);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send("Please provide an valid ID");
  }
  if (err.status && err.msg) {
    res.status(err.status).send(err.msg);
  }

  res.status(err.status).send(err);
});

module.exports = app;
