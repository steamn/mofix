const path = require('path');
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          extensions: [
            '.js',
            '.ts',
            '.ios.js',
            '.ios.ts',
            '.android.js',
            '.android.ts',
            '.json',
            '.tsx',
          ],
          alias: {
            atoms: path.resolve(__dirname, './src/components/atoms'),
            molecules: path.resolve(__dirname, './src/components/molecules'),
            organisms: path.resolve(__dirname, './src/components/organisms'),
            templates: path.resolve(__dirname, './src/components/templates'),
            views: path.resolve(__dirname, './src/views'),
            context: path.resolve(__dirname, './src/context'),
            modules: path.resolve(__dirname, './src/modules/index.ts'),
            repositories: path.resolve(__dirname, './src/repositories'),
            services: path.resolve(__dirname, './src/services'),
            store: path.resolve(__dirname, './src/store'),
            icons: path.resolve(__dirname, './src/assets/icons'),
            theme: path.resolve(__dirname, './src/theme'),
            hooks: path.resolve(__dirname, './src/hooks'),
            lang: path.resolve(__dirname, './src/lang'),
            nav: path.resolve(__dirname, './src/views/navigation'),
            screens: path.resolve(__dirname, './src/screens'),
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: ['API_KEY', 'SECRET'],
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
