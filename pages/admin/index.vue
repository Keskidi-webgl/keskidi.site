<template>
  <div class="admin-page">
    <h1>Home</h1>
    <img src="https://keskidi.s3.eu-west-3.amazonaws.com/medias/wtf.png" alt="">
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import AdminModule from "~/store/admin";
import AdminStore from "~/store/admin";

@Component
export default class HomeAdmin extends Vue {
  public adminStore: AdminModule = getModule(AdminStore, this.$store)

  mounted()
  {
    this.adminStore.setBasicMenu()
  }

  layout()
  {
    return 'admin'
  }
}
</script>

<style scoped>

</style>
