const db = require("../db/connection");

exports.selectArticlesById = async (article_id) => {
  const query = await db.query("SELECT * FROM articles WHERE article_id = $1", [
    article_id,
  ]);
  if (query.rows.length === 0) {
    return Promise.reject();
  } else {
    return query.rows;
  }
};
