import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { createStore } from 'redux';

//redux에선 state데이터의 수정방법을 미리 정의한다!!!!!!!! => state 데이터 관리 기능이 매우 편하다.
//기존의state를 만든 것
// let store = createStore(()=>{ return [{id : 0, name : '멋진신발', quan : 2},
//                                       {id : 1, name : '멋진신발2', quan : 5},
//       ]  
//     })

//reducer함수를 만들어서 미리 만들어 놓는 방법
let 기본state = [
  {id : 0, name : '멋진신발', quan : 2},
  {id : 1, name : '멋진신발2', quan : 5},
];

function reducer(state = 기본state, 액션){
  return state
}

let store = createStore(reducer);





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