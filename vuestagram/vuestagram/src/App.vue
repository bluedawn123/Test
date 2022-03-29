<template>
<!--------------------------------------------------상단 메뉴 --------------------------------------------->
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li>Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
</div>
<!--------------------------------------------------상단 메뉴 --------------------------------------------->


  <TheContainer :게시물="게시물" :step="step"   />  <!--TheContainer안에 2개의 ThePost가 들어가있는 형식-->


<!-- 더보기버튼 눌렀을때 서버에서 추가 게시물을 갖고오고 그걸 ThePost로 보여줄것 -->
<!-- 클릭시, more이라는 함수 실행 -->
  <button @click="more">더보기</button>





<!-------------------------------------------------하단 메뉴 --------------------------------------------->

<div class="footer">
  <ul class="footer-button-plus">
    <input type="file" id="file" class="inputfile" />
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
      더보기 : 0,
      step : 0, 
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
