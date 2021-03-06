"use strict";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'accent-color': "#121E37"
      },
      aspectRatio: {
        '17/10': '17 / 10'
      }
    }
  },
  plugins: [require("tailwindcss-responsive-embed")]
};