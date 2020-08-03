<template>
  <v-card id="sign-up">
    <v-card-title class="mb-0 pa-0">
      Sign Up
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

      <v-btn color="primary" @click="signUp">Register</v-btn>
      <v-btn text to="/sign-in">Sign In</v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { routeTo } from "@/utils";

@Component({})
export default class SignUpPage extends Vue {
  username = "";
  password = {
    value: "",
    isShow: false
  };
  validators = [(v: string) => !!v];

  async signUp() {
    const form = this.$refs.form as any;
    if (!form.validate()) return;

    const result = await this.$store.dispatch("signUp", {
      username: this.username,
      password: this.password.value
    });

    if (result) {
      return routeTo(this.$router, "/");
    }

    this.$store.dispatch("showSnackbar", {
      message: "Data is invalid",
      color: "error",
      isShow: true
    });
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

  * {
    margin: 0.5em;
  }
}
</style>
