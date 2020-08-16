import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import RecipeCard from '../RecipeCard/RecipeCard';
import InputText from '../InputText/InputText';
import Button from '../Button/Button';

import './RecipeList.css';
import sortIcon from '../../assets/sort.svg';
import vegan from '../../assets/vegan.svg';
import vegetarian from '../../assets/vegetarian.svg';
import glutenFree from '../../assets/gluten-free.svg';
import dairyFree from '../../assets/dairy-free.svg';
import calory from '../../assets/calory.svg';
import servingTime from '../../assets/serving-time.svg';
import empty from '../../assets/empty.svg';

import COLOR from '../../constants/color';

RecipeList.propTypes = {
  data: PropTypes.array,
  onUpdateSetting: PropTypes.func,
};

const defaultFilter = {
  vegan: false,
  vegetarian: false,
  glutenFree: false,
  dairyFree: false,
};

function RecipeList(props) {
  const { data, onUpdateSetting } = props;
  const history = useHistory();
  
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(defaultFilter);
  const [sort, setSort] = useState('');

  const settings = [
    {
      key: 'calory',
      type: 'sort',
      icon: sortIcon,
      badgeIcon: calory,
      onClick: function() {
        const newSort = sort === 'calory' ? '' : 'calory';
        onUpdateSetting(query, filter, newSort);
        setSort(newSort);
      },
    },
    {
      key: 'readyInMinutes',
      type: 'sort',
      icon: sortIcon,
      badgeIcon: servingTime,
      onClick: function() {
        const newSort = sort === 'readyInMinutes' ? '' : 'readyInMinutes';
        onUpdateSetting(query, filter, newSort);
        setSort(newSort);
      },
    },
    {
      key: 'vegan',
      type: 'filter',
      icon: vegan,
      onClick: function() {
        const newFilter = { ...filter, vegan: !filter.vegan };
        onUpdateSetting(query, newFilter, sort);
        setFilter(newFilter);
      },
    },
    {
      key: 'vegetarian',
      type: 'filter',
      icon: vegetarian,
      onClick: function() {
        const newFilter = { ...filter, vegetarian: !filter.vegetarian };
        onUpdateSetting(query, newFilter, sort);
        setFilter(newFilter);
      },
    },
    {
      key: 'glutenFree',
      type: 'filter',
      icon: glutenFree,
      onClick: function() {
        const newFilter = { ...filter, glutenFree: !filter.glutenFree };
        onUpdateSetting(query, newFilter, sort);
        setFilter(newFilter);
      },
    },
    {
      key: 'dairyFree',
      type: 'filter',
      icon: dairyFree,
      onClick: function() {
        const newFilter = { ...filter, dairyFree: !filter.dairyFree };
        onUpdateSetting(query, newFilter, sort);
        setFilter(newFilter);
      },
    },
  ];
  
  const handleQueryChange = (e) => {
    const val = e.target.value; 
    setQuery(val);
    onUpdateSetting(val, filter, sort);
  };

  const handleClickCard = (id) => {
    history.push(`/recipe/${id}`);
  };

  return (
    <div className="recipe-list-wrapper">
      <div className="recipe-list-header">
        <h2 className="primary-text recipe-list-title">{data.length === 0 ? 'We\'re sorry...' : 'Recipes are ready!'}</h2>
        <div className="recipe-list-setting">
          <InputText
            value={query}
            onChange={handleQueryChange}
            style={{
              borderBottomWidth: '3px',
              borderBottomStyle: 'solid',
              fontSize: '16px',
              width: '240px',
              marginRight: '16px',
            }}
            placeholder="Filter by meal’s name…"
            ink="dark"
          />
          <div className="setting-buttons">
            {settings.map((item, idx) => {
              const isActive = (item.type === 'sort' && item.key === sort) || (item.type === 'filter' && filter[item.key]);
              return (
                <div style={{ marginLeft: idx === 0 ? '0' : '8px' }} key={idx}>
                  <Button onClick={item.onClick} icon={item.icon} backgroundColor={isActive ? COLOR.RED : COLOR.DARK} badgeIcon={item.badgeIcon} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="empty-list-wrapper">
          <img src={empty} alt="empty icon" width="120" height="120"/>
          <p className="secondary-text">We couldn't find the recipe :(</p>
        </div>
      ) : (
        <div className="card-list-wrapper">
          {data.map(item => (
            <div key={item.id}>
              <RecipeCard
                item={item}
                onClick={() => handleClickCard(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;