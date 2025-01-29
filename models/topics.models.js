const db = require("../db/connection");

exports.selectTopics = async () => {
  try {
    const query = await db.query("SELECT * FROM topics");
    return query.rows;
  } catch (error) {
    return error;
  }
};
