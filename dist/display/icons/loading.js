"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LoadingIcon = function LoadingIcon() {
  return /*#__PURE__*/_react["default"].createElement("svg", {
    width: "38",
    height: "38",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/_react["default"].createElement("defs", null, /*#__PURE__*/_react["default"].createElement("linearGradient", {
    x1: "8.042%",
    y1: "0%",
    x2: "65.682%",
    y2: "23.865%",
    id: "a"
  }, /*#__PURE__*/_react["default"].createElement("stop", {
    stopColor: "#0889e4",
    stopOpacity: "0",
    offset: "0%"
  }), /*#__PURE__*/_react["default"].createElement("stop", {
    stopColor: "#0889e4",
    stopOpacity: ".631",
    offset: "63.146%"
  }), /*#__PURE__*/_react["default"].createElement("stop", {
    stopColor: "#0889e4",
    offset: "100%"
  }))), /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(1 1)",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M36 18c0-9.94-8.06-18-18-18",
    stroke: "url(#a)",
    strokeWidth: "2"
  }, /*#__PURE__*/_react["default"].createElement("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    from: "0 18 18",
    to: "360 18 18",
    dur: "0.9s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/_react["default"].createElement("circle", {
    fill: "#0889e4",
    cx: "36",
    cy: "18",
    r: "1"
  }, /*#__PURE__*/_react["default"].createElement("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    from: "0 18 18",
    to: "360 18 18",
    dur: "0.9s",
    repeatCount: "indefinite"
  }))));
};

var _default = LoadingIcon;
exports["default"] = _default;