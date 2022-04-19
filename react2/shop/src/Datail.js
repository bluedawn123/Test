//app.js에서 shoes 받아와서 사용
import React, { useState } from 'react';   //컴포넌트 만들 때 필수
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components'
import './Detail.scss';

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

    return (
      <div className="container">
          <박스>
            <제목 className='red'>Detail</제목>
          </박스>

          <div className="my-alert">
            <p className='my-alert-text'>재고가 얼마 남지 않았습니다.</p>
          </div>

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
                <button className="btn btn-danger" >주문하기</button>
                &nbsp;
                <button className="btn btn-danger" onClick={ ()=> {
                  history.push('/'); 
                }}>홈으로</button> 
              </div>

            </div>
      </div>
      
    )
  }
  
  export default Detail;   //Datail함수를 app.js에서 쓰기 위해서