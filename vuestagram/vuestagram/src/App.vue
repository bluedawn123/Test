<template>
<!--------------------------------------------------상단 메뉴 --------------------------------------------->
  <div class="header">
    <ul class="header-button-left">
      <span>Cancel</span>  
      
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step++">Next</li>     <!--step 1면 Next보여줌-->
      <li v-if="step == 2" @click="publish">발행</li>     <!--step 2면 발행보여줌-->

    </ul>
    <img src="./assets/logo.png" class="logo" />
</div>
<!--------------------------------------------------상단 메뉴 --------------------------------------------->


  <TheContainer @write="작성한글 = $event" :이미지="이미지" :게시물="게시물" :step="step"   />  <!--TheContainer안에 2개의 ThePost가 들어가있는 형식-->
  <!--TheContainer.vue(하위)에서 쓴 글을 emit으로 여기(상위)로 보내고 그것을 작성한글이라고 저장 -->

<!-- 더보기버튼 눌렀을때 서버에서 추가 게시물을 갖고오고 그걸 ThePost로 보여줄것 -->
<!-- 클릭시, more이라는 함수 실행 -->
  <button @click="more">더보기</button>





<!-------------------------------------------------하단 메뉴 --------------------------------------------->

<div class="footer">
  <ul class="footer-button-plus">
    <input @change = "upload" accept="image/*" type="file" id="file" class="inputfile" />
    <label for="file" class="input-plus">+</label>
  </ul>
 </div>
<!--------------------------------------------------하단 메뉴 --------------------------------------------->





<!--------------------------------------------------tab --------------------------------------------->
<!-- <div v-if = "step == 0">내용0</div>
<div v-if = "step == 1">내용1</div>
<div v-if = "step == 2">내용2</div>
<button @click = "step = 0">버튼0</button>
<button @click = "step = 1">버튼1</button>
<button @click = "step = 2">버튼2</button> -->





<!--------------------------------------------------tab--------------------------------------------->





</template>

<script>
import TheContainer from './components/TheContainer.vue'
import PostData from './assets/PostData.js'
import axios from 'axios';



export default {
  name: 'App',
  data(){
    return{
      게시물 : PostData,
      //글발행의 원리? => next버튼클릭시, 게시물에 PostData의 양식에 맞게 데이터를 하나 더 추가해준다

      더보기 : 0,
      step : 0, 
      이미지 : '',  //props를 써서 Thecontainer로 보내기 위해서
      작성한글 : '',
    }

  },
  components: {
    TheContainer : TheContainer,

  },
  methods :{
    more(){
      axios.get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)
      .then( (결과)=> {   //요청성공시 실행할 코드
        console.log(결과.data);  // {name: 'David', userImage: 'https://placeimg.com/100/100/tech', postImage: 'https://placeimg.com/640/480/tech', likes: 5, date: 'July 25'} 
        this.게시물.push(결과.data)  //원본게시물에 push사용해서 array에 데이터 추가해주세요. 즉, 새로 받아온 데이터를 하나 더 추가한다!
        this.더보기++;    
      })
    },

    //이미지를 업로드 한 다음, step1으로 넘어가는 함수
    upload(e){         //e? => event와 관련된 파라미터. 
      let 파일 = e.target.files;    //e.target.files => 업로드한 파일들이 담겨있고 그걸 파일에 저장
      console.log(파일[0])    // => 파일에 대한 정보가 담겨있다.

      let url = URL.createObjectURL(파일[0]) //사진 넣는 방식
      // console.log(url)      //blob머시기 
      this.이미지 = url;     //위data의 이미지에 이미지를 넣어 props를 하기위해 url을 이미지에 넣는다

      this.step++;  //파일을 올린 후 step 0 -> step 1으로 변해야한다. (파일 올려서 글을 보여주는 페이지로)

    },
    //step 2단계에서 발행 누르면, 게시물에 데이터를 밀어넣음
    publish(){
      //어레이를 만들고 다음줄에서 자료추가
      var 내게시물 = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.이미지,  //내가업로드한이미지URL
        likes: 36,
        date: "May 17",
        liked: false,
        content: this.작성한글,  //내기입력한글. TheContainer.vue에 있다. 하위->상위 데이터전송이므로, custonEvent 필요
        filter: "perpetua"
        };
        
      this.게시물.unshift(내게시물);
      this.step = 0;

    }
    

  }
}
</script>

<style>body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}

#app2 {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
