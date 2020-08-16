import { classes } from './classes';
import { style } from './style';
import { loadingIcon } from './icons';
import { createElement } from './elements';
import { createChallenge } from './challenge';

const createAnchorElements = (colors, anchorText, textStyle, puzzleSize) => ({
  anchor: createElement('div', {
    classes: [ classes.anchorContainer, classes.anchor ],
  }),
  anchorCheckbox: createElement('div', {
    classes: [ classes.anchorCheckbox, classes.anchor ],
  }),
  anchorText: createElement('div', {
    classes: [ classes.anchorText, classes.anchor ],
    contents: anchorText,
  }),
  style: createElement('style', {
    contents: style(colors, textStyle, puzzleSize),
  }),
});

const createCardElements = (colors) => ({
  container: createElement('div', {
    hidden: true,
    classes: [ classes.container, classes.card ],
  }),
  loading: createElement('div', {
    contents: loadingIcon(colors.card.control.active),
    classes: [ classes.loading, classes.card ],
  }),
});


const setupAnchorHierarchy = (elements) =>
  [elements.anchorCheckbox, elements.anchorText, elements.style]
    .forEach(el => elements.anchor.append(el));

const setupCardHierarchy = (elements) => {
  elements.container.append(elements.loading);
  elements.anchor.append(elements.container);
};


const clearCard = (elements, colors) => {
  elements.loading.style.display = 'flex';
  elements.anchor.removeChild(elements.container);
  Object.assign(elements, createCardElements(colors));
  setupCardHierarchy(elements);
};

const bindCardEvent = (elements, options) =>
  document.addEventListener('click', (e) => {
    if (!e.target.className.includes) return;
    // Card is hidden
    if (elements.container.style.display === 'none') {
      // Clicking outside anchor while card is hidden does nothing
      if (!e.target.className.includes(classes.anchor)) return;
      // Clicking on the anchor while card is hidden opens card
      elements.container.style.display = 'block';
      createChallenge(elements, options);
      return;
    }
    // Card is open
    // Clicking outside of the card while it is open closes card
    if (!e.target.className.includes(classes.card)) {
      clearCard(elements, options.colors);
      elements.container.style.display = 'none';
    }
    // Clicking on the card while it is open does nothing
  });

const createAnchor = (options) => {
  const elements = {
    ...createAnchorElements(
      options.colors,
      options.text.anchor,
      options.text.style,
      options.puzzle,
    ),
    ...createCardElements(
      options.colors
    ),
  };  
  bindCardEvent(elements, options);
  setupAnchorHierarchy(elements);
  setupCardHierarchy(elements);
  return elements.anchor;
};

export { createAnchor };
