exports.pathNotFound = (req, res) => {
  res.status(404).send({ message: "This Path does not exist" });
};
