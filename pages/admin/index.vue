<template>
  <div class="admin-page">
    <h1>Home</h1>
    <img src="https://keskidi.s3.eu-west-3.amazonaws.com/medias/wtf.png" alt="">
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import AdminModule from "~/store/admin";

@Component
export default class HomeAdmin extends Vue {
  public adminModule: AdminModule = getModule(AdminModule, this.$store)

  mounted()
  {
    this.adminModule.setBasicMenu()
  }

  layout()
  {
    return 'admin'
  }
}
</script>

<style scoped>

</style>
