import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  iconSize: PropTypes.number,
  buttonSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};

function Button(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { onClick, icon, iconSize = 16, buttonSize = 32, backgroundColor = 'white', style } = props;

  const toggleIsHovered = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="button" onClick={onClick} onMouseEnter={toggleIsHovered} onMouseLeave={toggleIsHovered} style={style}>
      <div className="circle" style={{ backgroundColor, width: buttonSize, height: buttonSize }}>
        <img src={icon} alt="Chevron button" width={iconSize} height={iconSize} />
      </div>
    </div>
  );
}

export default Button;