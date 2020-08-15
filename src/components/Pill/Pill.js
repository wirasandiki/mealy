import React from 'react';
import PropTypes from 'prop-types';

import './Pill.css';

Pill.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  fontColor: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

function Pill(props) {
  const { text, icon, backgroundColor, fontColor } = props;
  return (
    <div className="pill-wrapper" style={{ backgroundColor, color: fontColor }}>
      <img src={icon} width="14" height="14" alt={`icon ${text}`} className="pill-icon"/>
      {text}
    </div>
  );
}

export default Pill;