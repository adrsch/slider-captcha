const geopattern = require('geopattern');

const options = {
  width: 300,
  height: 200,
  piece: {
    length: 42,
    radius: 9,
  },
};

const generatePattern = ({
  width,
  height,
}) => {
  pattern = geopattern.generate(Math.random().toString());
  pattern.svg.height = 200;
  pattern.svg.width = 300;
  return pattern.toDataUri();
};

const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

const drawPuzzlePiece = (ctx, operation, x, y, l, r) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, 0.72 * Math.PI, 2.26 * Math.PI);
  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * Math.PI, 2.78 * Math.PI);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * Math.PI, 1.24 * Math.PI, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.stroke();
  ctx[operation]();
  ctx.globalCompositeOperation = 'destination-over';
};

const createImages = ({
  callback,
  width,
  height,
  piece,
  pieceSize,
  location,
}) => { 
  const backgroundCanvas = createCanvas(width, height);
  const backgroundCtx = backgroundCanvas.getContext('2d');
  const sliderCanvas = createCanvas(width, height);
  const sliderCtx = sliderCanvas.getContext('2d');

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    drawPuzzlePiece(backgroundCtx, 'fill', location.x, location.y, piece.length, piece.radius);
    drawPuzzlePiece(sliderCtx, 'clip', location.x, location.y, piece.length, piece.radius);

    backgroundCtx.drawImage(img, 0, 0, width - 2, height);
    sliderCtx.drawImage(img, 0, 0, width - 2, height);

    const sliderOffset = 2 * piece.radius + 1;
    const sliderImageData = sliderCtx.getImageData(
      location.x,
      location.y - sliderOffset,
      pieceSize,
      pieceSize,
    );
    sliderCanvas.width = pieceSize;
    sliderCtx.putImageData(sliderImageData, 0, location.y - sliderOffset + 1);

    callback({
      background: backgroundCanvas.toDataURL(),
      slider: sliderCanvas.toDataURL(),
    });
  };
  img.src = generatePattern({width: width, height: height});
}

const getRandomRange = (min, max) => (
  parseInt(Math.random() * (max - min) + min)
);

const create = (callback,
  {
    width,
    height,
    piece,
  }
) => {
  const pieceSize = piece.length + 2 * piece.radius + 3;
  const location = {
    x: getRandomRange(pieceSize + 10, width - (pieceSize + 10)),
    y: getRandomRange(2 * piece.radius + 10, height - (pieceSize + 10)),
  };
  createImages({
    callback: callback,
    width: width,
    height: height,
    piece: piece,
    pieceSize: pieceSize,
    location: location,
  });
  return location.x;
};


const sliderCaptcha = () => {
  return create((data) => console.log(data), options);
};

const create = require('./create');
//export * from './create';
//export { default as createCaptcha } from './create';
module.exports = {
  create: create,
};
