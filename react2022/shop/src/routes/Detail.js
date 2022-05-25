import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import './Detail.css';
import {  Nav} from 'react-bootstrap';



function Detail(props){

    

    let [탭, 탭변경] = useState(0)  //true, false보단, 상태가 여러가지 일수 있으니 숫자로 지정
    let {id} = useParams();   //유저가 :id 에 적은거 갖고와줌
    let 찾은상품 = props.shoes.find(function(x){
        return x.id == id
    });
    let [alert, setAlert] = useState(true)

    //useEffect는 장작되고 업데이트 될때 실행된다.
    useEffect( ()=>{
        let a = setTimeout( ()=> { setAlert(false) }, 3000)
        return ()=>{
            clearTimeout(a)
        }
    }, [])

return( 
    <div className="container">
        
        {/* state에 따른 Ui기능위해서 3항연산자 생성 */}
        {
            alert === true
            ?  <div className="alert-waring">
                5월 31일까지 무료배송입니다.
            </div>
            : null
        }

        
        <div className="row">
            <div className="col-md-6">
                <img src={process.env.PUBLIC_URL + '/product' + id + '.jpg'} width="90%" />
            </div>     
            <div className="col-md-6 mt-4">
            <h4 className="pt-5">{찾은상품.title}</h4>
            <p>{찾은상품.content}</p>
            <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>

    <Nav variant="tabs"  defaultActiveKey="link0">           {/*디폴트는첨에뭐로보여줄지 */}
        <Nav.Item>
            <Nav.Link onClick={ ()=> {탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link onClick={ ()=> {탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link onClick={ ()=> {탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
    </Nav> 

    {/* 조건문(3항연산자)에 따른 각 다른 내용 보여주기  */}
    <TabContent 탭={탭}/>

</div> 
)

// 3항연산자보다는 if문으로 써보자. 단, html안에서 if조건문이 안되므로 바깥에서 만들고 불러오기 + 컴포넌트는 return이 필수!!
function TabContent({탭}){
    return (<div className="start end">
        { [<div>내용000</div>, <div>내용1</div>, <div>내용2</div>][탭] }
    </div>)
    
    // if (탭 == 0){
    //     return <div>내용0</div>
    // } 
    // if (탭 == 1){
    //     return <div>내용1</div>
    // } 
    // if (탭 == 2){
    //     return <div>내용2</div>
    // }

    }

}

export default Detail;