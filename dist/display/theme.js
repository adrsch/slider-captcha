"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _light = _interopRequireDefault(require("./style/light"));

var _dark = _interopRequireDefault(require("./style/dark"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Theme = function Theme(_ref) {
  var theme = _ref.theme;
  return /*#__PURE__*/_react["default"].createElement("style", null, "(theme === 'dark') ? ", _dark["default"], ": ", _light["default"]);
};

var _default = Theme;
exports["default"] = _default;