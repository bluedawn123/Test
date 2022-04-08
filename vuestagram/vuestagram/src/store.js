import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
        name : 'kim',
        age : 20,
      
    }
  },

//   //데이터변경하는 방법 기술
   mutations :{
     이름변경(state){          //해당함수를 실행시 이름을 park로 변경
         state.name = 'park'  //사용예시. => <button @click="$store.commit('이름변경')">버튼</button>
        
     },
     증가(state, data){
         state.age += data

         // <h4> 안녕 {{ $store.state.age}}</h4>
         // <button @click="$store.commit('증가', 10)">button</button>   => 버튼 클릭스 10씩증가
     },


   }
 })

export default store