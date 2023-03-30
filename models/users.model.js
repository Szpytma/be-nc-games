const db = require("../db/");

exports.fetchAllUsers = () => {
  const selectQuery = `
    SELECT username, name, avatar_url FROM users;
    `;

  return db.query(selectQuery).then(({ rows }) => {
    return rows;
  });
};
