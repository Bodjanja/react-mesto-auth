import React from 'react';
import logo from '../logo.svg';

function Header(){
  return(
    <header className="header header_position_align">
        <a href="#" target="_self">
        <img src={logo} className="logo" alt="Логотип" />
        </a>
    </header>
  )
  }

export default Header;