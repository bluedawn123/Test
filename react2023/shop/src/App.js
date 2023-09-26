import { useState } from 'react';
import './App.css';
import {Button, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import React from 'react';
// data.js에서 App.js로 data정보 보낼때
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './pages/Detail.js';import About from './pages/About';import Product from './pages/Product';
import NonPage from './pages/NonPage';import Login from './pages/Login';import JoinUs from './pages/JoinUs';
import styled from 'styled-components'
import axios from 'axios'
import CustomService from './pages/CustomService';
import { EmblaCarousel } from './components/EmblaCarousel';

// 이미지 갖고오고 싶을때 => import 작명1 from './main1.jpg'(파일위치) 이런식.아래팁1참조 갖고와서 작명1써주면됌


function App() {
  let [shoes, setShoes] = useState(data);  //data.js 에서 보낸 데이터
  //console.log(shoes)  data.js와 같은 어레이 데이터들 출현

  let navigate = useNavigate();


return (
<div className="App">
    {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Product">Product</Nav.Link>
            <Nav.Link onClick={ ()=> {navigate('/About')} }>AboutUs</Nav.Link>
          </Nav>
          
        </Container>
    </Navbar> */}

    <Navbar className='navbar' collapseOnSelect expand="lg" bg="dark" variant="dark" position="fixed">	
        <Container>	
          <Navbar.Brand href="/">Shoes Select Shop</Navbar.Brand>	
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />	
          <Navbar.Collapse id="responsive-navbar-nav">	
            <Nav className="me-auto">	
            <Nav.Link href="/Product">New Products</Nav.Link>
              <NavDropdown href="/Product" title="Product Lines" id="collasible-nav-dropdown">	
                <NavDropdown.Item href="#action/3.1">New Products</NavDropdown.Item>	
                <NavDropdown.Item href="#action/3.2">Men</NavDropdown.Item>	
                <NavDropdown.Item href="#action/3.3">Women</NavDropdown.Item>	
                <NavDropdown.Item href="#action/3.3">Kids</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Accesary</NavDropdown.Item>	
                <NavDropdown.Divider />	
                <NavDropdown.Item href="#action/3.4">Sale-Items</NavDropdown.Item>	
              </NavDropdown>	
              <Nav.Link onClick={ ()=> {navigate('/About')} }>About Us</Nav.Link>	
              <Nav.Link onClick={ ()=> {navigate('/customservice')} }>Customer Service</Nav.Link>	
            </Nav>	
            {/* 위, 아래중 골라서하면된다. */}
            <Nav>	
              <Nav.Link href='/login'>Log in</Nav.Link>	
              <Nav.Link href='/joinus' eventKey={2} >	Join Us</Nav.Link>	
            </Nav>	
          </Navbar.Collapse>	
        </Container>	
      </Navbar>	



    {/* <Link to='/detail'>상세페이지</Link> */}

    <Routes>
      {/* 메인페이지 */}
      <Route path="/" element={
        <mainpagediv>

          {/*팁1 html 안에서 src 폴더의 이미지를 넣고 싶으면 
          <div className="main-bg" style={{ backgroundImage : 'url(' + 작명1 + ')' }}></div> */}
          <div className='main-bg'></div>
          <div className="container">
            <div className="row">

          {/* 팁1 public 폴더 바로 이용하는 방법 => 오류방지를 위해 process.env.PUBLIC_URL 사용 
             <div className="col-md-4">
              <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%" />
              <h4>상품명</h4>
              <p>상품정보</p>
             </div>          */}
       

          {/* 
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%" />
            <h4>{shoes[0].title}</h4>
            <p>{shoes[0].content}</p>
          </div> 
          => 이것과 <Card 받은shoes정보={shoes}></Card> 는 같다. 컴포넌트한 것뿐     */} 
       
        
          {/*  
          <Card 받은shoes정보={shoes[0]} i={1}></Card>    
          <Card 받은shoes정보={shoes[1]} i={2}></Card>   
          <Card 받은shoes정보={shoes[2]} i={3}></Card>   
          이걸 바로아래 반복문으로 변경*/}

            {shoes.map( (a, i) => {  
               //console.log(a)  어레이속 오브젝트를 하나씩 출력
               //console.log(i)  어레이속 오브젝트 순번들을 0,1,2처럼 갯수에 맞게 출력

               return (
                 <Card shoes정보={shoes[i]} 사진번호={i+1} ></Card> //i는0부터 시작인데 사진은 1번부터
                 )
               })
             }
            </div>
          </div>

          <button onClick={()=>{
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then( (결과)=>{
              console.log(결과)
              let copy = [...shoes, ...결과.data];
              setShoes(copy);
            })
            .catch( ()=> {
              console.log('실패함')
            })
          }}>더보기</button>


        </mainpagediv> 
      }/> 
      
      
      
      <Route path="/detail/:id" element={ <Detail detail에서쓸shoes데이터 = {shoes} ></Detail> } />
      <Route path="/product" element={ <Product/> } />

      <Route path="/about" element={ <About/> } >  
        <Route path="member" element={ <div>멤버들</div> } />
        <Route path="location" element={ <div>회사위치</div> } />
      </Route>

      <Route path="/login" element={ <Login/> } />
      <Route path="/joinus" element={ <JoinUs/> } />
      <Route path="/customservice" element={ <CustomService/> } />
      <Route path="*" element={ <NonPage/> } /></Routes>



      

</div>
);
}

//App 컴포넌트의 자식컴포넌트인 Card라는 컴포넌트 생성. shoes데이터가 없으니 props필요
function Card(props) {  
  return(
  <div className="col-md-3 mt-5">
    <img src={'https://codingapple1.github.io/shop/shoes' + props.사진번호 + '.jpg'} width="80%" />
    <h4>{props.shoes정보.title}</h4>
    <p>{props.shoes정보.content}</p>
  </div>
  )
}

export default App;

// axios.post('url', {name : 'kim'})


// Promise.all([ axios.get('url1'), axios.get('url2') ])
// .then( ()=>{

// })
// .catch( ()=> {
  
// })

{/* <button onClick={()=>{
            fetch('https://codingapple1.github.io/shop/data2.json')
            .then( 결과=> 결과.json() )
            .then( (결과) => {console.log(결과)})
          }}>더보기</button>  */}