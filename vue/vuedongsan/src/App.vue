<template>

<!------------------------------------------- 모달창 ------------------------------->
  <!-- <div class="black-bg" v-if="모달창상태 == true">  
    <div class="white-bg">
      <img :src="원룸들[누른거].image" style="width:80%">
      <h4>{{원룸들[누른거].title}}</h4>              
      <p>{{원룸들[누른거].content}}</p>
      
      <TheDiscount></TheDiscount>
      <button v-on:click="모달창상태 = false">닫기</button>                     
      
    </div>
  </div> -->
  <transition name="fade">
    <TheModal @closeModal="모달창상태 = false" 
  :원룸들="원룸들" :누른거="누른거" 
  :모달창상태="모달창상태"/>    <!-- prop 사용법 => ??? :작명="사용할 데이터-->
  </transition>
<!------------------------------------------- 모달창 ------------------------------->

  <!-- <TheDiscount></TheDiscount> -->


<!-------------------------------------메뉴바------------------------------------->
  <div class="menu" >  
    <a v-for="(a,i) in 메뉴들" :key=i>{{ a }}</a>                       
  </div> 
<!-------------------------------------메뉴바------------------------------------->



<!-------------------------------------상품카드----------------------------------->
  <!--@작명="데이터변경하는JS코드" ===>>> 여기선, @openModal => 자식이 openModal이림의 메세지를 보내면 자바스크립트 실행하라!-->
  <!--$event => 자식이 보낸 데이터를 꺼내 쓰는 방법. 즉 자식에서 보낸 원룸.id를 보내서 누른것에 저장-->
  <TheCard @openModal="모달창상태 = true; 누른거 = $event" :원룸="원룸들[i]" v-for="(a,i) in 원룸들" :key="a"/>  <!--card 원룸들 갯수만큼 반복-->


  <!-- <div v-for="(작명, i) in 원룸들" :key="i">              => Card라는 컴포넌트로 만듦. 공부를 위해 안지움. 아래 코트를 메뉴들갯수만큼 반복하는 코드-->
    <!-- <img :src="원룸들[i].image" class="room-img">                       HTML태그안의 속성 데이터바인딩은 : 필수 -->
    <!-- <h4 @click="모달창상태 = true; 누른거=i">{{원룸들[i].title}}</h4>    HTML태그안의 내용 데이터바인딩은 : 필수, 누른거는 n번째 상품제목을 누르면 n번이 되는 변수를 만들어줘야한다.   -->
    <!-- <p>가격 = {{원룸들[i].price}} </p> -->
    <!-- <button @click="신고수[0]++">신고</button>   
    <span>신고 수 : {{신고수[0]}}</span> -->
  <!-- </div> -->
<!-------------------------------------상품카드----------------------------------->


</template>







<script>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import data from './assets/oneroom.js'
// import TheDiscount from './TheDiscount.vue'
import TheModal from './TheModal.vue'
import TheCard from './TheCard.vue'



export default {
  name: 'App',
  data(){
    return{ //object형식으로 데이터 저장
      누른거 : 0,                             //사용자가 누른 상품의 번호를 기록(0부터시작)
      원룸들 : data,
      모달창상태 : false,
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
    // TheDiscount : TheDiscount,
    TheModal : TheModal,
    TheCard : TheCard,

  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
</script>


<style>
/* 모달창 오픈시 발현 애니메이션 */
/* transition의 name="fade" 관련 */
.fade-enter-from {    /*시작스타일 */
  transform: translateY(-1000px);
}       
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {     /*끝 스타일 */
    transform: translateY(0px);
}        



/* 버튼 눌렀을때 사라지는 애니메이션 */
.fade-leave-from {    /*시작스타일 */
  opacity: 1;
}       
.fade-leave-active {
  transition: all 0.5s;
}
.fade-leave-to {     /*끝 스타일 */
  opacity: 0;
}    





/* 씨발 안되는거 이유가? */
.start{
  opacity: 0;
  transition: all 1s;

}
.end{
  opacity: 1;
}


/*-----------------------------------------------모달창---------------------------*/
/* body {
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
  width: 70%; background: white;
  height: 80%;
  margin : auto;
  border-radius: 8px;
  padding: 20px;
}  */
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

.discount{
  background: rgb(212, 209, 209);
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}

</style>
