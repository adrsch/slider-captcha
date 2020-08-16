"use strict";

// Basic verification - add your own!
var verifySolution = function verifySolution(captcha, solution, tolerance) {
  return Math.abs(captcha - solution) < tolerance;
};

var verifyHorizontalMotion = function verifyHorizontalMotion(positions, solution) {
  return !positions.reduce(function (jumpToInput, pos) {
    return jumpToInput && (pos === 0 || pos === solution);
  }, true);
};

var verifyVerticalMotion = function verifyVerticalMotion(positions) {
  return positions.reduce(function (total, pos) {
    return total + pos;
  }) != 0;
};

var verifyCaptcha = function verifyCaptcha(captcha, solution, trail) {
  var tolerance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
  return verifySolution(captcha, solution, tolerance) && verifyHorizontalMotion(trail.x, solution) && verifyVerticalMotion(trail.y);
};

module.exports = verifyCaptcha;