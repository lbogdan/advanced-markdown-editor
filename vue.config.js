/* eslint-disable no-param-reassign */

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: (config) => {
    // Get a reference to the existing ForkTsCheckerWebpackPlugin
    const existingForkTsChecker = config.plugins.filter(
      (p) => p instanceof ForkTsCheckerWebpackPlugin,
    )[0];

    // Remove the existing ForkTsCheckerWebpackPlugin
    config.plugins = config.plugins.filter(
      (p) => !(p instanceof ForkTsCheckerWebpackPlugin),
    );

    // Copy the options from the original ForkTsCheckerWebpackPlugin instance
    const forkTsCheckerOptions = (existingForkTsChecker && existingForkTsChecker.options) || {};

    // Increase memory limit
    forkTsCheckerOptions.memoryLimit = 3072;

    config.plugins.push(
      new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions),
      new MonacoEditorPlugin({
        languages: ['markdown'],
      }),
    );
  },
  pwa: {
    name: 'Advanced Markdown Editor',
  },

  transpileDependencies: [
    'vuetify',
  ],

  css: {
    sourceMap: true,
  },
};
