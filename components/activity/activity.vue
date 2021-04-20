<template>
  <div class="activity">
    <h2 class="activity-title">S'enjailler</h2>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";

@Component({})
export default class activity extends Vue {

  public mounted() {
    console.log("eeeeeeee")
  }


}
</script>

<style lang="scss">
.activity{
  position: absolute;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: white;
  top: 0;
  transform: translateY(100%);
  &-title{
    font-size: 40px;
  }
}
</style>
