<template>
  <v-tooltip bottom>
    <template #activator="{ on }">
      <v-btn
        id="format-button"
        icon
        v-on="on"
        @click="formatInput"
      >
        <v-icon>mdi-alpha-p-box-outline</v-icon>
      </v-btn>
    </template>
    <div class="text-center">
      Format with Prettier
      <br>
      (Shift + Alt + F)
    </div>
  </v-tooltip>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import prettier from 'prettier/standalone';
import prettierMarkdownParser from 'prettier/parser-markdown';


@Component
export default class MarkdownEditorFormatButton extends Vue {
  get rawContent(): string {
    return this.$store.state.rawContent;
  }

  set rawContent(value: string) {
    this.$store.commit('updateRawContent', value);
  }

  mounted(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.key === 'F') {
        e.preventDefault();
        this.formatInput();
      }
    });
  }

  formatInput(): void {
    this.rawContent = prettier.format(
      this.rawContent,
      {
        parser: 'markdown',
        plugins: [
          prettierMarkdownParser,
        ],
      },
    );
  }
}

</script>


<style lang="scss" scoped>

#format-button {
  position: absolute;
  left: 4em;
  top: 14em;
}

</style>
