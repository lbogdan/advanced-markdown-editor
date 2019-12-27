<template>
  <v-toolbar
    id="markdown-editor-toolbar"
    class="grey darken-4"
  >
    <v-toolbar-items id="toolbar-items">
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('h1')"
            @mousedown.prevent
          >
            <b>h1</b>
          </v-btn>
        </template>
        <span>Heading 1</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('h2')"
            @mousedown.prevent
          >
            <b>h2</b>
          </v-btn>
        </template>
        <span>Heading 2</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('h3')"
            @mousedown.prevent
          >
            <b>h3</b>
          </v-btn>
        </template>
        <span>Heading 3</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('h4')"
            @mousedown.prevent
          >
            <b>h4</b>
          </v-btn>
        </template>
        <span>Heading 4</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('h5')"
            @mousedown.prevent
          >
            <b>h5</b>
          </v-btn>
        </template>
        <span>Heading 5</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('h6')"
            @mousedown.prevent
          >
            <b>h6</b>
          </v-btn>
        </template>
        <span>Heading 6</span>
      </v-tooltip>
      <v-dialog
        v-model="linkDialog"
        max-width="400px"
      >
        <template #activator="{ on: dialog }">
          <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
              <v-btn
                text
                v-on="{ ...tooltip, ...dialog }"
                @mousedown.prevent
              >
                <v-icon>mdi-link-variant</v-icon>
              </v-btn>
            </template>
            <span>Link</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Insert Link</span>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="linkForm"
              v-model="isLinkFormValid"
            >
              <v-text-field
                v-model="linkText"
                label="Link Text"
                :rules="linkTextRules"
                filled
                clearable
              />
              <v-text-field
                v-model="linkUrl"
                label="Link URL"
                :rules="linkUrlRules"
                filled
                clearable
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="linkDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              :disabled="!isLinkFormValid"
              @click="insertElement('link')"
            >
              Insert
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="imageDialog"
        max-width="400px"
      >
        <template #activator="{ on: dialog }">
          <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
              <v-btn
                text
                v-on="{ ...tooltip, ...dialog }"
                @mousedown.prevent
              >
                <v-icon>mdi-image</v-icon>
              </v-btn>
            </template>
            <span>Image</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Insert Image</span>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="imageForm"
              v-model="isImageFormValid"
            >
              <v-text-field
                v-model="imageSource"
                label="Image URL / Path"
                :rules="imageSourceRules"
                filled
                clearable
              />
              <v-text-field
                v-model="imageAltText"
                label="Alt Text"
                :rules="imageAltTextRules"
                filled
                clearable
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="imageDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              :disabled="!isImageFormValid"
              @click="insertElement('image')"
            >
              Insert
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('bold')"
            @mousedown.prevent
          >
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>
        </template>
        <span>Bold</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('italic')"
            @mousedown.prevent
          >
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>
        </template>
        <span>Italic</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('strikethrough')"
            @mousedown.prevent
          >
            <v-icon>mdi-format-strikethrough-variant</v-icon>
          </v-btn>
        </template>
        <span>Strikethrough</span>
      </v-tooltip>
      <v-dialog
        v-model="codeDialog"
        max-width="400px"
      >
        <template #activator="{ on: dialog }">
          <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
              <v-btn
                text
                v-on="{ ...tooltip, ...dialog }"
                @mousedown.prevent
              >
                <v-icon>mdi-code-tags</v-icon>
              </v-btn>
            </template>
            <span>Code</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Insert Code</span>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="codeForm"
              v-model="isCodeFormValid"
            >
              <v-select
                v-model="codeType"
                :items="['Inline', 'Block']"
                :rules="codeTypeRules"
                label="Type"
                filled
              />
              <v-autocomplete
                v-if="codeType === 'Block'"
                v-model="codeBlockLanguage"
                :items="languages"
                :rules="codeBlockLanguageRules"
                label="Language"
                filled
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="codeDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              :disabled="!isCodeFormValid"
              @click="insertElement('code')"
            >
              Insert
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('unordered-list')"
            @mousedown.prevent
          >
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-btn>
        </template>
        <span>Unordered List</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('ordered-list')"
            @mousedown.prevent
          >
            <v-icon>mdi-format-list-numbered</v-icon>
          </v-btn>
        </template>
        <span>Ordered List</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('blockquote')"
            @mousedown.prevent
          >
            <v-icon>mdi-format-quote-open</v-icon>
          </v-btn>
        </template>
        <span>Blockquote</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            text
            v-on="on"
            @click="insertElement('horizontal-rule')"
            @mousedown.prevent
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
        <span>Horizontal Rule</span>
      </v-tooltip>
    </v-toolbar-items>
  </v-toolbar>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import monaco from 'monaco-editor';
import rp from 'request-promise';
import yaml from 'js-yaml';

@Component
export default class MarkdownEditorToolbar extends Vue {
  linkDialog: boolean = false;

  isLinkFormValid: boolean = false;

  linkText: string = '';

  linkUrl: string = '';

  linkTextRules = [(v: string) => !!v || 'Link Text is required'];

