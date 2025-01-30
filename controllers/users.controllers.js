const { request, response } = require("../app");

const { selectUsers } = require("../models/users.models");

exports.getUsers = async (request, response, next) => {
  try {
    const result = await selectUsers();
    response.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
