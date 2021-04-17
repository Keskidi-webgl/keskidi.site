<template>
  <div>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
    <Nuxt v-if="this.globalModule.isAppInit"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import GlobalModule from "~/store/global";
import AppInitializer from "~/core/utils/AppInitializer";
import {SceneManager} from "~/core/managers";

@Component({})
export default class DefaultLayout extends Vue {
  public globalModule = getModule(GlobalModule, this.$store)

  public async mounted() {
    await this.initApp()
    console.log(SceneManager.GLOBAL_SCENE.scene)
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
  z-index: 3;
}
</style>
