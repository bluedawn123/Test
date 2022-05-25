//app.js에서 shoes 받아와서 사용
import React, { useEffect, useState } from 'react';   //컴포넌트 만들 때 필수
import { useHistory, useParams } from 'react-router-dom';
// import { Navbar,Nav,NavDropdown, Form, Button, FormControl, Container, Jumbotron } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components'
import './Detail.scss';
import {CSSTransition} from 'react-transition-group';
import { connect } from 'react-redux'

//styled-components를 이용한 class없는 CSS스타일링 => css를 미리 입혀놓은 컴포넌트를 만들어서 쓴다.
let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 35px;
  color : ${ props => props.색상}  
`;

function Detail(props){

  let { id } = useParams();   // ../:id 의 id를 넣기 위해


  let history = useHistory();
  let [alert, alert변경] = useState(true);
  let [누른탭, 누른탭변경] = useState(0);  //지금 누른 것 저장하기 위해
  let [스위치, 스위치변경] = useState(false);

    // Hook 관련---------------------------------------------------------------------------------------------------------------------------------------------------------------
    useEffect( ()=> {      //컴포넌트가 mount, update됐을때 특정코드 실행
      //알림창 2초후에 사라지게하기
      let 타이머 = setTimeout( ()=> { alert변경(false)}, 2000);
      
      //return은 컴포넌트가 사리질때 코드가 실행됨(무조건 함수)
      return ()=>{ clearTimeout(타이머)}   //detail 컴포넌트가 사라질때 타이머 해제
    
    }, []);   //[]의 역할? => useEffect의 조건! state등을 집어넣을 수 있다. alert를 넣으면 alert라는 state가 변경이 될때만 실행된다.
              //아무것도 없다면, 업데이트시 실행이 안됌. 그냥 로드만 되고 끝!
    // Hook 관련---------------------------------------------------------------------------------------------------------------------------------------------------------------
    


    return (
      <div className="container">
          <박스>
            <제목 className='red'>Detail</제목>
          </박스>

          {/* hook사용해서 2초후 사라지게 하기 */}
          {
            alert === true
            ? (<div className="my-alert">
                  <p className='my-alert-text'>재고가 얼마 남지 않았습니다.</p>
               </div>)
            : null
          }

          <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>

              <div className="col-md-6 mt-4">
                <h4 className="pt-5">{props.shoes[id].title}</h4>
                <p>{props.shoes[id].content}</p>
                <p>{props.shoes[id].price}</p>

                {/* <button className="btn btn-danger"  onClick={ ()=> {
                  history.goBack(); //바로 전으로 이동하기
                  // history.push('/'); 이건 ()안 경로로 이동해달라는 것
                }}>뒤로가기</button>&nbsp;  */}

                {/* 주문하기 버튼 누를때마다 새로운 데이터 보내기 */}
                <button className="btn btn-danger" onClick={ () => {
                  //버튼을 누를 때마다 {id : 2, name : '새로운상품', quan : 1} 이런 데이터가 redux로 보내집니다.
                  props.dispatch({type : '항목추가', payload : {id : 2, name : '새로운상품', quan : 1} })  //dispa
                }}>주문하기</button>

                &nbsp;

                <button className="btn btn-danger" onClick={ ()=> {
                  history.push('/'); 
                  }}>홈으로</button> 
              </div>
              

              {/* ------------------------------tab 기능 ------------------------------ */}
              {/* TAB UI만드는 법. 1.몇번째버튼 눌렀는지 state로 저장.  2.state에 따라 UI 보이게 안보이게 */}
              {/* eventKey => 버튼들마다 유니크한 eventKey부여하는 것 */}
              {/* Nav를 누르면 state가 0,1 등으로 변경 => 각 해당 숫자에 맞는 div를 보여줘야한다. */}
              
              <div>
                <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                  <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={ ()=>{ 스위치변경(false); 누른탭변경(0) }}>제품 상세 설명</Nav.Link>  
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={ ()=>{ 스위치변경(false); 누른탭변경(1) }}>제품 주의 사항</Nav.Link>
                  </Nav.Item>
                </Nav>
          
                <div className="TabContent">
                <CSSTransition in={스위치} classNames="wow" timeout={500}>  
                  <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
                </CSSTransition>
                </div>
              </div>

          </div>
      </div>
    )
  }

// 3항연산자는 경우의 수가 3이상일 경우 별로다 => 함수 만들어서 사용. Nav를 누르면 state가 0,1 등으로 변경 => 각 해당 숫자에 맞는 div를 보여줘야한다. 
function TabContent(props){

  useEffect( ()=>{
    props.스위치변경(true); //탭내용 컴포넌트가 로드될 때 true
  });

  if (props.누른탭 === 0){
    return <div>111이게 아래로 가야 하는데 왜 위에 있는 걸까요?</div>
  } else if (props.누른탭 === 1){
    return <div>222이게 아래로 가야 하는데 왜 위에 있는 걸까요!!!!!!!!?</div>
  } else if (props.누른탭 === 2){
    return <div>내용2</div>
  }
}

//애니메이션 만들기 팁
//1. 애니메이션 주는 class를 CSS 파일에 열심히 짜서 제작해놓고
//2. 컴포넌트 등장/업데이트시 className을 부착하시면 됩니다. 
//className을 어떻게 원할 때 부착하냐고요? className={} 이렇게 중괄호안에 삼항연산자 if문을 쓰든가 하시면 됩니다. 
//3. <CSSTransition> 에는 in, classNames, timeout이 들어간다. 
//in은 스위치, classname은 이름, timeout은 시간

  
function 함수명(state){
  return{
    state : state.reducer,
    alert열렸니 : state.reducer2,

  }
}

export default connect(함수명)(Detail);