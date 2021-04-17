<template>
  <div>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
    <Nuxt v-if="this.globalModule.isAppInit"/>
    <SceneNavigationPanel v-if="this.sceneModule.activeRoom"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import GlobalModule from "~/store/global";
import AppInitializer from "~/core/utils/initializers/AppInitializer";
import SceneNavigationPanel from "~/components/scene/SceneNavigationPanel.vue";
import SceneModule from "~/store/scene";

@Component({
  components: {SceneNavigationPanel}
})
export default class DefaultLayout extends Vue {
  public globalModule = getModule(GlobalModule, this.$store)
  public sceneModule = getModule(SceneModule, this.$store)

  public async mounted() {
    await this.initApp()
  }

  /**
   * Init app for the first connection
   */
   public async initApp() {
    if (!this.globalModule.isAppInit) {

      await new AppInitializer({
        canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
        axios: this.$axios
      }).init()

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
