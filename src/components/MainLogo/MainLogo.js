import React from 'react';

import './MainLogo.css';
import logo from '../../assets/logo.svg';

function MainLogo() {
  return (
    <div className="main-logo">
      <img src={logo} alt="Mealy Logo" width="210" height="210" />
      <div className="banner-text">
        <h1 className="primary-text">Mealy</h1>
        <h2 className="secondary-text">Meal recipes we suggest for you.</h2>
      </div>
    </div>
  );
}

export default MainLogo;