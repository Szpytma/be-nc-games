const { fetchAllCategories } = require("../models/categories.model");

exports.getCategories = (req, res) => {
  console.log("in controller");
  return fetchAllCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};
