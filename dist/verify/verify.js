"use strict";

// Basic verification - add your own for a more comprehensive verification!
var uid = require('uid-safe'); // Solution must be correct within the given tolerance


var verifySolution = function verifySolution(captcha, solution, tolerance) {
  return Math.abs(captcha - solution) < tolerance;
}; // Slider position must not jump to the solution without intermediate values


var verifyHorizontalMotion = function verifyHorizontalMotion(positions, solution) {
  return !positions.reduce(function (jumpToInput, pos) {
    return jumpToInput && (pos === 0 || pos === solution);
  }, true);
}; // Vertical motion must be present while dragging the slider


var verifyVerticalMotion = function verifyVerticalMotion(positions) {
  return positions.reduce(function (total, pos) {
    return total + pos;
  }) != 0;
};

var verifyResponse = function verifyResponse(captcha, solution, trail, tolerance) {
  return verifySolution(captcha, solution, tolerance) && verifyHorizontalMotion(trail.x, solution) && verifyVerticalMotion(trail.y);
};

var verify = function verify(captcha, solution, trail) {
  var tolerance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
  return new Promise(function (resolve, reject) {
    verifyResponse(captcha, solution, trail, tolerance) ? uid(18).then(function (token) {
      resolve({
        result: 'success',
        token: token
      });
    }) : resolve({
      result: 'failure'
    });
  });
};

module.exports = verify;