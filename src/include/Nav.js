import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { faUser, faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './nav.css';

function MainNav() {

    // nav 스크롤 이벤트
    const [scrollPosition, setScrollPosition] = useState(0);
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    // 토글버튼
    const [toggle, setToggle] = useState(false);
    const showToggle = () => setToggle(!toggle); // on,off

    var black = { color : 'black' };
    var red = { color : 'red' };
    var blue = { color : 'blue' };
    
    
    return (
        <div className={scrollPosition < 80 ? "navbar" : "navbar active"}>
            <div className="nav-logo">
                <h2><Link as={Link} to="/" style={black}>Almost</Link></h2>
            </div>
            <ul className={ toggle ? "nav-menu active" : "nav-menu" }>
                <li><Link as={Link} to="/detail/0"  style={blue}>ALL</Link></li>
                <li><Link as={Link} to="/"  style={red}>NEW</Link></li>
                <li><Link as={Link} to="/">TOP</Link></li>
                <li><Link as={Link} to="/">BOTTOM</Link></li>
                <li><Link as={Link} to="/">ACCESSORIES</Link></li>
            </ul>
            <ul className={ toggle ? "nav-icons active" : "nav-icons" }>
                <Link as={Link} to="/cart"><FontAwesomeIcon className="nav-icon" icon={faShoppingCart}></FontAwesomeIcon></Link>
                <Link as={Link} to="/login"><FontAwesomeIcon className="nav-icon" icon={faUser}></FontAwesomeIcon></Link>
                    {/* <ul className="user">
                        <li><Link as={Link} to="/">JOIN</Link></li>
                        <li><Link as={Link} to="/">LOGIN</Link></li>
                    </ul> */}
            </ul>

            <button class="nav-toggleBtn" onClick={showToggle}>
                <FontAwesomeIcon className="nav-toggle" icon={faBars}></FontAwesomeIcon>
            </button>

        </div>
    )
}

// export default () => <FontAwesomeIcon icon={faUserCircle} />;
export default MainNav;