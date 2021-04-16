<template>
  <div>
    <Nuxt/>
    <canvas ref="canvasGlobalScene"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import GlobalModule from "~/store/global";
import AppInitializer from "~/core/utils/AppInitializer";

@Component({})
export default class DefaultLayout extends Vue {
  public globalModule = getModule(GlobalModule, this.$store)

  public mounted() {
    this.initApp()
  }

  /**
   * Init app for the first connection
   */
   public async initApp() {
    if (!this.globalModule.isAppInit) {

      AppInitializer.initApiManager(this.$axios)
      await AppInitializer.initAssetsManager()
      AppInitializer.createGlobalScene(this.$refs.canvasGlobalScene as HTMLCanvasElement)

      this.globalModule.setIsAppInit(true)
    }
  }
}
</script>

<style>
canvas
{
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
