const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 

//EJS 파일은 그냥 html과 똑같이 만들어 쓰시면 됩니다. 
// 근데 중간중간 EJS 문법으로 데이터를 꽂아넣을 뿐입니다.
// 그래서 파일을 빨리 하나 만들어봅시다. 
// 그 전에 주의할점 : 작업폴더 내에 views라는 이름의 폴더를 하나 만드신 후
// 거기에 list.ejs 파일을 만드셔아합니다. 
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb+srv://haemilyjh:dkskwp123@cluster0.dfc2c.mongodb.net/todoapp?retryWrites=true&w=majority', function(에러, client){
    if (에러) return console.log(에러)

    db = client.db('todoapp');  //todoapp이라는 database에 연결할거임

    //데이터를 넣어보자.
    // db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
    //     console.log('저장완료'); 
    // });  이런식으로 하면됌

  
    app.listen(8080, function() {
        console.log('8080으로 연결성공')
    });
})





app.get('/pet', function(요청, 응답){
    응답.send('반갑습니다.');

})

//html을 보내려면?
app.get('/', function(요청, 응답) { 
    응답.sendFile(__dirname +'/index.html')
  });1144

app.get('/write', function(요청, 응답) { 
  응답.sendFile(__dirname +'/write.html')
});  



//어떤 사람이 /add경로로 POST 요청을 하면 ~~코드를 실행해주세요
//우리가 POST를 한 경보는 요청에 숨겨져있다.
app.post('/add', function (요청, 응답) {

    //counter에서 게시물갯수(찾기위해 지정)를 찾고, 찾은 결과에서 총게시물갯수를 결과의 totalPost로 저장을 해준다.
    db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){     //결과 = counter의 전체데이터. { _id: 62f4a6bf2ddc2d3035195c43, totalPost: 1, name: '게시물갯수' } 이런 게 있다.
    //   console.log(결과)            //{ _id: 62f4a6bf2ddc2d3035195c43, totalPost: 1, name: '게시물갯수' }
    //   console.log(결과.totalPost)  //1

      var 총게시물갯수 = 결과.totalPost

      //post에 새로운 데이터 저장될 때마다 id는 총게시물갯수에서 하나를 더한값으로 저장해주기 위해서! 그리고 counter콜렉션의 totalPost도 역시 1 증가시켜야 한다.
      db.collection('post').insertOne({ _id : 총게시물갯수 + 1, 제목 : 요청.body.title, 날짜 : 요청.body.date }, function (에러, 결과) {
        db.collection('counter').updateOne( {name:'게시물갯수'}, { $inc: {totalPost:1} }, function(에러, 결과){

//updateOne 함수엔 파라미터가 세개가 필요합니다. 
// 왼쪽엔 { name : '게시물갯수' } 이렇게 자료를 찾을 수 있는 이름이라든지 쿼리문을 적어주면 됩니다. 
// 가운데는 여러분이 수정할 값을 입력해주시면 됩니다. 그런데 약간 특이합니다. 

// { $set : { totalPost : 100 } } 이렇게 넣어서 값을 아예 100으로 변경할 수도 있고
// { $inc : { totalPost : 5 } } 이렇게 넣어서 값을 5만큼 더해줄 수도 있습니다. 
// $ 표시 붙은게 바로 operator 라는 문법입니다. 여러 종류가 있으니 나머지는 필요할 때 찾아쓰도록 합시다. 

// 오른쪽은 그냥 콜백함수입니다. 수정이 실패나 성공시 실행할 코드를 안에 담으시면 됩니다. 


            if(에러){return console.log(에러)}
            응답.send('전송완료');
        })
      })
  
    })
  })





//list로 get요청 접속하면 실제 db에 저장된 데이터들로 html을 보여준다.
app.get('/list', function(요청, 응답) { 
    //디비에 저장된 post라는 collection 안에 데이터(조건필요)를 꺼내주세요
    db.collection('post').find().toArray(function(에러, 결과){      //.find().toArray();는 모든 데이터
        console.log(결과);

        //★★★찾은걸 list.ejs로 posts라는 이름을 써서 집어넣는 작업.
        응답.render('list.ejs', { posts : 결과 })
    });   
    
});  
