const classes = require('./classes');
const defaultColors = require('./colors');
const style = require('./style');
const icons = require('./icons');

const createElement = (tag, className='') =>
  Object.assign(document.createElement(tag), {
    className: className,
  });

const styleElement = (colors, textStyle) =>
  Object.assign(
    document.createElement('style'), {
      innerHTML: style(colors, textStyle)
    });

const imageElement = (image, className='') =>
  Object.assign(new Image(), {
    className: className,
    draggable: false,
    src: `data:image/png;base64,${Buffer.from(image).toString('base64')}`,
  });

const createAnchorElements = (colors) => ({
  anchor: createElement('div', classes.anchor),
  anchorCheckbox: createElement('div', classes.anchorCheckbox),
  anchorText: createElement('div', classes.anchorText),
  style: styleElement(colors),
});

const bindAnchorEvents = (elements, options) => {
  elements.anchor.onclick = () => loadCaptcha(elements, options);
};

const prepareAnchorElements = (elements, anchorText) => {
  elements.anchor.append(elements.anchorCheckbox);
  elements.anchor.append(elements.anchorText);
  elements.anchor.append(elements.style);
  elements.anchorText.innerHTML = anchorText;
};

const createAnchor = (options) => {
  const elements = createAnchorElements(options.colors, options.text.style);
  prepareAnchorElements(elements, options.text.anchor);
  bindAnchorEvents(elements, options);
  return elements.anchor;
};

const assignContainerElements = (elements) => 

const assignPuzzleElements = (elements, backgroundImage, sliderImage) => 
  Object.assign(elements, {
    container: createElement('div', `${classes.container} ${classes.challenge}`),
    background: imageElement(backgroundImage, `${classes.noSelect} ${classes.challenge}`),
    slider: imageElement(sliderImage, `${classes.slider} ${classes.noSelect} ${classes.challenge}`)
    controlContainer: createElement('div', `${classes.controlContainer} ${classes.challenge}`),
    controlTrack: createElement('div', `${classes.controlTrack} ${classes.challenge}`),
    controlMask: createElement('div', `${classes.controlMask} ${classes.challenge}`),
    control: createElement('div', `${classes.control} ${classes.challenge}`),
    controlText: createElement('div', `${classes.controlText} ${classes.challenge}`),
    controlLabel: createElement('span', `${classes.noSelect} ${classes.challenge}`), 
    refresh: createElement('div', `${classes.refresh} ${classes.noSelect} ${classes.challenge}`),
  });

const removePuzzle = (elements) => {
  elements.anchor.removeChild(elements.container);
  return elements;
};

const prepareCaptcha = (elements, options) => {
  elements.container.append(elements.background);
  elements.container.append(elements.slider);
  elements.container.append(elements.refresh);
  elements.controlContainer.append(elements.controlTrack);
  elements.controlContainer.append(elements.controlMask);
  elements.controlContainer.append(elements.controlText);
  elements.controlContainer.append(elements.control);
  elements.controlText.append(elements.controlLabel);
  elements.container.append(elements.controlContainer);

  elements.control.innerHTML = arrowIcon;
  elements.refresh.innerHTML = refreshIcon;
  elements.controlLabel.innerHTML = translated('slide', options.lang);
  
  elements.anchor.append(elements.container);

  const toggleCaptchaDisplay = (e) => {
    if (e.target.className.includes('scaptcha-window')) { return; }
    elements.container.style.display =
      (elements.container.style.display === 'none')
        ? 'block'
        : 'none';
  };

  document.onclick = toggleCaptchaDisplay;

  elements.refresh.onclick = () => {
    refreshCaptcha(elements, options);
  };

  elements.background.onload = () => {
    const width = elements.background.width;
    const height = elements.background.height;
    elements.controlTrack.style.width = width + 'px';
    elements.controlText.style.width = width + 'px';
    elements.container.style.transform = `translate(0, -${height + 50}px)`;
    bindEvents(elements, options, width);
  };
  
  return elements;
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
  elements.control.style.backgroundColor = colors.success.control;
  elements.controlMask.style.backgroundColor = colors.success.track;
  elements.control.innerHTML = successIcon;
}

const fail = (elements, options) => {
  elements.control.style.backgroundColor = colors.failure.control;
  elements.controlMask.style.backgroundColor = colors.failure.track;
  elements.control.innerHTML = failureIcon;
  refreshCaptcha(elements, options);
}

const refreshCaptcha = (elements) =>
  loadCaptcha(removePuzzle(elements), options);

// bindEvents based on code by ArgoZhang, https://github.com/ArgoZhang/SliderCaptcha
const bindEvents = (elements, options, width) => {
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
    elements.control.style.backgroundColor = colors.active.control;
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

const fetchCaptcha = (options) =>
  (options.create instanceof Function)
    ? options.create() // Use provided promise for getting background and slider
    : fetch(options.create) // Use create as URL for fetch
      .then(response => response.json());

const loadCaptcha = (elements, options) =>
  fetchCaptcha(options)
    .then(data =>
      prepareCaptcha(
        assignPuzzleElements(elements, data.background, data.slider),
        options,
      ));

const display = (options) =>
    createAnchor(Object.assign({
      create: 'captcha/create',
      verify: 'captcha/verify',
      colors: colors,
      text: {
        challenge: 'Slide to finish the puzzle',
        anchor: 'Click to verify you are not a robot',
        style: {
          fontSize: '13px',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: '400',
        },
      },
      puzzle: {
        width: 250,
        height: 150,
      },
    }));

module.exports = display;
