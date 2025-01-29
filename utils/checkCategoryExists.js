const db = require("../db/connection");
//const format = require("pg-format");

exports.checkArticleExists = async (article_id) => {
  try {
    const resolved = await db.query(
      "SELECT * FROM articles WHERE article_id = $1",
      [article_id]
    );
    console.log(resolved.rows);
    if (resolved.rows.length === 0) {
      return Promise.reject({ status: 404 });
    }

    return "check complete - category exists";
  } catch (error) {
    return Promise.reject({ status: 500, error });
  }
};
//how do implement a custom error handler with async await????

//{ status: 404, msg: "404 - page not  found" }
