require('dotenv').config()
const {ObjectId} = require('mongodb');  //objectId를 쓰기 위해서.(채팅방 관련)
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 

//EJS 파일은 그냥 html과 똑같이 만들어 쓰시면 됩니다. 
// 근데 중간중간 EJS 문법으로 데이터를 꽂아넣을 뿐입니다.
// 그래서 파일을 빨리 하나 만들어봅시다. 
// 그 전에 주의할점 : 작업폴더 내에 views라는 이름의 폴더를 하나 만드신 후
// 거기에 list.ejs 파일을 만드셔아합니다. 

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');

app.use('/public', express.static('public')); //나는 static파일을 보관하기 위해 public을 쓸거다

const MongoClient = require('mongodb').MongoClient


// 회원인증 위한
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 

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

// (env 파일을 적용하는 server.js 코드 ★★추후 손보자)

// var db;
//   MongoClient.connect(process.env.DB_URL, function(err, client){
//   if (err) return console.log(err)
//   db = client.db('Example1');
//   app.listen(process.env.PORT, function() {
//     console.log('listening on 8080')
//   })
// }) 

//html을 보내려면?
app.get('/', function(요청, 응답) { 
    // 응답.sendFile(__dirname +'/index.html') -> ejs로 변경
    응답.render('index.ejs');
  });

app.get('/write', function(요청, 응답) { 
  // 응답.sendFile(__dirname +'/write.html') -> ejs로 변경
  응답.render('write.ejs');
});  


////////////////////////////////////////////////////routes로 정리해보기

//app.use()를 사용해서 전역 미들웨어의 형식으로 라우터를 넣어주시면 라우터를 적용
app.use('/shop', require('./routes/shop.js'))  //요청과 응답 사이에 실행되는 코드가 바로 미들웨어

// 누군가 /post 경로로 요청하면 실행할 미들웨어는 app.use('/post', 미들웨어명)
// 누군가 /list 경로로 요청하면 실행할 미들웨어는 app.use('/list', 미들웨어명)
app.get('/shop/shirts', function(요청, 응답){
  응답.send('셔츠 파는 페이지입니다.');
});

app.get('/shop/pants', function(요청, 응답){
  응답.send('바지 파는 페이지입니다.');
}); 












//------------------------------------------------------리스트 페이지 //------------------------------------------------------
//list로 get요청 접속하면 실제 db에 저장된 데이터들로 html을 보여준다.
app.get('/list', function(요청, 응답) { 
    //디비에 저장된 post라는 collection 안에 데이터(조건필요)를 꺼내주세요
    db.collection('post').find().toArray(function(에러, 결과){      //.find().toArray();는 모든 데이터
        console.log(결과);  //{ _id: 13, '제목': '알하기 쉬기', '날짜': '111' }, 이런식

        //★★★찾은걸 list.ejs로 posts라는 이름을 써서 집어넣는 작업.
        응답.render('list.ejs', { posts : 결과 })   //{ _id: 13, '제목': '알하기 쉬기', '날짜': '111' } 이런 많은 데이터를 posts로 list.ejs로 보냄
    });
 
});  



//detail로 접속하면 detail.ejs를 보여준다. 단, detail2, detail3 등이 다 달라야 한다. 
app.get('/detail/:id', function(요청, 응답){      //   /:id에서 :id부분이 중요. url의 파라미터
  db.collection('post').findOne( {_id : parseInt(요청.params.id) }, function(에러, 결과){    
    //해석 => 컬렉션post에서 _id를 찾는데, 그것이 파라미터중 :id 의미이고 바로 그것이 parseInt(요청.params.id) 이다.      
    // 요청.params.id ?? => 파라미터중 :id 의미. detail/4 면 요청.params.id가 4가 된다.  그냥 외워야 한다.
    //그리고 찾은 결과물이 결과로 저장된다. 
    
    console.log(결과)     //detail/8의 경우, { _id: 8, '제목': '똥싸기', '날짜': '123' } 이런식으로 찾아준다. 
    응답.render('detail.ejs', { data : 결과 } );  //찾은 결과를 data라는 이름으로 detail.ejs 로 보내준다.

  })
})








 
//------------------------------------------------------수정 기능 //------------------------------------------------------
//edit 페이지. 단 edit/숫자 로 접속하면 해당 숫자의 데이터를 보여줘야 한다.
//예를들어, edit/2로 접속하면 2번 게시물의 데이터(제목, 날짜)를 edit.ejs 로 보내면 된다.
app.get('/edit/:id', function(요청, 응답){
  db.collection('post').findOne( {_id : parseInt(요청.params.id)} , function(에러, 결과){   //이 부분은 이해가 안되면 위를 보자. 그냥 암기해야한다.
    console.log(결과)    //edit/10이면, { _id: 10, '제목': '일하기', '날짜': '1123123' } 를 출력(예시)
    응답.render('edit.ejs', {post : 결과 })  //찾은 결과데이터를 post로 해서 edit.ejs에 보낸다. 
  })
})

