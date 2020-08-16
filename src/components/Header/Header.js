import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

Header.propTypes = {
  icon: PropTypes.elementType.isRequired,
  isVisible: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string,
};

function Header(props) {
  const { icon, isVisible, backgroundColor = 'transparent' } = props;
  const style = {
    transform: isVisible ? 'translateY(0)' : 'translateY(-10vh)',
    backgroundColor,
  };

  return (
    <header style={style}>
      <a href="/" >
        <div className="header-logo">
          <img src={icon} alt="Mealy Logo" width="40" height="40" />
          <h1 className="primary-text header-logo-text">Mealy</h1>
        </div>
      </a>
    </header>
  );
}

export default Header;