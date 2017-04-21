module.exports = {
  "env": {
    "browser": true,
    "mocha": true,
    "node": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "promise",
    "react",
    "prettier"
  ],
  "rules": {
    "strict": 0,
    "react/sort-comp": "error",
    "react/sort-prop-types": "error",
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "semi": false
      }
    ]
  }
};
