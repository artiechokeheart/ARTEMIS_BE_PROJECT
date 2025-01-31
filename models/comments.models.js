const db = require("../db/connection");
const {
  checkArticleExists,
  checkUserExists,
  checkCommentBody,
  checkCommentExists,
} = require("../utils/checkCategoryExists");
const format = require("pg-format");

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
  try {
    await checkCommentBody(body);
    await checkUserExists(username);
    await checkArticleExists(article_id);
    const sqlString = format(
      "INSERT INTO comments (body, author, article_id, votes) VALUES %L RETURNING *;",
      [[body, username, article_id, votes]]
    );
    const query = await db.query(sqlString);
    const comment = query.rows[0];
    return comment;
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};

exports.deleteComment = async (comment_id) => {
  try {
    await checkCommentExists(comment_id);
    const sqlString = format(
      "DELETE FROM comments WHERE comments.comment_id = %s RETURNING *",
      [comment_id]
    );
    await db.query(sqlString);
    return;
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};
