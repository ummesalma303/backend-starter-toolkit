import eslint from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import prettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
    {
        ignores: ['dist', 'node_modules']
    },

    eslint.configs.recommended,

    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest
            }
        }
    },

    prettier,

    perfectionist.configs['recommended-natural'],

    {
        rules: {
            'no-console': 'warn'
        }
    },

    {
        files: ['**/*.test.js', '**/*.spec.js'],
        plugins: {
            vitest
        },
        rules: {
            ...vitest.configs.recommended.rules,
            '@typescript-eslint/unbound-method': 'off'
        }
    }
])
