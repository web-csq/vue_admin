export default{
    "root": true,
    "env": {
      "node": true,
      "jquery": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {
      "no-console": [
        0,
        false
      ],
      'no-debugger':2,
      'indent': [2, 4],
      'no-spaced-func': 2,
      "semi": [2, "always"],
      "no-undef": 2,
      "no-unused-vars": 0
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
}