//
// @README:
// Turn on "Automatic ESLint configuration" under Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint.
//
module.exports = {
  extends: ['prettier'],
  root: true,
  env: {
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'max-len': ['error', 120],

    // сложно искать работу с частями ДТОшек
    'prefer-destructuring': ['off'],

    // варны и эрроры - ок
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],

    // проще ставить бряки если есть скобочки, пусть они и не нужны
    'arrow-body-style': ['off'],

    // можно полагаться на hoisting, а читать код проще "от общего к частному"
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],

    // просто переменные - error, аргументы в методе - норм.
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'no-unused-vars': ['error', { args: 'none' }],

    // неважно для приложений (но важно для библиотек - чтобы явно НЕ РАБОТАЛИ require)
    'import/prefer-default-export': ['off'],

    // мутировать куски переданных объектов - ок
    'no-param-reassign': ['error', { props: false }],

    // функции не всегда возвращают значение
    'consistent-return': ['off'],

    // не понял глубокого смысла этого правила...
    'object-curly-newline': ['off'],

    // не понял глубокого смысла этого правила...
    'no-await-in-loop': ['off'],

    // for of - вполне норм синтаксис
    'no-restricted-syntax': ['off'],

    // почему нельзя использовать continue в циклах? о_О
    'no-continue': ['off'],

    // while(true) break
    'no-constant-condition': ['off'],

    'class-methods-use-this': ['off'],

    // конфликт с prettier // поправил
    'operator-linebreak': ['error', 'before', { overrides: { '=': 'after', '||': 'after', '&&': 'after' } }],

    // переносы строк между атрибутами класса - дичь.
    '@typescript-eslint/lines-between-class-members': ['off'],

    // при генерировании исключения разрешает генерировать литералы и другие выражения, которые могут быть не Error объектом.
    '@typescript-eslint/no-throw-literal': ['off'],

    // именование enum'ов в UPPER case
    '@typescript-eslint/naming-convention': ['off'],
  },
  overrides: [
    {
      files: ['*.ts'],

      rules: {
        '@typescript-eslint/no-unnecessary-condition': ['error'],
      },

      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
