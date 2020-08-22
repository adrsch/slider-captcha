"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icons = require("./icons");

var _challenge = _interopRequireDefault(require("./challenge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Card = function Card(_ref) {
  var text = _ref.text,
      fetchCaptcha = _ref.fetchCaptcha,
      submitResponse = _ref.submitResponse;

  var _useState = (0, _react.useState)(Math.random()),
      _useState2 = _slicedToArray(_useState, 2),
      key = _useState2[0],
      setKey = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      captcha = _useState4[0],
      setCaptcha = _useState4[1];

  var refreshCaptcha = function refreshCaptcha() {
    var isSubscribed = true;
    fetchCaptcha().then(function (captcha) {
      setTimeout(function () {
        console.log(isSubscribed);
        if (!isSubscribed) return;
        setKey(Math.random());
        setCaptcha(captcha);
      }, 300);
    });
    return function () {
      return isSubscribed = false;
    };
  };

  var completeCaptcha = function completeCaptcha(response, trail) {
    return new Promise(function (resolve, reject) {
      submitResponse(response, trail).then(function (verified) {
        if (verified) {
          resolve(true);
        } else {
          refreshCaptcha();
          resolve(false);
        }
      });
    });
  };

  (0, _react.useEffect)(refreshCaptcha, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-container scaptcha-card-element"
  }, captcha ? /*#__PURE__*/_react["default"].createElement(_challenge["default"], {
    key: key,
    text: text,
    captcha: captcha,
    completeCaptcha: completeCaptcha
  }) : /*#__PURE__*/_react["default"].createElement("div", {
    className: "scaptcha-card-loading scaptcha-card-element"
  }, /*#__PURE__*/_react["default"].createElement(_icons.LoadingIcon, null)));
};

var _default = Card;
exports["default"] = _default;