module.exports = {
  "extends": "airbnb",
  "rules": {
    "no-console": "off",
    "no-mixed-operators": "off",
    "no-bitwise": "off",
    "no-plusplus": "off",
    "no-continue": "off",
    "no-param-reassign": "off",
    "yoda": ["error", "never", { "onlyEquality": true }],
    "strict": ["error", "function"],
    "arrow-parens": ["error", "always"],
    "arrow-body-style": ["error", "as-needed"],
  },
  env: {
    node: true,
    browser: false,
    mocha: true,
  },
}
