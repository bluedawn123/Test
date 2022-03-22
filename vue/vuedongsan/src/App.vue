<template>
<!-------------------------------------------------------- 모달창 ----------------------------------------------------------------------->
  <!-- 
  <div class="black-bg" v-if="모달창상태 == true">           v-if -> 조건식이 참일때만 보여줌!
    <div class="white-bg">
      <img :src="원룸들[누른거].image" style="width:80%">
      <h4>{{원룸들[누른거].title}}</h4>              
      <p>{{원룸들[누른거].content}}</p>
      
      <TheDiscount></TheDiscount>
      <button v-on:click="모달창상태 = false">닫기</button>                     
      
    </div>
  </div>        누른거?사용자가 누른 상품의 번호.코드간결화 -->

  <!-- 자식(TheModal.vue)의  닫기버튼 만들기를 위해 'closeModal'로부터 온 메세지를 아래와 같이 수정해준다.-->
  <transition name="fade">
    <TheModal @closeModal="모달창상태 = false"   
  :원룸들="원룸들" :누른거="누른거"   
  :모달창상태="모달창상태"    />         <!-- prop 사용법 => ??? :작명="사용할 데이터. 즉 부모의 데이터를 TheModal로 보냄-->
  </transition>
<!-------------------------------------------------------- 모달창 끝 --------------------------------------------------------->





<!-------------------------------------------------------메뉴바------------------------------------------------------------->
  <div class="menu" >  
    <a v-for="(a,i) in 메뉴들" :key=i>{{ a }}</a>  <!-- a는 자료를 반복하고 i는 숫자가 1씩 증가한다. -->                     
  </div> 
<!-------------------------------------------------------메뉴바 끝------------------------------------------------------------->




<!-------------------------------------------------------할인배너 (2초후에 사라지게) ------------------------------------------------------------->

<TheDiscount v-if="showDiscount == true"    /> 

<!--<TheDiscount :이름="오브젝트.name" :나이="오브젝트.age" 이렇게 보낼수도 있고 v-bind="오브젝트" 이렇게 
할수도 있따. />-->
<!-------------------------------------------------------할인배너 끝------------------------------------------------------------->





<!------------------------------------------------------정렬버튼, 되돌리기 기능 ------------------------------------------------------->
<button @click="priceSort">가격순정렬</button>
<button @click="sortBack">되돌리기</button>
<!------------------------------------------------------정렬버튼, 되돌리기 기능 끝 ------------------------------------------------------->



<!-------------------------------------------------------상품카드------------------------------------------------------->
  <!--@작명="데이터변경하는JS코드" ===>>> 여기선, @openModal => 자식이 openModal이름으로 작명한 메세지를 보내면 모달창상태를=true로 변경하라! 자식에선 모달창상태=false인데-->
  <!--$event => 자식이 보낸 데이터를 꺼내 쓰는 방법. ===> TheCard(자식)에서 보낸 원룸.id를 보내서 누른것에 저장해서 사용. TheModal의 누른것과는 다르다
  즉, TheCard에서 보낸 원룸.id를 $event를 사용해서 보내고 누른것이라고 저장하는 것!!-->
  <TheCard @openModal="모달창상태=true; 누른거=$event"  
  :원룸="원룸들[i]"      
  v-for="(a,i) in 원룸들" :key="a"          />  
  <!-- 원룸들[i]은, 원룸들[1], 원룸들[2]..원룸들[5] 위해서
               <Card :원룸="원룸들[0]" />
                         ...
               <Card :원룸="원룸들[5]" />  의 반복을 줄이기 위해서 card 원룸들 갯수를 데이터 갯수만큼 반복
  -->


  <!-- <div v-for="(작명, i) in 원룸들" :key="i">              => Card라는 컴포넌트로 만듦. 공부를 위해 안지움. 아래 코트를 메뉴들갯수만큼 반복하는 코드-->
    <!-- <img :src="원룸들[i].image" class="room-img">                     HTML태그안의 속성(src) 데이터바인딩은 : 필수 -->
    <!-- <h4 @click="모달창상태 = true; 누른거=i">{{원룸들[i].title}}</h4>  
    HTML태그안의 내용 데이터바인딩은 {{}} 필수, 누른거는 n번째 상품제목을 누르면 n번이 되어야함. 
    또한 ;를 사용해서 클릭시 2가지 이벤트를 사용가능. 
    반복문이 돌때마다 i의 값이 1씩 증가하므로 예를들어 4번째 게시판을 눌르면 i=3이 저장!!되는 것이다. 즉, 누른거를 i로 해서 다양하게 사용가능(0부터 시작)  -->
  
    <!-- <p>가격 = {{원룸들[i].price}} </p> -->
    <!-- <button @click="신고수[0]++">신고</button>   =>버튼을 누르면 신고수가 1씩 증가!  
    <span>신고 수 : {{신고수[0]}}</span> -->
  <!-- </div> -->

