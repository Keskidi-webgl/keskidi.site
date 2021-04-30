<template>
  <div>
    <!-- Loader -->
    <Loader class="site-loader overlay-element" :loading-data="loadingProgressions"></Loader>
    <!-- Progress level -->
    <ProgressLevel
      class="progress-level"
      v-if="level"
      :stroke="4"
      :radius="170 / 2"
      :total="words"
      :progress="progress"
      :level="level.name"
    />
    <!-- Logo -->
    <LogoMedia class="logo" />
    <!-- Global scene -->
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
    <!-- Page Slot -->
    <Nuxt v-if="this.globalStore.isAppInit" />
    <!-- Navigation panel -->
    <SceneNavigationPanel v-if="this.globalSceneStore.activeRoom || this.globalSceneStore.activeObject"/>

    <!-- Activity onboarding -->
    <ActivityOnboarding class="activity-onboarding overlay-element"/>
    <!-- Activity panel -->
    <ActivityPanel class="activity-panel overlay-element"/>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalStore from "~/store/global";
import AppInitializer from "~/core/utils/initializers/AppInitializer";
import SceneNavigationPanel from "~/components/scene/SceneNavigationPanel.vue";
import { AssetsManager } from "~/core/managers";
import { AssetManagerInitializer } from "~/core/utils/initializers";
import LogoMedia from "~/components/medias/LogoMedia.vue";
import GlobalSceneStore from "~/store/globalScene";

// Auth
import AuthStore from "~/store/auth";

// Progress Level
import ProgressLevel from "~/components/activities/ProgressLevel.vue";
import { ProgressPercentManager } from "~/core/managers";
import { Level } from "~/core/types";
import ActivityOnboarding from "~/components/activities/ActivityOnboarding.vue";
import ActivityPanel from "~/components/activities/ActivityPanel.vue";

@Component({
  components: {
    SceneNavigationPanel,
    LogoMedia,
    ProgressLevel,
    ActivityOnboarding,
    ActivityPanel
  }
})
export default class DefaultLayout extends Vue {
  public globalStore = getModule(GlobalStore, this.$store);
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public isLoaderVisible: boolean = true;
  public loadingProgressions: string = "";

  // Auth
  public authStore: AuthStore = getModule(AuthStore, this.$store);

  // Progress Level
  public progress: number = 0;
  public percent: number = 0;
  public level: Level | null = null;
  public words: number = 0;

  public async mounted() {
    await this.initApp();
    if (this.globalStore.isAppInit && this.authStore.isAuth)
      await this.initProgressLevel();
  }

  async initProgressLevel() {
    const userAchievedWords = await this.globalStore.achievedWords.length;
    const words = this.globalStore.userWordData ? await this.globalStore.userWordData!.length : 0;
    ProgressPercentManager.words = words;
    ProgressPercentManager.userAchievedWords = userAchievedWords;
    this.level = ProgressPercentManager.current;
    this.percent = ProgressPercentManager.percent;
    this.progress = userAchievedWords;
    this.words = words;
  }

  /**
   * Init app for the first connection
   */
  public async initApp() {
    if (!this.globalStore.isAppInit) {
      /* We need to download all asset before init app */
      new AssetManagerInitializer(null).init();
      await AssetsManager.onProgress((done, total) => {
        this.loadingProgressions = Math.floor((done / total) * 100).toString();
      }).load();

      await new AppInitializer({
        canvas: this.$refs.canvasGlobalScene as HTMLCanvasElement,
        axios: this.$axios,
        globalSceneStore: this.globalSceneStore,
        globalStore: this.globalStore
      }).init();

      this.globalStore.setIsAppInit(true);
    }
  }
}
</script>

<style scoped lang="scss">
.progress-level {
  margin: 10px;
  position: absolute;
  z-index: 40;
  background: linear-gradient(107.28deg, #ff6644 29.48%, #ff9d6f 100%);
  border-radius: 50%;
}
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

.overlay-element {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 90;
}

.site-loader {
  background: linear-gradient(180deg, #fceee6 0%, #efdedd 100%);
}

.activity-onboarding {

}

.activity-panel {

}
</style>
