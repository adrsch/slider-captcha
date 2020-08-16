import { classes } from './classes';
import { arrowIcon, refreshIcon, successIcon, failureIcon } from './icons';
import { createElement, imageElement } from './elements';

const assignChallengeElements = (elements, colors, trackText, backgroundImage, sliderImage) => 
  Object.assign(elements, {
    background: imageElement(backgroundImage, [ classes.noSelect, classes.card ]),
    slider: imageElement(sliderImage, [ classes.slider, classes.noSelect, classes.card ]),
    controlContainer: createElement('div', {
      classes: [ classes.controlContainer, classes.card ],
    }),
    controlMask: createElement('div', {
      classes: [ classes.controlMask, classes.card ],
    }),
    controlTrack: createElement('div', {
      classes: [ classes.controlTrack, classes.card ],
    }),
    control: createElement('div', {
      classes: [ classes.control, classes.card ],
      contents: arrowIcon(colors),
    }),
    controlText: createElement('div', {
      classes: [ classes.controlText, classes.card ],
      contents: trackText,
    }),
    refresh: createElement('div', {
      classes: [ classes.refresh, classes.noSelect, classes.card ],
      contents: refreshIcon(colors),
    }),
  });

const setupChallengeHierarchy = (elements) => {
  [ elements.controlTrack, elements.controlMask, elements.controlText, elements.control ]
    .forEach(el => elements.controlContainer.append(el));
  [ elements.background, elements.slider, elements.controlContainer, elements.refresh ]
    .forEach(el => elements.container.append(el));
};

const verifyCaptcha = (response, trail, options) =>
  new Promise((resolve, reject) =>
    (options.verify instanceof Function)
      ? options.verify(response, trail) // Use provided promise for verifying captcha
        .then(success => resolve(success.data || success))
      : fetch(verify, { // Verification URL provided instead
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response: response,
          trail: trail,
        }),
      })
    .then(response => response.json())
    .then(data => resolve(data.success)));

const succeed = (elements, options) => {
  elements.control.style.backgroundColor = options.colors.card.control.success;
  elements.controlMask.style.backgroundColor = options.colors.card.track.success;
  elements.control.innerHTML = successIcon(options.colors);
};

const fail = (elements, options) => {
  elements.control.style.backgroundColor = options.colors.card.control.failure;
  elements.controlMask.style.backgroundColor = options.colors.card.track.failure;
  elements.control.innerHTML = failureIcon(options.colors);
  refreshChallenge(elements, options);
};

const bindChallengeEvents = (elements, options) => {
  elements.refresh.addEventListener('click', () => {
    elements.loading.style.display = 'flex';
    refreshChallenge(elements, options);
  });
  elements.background.addEventListener('load', () => {
    // Set the width using actual width rather than width specified in options, in case of missmatch
    const width = elements.background.width;
    const height = elements.background.height;
    elements.controlTrack.style.width = width + 'px';
    elements.controlText.style.width = width + 'px';
    elements.loading.style.display = 'none';
    bindSolveEvents(elements, options, width);
  });
};

// Based on code by ArgoZhang, https://github.com/ArgoZhang/SliderCaptcha
const bindSolveEvents = (elements, options, width) => {
  const origin = {
    x: 0,
    y: 0,
  };
  const trail = {
    x: [],
    y: [],
  };

  const handleStart = (e) => {
    origin.x = e.clientX || e.touches && e.touches[0].clientX;
    origin.y = e.clientY || e.touches && e.touches[0].clientY;

    elements.control.style.backgroundColor = options.colors.card.control.active;
    elements.controlText.style.opacity = 0;
    addListeners();
  };

  const handleMove = (e) => {
    const move = {
      x: (e.clientX || e.touches && e.touches[0].clientX) - origin.x,
      y: (e.clientY || e.touches && e.touches[0].clientY) - origin.y,
    };
    if (move.x < 0 || move.x + 40 > width) return false;
    elements.slider.style.left = ((width - 40 - 20) / (width - 40) * move.x) + 'px';
    elements.control.style.left = (move.x - 1) + 'px';
    elements.controlMask.style.width = (move.x + 30) + 'px';
    trail.x.push(Math.round(move.x));
    trail.y.push(Math.round(move.y));
  };

  const handleEnd = (e) => {
    const x = e.clientX || e.touches && e.changedTouches[0].clientX;
    if (x === origin.x) return false;
    removeListeners();
    verifyCaptcha(parseInt(elements.slider.style.left), trail, options)
      .then(success => (success) ? succeed(elements, options) : fail(elements, options));
  };

  const preventDefault = (e) => e.preventDefault();

  const addListeners = () => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('selectstart', preventDefault);
  }
  const removeListeners = () => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchend', handleEnd);
    document.removeEventListener('selectstart', preventDefault);
    elements.control.removeEventListener('mousedown', handleStart);
    elements.control.removeEventListener('touchstart', handleStart);
  }

  elements.control.addEventListener('mousedown', handleStart);
  elements.control.addEventListener('touchstart', handleStart);
};

const clearChallenge = (elements) =>
  [ elements.background, elements.slider, elements.controlContainer, elements.refresh ]
    .forEach(el => elements.container.removeChild(el));

const displayChallenge = (elements, options) => {
  setupChallengeHierarchy(elements);
  bindChallengeEvents(elements, options);
};

const fetchCaptcha = (options) =>
  (options.create instanceof Function)
    ? options.create() // Use provided promise for getting background and slider
    : fetch(options.create) // Use create as URL for fetch
      .then(response => response.json());

const refreshChallenge = (elements, options) =>
  fetchCaptcha(options)
    .then(data => {
      clearChallenge(elements);
      displayChallenge(
        assignChallengeElements(
          elements,
          options.colors,
          options.text.challenge,
          data.background,
          data.slider,
        ), options);
    });

const createChallenge = (elements, options) =>
  fetchCaptcha(options)
    .then(data =>
      displayChallenge(
        assignChallengeElements(
          elements,
          options.colors,
          options.text.challenge,
          data.background,
          data.slider
        ), options));

export { createChallenge };
