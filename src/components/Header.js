import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'

function Header(props){
  return(
    <header className="header header_position_align">
        <a href="#" target="_self">
          <img src={logo} className="logo" alt="Логотип" />
        </a>
        <Link className='header__link' onClick={props.redirectHandler} to={props.loginPage ? '/sign-up' : '/sign-in'}>{props.loginPage ? 'Зарегистрироваться' : 'Войти'}</Link>
    </header>
  )
  }

export default Header;