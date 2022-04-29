import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { combineReducers, createStore } from 'redux';

//redux에선 state데이터의 수정방법을 미리 정의한다!!!!!!!! => state 데이터 관리 기능이 매우 편하다.
//기존의state를 만든 것
// let store = createStore(()=>{ return [{id : 0, name : '멋진신발', quan : 2},
//                                       {id : 1, name : '멋진신발2', quan : 5},
//       ]  
//     })

// -----------------------------------------------------------------------------------
let alert초기값 = true;

function reducer2(state = alert초기값, 액션){
  //cart.js 닫기 관련 함수
  if (액션.type === 'alert닫기'){  
    return false
  } else {
    return state
  }
}

let 초깃값 = [
  {id : 0, name : '멋진신발', quan : 2},
  {id : 1, name : '멋진신발2', quan : 5},

];
// -----------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------
//reducer에는 데이터 수정하는 함수
function reducer(state = 초깃값, 액션){
  // Detail.js 에서 reducer 내의 항목추가 관련 함수 
  if ( 액션.type === '항목추가'){

    let copy = [...state];
    copy.push(액션.payload);    //Detail.js에서 보낸 데이터를 copy본에 밀어넣음
    return copy
  }

  //cart.js  =>  reducer 내의 수량증감함수 
  else if( 액션.type === '수량증가'){                //if괄호만 => 데이터수정조건
    let copy = [...state];  //카피본생성
    copy[0].quan++;
    return copy
  } else if (액션.type === '수량감소'){
    let copy = [...state];
    copy[0].quan--;
    return copy 
  }
  
  else {
    return state //아무일 없는 경우 기본state 배출
  }
}
// -----------------------------------------------------------------------------------



let store = createStore(combineReducers({reducer, reducer2}));























ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>  {/* 모든 컴포넌트들은 store안에 있는 state를 공유해서 사용가능*/}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// reportWebVitals();