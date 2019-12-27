<template>
  <v-app id="app">
    <TheNavigationDrawer />
    <TheAppBar />
    <v-content>
      <router-view />
    </v-content>
    <TheFooter />
  </v-app>
</template>


<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';

import TheNavigationDrawer from '@/components/TheNavigationDrawer.vue';
import TheAppBar from '@/components/TheAppBar.vue';
import TheFooter from '@/components/TheFooter.vue';

@Component({
  components: {
    TheNavigationDrawer,
    TheAppBar,
    TheFooter,
  },
})
export default class App extends Vue {
  beforeCreate() {
    this.$store.commit('initializeSettings');
  }
}

</script>


<style lang="scss">

* {
  padding: 0;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

a {
  text-decoration: none;
}

</style>
