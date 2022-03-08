const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));        //body-parser 는 요청 데이터 해석을 도와준다.

const MongoClient = require('mongodb').MongoClient;        //몽고디비 설치
app.set('view engine', 'ejs');                             //ejs설치

var db  //변수 필요해서 생성
MongoClient.connect('mongodb+srv://haemilyjh:dkskwp123@cluster0.dfc2c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){  //url에 접속되면 아래코드실행

/////////////////////////////////////////////////////에러 처리///////////////////////////////////////////////////////////////
    if(에러) {return console.log(에러)}      //에러발생시 출력

    db = client.db('todoapp');              //변수 db <= todoapp이라는 database폴더에 연결

    ////예시기본 => 나이, 이름을 post에 저장해보자. 데이터 (object)형식에 유의하자!
    // db.collection('post').insertOne( {이름 : 'john', 나이 : 20}, function(에러, 결과){
    //     console.log('저장완료');
    // });    
//////////////////////////////////////////////////////연결 확인////////////////////////////////////////////////////////////////////////

    app.listen('8080', function(){                //로컬 포트 번호
      console.log('locallost 8080 실행완료')      //db접속되면 콘솔창에 실행
    });
  })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// get요청 => 누군가가 /pet 으로 방문하면.. pet 관련된 안내문을 띄워보기
app.get('/pet', function(request, answer){
    answer.send('펫용품 쇼핑 할 수 있는 사이트 입니다..');
})

// get / => /하나면 홈
app.get('/', (request, answer) => {
    answer.sendFile(__dirname + '/index.html')  //sendfile을 쓰면 html등 파일을 보낼 수 있다.
})

// /write로 접속
app.get('/write', (request, answer) => {
    answer.sendFile(__dirname + '/write.html');
} )

// /write2로 접속
app.get('/write2', (request, answer) => {
    answer.sendFile(__dirname + '/write2.html');
} )

//sendok으로 접속
app.get('/sendok', (request, answer) => {
    answer.sendFile(__dirname + '/sendok.html');
} )

///////////////////////////////////////////////////    데이터 보내기 //////////////////////////////////////////////////////////////////////////////////////////////////
//데이터를 submit 하면 데이터가 보내지고 /add창이 뜬다. (html 부분 확인)add 경로로 post 요청을 ~~~~.html에서 했으면 ~~~를 실행하라. 
//참고로 form에서 post한 데이터들은 첫 파라미터(요청)에 들어있다.  + //body-parser설치(=> submit, input, post한 데이터를 꺼내쓰려고 설치)
//
app.post('/add', (요청, 응답) => {
    //console.log(요청.body) -> {title : '~~', date : '~~~~'} 이렇게 출력하게 된다. 고로 body는 write.html의 전송된 데이터이다. 거기서 body.title등으로 응용
    
    응답.sendFile(__dirname + '/add.html');  //전송시 add.html 창 오픈

//글 번호 넘버링 => 1. _id 넘버링(영구지정 + 총게시물수+1)를 하기 위해 데이터컬렉션에서 데이터 찾는다
    db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){
        console.log(결과.totalPost)       //collection counter중 결과값들중 totalPost라는 이름의 데이터를 가져온다.
        let 총게시물갯수 = 결과.totalPost;

    //atlas에 데이터 저장하기 => add라는 경로로 post요청을 하면, 데이터 2개(날짜, 제목)전송.즉'post'라는 이름의 collection에 데이터 두개(제목,날짜)를 저장하기. 
    //서버의 post컬럭션에 데이터 저장!
    db.collection('post').insertOne({ _id : 총게시물갯수 + 1, 제목 : 요청.body.title, 날짜 : 요청.body.date}, function(에러, 결과){  //서버에 데이터 저장!
        console.log('데이터 보내기 저장완료');  //실행 후 에러 없으면 실행

        //counter컬렉션에 있는 totalPost도 하나씩 업데이트해서 증가시켜야 한다.
        db.collection('counter').updateOne({name:'게시물갯수'}, { $inc : {totalPost:1} }, function(에러, 결과){  //operator. $set=> 바꿀값, $inc=>기존값에 더해줄 값 등등
                                    //{어떤 데이터를 수정할지}, {operater필요{어떻게 수정할지..수정값}, 함수. => update를 어떻게 하고 무엇을 실행해라
            if (에러){return console.log(에러)}
            })   
        });
    });
    
});  ////// 정리 => add로 post요청하면, 1. db중, counter에서 총 게시물갯수 가져와 _id = 총게시물갯수+1 해서 새로운 데이터를 post컬렉션에 저장~!



/////////////////////////////////////////////////// /list에서 데이터 보여주기  /////////////////////////////////////////////////
// /list로 get요청하면 실제 db에 저장된 데이터들로 저장할 것들을 보여줌. 
app.get('/list', function(요청, 응답){             //  /list로 접속을 하면 함수 수행
    //1. //디비에 저장된 post라는 collection안의 모든 데이터 꺼내기
    db.collection('post').find().toArray(function(에러, 결과){     //컬렉센이 post인 데이터를 다루겠다. find() 까지만 하면 메타데이터도 오므로, toArray()도 붙혀준다.
        
    console.log(결과);         //가져온 데이터 콘솔창에 출력
    // _id: new ObjectId("61f10b827737edd6157940fb"),
    // '제목': 'posts 에러 해걸',
    // '날짜': '1.26 5:51'        형태

    응답.render('list.ejs', {postings : 결과});    //2. 1번에서 갖고온 결과(데이터)를 posting로 저장해 ejs파일에 집어넣어 데이터 보여주기
    });     

})


///////////////////////////////////////////////////삭제 기능 ///////////////////////////////////////////////////////////////////////////
//요청.body에 담겨온 게시물번호를 가진 글을 db에서 찾아서 삭제하는 기능
app.delete('/delete', function(요청, 응답){           //list.ejs 에서 DELETE요청을 했으므로, 여기서 DELETE요청하는 코드가 필요
    console.log(요청.body);                          //요청.body 확인 => ajax의 data에서 설정한 것이 온다. { _id: '15' } => 아직 숫자가 아니니 숫자로 바꿔야함
    요청.body._id = parseInt(요청.body._id);         // id : '1'이므로, int형으로 변환돼어 요청.body의 따옴표가 없어짐  
    console.log(요청.body._id)  //parseInt를 사용해서 딱 15 이렇게 나옴!!

    //post에서 데이터를 삭제해야해서 db.collection('post')사용
    db.collection('post').deleteOne(요청.body, function(에러, 결과){     //post컬렉션(글 저장디비)에서 deleteOne(삭제할 것, 콜백함수) 함수 사용
        console.log('삭제완료');  //terminal창
        
        응답.status(200).send({message : '삭제!성공했습니다.'});               //요청 성공시 응답코드 200 송신, 실패시 400
     })               
})

////////////////////////////////////////////detail 로 접속하면 detail.ejs 보여줌 /////////////////////////////////////////////
app.get('/detail/:id', function(요청, 응답){       //:아무거나  => :을 붙히면 함수 실행
    db.collection('post').findOne({_id : parseInt(요청.params.id)}, function(에러, 결과){   // __/ detail/4  면, 요청.params.id 가 4. 즉 4인데이터를 서버에서 갖고오고 결과에 저장됌.
                                        //params.id가 string이므로 int형이 필요. 요청.id는 문자이므로, 
        console.log('삭제완료')
        console.log(결과);              //ex){ _id: 11, '제목': '밥먹기', '날짜': '1.28' }
        응답.render('detail.ejs', { data : 결과 });               //앞쪽이름으로 뒤쪽데이터로 저장

    })
    

})