const db = require("../db/");

exports.fetchReviewByID = (id) => {
  const selectCategoryById = "SELECT * FROM reviews WHERE review_id  = $1";
  return db.query(selectCategoryById, [id]).then((review) => {
    if (review.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Index outOfBound" });
    }
    return review.rows[0];
  });
};

exports.fetchAllReviews = () => {
  const selectAllCategories = "SELECT * FROM reviews ORDER BY created_at DESC";
  return db.query(selectAllCategories).then((reviews) => {
    return reviews.rows;
  });
};
