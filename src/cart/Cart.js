import React from 'react';
import {Table} from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import './cart.css';

function Cart(props) {
    
    let state = useSelector((state)=> state);
    let dispatch = useDispatch();
    
    let DivBox = styled.div`
    padding-top : 100px
    `;

    return (
        <div className="container">
            <DivBox></DivBox>
            <Table responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                </tr>
                </thead>
                <tbody>
                {
                    state.reducer.map((a,i)=>{
                        return(
                            <tr key={i}>
                                <td>{ a.id }</td>
                                <td>{ a.name }</td>
                                <td>{ a.quan }</td>
                                <td><button onClick={()=>{ dispatch({type : 'addQuan', payload : a.id}) }}>+</button>
                                <button onClick={()=>{ dispatch({type : 'minusQuan', payload : a.id}) }}>-</button></td>
                            </tr>

                        )
                    })
                }
                </tbody>
            </Table>
            { state.reducerAlert === true   //props.alertState === true 
                ? (<div className="my-alert-yellow">
                    <p>지금 구매하시면 신규 할인 20%
                    <button onClick={()=>{ dispatch({type : 'closeAlert'}) }}>X</button>
                    </p>
                </div>)
                : null
            }
        </div>
    )
}

// function dataInfor(state) {
//     return {
//         state : state.reducer,
//         alertState : state.reducerAlert

//     }
// }

// export default connect(dataInfor)(Cart);
export default Cart;