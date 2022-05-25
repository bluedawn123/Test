 // eslint-disable-next-line
import './App.css';
import { createContext, useState} from "react";
import { Button, Container, Nav, Navbar, Card } from 'react-bootstrap';
import data from './data.js'
import mendata from './mendata.js'
import kidsdata from './kidsdata.js'
import womendata from './womendata';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './routes/Detail.js'
import Nopage from './routes/Nopage.js'
import About from './routes/About.js'
import Cart from './routes/Cart.js'
import EventPage from './routes/EventPage'
// import axios from 'axios'



function App() {
  let [shoes, setShoes] = useState(data)    //data.js를 data로 저장했고 그걸 (data)로 쓰고 다시 shoes에 저장됨
  let [menshoes, menshoes변경] = useState(mendata)    //data.js를 data로 저장했고 그걸 (data)로 쓰고 다시 shoes에 저장됨
  let [kidsshoes, kidsshoes변경] = useState(kidsdata)    //data.js를 data로 저장했고 그걸 (data)로 쓰고 다시 shoes에 저장됨
  let [womenshoes, womenshoes변경] = useState(womendata)
  let [재고] = useState([10, 11, 12])            //context API를 위해서 임의로 생성

  let navigate = useNavigate()



return (
<div className="App">

    <Navbar className="navbar" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand onClick={ ()=> {navigate('/')}}>Shoes</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link onClick={ ()=> {navigate('/')}}>New Lines</Nav.Link>
        <Nav.Link onClick={ ()=> {navigate('/men')}}>Men</Nav.Link>
        <Nav.Link onClick={ ()=> {navigate('/women')}}>Women</Nav.Link>
        <Nav.Link onClick={ ()=> {navigate('/about')}}>About Us</Nav.Link>
        <Nav.Link onClick={ ()=> {navigate('/cs')}}>Customer Service</Nav.Link>
      </Nav>
      </Container>
    </Navbar>




{/*--------------------------------------------------- 메인페이지------------------------------------------------------ */}
<Routes> 
    <Route path="/" element={
        <> 
            <div className='main-bg'></div>
            <div className='new-lines'>New Lines</div>
            <div className="container"> 
              <div className="row">
              {shoes.map(function(a, i){
                  return(
                    <TheCard shoes={shoes[i]} i={i+1} key={i}></TheCard>
                  )
                })}
              </div>
            </div>

        {/*------ 더보기 버튼 눌렀을때 axois통해서 서버에서 데이터 가져와보기 => 안써도 된다. 그냥 심심해서 해봄...-----
            <button className='btn btn-primary' onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then( (result) => {      //result에는 성공한데이터 등 보관. result.data는 데이터만 가져옴(즉, 상품3개만)
                //console.log(result.data) 를 하면, [{}, {}, {}]처럼, 어레이에 오브젝트가 들어있다. 
                //...result.data를 해서 괄호를 벗기고 다시 []를 해줘서 어레이형으로 만들어준다.
                let copy = [...shoes, ...result.data];  //복사본 만들어서 괄호 벗기고 다시 괄호생성
                setShoes(copy)                          //복사본을 setShoes해서 변경
              })                 
              .catch( () => {
              })
            }}>더보기</button> */}

        </>
      }/>


{/*-------------------------------------------------------- 메인페이지 끝------------------------------------------------- */}

{/*-------------------------------------------------------- men페이지 -------------------------------------------- */}
    <Route path="/men" element={
        <>
          <div>
          <div className='men-main-bg'></div>
            <div className="container">
            <div className="row">
              {menshoes.map(function(a, i){
                  return(
                    <TheMen menshoes={menshoes[i]} i={i+1} ></TheMen>
                  )
                })
              }
              </div>
              
            </div>
          </div>
        </>} 
        />
{/*------------------------------------------------------- men 끝 -------------------------------------------- */}

{/*--------------------------------------------------- women페이지 -------------------------------------------- */}
<Route path="/women" element={
        <>
          <div>
          <div className='women-main-bg'></div>
            <div className="container">
            <div className="row">
              {womenshoes.map(function(a, i){
                  return(
                    <TheWomen womenshoes={womenshoes[i]} i={i+1} ></TheWomen>
                  )
                })
              }
              </div>
              
            </div>
          </div>
        </>} 
        />


{/*------------------------------------------------------- women 끝 ---------------------------------- */}
      <Route path="/detail/:id" element={

          <Detail shoes={shoes}/>

        }/>

      
      <Route path="/cart" element={<Cart/>} />
      
      <Route path="/about" element={<About/>}>
        <Route path="member" element={<p>멤버입니다.</p>}></Route>
        <Route path="location" element={<p>위치정보입나다.</p>}></Route>
      </Route>
  
        
      <Route path="/event" element={<EventPage/>}>
        <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
        <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
      </Route>
          
  
      <Route path="/*" element={<Nopage/>} />
    
      

</Routes>

















{/*-----------------------------------------fotter..컴포넌트화하기 추후에---------------------------------- */}

    <div id='wrap'>
        <footer>
          <nav>
              <a href='https://www.instagram.com/blawn1/' target='_blank'>INSTAGRAM</a> |
              <a href='https://map.naver.com/v5/entry/address/14131948.72047941,4520623.418677382,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EB%8C%80%EB%AC%B8%EA%B5%AC%20%ED%99%8D%EC%A0%9C%EB%8F%99%2085-2,jibun?c=14131878.7450475,4520647.5234642,18,0,0,0,dh' target='_blank'>LOCATION</a> |
              <a href='http://localhost:3000/guide' target='_blank'>GUIDE</a> |
              <a href='http://localhost:3000/privacy' target='_blank'>PRIVACY POLICY</a> |

          </nav>
          <p>
              <span>010-9218-8609</span><br/>
              <span>pm 12:00 - pm 19:00 (monday - friday) </span><br/>
              <span>Copyright 2022. cocoder. All Rights Reserved.</span>
              <span></span>
          </p>
      </footer>
    </div>
{/*----------------------------------------- ---------------------------------- */}


</div>  
);
}




///////////////////////////// 함수부분
function TheCard(props){
  let navigate = useNavigate();
  return (
    <div className="col-md-3" onClick={ ()=> {navigate('/detail/' + props.i) }}>
        <img src={process.env.PUBLIC_URL + '/product' + props.i + '.jpg'} width="80%" />
        {/* <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" /> */}
        <h4>{ props.shoes.title }</h4>
        <p>{ props.shoes.price }</p>
    </div>
  )
}


function TheMen(props){
  let navigate = useNavigate();
  return (
    <div className="col-md-3">
        <img src={process.env.PUBLIC_URL + '/menproduct' + props.i + '.jpg'} width="80%" />
        <h4>{ props.menshoes.title }</h4>
        <p>{ props.menshoes.price }</p>
    </div>
  )
}

function TheWomen(props){
  return (
    <div className="col-md-3">
        <img src={process.env.PUBLIC_URL + '/womenproduct' + props.i + '.jpg'} width="80%" />
        <h4>{ props.womenshoes.title }</h4>
        <p>{ props.womenshoes.price }</p>
    </div>
  )
}






export default App;

//array자료형. let a = ['kim', 20 ]  a[0]은 kim으로 나옴
//ojbect자료형. let b = {'kim', 40} 이런 건 {name : 'kim', age : 20} 이런식으로 해야함


