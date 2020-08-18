"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _loading = _interopRequireDefault(require("./icons/loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var imageDataUrl = function imageDataUrl(image) {
  return "data:image/png;base64,".concat(Buffer.from(image).toString('base64'));
};

var Challenge = function Challenge(_ref) {
  var text = _ref.text,
      captcha = _ref.captcha,
      verifyCaptcha = _ref.verifyCaptcha;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-element"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-background scaptcha-card-element",
    style: {
      backgroundImage: "url('".concat(imageDataUrl(captcha.background), "')")
    }
  }), /*#__PURE__*/_react["default"].createElement("img", {
    className: "scaptcha-card-slider-puzzle scaptcha-card-element",
    src: imageDataUrl(captcha.slider)
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-container scaptcha-card-element"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-track scaptcha-card-element"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-label scaptcha-card-element"
  }, /*#__PURE__*/_react["default"].createElement("span", null, text.challenge)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-mask scaptcha-card-element"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-control scaptcha-card-element"
  })));
}; //const Challenge = ({ captcha, create, verify, callback
// Based on code by ArgoZhang, https://github.com/ArgoZhang/SliderCaptcha


var solveCaptcha = function solveCaptcha() {
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

var _default = Challenge;
exports["default"] = _default;