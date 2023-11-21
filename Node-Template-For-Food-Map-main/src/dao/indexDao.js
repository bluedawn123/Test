const { pool } = require("../../config/database");

exports.exampleDao = async function (connection) {
  const Query = `SELECT * FROM Enrolment.Lectures;`;
  const Params = [];
  const rows = await connection.query(Query, Params);
  return rows;
};

exports.selectStudents = async function (connection, studentIdx) {
  const Query = `SELECT * FROM Enrolment.Students where studentIdx = ?;`;
  //const selectStudentByNameQuery = `SELECT * FROM Enrolment.Students where studentName = ? ;`; studentName이 ?로 전달된다.
  const Params = [studentIdx];
  
  //만약, studentName이 없으면, 모든 학생쿼리를 찾고, 아니면 학생이름만
  //let Query = StudentName ? selectAllStudentQuery : selectStudentByNameQuery 와 같다. 
  // let Query;
  // if(!studentName){
  //   Query = selectAllStudentQuery
  // } else{
  //   Query = selectStudentByNameQuery
  // }
    
  const rows = await connection.query(Query, Params);
  return rows;
};
