import { useEffect, useState} from "react";
import '../css/resetlogin.css';
import '../css/Detail.css';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import {Nav} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function Detail(props){

    let {id} = useParams();   //유저가 :id 에 적은거 갖고와줌
    let 찾은상품 = props.shoes.find(function(x){
        return x.id == id
    });

return( 
<div className="container">
    <div id="order_wrap">
        <div class="left">
            {/* <img src={process.env.PUBLIC_URL + '/testpic' + '.jpg'} /> */}
            <img src={process.env.PUBLIC_URL + '/product' + id + '.jpg'} />
        </div>
        <div class="right">
            <div class="top">
                <h1>{찾은상품.title}</h1>
                <p>{찾은상품.content} dd</p>
                <dl>
                    <dt>판매가격</dt>
                    <dd class="price">{찾은상품.price}krw </dd>
                    <dt>적립금</dt>
                    <dd>1%</dd>
                    <dt>원산지</dt>
                    <dd>대한민국</dd>
                </dl>
                <div class="number">
                    <p class="order_name">{찾은상품.title}</p>
                    <div class="order_number">
                        <span class="number_price">{찾은상품.price}krw</span>
                    </div>
                </div>
                <div class="total_price">
                    <p>총 상품 금액</p>
                    <p class="result_price">{찾은상품.price}krw</p>
                </div>
            </div>
            <div class="bottom">
                <button type="button" id="order_btn">주문하기</button>
                <button type="button" id="cart_btn">장바구니</button>
                <button type="button" id="like_btn">찜하기</button>
            </div>
        </div>
    </div>
    <div className="carousel">
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
    </div>
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3 mt-5"
      fill
    >
      <Tab eventKey="home" title="Home">
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      <div>아아</div>
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
      <Tab eventKey="longer-tab" title="Loooonger Tab">
        Tab content for Loooonger Tab
      </Tab>
      <Tab eventKey="contact" title="Contact" >
        Tab content for Contact
      </Tab>
    </Tabs>
    
</div>
    
)

}

export default Detail;