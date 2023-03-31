const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const {
  getReviewByID,
  getAllReviews,
  patchReviewVotes,
} = require("./controllers/reviews.controller");
const {
  postComment,
  getCommentsByReviewID,
  removeCommentByID,
} = require("./controllers/comments.controller");
const { pathNotFound } = require("./controllers/pathDoesExistError.controller");
const { errorController } = require("./controllers/errorhandlers");
const { getAllUsers } = require("./controllers/users.controller");
const endpoints = require("./endpoints.json");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<h1>Please check <a href='https://github.com/Szpytma/nc-games#readme'> README</a> for instructions.</h1>`
    );
});
app.get("/api", (req, res) => {
  res.send(endpoints);
});
app.get("/api/categories", getCategories);

app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReviewByID);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);
app.post("/api/reviews/:review_id/comments", postComment);
app.patch("/api/reviews/:review_id", patchReviewVotes);

app.delete("/api/comments/:comment_id", removeCommentByID);

app.get("/api/users", getAllUsers);

app.get("/*", pathNotFound);

app.use((err, req, res, next) => {
  errorController(err, res);
});

module.exports = app;
