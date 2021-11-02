/* eslint-disable */
import React, {useState, useContext, lazy, Suspense} from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
// import Detail from './Detail.js'
let Detail = lazy(()=> import('./Detail.js'));
import styled from 'styled-components';


import axios from 'axios';
import Cart from './cart/Cart.js';
import MainNav from './include/Nav.js';

import { Link, Route, Switch, useHistory } from 'react-router-dom';

export let stockContext = React.createContext();


function App() {

  let[shoes, shoesModify] = useState(Data);
  let[loding, lodingModify] = useState(true);
  let [stock, stockModify] = useState([10,11,12]);

  
  return (
    <div className="App">
      <MainNav />
    <Switch>
      
      <Route exact path="/">
        <Jumbotron></Jumbotron>
          <div className="container mt-5 mb-5">

            <stockContext.Provider value={ stock }>

            <div className="row">
              {
                shoes.map((a,i)=>{
                  return <Card shoes={a} i={i} key={i}></Card> // a = shoes[i]
                })
              }
            </div>

            </stockContext.Provider>

            <button className="btn btn-outline-primary" onClick={()=>{

              // axios.post('serverURL', { id : 'coding', pw : 1234 }).then();

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                console.log(result.data);
                shoesModify([ ...shoes, ...result.data ]);

              })//성공시
              .catch(()=>{
                console.log('실패');
              })//실패시;

            }}>더보기</button>
          </div>
      </Route>
      <Route path="/detail/:id">
      <stockContext.Provider value={ stock }>
        <Suspense fallback={<div>로딩중</div>}>
          <Detail shoes={shoes} stock={stock} stockModify={stockModify} />
        </Suspense>
      </stockContext.Provider>
      </Route>

      <Route path="/cart">
        <Cart />
      </Route>

    

      {/* <Route path="/" component={Modal}></Route> */}
        
    </Switch>



    </div>
  );
}
  
  function Card(props) {

    let stock = useContext(stockContext);
    let history = useHistory();

    return (
      <div className="col-md-4" onClick={()=>{ history.push('/detail/'+props.shoes.id)}}>
          <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="100%" />
          <h4>{ props.shoes.title }</h4>
          <p>{ props.shoes.content }</p>
          <p>{ props.shoes.price } 원</p>
          <Test></Test>
      </div>
    )
  }

  function Jumbotron() {
    return (
      <div className="jumbotron">
        <h1>20% Season Off</h1>
        <p>this is a simple hero unit, a simple jumbotron</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>
    )
  }

  function Test() {
    let stock = useContext(stockContext);
    return (
      <p>재고 : {stock[0]}</p>
    )
  }


export default App;
