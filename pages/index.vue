<template>
  <div class="container">
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import AuthModule from "~/store/auth";
import ApiManager from "~/core/managers/ApiManager";

@Component
export default class Home extends Vue {
  public message: string = 'Work in progress'
  public icon: string = '🚧'
  public authModule!: AuthModule | null;

  public created() {
    // We can retrieve store module like that :
    this.authModule = getModule(AuthModule, this.$store)
  }

  public mounted() {
    this.initApiManager()
  }

  public initApiManager() {
    ApiManager.setAxios(this.$axios)
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
span {
  font-size: 80px;
  display: block;
}
</style>
