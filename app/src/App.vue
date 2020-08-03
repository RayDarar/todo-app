<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-snackbar
      absolute
      bottom
      right
      v-model="snackbar.isShow"
      :color="snackbar.color"
    >
      <span class="pa-1">{{ snackbar.message }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="closeSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { routeTo } from "@/utils";

@Component({})
export default class App extends Vue {
  async created() {
    const result = await this.$store.dispatch("validateToken");

    if (!result) {
      return routeTo(this.$router, "/sign-in");
    }

    await this.$store.dispatch("fetchUser");
    routeTo(this.$router, "/");
  }

  closeSnackbar() {
    this.$store.dispatch("showSnackbar", {
      message: "",
      isShow: false
    });
  }
  get snackbar() {
    return this.$store.state.snackbar;
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
</style>
