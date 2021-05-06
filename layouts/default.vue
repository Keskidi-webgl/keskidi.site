<template>
  <div>
    <div v-if="!isChrome" class="browser-check">
      <h1 class="main-font">
        Cette expérience ne fonctionne pas avec ce navigateur. <br />
        Merci d'utiliser Chrome.
      </h1>
    </div>

    <div v-if="isMobile" class="browser-check">
      <h1 class="main-font">
        Cette expérience ne fonctionne pas sur mobile. <br />
        Merci d'utiliser un ordinateur.
      </h1>
    </div>

    <div v-if="isChrome && !isMobile">
      <!-- Loader -->
      <Loader
        class="site-loader overlay-element"
        :loading-data="loadingProgressions"
      ></Loader>

      <audio
        ref="sound"
        class="ambient-sound"
        src="drill.mp3"
        autoplay
        style="display: none"
      ></audio>

      <sound @click.native="toggleSound"></sound>
      <!-- Progress level -->
      <SceneProgressLevel
        class="progress-level"
        v-if="authStore.isAuth && globalSceneStore.canDisplayGlobalUI"
      ></SceneProgressLevel>
      <!-- Logo -->
      <LogoMedia v-if="globalSceneStore.canDisplayGlobalUI" class="logo" />
      <!-- Global scene -->
      <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>
      <!-- Page Slot -->
      <Nuxt v-if="this.globalStore.isAppInit" />
      <!-- Navigation panel -->
      <SceneNavigationPanel
        v-if="
          (this.globalSceneStore.activeRoom ||
            this.globalSceneStore.activeObject) &&
            globalSceneStore.canDisplayGlobalUI
        "
      />
      <!-- Activity panel -->
      <ActivityPanel
        v-if="activityStore.canDisplayActivityPanel"
        class="activity-panel overlay-element"
      />

      <PreviewScene v-if="globalSceneStore.canDisplayGlobalUI" class="preview" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalStore from "~/store/global";
import AppInitializer from "~/core/utils/initializers/AppInitializer";
import SceneNavigationPanel from "~/components/scene/SceneNavigationPanel.vue";
import { AssetsManager, ProgressPercentManager } from "~/core/managers";
import { AssetManagerInitializer } from "~/core/utils/initializers";
import LogoMedia from "~/components/medias/LogoMedia.vue";

// Scene
import PreviewScene from "~/components/global/PreviewScene.vue";
import GlobalSceneStore from "~/store/globalScene";

// Auth
import AuthStore from "~/store/auth";

// Progress Level
import { Level } from "~/core/types";
import { Room } from "~/core/config/global-scene/rooms/types";
import ActivityOnboarding from "~/components/activities/ActivityOnboarding.vue";
import ActivityPanel from "~/components/activities/ActivityPanel.vue";
import ActivityStore from "~/store/activity";
import Sound from "~/components/sound/sound.vue";
import SceneProgressLevel from "~/components/scene/SceneProgressLevel.vue";

@Component({
  components: {
    Sound,
    SceneNavigationPanel,
    LogoMedia,
    ActivityOnboarding,
    ActivityPanel,
    SceneProgressLevel,
    PreviewScene
  }
})
export default class DefaultLayout extends Vue {
  public globalStore = getModule(GlobalStore, this.$store);
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public isLoaderVisible: boolean = true;
  public loadingProgressions: string = "";

  // Auth
  public authStore: AuthStore = getModule(AuthStore, this.$store);

  // Progress Level
  public progress: number = 0;
  public percent: number = 0;
  public level: Level | null = null;
  public words: number = 0;

  // Sound
  public sound: HTMLAudioElement | null = null;

  // Warnings
  public isChrome: boolean = navigator.userAgent.indexOf("Chrome") != -1;
  public isMobile: boolean =
    window.innerWidth <= 600 && window.innerHeight <= 800;

  public async mounted() {
    if (this.isChrome && !this.isMobile) {
      if (!this.globalStore.isSoundEnabled) {
        let bars = document.querySelectorAll(".sound-bar");
        let audio = this.$refs.sound as HTMLAudioElement;
        audio.pause();
        bars.forEach(item => {
          item.classList.remove("sound-barActive");
        });
      }
      await this.initApp();
    }
  }

  async initProgressLevel() {
    const userAchievedWords = this.globalStore.achievedWords.length;
    const words = this.globalStore.userWordData
      ? this.globalStore.userWordData!.length
      : 0;
    ProgressPercentManager.words = words;
    ProgressPercentManager.userAchievedWords = userAchievedWords;
    this.level = ProgressPercentManager.current;
    this.percent = ProgressPercentManager.percent;
    this.progress = userAchievedWords;
    this.words = words;
  }

  toggleSound() {
    // TODO --> refacto
    let audio = this.$refs.sound as HTMLAudioElement;
    let bars = document.querySelectorAll(".sound-bar");
    if (audio.paused) {
      audio.play();
      this.globalStore.setUserAudioPreferences(true);
      bars.forEach(item => {
        item.classList.add("sound-barActive");
      });
    } else {
      audio.pause();
      this.globalStore.setUserAudioPreferences(false);
      bars.forEach(item => {
        item.classList.remove("sound-barActive");
      });
    }
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
.browser-check {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background: linear-gradient(107.28deg, #ff6644 29.48%, #ff9d6f 100%);

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: $dark-blue;
    text-align: center;
  }
}

.progress-level {
  margin: 24px;
  position: absolute;
  z-index: 40;
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
}

.activity-onboarding {
}

.activity-panel {
}

.preview {
  z-index: 40;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 25px;
}
</style>
