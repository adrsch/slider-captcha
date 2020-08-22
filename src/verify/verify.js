// Basic verification - add your own for a more comprehensive verification!
const uid = require('uid-safe');

// Solution must be correct within the given tolerance
const verifySolution = (captcha, solution, tolerance) =>
  Math.abs(captcha - solution) < tolerance;

// Slider position must not jump to the solution without intermediate values
const verifyHorizontalMotion = (positions, solution) =>
  !positions.reduce(
    (jumpToInput, pos) => jumpToInput && (pos === 0 || pos === solution),
    true
  );

// Vertical motion must be present while dragging the slider
const verifyVerticalMotion = (positions) =>
  positions.reduce((total, pos) => total + pos) != 0;

const verifyResponse = (captcha, solution, trail, tolerance) =>
  verifySolution(captcha, solution, tolerance) &&
  verifyHorizontalMotion(trail.x, solution) &&
  verifyVerticalMotion(trail.y);

const verify = (captcha, solution, trail, tolerance = 7) =>
  new Promise((resolve, reject) => {
    verifyResponse(captcha, solution, trail, tolerance)
      ? uid(18).then((token) => {
          resolve({
            result: 'success',
            token: token,
          });
        })
      : resolve({ result: 'failure' });
  });

module.exports = verify;
