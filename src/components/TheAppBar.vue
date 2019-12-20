<template>
  <v-app-bar
    id="app-bar"
    app
  >
    <v-tooltip bottom>
      <template #activator="{ on }">
        <v-app-bar-nav-icon
          v-on="on"
          @click="navigationDrawer = !navigationDrawer"
        />
      </template>
      <span>Navigation Drawer</span>
    </v-tooltip>
    <v-dialog
      v-if="currentRouteName === 'home'"
      v-model="uploadDialog"
      max-width="400px"
    >
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              icon
              v-on="{ ...tooltip, ...dialog }"
              @mousedown.prevent
            >
              <v-icon>mdi-file-upload</v-icon>
            </v-btn>
          </template>
          <span>Upload File</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Upload File</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="uploadForm"
            v-model="isUploadFormValid"
          >
            <v-file-input
              v-model="uploadedFile"
              label="Markdown File"
              accept=".md"
              :rules="uploadRules"
              chips
              filled
              clearable
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="uploadDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            :disabled="!isUploadFormValid"
            @click="uploadFile"
          >
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="currentRouteName === 'home'"
      v-model="downloadDialog"
      max-width="400px"
    >
      <template #activator="{ on: dialog }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              icon
              v-on="{ ...tooltip, ...dialog }"
              @mousedown.prevent
            >
              <v-icon>mdi-file-download</v-icon>
            </v-btn>
          </template>
          <span>Download File</span>
        </v-tooltip>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Download File</span>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="downloadForm"
          >
            <v-container class="pb-0">
              <v-row>
                <v-col
                  class="pb-0"
                  cols="9"
                >
                  <v-text-field
                    v-model="downloadFileName"
                    label="File Name"
                    placeholder="file"
                    filled
                    clearable
                  />
                </v-col>
                <v-col
                  class="pb-0"
                  cols="3"
                >
                  <v-text-field
                    label=".md"
                    disabled
                    filled
                    solo
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-col
            id="file-to-download-size"
            class="text-center pt-0 pb-6 font-weight-bold"
          >
            {{ fileToDownload.size }} byte(s)
          </v-col>
          <v-alert
            v-if="!rawContent"
            type="error"
            dense
            outlined
          >
            File cannot be empty
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="downloadDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            :disabled="!rawContent"
            @click="downloadFile"
          >
            Download
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar-title id="toolbar-title">
      Advanced Markdown Editor
    </v-toolbar-title>
    <div v-if="currentRouteName === 'home'">
      <v-btn
        v-for="n in 3"
        :key="n"
        style="visibility: hidden;"
        icon
      />
    </div>
    <v-btn
      v-if="currentRouteName === 'about'"
      style="visibility: hidden;"
      icon
    />
  </v-app-bar>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import FileSaver from 'file-saver';

interface FileWithText extends File {
  text(): string;
}

@Component
export default class TheAppBar extends Vue {
  uploadDialog: boolean = false;

  isUploadFormValid: boolean = false;

  uploadedFile: FileWithText | null = null;

  uploadRules = [(v: File) => !!v || 'Markdown File is required'];


  downloadDialog: boolean = false;

  downloadFileName: string = '';

  $refs!: {
    uploadForm: HTMLFormElement;
    downloadForm: HTMLFormElement;
  }

  get currentRouteName() {
    return this.$route.name;
  }

  get navigationDrawer(): boolean {
    return this.$store.state.navigationDrawer;
  }

  set navigationDrawer(value: boolean) {
    this.$store.commit('updateNavigationDrawer', value);
  }

  get rawContent(): string {
    return this.$store.state.rawContent;
  }

  get fileToDownload(): File {
    return new File([this.rawContent], `${this.downloadFileName || 'file'}.md`, {
      type: 'text/markdown;charset=utf-8',
    });
  }

  @Watch('uploadDialog')
  onUploadDialogChange(): void {
    this.$refs.uploadForm.reset();
  }

  @Watch('downloadDialog')
  onDownloadDialogChange(): void {
    this.$refs.downloadForm.reset();
  }

  mounted(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        this.downloadDialog = true;
      }
    });
  }

  async uploadFile(): Promise<void> {
    this.uploadDialog = false;
    const fileContent = await this.uploadedFile?.text();
    this.$store.commit('updateRawContent', fileContent);
  }

  downloadFile() {
    this.downloadDialog = false;
    FileSaver.saveAs(this.fileToDownload);
  }
}

</script>


<style lang="scss" scoped>

#toolbar-title {
  margin: auto;
}

#file-to-download-size {
  font-size: 16px;
}

</style>
