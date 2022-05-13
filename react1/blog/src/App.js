/* eslint-disable */

import './App.css';
import { useState, useTransition } from 'react';

function App() {

//[자료, 변경함수] 그리고 괄호안은 데이터(자료)
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);  
  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setModal] = useState(false); //기본값은 false
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav" >
        <div>개발 blog</div>
      </div>

      <button onClick={ ()=>{  
        let copy = [...글제목];
        copy[0] = '여자코트 추천';
        글제목변경(copy)            //남자코트추천 -> 여자코트 추천
      } }> 수정버튼 </button>

      { 
        글제목.map(function(a, i){    //항목수(어레이갯수)만큼 반복시켜주고 파라미터를 받아 출력시키는게 map함수의 특징이므로. i는0부터 시작
          return (
          <div className="list" key={i}>
              <h4 onClick={ ()=> {setModal(!modal); setTitle(i)} }>{ 글제목[i] } 
                <span onClick={(e)=>{ 
                  e.stopPropagation();    //이벤트버블링 막기
                  let copy = [...따봉];   //복사본 생성
                  copy[i] = copy[i] + 1;  
                  따봉변경(copy)
                 }}>👍</span> {따봉[i]}     
              </h4>
            
              <p>2월 18일 발행</p>
              <button onClick={(e)=>{
                  e.stopPropagation();
                  let copy = [...글제목];
                  copy.splice(i, 1);         //(i, 1)에서 i번째가 삭제된다.(i는 첫 게시글)
                  글제목변경(copy);
              }}>삭제</button>
          </div>)
        }) 
      }

     
      <input onChange={ (e)=>{ 입력값변경(e.target.value) } }></input>  
      {/* 이러면 입력한 값이 input에 들어가서 state에 저장된다. 상자안의 글이 입력값변경 함수를 통해 변경되고, 입력값으로 저장돼서*/}

      <button onClick={()=>{
        let copy = [...글제목];   //복사본만들고,
        copy.unshift(입력값);     //복사본에 유저가 입력한 글을 처음으로 넣어야한다. unshift함수를 사용해야한다.(왼쪽 array맨앞에!), 그리고 입력값은 위의 input에서의 입력값
        글제목변경(copy)
      }}>클릭 시 글 발행</button>

      { //jsx에서는 조건문에서 3항연산자 사용
        modal == true? <Modal title={title} 글제목변경={글제목변경} 글제목={글제목} setModal={setModal} modal={modal}/>  //글제목state를 글제목이란 이름으로 Modal에 전달
        : null
      }

    </div>
  )
}

export default App;


//let Modal = () => {} 으로 해도 가능
function Modal(props){
  return (
    <div className="modal" >
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>

      <button onClick={ ()=> { props.글제목변경(['하아 개졸려', '너무피곤해', '집가고싶어'])}}>글수정</button>
      <button onClick={ ()=> { props.글제목변경(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])}}>글수정취소</button>


      <button onClick={ ()=> {props.setModal(!props.modal)} }>닫기</button>
  {/* <button onClick={ ()=> {props.setModal(false)} }>닫기</button>       같다.*/}

 

    </div>
  )
}

//html 코드짤 때 유의점 : return( )안에 두개의html태그 나란히 적기불가. return ( ) 내부는 하나의 태그로 시작해서 하나의 태그로 끝남 
//동적ui만드는 방법 => 1.디자인 미리 완성, 2. Ui연재 상태를 state로 저장 3. state따라 UI가 어떻게 보일지 작성
//!modal 은 현재의 것과 다른 것 의미. ex) !true = false

//map?
//[1, 2, 3].map( function(a){  
// console.log(a)    })  => 1, 2, 3 출력. 

//[1, 2, 3].map( function(a){  
// return '111111'    }) => 어레이에 담아 3번실행 => ['11111', '11111', '11111' ]

//props?
//1. <자식컴포넌트 작명={state이름}
//2. props파라미터 등록 후 props.작명 사용

//input관련
//onChange/OnInput/OnMouseOver/OnScroll 등이 있다. 
//onChange={(e) => {   }}.. 에서 e는 이벤트객체 의미. ex) e.target.value는 이벤트 발생한 html 태그에 입력한 값

//이벤트버블링 막기?
//

      {/* 
      <div className="list">
        <h4 onClick={()=> { setModal(!modal) }}>{ 글제목[0] } <span onClick={ ()=>{ 따봉변경(따봉 + 1) } } >👍</span> { 따봉 }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=> { setModal(!modal) }}>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=> { setModal(!modal) }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> 

      let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']); 의 글제목 갯수가 중요하다. 이만큼 필요하니 이걸 map의 기준점으로 삼는다. 
      그러므로, 좀 간단히 만들어본다면,

      글제목.map(function(a, i){    //항목수(어레이갯수)만큼 반복시켜주고 파라미터를 받아 출력시키는게 map함수의 특징이므로.
          return 
          (<div className="list" key={i}>
              <h4>{ 글제목[i] } </h4>
              <p>2월 18일 발행</p>
              <button>삭제</button>
          </div>)
        }) 
      }

      */}