//서버로 put 요청 들어오면 게시물 수정 
app.put('/edit', function(요청, 응답){
  //폼에 담긴 제목, 날짜 데이터를 가지고 db.collection에다가 업데이트를 해줘야 한다. 
  db.collection('post').updateOne({ _id : parseInt(요청.body.id) }, { $set : { 제목 : 요청.body.title, 날짜 : 요청.body.date, 내용 : 요청.body.what } }, function(에러, 결과){             //updateOne(어떤게시물을 수정할건지?, 수정값, 콜백함수)
    //아이디가 ~~인 데이터를 찾아서 ~~ 이렇게 바꾼다.
    //_id 를 가져오는 방법 ==>> edit.ejs에 value="<%= post._id %>" name="id" 상태로 있는데 위 코드를 {_id : 요청.body.id } 이런식으로 가져온다. 
    console.log('수정완료...제발')
    //다른페이지로 이동시키기
    응답.redirect('/list')
  })

})

//------------------------------------------------------//------------------------------------------------------//------------------------------------------------------
app.get('/login', function(요청, 응답){
  응답.render('login.ejs')
});
app.get('/fail', function(요청, 응답){
  응답.render('fail.ejs')
});
app.get('/notyet', function(요청, 응답){
  응답.render('notyet.ejs')
});

app.get('/testing', function(요청, 응답){
  응답.render('testing.ejs')
});


//-----------------------------------------------------------로그인 기능 --------------------------------------------------------------------
//로그인 페이지에서 로그인을 하면 아이디, 비번을 검사해야 => 누군가 로그인폼에서 POST 요청을 하면 ~~를 실행해주세요 라는 코드
//1. post 요청해서 form을 전송하면, 
app.post('/login', passport.authenticate('local', 
  {failureRedirect : '/fail'}), function(요청, 응답){       //failureRedirect라는 부분은 로그인 인증 실패시 이동시켜줄 경로를 적으시면 됩니다. 위의 코드는 실패시 /fail 경로로 유저를 이동
  응답.redirect('/')
});

//2. 이하 코드를 검사한다. 
//아이디 인증방법
passport.use(new LocalStrategy({
  usernameField: 'id',             //form에 입력된 id, pw들
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)   

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    //참고로 done()은 (서버에러, 성공시사용자db데이터, 메세지)
    
    //모든것이 다 일치한 경우
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)   //★★★여기 결과값이 아래의 별의 user에 들어간다. 
    } 
      //비번이 틀린경우. 즉 입력한비번이 결과.pw랑 다른 경우.
      else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

//3. 검사가 끝나서 로그인 된 경우, 세션을 하나 만들어줘야 한다. 
//세션 만들고 세션아이디 발급해서 쿠키로 보내주기 
// 아이디/비번을 DB데이터와 비교해서 이게 맞다면 어떻게 해야합니까.
// 세션 방식을 적용한다고 했으니 세션데이터를 하나 만들어주면 되겠죠? (이건 라이브러리가 알아서 합니다)
// 그리고 세션데이터에 포함된 세션아이디를 발급해서 유저에게 보내면 됩니다. 
// 실은 쿠키로 만들어서 보내주시면 됩니다. 
// 세션데이터를 만들고 세션아이디를 만들어 보내주는 것도 라이브러리 도움을 받으면 딱 3줄이면 됩니다. 


//위의 결과로 세션 생성후 을 저장시키는 코드(로그인 성공시 발동)
passport.serializeUser(function (user, done) {   //★★★여기 user값은 위의 결과값
  done(null, user.id)  //★★★★★user.id로 세션을 만든다. 즉 관련 유저와 관련된 모든 정보
  //세션데이터를 만들고 세션의 id 정보를 쿠키로 보냄. 
});


