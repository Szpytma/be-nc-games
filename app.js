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
const { pathNotFound } = require("./controllers/pathDoesExistError.controller");
const { errorController } = require("./controllers/errorhandlers");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReviewByID);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);
app.post("/api/reviews/:review_id/comments", postComment);

app.get("/*", pathNotFound);

app.use((err, req, res, next) => {
  errorController(err, res);
});

module.exports = app;
