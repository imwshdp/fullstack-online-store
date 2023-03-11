import React from 'react';

import Logo from 'components/General/Logo';
import Navbar from 'components/General/Navbar';
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