const { selectArticles } = require("../models/articles.models");

exports.getArticles = async (request, response, next) => {
  const query = request;
  try {
    console.log("article controller");
    const result = await selectArticles();
    response.status(200).send({ message: result });
  } catch (err) {
    next(err);
  }
};

// const getArticlesById = async (request, response, next) => {
//   try {
//     console.log("article controller");
//     const result = await selectArticleById();
//     response.status(200).send(result);
//   } catch (err) {
//     next(err);
//   }
// };
