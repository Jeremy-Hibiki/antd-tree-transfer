import antfu from '@antfu/eslint-config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default antfu(
  {
    stylistic: false,
    react: true,
    type: 'lib',
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
  },
  { name: 'prettier', ...eslintPluginPrettierRecommended },
)
  .renamePlugins({
    react: 'react',
  })
  .overrideRules({
    'prettier/prettier': 'warn',
    'perfectionist/sort-imports': [
      'error',
      {
        groups: [
          'type',
          ['builtin', 'external'],
          ['internal-type', 'parent-type', 'sibling-type', 'index-type'],
          ['internal', 'parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        tsconfigRootDir: __dirname,
      },
    ],
  });
