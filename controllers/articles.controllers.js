const { request, response } = require("../app");
const {
  selectArticlesById,
  selectArticles,
  selectComments,
  addComment,
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

exports.getArticleComments = async (request, response, next) => {
  const { article_id } = request.params;
  try {
    const comments = await selectComments(article_id);
    response.status(200).send(comments);
  } catch (error) {
    next(error);
  }
};

exports.postComment = async (request, response, next) => {
  const { body } = request.body;
  const { username } = request.body;
  const { article_id } = request.params;
  try {
    const comment = await addComment(body, username, article_id);
    response.status(201).send(comment);
  } catch (error) {
    next(error);
  }
};
