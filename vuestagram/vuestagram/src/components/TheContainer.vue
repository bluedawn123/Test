스텝1. 이미지 추가시 보이는 페이지
<template>
<div>
    <!-- step이 0이면 ThePost만 보임 -->
    <!-- <h4>컨테이너입니다.</h4> -->
    <!--app.vue에서 받아온 게시물(아래props 게시물)을 위에서 게시물[0]으로 저장하고, 이걸다시 게시물이란 이름으로 저장해서 ThePost로 보냄-->
        
    <div v-if="step == 0 "> 
        <ThePost :게시물="게시물[i]" v-for="(a,i) in 게시물" :key="i"  />
    </div>
    <!-- 위,아래 동일. a는 자료?, i는 숫자. 즉 게시물이 array형이므로 app.vue에서 받아온 게시물의 갯수만큼 i가 1씩 증가한다.
         <ThePost :게시물="게시물[0]"/>   v-for부턴 그냥 반복문.
         <ThePost :게시물="게시물[1]"/>   
         <ThePost :게시물="게시물[2]"/>    -->


<!-- step이 1이면 ThePost만 보임 -->
<!-- 필터선택페이지 -->
    <div v-if= "step == 1 "> 
        <div :class="선택한필터"  class="upload-image"  :style="`background-image:url(${이미지})`"></div>  <!--백틱 => 문자중간에 변수사용하려면-->

        <div class="filters">
            <FilterBox :필터="필터" :이미지="이미지" v-for="필터 in 필터들"  :key="필터">  <!--필터들 갯수에 맞게 필터들 갯수생성하고 필터를 filterbox에 props-->

                <template v-slot:a> <span>{{필터}}</span></template>

            </FilterBox>  

        </div>
    </div>

<!-- step이 2이면 ThePost만 보임 -->
<!-- 글작성페이지 -->
    <div v-if= "step == 2 "> 
        <div :class="선택한필터" class="upload-image" :style="`background-image:url(${이미지})`"></div>
        
        <!-- 내가 입력한 글. App.vue로 전송해야한다. -->
        <div class="write">
            <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
        </div>
    </div>

</div>
  
</template>






<script>//얘는 TheContainer는 ThePost의 부모태그.   App.vue > TheContainer.vue > ThePost.vue
import ThePost from './ThePost.vue'
import FilterBox from './FilterBox.vue'

export default {
    data(){
        return{
            필터들 : [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
"inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
"reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
            etc : 5,
            선택한필터 : '',  
            
        }
    },
    mounted(){
        //filterbox에서 보낸 데이터를 수신
        this.emitter.on('박스클릭함', (a)=> {
            this.선택한필터 = a
        })
    },
    components :{
        ThePost,
        FilterBox
    },

    props:{
        게시물 : Array,  //다시 ThePost.vue로 데이터를 전송해야한다. 
        step : Number,
        이미지 : String,
    }


}
</script>

<style>
.upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
</style>