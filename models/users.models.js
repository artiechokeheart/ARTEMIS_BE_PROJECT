const db = require("../db/connection");

exports.selectUsers = async () => {
  try {
    const query = await db.query(`SELECT * FROM users`);
    return query.rows;
  } catch ({ status, error }) {
    error.status = status;
    return Promise.reject(error);
  }
};
