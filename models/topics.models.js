const db = require("../db/connection");

exports.selectTopics = async () => {
  const query = await db.query("SELECT * FROM topics");
  return query.rows;
};
