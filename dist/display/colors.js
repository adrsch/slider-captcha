"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dark = exports.light = void 0;
var light = {
  card: {
    control: {
      background: '#fafafa',
      active: '#0889e4',
      success: 'rgb(53, 221, 116)',
      failure: 'rgb(228, 8, 8)',
      icon: '#202020'
    },
    track: {
      background: '#d9d9d9',
      active: '#3caeff',
      success: 'rgb(131, 247, 136)',
      failure: 'rgb(255, 60, 60)',
      text: '#716e6e'
    },
    container: '#f1f1f1'
  },
  anchor: {
    background: '#f8f8f8',
    checkbox: '#fff',
    text: '#424242'
  }
};
exports.light = light;
var dark = {
  card: {
    control: {
      background: '#242222',
      active: '#0889e4',
      success: 'rgb(53, 221, 116)',
      failure: 'rgb(228, 8, 8)',
      icon: '#c6c6c6'
    },
    track: {
      background: '#353535',
      active: '#3caeff',
      success: 'rgb(131, 247, 136)',
      failure: 'rgb(255, 60, 60)',
      text: '#716e6e'
    },
    container: '#1a1a1a'
  },
  anchor: {
    background: '#1c1919',
    checkbox: '#535353',
    text: '#c6c6c6'
  }
};
exports.dark = dark;