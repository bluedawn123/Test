<template>

<!------------------------------------------- 모달창 ------------------------------->
  <div class="black-bg" v-if="모달창상태 == false">   <!--v-if => 조건식이 참일때만 HTML을 보여준다 -->
    <div class="white-bg">
      <h4>상세페이지</h4>
      <p>상세페이지내용임</p>
      <!-- <button v-on:click="모달창열렸니 = false">닫기</button> -->
      <button v-on:click="모달창상태 = false">닫기</button>
    </div>
  </div>
<!------------------------------------------- 모달창 ------------------------------->




  <div class="menu">
    <a v-for="(a,i) in 메뉴들" :key="i">{{ a }}</a>  <!--Home을 3번 반복한다-->
  </div>

  
<!--for문 사용
        <div v-for="(b, i) in products" :key="b">
        <h4>{{products[i]}}</h4>
        <p>?? 만원 </p>
        <button @click="신고수++">신고</button>  <span>신고 수 : {{신고수}}</span>
      </div>                                                     -->

  <div>
    <img src="./assets/room0.jpg" class="room-img">
    <h4>{{원룸들[0]}}</h4>
    <p>2 만원 </p>
    <!-- <button @click="신고수[0]++">신고</button>   
    <span>신고 수 : {{신고수[0]}}</span> -->
  </div>

  <div>
    <img src="./assets/room1.jpg" class="room-img">
    <h4 @click="모달창상태 = true">{{products[1]}}</h4>
    <!-- <h4>{{products[1]}}</h4> -->
    <p>2 만원 </p>
    <button @click="신고수[1]++">신고</button>   
    <span>신고 수 : {{신고수[1]}}</span>
  </div>

  <div>
    <img src="./assets/room2.jpg" class="room-img">
    <h4 @click="모달창상태 = true">{{products[2]}}</h4>
    <!-- <h4>{{products[2]}}</h4> -->
    <p>3 만원 </p>
    <button @click="신고수[2]++">신고</button>   
    <span>신고 수 : {{신고수[2]}}</span>
  </div>
  
</template>












<script>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import data from './assets/oneroom.js'

export default {
  name: 'App',
  data(){
    return{ //object형식으로 데이터 저장
      원룸들 : data,
      모달창상태 : true,
      메뉴들 : ['Home', 'Products', 'About'],
      products : ['역삼동원룸', '천호동원룸', '평창동원룸'],
      신고수 : [0,0,0]
    }
  },
  // methods: {
  //   // increase(){
  //   // this.신고수 += 1;
  //   // },

  //   함수2(){

  //   }
  // },

  components: {

  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
</script>





















<style>
/*-----------------------------------------------모달창---------------------------*/
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; height:100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 
/*-----------------------------------------------모달창---------------------------*/
.room-img{
  width: 40%;
  margin-top: 40px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.menu{
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a{
  color: white;
  padding: 10px;
}


</style>
