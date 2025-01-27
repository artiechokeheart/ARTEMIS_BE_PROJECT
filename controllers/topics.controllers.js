const { selectTopics } = require("../models/topics.models");

const getTopics = async (request, response, next) => {
  const queries = request.query;
  try {
    const result = await selectTopics();
    response.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTopics };
