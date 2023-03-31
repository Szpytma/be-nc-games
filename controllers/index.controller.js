exports.getIndex = (req, res) => {
  res.status(200).send(
    `<h1>Please check <a href='https://github.com/Szpytma/nc-games#readme'> README</a> for instructions.</h1>
      <br>
      <h1>Please click <a href='api/'> this</a> for endpoints.</h1>`
  );
};