//마이페이지 접속시 발동. 이 세션 데이터를 가진 사람을 db에서 찾아주세요? = 
//deserializseUser함수 = 로그인한 유저의 세선 정보를 db에서 찾아서 넣는 역할
passport.deserializeUser(function (아이디, done) {  //★★아이디는 위의 user.id와 동일  //이럼 세션정보가 db 'login'에 다 박힌다. 
  db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {  //id가 ~~인 걸 찾아온다. 
    done(null, 결과)  
    console.log(결과)  //
  })
});


//------------------------------------------------------ 마이페이지 //------------------------------------------------------//------------------------------------------------------
//미들웨어 함수를 만들어서 사용해보자. 
//마이페이지  get() 이런 함수 안에 저렇게 미들웨어를 집어넣을 수 있다.
//mypage 요청과 mypage.ejs 응답 사이에 로그인했니라는 코드를 실행시켜준다. 
app.get('/mypage', 로그인했니, function (요청, 응답) {   //mypage로 접속하면 로그인했니라는 함수를 실행하고 다음 함수를 실행한다. 
  console.log('마이페이지 접속완료'); 

  //이하 부분은 deserializeUser 작성 후 작성해야 된다. (세션정보를 db 'login'에 다 박은후 해야하므로.)
  console.log(요청.user);                               //{ _id: 630499c000ca9b23448508ea, id: 'test2', pw: 'test2' } 와 같은 회원가입 때 만든 모든 정보가 있다. 
  console.log(요청.user._id);                           //630499c000ca9b23448508ea
  응답.render('mypage.ejs', { 사용자 : 요청.user})       //mypage로 사용자의 세션 정보를 보내준다. 
}) 


function 로그인했니(요청, 응답, next) {   //요청.user 가 있으면 next()로 통과시켜주고요, 없으면 에러메세지를 응답.send() 해주세요~" 라는 뜻
  if (요청.user) {  
    console.log(요청.user)
    console.log('확인용')
    next() 
  } 
  else { 
    응답.render('fail.ejs') 
  } 
} 
 

//----------------------------------------------------------- 가입기능 --------------------------------------------------------------------
//유저가 입력한 id/pw를 db에 저장
app.post('/register', function(요청, 응답){
  db.collection('login').insertOne( { id: 요청.body.id, pw : 요청.body.pw }, function(에러, 결과){
    응답.redirect('/')
  } )

})






//-----------------------------------------------------------검색기능 --------------------------------------------------------------------
//queryString을 요청받으면 해당 제목을 가진 게시물을 DB에서 찾아서 보내주는 방식

app.get('/search', function(요청, 응답){  //이전에 list.ejs에서 버튼누르면 search?value=뭐시기 까지 만들어놨다. 그 이후
  
  //1. 검색창에 입력한 값을 추출하기
  //요청.query -> queryString이 담겨있는 부분. Ex)검색창에 ddd라고 치면 { value: 'ddd' } 출력. 요청.query.value면 ddd만 !
  console.log(요청.query.value)   //이닦기, 똥싸기 등등
  

  //2. 추출한 결과물을 db에서 찾기 => 제목이 똥싸기 인걸 db에서 찾아서 결과를 array로 변환
  var 검색조건 = [
    {
      $search: {
        index: 'titleSearch',  //우리가 mongodbAtlas에서 만든 index명

        //검색요청 부분
        text: {
          query: 요청.query.value,  //실제 검색어
          path: '제목'  // collection안의 어떤 항목에서 찾을것인가? 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
        }
      }
    },
    { $sort : { _id : -1 }},   //기타 정렬조건
    { $limit : 10},
    { $project : { 제목: 1, _id : 1, score: { $meta : "searchScore"} }}   //아래 요약해 놓음
  ] 
  db.collection('post').aggregate(검색조건).toArray(function(에러, 결과){   
  
  //2-1.find( { 제목 : 요청.query.value }) => find( { $text : { $search: 요청.query.value }} ) 로 변환. 이유? 검색한 결과가 포함된 다른 것들도 찾아줌
  
  //몽고디비의 단점 = 띄어쓰기 기준이라 단어의 일부는 검색이 안된다...ㅅㅂ
  //2-2.db.collection('post').find( { $text : { $search: 요청.query.value }} ).toArray(function(에러, 결과){   이것도 안쓸거임. 

  //2-3. aggregate()사용 => aggregate() 안에 [ {검색조건1}, {검색조건2} ... ] 이렇게 조건을 여러개 집어넣을 수 있다.

    console.log(결과)     // [ { _id: 9, '제목': '괴롭히기', '날짜': '11123' } ]  이런식으로 출력

  //3. search.ejs 페이지 만들어주기. list ejs와는 다르게 찾아서 나온 것들만 결과로 보여준다!
    응답.render('search.ejs', { posts : 결과})  //결과를 posts로 해서 search.ejs(검색 결과 페이지)
  
  })

})
// $sort를 쓰면 결과를 정렬해서 가져옵니다. _id를 오름차순으로 정렬해주세요~ 라고 썼습니다.
// $limit을 쓰면 결과를 제한해줍니다. 맨위의 10개만 가져오라고 시켰습니다. 
// $project를 쓰면 찾아온 결과 중에 원하는 항목만 보여줍니다. 0은 안보여주고 1은 보여주라는 뜻입니다. 위의 코드는 _id는 빼고 제목만 가져오겠군요. 
// 이 외에도 백만개의 $연산자가 있다









