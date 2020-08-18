module.exports = {
  plugins: [
    'react',
  ],

  parserOptions: {
    "ecmaVersion": 2020,
    "sourceType": "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: 'eslint:recommended',
  rules: {
    eqeqeq: 'all',
    'no-undef': 'warn',
    // First, turn down some eslint:recommended rules
    'no-console': 'warn',
    'no-debugger': 'warn',
    // Allow while (true)
    'no-constant-condition': ['error', { checkLoops: false }],
    // Additional warnings
    'no-alert': 'warn',
    // Additional problems
    'array-callback-return': 'error',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'smart'],
    'no-caller': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-multi-str': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-useless-call': 'error',
    'no-useless-return': 'error',
    'no-with': 'error',
    'yoda': ['error', 'never', { onlyEquality: true }],
    'strict': 'error',
    'no-undef-init': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    // Node-specific problems
    'callback-return': 'error',
    'handle-callback-err': 'error',
    'no-buffer-constructor': 'error',
    'no-new-require': 'error',
    'no-path-concat': 'error',
    // ES2015+ specific problems
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    // Force esnext features
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-template': 'error',
    'prefer-spread': 'error',
    'prefer-rest-params': 'error',
    // https://github.com/eslint/eslint/issues/10482#issuecomment-397761810
    'no-restricted-properties': [
      'error',
      {
        object: 'Math',
        property: 'pow',
        message: 'Use the exponentiation operator (**) instead of Math.pow()',
      },
    ],
    'prefer-object-spread': 'error',
    'no-unused-vars': ['error', { caughtErrors: 'all' }],
    // NOTE: Very opinionated:
    'prefer-const': 'error',
  },
};
