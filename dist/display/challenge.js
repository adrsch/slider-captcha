"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChallenge = void 0;

var _classes = require("./classes");

var _icons = require("./icons");

var _elements = require("./elements");

var assignChallengeElements = function assignChallengeElements(elements, colors, trackText, backgroundImage, sliderImage) {
  return Object.assign(elements, {
    background: (0, _elements.imageElement)(backgroundImage, [_classes.classes.noSelect, _classes.classes.card]),
    slider: (0, _elements.imageElement)(sliderImage, [_classes.classes.slider, _classes.classes.noSelect, _classes.classes.card]),
    controlContainer: (0, _elements.createElement)('div', {
      classes: [_classes.classes.controlContainer, _classes.classes.card]
    }),
    controlMask: (0, _elements.createElement)('div', {
      classes: [_classes.classes.controlMask, _classes.classes.card]
    }),
    controlTrack: (0, _elements.createElement)('div', {
      classes: [_classes.classes.controlTrack, _classes.classes.card]
    }),
    control: (0, _elements.createElement)('div', {
      classes: [_classes.classes.control, _classes.classes.card],
      contents: (0, _icons.arrowIcon)(colors.card.control.icon)
    }),
    controlText: (0, _elements.createElement)('div', {
      classes: [_classes.classes.controlText, _classes.classes.card],
      contents: trackText
    })
  });
};

var setupChallengeHierarchy = function setupChallengeHierarchy(elements) {
  [elements.controlTrack, elements.controlMask, elements.controlText, elements.control].forEach(function (el) {
    return elements.controlContainer.append(el);
  });
  [elements.background, elements.slider, elements.controlContainer].forEach(function (el) {
    return elements.container.append(el);
  });
};

var verifyCaptcha = function verifyCaptcha(response, trail, options) {
  return new Promise(function (resolve, reject) {
    return options.verify instanceof Function ? options.verify(response, trail) // Use provided promise for verifying captcha
    .then(function (success) {
      return resolve(success.data || success);
    }) : fetch(verify, {
      // Verification URL provided instead
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        response: response,
        trail: trail
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      return resolve(data.success);
    });
  });
};

var succeed = function succeed(elements, options) {
  elements.control.style.backgroundColor = options.colors.card.control.success;
  elements.controlMask.style.backgroundColor = options.colors.card.track.success;
  elements.control.innerHTML = (0, _icons.successIcon)(options.colors.card.control.icon);
  setTimeout(function () {
    elements.anchorCheckbox.innerHTML = (0, _icons.successIcon)(options.colors.card.control.icon);
    elements.anchorCheckbox.style = 'cursor: default;';
    elements.anchorText.style = 'line-height: 22px;';
    elements.container.style.display = 'none';
    elements.anchor.classList.remove(_classes.classes.anchor);
    elements.anchorText.classList.remove(_classes.classes.anchor);
    elements.anchorCheckbox.classList.remove(_classes.classes.anchor);
  }, 500);
};

var fail = function fail(elements, options) {
  elements.control.style.backgroundColor = options.colors.card.control.failure;
  elements.controlMask.style.backgroundColor = options.colors.card.track.failure;
  elements.control.innerHTML = (0, _icons.failureIcon)(options.colors.card.control.icon);
  refreshChallenge(elements, options);
};

var bindChallengeEvents = function bindChallengeEvents(elements, options) {
  return elements.background.addEventListener('load', function () {
    // Set the width using actual width rather than width specified in options, in case of missmatch
    var width = elements.background.width;
    var height = elements.background.height;
    elements.controlTrack.style.width = width + 'px';
    elements.controlText.style.width = width + 'px';
    elements.loading.style.display = 'none';
    bindSolveEvents(elements, options, width);
  });
}; // Based on code by ArgoZhang, https://github.com/ArgoZhang/SliderCaptcha


var bindSolveEvents = function bindSolveEvents(elements, options, width) {
  var origin = {
    x: 0,
    y: 0
  };
  var trail = {
    x: [],
    y: []
  };

  var handleStart = function handleStart(e) {
    origin.x = e.clientX || e.touches && e.touches[0].clientX;
    origin.y = e.clientY || e.touches && e.touches[0].clientY;
    elements.control.style.backgroundColor = options.colors.card.control.active;
    elements.controlText.style.opacity = 0;
    addListeners();
  };

  var handleMove = function handleMove(e) {
    var move = {
      x: (e.clientX || e.touches && e.touches[0].clientX) - origin.x,
      y: (e.clientY || e.touches && e.touches[0].clientY) - origin.y
    };
    if (move.x < 0 || move.x + 40 > width) return false;
    elements.slider.style.left = (width - 40 - 20) / (width - 40) * move.x + 'px';
    elements.control.style.left = move.x - 1 + 'px';
    elements.controlMask.style.width = move.x + 30 + 'px';
    trail.x.push(Math.round(move.x));
    trail.y.push(Math.round(move.y));
  };

  var handleEnd = function handleEnd(e) {
    var x = e.clientX || e.touches && e.changedTouches[0].clientX;
    if (x === origin.x) return false;
    removeListeners();
    verifyCaptcha(parseInt(elements.slider.style.left), trail, options).then(function (success) {
      return success ? succeed(elements, options) : fail(elements, options);
    });
  };

  var preventDefault = function preventDefault(e) {
    return e.preventDefault();
  };

  var addListeners = function addListeners() {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('selectstart', preventDefault);
  };

  var removeListeners = function removeListeners() {
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

var clearChallenge = function clearChallenge(elements) {
  return [elements.background, elements.slider, elements.controlContainer].forEach(function (el) {
    return elements.container.removeChild(el);
  });
};

var displayChallenge = function displayChallenge(elements, options) {
  setupChallengeHierarchy(elements);
  bindChallengeEvents(elements, options);
};

var fetchCaptcha = function fetchCaptcha(options) {
  return options.create instanceof Function ? options.create() // Use provided promise for getting background and slider
  : fetch(options.create) // Use create as URL for fetch
  .then(function (response) {
    return response.json();
  });
};

var refreshChallenge = function refreshChallenge(elements, options) {
  return fetchCaptcha(options).then(function (data) {
    clearChallenge(elements);
    displayChallenge(assignChallengeElements(elements, options.colors, options.text.challenge, data.background, data.slider), options);
  });
};

var createChallenge = function createChallenge(elements, options) {
  return fetchCaptcha(options).then(function (data) {
    return displayChallenge(assignChallengeElements(elements, options.colors, options.text.challenge, data.background, data.slider), options);
  });
};

exports.createChallenge = createChallenge;