import React, {useState, useEffect, useContext} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import './Detail.scss';

import {stockContext} from './App.js'
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';

let DivBox = styled.div`
    padding-top : 100px
`;

let MainTitle = styled.h4`
    font-size : 25px;
    color : ${ props => props.Color }
`;

function Detail(props) {

    let [alert, alertModify] = useState(true);
    let [inputData, inputDataModify] = useState('');
    let stock = useContext(stockContext);
    let [tabSwitch, tabSwitchModify] = useState(false);

    let [pushTab, pushTabModify] = useState(0);

    useEffect(() => {
        let timer = setTimeout(() => { alertModify(false) }, 2000);
        return () => { clearTimeout(timer) }
        // return function name(params) {
        //     //Detail이 사라질 때 실행됨 
        //     // return () => {} 로 사용 가능
        // } 
    }, [alert]); //alert라는 state가 변경이 될 때 훅 실행 , [] :  딱 한번 실행


    let { id } = useParams();
    let history = useHistory();
    let productId = props.shoes.find( function(product) {
        return product.id == id
    });

    return (
        <div className="container">
          <DivBox>

              {/* <MainTitle Color={'grey'}>Detail</MainTitle> */}
              {/* <MainTitle className="red">Detail</MainTitle> */}

          {/* { inputData }
          <input onChange={(e)=>{ inputDataModify(e.target.value) }} /> */}
          </DivBox>

        {
            alert === true 
            ? ( <div className="my-alert-yellow">
                <p>재고 임박! 서둘러서 주문 해 주세요!!</p>
                </div> )
            : null
        }
       

        <div className="row">
          <div className="col-md-6">
            <img src={ 'https://codingapple1.github.io/shop/shoes'+ ( productId.id + 1 ) +'.jpg'} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{productId.title}</h4>
            <p>{productId.content}</p>
            <p>{productId.price} 원</p>
            <Stock stock={props.stock}></Stock>
            <button className="btn btn-danger" onClick={ ()=>{
                props.stockModify([9,11,12]);
                props.dispatch({type : 'addList', payload : { id:productId.id, name : productId.title, quan:1}});
                history.push('/cart');
            } }>주문하기</button> 
            <button className="btn btn-danger" onClick={ ()=>{
                history.push('/'); } }>뒤로가기</button> 
          </div>
        </div>

        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={()=>{ tabSwitchModify(false); pushTabModify(0) }}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>{ tabSwitchModify(false); pushTabModify(1)}}>Option</Nav.Link>
            </Nav.Item>
        </Nav>
        <CSSTransition in={tabSwitch} classNames="wow" timeout={500}>
            <TabContent pushTab={pushTab} tabSwitchModify={tabSwitchModify} />
        </CSSTransition>
      </div>    
    )
}

    function TabContent (props) {

        useEffect(()=>{
            props.tabSwitchModify(true);
        });

        if (props.pushTab === 0) {
            return <div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div><div>첫 번째 내용입니다.</div>첫 번째 내용입니다.</div>
        } else if(props.pushTab === 1) {
            return <div>두 번째 내용입니다.</div>
        } else if(props.pushTab === 2) {
            return <div>세 번째 내용입니다.</div>
        }
        
    }

  function Stock(props) {
      return(
          <p>재고 : {props.stock[0]}</p>
      )
  }



function dataInfor(state) {
    console.log(state);
    return {
        state : state.reducer,
        alertState : state.reducerAlert

    }
}

export default connect(dataInfor)(Detail);
//   export default Detail;