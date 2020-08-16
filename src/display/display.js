import { light, dark } from './colors';
import { createAnchor } from './anchor';
import { createChallenge } from './challenge';

const setupDefaultOptions = (options) =>
  Object.assign({
    create: 'captcha/create',
    verify: 'captcha/verify',
    colors: 
      (options.colors === 'dark')
        ? dark
        : light,
    text: {
      challenge: 'Slide to finish the puzzle',
      anchor: 'I am human',
      style: {
        fontSize: '13px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: '400',
      },
    },
    puzzle: {
      width: 250,
      height: 150,
    },
  }, options);

const sliderCaptcha = (options) => 
  createAnchor(setupDefaultOptions(options));

const sliderCaptchaAuto = (options) =>
  document.getElementById('slider-captcha').append(sliderCaptcha(options));

export {
  sliderCaptchaAuto,
  sliderCaptcha,
}

