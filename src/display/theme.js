import lightTheme from './style/light';
import darkTheme from './style/dark';
import React from 'react';

const Theme = ({ variant }) => (
  <style>{variant === 'dark' ? darkTheme : lightTheme}</style>
);

export default Theme;
