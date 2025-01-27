const { selectArticles } = require("../models/articles.models");

const getArticles = async (request, response, next) => {
  const query = request;
  try {
    console.log("article controller");
    const result = await selectArticles();
    response.status(200).send({ message: "200 in articles con" });
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

module.export = { getArticles };
