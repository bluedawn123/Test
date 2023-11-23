const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");

//제일중요한 식당조회
// 예시 코드
exports.readRestaurants = async function (req, res) {
  const {category} = req.query;

  //카테고리 값이 넘어 왔다면 유효한지 확인(8가지 목록안에 해당되어야한다.)
  if (category){
    const validCategory = [
      "한식", "중식", "일식", "양식", "분식", "구이", "회/초밥", "기타",
    ];

    if (!validCategory.includes(category)){
        return res.send({
        isSuccess: false,
        code: 400, // 요청 실패시 400번대 코드
        message: "유효한 카테고리가 아닙니다.",
      });
    }
  }


  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectRestaurants(connection, category);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "식당 목록 요청 성공",
      });
    } catch (err) {
      logger.error(`readRestaurants Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readRestaurants DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

// 예시 코드
exports.example = async function (req, res) {

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.exampleDao(connection);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};


exports.readStudents = async function (req, res) {
  //const {studentName} = req.query;  const studentName = req.query.studentName; 이것과 같다.
  const {studentIdx} = req.params;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectStudents(connection, studentIdx);

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`readStudents Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`readStudents DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

//학생 생성. 데이터 전달. body에 담아서 보낸다. 
exports.createStudent = async function (req, res) {
  const {studentName, major, birth, address} = req.body 
  console.log(studentName, major, birth, address)

  if(
    typeof studentName !== "string" ||
    typeof major !== "string" ||
    typeof address !== "string" 
  ){
    return res.send({
      isSuccess : false,
      code : 400,
      message : "값을 제대로 넣으라"
    });
  };

  //날자형식검사
  var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  //console.log(regex.test("2020-09-25")) true

  if(!regex.test(birth)){
    return res.send({
      isSuccess : false,
      code : 400,
      message : "날짜를 제대로 넣으라"
    });
  }

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.insertStudents(
        connection, 
        studentName,
        major, 
        birth, 
        address
        );

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 실패시 400번대 코드
        message: "학생 생성 요청 성공",
      });
    } catch (err) {
      logger.error(`createStudents Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`createStudents DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }

};