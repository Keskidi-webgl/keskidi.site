<template>
  <div>
    <pre>isAuth: {{authModule.isAuth}}</pre>
    <pre>token: {{authModule.token}}</pre>
    <pre>user: {{authModule.user}}</pre>

    <input v-model="dataForm.emailLogin" type="text" name="" id="">
    <button :disabled="authModule.isAuth" @click="login">Login</button>
    <br>
    <input v-model="dataForm.emailRegister" type="text" name="" id="">
    <button :disabled="authModule.isAuth" @click="register">Register</button>
    <button :disabled="!authModule.isAuth" @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">

import {Component, getModule, Vue} from "nuxt-property-decorator";
import AuthModule from "~/store/auth";

@Component
export default class PocAuth extends Vue {
  public authModule: AuthModule|null = null
  public TEST_EMAIL = 'dev@mail.com'

  public dataForm = {
    emailLogin: this.TEST_EMAIL,
    emailRegister: this.TEST_EMAIL
  };

  created() {
    this.authModule = getModule(AuthModule, this.$store)
  }

  public login() {
    this.authModule?.login({email: this.dataForm.emailLogin})
  }

  public register() {
    this.authModule?.register({email: this.dataForm.emailRegister})
  }

  public logout() {
    this.authModule?.logout()
  }


}

</script>
