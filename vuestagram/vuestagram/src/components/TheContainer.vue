
<template>
<div>
    <!-- <h4>컨테이너입니다.</h4> -->
    <!--app.vue에서 받아온 게시물(아래props 게시물)을 위에서 게시물[0]으로 저장하고, 이걸다시 게시물이란 이름으로 저장해서 ThePost로 보냄-->
        <ThePost :게시물="게시물[i]" v-for="(a,i) in 게시물" :key="i"/>

    <!-- 위,아래 동일. a는 자료?, i는 숫자. 즉 게시물이 array형이므로 app.vue에서 받아온 게시물의 갯수만큼 i가 1씩 증가한다.
         <ThePost :게시물="게시물[0]"/>   v-for부턴 그냥 반복문.
         <ThePost :게시물="게시물[1]"/>   
         <ThePost :게시물="게시물[2]"/>    -->

</div>
  
</template>



<script>//얘는 TheContainer는 ThePost의 부모태그.   App.vue > TheContainer.vue > ThePost.vue
import ThePost from './ThePost.vue'

export default {
    components :{
        ThePost,
    },

    props:{
        게시물 : Array,  //다시 ThePost.vue로 데이터를 전송해야한다. 
    }


}
</script>

<style>

</style>