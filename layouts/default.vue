<template>
  <div>
<<<<<<< HEAD
    <Loader class="site-loader" :loading-data="loadingProgressions"></Loader>
=======
    <LogoMedia class='logo' />
>>>>>>> b97bd665526bf135c3f2469382c7c20b0544a4dc
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
import {AssetsManager} from "~/core/managers";
import {AssetManagerInitializer} from "~/core/utils/initializers";
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
  public isLoaderVisible: boolean = true
  public loadingProgressions: string = ''

  public async mounted() {
    await this.initApp()
  }


  /**
   * Init app for the first connection
   */
  public async initApp() {
    if (!this.globalModule.isAppInit) {
      /* We need to download all asset before init app */
      new AssetManagerInitializer(null).init()
      await AssetsManager.onProgress((done, total) => {
        this.loadingProgressions = Math.floor(done / total * 100).toString()
      }).load()

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

.site-loader {
  position: fixed;
  z-index: 90;
  background: linear-gradient(180deg, #FCEEE6 0%, #EFDEDD 100%);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
