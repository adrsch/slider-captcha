"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var randInt = function randInt() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2147483646;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var noiseSvg = function noiseSvg(width, height) {
  return "\n<svg>\n  <filter id=\"noise\">\n    <feTurbulence type=\"turbulence\" baseFrequency=\"0.05\"\n        numOctaves=\"2\" result=\"turbulence\"/>\n    <feDisplacementMap in2=\"turbulence\" in=\"SourceGraphic\"\n        scale=\"50\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"bg\">\n    <feTurbulence\n      baseFrequency=\"0.005\"\n      seed=\"".concat(randInt(), "\"\n      result=\"noise\"\n    />\n    <feColorMatrix in=\"noise\"\n        type=\"matrix\"\n        values=\"1 0 0 0 0\n                0 1 0 0 0\n                0 0 1 0 0\n                0 0 0 0 1\" />\n  </filter>\n  <rect filter=\"url(#bg)\" width=\"").concat(width, "\" height=\"").concat(height, "\"/>\n</svg>\n");
};

var randShape = function randShape(x, y, rand, color) {
  return "<rect filter=\"url(#noise)\" x=\"".concat(x, "\" y=\"").concat(y, "\" width=\"").concat(rand.width, "\" height=\"").concat(rand.height, "\" fill=\"").concat(rand.scheme[color], "\"/>");
};

var pattern = function pattern(width, height, rand) {
  return _toConsumableArray(Array(Math.floor(height / rand.height)).keys()).map(function (y) {
    return _toConsumableArray(Array(Math.floor(width / rand.width)).keys()).map(function (x) {
      return randShape(x * rand.width, y * rand.height, rand, x % 2);
    });
  }).join('\n');
};

var randColor = function randColor() {
  var hue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return [hue ? hue : randInt(0, 360), randInt(50, 70), // Saturation
  randInt(50, 60) // Lightness
  ];
};

var hslString = function hslString(color) {
  return "hsl(".concat(color[0], ", ").concat(color[1], "%, ").concat(color[2], "%)");
};

var randScheme = function randScheme() {
  var scheme = [randColor()];
  scheme.push(randColor((scheme[0][0] + 60) % 360));
  scheme.push(randColor((scheme[0][0] - 30) % 360));
  scheme.push(randColor((scheme[0][0] + 30) % 360));
  scheme.push(randColor((scheme[0][0] - 60) % 360));
  return scheme.map(function (color) {
    return hslString(color);
  });
};

var backgroundSvg = function backgroundSvg(width, height) {
  var rand = {
    width: randInt(5, 50),
    height: randInt(5, 50),
    scheme: randScheme()
  };
  return backgroundPattern(width, height, rand);
};

var backgroundPattern = function backgroundPattern(width, height, rand) {
  return "\n<svg width=\"".concat(width, "\" height=\"").concat(height, "\" viewBox=\"0 0 ").concat(width, " ").concat(height, "\">\n  <filter id=\"noise\">\n    <feTurbulence type=\"turbulence\" baseFrequency=\"0.005\"\n      seed=\"").concat(randInt(), "\"\n        numOctaves=\"2\" result=\"turbulence\"/>\n    <feDisplacementMap in2=\"turbulence\" in=\"SourceGraphic\"\n        scale=\"30\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"heavy\">\n    <feTurbulence type=\"turbulence\" baseFrequency=\"0.005\"\n      seed=\"").concat(randInt(), "\"\n        numOctaves=\"2\" result=\"turbulence\"/>\n    <feDisplacementMap in2=\"turbulence\" in=\"SourceGraphic\"\n        scale=\"100\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <rect width=\"").concat(width, "\" height=\"").concat(height, "\" fill=\"").concat(rand.scheme[4], "\"/>\n  <rect filter=\"url(#heavy)\"  width=\"").concat(width / 2, "\" height=\"").concat(height, "\" x=\"").concat(width / 5, "\" fill=\"").concat(rand.scheme[2], "\"/>\n  <rect filter=\"url(#heavy)\" width=\"").concat(width / 2, "\" height=\"").concat(height, "\" x=\"").concat(width / 2, "\" fill=\"").concat(rand.scheme[3], "\"/>\n  ").concat(pattern(width, height, rand), "\n</svg>\n");
};

var puzzlePieceSvg = function puzzlePieceSvg() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$distort = _ref.distort,
      distort = _ref$distort === void 0 ? true : _ref$distort,
      _ref$rotate = _ref.rotate,
      rotate = _ref$rotate === void 0 ? true : _ref$rotate,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? '#000' : _ref$fill,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#fff' : _ref$stroke,
      _ref$seed = _ref.seed,
      seed = _ref$seed === void 0 ? 0 : _ref$seed,
      _ref$opacity = _ref.opacity,
      opacity = _ref$opacity === void 0 ? '0.5' : _ref$opacity,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? '0.25' : _ref$strokeWidth;

  return "\n  <svg viewBox=\"0 0 20 20\" height=\"60\" width=\"60\">\n    <filter id=\"noise\">\n      <feTurbulence type=\"turbulence\" baseFrequency=\"0.05\"\n        seed=\"".concat(seed, "\"\n          numOctaves=\"2\" result=\"turbulence\"/>\n      <feDisplacementMap in2=\"turbulence\" in=\"SourceGraphic\"\n          scale=\"2.5\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n    </filter>\n    <path ").concat(distort ? 'filter="url(#noise)"' : '', " ").concat(rotate ? "transform=\"rotate(".concat(seed, ", 10, 10)\"") : '', " d=\"M5.56.56a2.305 2.305 0 00-2.296 2.304 2.305 2.305 0 00.801 1.747H.135v4.295a2.305 2.305 0 011.8-.865 2.305 2.305 0 012.304 2.306 2.305 2.305 0 01-2.305 2.304 2.305 2.305 0 01-1.8-.865v4.226H11.26v-4.258a2.305 2.305 0 001.781.842 2.305 2.305 0 002.305-2.305 2.305 2.305 0 00-2.305-2.305 2.305 2.305 0 00-1.78.841V4.611H7.072a2.305 2.305 0 00.801-1.747A2.305 2.305 0 005.57.559a2.305 2.305 0 00-.009 0z\" opacity=\"").concat(opacity, "\" stroke=\"").concat(stroke, "\" fill=\"").concat(fill, "\" stroke-width=\"").concat(strokeWidth, "\" stroke-linejoin=\"round\"/>\n  </svg>\n");
};

module.exports = {
  puzzlePieceSvg: puzzlePieceSvg,
  backgroundSvg: backgroundSvg,
  randInt: randInt
};