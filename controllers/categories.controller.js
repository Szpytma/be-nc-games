const { fetchAllCategories } = require("../models/categories.model");

exports.getCategories = (req, res) => {
  return fetchAllCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};
