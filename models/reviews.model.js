const db = require("../db/");

exports.fetchReviewByID = (id) => {
  const selectAllCategories = `
  SELECT reviews.*, 
  COUNT(comments.review_id) AS comment_count 
      FROM reviews 
      LEFT JOIN comments 
      ON comments.review_id = reviews.review_id
      WHERE reviews.review_id = $1 
      GROUP BY reviews.review_id 
  `;
  return db.query(selectAllCategories, [id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "Index outOfBound" });
    }
    return rows[0];
  });
};

exports.fetchAllReviews = () => {
  const selectAllCategories = "SELECT * FROM reviews ORDER BY created_at DESC";
  return db.query(selectAllCategories).then(({ rows }) => {
    return rows;
  });
};

exports.updateReviewVotes = (review_id, patchObj) => {
  const { inc_votes } = patchObj;

  const updateReviewsVotesQuery = `
  UPDATE reviews SET votes = votes + $1 WHERE review_id= $2 RETURNING*;
  `;

  return db
    .query(updateReviewsVotesQuery, [inc_votes, review_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "404 not found" });
      }
      return rows[0];
    });
};
