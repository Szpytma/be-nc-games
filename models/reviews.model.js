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

exports.fetchAllReviews = (
  category,
  sort_by = "created_at",
  order = "DESC"
) => {
  let baseQuery = `SELECT * FROM reviews `;
  const quarriesArray = [];

  if (category) {
    quarriesArray.push(category);
    baseQuery = `SELECT * FROM reviews WHERE category = $1`;
  }
  baseQuery += `ORDER BY ${sort_by} ${order}`;
  return db.query(baseQuery, quarriesArray).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "404 not found" });
    }
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
