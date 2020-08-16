import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import qs from 'querystring';
import Button from '../Button/Button';
import Tooltip from '../Tooltip/Tooltip';

import { HEADERS_GET, HEADERS_POST, HOST } from '../../constants/api';

import './RecipeDetails.css';
import search from '../../assets/search.svg';
import COLOR from '../../constants/color';

function RecipeDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const analyzeInstruction = (instructions, idx) => {
      const payload = { instructions };
      const config = { headers: HEADERS_POST };
      axios.post(`${HOST}/recipes/analyzeInstructions`, qs.stringify(payload), config)
      .then((response) => {
        const newData = Object.assign({}, data);
        newData.analyzedInstructions[0].steps[idx].tooltip = response.data;
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const generateTooltipContent = obj => {
    const ingredients = obj.ingredients.map(item => (
      <li key={item.id}>{item.name}</li>
    ));
    const equipments = obj.equipment.map(item => (
      <li key={item.id}>{item.name}</li>
    ));
    return (
      <>
        {obj.ingredients.length > 0 && (
          <div style={{ marginBottom: '5px' }}>
            <p><b>Ingredients:</b></p>
            <ul>{ingredients}</ul>
          </div>
        )}
        {obj.equipment.length > 0 && (
          <div>
            <p><b>Equipments:</b></p>
            <ul>{equipments}</ul>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${HOST}/recipes/${id}/information`,
      headers: HEADERS_GET,
    })
    .then((response) => {
      setData(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [id]);

  const ingredients = data && data.extendedIngredients && data.extendedIngredients.map((item, idx) => (
    <li key={idx} className="secondary-text">{item.originalString}</li>
  ));

  const instructions = data && data.analyzedInstructions && data.analyzedInstructions[0].steps.map((item, idx) => (
    <li key={idx} className="secondary-text">
      {item.step}
      <Tooltip
        content={
          <div className="instruction-tooltip-wrapper secondary-text">
            {item.tooltip ? generateTooltipContent(item.tooltip) : <p className="secondary-text">Analyzing...</p>} 
          </div>
        }
        style={{ display: 'inline-block', marginLeft: '5px' }}
        onHover={() => !item.tooltip && analyzeInstruction(item.step, idx)}
      >
        <Button
          icon={search}
          onClick={() => {}}
          backgroundColor={COLOR.DARK}
          buttonSize={24}
          iconSize={12}
        />
      </Tooltip>
    </li>
  ));

  return (
    <div className="recipe-detail-wrapper">
      {isLoading ? <p className="primary-text recipe-detail-loading">Preparing your recipe...</p> : (
        <div className="recipe-detail-card">
          <div className="recipe-detail-header">
            <img className="recipe-detail-image" src={data.image} alt={data.title} width="100%" height="100%" />
            <div className="recipe-detail-image-overlay" />
            <h3 className="primary-text recipe-detail-card-title">{data.title}</h3>
          </div>
          <div className="recipe-detail-card-content">
            <div className="recipe-detail-section">
              <h3 className="primary-text recipe-detail-subtitle">Ingredients</h3>
              <ul>{ingredients}</ul>
            </div>
            <div className="recipe-detail-section">
              <h3 className="primary-text recipe-detail-subtitle">Instructions</h3>
              <ul>{instructions}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;