//-----------------------------------------------------------글작성, 혹은 글 업로드 기능 --------------------------------------------------------------------
//어떤 사람이 /add경로로 POST 요청을 하면 ~~코드를 실행해주세요
//우리가 POST를 한 경보는 요청에 숨겨져있다.
app.post('/add', function (요청, 응답) {

  //counter에서 게시물갯수(찾기위해 지정)를 찾고, 찾은 결과에서 총게시물갯수를 결과의 totalPost로 저장을 해준다.
  db.collection('counter').findOne({name : '게시물갯수'}, function(에러, 결과){     //결과 = counter의 전체데이터. { _id: 62f4a6bf2ddc2d3035195c43, totalPost: 1, name: '게시물갯수' } 이런 게 있다.
  //   console.log(결과)            //{ _id: 62f4a6bf2ddc2d3035195c43, totalPost: 1, name: '게시물갯수' }
  //   console.log(결과.totalPost)  //1

    var 총게시물갯수 = 결과.totalPost

    var 저장할거 = { _id : 총게시물갯수 + 1, 작성자:요청.user._id, 제목:요청.body.title, 날짜:요청.body.date, 내용:요청.body.what}  //작성자 : 요청.user._id 추가


    //post에 새로운 데이터 저장될 때마다 id는 총게시물갯수에서 하나를 더한값으로 저장해주기 위해서! 그리고 counter콜렉션의 totalPost도 역시 1 증가시켜야 한다.
    db.collection('post').insertOne( 저장할거, function (에러, 결과) {
      db.collection('counter').updateOne( {name:'게시물갯수'}, { $inc: {totalPost:1} }, function(에러, 결과){

//updateOne 함수엔 파라미터가 세개가 필요합니다. 
// 왼쪽엔 { name : '게시물갯수' } 이렇게 자료를 찾을 수 있는 이름이라든지 쿼리문을 적어주면 됩니다. 
// 가운데는 여러분이 수정할 값을 입력해주시면 됩니다. 그런데 약간 특이합니다. 

// { $set : { totalPost : 100 } } 이렇게 넣어서 값을 아예 100으로 변경할 수도 있고
// { $inc : { totalPost : 5 } } 이렇게 넣어서 값을 5만큼 더해줄 수도 있습니다. 
// $ 표시 붙은게 바로 operator 라는 문법입니다. 여러 종류가 있으니 나머지는 필요할 때 찾아쓰도록 합시다. 

// 오른쪽은 그냥 콜백함수입니다. 수정이 실패나 성공시 실행할 코드를 안에 담으시면 됩니다. 
          if(에러){return console.log(에러)}
          응답.render('add.ejs');
      })
    })

  })
})




// console.log(요청.user);                               //{ _id: 630499c000ca9b23448508ea, id: 'test2', pw: 'test2' }
// console.log(요청.user._id);                           //630499c000ca9b23448508ea








