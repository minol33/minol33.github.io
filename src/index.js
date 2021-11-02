import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, useParams } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

let initialAlert = true;

function reducerAlert( state = initialAlert, action ) {
  if ( action.type === 'closeAlert'){
    state = false;
    return state; 
  } else {
    return state
  }
}

let initialState = [
  { id : 0, name : 'niceShoes', quan : 2 },
  { id : 1, name : 'blueShoes', quan : 5 }
];


function reducer(state = initialState, action) {
  if ( action.type === 'addList' ){
    let found = state.findIndex((a)=>{return a.id === action.payload.id });
    if(found >= 0 ){
      let copy = [...state];
      copy[found].quan++;
      return copy
    } else {
      let copy = [...state];
      copy.push(action.payload);
      return copy
    }

  } else if( action.type === 'addQuan' ){
    let copy = [...state];
    copy[action.payload].quan++;
    return copy

  } else if( action.type === 'minusQuan' ) {
    let copy = [...state];
    copy[action.payload].quan--;
    return copy

  }  else {
    return state
  }
}

let store = createStore(combineReducers({reducer, reducerAlert}));



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
