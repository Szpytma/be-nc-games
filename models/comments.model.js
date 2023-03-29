const db = require("../db/");

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

exports.insertCommentToReview = (review_id, postBody) => {
  const { username, body } = postBody;
  let queryStr = `INSERT INTO comments
    (review_id, author, body)
    VALUES
    ($1, $2, $3)
    RETURNING *;`;

  return db.query(queryStr, [review_id, username, body]).then(({ rows }) => {
    return rows[0];
  });
};

const checkIfUserExist = (username) => {
  let queryStr = `SELECT * FROM users WHERE username = ($1);`;
  return db.query(queryStr, [username]).then(({ rows }) => {
    return rows[0];
  });
};
