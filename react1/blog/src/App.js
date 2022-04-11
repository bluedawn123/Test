/* eslint-disable */

import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
  let test = 'blog'
  let posts = '강남 고기 맛집';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '홍대 맛집가기']); //a변수엔 실제 저장할 데이터. b변수엔 저장할 데이터를 변경시킬 함수
  let [따봉, 따봉변경] = useState(0);   //따봉변경(''). ''안에는 대체할 데이터가 들어간다.
  var [name, age] = ['Kim', 20]          //name = 'Kim',  age = 20 이라는 변수가 생성

  function 클릭시제목바꾸기(){
    // 글제목에 있던 0번째 데이터를 여자코트추천으로 바꾸려면 state원본은 변경이 안되므로 복사본을 생성후거기서 바꿔야한다.
    var newArray = [...글제목];     //딥카피(서로공유x.완전새로움)로 복사본 만들기
    newArray[0] = '여자 코트 추천';  //데이터 변경
    글제목변경( newArray );

  }

  return (
    <div className="App">
      <div className="black-nav">
        <div style={ {color : 'white', fontSize : '25px'} }>개발 {test}</div>
      </div>

      {/* <button onClick={() => { 클릭시제목바꾸기() }}> 수정버튼1 </button>
          <button onClick={ 클릭시제목바꾸기 }> 수정버튼2 </button>           두개는 서로 같다.*/}


      <div className="list">
        <h3>{ 글제목[0] } <span onClick={ () => { 따봉변경(따봉+1)} }>👍</span> {따봉}</h3>    
        {/*onClick뒤 {}에는 함수가 들어가야한다. <div onClick={ () => { 실행할 코드 } }>*/}
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{ 글제목[1] }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{ posts }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>

      {/* --------------------------------------컴포넌트로 모달창 만들기----------------------------------------- */}
      <Modal></Modal>  
      

    </div>
  );
}

function Modal(){
  return (
    <div className="modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>상세내용!</p>
    </div>
  )
}

export default App;
