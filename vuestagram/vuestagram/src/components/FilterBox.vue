<template>
    <!-- 24개의 필터들을 적용시켜보자. 1번일땐 aden, 2번일땐 1977등등..해서 24번 적용되게 -->
    <!-- 해당박스 클릭시 fire(이벤트발사)함수실행해서 app.vue로 필터명 전송. 데이터는 app.vue, container.vue 다 필요해서 app.vue로 보내준다.-->
    <div @click="fire" :class="필터" class="filter-item" :style="`background-image:url(${이미지})`">  


    <!-- slot으로 부모 ->자식 데이터 전송가능. 구별하고 싶으면 name속성사용-->
    <!-- slot props => 부모가 자식데이터를 쓰고싶을때. <slot :자식데이터="자식데이터">, 부모는 <template v-slot="작명">후에 {{작명.자식데이터}} -->
        <slot name="a"></slot>
        <!-- <slot name="b"></slot> -->


    </div> 


</template>

<script>
export default {
    name : 'FilterBox',
    methods : {
        fire(){
            this.emitter.emit('박스클릭함', this.필터)  //다른 컴포넌트로 박스클릭함(이름), this.필터(데이터) 전송!
        }
    },

    data(){
        return{
            msg : 'hello',
            text : 'filecheck',

        }
    },

    props : {
        이미지 : String,
        필터 : String,
    }


}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}

</style>