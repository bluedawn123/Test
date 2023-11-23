const { pool } = require("../../config/database");

exports.selectRestaurants = async function (connection, category) {
  //1. 모든 레스토랑 조회
  const selectAllRestaurantsQuery = `select  title, address, category, videoUrl From FoodMap.restaurants where status = 'A';`;
  
  //2. 모든레스토랑조회하면서 category가 해당되는 것 
  const selectCategorizedRestaurantsQuery = `select  title, address, category, videoUrl From FoodMap.restaurants where status = 'A' and category = ?;`;

  const Params = [category];

  //3항 연산자를 통한 확인
  const Query = category ? selectCategorizedRestaurantsQuery : selectAllRestaurantsQuery;

  const rows = await connection.query(Query, Params);
  return rows;
};


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


exports.insertStudents = async function (connection, studentName, major, birth, address) {
  const Query = `insert into Enrolment.Students(studentName, major, birth, address) values (?,?,?,?);`;
  const Params = [studentName, major, birth, address];
  const rows = await connection.query(Query, Params);
  return rows;
};