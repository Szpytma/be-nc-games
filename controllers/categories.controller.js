const { fetchAllCategories } = require("../models/categories.model");

exports.getCategories = (req, res, next) => {
  return fetchAllCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((error) => next(error));
};
