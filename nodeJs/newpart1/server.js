const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs') 
//post를 사용하기 위한 2줄 코드
app.use(express.json())
app.use(express.urlencoded({extended:true})) 

const { MongoClient, ObjectId } = require('mongodb')

let db;
const url = 'mongodb+srv://haemilyjh:dkskwp123@cluster0.dfc2c.mongodb.net/todoapp?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum');
  app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
    })
    }).catch((err)=>{
    console.log(err)
})

//get기초 !!list에 접속하면 post컬렉션에 있는 것들을 뺴내와보자. 참고로 async await은 매우중요하다.
app.get('/list', async (요청, 응답) => {
    let result = await db.collection('post').find().toArray() //참고로 어레이형 안의 오브젝트로 저장된다.
    응답.render('list.ejs', {글목록 : result, time :new Date() })   //result를 글목록 이름으로 담아서 list.ejs에 보낸다!
}) 


//post 기초!! 아래까지 뭉태기 write에 접속하면 write페이지를 보여주고, write.ejs에는 post요청에 관한 정보가 있다. 
app.get('/write', (요청, 응답)=>{
  응답.render('write.ejs')
})

// action = /add이므로 사실상 여기서 보내는 역할. 위에 2줄의 코드가 필요하다. 
app.post('/add', async (요청, 응답)=>{
  //console.log(요청.body)      요청.body엔 보낸 데이터 정보가 오브젝트형으로 들어있고 그냥 body는 에러
  try{
    if (요청.body.title == '' || 요청.body.content =='' ){
      응답.send('제목 혹은 내용을 입력을 해야합니다.')
    } else{
      await db.collection('post').insertOne( {title : 요청.body.title, content : 요청.body.content }) 
      응답.redirect('/list')  //특정 페이지로 이동
    }
  }
    catch(e){  //e는 에러메세지의 원인
      console.log(e)
      응답.status(500).send('서버, 원인모를 에러가 났습니다.')
    }
}) 


///상세페이지 만들기. 
app.get('/detail/:id', async (요청, 응답) => {
  let result = await db.collection('post').findOne( { _id : new ObjectId(요청.params.id) } ) 
  //result에는 요청.params.id가 남는데, 요청.params가 {id:숫자}이므로, .id를 쓰면 결국 입력한 파라미터만 남게된다.
  
  console.log(요청.params)   // detail/파라미터 에서 파라미터와 id를 같이 출력. ex) { id : 1234 }
  응답.render('detail.ejs', { urlResult : result})
})






















//news에 접속시 바로 꽂아넣는 방법. 
app.get('/news', ()=>{
  db.collection('post').insertOne({title : '어쩌구'})
})
app.get('/', function(요청, 응답) {
    응답.sendFile(__dirname + '/index.html')
}) 
app.get('/time', (요청, 응답) => {
    응답.render('time.ejs', { data : new Date() })
  })