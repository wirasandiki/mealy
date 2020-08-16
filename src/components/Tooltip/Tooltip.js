import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Tooltip.css';

Tooltip.propTypes = {
  isVisible: PropTypes.bool,
  style: PropTypes.object,
  content: PropTypes.element.isRequired,
  placement: PropTypes.oneOf(['top', 'bottom']),
  onHover: PropTypes.func,
  contentWidth: PropTypes.number,
};

function Tooltip(props) {
  const { style, children, isVisible, content, placement = 'top', onHover, contentWidth = 100 } = props;
  const [show, setShow] = useState(isVisible | false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const contentRef = useRef(null);
  const handleMouseEnter = () => {
    onHover && onHover();
    setShow(true);
  };
  const handleMouseLeave = () => {
    setShow(false);
  };
  
  useEffect(() => {
    setHeight(contentRef.current.clientHeight);
    setWidth(contentRef.current.clientWidth);
  }, [content]);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div
        className={'tooltip-content'}
        style={{
          visibility: show ? 'visible' : 'hidden',
          [placement]: `calc(-${height}px - 5px)`,
          left: `calc(-${width/2}px + 50%)`,
          width: `${contentWidth}px`,
          display: 'flex',
          justifyContent: 'center',
        }}
        ref={contentRef}
      >
        {content}
      </div>
      {children}
    </div>
  );
}

export default Tooltip;