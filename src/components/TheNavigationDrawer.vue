<template>
  <v-navigation-drawer
    v-model="navigationDrawer"
    app
    clipped
  >
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="navigationItem in navigationItems"
        :key="navigationItem.title"
        link
        :to="navigationItem.to"
      >
        <v-list-item-icon>
          <v-icon>{{ navigationItem.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ navigationItem.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class TheNavigationDrawer extends Vue {
  navigationItems = [
    {
      title: 'Home',
      icon: 'mdi-home',
      to: '/',
    },
    {
      title: 'About',
      icon: 'mdi-help-box',
      to: '/about',
    },
  ];

  get navigationDrawer(): boolean {
    return this.$store.state.navigationDrawer;
  }

  set navigationDrawer(value: boolean) {
    this.$store.commit('updateNavigationDrawer', value);
  }
}

</script>
