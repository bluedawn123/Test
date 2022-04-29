// import logo from './logo.svg';
// eslint-disable
import React, { useState } from 'react';
import { Navbar,Nav,NavDropdown, Form, Button, FormControl, Container, Jumbotron } from 'react-bootstrap';
import './App.css';
import Data from './data.js'
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Datail.js'
import axios from 'axios';
import Cart from './Cart.js';


// import grey2002 from "./grey2002.jpg"
// import pink from "./pink.jpg"


function App() {

  let [shoes, shoes변경] = useState(Data);  //data.js에 있는 data를 useState의 []에 넣는다. 근데 []이므로 ()로 변경후 넣기



  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container> 
          <Navbar.Brand as={Link} to="/">Shoe Shop</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            {/* <Nav.Link><Link to="/"> Home </Link></Nav.Link>  */}
            {/* <Nav.Link as={Link} to="/"> Home </Nav.Link>  */}
            <Nav.Link as={Link} to="/detail"> About Us </Nav.Link> 
            <Nav.Link as={Link} to="/detail"> Products </Nav.Link>
            <Nav.Link as={Link} to="/detail"> Contact Us</Nav.Link> 
            <Nav.Link as={Link} to="/detail"> Customer Service </Nav.Link> 

                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">1</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">2</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">3</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
<Switch>
{/* ---------------------------------------------메인페이지 ------------------------------------------------------------- */}
      <Route exact path="/"> {/* 매칭되는 걸 다 보여줘서 exact를 쓴다. */}
        <Jumbotron className="background">
            <h1>Hello, world!</h1>
            <p> 
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information. 
            <p>
            omponent for calling extra attention to featured content or information.
            <p>
            Line 41:11:  Imported JSX component 박스 must be in PascalCase or SCREAMING_SNAKE_CASE
            </p>
            <p>
            img elements must have an alt prop, either with meaningful text, or an empty string for decorative images
            </p>
            </p>
            </p>
            <p>
            <Button variant="primary" as={Link} to="/detail">Learn more</Button>
            </p>
        </Jumbotron>

{/* ---------------------------------------------메인페이지 ------------------------------------------------------------- */}


{/* ---------------------------------------------제품 카드  ------------------------------------------------------------- */}
        
        <div className="container">
          <div className="row">
            {/* 
            <Card shoes={shoes[0]}></Card>
            <Card shoes={shoes[1]}></Card>
            <Card shoes={shoes[2]}></Card> 을 반복문을 아래 코드  써서 최소화 */}
          
            {
              shoes.map( (a, i)=> {   //a는 각 데이터, i는 0부터 증가하는 수
                return<Card shoes={shoes[i]} i={i} key={i}></Card>   //대신, <Card shoes={ a }}></Card> 를 써서 props해도 됌
              })
            }
          </div>
{/* ---------------------------------------------제픔 카드 ------------------------------------------------------------- */}


          <button className='btn btn-primary' onClick={ ()=> {
            axios.get('https://codingapple1.github.io/shop/data2.json')     //서버에 get요청
            .then( (result) => {      //result에는 성공한데이터 등 보관. result.data는 데이터만 가져옴(즉, 상품3개만)


              shoes변경( [...shoes, ...result.data] ); //복사본 만들어서 원래의 shoes state에 추가


            })                 
            .catch( () => {

            })

          }}>더보기</button>

        </div> 
      </Route>

        

      <Route exact path="/detail/:id">    {/* /:id => 아무문자가 받겠다는 URL작명법 */}
        <Detail shoes={shoes}></Detail>
      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>





</Switch>{/* switch컴포넌트 => 중복허용X. 여러개가 맞아도 하나만 보여주세요 => 맨 위에서 매칭이 된 것만 보여준다. */}







    </div> //app.js 닫기


  );
}






function Card(props){
  return (
  <div className="col-md-4">
      {/* src속성에 바인딩하려면, {}사용. src={}하면 변수명 함수명 넣기 가능 */}
      <img src= { 'https://codingapple1.github.io/shop/shoes' + (1 + props.i) + '.jpg' } 
      width="100%" />    {/* shop/shoes/1 부터 데이터가 시작되므로*/}
      <h4>{ props.shoes.title}</h4>
      <p>{ props.shoes.content}</p>
  </div>
  )
}



export default App;














          {/* <div className="col-md-3">
          <img src={grey2002} width="100%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>

          <div className="col-md-3">
          <img src={pink} width="80%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div> */}