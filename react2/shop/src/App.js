// import logo from './logo.svg';
import React, { useState } from 'react';
import { Navbar,Nav,NavDropdown, Form, Button, FormControl, Container, Jumbotron } from 'react-bootstrap';
import './App.css';
import grey2002 from "./grey2002.jpg"
import pink from "./pink.jpg"


function App() {

  let [shoes, shoes변경] = useState([]);



  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container> 
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Jumbotron className="background">
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>

          <div className="col-md-4">
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="100%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>

          <div className="col-md-4">
          <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="100%" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>



        </div>
      </div>
    </div>


  );
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