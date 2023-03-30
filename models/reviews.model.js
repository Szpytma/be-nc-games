const db = require("../db/");

exports.fetchReviewByID = (id) => {
  const selectAllCategories = "SELECT * FROM reviews WHERE review_id  = $1";
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
