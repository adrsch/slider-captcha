const sharp = require('sharp');
const generate = require('./generate');

const createCaptcha = ({
  width=250,
  height=150,
  image=(width, height) => Buffer.from(generate.backgroundSvg(width, height)),
  distort=false,
  rotate=false,
  fill='#000',
  stroke='#fff',
  strokeWidth='.4',
  opacity='0.5',
  padding=20,
}={}) => {
  const backgroundImage = image(width, height);
  const seed = generate.randInt();
  const overlay = Buffer.from(generate.puzzlePieceSvg({
    rotate: rotate,
    distort: distort,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    opacity: opacity,
    seed: seed,
  }));
  const mask = Buffer.from(generate.puzzlePieceSvg({
    rotate: rotate,
    distort: distort,
    seed: seed,
    strokeWidth: strokeWidth,
    fill: '#fff',
    stroke: '#fff',
    opacity: '1',
  }));
  const outline = Buffer.from(generate.puzzlePieceSvg({
    rotate: rotate,
    distort: distort,
    seed: seed,
    stroke: stroke,
    strokeWidth: strokeWidth,
    fill: 'none',
    opacity: '1',
  }));
  const location = {
    left: generate.randInt(padding + 60, width - padding - 60), // Solution for slider
    top: generate.randInt(padding, height - padding - 60), // Vertical offset
  };
  return new Promise((resolve, reject) =>
    sharp(backgroundImage)
      .resize({width: width, height: height})
      .composite([{
          input: overlay,
          blend: 'over',
          top: location.top,
          left: location.left,
      }])
      .png()
      .toBuffer()
      .then(background => (
        sharp(backgroundImage)
          .composite([
            {
              input: mask,
              blend: 'dest-in',
              top: location.top,
              left: location.left,
            },
            {
              input: outline,
              blend: 'over',
              top: location.top,
              left: location.left,
            },
          ])
          .extract({ left: location.left, top: 0, width: 60, height: height})
          .png()
          .toBuffer()
          .then(slider => (
            resolve({
              challenge: {
                background: background,
                slider: slider,
              },
              solution: location.left,
            }))))));
};

module.exports = createCaptcha;
