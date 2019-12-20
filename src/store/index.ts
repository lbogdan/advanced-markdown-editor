import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navigationDrawer: false,
    rawContent: '',
    MonacoEditor: null,
    editorScroll: 0,
  },
  mutations: {
    updateNavigationDrawer(state, value: boolean) {
      state.navigationDrawer = value;
    },
    updateRawContent(state, value: string) {
      state.rawContent = value;
    },
    updateMonacoEditor(state, value) {
      state.MonacoEditor = value;
    },
    updateEditorScroll(state, value: number) {
      state.editorScroll = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
