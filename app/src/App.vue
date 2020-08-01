<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {
  async created() {
    const result = await this.$store.dispatch("validateToken");

    if (!result) this.$router.push("/sign-in");
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

#app {
  height: 100vh;
}
</style>
