import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  iconSize: PropTypes.number,
  backgroundColor: PropTypes.string,
};

function Button(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { onClick, icon, iconSize = 16, backgroundColor = 'white' } = props;

  const toggleIsHovered = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="button" onClick={onClick} onMouseEnter={toggleIsHovered} onMouseLeave={toggleIsHovered}>
      <div className="circle" style={{ backgroundColor }}>
        <img src={icon} alt="Chevron button" width={iconSize} height={iconSize} />
      </div>
    </div>
  );
}

export default Button;