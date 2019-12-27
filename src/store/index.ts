import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const defaultSettings = {
  parser: {
    type: 'preset',
    preset: 'CommonMark',
    base: 'commonmark',
    options: {
      html: true,
      xhtmlOut: true,
      breaks: false,
      linkify: false,
      typographer: false,
    },
  },
};

interface StoreState {
  settings: typeof defaultSettings;
  navigationDrawer: boolean,
  rawContent: string,
  MonacoEditor: any,
  editorScroll: number,
}

const storeState: StoreState = {
  settings: defaultSettings,
  navigationDrawer: false,
  rawContent: '',
  MonacoEditor: null,
  editorScroll: 0,
};

const store = new Vuex.Store({
  state: storeState,
  mutations: {
    initializeSettings(state) {
      const settings = localStorage.getItem('settings');
      if (settings) {
        state.settings = JSON.parse(settings);
      } else {
        state.settings = defaultSettings;
      }
    },
    updateSettings(state, value) {
      state.settings = value;
    },
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

store.subscribe((mutation, state) => {
  if (mutation.type === 'updateSettings') {
    if (state.settings === null) {
      return;
    }
    localStorage.setItem('settings', JSON.stringify(state.settings));
  }
});

export default store;
