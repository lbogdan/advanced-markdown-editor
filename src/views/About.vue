<template>
  <div id="about">
    <v-container id="about-container">
      <v-row
        class="mb-1"
        align-content="center"
      >
        <h1>About</h1>
      </v-row>
      <v-row align-content="center">
        <v-col
          id="about-content"
          class="grey darken-3 elevation-2"
        >
          <h3>Features</h3>
          <ul>
            <li>Advanced Markdown Editor</li>
            <li>
              Markdown Formatting with
              <a
                href="https://prettier.io/"
                target="_blank"
              >
                Prettier
              </a>
            </li>
            <li>Markdown Preview</li>
            <li>Toolbar for inserting Markdown Elements</li>
            <li>Upload / Download Files</li>
            <li>Highly Configurable Parser</li>
          </ul>
          <h3>Technical Details</h3>
          <ul>
            <li>
              The Website is built using
              <a
                href="https://vuejs.org/"
                target="_blank"
              >
                Vue.js
              </a>
              and
              <a
                href="https://vuetifyjs.com/en/"
                target="_blank"
              >
                Vuetify
              </a>
            </li>
            <li>
              The Website is deployed on
              <a
                href="https://www.netlify.com/"
                target="_blank"
              >
                Netlify
              </a>
            </li>
            <li>
              The Editor uses the
              <a
                href="https://microsoft.github.io/monaco-editor/index.html"
                target="_blank"
              >
                Monaco Editor
              </a>
            </li>
            <li>
              The Markdown Content is rendered by
              <a
                href="https://github.com/markdown-it/markdown-it"
                target="_blank"
              >
                markdown-it
              </a>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class About extends Vue {
}

</script>


<style lang="scss" scoped>

#about-container {
  width: 40%;
}

h1 {
  margin: auto;
}

a {
  color: #29B6F6;
}

</style>