//--------------------------------------------------------------삭제기능-----------------------------------------------------
//7번 게시물을 삭제하라~라는 요청이 들어오면 제요청중인 유저의 요청.user._id와 그게 7번 글에 저장되어있는 작성자 정보랑 일치하면 삭제
///delete경로로 DELETE 요청을 하면 이하 코드로 해주세요
app.delete('/delete', function(요청, 응답){           //delete로 왔을때 뭘 수행할것이냐?
  console.log(요청.body)         // 요청을 받았을때 보낸 데이터. 일반적으로 요청.body에 들어있으므로.
                                 // list.ejs에서 data : {_id : 글번호 } 부분. { _id: '11'}, {_id: '13' } 이런식이므로 숫자가 아니므로 parseInt필요

  //요청.body에 담겨온 게시물번호(data)를 가진 글을 db에서 찾아서 삭제하는 코드. 
  요청.body._id = parseInt(요청.body._id)   //참고로 따옴표 제거를 위해서는 parseInt 사용. 비로소 숫자로 됌
                                            //요청.body가 {_id : '1'}가 원래는 이렇게 생겼는데 1로 변환해주는 작업

  //실제 로그인중인 유저의 _id이면서 작성자가 ~~~인 경우만 삭제. ex)게시판 필드중 _id가 1이고 작성자가 630499c000ca9b23448508ea 인걸 만족하는 게시물만 지워
  var 삭제할데이터 = {_id : 요청.body._id, 작성자 : 요청.user._id }

  db.collection('post').deleteOne( 삭제할데이터 , function(에러, 결과){

    console.log(요청.body._id)
    console.log(요청.user._id)   //630cacf196e41e2f10484785
    console.log('삭제완료');

    응답.status(200).send( {message : '삭제 성공했습니다. '});   //성공시
  })
})







//////////////////////////////////////////////////이미지 업로드////////////////////////////////////////////////////////////////////////////////////////////////////
let multer = require('multer');   //require 어쩌구는 multer 설치한거 갖다쓰겠습니다~ 라는 뜻
var storage = multer.diskStorage({  //diskStorage라는 함수를 쓰면 업로드된 파일을 하드에 저장

  destination : function(req, file, cb){  //destination : 업로드된 파일을 하드 어떤 경로에 저장할지 정하는 부분
    cb(null, './public/image') 
  },
  filename : function(req, file, cb){  // filename : 파일의 이름을 결정하는 부분입니다.
    cb(null, file.originalname )   //file.originalname이라고 쓰면 그냥 원본 그대로라는 뜻
                                   //file.originalname + '오늘날짜~' 이런 식으로 저장하면 중복없이 유니크하게 저장할 수도
  }
});

var upload = multer({storage : storage});   //upload 변수를 post시 소환하면 된다. 


app.get('/upload', function(요청, 응답){
  응답.render('upload.ejs')
})

/////////////////////////////////////////////////////////이미지 업로드 했을때 public/image에 저장하기///////////////////////////////////////////////////////
//누간가가 /upload로 post요청하면 ~파일을 public/image에 저장. 미들웨어처럼 실행
// /upload로 POST 요청을 하면 upload.single('input의name속성') 을 실행 => multer 셋팅한대로 알아서 지가 업로드한 파일을 처리
app.post('/upload', upload.single('profile'), function(요청, 응답){   //upload실행은 upload.single('input의 name속성')  <- upload.ejs에서 확인
  응답.send('업로드완료')
})

//업로드한 이미지 보여주기 => /image/:파라미터 로 접속하면 /public/image/:파라미터 라는 파일을 보내주세요
app.get('/image/:imageName', function(요청, 응답){
  응답.sendFile( __dirname + '/public/image/' + 요청.params.imageName )   //요청.params.이름 => 이건 중요하니 꼭 기억하자
})
// 일반 파일을 유저에게 보내고 싶으면 sendFile이라는 함수를 쓰면 됩니다. (강의 초반에 잠깐 보고 지나가긴 했습니다)
// 그리고 __dirname은 특별한 기본 변수인데 출력해보시면 그냥 현재 파일의 경로가 나옵니다. 현재는 server.js 












