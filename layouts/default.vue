<template>
  <div>
    <Loader class="site-loader" :loading-data="loadingProgressions"></Loader>
    <button @click="toggleSound">toggle sound</button>
    <ProgressLevel
      class="progress-level"
      v-if="level"
      :stroke="4"
      :radius="170 / 2"
      :total="words"
      :progress="progress"
      :level="level.name"
    />
    <LogoMedia class="logo" />
    <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
    <Nuxt v-if="this.globalStore.isAppInit" />
    <SceneNavigationPanel
      v-if="
        this.globalSceneStore.activeRoom || this.globalSceneStore.activeObject
      "
    />
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

@Component({
  components: {
    SceneNavigationPanel,
    LogoMedia,
    ProgressLevel
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

  public sound: HTMLAudioElement | null = null

  public async mounted() {
    this.audio = new Audio('https://keskidi.s3.eu-west-3.amazonaws.com/medias/d7d119f1-5397-4f8b-860a-fa358ebba962.mp3');
    this.audio.play();
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

  toggleSound() {
    // if play alor spause
    // if pause alors play

    // this.globalStore.setUserAudioPreferences()
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

.site-loader {
  position: fixed;
  z-index: 90;
  background: linear-gradient(180deg, #fceee6 0%, #efdedd 100%);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
