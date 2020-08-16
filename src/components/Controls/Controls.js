import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';

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
  let tooltipText;
  if (activeIndex === 0) {
    tooltipText = 'Let\'s Start!';
  } else if (activeIndex === totalIndex - 2) {
    tooltipText = 'Get recipes now!';
  } else {
    tooltipText = 'Next';
  }
  return (
    <>
      {prevButton.isVisible && (
        <div className="prev-button centered-horizontally">
          <Tooltip content={<p className="secondary-text">Prev</p>} placement="bottom">
            <div className="rotate180">
              <Button onClick={prevButton.onPress} icon={prevButton.icon} />
            </div>
          </Tooltip>
        </div>
      )}
      {nextButton.isVisible && (
        <div className="next-button centered-horizontally">
          <Tooltip content={<p className="secondary-text">{tooltipText}</p>} isVisible={activeIndex === 0} contentWidth={150}>
            <Button onClick={nextButton.onPress} icon={nextButton.icon} />
          </Tooltip>
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