const db = require("../db/connection");
const {
  checkArticleExists,
  checkUserExists,
  checkColumnExists,
} = require("../utils/checkCategoryExists");
const format = require("pg-format");

exports.selectArticles = async (queries) => {
  const allowedInputs = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
  ];
  const sort_by = queries.sort_by || "created_at";
  const order = queries.order || "desc";
  const allowedOrders = ["asc", "desc"];
  if (!allowedInputs.includes(sort_by)) {
    return Promise.reject({ status: 404, error: {} });
  }
  if (!allowedOrders.includes(order)) {
    return Promise.reject({ status: 400, error: {} });
  }
  const sqlQuery = format(
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY %I ${order}`,
    [sort_by]
  );
  try {
    const query = await db.query(sqlQuery);
    return query.rows;
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};

exports.selectArticlesById = async (article_id) => {
  try {
    await checkArticleExists(article_id);
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

exports.updateArticlesById = async (article_id, inc_votes) => {
  try {
    const selectArticle = await exports.selectArticlesById(article_id);

    const currentVotes = selectArticle[0].votes;
    const newVoteTotal = currentVotes + inc_votes;

    const sqlString = format(
      "UPDATE articles SET votes = %s WHERE articles.article_id = %s RETURNING *",
      [newVoteTotal],
      [article_id]
    );
    const query = await db.query(sqlString);
    return query.rows;
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};

//EXAMPLE (because I didn't need it)
// const queryArr = [];
// let queryString =
//   "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id";

// if (sort_by) {
//   queryArr.push(sort_by);
//   queryString += ` ORDER BY %L`;
// }

// if (order.includes("asc") || order.includes("desc")) {
//   queryArr.push(order);
//   queryString += " %c";
// }

// const sqlQuery = format(queryString, queryArr);
// console.log(sqlQuery);
