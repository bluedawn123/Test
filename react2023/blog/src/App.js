// eslint-disable-next-line

import './App.css';
import { useState } from 'react';

function App(){
  let [글제목, 글제목변경] = useState([ '남자코트 ', '여자코트 ', '코카콜라 ']);
  let [따봉, 따봉변경] = useState(0);  //따봉변경은 state를 변경시키는 함수로 사용됨
  let [modal, setModal] = useState(false);
  let [title, setTitle ] = useState(0);
  let [입력값, 입력값변경] = useState('');  //input에 들어온것 저장하기 위해 생성

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>

      <button onClick={ () => {
        let copy= [...글제목];
        copy[0] = '여자코트추천';
        copy[1] = '설마이것도되냐?';
        글제목변경( copy );    
      }}>무지성 글수정 1</button>

      <div className="list">
        <h4>{ 글제목[0] } <span onClick={ (e) => { e.stopPropagation(); 따봉변경(따봉 + 1 )} }> 👍 </span> {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        <h4>숙제 : 버튼 클릭시 모달창 나왔다 없어졌다 만들어보기</h4>
        <button onClick={ ()=>{ setModal(!modal) } }> 모달창 버튼!! </button>
        {/*이유?설정상 처음이 false이므로 클릭시 true로 바뀜. 모달창이 보일때는 true이므로 다시클릭하면 false로 바뀌어서 안나옴 */}

        {modal == true ? <Modal title={title} color={'yellow'} number='8' 글제목={글제목} 글제목변경={글제목변경}/> : null }          
      </div>
      
      {/* 컴포넌트 만들어서 불러오기 가장 기초여서그냥냅둠. props를 할때는 그 숫자에 맞춰서 props를 보내야한다. */}
      <Modal title={title} 글제목변경={글제목변경} 글제목={글제목}/> 



      {/* -------------------map함수를 써서 반복문으로 만들어보기 ---------------------- */}
      <h4>아래는 위의 것들을 map함수를 써서 간단히 한큐에 만든 것들 </h4>
      {
        글제목.map(function(a, i){ //let[글제목, 글제목변경] = useState([ '남자코트 ', '여자코트 ', '코카콜라 ']);;
                                   //이므로 3번만큼 반복하기 위해 글제목을 사용한다. 
                                   //두번째 파라미터 i는 0부터 1씩 증가한다. 
          
            return(
            <div className="list" key={i}> {/* key는구별짓는용도로숨겨져있다(확인가능). 위의 function을보면알듯이 0에서1씩증가.  */}
              <h4>{ 글제목[i] }</h4>    {/* { a } 로 해도 된다. */}
              <p>2월 17일 발행</p>
              <button onClick={ ()=>{ setModal(!modal); setTitle(i) } }> 모달창 버튼 </button>    {/* 클릭하면 모달창도 뜨면서, title도 바뀌게!! */}    
            
              <button onClick={()=>{  
                let copy = [...글제목] 
                copy.splice(i, 1);     
                글제목변경(copy);
              }}>삭제</button>

            </div>
//카피본에서 삭제하기. i번째를 지우고 싶으므로 (i, 1)
            
          )
        })
      }

      {/* Modal창 불러오기. map반복문 안에 있으면 3번 연속 반복되기 때문에 바깥에 만들어 놓음. */}
      { modal == true ? <Modal title={title} color={'yellow'} number='8' 글제목={글제목} 글제목변경={글제목변경}/> : null }

      {/* 글발행 */}
      <input onChange={ (e) => 입력값변경(e.target.value)} />   {/* 입력값을 state에 보관하는 과정 */}
      <button onClick={()=>{    
        let copy = [...글제목];   //copy본 생성
        copy.unshift(입력값);     //copy본 맨 앞에 유저가 입력한 글 추가(이미 state에 보관중)
        글제목변경(copy)          //글제목변경 함수를 써서 새롭게 업데이트
      }}>글발행</button>


    </div>
)



//Modal 컴포넌트 생성 -> 위에서 소환해서 사용
function Modal(props){  
  return (
    <div className="modal">
        {/* title state가 0이면 props.글제목[0]을 보여줘야한다. */}
        <h4>props가장기초글제목(하드코딩) : { props.글제목[0] } </h4>     {/* 하드코딩이므로 의미없음. */}
        <h4>클릭시해당글제목보여주기 : { props.글제목[props.title] } </h4>  {/*  */}
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={ () => { props.글제목변경(['여자코트추천 ', '여자코트 ', '코카콜라 ']) }}>글수정숙제그냥안지움</button>
    </div>
  )
}


}

export default App;


