"use strict";

var _sharp = _interopRequireDefault(require("sharp"));

var _generate = require("./generate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createCaptcha = function createCaptcha() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 250 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 150 : _ref$height,
      _ref$image = _ref.image,
      image = _ref$image === void 0 ? function (width, height) {
    return Buffer.from((0, _generate.backgroundSvg)(width, height));
  } : _ref$image,
      _ref$distort = _ref.distort,
      distort = _ref$distort === void 0 ? false : _ref$distort,
      _ref$rotate = _ref.rotate,
      rotate = _ref$rotate === void 0 ? false : _ref$rotate,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? '#000' : _ref$fill,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#fff' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? '.4' : _ref$strokeWidth,
      _ref$opacity = _ref.opacity,
      opacity = _ref$opacity === void 0 ? '0.5' : _ref$opacity,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? 20 : _ref$padding;

  var backgroundImage = image(width, height);
  var seed = (0, _generate.randInt)();
  var overlay = Buffer.from((0, _generate.puzzlePieceSvg)({
    rotate: rotate,
    distort: distort,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    opacity: opacity,
    seed: seed
  }));
  var mask = Buffer.from((0, _generate.puzzlePieceSvg)({
    rotate: rotate,
    distort: distort,
    seed: seed,
    strokeWidth: strokeWidth,
    fill: '#fff',
    stroke: '#fff',
    opacity: '1'
  }));
  var outline = Buffer.from((0, _generate.puzzlePieceSvg)({
    rotate: rotate,
    distort: distort,
    seed: seed,
    stroke: stroke,
    strokeWidth: strokeWidth,
    fill: 'none',
    opacity: '1'
  }));
  var location = {
    left: (0, _generate.randInt)(padding + 60, width - padding - 60),
    // Solution for slider
    top: (0, _generate.randInt)(padding, height - padding - 60) // Vertical offset

  };
  return new Promise(function (resolve, reject) {
    return (0, _sharp["default"])(backgroundImage).resize({
      width: width,
      height: height
    }).composite([{
      input: overlay,
      blend: 'over',
      top: location.top,
      left: location.left
    }]).png().toBuffer().then(function (background) {
      return (0, _sharp["default"])(backgroundImage).composite([{
        input: mask,
        blend: 'dest-in',
        top: location.top,
        left: location.left
      }, {
        input: outline,
        blend: 'over',
        top: location.top,
        left: location.left
      }]).extract({
        left: location.left,
        top: 0,
        width: 60,
        height: height
      }).png().toBuffer().then(function (slider) {
        return resolve({
          challenge: {
            background: background,
            slider: slider
          },
          solution: location.left
        });
      });
    });
  });
};

module.exports = createCaptcha;