<template>
  <!-- renderedContent is sanitized -->
  <!-- eslint-disable vue/no-v-html -->
  <div
    id="markdown-editor-output"
    ref="markdownEditorOutput"
    v-scroll:#markdown-editor-output="onOutputScroll"
    class="overflow-auto"
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

const highlight = (str: string, lang: string): string => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch {
      return '';
    }
  }
  return '';
};

/**
 * Similar to GFM Sanitizing:
 * https://github.github.com/gfm/#disallowed-raw-html-extension-
 *
 * RegExr:
 * https://regexr.com/4rces
 */
const sanitize = (html: string) => html.replace(
  /<(?=\/?(?:title|textarea|style|xmp|iframe|noembed|noframes|script|plaintext)>)/giu,
  '&lt;',
);

@Component
export default class MarkdownEditorOutput extends Vue {
  $refs!: {
    markdownEditorOutput: HTMLElement;
  }

  get md() {
    return new MarkdownIt(
      this.$store.state.settings.parser.base,
      {
        ...this.$store.state.settings.parser.options,
        highlight,
      },
    );
  }

  get renderedContent(): string {
    return sanitize(
      this.md.render(this.$store.state.rawContent),
    );
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
  overflow-wrap: break-word;
  background: #1e1e1e;
}

</style>
