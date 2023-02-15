import React from 'react';

import Logo from 'components/Logo';
import Navbar from 'components/Navbar';

const Header: React.FC = () => {
  return (
    <header id="#main-header">
      <Logo/>        
      <Navbar />
    </header>
  );
}

export default Header;