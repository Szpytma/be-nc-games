const {
  fetchCommentsByReviewID,
  insertCommentToReview,
} = require("../models/comments.model");

exports.getCommentsByReviewID = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentsByReviewID(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const { body } = req;
  insertCommentToReview(review_id, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => next(err));
};
