module.exports = {
  "env": {
    "browser": true,
    "mocha": true,
    "node": true
  },
  "extends": [
    "standard",
    "standard-react",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "plugins": [
    "standard",
    "promise",
    "react"
  ],
  "rules": {
    "strict": 0,
    "react/sort-comp": "error",
    "react/sort-prop-types": "error"
  }
};
