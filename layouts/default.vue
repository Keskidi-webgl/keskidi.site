<template>
  <div>
    <LogoMedia class='logo' />
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
import LogoMedia from "~/components/medias/LogoMedia.vue";

@Component({
  components: {
    SceneNavigationPanel,
    LogoMedia
  }
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
        axios: this.$axios,
        sceneModule: this.sceneModule,
        globalModule: this.globalModule
      }).init()

      this.globalModule.setIsAppInit(true)
    }
  }
}
</script>

<style scoped lang="scss">
.logo {
  width: 100px;
  margin-top: 10px;
  position: absolute;
  z-index: 40;
  left: 50%;
  transform: translate(-50%, 0px);
}
canvas {
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
