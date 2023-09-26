import { useEffect, useState } from "react";
import './detail.css'
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import {Nav} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

import React from 'react'
import { EmblaCarousel } from "../components/EmblaCarousel";

// let Box = styled.div`
//   padding : 20px;
//   color : grey
// `;

// let YellowBtn = styled.button`
//   background : yellow;
//   color : black;
//   padding : 10px;
// `;

function Detail2(props){ //불필요하나 그냥 남겨둠ㅋ
    let {id} = useParams();
    return (
    <div className="container">
        {/* <YellowBtn></YellowBtn> */}
        <div className="row">
            <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6">
                <h4>{props.detail에서쓸shoes데이터[id].title}</h4>
                <p>{props.detail에서쓸shoes데이터[id].content}</p>
                <p>{props.detail에서쓸shoes데이터[id].price}</p>
                <button className="btn btn-danger">주문하기</button> 
            </div>
          </div>
        </div> )}

function Detail(props){
    let { id } = useParams();
    let 찾은상품 = props.detail에서쓸shoes데이터.find(function(x){  //~~데이터 = data.js와 같음
      return x.id == id
    });
    //console.log(찾은상품) => data.js와 지금입력된 url을 비교해서 같은 id번호만 갖고온다!
    //{id: 0, title: 'White and Black', content: 'Born in France', price: 120000} 이런식

    let [alert, setalert] = useState(true)
    let [탭, 탭변경] = useState(0)

    useEffect( ()=> {
      setTimeout( ()=> {setalert(false)}, 2000)
    }, [])

    return (
      <div className="container">
        {
          alert == true
          ? <div className="alert alert-warning">FW특별할인 기간 : 2023-08-05 00:05 ~ 2028-12-31 23:55</div>
          : null
        }

        <div className="row">
          <div className="col-md-6">
            {/* <YellowBtn></YellowBtn> */}
            <img src={'https://codingapple1.github.io/shop/shoes' + [찾은상품.id + 1] + '.jpg'} width="100%" />
          </div>
          <div className="col-md-6  pt-5">
            <h4 className="pt-5">[ {찾은상품.title} ]</h4>
            <h6 className="pt-2">Price : {찾은상품.price}원</h6>
            <h6 className="pt-2">할인판매가 : {찾은상품.price}원</h6>
            <h6 className="pt-2">특별할인기간 : {찾은상품.saleterm}</h6>
            <button className="btn btn-primary mt-3 m-2 ">주문하기</button> 
            <button className="btn btn-secondary mt-3 m-2 ">장바구니 담기</button> 
          </div>
        </div>
      
        {/* <Nav variant="tabs"  defaultActiveKey="link0">
          <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(1) }} eventKey="link0">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(2) }} eventKey="link0">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent 탭={탭}/> */}
      
        <EmblaCarousel/>

        <Tabs defaultActiveKey="Detail" id="fill-tab-example" className="mb-3 mt-5"fill>
          <Tab eventKey="Detail" title="Detail">
            <div>
                <h4>{props.detail에서쓸shoes데이터[id].title}</h4>
                <p>{props.detail에서쓸shoes데이터[id].content}</p>
                <p>{props.detail에서쓸shoes데이터[id].price}</p>
                <button className="btn btn-danger">주문하기</button> 
            </div>
          </Tab>
          <Tab eventKey="Note" title="Note">
            Tab content for Profile
          </Tab>
          <Tab eventKey="Measurement" title="Measurement">
            Tab content for Loooonger Tab
          </Tab>
          <Tab eventKey="Shipping" title="Shipping" >
            Tab content for Contact
          </Tab>
        </Tabs>
      
      </div>  

      
    )
  };


function TabContent(props){
  if (props.탭 === 0){
    return <div>내용0</div>
  }
  if (props.탭 === 1){
    return <div>내용1</div>
  }
  if (props.탭 === 2){
    return <div>내용2</div>
  }
}

// function CarouselFadeExample() {
//   return (
//     <Carousel fade>
//       <Carousel.Item>
//         <ExampleCarouselImage text="First slide" />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <ExampleCarouselImage text="Second slide" />
//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <ExampleCarouselImage text="Third slide" />
//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }


export default Detail;


