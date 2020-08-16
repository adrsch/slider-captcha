"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnchor = void 0;

var _classes = require("./classes");

var _style = require("./style");

var _icons = require("./icons");

var _elements = require("./elements");

var _challenge = require("./challenge");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createAnchorElements = function createAnchorElements(colors, anchorText, textStyle, puzzleSize) {
  return {
    anchor: (0, _elements.createElement)('div', {
      classes: [_classes.classes.anchorContainer, _classes.classes.anchor]
    }),
    anchorCheckbox: (0, _elements.createElement)('div', {
      classes: [_classes.classes.anchorCheckbox, _classes.classes.anchor]
    }),
    anchorText: (0, _elements.createElement)('div', {
      classes: [_classes.classes.anchorText, _classes.classes.anchor],
      contents: anchorText
    }),
    style: (0, _elements.createElement)('style', {
      contents: (0, _style.style)(colors, textStyle, puzzleSize)
    })
  };
};

var createCardElements = function createCardElements(colors) {
  return {
    container: (0, _elements.createElement)('div', {
      hidden: true,
      classes: [_classes.classes.container, _classes.classes.card]
    }),
    loading: (0, _elements.createElement)('div', {
      contents: (0, _icons.loadingIcon)(colors.card.control.active),
      classes: [_classes.classes.loading, _classes.classes.card]
    })
  };
};

var setupAnchorHierarchy = function setupAnchorHierarchy(elements) {
  return [elements.anchorCheckbox, elements.anchorText, elements.style].forEach(function (el) {
    return elements.anchor.append(el);
  });
};

var setupCardHierarchy = function setupCardHierarchy(elements) {
  elements.container.append(elements.loading);
  elements.anchor.append(elements.container);
};

var clearCard = function clearCard(elements, colors) {
  elements.loading.style.display = 'flex';
  elements.anchor.removeChild(elements.container);
  Object.assign(elements, createCardElements(colors));
  setupCardHierarchy(elements);
};

var bindCardEvent = function bindCardEvent(elements, options) {
  return document.addEventListener('click', function (e) {
    if (!e.target.className.includes) return; // Card is hidden

    if (elements.container.style.display === 'none') {
      // Clicking outside anchor while card is hidden does nothing
      if (!e.target.className.includes(_classes.classes.anchor)) return; // Clicking on the anchor while card is hidden opens card

      elements.container.style.display = 'block';
      (0, _challenge.createChallenge)(elements, options);
      return;
    } // Card is open
    // Clicking outside of the card while it is open closes card


    if (!e.target.className.includes(_classes.classes.card)) {
      clearCard(elements, options.colors);
      elements.container.style.display = 'none';
    } // Clicking on the card while it is open does nothing

  });
};

var createAnchor = function createAnchor(options) {
  var elements = _objectSpread(_objectSpread({}, createAnchorElements(options.colors, options.text.anchor, options.text.style, options.puzzle)), createCardElements(options.colors));

  bindCardEvent(elements, options);
  setupAnchorHierarchy(elements);
  setupCardHierarchy(elements);
  return elements.anchor;
};

exports.createAnchor = createAnchor;