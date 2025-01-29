const db = require("../db/connection");
const { checkArticleExists } = require("../utils/checkCategoryExists");
const format = require("pg-format");

exports.selectArticlesById = async (article_id) => {
  try {
    if (isNaN(article_id)) {
      return Promise.reject({ status: 400, error: {} });
    }
    const query = await db.query(
      "SELECT * FROM articles WHERE article_id = $1",
      [article_id]
    );
    if (query.rows.length === 0) {
      return Promise.reject({ status: 404, error: {} });
    } else {
      return query.rows;
    }
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};

exports.selectArticles = async () => {
  try {
    const query = await db.query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at desc`
    );
    return query.rows;
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};

exports.selectComments = async (article_id) => {
  try {
    await checkArticleExists(article_id);
    const query = await db.query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY comments.created_at",
      [article_id]
    );
    return query.rows;
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};

exports.addComment = async (body, username, article_id, votes = 0) => {
  const sqlString = format(
    "INSERT INTO comments (body, author, article_id, votes) VALUES %L RETURNING *;",
    [[body, username, article_id, votes]]
  );
  try {
    const query = await db.query(sqlString);
    const comment = query.rows[0];
    return comment;
  } catch (error) {
    console.log("error here -", error);
    //error.status = status;
    return Promise.reject(error);
  }
};
