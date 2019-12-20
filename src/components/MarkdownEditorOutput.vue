<template>
  <!-- renderedContent is sanitized by markdown-it -->
  <!-- eslint-disable vue/no-v-html -->
  <div
    id="markdown-editor-output"
    ref="markdownEditorOutput"
    v-scroll:#markdown-editor-output="onOutputScroll"
    v-html="renderedContent"
  />
  <!-- eslint-enable -->
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const md = new MarkdownIt({
  breaks: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch {
        return '';
      }
    }
    return '';
  },
});

@Component
export default class MarkdownEditorOutput extends Vue {
  $refs!: {
    markdownEditorOutput: HTMLElement;
  }

  get renderedContent(): string {
    return md.render(this.$store.state.rawContent);
  }

  get editorScroll(): number {
    return this.$store.state.editorScroll;
  }

  @Watch('editorScroll')
  onEditorScrollChange(): void {
    this.$refs.markdownEditorOutput.scrollTop = this.editorScroll;
  }

  onOutputScroll(e: Event): void {
    const editorOutputDiv = e.target as HTMLElement;
    this.$store.commit('updateEditorScroll', editorOutputDiv.scrollTop);
  }
}

</script>


<style lang="scss" scoped>

#markdown-editor-output {
  height: 19em;
  padding: 0.5em;
  overflow: auto;
  overflow-wrap: break-word;
  background: #1e1e1e;
}

</style>
