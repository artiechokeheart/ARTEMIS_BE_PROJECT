const { request, response } = require("../app");
const {
  selectArticlesById,
  selectArticles,
  updateArticlesById,
} = require("../models/articles.models");

exports.getArticlesById = async (request, response, next) => {
  const { article_id } = request.params;
  try {
    const result = await selectArticlesById(article_id);
    response.status(200).send(result[0]);
  } catch (error) {
    next(error);
  }
};

exports.getArticles = async (request, response, next) => {
  const queries = request.query;
  try {
    const result = await selectArticles(queries);
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.patchArticlesById = async (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  try {
    const result = await updateArticlesById(article_id, inc_votes);
    response.status(202).send(result[0]);
  } catch (error) {
    next(error);
  }
};
