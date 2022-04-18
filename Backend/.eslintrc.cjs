module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'import/extension': { js: 'always', json: 'never' },
    camelcase: { ignoreDestructuring: true },
    allowElseIf: true,
  },
};
