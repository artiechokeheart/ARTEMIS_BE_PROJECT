const db = require("../db/connection");
//const format = require("pg-format");

exports.checkArticleExists = async (article_id) => {
  try {
    const resolved = await db.query(
      "SELECT * FROM articles WHERE article_id = $1",
      [article_id]
    );
    if (resolved.rows.length === 0) {
      return Promise.reject({ status: 404, error: {} });
    }
    return "check complete - category exists";
  } catch (error) {
    return Promise.reject({ status: 500, error });
  }
};

exports.checkUserExists = async (username) => {
  try {
    const resolved = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (resolved.rows.length === 0) {
      return Promise.reject({ status: 404, error: {} });
    }
    return "check complete - user exists";
  } catch (error) {
    return Promise.reject({ status: 500, error });
  }
};

exports.checkCommentBody = async (body) => {
  try {
    if (typeof body != "string" || body.length === 0) {
      return Promise.reject({
        status: 400,
        error: {},
      });
    } else {
      return "check complete - body OK";
    }
  } catch ({ status, error }) {
    return Promise.reject({ status: 500, error });
  }
};
