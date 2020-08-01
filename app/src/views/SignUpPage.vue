<template>
  <div id="sign-up">
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="signUp">Sign Up</button>

    <router-link to="/sign-in">Go to Sign In</router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class SignUpPage extends Vue {
  username = "";
  password = "";

  async signUp() {
    const result = await this.$store.dispatch("signUp", {
      username: this.username,
      password: this.password
    });

    if (result) this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
#sign-up {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 1em;

  display: flex;
  flex-direction: column;

  border: 2px solid black;

  * {
    margin: 0.5em;
  }
}
</style>
