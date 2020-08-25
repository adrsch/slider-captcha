module.exports = {
  extends: 'airbnb',
  globals: {
    fetch: false,
    test: false,
    expect: false,
  },
  rules: {
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    indent: 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-unresolved': 'off',
    'operator-linebreak': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
  ignorePatterns: ['lib/**'],
};
