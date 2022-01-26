const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));        //body-parser 는 요청 데이터 해석을 도와준다.

const MongoClient = require('mongodb').MongoClient;        //몽고디비 설치
app.set('view engine', 'ejs');                             //ejs설치

var db  //변수 필요해서 생성
MongoClient.connect('mongodb+srv://haemilyjh:dkskwp123@cluster0.dfc2c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){  //url에 접속되면 아래코드실행
    if(에러) {return console.log(에러)}      //에러발생시 출력

    db = client.db('todoapp');              //변수 db <= todoapp이라는 database폴더에 연결

    // //나이, 이름을 post에 저장해보자. 데이터 (object)형식에 유의하자!
    // db.collection('post').insertOne( {이름 : 'john', 나이 : 20}, function(에러, 결과){
    //     console.log('저장완료');
    // });    


    app.listen('8080', function(){
      console.log('listening on 8080')      //db접속되면 콘솔창에 실행
    });
  })

// app.listen(8080, function(){
//     console.log('8080포트 실행완료')
// });

// get요청 => 누군가가 /pet 으로 방문하면.. pet 관련된 안내문을 띄워보기
app.get('/pet', function(request, answer){
    answer.send('펫용품 쇼핑 할 수 있는 사이트 입니다..');
})

// get / => 홈페이지
app.get('/', (request, answer) => {
    answer.sendFile(__dirname + '/index.html')
})

// /write로 접속
app.get('/write', (request, answer) => {
    answer.sendFile(__dirname + '/write.html');
} )

// /write2로 접속
app.get('/write2', (request, answer) => {
    answer.sendFile(__dirname + '/write2.html');
} )

// /add 경로로 post 요청을 ____.html에서 했으면 ~~~를 실행하라. 참고로 form에서 post한 데이터들은 첫 파라미터(req)에 들어있다.  + //body-parser설치
app.post('/add', (요청, 응답) => {
    응답.send('전송완료')
    console.log(요청.body.data)       
    console.log(요청.body.title)  //데이터 송신!
    //숙제 : 어떤사람이 /add라는 경로로 post요청을 하면, 데이터 2개(날짜, 제목) 보내는데,  'post'라는 이름의 collection에 데이터 두개를 저장하기. 
    //{ 제목 : '어쩌구', 날짜 : '어쩌구'}형식으로.
    db.collection('post').insertOne({ 제목 : 요청.body.title, 날짜 : 요청.body.date}, function(에러, 결과){  //데이터 저장!
        console.log('저장완료');  //실행 후 에러 없으면 실행
    });    
    
});                   


// /list로 get요청하면 실제 db에 저장된 데이터들로 저장할 것들을 보여줌. 
app.get('/list', function(요청, 응답){             //  /list로 접속을 하면 함수 수행
    //1. //디비에 저장된 post라는 collection안의 모든 데이터 꺼내기
    db.collection('post').find().toArray(function(에러, 결과){          //컬렉센이 post인 데이터를 다루겠다. find() 까지만 하면 메타데이터도 오므로, toArray()도 붙혀준다.
        console.log(결과);         //가져온 데이터 출력
        응답.render('list.ejs', { posts : 결과});  //2. 1번에서 갖고온 데이터를 ejs파일에 집어넣어 데이터 보여주기
    });     

})
