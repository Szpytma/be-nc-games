const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const {
  getReviewByID,
  getAllReviews,
} = require("./controllers/reviews.controller");
const {
  postComment,
  getCommentsByReviewID,
} = require("./controllers/comments.controller");
const { errorHandler } = require("./controllers/pathDoesExistError.controller");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReviewByID);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);
app.post("/api/reviews/:review_id/comments", postComment);

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
