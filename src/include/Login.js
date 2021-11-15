import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import './login.css';
import { Link } from 'react-router-dom';

function Login(props) {
    
    let DivBox = styled.div`
    padding-top : 150px
    `;
    var white = { background : 'white', color : 'black'};



    return (
        <div className="container">
            <DivBox></DivBox>
            <div className="login">
                <h4>LOGIN</h4>
                <p>로그인 하시면 다양하고 특별한 혜택을 이용할 수 있습니다.</p>
                <div className="loginInput">
                    <input type="text" placeholder="아이디"></input>
                    <input type="password" placeholder="비밀번호"></input>
                </div>
                <div className="saveID">
                    <input type="checkbox" ></input>
                    <span>아이디 저장</span>
                </div>
                <button type="submit">LOGIN</button>
                <Link to="./join">
                <button style={white}>JOIN US</button>
                </Link>

            </div>
        </div>
    )
}

export default Login;