export default{
    "root": true,
    "env": {
      "node": true
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
      "no-unused-vars": 0
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
}