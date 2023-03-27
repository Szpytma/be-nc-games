const db = require("../db/");
const categories = require("../db/data/test-data/categories");

exports.fetchAllCategories = () => {
  console.log("in model");
  const selectAllCategories = "SELECT * FROM categories";
  return db.query(selectAllCategories).then((categories) => categories.rows);
};
