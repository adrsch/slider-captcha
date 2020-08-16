const createElement = (
  tag,
  { classes = [], contents = '', src = '', hidden = false } = {}
) =>
  Object.assign(document.createElement(tag), {
    className: classes.join(' '),
    innerHTML: contents,
    style: hidden ? 'display: none;' : '',
  });

const imageElement = (image, classes = []) =>
  Object.assign(new Image(), {
    className: classes.join(' '),
    draggable: false,
    src: `data:image/png;base64,${Buffer.from(image).toString('base64')}`,
  });

export { createElement, imageElement };
