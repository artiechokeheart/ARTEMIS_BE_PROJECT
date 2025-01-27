const db = require("../db/connection");

const selectTopics = async (request) => {
  const query = await db.query("SELECT * FROM topics");
  return query.rows;
};

module.exports = { selectTopics };
