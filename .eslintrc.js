module.exports = {
  "extends": "airbnb",
  "rules": {
    "no-console": "off",
    "no-mixed-operators": "off",
    "no-bitwise": "off",
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-plusplus": "off",
    "no-continue": "off",
    "no-param-reassign": "off",
    "yoda": ["error", "never", { "onlyEquality": true }],
    "strict": ["error", "function"],
    "arrow-parens": ["error", "always"],
    "arrow-body-style": ["error", "as-needed"],
    "jsx-quotes": ["error", "prefer-single"],
    "react/no-unused-prop-types": ["error", { "skipShapeProps": true }],
  },
  env: {
    browser: true,
    mocha: true,
  },
}
