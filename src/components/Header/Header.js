import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

Header.propTypes = {
  icon: PropTypes.elementType.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

function Header(props) {
  const { icon, isVisible } = props;

  return (
    <header style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-10vh)' }}>
      <div className="header-logo">
        <img src={icon} alt="Mealy Logo" width="40" height="40" />
        <h1 className="primary-text header-logo-text">Mealy</h1>
      </div>
    </header>
  );
}

export default Header;