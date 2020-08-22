"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icons = require("./icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var imageDataUrl = function imageDataUrl(image) {
  return "data:image/png;base64,".concat(Buffer.from(image).toString('base64'));
};

var slider = {
  "default": {
    track: 'scaptcha-card-slider-track-default',
    control: 'scaptcha-card-slider-control-default',
    icon: /*#__PURE__*/_react["default"].createElement(_icons.ArrowIcon, null)
  },
  active: {
    track: 'scaptcha-card-slider-track-active',
    control: 'scaptcha-card-slider-control-active',
    icon: /*#__PURE__*/_react["default"].createElement(_icons.ArrowIcon, null)
  },
  success: {
    track: 'scaptcha-card-slider-track-success',
    control: 'scaptcha-card-slider-control-success',
    icon: /*#__PURE__*/_react["default"].createElement(_icons.SuccessIcon, null)
  },
  failure: {
    track: 'scaptcha-card-slider-track-failure',
    control: 'scaptcha-card-slider-control-failure',
    icon: /*#__PURE__*/_react["default"].createElement(_icons.FailureIcon, null)
  }
};

var Challenge = function Challenge(_ref) {
  var text = _ref.text,
      captcha = _ref.captcha,
      completeCaptcha = _ref.completeCaptcha;

  var _useState = (0, _react.useState)(slider["default"]),
      _useState2 = _slicedToArray(_useState, 2),
      sliderVariant = _useState2[0],
      setSliderVariant = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      solving = _useState4[0],
      setSolving = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      submittedResponse = _useState6[0],
      setSubmittedResponse = _useState6[1];

  var _useState7 = (0, _react.useState)({
    x: 0,
    y: 0
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      origin = _useState8[0],
      setOrigin = _useState8[1];

  var _useState9 = (0, _react.useState)({
    x: [0],
    y: [0]
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      trail = _useState10[0],
      setTrail = _useState10[1]; // Converts distances along the control track to corresponding distances moved by the puzzle piece


  var scaleSliderPosition = function scaleSliderPosition(x) {
    return 5 + 0.86 * x;
  };

  var handleStart = function handleStart(e) {
    if (submittedResponse) return;
    setOrigin({
      x: e.clientX,
      y: e.clientY
    });
    setSolving(true);
    setSliderVariant(slider.active);
  };

  var handleMove = function handleMove(e) {
    if (!solving || submittedResponse) return;
    var move = {
      x: e.clientX - origin.x,
      y: e.clientY - origin.y
    };
    if (move.x > 225 || move.x < 0) return; // Don't update if outside bounds of captcha

    setTrail({
      x: trail.x.concat([move.x]),
      y: trail.y.concat([move.y])
    });
  };

  var handleEnd = function handleEnd() {
    if (!solving || submittedResponse) return;
    setSubmittedResponse(true);
    completeCaptcha(scaleSliderPosition(trail.x[trail.x.length - 1]), trail).then(function (validated) {
      setSliderVariant(validated ? slider.success : slider.failure);
    });
  };

  var handleEnter = function handleEnter() {
    if (solving || submittedResponse) return;
    setSliderVariant(slider.active);
  };

  var handleLeave = function handleLeave() {
    if (solving) return;
    setSliderVariant(slider["default"]);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-element",
    draggable: "false",
    onMouseMove: handleMove,
    onTouchMove: handleMove,
    onTouchEnd: handleEnd,
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-background scaptcha-card-element",
    style: {
      backgroundImage: "url('".concat(imageDataUrl(captcha.background), "')")
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-puzzle scaptcha-card-element",
    style: {
      backgroundImage: "url('".concat(imageDataUrl(captcha.slider), "')"),
      left: "".concat(scaleSliderPosition(trail.x[trail.x.length - 1]), "px")
    },
    onMouseDown: handleStart,
    onTouchStart: handleStart
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-container scaptcha-card-element"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-track scaptcha-card-element"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-label scaptcha-card-element",
    style: {
      opacity: solving ? 0 : 1
    }
  }, /*#__PURE__*/_react["default"].createElement("span", null, text.challenge)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-mask ".concat(sliderVariant.track, " scaptcha-card-element"),
    style: {
      width: "".concat(trail.x[trail.x.length - 1] + 30, "px")
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-container scaptcha-card-element",
    draggable: "false"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-slider-control ".concat(sliderVariant.control, " scaptcha-card-element"),
    style: {
      left: "".concat(trail.x[trail.x.length - 1], "px")
    },
    onMouseDown: handleStart,
    onTouchStart: handleStart,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave
  }, sliderVariant.icon)));
};

var _default = Challenge;
exports["default"] = _default;