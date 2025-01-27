const db = require("../db/connection");

exports.selectTopics = async (request) => {
  const query = await db.query("SELECT * FROM topics");
  return query.rows;
};
