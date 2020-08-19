import React, { useState, useEffect } from 'react';
import LoadingIcon from './icons/loading';

const imageDataUrl = (image) =>
  `data:image/png;base64,${Buffer.from(image).toString('base64')}`;

const Challenge = ({ text, captcha, onComplete }) => {
  const [solving, setSolving] = useState(false);
  const [result, setResult] = useState(undefined);
  const [origin, setOrigin] = useState({
    x: 0,
    y: 0,
  });
  const [trail, setTrail] = useState({
    x: [ 0 ],
    y: [ 0 ],
  });
  
  // Allows slider control to go to the end of the track without the puzzle piece falling off
  const scaleSliderPosition = (x) => 0.9 * x; 

  const handleStart = (e) => {
    setOrigin({
      x: e.clientX,
      y: e.clientY,
    });
    setSolving(true);
  };

  const handleMove = (e) => {
    if (!solving) return;
    const move = {
      x: e.clientX - origin.x,
      y: e.clientY - origin.y,
    }
    if (move.x > 225 || move.x < 0) return;
    setTrail({
      x: trail.x.concat([ move.x ]),
      y: trail.y.concat([ move.y ]),
    });
  };


  const handleEnd = (e) => {
    if (!solving) return;
    setSolving(false);
    onComplete(
      scaleSliderPosition(trail.x[trail.x.length - 1]),
      trail,
    );
  };

  return (
    <div className="scaptcha-card-element"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseUp={handleEnd}
    >
      <div
        className="scaptcha-card-background scaptcha-card-element"
        style={{ backgroundImage: `url('${imageDataUrl(captcha.background)}')` }}
      />
      <div
        className="scaptcha-card-slider-puzzle scaptcha-card-element"
        style={{
          backgroundImage: `url('${imageDataUrl(captcha.slider)}')`,
          left: `${scaleSliderPosition(trail.x[trail.x.length - 1])}px`,
        }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      />
      <div className="scaptcha-card-slider-container scaptcha-card-element">
        <div className="scaptcha-card-slider-track scaptcha-card-element" />
        <div
          className="scaptcha-card-slider-label scaptcha-card-element"
          style={{ opacity: (solving) ? 0 : 1 }}
        >
          <span>{text.challenge}</span>
        </div>
        <div
          className="scaptcha-card-slider-mask scaptcha-card-element"
          style={{ width: `${trail.x[trail.x.length - 1] + 30}px` }}
        />
        <div className="scaptcha-card-slider-container scaptcha-card-element" />
        <div 
          className="scaptcha-card-slider-control scaptcha-card-element"
          style={{ left: `${trail.x[trail.x.length - 1]}px` }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        />
      </div>
    </div>
  );
};

//const Challenge = ({ captcha, create, verify, callback


// Based on code by ArgoZhang, https://github.com/ArgoZhang/SliderCaptcha
const solveCaptcha = () => {
  const origin = {
    x: 0,
    y: 0,
  };
  const trail = {
    x: [],
    y: [],
  };

  const handleStart = (e) => {
    origin.x = e.clientX || (e.touches && e.touches[0].clientX);
    origin.y = e.clientY || (e.touches && e.touches[0].clientY);

    elements.control.style.backgroundColor = options.colors.card.control.active;
    elements.controlText.style.opacity = 0;
    addListeners();
  };

  const handleMove = (e) => {
    const move = {
      x: (e.clientX || (e.touches && e.touches[0].clientX)) - origin.x,
      y: (e.clientY || (e.touches && e.touches[0].clientY)) - origin.y,
    };
    if (move.x < 0 || move.x + 40 > width) return false;
    elements.slider.style.left =
      ((width - 40 - 20) / (width - 40)) * move.x + 'px';
    elements.control.style.left = move.x - 1 + 'px';
    elements.controlMask.style.width = move.x + 30 + 'px';
    trail.x.push(Math.round(move.x));
    trail.y.push(Math.round(move.y));
  };

  const handleEnd = (e) => {
    const x = e.clientX || (e.touches && e.changedTouches[0].clientX);
    if (x === origin.x) return false;
    removeListeners();
    verifyCaptcha(
      parseInt(elements.slider.style.left),
      trail,
      options
    ).then((success) =>
      success ? succeed(elements, options) : fail(elements, options)
    );
  };

  const preventDefault = (e) => e.preventDefault();

  const addListeners = () => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('selectstart', preventDefault);
  };
  const removeListeners = () => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchend', handleEnd);
    document.removeEventListener('selectstart', preventDefault);
    elements.control.removeEventListener('mousedown', handleStart);
    elements.control.removeEventListener('touchstart', handleStart);
  };

  elements.control.addEventListener('mousedown', handleStart);
  elements.control.addEventListener('touchstart', handleStart);
};



export default Challenge;
