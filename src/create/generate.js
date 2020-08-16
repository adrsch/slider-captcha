const randInt = (min = 0, max = 2147483646) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const noiseSvg = (width, height) => `
<svg>
  <filter id="noise">
    <feTurbulence type="turbulence" baseFrequency="0.05"
        numOctaves="2" result="turbulence"/>
    <feDisplacementMap in2="turbulence" in="SourceGraphic"
        scale="50" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="bg">
    <feTurbulence
      baseFrequency="0.005"
      seed="${randInt()}"
      result="noise"
    />
    <feColorMatrix in="noise"
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0 1" />
  </filter>
  <rect filter="url(#bg)" width="${width}" height="${height}"/>
</svg>
`;

const randShape = (x, y, rand, color) =>
  `<rect filter="url(#noise)" x="${x}" y="${y}" width="${rand.width}" height="${rand.height}" fill="${rand.scheme[color]}"/>`;

const pattern = (width, height, rand) =>
  [...Array(Math.floor(height / rand.height)).keys()]
    .map((y) =>
      [...Array(Math.floor(width / rand.width)).keys()].map((x) =>
        randShape(x * rand.width, y * rand.height, rand, x % 2)
      )
    )
    .join('\n');

const randColor = (hue = false) => [
  hue ? hue : randInt(0, 360),
  randInt(50, 70), // Saturation
  randInt(50, 60), // Lightness
];

const hslString = (color) => `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;

const randScheme = () => {
  let scheme = [randColor()];
  scheme.push(randColor((scheme[0][0] + 60) % 360));
  scheme.push(randColor((scheme[0][0] - 30) % 360));
  scheme.push(randColor((scheme[0][0] + 30) % 360));
  scheme.push(randColor((scheme[0][0] - 60) % 360));
  return scheme.map((color) => hslString(color));
};

const backgroundSvg = (width, height) => {
  const rand = {
    width: randInt(5, 50),
    height: randInt(5, 50),
    scheme: randScheme(),
  };
  return backgroundPattern(width, height, rand);
};

const backgroundPattern = (width, height, rand) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <filter id="noise">
    <feTurbulence type="turbulence" baseFrequency="0.005"
      seed="${randInt()}"
        numOctaves="2" result="turbulence"/>
    <feDisplacementMap in2="turbulence" in="SourceGraphic"
        scale="30" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="heavy">
    <feTurbulence type="turbulence" baseFrequency="0.005"
      seed="${randInt()}"
        numOctaves="2" result="turbulence"/>
    <feDisplacementMap in2="turbulence" in="SourceGraphic"
        scale="100" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <rect width="${width}" height="${height}" fill="${rand.scheme[4]}"/>
  <rect filter="url(#heavy)"  width="${width / 2}" height="${height}" x="${
  width / 5
}" fill="${rand.scheme[2]}"/>
  <rect filter="url(#heavy)" width="${width / 2}" height="${height}" x="${
  width / 2
}" fill="${rand.scheme[3]}"/>
  ${pattern(width, height, rand)}
</svg>
`;

const puzzlePieceSvg = ({
  distort = true,
  rotate = true,
  fill = '#000',
  stroke = '#fff',
  seed = 0,
  opacity = '0.5',
  strokeWidth = '0.25',
} = {}) => `
  <svg viewBox="0 0 20 20" height="60" width="60">
    <filter id="noise">
      <feTurbulence type="turbulence" baseFrequency="0.05"
        seed="${seed}"
          numOctaves="2" result="turbulence"/>
      <feDisplacementMap in2="turbulence" in="SourceGraphic"
          scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <path ${distort ? 'filter="url(#noise)"' : ''} ${
  rotate ? `transform="rotate(${seed}, 10, 10)"` : ''
} d="M5.56.56a2.305 2.305 0 00-2.296 2.304 2.305 2.305 0 00.801 1.747H.135v4.295a2.305 2.305 0 011.8-.865 2.305 2.305 0 012.304 2.306 2.305 2.305 0 01-2.305 2.304 2.305 2.305 0 01-1.8-.865v4.226H11.26v-4.258a2.305 2.305 0 001.781.842 2.305 2.305 0 002.305-2.305 2.305 2.305 0 00-2.305-2.305 2.305 2.305 0 00-1.78.841V4.611H7.072a2.305 2.305 0 00.801-1.747A2.305 2.305 0 005.57.559a2.305 2.305 0 00-.009 0z" opacity="${opacity}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}" stroke-linejoin="round"/>
  </svg>
`;

module.exports = {
  puzzlePieceSvg: puzzlePieceSvg,
  backgroundSvg: backgroundSvg,
  randInt: randInt,
};
