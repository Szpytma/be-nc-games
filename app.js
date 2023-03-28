const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const {
  getReviewByID,
  getAllReviews,
} = require("./controllers/reviews.controller");
const { errorHandler } = require("./controllers/pathDoesExistError.controller");

const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReviewByID);
app.get("/*", errorHandler);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Please provide an valid ID" });
  }
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  }

  res.status(err.status).send({ message: err.message });
});

module.exports = app;
