"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FailureIcon = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FailureIcon = function FailureIcon() {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "scaptcha-icon-light",
    xmlns: "http://www.w3.org/2000/svg",
    width: "13",
    height: "10.312",
    viewBox: "0 0 3.44 2.728"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M2.12 1.377l.961.962-.379.38-.964-.963-.962.963-.38-.38.963-.962L.396.413l.38-.38.962.963.964-.962.38.38z",
    fill: "#202020"
  })), /*#__PURE__*/_react["default"].createElement("svg", {
    className: "scaptcha-icon-dark",
    xmlns: "http://www.w3.org/2000/svg",
    width: "13",
    height: "10.312",
    viewBox: "0 0 3.44 2.728"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M2.12 1.377l.961.962-.379.38-.964-.963-.962.963-.38-.38.963-.962L.396.413l.38-.38.962.963.964-.962.38.38z",
    fill: "#c6c6c6"
  })));
};

exports.FailureIcon = FailureIcon;