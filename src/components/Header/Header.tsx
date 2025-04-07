import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <div className="border-b bg-background sticky top-0 z-40">
      <Navbar />
    </div>
  );
};

export default Header;
