"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _anchor = _interopRequireDefault(require("./anchor"));

var _theme = _interopRequireDefault(require("./theme"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fetchCaptcha = function fetchCaptcha(create) {
  return function () {
    return create instanceof Function ? create() // Use provided promise for getting background and slider
    : fetch(create, {
      // Use create as API URL for fetch
      method: 'GET',
      credentials: 'include'
    }).then(function (response) {
      return response.json();
    });
  };
};

var fetchVerification = function fetchVerification(verify) {
  return function (response, trail) {
    return verify instanceof Function ? verify(response, trail) // Use provided promise for verifying captcha
    : fetch(verify, {
      // Verification API URL provided instead
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        response: response,
        trail: trail
      })
    }).then(function (response) {
      return response.json();
    });
  };
};

var SliderCaptcha = function SliderCaptcha() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'light' : _ref$variant,
      _ref$create = _ref.create,
      create = _ref$create === void 0 ? 'captcha/create' : _ref$create,
      _ref$verify = _ref.verify,
      verify = _ref$verify === void 0 ? 'captcha/verify' : _ref$verify,
      _ref$callback = _ref.callback,
      callback = _ref$callback === void 0 ? function (token) {
    return console.log(token);
  } : _ref$callback,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? {
    anchor: 'I am human',
    challenge: 'Slide to finish the puzzle'
  } : _ref$text;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      verified = _useState2[0],
      setVerified = _useState2[1];

  var submitResponse = function submitResponse(response, trail) {
    return new Promise(function (resolve, reject) {
      fetchVerification(verify)(response, trail).then(function (verification) {
        if (!verification.result || verification.result !== 'success' || !verification.token) {
          resolve(false);
        } else {
          setTimeout(function () {
            callback(verification.token);
            setVerified(true);
          }, 500);
          resolve(true);
        }
      });
    });
  };

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_theme["default"], {
    variant: variant
  }), /*#__PURE__*/_react["default"].createElement(_anchor["default"], {
    text: text,
    fetchCaptcha: fetchCaptcha(create),
    submitResponse: submitResponse,
    verified: verified
  }));
};

var _default = SliderCaptcha;
exports["default"] = _default;