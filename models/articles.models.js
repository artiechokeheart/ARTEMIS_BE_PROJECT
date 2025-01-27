const db = require("../db/connection");

const selectArticles = async () => {
  console.log("in articles model");
  return "hello";
};

// const selectArticleById = async () => {
//   console.log("in articles model");
//   return;
// };

module.exports = { selectArticles };
