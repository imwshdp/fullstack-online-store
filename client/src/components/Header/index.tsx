import React from 'react';

import Logo from 'components/Logo';
import Navbar from 'components/Navbar';

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