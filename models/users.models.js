const db = require("../db/connection");

const format = require("pg-format");

exports.selectUsers = async () => {
  try {
    const query = await db.query(`SELECT * FROM users`);
    return query.rows;
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};
