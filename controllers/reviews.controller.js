const {
  fetchReviewByID,
  fetchAllReviews,
  selectCommentsByReviewId,
} = require("../models/reviews.model");

exports.getReviewByID = (req, res, next) => {
  const id = req.params.review_id;
  fetchReviewByID(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllReviews = (req, res, next) => {
  fetchAllReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getCommentsByReviews = (req, res, next) => {
  selectCommentsByReviewId(req.params.review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
