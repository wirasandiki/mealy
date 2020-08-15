import React from 'react';
import PropTypes from 'prop-types';
import Pill from '../Pill/Pill';

import './RecipeCard.css';
import caloryIcon from '../../assets/calory.svg';
import servingTime from '../../assets/serving-time.svg';
import veganIcon from '../../assets/vegan.svg';
import vegetarianIcon from '../../assets/vegetarian.svg';
import glutenFreeIcon from '../../assets/gluten-free-dark.svg';
import dairyFreeIcon from '../../assets/dairy-free-dark.svg';

import COLOR from '../../constants/color'

RecipeCard.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

function RecipeCard(props) {
  const {
    item: {
      title,
      imageUrl,
      summary,
      readyInMinutes,
      calory,
      vegan,
      vegetarian,
      glutenFree,
      dairyFree,
    },
    onClick,
  } = props;
  
  const tags = [
    {
      text: `${calory} cal`,
      icon: caloryIcon,
      isShow: true,
      backgroundColor: COLOR.LIGHT,
      fontColor: COLOR.DARK,
    },
    {
      text: `${readyInMinutes} min`,
      icon: servingTime,
      isShow: true,
      backgroundColor: COLOR.LIGHT,
      fontColor: COLOR.DARK,
    },
    {
      text: 'Vegan',
      icon: veganIcon,
      isShow: vegan,
      backgroundColor: COLOR.GREEN,
      fontColor: COLOR.WHITE,
    },
    {
      text: 'Vegetarian',
      icon: vegetarianIcon,
      isShow: vegetarian,
      backgroundColor: COLOR.GREEN,
      fontColor: COLOR.WHITE,
    },
    {
      text: 'Gluten Free',
      icon: glutenFreeIcon,
      isShow: glutenFree,
      backgroundColor: COLOR.LIGHT_YELLOW,
      fontColor: COLOR.DARK,
    },
    {
      text: 'Dairy Free',
      icon: dairyFreeIcon,
      isShow: dairyFree,
      backgroundColor: COLOR.LIGHT_YELLOW,
      fontColor: COLOR.DARK,
    },
  ];
  return (
    <div className="card-wrapper" onClick={onClick}>
      <div className="top">
        <img src={imageUrl} alt={title} width="100%" height="200" />
        <div className="image-overlay" />
        <h3 className="primary-text card-title">{title}</h3>
      </div>
      <div className="bottom">
        <p className="secondary-text card-summary">{'lorem ipsum'}</p>
        <div className="pills-wrapper">
          {tags.map((item, idx) => item.isShow && (
            <div className="pills-item" style={{ marginRight: idx === tags.length - 1 ? undefined : '10px' }} key={idx}>
              <Pill text={item.text} icon={item.icon} backgroundColor={item.backgroundColor} fontColor={item.fontColor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;