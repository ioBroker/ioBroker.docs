import config from '@iobroker/eslint-config';

export default [
    ...config,
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.mjs'],
                },
                tsconfigRootDir: import.meta.dirname,
                // project: './tsconfig.json',
            },
        },
    },
    {
        ignores: [
            'src-admin/**/*',
            'admin/**/*',
            'node_modules/**/*',
            'test/**/*',
            'build/**/*',
            'tmp/**/*',
            '.**/*',
        ],
    },
    {
        // The TypeScript rules of @iobroker/eslint-config are only applied to "**/*.ts" and "**/*.tsx",
        // so the same JSDoc settings must be repeated for the build scripts in "*.mts".
        files: ['**/*.mts'],
        rules: {
            'jsdoc/require-returns': 'off',
            'jsdoc/tag-lines': ['error', 'never', { startLines: 1 }],
        },
    },
    {
        // disable temporary the rule 'jsdoc/require-param' and enable 'jsdoc/require-jsdoc'
        rules: {
            'jsdoc/require-jsdoc': 'off',
            'jsdoc/require-param': 'off',

            '@typescript-eslint/no-require-imports': 'off',
        },
    },
];
