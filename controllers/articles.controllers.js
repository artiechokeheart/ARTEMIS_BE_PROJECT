const { request, response } = require("../app");
const {
  selectArticlesById,
  selectArticles,
} = require("../models/articles.models");

exports.getArticlesById = async (request, response, next) => {
  const { article_id } = request.params;
  try {
    const result = await selectArticlesById(article_id);
    response.status(200).send(result[0]);
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (request, response, next) => {
  try {
    const result = await selectArticles();
    response.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
