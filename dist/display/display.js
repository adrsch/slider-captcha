"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sliderCaptcha = exports.sliderCaptchaAuto = void 0;

var _colors = require("./colors");

var _anchor = require("./anchor");

var _challenge = require("./challenge");

var setupDefaultOptions = function setupDefaultOptions(options) {
  return Object.assign({
    create: 'captcha/create',
    verify: 'captcha/verify',
    colors: options.colors === 'dark' ? _colors.dark : _colors.light,
    text: {
      challenge: 'Slide to finish the puzzle',
      anchor: 'I am human',
      style: {
        fontSize: '13px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: '400'
      }
    },
    puzzle: {
      width: 250,
      height: 150
    }
  }, options);
};

var sliderCaptcha = function sliderCaptcha(options) {
  return (0, _anchor.createAnchor)(setupDefaultOptions(options));
};

exports.sliderCaptcha = sliderCaptcha;

var sliderCaptchaAuto = function sliderCaptchaAuto(options) {
  return document.getElementById('slider-captcha').append(sliderCaptcha(options));
};

exports.sliderCaptchaAuto = sliderCaptchaAuto;