"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessIcon = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SuccessIcon = function SuccessIcon() {
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "scaptcha-icon-light",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 3.44 2.728",
    height: "10.312",
    width: "13"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M3.37.473L1.187 2.654.098 1.562l.409-.409.68.682L2.96.063z",
    fill: "#202020"
  })), /*#__PURE__*/_react["default"].createElement("svg", {
    className: "scaptcha-icon-dark",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 3.44 2.728",
    height: "10.312",
    width: "13"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M3.37.473L1.187 2.654.098 1.562l.409-.409.68.682L2.96.063z",
    fill: "#c6c6c6"
  })));
};

exports.SuccessIcon = SuccessIcon;