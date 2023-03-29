exports.pathNotFound = (req, res) => {
  res.status(404).send({ error: "This Path does not exist" });
};
