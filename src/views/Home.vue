<template>
  <div id="home">
    <MarkdownEditor />
  </div>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';

import MarkdownEditor from '@/components/MarkdownEditor.vue';

@Component({
  components: {
    MarkdownEditor,
  },
})
export default class Home extends Vue {
}

</script>
