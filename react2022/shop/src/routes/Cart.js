import {Table} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { changeName, increase } from "./../store.js"

function Cart(){

    let state = useSelector((state) => {return state})  //redux sotre에 있던 state
    console.log(state.cart)

    let dispatch = useDispatch()   //store.js 한테 요청 보냄

    return(
        <div>

            <h6>{state.userss.name} {state.userss.age} 의 장바구니 </h6>
            <button onClick={()=>{
                dispatch(increase())
            }}>버튼</button>   

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.cart.map((a, i)=>
                        <tr key={i}>
                            <td>1</td>
                            <td>{state.cart[i].name}</td>
                            <td>{state.cart[i].count}</td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(changeName() )
                                }}>+</button>
                            </td>
                        </tr>
                     )
                 }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;