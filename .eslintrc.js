module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    extends: [
        'airbnb',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        project: './tsconfig.json',
    },
    env: {
        es6: true,
        browser: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.ts', '.tsx'] }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
    },
    overrides: [],
};
