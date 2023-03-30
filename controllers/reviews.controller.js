const {
  fetchReviewByID,
  fetchAllReviews,
  updateReviewVotes,
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

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  const { body } = req;

  updateReviewVotes(review_id, body)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((error) => {
      next(error);
    });
};
