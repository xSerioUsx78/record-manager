import React from 'react';
import NavBar from './NavBar';

const Base: React.FC = ({children}) => {

  return (
    <>
      <NavBar />
      <div id="main">
        {children}
      </div>
    </>
  )
};

export default Base;