module.exports = {
  printWidth: 79, // forces one-liners for everything less than x chars long
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'avoid',
  proseWrap: 'never',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  htmlFormatWrapAttributes: 'auto',
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue'
      }
    }
  ]
}
