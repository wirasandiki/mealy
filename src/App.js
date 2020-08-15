import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import Controls from './components/Controls/Controls';
import MainLogo from './components/MainLogo/MainLogo';
import { QuestionOne, QuestionTwo } from './components/Questions';
import RecipeList from './components/RecipeList/RecipeList';

import './App.css';
import logo from './assets/logo.svg';
import logoAlt from './assets/logo-alt.svg';
import chevronPrimary from './assets/chevron-primary.svg';
import chevronYellow from './assets/chevron-yellow.svg';
import chevronGreen from './assets/chevron-green.svg';

import COLOR from './constants/color';
import { HEADERS, HOST } from './constants/api';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('');
  const translateY = useRef(0);
  const overflow = useRef('hidden');
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
  ];

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
  }, [activeIndex, slides]);

  const handlePressNext = () => {
    translateY.current -= 100;
    setActiveIndex(activeIndex + 1);
  };
  const handlePressPrev = () => {
    translateY.current += 100;
    setActiveIndex(activeIndex - 1);
  };
  const handleSubmit = () => {
    // axios({
    //   method: 'GET',
    //   url: `${HOST}/recipes/search`,
    //   headers: HEADERS,
    //   'params':{
    //     number: 10,
    //     offset: 0,
    //     instructionsRequired: true,
    //     query,
    //     diet,
    //   }
    // })
    // .then((response)=>{
    //   console.log(response)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // });
    console.log(query, diet);
  };

  const { buttonIcon } = slides[activeIndex];
  const logoIcon = slides[activeIndex].backgroundColor === COLOR.GREEN ? logoAlt : logo;

  return (
    <div className="app" style={{ overflow: overflow.current, height: height.current }}>
      <Header icon={logoIcon} isVisible={activeIndex > 0} />
      <Controls
        prevButton={{
          isVisible: activeIndex > 0,
          onPress: handlePressPrev,
          icon: buttonIcon,
        }}
        nextButton={{
          isVisible: activeIndex === 0 || query.length > 0,
          onPress: activeIndex === slides.length - 1 ? handleSubmit : handlePressNext,
          icon: buttonIcon,
        }}
        totalIndex={slides.length}
        activeIndex={activeIndex}
      />
      <div className="slide-wrapper" style={{ transform: `translateY(${translateY.current}vh)`, zIndex: 101 }}>
        {slides.map(slide => (
          <div className="banner-container" style={{ backgroundColor: slide.backgroundColor }} key={slide.name}>
            {slide.content}
          </div>
        ))}
      </div>
      <RecipeList />
    </div>
  );
}

export default App;