////////////////////////////////////////////////////////채팅하기 기능 관련 ////////////////////////////////////////////////
app.post('/chatroom', 로그인했니, function(요청, 응답){
  
  var 저장할거 = {   //1. 채팅하기 눌렀을때 전송되는 데이터들
    title : '채팅방',
    member : [ObjectId(요청.body.당한사람id), 요청.user._id],   //채팅당한사람과 현재 로그인해서 채팅건사람(630cacf196e41e2f10484785이런거)
                                                               //ObjectId => 그냥 object화
    date : new Date()
  }

  //2. 1에서 한것을 디비에 저장
  db.collection('chatroom').insertOne(저장할거).then( (결과)=>{
    console.log('채팅방 데이터 생성완료')

  })
})


////////////////////////////////////////////채팅방 접속시 chat.ejs
//아이디어? chatroom 컬렉션에서 내 아이디가 있으면 그것을 다 갖고와주면 된다.
app.get('/chat', 로그인했니, function(요청, 응답){ 
  db.collection('chatroom').find({ member : 요청.user._id }).toArray().then((결과)=>{    
    //요청.user._id => 현재 로그인한 유저의 id. 즉 chatroom컬렉션의 member항목에서 현재 로그인한 유저의 id가 있는 경우 찾아온다. 
    //채팅방이 존나 많을 거 아님? 각 데이터의 멤버항목에서 지금접속한 내 id가 있으면, 그걸 갖고오는 과정

    console.log(결과);  
    //참고로 해당 항목의 모든 데이터를 갖고온다. 
    // {
    //   _id: 630ccb3d13bd1a4d98702d35,
    //   title: '채팅방',
    //   member: [ 630cad4696e41e2f10484786, 630cacf196e41e2f10484785 ],
    //   date: 2022-08-29T14:20:45.600Z 
    // },
    응답.render('chat.ejs', {data : 결과})   //chat.ejs에 찾아준 결과를 보내준다. (위의 예 참조)
  })
}); 


//////////////////////////////////////chat.ejs에서 전송누르면 데이터 보내주기
//누군가가 message라는 경로로 post요청
app.post('/message', 로그인했니, function(요청, 응답){
  var 저장할거 = {
    parent : 요청.body.parent,        //보낸 채팅방id
    userid : 요청.user._id,           //보낸 유저id
    content : 요청.body.content,      //보낸 채팅내용
    date : new Date(),
  }
  db.collection('message').insertOne(저장할거)      
  .then((결과)=>{
    console.log('채팅내용 저장성공')
    응답.send('채팅내용 저장완료');
  })
}); 

//////////////////////////////////////////소통 채널 //////////////////////////////////////  => Header 라는 정보의 connection 항목을 keep-alive로 설정
app.get('/message/:parentid', 로그인했니, function(요청, 응답){

  //Header  => 서버도 응답시 유저에게 몰래 서버정보를 전달. 이 정보를 보관하는 곳은 Header
  //유저 -> 서버 이렇게 전달되는 Header는 Request Header, 서버 -> 유저 이렇게 전달되는 Header는 Response Header
  응답.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  
  //db의 채팅방에서 속한 채팅 메세지들을 가져와서 입력하는 방식
  //★★★요청.params.parentid
  db.collection('message').find({ parent: 요청.params.parentid }).toArray()  //어떤 채팅방을 누르면 그 id가 요청.params.parentid로 가게 만들기
                                                                             //왜냐? 각각의 채팅방은 고유 id가 있고 거기에 저장된 정보도 다르기 때문
  .then((결과)=>{
    console.log(결과);

    응답.write('event: test\n');                      //유저에게 데이터 전송은 event : 보낼데이터이름 \n
    응답.write(`data: ${JSON.stringify(결과)} \n\n`);  //                      data : 보낼데이터 \n \n

    //(참고) 서버에서 실시간 전송시 문자자료만 전송가능하다. 그런데 결과는 [{}, {}]이런 형태일 것인다. 
    //이떄 ${JSON.stringify(결과)}를 사용한다. 
  });

});


















///
app.get('/projects', function(요청, 응답) { 
  // 응답.sendFile(__dirname +'/index.html') -> ejs로 변경
  응답.render('projects.ejs');
});

app.get('/aboutme', function(요청, 응답) { 
  // 응답.sendFile(__dirname +'/index.html') -> ejs로 변경
  응답.render('aboutme.ejs');
});