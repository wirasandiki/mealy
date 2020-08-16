import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../InputText/InputText';

import './Questions.css';

QuestionOne.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
};

function QuestionOne(props) {
  const { value, onChange, inputRef } = props;
  return (
    <div className="question-wrapper">
      <div className="label-description">
        <label className="primary-text" htmlFor="QuestionOne">What kind of meal do you want?</label>
        <p className="secondary-text">*separate by comma</p>
      </div>
      <InputText id="QuestionOne" value={value} onChange={onChange} placeholder="e.g. burger, meat, noodle" inputRef={inputRef} />
    </div>
  );
}

export default QuestionOne;