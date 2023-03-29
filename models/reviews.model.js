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
  return db.query(selectAllCategories).then((reviews) => {
    return reviews.rows;
  });
};

exports.fetchCommentsByReviewID = (id) => {
  let queryStr = `
    SELECT * FROM comments WHERE review_id = $1
    ORDER BY created_at DESC;
  `;

  return db.query(queryStr, [id]).then((comments) => {
    if (comments.rows.length === 0) {
      return checkReviewExist(id);
    }
    return comments.rows;
  });
};

const checkReviewExist = (id) => {
  let queryStr = `SELECT * FROM reviews WHERE review_id = $1;`;
  return db.query(queryStr, [id]).then((result) => {
    if (result.rowCount === 0) {
      return Promise.reject({ status: 404, message: "review not found" });
    }
    return [];
  });
};
