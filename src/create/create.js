import sharp from 'sharp';
import { randInt, puzzlePieceSvg, backgroundSvg } from './generate';

const sizes = ({
  WIDTH: 250,
  HEIGHT: 150,
  PUZZLE: 60,
  PADDING: 20,
});

const createCaptcha = ({
  image = Buffer.from(backgroundSvg(sizes.WIDTH, sizes.HEIGHT)),
  distort = false,
  rotate = false,
  fill = '#000',
  stroke = '#fff',
  strokeWidth = '.4',
  opacity = '0.5',
} = {}) => {
  const seed = randInt();
  const overlay = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      fill,
      stroke,
      strokeWidth,
      opacity,
      seed,
    }),
  );
  const mask = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      seed,
      strokeWidth,
      fill: '#fff',
      stroke: '#fff',
      opacity: '1',
    }),
  );
  const outline = Buffer.from(
    puzzlePieceSvg({
      rotate,
      distort,
      seed,
      stroke,
      strokeWidth,
      fill: 'none',
      opacity: '1',
    }),
  );
  const location = {
    // Solution for slider
    left: randInt(sizes.PUZZLE + sizes.PADDING, sizes.WIDTH - (sizes.PUZZLE + sizes.PADDING)),
    // Vertical offset
    top: randInt(sizes.PADDING, sizes.HEIGHT - (sizes.PUZZLE + sizes.PADDING)),
  };
  return new Promise((resolve) => {
    sharp(image)
      .resize({ width: sizes.WIDTH, height: sizes.HEIGHT })
      .composite([
        {
          input: overlay,
          blend: 'over',
          top: location.top,
          left: location.left,
        },
      ])
      .png()
      .toBuffer()
      .then((background) => {
        sharp(image)
          .resize({ width: sizes.WIDTH, height: sizes.HEIGHT })
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
          .extract({
            left: location.left,
            top: 0,
            width: sizes.PUZZLE,
            height: sizes.HEIGHT,
          })
          .png()
          .toBuffer()
          .then((slider) => {
            resolve({
              data: {
                background,
                slider,
              },
              solution: location.left,
            });
          });
      });
  });
};

export default createCaptcha;
