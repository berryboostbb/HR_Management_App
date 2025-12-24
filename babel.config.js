module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@components': './src/components',
          '@assets': './src/assets',
          '@services': './src/services',
          // '@redux': './src/redux',
          // '@api': './src/api',


        },
      },
    ],
   'react-native-worklets/plugin', 
  ],
};
