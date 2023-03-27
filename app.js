const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const {
  errorHandler: pathDoesExistError,
} = require("./controllers/pathDoesExistError.controller");
const app = express();

app.get("/api/categories", getCategories);

app.get("/*", pathDoesExistError);

module.exports = app;
