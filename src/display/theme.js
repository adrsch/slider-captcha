import lightTheme from './style/light';
import darkTheme from './style/dark';
import React from 'react';

const Theme = ({ theme }) => (
  <style>
    {(theme === 'dark') ? darkTheme : lightTheme}
  </style>
);

export default Theme;
