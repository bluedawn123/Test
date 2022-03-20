<template>
    <div class="black-bg" v-if=" 모달창상태 == true">   <!--v-if => 조건식이 참일때만 HTML을 보여준다 -->
    <div class="white-bg">
      <img :src="원룸들[누른거].image" style="width:70%">
      <h4>{{원룸들[누른거].title}}</h4>               <!--원룸들[사용자가누른번호].titleㅡ-->
      <p>방 정보 = {{원룸들[누른거].content}}</p>

<!--input방법 1 :  <input @input="month = $event.target.value">  -event.target 현재 이벤트요소 + .value 면, input에 입력한 값까지 의미-->
      거주 예상 개월을 입력하세요 = <input class="input" v-model.number="month"> 
      <p>{{month}} 개월 선택 : {{원룸들[누른거].price * month}} 원 </p>  <!--month라고 저장헀으니 사용자가 입력한 데이터값을 month라고 저장한다. -->
    

      <button @click="$emit('closeModal')">닫기</button>  <!--부모한테 closeModal이라는 메세지 전송-->


    </div>
  </div>
</template>



<script>
export default {
    name : 'TheModal',
    props : {   //몹시중요. props는 부모의 데이터, 기타 정보를 받아(쓸)올 때 사용한다. 받아온 데이터 적음.
        //App.vue(부모), oneroom.js=> data=> 원룸들 (원룸들:data이므로) ==> 부모에서 이렇게 지정했으므로 여기서 원룸들을 사용
        원룸들 : Array,         //왜 원룸들이 Array???              //pros:{데이터이름:자료형이름}
        모달창상태 : Boolean,
        누른거 : Number

    },
    data(){
      return{
        month : 1  //input 기본값 위해서. 유저가 input에 입력한 값을 데이터로 저장하려면, 
      }
    },
    watch :  {                    //데이터 감시 => 함수형 필요
      month(a){                    //(변경후 데이터, 변경전 데이터) 파라미터는 2개까지 가능하다. a는 month의 데이터 
        //사용자가 month에 입력한 데이터가 13보다 크면 경고창
        if( a >= 13){
          alert('12개월이 한계입니다.')
          this.month = 1;                  //12가 넘으면 초깃값을 1로
        }
        //사용자가 month를 글자로 입력하면 경고문을 띄워라 = "month라는 데이터를 isNaN() 안에 집어넣어보고 true가 나오면 alert 띄우셈"
        if (isNaN(a) == true){             //isNaN안에 숫자를 입력하면 false, 글자면 true를 입력한다.
          alert('숫자만 입력하세요');
          this.month = 1;                  //숫자가 아닌 str이라면 초깃값을 1로
        }
    }

  },


}
</script>

















<style>
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
  width: 70%; background: white;
  height: 80%;
  margin : auto;
  border-radius: 8px;
  padding: 20px;
}

.input{
  width: 20px;
  margin-left : 5px
}
</style>