<!------------------------------------------------------상품카드 끝 ------------------------------------------------------->




</template>




<script>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import data from './assets/oneroom.js'           //원룸.js -> data => 원룸들 
//컴포넌트쓰는법.  1.vue파일 import 2.등록 3.쓰기
import TheDiscount from './TheDiscount.vue'   
import TheModal from './TheModal.vue'
import TheCard from './TheCard.vue'



export default {
  name: 'App',
  data(){
    return{                                   //object형식으로 데이터 저장
      showDiscount : true, 
      원룸들오리지널 : [...data],              //별개의 사본을 만들기. 그냥 data만 쓰면 변하게 된다.
      누른거 : 0,                             //사용자가 누른 상품의 번호를 기록(0부터시작). 0번째누르면 0번째, 1번째 누르면 1번쨰로 하기위함. [{}, {}..] 형식으로 어레이 안에 오브젝트가 들어가 있는 형식
      원룸들 : data,                          //데이터변형시 사용
      모달창상태 : false,                     //모달창은 true일때 열리기 때문에, 평소엔 false로 하고, 클릭시 true로 변경하는 코드를 써서 클릭시만 창이 뜨게 만든다.
      메뉴들 : ['Home', 'Products', 'About'],
      products : ['역삼동원룸', '천호동원룸', '평창동원룸'],
      신고수 : [0,0,0],              //각각원룸의 신고수를 기록하려구
      오브젝트 : {name : 'kim', age: 20}
    }
  },

  methods: {          //vue에서 함수를 만들고 싶으면 methods : { 함수명() {}} 아래 함수2,3처럼 만드셈
      increase(){
        this.신고수 += 1; //increase란 함수를 만들고, this는 data의 자료들을 쓰고 싶으면 this를 써야한다.
      },            
      
      sortBack(){
        this.원룸들 = [...this.원룸들오리지널];   //되돌리기를 몇번하면 동작안되는데, = 는 두개를 공유하게 하기 때문. 그러므로 여기도 사본을 써야한다. 
      },
      
      priceSort(){   //원룸들을 sort정렬하면, 문자순정렬. 아래 숫자순정렬은 그냥 외우면 편하다.여기서는 a,b가 오브젝트이므로 뺄셈이 불가하므로
                     //오브젝트중 price를 빼줘야한다. 
        this.원룸들.sort(function(a, b){    //sort를 쓰면 원룸들이라는 데이터가 원본이 바뀐다. 
          return a.price - b.price
        })  
     },
   },

  created(){ //html생성전. 데이터만 존재할때.

  }, 
  
  //app.vue에 mount()사용되면 app.vue가 mount되고나서 코드를 실행해줌
  mounted(){  //mount가 됐을때. app.vue가 mount되고 나서 안의 코드를 실행해주셈

    // setTimeout(()=>{    //function() 보다 ()=>는 바깥에 있는 this를 더 잘 쓸수있다.
    //   this.showDiscount = false;
    // }, 2000);

    
  },

  components: {  //2단계. 컴포넌트 등록
    // TheDiscount : TheDiscount,   //왼쪽은자유작명, 오른쪽은 갖고온 컴포넌트
    TheModal : TheModal,
    TheCard : TheCard,
    TheDiscount : TheDiscount,

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
