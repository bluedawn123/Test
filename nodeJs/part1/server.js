

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








app.get('/pet', function(요청, 응답){
    응답.send('반갑습니다.');

})

//html을 보내려면?
app.get('/', function(요청, 응답) { 
    // 응답.sendFile(__dirname +'/index.html') -> ejs로 변경
    응답.render('index.ejs');
  });

app.get('/write', function(요청, 응답) { 
  // 응답.sendFile(__dirname +'/write.html') -> ejs로 변경
  응답.render('write.ejs');
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


app.delete('/delete', function(요청, 응답){           //delete로 왔을때 뭘 수행할것이냐?
  console.log(요청.body)         // 요청을 받았을때 보낸 데이터를 알아보자. 일반적으로 요청.body에 들어있으므로.

  //요청.body에 담겨온 게시물번호(data)를 가진 글을 db에서 찾아서 삭제하는 코드.  참고로 따옴표 제거를 위해서는 parseInt 사용
  요청.body._id = parseInt(요청.body._id)   //참고로 따옴표 제거를 위해서는 parseInt 사용
  db.collection('post').deleteOne(요청.body, function(에러, 결과){
    console.log('삭제완료');
    응답.status(200).send( {message : '삭제 성공했습니다. '});   //성공시

  })
})


//detail로 접속하면 detail.ejs를 보여준다. 단, detail2, detail3 등이 다 달라야 한다. 
app.get('/detail/:id', function(요청, 응답){      //   /:id에서 :id부분이 중요. url의 파라미터
  db.collection('post').findOne( {_id : parseInt(요청.params.id) }, function(에러, 결과){    //해석 => 컬렉션post에서 _id를 찾는데, 그것이 파라미터중 :id 의미이고 바로 그것이 parseInt(요청.params.id) 이다.      
    // 요청.params.id ?? => 파라미터중 :id 의미. detail/4 면 요청.params.id가 4가 된다.  그냥 외워야 한다.
    //그리고 찾은 결과물이 결과로 저장된다. 
    
    console.log(결과)     //detail/8의 경우, { _id: 8, '제목': '똥싸기', '날짜': '123' } 이런식으로 찾아준다. 
    응답.render('detail.ejs', { data : 결과 } );  //찾은 결과를 data라는 이름으로 detail.ejs 로 보내준다.

  })
})



//edit 페이지. 단 edit/숫자 로 접속하면 해당 숫자의 데이터를 보여줘야 한다.
//예를들어, edit/2로 접속하면 2번 게시물의 데이터(제목, 날짜)를 edit.ejs 로 보내면 된다.

app.get('/edit/:id', function(요청, 응답){
  
  db.collection('post').findOne( {_id : parseInt(요청.params.id)}, function(에러, 결과){   //이 부분은 이해가 안되면 위를 보자. 그냥 암기해야한다.
    console.log(결과)    //edit/10이면, { _id: 10, '제목': '일하기', '날짜': '1123123' } 를 출력(예시)
    응답.render('edit.ejs', {post : 결과 })  //찾은 결과데이터를 post로 해서 edit.ejs에 보낸다. 
  })
  
})

//서버로 put 요청 들어오면 게시물 수정 
app.put('/edit', function(요청, 응답){
  //폼에 담긴 제목, 날짜 데이터를 가지고 db.collection에다가 업데이트를 해줘야 한다. 

  db.collection('post').updateOne({ _id : parseInt(요청.body.id) }, { $set : { 제목 : 요청.body.title, 날짜 : 요청.body.date} }, function(에러, 결과){             //updateOne(어떤게시물을 수정할건지?, 수정값, 콜백함수)
    //아이디가 ~~인 데이터를 찾아서 ~~ 이렇게 바꾼다.
    //_id 를 가져오는 방법 ==>> edit.ejs에 value="<%= post._id %>" name="id" 상태로 있는데 위 코드를 {_id : 요청.body.id } 이런식으로 가져온다. 

    console.log('수정완료...제발')
    
    //다른페이지로 이동시키기
    응답.redirect('/list')

  })

})


app.get('/login', function(요청, 응답){
  응답.render('login.ejs')
});

app.get('/fail', function(요청, 응답){
  응답.render('fail.ejs')
});


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


//id를 이용해서 세션을 저장시키는 코드(로그인 성공시 발동)
passport.serializeUser(function (user, done) {   //★★★여기 user값은 위의 결과값
  done(null, user.id)
  //세션데이터를 만들고 세션의 id 정보를 쿠키로 보냄. 
});


//마이페이지 접속시 발동. 이 세션 데이터를 가진 사람을 db에서 찾아주세요?
passport.deserializeUser(function (아이디, done) {
  done(null, {})
}); 


//마이페이지
app.get('/mypage', function (요청, 응답) {
  응답.render('mypage.ejs', {})
}) 