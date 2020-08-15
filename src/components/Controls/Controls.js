import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import './Controls.css';
import egg from '../../assets/egg.svg';
import crackedEgg from '../../assets/cracked-egg.svg';

Controls.propTypes = {
  prevButton: PropTypes.exact({
    isVisible: PropTypes.bool,
    onPress: PropTypes.func,
    icon: PropTypes.elementType,
  }),
  nextButton: PropTypes.exact({
    isVisible: PropTypes.bool,
    onPress: PropTypes.func,
    icon: PropTypes.elementType,
  }),
  activeIndex: PropTypes.number.isRequired,
  totalIndex: PropTypes.number.isRequired,
};

function Controls(props) {
  const { prevButton, nextButton, activeIndex, totalIndex } = props;
  return (
    <>
      {prevButton.isVisible && (
        <div className="prev-button centered-horizontally">
          <div className="rotate180">
            <Button onClick={prevButton.onPress} icon={prevButton.icon} />
          </div>
        </div>
      )}
      {nextButton.isVisible && (
        <div className="next-button centered-horizontally">
          <Button onClick={nextButton.onPress} icon={nextButton.icon} />
        </div>
      )}
      {activeIndex !== 0 && (
        <div className="progress centered-vertically">
          {Array(totalIndex - 2).fill(null).map((_,idx) => (
            <img
              src={idx < activeIndex ? crackedEgg : egg}
              height="20"
              width="20"
              alt="progress point"
              style={{ marginTop: idx !== 0 ? '10px' : '0' }}
              key={idx}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Controls;