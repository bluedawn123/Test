import { configureStore, createSlice } from '@reduxjs/toolkit'



let usersss = createSlice({
    name : 'usering',
    initialState : { name : 'kim', age : 20 },
    
    reducers : {
      changeName(state){  //state는 기존state
        // return 'john ' + state   //state = kim
       
        return { name : 'park', age : 35}
        //혹은, array/object의 경우 직접수정해도 state가 변경된다. 
        //state.name = 'parking' 
        },

        increase(state){
            state.age = state.age + 1
        
        },
    }
}) 
  
// export let { 함수명 }   그리고, user.actions는 변경함수들
export let { changeName, increase} = usersss.actions






let stocks = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})




let cart = createSlice({
    name : 'cart',
    initialState : [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ]
  })


export default configureStore({
  reducer: {
    userss : usersss.reducer,
    stock : stocks.reducer,
    cart : cart.reducer

  }
}) 