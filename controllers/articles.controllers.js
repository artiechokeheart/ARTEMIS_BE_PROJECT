const { request, response } = require("../app");
const {
  selectArticlesById,
  selectArticles,
  selectComments,
  addComment,
  updateArticlesById,
  deleteComment,
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

exports.deleteArticleComments = async (request, response, next) => {
  const { comment_id } = request.params;

  try {
    await deleteComment(comment_id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
