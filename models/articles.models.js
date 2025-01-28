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

exports.selectArticles = async () => {
  const query = await db.query(
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at desc`
  );
  return query.rows;
};

//SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at desc;
