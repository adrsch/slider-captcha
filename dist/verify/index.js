"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _verify = require("./verify");

Object.keys(_verify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _verify[key];
    }
  });
});