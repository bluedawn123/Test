const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs') 

const { MongoClient } = require('mongodb')
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

//list에 접속하면 post컬렉션에 있는 것들을 뺴내와보자. 참고로 async await은 매우중요하다.
app.get('/list', async (요청, 응답) => {
    let result = await db.collection('post').find().toArray() //참고로 어레이형 안의 오브젝트로 저장된다.
    응답.render('list.ejs', {글목록 : result })   //result를 글목록 이름으로 담아서 list.ejs에 보낸다!
}) 

app.get('/news', ()=>{
  db.collection('post').insertOne({title : '어쩌구'})
})
app.get('/', function(요청, 응답) {
    응답.sendFile(__dirname + '/index.html')
}) 

app.get('/time', (요청, 응답) => {
    응답.render('time.ejs', { data : new Date() })
  })