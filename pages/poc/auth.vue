<template>
  <div>
    <pre>isAuth: {{authModule.isAuth}}</pre>
    <pre>token: {{authModule.token}}</pre>

    <button :disabled="authModule.isAuth" @click="login">Login</button>
    <button @click="register">Register</button>
    <button :disabled="!authModule.isAuth" @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">

import {Component, getModule, Vue} from "nuxt-property-decorator";
import AuthModule from "~/store/auth";

@Component
export default class PocAuth extends Vue {
  public authModule: AuthModule|null = null

  created() {
    this.authModule = getModule(AuthModule, this.$store)
  }

  public login() {
    this.authModule?.login({email: 'toto@mail.ch'})
  }

  public register() {
    console.log('register')
    this.authModule?.register({email: 'toto@mail.ch'})
  }

  public logout() {
    this.authModule?.logout()
  }


}

</script>
