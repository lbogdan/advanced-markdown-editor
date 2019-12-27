<template>
  <v-dialog
    v-model="settingsDialog"
    max-width="500px"
  >
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            icon
            v-on="{ ...tooltip, ...dialog }"
            @mousedown.prevent
          >
            <v-icon>mdi-settings</v-icon>
          </v-btn>
        </template>
        <span>Settings</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title class="justify-center">
        <span class="headline">Settings</span>
      </v-card-title>
      <v-card-text>
        <v-tabs
          centered
          grow
        >
          <v-tab>
            <v-icon left>
              mdi-markdown
            </v-icon>
            Parser
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-file-document-edit
            </v-icon>
            Editor
          </v-tab>
          <v-tab-item class="mt-4">
            <p class="subtitle-1">
              Options
            </p>
            <v-radio-group
              v-model="optionsType"
              row
            >
              <v-radio
                label="Preset"
                value="preset"
              />
              <v-radio
                label="Manual"
                value="manual"
              />
            </v-radio-group>
            <v-select
              v-if="optionsType === 'preset'"
              v-model="preset"
              :items="presetNames"
              label="Preset"
              filled
            />
            <v-row
              v-if="optionsType === 'manual'"
              class="mb-6"
            >
              <v-col>
                <v-btn
                  class="text-capitalize change-options-button"
                  rounded
                  @click="disableAllOptions"
                >
                  <v-icon left>
                    mdi-set-none
                  </v-icon>
                  Disable All
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  class="text-capitalize change-options-button"
                  rounded
                  @click="enableAllOptions"
                >
                  <v-icon left>
                    mdi-set-all
                  </v-icon>
                  Enable All
                </v-btn>
              </v-col>
            </v-row>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="simpleRenderingOption in simpleRenderingOptions"
                :key="simpleRenderingOption.alias"
              >
                <v-expansion-panel-header :class="{ 'v-expansion-panel--disabled': preset }">
                  <template #default="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4">
                        {{ simpleRenderingOption.name }}
                      </v-col>
                      <v-col
                        cols="8"
                        class="text--secondary"
                      >
                        <v-fade-transition leave-absolute>
                          <span
                            v-if="open"
                            key="0"
                          >
                            {{ simpleRenderingOption.description }}
                          </span>
                          <span
                            v-else
                            key="1"
                          >
                            {{ getStatus(simpleRenderingOption.value) }}
                          </span>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-switch
                    v-model="simpleRenderingOption.value"
                    :label="getStatus(simpleRenderingOption.value)"
                    :disabled="preset"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="settingsDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          @click="saveSettings"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

const getStatus = (bool: boolean): string => (bool ? 'Enabled' : 'Disabled');

interface SimpleRenderingOption {
  name: string;
  description: string;
  alias: 'html' | 'xhtmlOut' | 'breaks' | 'linkify' | 'typographer';
  value: boolean;
}

@Component
export default class TheSettingsDialog extends Vue {
  settingsDialog: boolean = false;

  optionsType: 'preset' | 'manual' = this.$store.state.settings.parser.type;

  preset: string | null = this.$store.state.settings.parser.preset;

  renderingPresets = new Map([
    [
      'CommonMark',
      {
        name: 'CommonMark',
        description: 'Follows the CommonMark Spec',
        alias: 'commonmark',
        base: 'commonmark',
        options: {
          html: true,
          xhtmlOut: true,
          breaks: false,
          linkify: false,
          typographer: false,
        },
      },
    ],
    [
      'Github Flavored Markdown',
      {
        name: 'Github Flavored Markdown',
        description: 'Follows the GitHub Flavored Markdown Spec',
        alias: 'gfm',
        base: 'default',
        options: {
          html: true,
          xhtmlOut: false,
          breaks: false,
          linkify: true,
          typographer: false,
        },
      },
    ],
  ]);

  simpleRenderingOptions: SimpleRenderingOption[] = [
    {
      name: 'HTML',
      description: 'Enable HTML tags in source',
      alias: 'html',
      value: this.$store.state.settings.parser.options.html,
    },
    {
      name: 'XHTML Out',
      description: 'Use "/" to close single tags (<br />)',
      alias: 'xhtmlOut',
      value: this.$store.state.settings.parser.options.xhtmlOut,
    },
    {
      name: 'Breaks',
      description: 'Convert Newlines ("\\n") in paragraphs into "<br>"',
      alias: 'breaks',
      value: this.$store.state.settings.parser.options.breaks,
    },
    {
      name: 'Linkify',
      description: 'Autoconvert URL-like texts to links',
      alias: 'linkify',
      value: this.$store.state.settings.parser.options.linkify,
    },
    {
      name: 'Typographer',
      description: 'Enable some language-neutral replacements + quotes beautification',
      alias: 'typographer',
      value: this.$store.state.settings.parser.options.typographer,
    },
  ];

  getStatus = getStatus;

  get presetNames() {
    return [...this.renderingPresets].map((preset) => preset[1].name);
  }

  @Watch('optionsType')
  onOptionsTypeChange(): void {
    if (this.optionsType === 'preset') {
      this.preset = 'CommonMark';
    } else {
      this.preset = null;
    }
  }

  @Watch('preset')
  onPresetChange(): void {
    if (this.preset === null) {
      return;
    }
    const renderingPreset = this.renderingPresets.get(this.preset);
    if (typeof renderingPreset === 'undefined') {
      return;
    }
    const { options } = renderingPreset;
    this.simpleRenderingOptions = this.simpleRenderingOptions.map((simpleRenderingOption) => ({
      ...simpleRenderingOption,
      value: options[simpleRenderingOption.alias],
    }));
  }

  enableAllOptions() {
    this.simpleRenderingOptions = this.simpleRenderingOptions.map((renderingOption) => ({
      ...renderingOption,
      value: true,
    }));
  }

  disableAllOptions() {
    this.simpleRenderingOptions = this.simpleRenderingOptions.map((renderingOption) => ({
      ...renderingOption,
      value: false,
    }));
  }

  saveSettings() {
    this.settingsDialog = false;

    const optionAliases = this.simpleRenderingOptions.map((option) => option.alias);
    const optionValues = this.simpleRenderingOptions.map((option) => option.value);
    const optionEntries = new Map(
      optionAliases.map((optionAlias, index) => [optionAlias, optionValues[index]]),
    );
    const settings = {
      parser: {
        type: this.optionsType,
        preset: this.preset,
        base: this.preset ? this.renderingPresets.get(this.preset)?.base : 'default',
        options: Object.fromEntries(optionEntries),
      },
    };
    this.$store.commit('updateSettings', settings);
  }
}

</script>


<style lang="scss" scoped>

.change-options-button {
  width: 100%;
}

</style>
