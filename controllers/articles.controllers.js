const { request, response } = require("../app");
const {
  selectArticlesById,
  selectArticles,
  selectComments,
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
  const queries = request.query;
  try {
    const result = await selectArticles(queries);
    response.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

exports.getArticleComments = async (request, response, next) => {
  const { article_id } = request.params;
  try {
    const comments = await selectComments(article_id);
    response.status(200).send(comments);
  } catch (err) {
    next(err);
  }
};
