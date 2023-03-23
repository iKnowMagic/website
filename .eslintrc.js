module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:sonarjs/recommended',
    'plugin:vue/vue3-recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['sonarjs', 'vue', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off'
  }
}
