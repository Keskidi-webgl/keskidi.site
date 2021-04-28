<template>
  <div>
    <Loader class="site-loader" :loading-data="loadingProgressions"></Loader>
    <LogoMedia class='logo'/>
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
    <Nuxt v-if="this.globalStore.isAppInit"/>
    <SceneNavigationPanel v-if="this.globalSceneStore.activeRoom"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import GlobalStore from "~/store/global";
import AppInitializer from "~/core/utils/initializers/AppInitializer";
import SceneNavigationPanel from "~/components/scene/SceneNavigationPanel.vue";
import {AssetsManager} from "~/core/managers";
import {AssetManagerInitializer} from "~/core/utils/initializers";
import LogoMedia from "~/components/medias/LogoMedia.vue";
import GlobalSceneStore from "~/store/globalScene";

@Component({
  components: {
    SceneNavigationPanel,
    LogoMedia
  }
})
export default class DefaultLayout extends Vue {
  public globalStore = getModule(GlobalStore, this.$store)
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public isLoaderVisible: boolean = true
  public loadingProgressions: string = ''

  public async mounted() {
    await this.initApp()
  }


  /**
   * Init app for the first connection
   */
  public async initApp() {
    if (!this.globalStore.isAppInit) {
      /* We need to download all asset before init app */
      new AssetManagerInitializer(null).init()
      await AssetsManager.onProgress((done, total) => {
        this.loadingProgressions = Math.floor(done / total * 100).toString()
      }).load()

      await new AppInitializer({
        canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
        axios: this.$axios,
        globalSceneStore: this.globalSceneStore,
        globalStore: this.globalStore
      }).init()

      this.globalStore.setIsAppInit(true)
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
