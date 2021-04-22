<template>
  <div class="admin-page">
    <h1>Page for word ...</h1>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import AdminModule from "~/store/admin";

@Component({})
export default class WordPage extends Vue {
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
