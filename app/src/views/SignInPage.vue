<template>
  <v-card id="sign-in">
    <v-card-title class="mb-0 pa-0">
      Sign In
    </v-card-title>
    <v-form ref="form">
      <v-text-field
        prepend-inner-icon="mdi-account"
        v-model="username"
        label="Username"
        required
        :rules="validators"
      ></v-text-field>
      <v-text-field
        prepend-inner-icon="mdi-lock"
        v-model="password.value"
        type="password"
        label="Password"
        required
        :rules="validators"
      ></v-text-field>

      <v-btn color="primary" @click="signIn">Login</v-btn>
      <v-btn text to="/sign-up">Sign Up</v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { routeTo } from "@/utils";

@Component({})
export default class SignInPage extends Vue {
  username = "";
  password = {
    value: "",
    isShow: false
  };
  validators = [(v: string) => !!v];

  async signIn() {
    const form = this.$refs.form as any;
    if (!form.validate()) return;

    const result = await this.$store.dispatch("signIn", {
      username: this.username,
      password: this.password.value
    });

    if (result) {
      return routeTo(this.$router, "/");
    }

    this.$store.dispatch("showSnackbar", {
      message: "Data is invalid",
      color: "error"
    });
  }
}
</script>

<style lang="scss" scoped>
#sign-in {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 1em;

  display: flex;
  flex-direction: column;

  * {
    margin: 0.5em;
  }
}
</style>
