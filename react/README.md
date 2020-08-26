# @slider-captcha
Generate a puzzle slider captcha and display with React component.\
![](https://raw.githubusercontent.com/adrsch/slider-captcha/master/demo.gif)
## Installation
React frontend:
```
npm i @slider-captcha/react
```
Backend:
```
npm i @slider-captcha/core
```
## Usage
React:
```
import SliderCaptcha from '@slider-captcha/react';

function verifiedCallback(token) {
  console.log('Captcha token: ' + token);
}

function App() {
  return (
    <SliderCaptcha
      create="https://example.com/captcha/create"
      verify="https://example.com/captcha/verify"
      callback={verifiedCallback}
    />
  );
}
```
Express:
```
var sliderCaptcha = require('@slider-captcha/core');

app.get('/captcha/create', function (req, res) {
  sliderCaptcha.create()
    .then(function ({data, solution}) {
      req.session.captcha = solution;
      req.session.save();
      res.status(200).send(data);
    });
});

app.post('/captcha/verify', function (req, res) {
  sliderCaptcha.verify(req.session.captcha, req.body)
    .then(function (verification) {
      if (verification.result === 'success') {
        req.session.token = verification.token;
        req.session.save();
      }
      res.status(200).send(verification);
    });
});
```
### React component props

| Name | Type | Default | Description |
|:---- | ---- | ---- | ------ |
| callback | func | `(token) => console.log(token)` | Called with token on successful verification |
| create | string or func | `captcha/create` | Either the URL to fetch data from or a `function ()` returning a promise which resolves with `{ background, slider }` as PNG buffers |
| verify | string or func | `captcha/verify` | Either the URL to fetch data from or a `function (response, trail)` returning a promise which resolves with `{ result, token }` |
| text | { anchor: string, challenge: string } | `{ anchor: 'I am human', challenge: 'Slide to finish the puzzle' }` | Text used for captcha |
| variant | string | `light` | Use `'light'` for light theme, `'dark'` for dark theme |

Light:\
![](https://raw.githubusercontent.com/adrsch/slider-captcha/master/light.png)\
Dark:\
![](https://raw.githubusercontent.com/adrsch/slider-captcha/master/dark.png)

### Create captcha options
`sliderCaptcha.create({option: value})`

| Name | Type | Default | Description |
|:---- | ---- | ---- | ------ |
| image | buffer | randomly generated pattern | Background image used for captcha - resized to 250x150 |
| fill | string | `#000` | Color used in overlay of puzzle piece on background |
| stroke | string | `#fff` | Color for outline of puzzle piece |
| strokeWidth | string | `0.4` | Puzzle piece outline width |
| opacity | string | `0.5` | Opacity of puzzle piece overlay on background |
| distort | bool | false | Apply distortion to the puzzle piece |
| rotate | bool | false | Apply a random rotation to the puzzle piece |

With rotation and distortion: \
![](https://raw.githubusercontent.com/adrsch/slider-captcha/master/distortrotate.png)

### Verify captcha options
`sliderCaptcha.verify(captcha, {response, trail: {x, y}}, {option: value})`


| Name | Type | Default | Description |
|:---- | ---- | ---- | ------ |
| tolerance | number | 7 | Allowed deviation from true captcha value |
