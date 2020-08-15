import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType.isRequired,
  size: PropTypes.number,
};

function Button(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { onClick, icon, size = 16 } = props;

  const toggleIsHovered = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className="button" onClick={onClick} onMouseEnter={toggleIsHovered} onMouseLeave={toggleIsHovered}>
      <div className="circle">
        <img src={icon} alt="Chevron button" width={size} height={size} />
      </div>
    </div>
  );
}

export default Button;