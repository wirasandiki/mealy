import React from 'react';
import PropTypes from 'prop-types';

import './InputText.css';

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  ink: PropTypes.oneOf(['light', 'dark']),
  inputRef: PropTypes.object,
};

const defaultStyle = {
  borderBottomWidth: '3px',
  borderBottomStyle: 'solid',
  fontSize: '1.75em',
};

function InputText(props) {
  const { value, onChange, id, style = defaultStyle, placeholder, ink = 'light', inputRef } = props;
  return (
    <input id={id} type="text" value={value} onChange={onChange} style={style} placeholder={placeholder} className={`input-${ink}`} ref={inputRef} />
  );
}

export default InputText;