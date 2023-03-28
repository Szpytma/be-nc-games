const db = require("../db/");

exports.fetchReviewByID = (id) => {
  const selectAllCategories = "SELECT * FROM reviews WHERE review_id  = $1";
  return db.query(selectAllCategories, [id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Index outOfBound" });
    }
    return rows[0];
  });
};

exports.selectCommentsByReviewId = (id) => {
  let queryStr = `
    SELECT * FROM comments WHERE review_id = $1
    ORDER BY created_at DESC;
  `;

  return db.query(queryStr, [id]).then((comments) => {
    if (!comments.rows[0]) {
      return Promise.reject({
        status: 404,
        msg: "review does not exist",
      });
    }
    return comments.rows;
  });
};

exports.fetchAllReviews = () => {
  const selectAllCategories = "SELECT * FROM reviews ORDER BY created_at DESC";
  return db.query(selectAllCategories).then((reviews) => {
    return reviews.rows;
  });
};
