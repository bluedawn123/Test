module.exports = function (app) {
  const index = require("../controllers/indexController");
  const jwtMiddleware = require("../../config/jwtMiddleware");

  // 라우터 정의
  // app.HTTP메서드(uri, 컨트롤러 콜백함수)
  app.get("/test", function(req, res){
    res.send('test 실행되는중')
  });

  app.get("/dummy", index.example);
  app.get("/students/:studentIdx", index.readStudents);  //학생한명조회
  


};
