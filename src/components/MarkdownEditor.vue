<template>
  <div id="markdown-editor">
    <MarkdownEditorToolbar />
    <v-container class="v-footer--padless">
      <v-row>
        <v-col
          class="px-10 py-1"
          cols="6"
        >
          <MarkdownEditorInput />
        </v-col>
        <v-col
          class="px-10 py-1"
          cols="6"
        >
          <MarkdownEditorOutput />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';

import MarkdownEditorToolbar from '@/components/MarkdownEditorToolbar.vue';
import MarkdownEditorInput from '@/components/MarkdownEditorInput.vue';
import MarkdownEditorOutput from '@/components/MarkdownEditorOutput.vue';

@Component({
  components: {
    MarkdownEditorInput,
    MarkdownEditorOutput,
    MarkdownEditorToolbar,
  },
})
export default class MarkdownEditor extends Vue {
}

</script>
