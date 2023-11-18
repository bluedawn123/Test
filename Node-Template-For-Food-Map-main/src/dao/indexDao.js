const { pool } = require("../../config/database");

exports.exampleDao = async function (connection) {
  const Query = `SELECT * FROM Enrolment.Lectures;`;
  const Params = [];
  const rows = await connection.query(Query, Params);
  return rows;
};

exports.selectStudents = async function (connection) {
  const Query = `SELECT * FROM Enrolment.Students;`;
  const Params = [];
  const rows = await connection.query(Query, Params);
  return rows;
};
