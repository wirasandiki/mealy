import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './components/Header/Header';
import Controls from './components/Controls/Controls';
import MainLogo from './components/MainLogo/MainLogo';
import { QuestionOne, QuestionTwo } from './components/Questions';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

import './App.css';
import logo from './assets/logo.svg';
import logoAlt from './assets/logo-alt.svg';
import chevronPrimary from './assets/chevron-primary.svg';
import chevronYellow from './assets/chevron-yellow.svg';
import chevronGreen from './assets/chevron-green.svg';
import crackedEgg from './assets/cracked-egg.svg';

import COLOR from './constants/color';
import { HEADERS_GET, HOST } from './constants/api';

function App() {
  // Slide states
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSlides, setShowSlides] = useState(true);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState('transparent');

  // Query & result states
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);

  const translateY = useRef(0);
  const translateYWrapper = useRef(0);
  const [overflow, setOverflow] = useState('hidden');
  const height = useRef('100vh');
  const questionOneInputRef = useRef(null);

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleChangeDiet = (newValue) => {
    setDiet(newValue);
  };

  const slides = [
    {
      name: 'mainLogo',
      buttonIcon: chevronPrimary,
      backgroundColor: COLOR.RED,
      content: <MainLogo />,
    },
    {
      name: 'questionOne',
      buttonIcon: chevronYellow,
      backgroundColor: COLOR.YELLOW,
      ref: questionOneInputRef,
      content: <QuestionOne value={query} onChange={handleChangeQuery} inputRef={questionOneInputRef} />,
    },
    {
      name: 'questionTwo',
      buttonIcon: chevronGreen,
      backgroundColor: COLOR.GREEN,
      content: <QuestionTwo value={diet} onChange={handleChangeDiet} />,
    },
    {
      name: 'loading',
      backgroundColor: COLOR.RED,
      content: (
        <div className="loading-text-wrapper">
          <img src={crackedEgg} alt="loading-icon" width="32" height="32" className="rotating" />
          <p className="primary-text loading-text">Preparing your recipes...</p>
          <img src={crackedEgg} alt="loading-icon" width="32" height="32" className="rotating" />
        </div>
      ),
    },
  ];

  const handlePressNext = () => {
    translateY.current -= 100;
    setActiveIndex(activeIndex + 1);
  };
  const handlePressPrev = () => {
    translateY.current += 100;
    setActiveIndex(activeIndex - 1);
  };
  const showResult = () => {
    setOverflow('auto');
    translateYWrapper.current = -100;
    height.current = 'auto';
    setHeaderBackgroundColor(COLOR.RED);
    setTimeout(() => {
      setShowSlides(false);
    }, 300);
  };
  const handleSubmit = () => {
    axios({
      method: 'GET',
      url: `${HOST}/recipes/search`,
      headers: HEADERS_GET,
      'params':{
        number: 15,
        offset: 0,
        instructionsRequired: true,
        query,
        diet,
      }
    })
    .then((response) => {
      const ids = response.data.results.map(item => item.id);
      if (ids.length > 0) {
        axios({
          method: 'GET',
          url: `${HOST}/recipes/informationBulk`,
          headers: HEADERS_GET,
          'params':{
            ids: ids.join(','),
            includeNutrition: true,
          }
        })
        .then((response) => {
          const preprocessedData = response.data.map(item => ({
            id: item.id,
            title: item.title,
            readyInMinutes: item.readyInMinutes,
            calory: item.nutrition.nutrients[0].amount,
            imageUrl: item.image,
            vegan: item.vegan,
            vegetarian: item.vegetarian,
            glutenFree: item.glutenFree,
            dairyFree: item.dairyFree,
            ingredients: item.extendedIngredients.map(ingredient => ingredient.name),
          }));
          setData(preprocessedData);
          setOriginalData(preprocessedData);
          showResult();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const handleScrollToLoading = () => {
    handlePressNext();
    handleSubmit();
  };
  const handleUpdateSetting = (query, filter, sort) => {
    const newData = originalData
      .filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
      .filter(item => {
        let result = true;
        const keys = Object.keys(filter);
        keys.forEach(key => {
          if (filter[key]) {
            result &= item[key];
          }
        });
        return result;
      });
    newData.sort((a, b) => a[sort] - b[sort]);
    setData(newData);
  };

  useEffect(() => {
    // document.addEventListener('keydown', (event) => {
    //   if (event.keyCode === 32 || event.keyCode === 9 || event.keyCode === 40) {
    //     handlePressNext();
    //   } else if (event.keyCode === 38) {
    //     handlePressPrev();
    //   }
    // });
  }, []);

  useEffect(() => {
    if (slides[activeIndex].ref && slides[activeIndex].ref.current) {
      setTimeout(() => {
        slides[activeIndex].ref.current.focus();
      }, 350);
    }
    translateY.current = -activeIndex * 100;
  }, [activeIndex, slides]);

  const { buttonIcon } = slides[activeIndex];
  const logoIcon = slides[activeIndex].backgroundColor === COLOR.GREEN ? logoAlt : logo;

  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <div className="app" style={{ overflow, height: height.current }}>
            <Header icon={logoIcon} isVisible={activeIndex > 0} backgroundColor={headerBackgroundColor} />
            {showSlides && (
              <div className="slide-container" style={{ overflow, height: height.current, transform: `translateY(${translateYWrapper.current}vh)`, zIndex: 1 }}>
                {activeIndex !== slides.length - 1 && (
                  <Controls
                    prevButton={{
                      isVisible: activeIndex > 0,
                      onPress: handlePressPrev,
                      icon: buttonIcon,
                    }}
                    nextButton={{
                      isVisible: activeIndex === 0 || query.length > 0,
                      onPress: activeIndex === slides.length - 2 ? handleScrollToLoading : handlePressNext,
                      icon: buttonIcon,
                    }}
                    totalIndex={slides.length}
                    activeIndex={activeIndex}
                  />
                )}
                <div className="slide-content-wrapper" style={{ transform: `translateY(${translateY.current}vh)`}}>
                  {slides.map(slide => (
                    <div className="banner-container" style={{ backgroundColor: slide.backgroundColor }} key={slide.name}>
                      {slide.content}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="page-content-wrapper">
              <div className="page-content">
                <RecipeList data={data} onUpdateSetting={handleUpdateSetting} />
              </div>
            </div>
          </div>
        </Route>
        <Route path="/recipe/:id">
          <Header icon={logoIcon} isVisible={true} backgroundColor={COLOR.RED} />
          <div className="page-content-wrapper">
            <div className="page-content">
              <RecipeDetails />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;