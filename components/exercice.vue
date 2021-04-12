<template>
  <h1>exercice component</h1>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import gsap from 'gsap'
import App from "~/core/app";
import Exercice from "~/store/exercice";

@Component
export default class exercice extends Vue {
  public app: App


  mounted(): void {
    console.log("exercice component")
  }
}
</script>

<style scoped>

</style>
