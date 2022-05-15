"use strict";

module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    babelOptions: {
      presets: ["@babel/preset-react"]
    }
  }
};