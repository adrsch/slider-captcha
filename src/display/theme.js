import React from 'react';
import PropTypes from 'prop-types';
import lightTheme from './style/light';
import darkTheme from './style/dark';

const Theme = ({ variant }) => (
  <style suppressHydrationWarning>{variant === 'dark' ? darkTheme : lightTheme}</style>
);

Theme.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default Theme;
