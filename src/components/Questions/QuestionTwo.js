import React from 'react';
import PropTypes from 'prop-types';

import './Questions.css';
import './QuestionTwo.css';

QuestionTwo.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function BulletItem(props) {
  const { text, value, onClick, isActive } = props;

  const handleClick = () => {
    onClick(value);
  };

  const className = `secondary-text ${isActive ? 'bullet-active ' : ''} bullet`;

  return (
    <div onClick={handleClick} className={className}>
      {text}
    </div>
  );
}

function QuestionTwo(props) {
  const { value, onChange } = props;
  const list = [
    { name: 'Pescetarian', value: 'pescetarian' },
    { name: 'Lacto Vegetarian', value: 'lacto vegetarian' },
    { name: 'Ovo Vegetarian', value: 'ovo vegetarian' },
    { name: 'Vegan', value: 'vegan' },
    { name: 'Vegetarian', value: 'vegetarian' },
  ];

  const handleItemClick = (newValue) => {
    onChange(newValue === value ? '' : newValue);
  };

  return (
    <div className="question-wrapper">
      <div className="label-description">
        <label className="primary-text" htmlFor="QuestionOne">Which one is your diet?</label>
        <p className="secondary-text">*optional</p>
      </div>
      <div className="items-wrapper">
        {list.map(item => (
          <BulletItem text={item.name} value={item.value} onClick={handleItemClick} isActive={item.value === value} key={item.value} />
        ))}
      </div>
    </div>
  );
}

export default QuestionTwo;