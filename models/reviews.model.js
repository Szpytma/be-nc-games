const db = require("../db/");

exports.fetchReviewByID = (id) => {
  // const reg = new RegExp("[0-9]");
  // if (id === "" || !id) {
  //   return Promise.reject({ status: 404, msg: "Please provide an valid ID" });
  // }
  const selectAllCategories = "SELECT * FROM reviews WHERE review_id  = $1";
  return db.query(selectAllCategories, [id]).then((review) => {
    if (review.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Index outOfBound" });
    }
    return review.rows[0];
  });
};
