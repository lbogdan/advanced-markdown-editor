<template>
  <v-footer
    app
    absolute
    padless
  >
    <v-spacer />
    <v-col class="text-center v-footer--padless">
      Copyright &copy; {{ new Date().getFullYear() }}
      <a
        class="white--text"
        href="https://github.com/paul-soporan"
        target="_blank"
      >
        <strong>Paul Soporan</strong>
      </a>
    </v-col>
    <v-col class="text-center v-footer--padless">
      Released under the
      <a
        class="white--text"
        href="https://github.com/paul-soporan/advanced-markdown-editor/blob/master/LICENSE"
        target="_blank"
      >
        <strong>MIT License</strong>
      </a>
    </v-col>
    <v-spacer />
  </v-footer>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class TheFooter extends Vue {
}

</script>
