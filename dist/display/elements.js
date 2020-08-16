"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageElement = exports.createElement = void 0;

var createElement = function createElement(tag) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$classes = _ref.classes,
      classes = _ref$classes === void 0 ? [] : _ref$classes,
      _ref$contents = _ref.contents,
      contents = _ref$contents === void 0 ? '' : _ref$contents,
      _ref$src = _ref.src,
      src = _ref$src === void 0 ? '' : _ref$src,
      _ref$hidden = _ref.hidden,
      hidden = _ref$hidden === void 0 ? false : _ref$hidden;

  return Object.assign(document.createElement(tag), {
    className: classes.join(' '),
    innerHTML: contents,
    style: hidden ? 'display: none;' : ''
  });
};

exports.createElement = createElement;

var imageElement = function imageElement(image) {
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return Object.assign(new Image(), {
    className: classes.join(' '),
    draggable: false,
    src: "data:image/png;base64,".concat(Buffer.from(image).toString('base64'))
  });
};

exports.imageElement = imageElement;