import React from 'react';

import Logo from 'components/GeneralComponents/Logo';
import Navbar from 'components/GeneralComponents/Navbar';
import "./index.module.css";

const Header: React.FC = () => {
  return (
    <header id="#header">
      <Logo/>        
      <Navbar />
    </header>
  );
}

export default Header;