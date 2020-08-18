import React, { useState, useEffect } from 'react';
import LoadingIcon from './icons/loading';

const imageDataUrl = (image) =>
  `data:image/png;base64,${Buffer.from(image).toString('base64')}`;

const Challenge = ({ text, captcha, verifyCaptcha }) => {
  return (
    <div className="scaptcha-card-element">
      <div
        className="scaptcha-card-background scaptcha-card-element"
        style={{ backgroundImage: `url('${imageDataUrl(captcha.background)}')` }}
      />
      <img
        className="scaptcha-card-slider-puzzle scaptcha-card-element"
        src={imageDataUrl(captcha.slider)}
      />
      <div className="scaptcha-card-slider-container scaptcha-card-element">
        <div className="scaptcha-card-slider-track scaptcha-card-element" />
        <div className="scaptcha-card-slider-label scaptcha-card-element">
          <span>{text.challenge}</span>
        </div>
        <div className="scaptcha-card-slider-mask scaptcha-card-element" />
        <div className="scaptcha-card-slider-control scaptcha-card-element" />
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
