<template>
  <div id="markdown-editor-input">
    <MonacoEditor
      id="monaco-editor"
      ref="monacoEditor"
      v-model="rawContent"
      :options="monacoEditorOptions"
      theme="vs-dark"
    />
  </div>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import monaco from 'monaco-editor';

const MonacoEditor = require('vue-monaco').default;

@Component({
  components: {
    MonacoEditor,
  },
})
export default class MarkdownEditorInput extends Vue {
  monacoEditor: monaco.editor.ICodeEditor | null = null;

  monacoEditorOptions: monaco.editor.IEditorConstructionOptions = {
    language: 'markdown',
    scrollBeyondLastLine: false,
    wordWrap: 'on',
  };

  $refs!: {
    monacoEditor: typeof MonacoEditor;
  }

  get rawContent(): string {
    return this.$store.state.rawContent;
  }

  set rawContent(value: string) {
    this.$store.commit('updateRawContent', value);
  }

  get editorScroll(): number {
    return this.$store.state.editorScroll;
  }

  @Watch('editorScroll')
  onEditorScrollChanged(): void {
    if (this.monacoEditor === null) {
      return;
    }
    this.monacoEditor.setScrollTop(this.editorScroll);
  }

  mounted(): void {
    const { monacoEditor } = this.$refs;
    this.monacoEditor = monacoEditor.getEditor();
    this.$store.commit('updateMonacoEditor', monacoEditor);
    if (this.monacoEditor === null) {
      return;
    }
    this.monacoEditor.onDidScrollChange((): void => {
      this.$store.commit('updateEditorScroll', this.monacoEditor?.getScrollTop());
    });
  }
}

</script>


<style lang="scss" scoped>

#markdown-editor-input {
  height: 19em;
}

#monaco-editor {
  height: 100%;
  width: 100%;
}

</style>
