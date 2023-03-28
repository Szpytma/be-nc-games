const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const {
  getReviewByID,
  getAllReviews,
  getCommentsByReviews,
} = require("./controllers/reviews.controller");
const { errorHandler } = require("./controllers/pathDoesExistError.controller");

const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReviewByID);
app.get("/api/reviews/:review_id/comments", getCommentsByReviews);
app.get("/*", errorHandler);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send("Please provide an valid ID");
  }
  if (err.status && err.message) {
    res.status(err.status).send(err.message);
  }

  res.status(err.status).send(err.message);
});

module.exports = app;
