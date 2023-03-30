const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const dbConnection = require(`../`);

const runSeed = () => {
  return seed(devData).then(() => dbConnection.end());
};

runSeed();
