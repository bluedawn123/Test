<template>
  <div> <!--v-for="(a,i) in 원룸들" :key=i-->        <!--하나만 컴포넌트로 만들고 나중에 app.vue에서 for문으로 쓰면된다.-->
    <img :src="원룸.image" class="room-img">          <!-- HTML태그안의 속성 데이터바인딩은 : 필수  -->
    
    <!--HTML태그안의 내용 데이터바인딩은 : 필수, 누른거는 n번째 상품제목을 누르면 n번이 되는 변수를 만들어줘야한다.  -->
    <!--emit('작명', 데이터) => 부모에게 메세지 보낼때. props데이터는 수정을 못한다. 받아온 모달창상태=false이므로 불가-->
    <h4 @click="send()">{{원룸.title}}</h4>     

    <!-- @click="$emit('openModal', 원룸.id)" 원래 이건데 send()라는 함수를 만들어서 보내봄.. 부모에게 openModal라는 메세지와 원룸.id 데이터 전송. 자세한건 app.vue확인-->
    <p>가격 = {{원룸.price}} 원 </p> 
    
  </div> 
</template>


<script>
export default {
    name : 'TheCard',
    props : {  //pros:{데이터이름:자료형이름}
        //App.vue(부모), oneroom.js=> data=> 원룸들[i] => 원룸 <TheCard :원룸="원룸들[i]"/>  <=> 여기서 원룸이라 지정했으므로 template에 원룸이라고 사용
        원룸 : Object,        //왜 여긴 object?? ==> data가 [{}, {}, {}..] 로 어레이안에 오브젝트가 있는 형식. 근데 원룸=원룸들[i]라고 했으므로 각각의 오브젝트이므로
                            
    },
    
    
    methods:{
      send(){  //함수로 만들어서 @click 등등에 써도 된다.
        this.$emit('openModal', this.원룸.id)          //데이터 전송시는 this를 사용해야한다.

      }
    }
}


</script>




<style>
body {
  margin : 0;
}

div {
  box-sizing: border-box;
}

.room-img{
  width: 40%;
  margin-top: 40px;
}

</style>


<!--정리 
=> prop사용해서 부모인 App.vue의 oneroom.js로 저장한 data라는 걸 원룸들이라고 저장한 것을 <TheCard/>에서 :원룸="원룸들[i]"로 지정. 그러므로 여기선 원룸이라고 써야함(여기서 작명을 그렇게 하기도 했으므로)
=> TheCard.vue의 h4에서 버튼클릭시, openModal메세지 방출. ==> 부모인 App.vue의 <TheCard/>에서  메시지 받고 @openModal="모달창상태 = true"로  변경
=> 원룸.id를 사용해서 데이터를 부모한테 전송한다.


-->