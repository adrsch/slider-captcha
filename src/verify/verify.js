// Basic verification - add your own!

const verifySolution = (captcha, solution, tolerance) =>
  Math.abs(captcha - solution) < tolerance;

const verifyHorizontalMotion = (positions, solution) =>
  !positions.reduce(
    (jumpToInput, pos) => jumpToInput && (pos === 0 || pos === solution),
    true
  );

const verifyVerticalMotion = (positions) =>
  positions.reduce((total, pos) => total + pos) != 0;

const verifyCaptcha = (captcha, solution, trail, tolerance = 5) =>
{
  console.log(captcha);
  console.log(solution);
  console.log(trail.x);
  return
  verifySolution(captcha, solution, tolerance) &&
  verifyHorizontalMotion(trail.x, solution) &&
  verifyVerticalMotion(trail.y);
}
module.exports = verifyCaptcha;
