module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    // Can I remove these now?
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      classes: true,
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-return-assign': ['error', 'except-parens'],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'no-undef': 0,
    'prefer-destructuring': 0,
    'no-console': 0,
    'linebreak-style': 'off',
    'import/newline-after-import': 0,
    'import/prefer-default-export': 0,
    import: 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'max-len': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'react/display-name': 1,
    'react/react-in-jsx-scope': 1,
    'react/prefer-stateless-function': 0,
    'react/no-unescaped-entities': 0,
    'react/require-default-props': 0,
    'react/state-in-constructor': 0,
    'react/jsx-uses-react': 1,
    'react/static-property-placement': 0,
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    radix: 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 80,
      },
    ],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': 0,
    'no-case-declarations': 0,
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    'react/prop-types': 0,
    camelcase: 'off',
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'default',
    //     format: ['camelCase'],
    //   },
    //   {
    //     selector: 'property',
    //     format: ['camelCase', 'snake_case', 'UPPER_CASE'],
    //   },
    //   {
    //     selector: 'variable',
    //     format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    //   },
    //   {
    //     selector: 'typeLike',
    //     format: ['PascalCase'],
    //   },
    // ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
