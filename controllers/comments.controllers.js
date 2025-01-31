const {
  selectComments,
  addComment,
  deleteComment,
} = require("../models/comments.models");

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

exports.deleteArticleComments = async (request, response, next) => {
  const { comment_id } = request.params;

  try {
    await deleteComment(comment_id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
