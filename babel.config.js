/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@src': './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
