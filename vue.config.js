/* eslint-disable no-param-reassign */

const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: (config) => {
    config.plugins.push(
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

  chainWebpack: (config) => {
    config.plugin('fork-ts-checker').tap((options) => {
      options[0].memoryLimit = 3072;
      return options;
    });
  },
};
