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
  let [modal, modal변경] = useState(false);  //모달창 스위치 위해 생성
  let [modal2, modal변경2] = useState(false);  //모달창 스위치 위해 생성

  // for반복문을 쉽게 쓰는 방법 => 함수를 만들어서 필요한 곳에 함수를 넣어서 쓴다.
  function 반복된UI(){
    var 어레이 = [];
    for (var i = 0; i < 3; i++){
      어레이.push(<div>안녕</div>)
    }
    return 어레이
  }


  function 클릭시제목바꾸기(){
    // 글제목에 있던 0번째 데이터를 여자코트추천으로 바꾸려면 state원본은 변경이 안되므로 복사본을 생성후거기서 바꿔야한다.
    var newArray = [...글제목];     //딥카피(서로공유x.완전새로움)로 ★★복사본 만들기★★
    newArray[0] = '여자 코트 추천';  //데이터 변경
    글제목변경( newArray );
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div style={ {color : 'white', fontSize : '25px'} }>개발 {test}</div>       {/* 리액트에서 css 간단히 쓰는 법*/}
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
        {/* 클릭시, false인 모달창을 true로 변경해주기 위해 onclick이하 작성. 참고 !기호는 true왼쪽에 붙이면 false로, false 왼쪽에 붙이면 true로*/}
        <h3 onClick={ ()=> {modal변경(!modal)} }>{ 글제목[2] }</h3>  {/* {modal변경(true)} => {modal변경(!modal)} 로 변경 */}
        <p>2월 17일 발행</p>
        <hr/>
      </div>

      {/* 위 div map반복문으로 반복시켜보기 */}
      {
        글제목.map(function(글){
          return (
          <div className="list">
            <h3>{ 글 }</h3>  
            <p>2월 17일 발행</p>
            <hr/>
          </div>
          )
        })
      }









 


      {/* -----------------------------클릭시만 보이는 컴포넌트로 모달창 만들기  ==> if대신 삼항연산자 사용--------------------------------------- */}
      {
        modal === true
        ? <Modal></Modal>
        : null
      }

















      {/* 이 이하는 그닥 필요 없는 공부할 때 쓴 것들입니다. */}
      <div>--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>

      {/* ----------------------------------숙제로 열고닫는버튼 만들어보기 -----------------------------*/}
      <div>
        <button onClick={ ()=>{ modal변경2(!modal2) } }> 열고닫는버튼 </button>
        { 
        modal2 === true 
        ? <Modal2></Modal2>
        : null
        }
      </div>
      
      {/* 위 데이터를 반복문으로 제목만 반복시켜보기 => map() 사용. */}
      {
        글제목.map(function(a){
          return <div>{a}</div>
        })   //남자 코트 추천 강남 우동 맛집 홍대 맛집가기 출력. 이런식으로 for문처럼 사용가능
      }

      {/* //어레이함수 예시
          //var 어레이 = [2,3,4]; 에 2를 곱하고 싶다?
          //var 뉴어레이 = 어레이.map(function(a){ return a * 2}; 이런식. map함수는 어레이를 반복시킨다고 보면 된다. */}

      
      {반복된UI()}

      <div>--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>




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

function Modal2(){
  return (
    <div className="modal">
      <h2>그냥 만들어본 거</h2>
    </div>
  )
}
export default App;
