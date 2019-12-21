const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoEditorPlugin({
        languages: ['markdown'],
      }),
    ],
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
