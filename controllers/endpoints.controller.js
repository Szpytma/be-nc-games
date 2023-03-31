const endpoints = require("../endpoints.json");

exports.getAllEndpoints = (req, res) => {
  res.send(endpoints);
};
