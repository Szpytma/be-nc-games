const express = require("express");
const cors = require('cors');
const { getIndex } = require("./controllers/index.controller");
const { getAllEndpoints } = require("./controllers/endpoints.controller");
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
const { errorController } = require("./controllers/errorHandlers");
const { getAllUsers } = require("./controllers/users.controller");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", getIndex);
app.get("/api", getAllEndpoints);

app.get("/api/categories", getCategories);

app.get("/api/reviews", getAllReviews);
app.get("/api/reviews/:review_id", getReviewByID);
app.patch("/api/reviews/:review_id", patchReviewVotes);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);
app.post("/api/reviews/:review_id/comments", postComment);

app.delete("/api/comments/:comment_id", removeCommentByID);

app.get("/api/users", getAllUsers);
app.get("/*", pathNotFound);

app.use((err, req, res, next) => {
  errorController(err, res);
});

module.exports = app;
