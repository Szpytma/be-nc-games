const db = require("../db/");

exports.fetchAllCategories = () => {
  const selectAllCategories = "SELECT * FROM categories";
  return db.query(selectAllCategories).then((categories) => categories.rows);
};