  linkUrlRules = [(v: string) => !!v || 'Link URL is required'];


  imageDialog: boolean = false;

  isImageFormValid: boolean = false;

  imageSource: string = '';

  imageAltText: string = '';

  imageSourceRules = [(v: string) => !!v || 'Image URL / Path is required'];

  imageAltTextRules = [(v: string) => !!v || 'Alt Text is required'];

  codeDialog: boolean = false;

  isCodeFormValid: boolean = false;

  codeType: '' | 'Inline' | 'Block' = '';

  languages: any[] = [{
    text: 'None',
    value: 'none',
  }];

  codeBlockLanguage: string = '';

  codeTypeRules = [(v: string) => !!v || 'Code Type is required'];

  codeBlockLanguageRules = [(v: string) => !!v || 'Code Language is required'];

  $refs!: {
    linkForm: HTMLFormElement;
    imageForm: HTMLFormElement;
    codeForm: HTMLFormElement;
  }

  get monacoEditor(): monaco.editor.ICodeEditor {
    return this.$store.state.MonacoEditor.getEditor();
  }

  @Watch('linkDialog')
  onLinkDialogChange(): void {
    this.$refs.linkForm.reset();
  }

  @Watch('imageDialog')
  onImageDialogChange(): void {
    this.$refs.imageForm.reset();
  }

  @Watch('codeDialog')
  onCodeDialogChange(): void {
    this.$refs.codeForm.reset();
  }

  async created(): Promise<void> {
    const languagesYaml = await rp.get('https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml');
    const languages = yaml.safeLoad(languagesYaml);
    const names: string[] = Object.keys(languages);
    const aliases: string[] = Object.values(languages)
      .map(((language: any, index) => language?.aliases?.[0] ?? names[index].toLowerCase()));
    const entries = new Map(
      names.map((name, index) => [name, aliases[index]]),
    );
    entries.forEach((alias, language) => {
      this.languages.push({
        text: language,
        value: alias,
      });
    });
  }

  insertElement(element: string): void {
    let stringToInsert: string;
    const editorSelection = this.monacoEditor.getSelection();

    if (editorSelection === null) {
      return;
    }

    let newSelectionLineNumber: number = editorSelection.selectionStartLineNumber;
    let newSelectionColumn: number = editorSelection.selectionStartColumn;

    switch (element) {
      case 'h1':
        stringToInsert = '# ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'h2':
        stringToInsert = '## ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'h3':
        stringToInsert = '### ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'h4':
        stringToInsert = '#### ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'h5':
        stringToInsert = '##### ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'h6':
        stringToInsert = '###### ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'link':
        this.linkDialog = false;
        stringToInsert = `[${this.linkText}](${this.linkUrl})`;
        newSelectionColumn += stringToInsert.length;
        break;
      case 'image':
        this.imageDialog = false;
        stringToInsert = `![${this.imageAltText}](${this.imageSource})`;
        newSelectionColumn += stringToInsert.length;
        break;
      case 'bold':
        stringToInsert = '****';
        newSelectionColumn += stringToInsert.length / 2;
        break;
      case 'italic':
        stringToInsert = '__';
        newSelectionColumn += stringToInsert.length / 2;
        break;
      case 'strikethrough':
        stringToInsert = '~~~~';
        newSelectionColumn += stringToInsert.length / 2;
        break;
      case 'code':
        this.codeDialog = false;
        if (this.codeType === 'Inline') {
          stringToInsert = '``';
          newSelectionColumn += stringToInsert.length / 2;
        } else if (this.codeType === 'Block') {
          if (this.codeBlockLanguage === 'none') {
            this.codeBlockLanguage = '';
          }
          stringToInsert = `\`\`\`${this.codeBlockLanguage}\n\n\`\`\``;
          newSelectionLineNumber += 1;
          newSelectionColumn = 0;
        } else {
          stringToInsert = '';
        }
        break;
      case 'unordered-list':
        stringToInsert = '* ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'ordered-list':
        stringToInsert = '1. ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'blockquote':
        stringToInsert = '> ';
        newSelectionColumn += stringToInsert.length;
        break;
      case 'horizontal-rule':
        stringToInsert = '***\n';
        newSelectionLineNumber += 1;
        newSelectionColumn += stringToInsert.length;
        break;
      default:
        stringToInsert = '';
    }
    const edit: monaco.editor.IIdentifiedSingleEditOperation = {
      text: stringToInsert,
      range: editorSelection,
      forceMoveMarkers: true,
    };
    this.monacoEditor.executeEdits('insert-element', [edit]);
    this.monacoEditor.setSelection({
      startLineNumber: newSelectionLineNumber,
      endLineNumber: newSelectionLineNumber,
      startColumn: newSelectionColumn,
      endColumn: newSelectionColumn,
    });
    // Focus the editor after all synchronous operations have completed
    setTimeout(
      () => {
        this.monacoEditor.focus();
      },
      0,
    );
  }
}

</script>


<style lang="scss" scoped>

#markdown-editor-toolbar {
  margin-bottom: 1em;
}

#toolbar-items {
  margin: auto;
}

</style>
