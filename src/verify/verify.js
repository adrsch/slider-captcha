import uid from 'uid-safe';

// Solution must be correct within the given tolerance
const verifySolution = (captcha, solution, tolerance) =>
  Math.abs(captcha - solution) < tolerance;

// Slider position must not jump to the solution without intermediate values
const verifyHorizontalMotion = (positions) =>
  !positions.reduce(
    (jumpToInput, pos) => jumpToInput && (pos === 0 || pos === positions[positions.length - 1]),
    true,
  );

// Vertical motion must be present while dragging the slider
const verifyVerticalMotion = (positions) =>
  positions.reduce((total, pos) => total + pos) !== 0;

const verifyTrailLength = (trail) =>
  trail.x.length === trail.y.length;

const verifyResponse = (captcha, solution, trail, tolerance) =>
  verifySolution(captcha, solution, tolerance) &&
  verifyTrailLength(trail) &&
  verifyHorizontalMotion(trail.x, solution) &&
  verifyVerticalMotion(trail.y);

const verifyCaptcha = (
  captcha,
  solution,
  trail,
  {
    tolerance = 7,
    verify = verifyResponse,
  } = {},
) =>
  new Promise((resolve) => {
    if (verify(captcha, solution, trail, tolerance)) {
      uid(32).then((token) => {
        resolve({
          result: 'success',
          token,
        });
      });
    } else {
      resolve({ result: 'failure' });
    }
  });

export default verifyCaptcha;
