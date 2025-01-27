const { selectTopics } = require("../models/topics.models");

exports.getTopics = async (request, response, next) => {
  try {
    const result = await selectTopics();
    response.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
