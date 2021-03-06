<template>
  <div>
    <!-- Warnings -->
    <div v-if="!isChrome" class="browser-check">
      <LogoMedia class="logo" />
      <h1 class="main-font">
        Tu utilises un navigateur de <strong>boomer</strong> !<br />
        Tu peux télécharger
        <a
          target="blank"
          href="https://www.google.fr/chrome/?brand=ONGR&gclid=e047a85627d719f37291c8c13c0ddab5&gclsrc=3p.ds&utm_source=bing&utm_medium=cpc&utm_campaign=1009936%20%7C%20Chrome%20Win10%20%7C%20DR%20%7C%20ESS01%20%7C%20EMEA%20%7C%20FR%20%7C%20fr%20%7C%20Desk%20%7C%20SEM%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20Top%20KWDS&utm_term=chrome&utm_content=Desk%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20Chrome%20~%20Top%20KWDS%20-%20NEW"
          >Google Chrome</a
        >
        pour pouvoir participer à notre expérience.
      </h1>
    </div>
    <div v-if="isMobile" class="browser-check mobile">
      <LogoMedia class="logo" />
      <h1 class="main-font">
        Un vrai <strong>boomer</strong> se doit d'utiliser un ordinateur !
        <br /><br />
        Tu peux aller sur un <span>ordinateur</span> pour pouvoir participer à
        notre expérience.
      </h1>
    </div>
    <!--
    <div v-if="isChrome && !isMobile">
    -->
    <div>
      <!-- Loader -->
      <transition v-on:enter="animEnterLoader">
        <Loader
          v-if="canDisplayLoader"
          class="site-loader overlay-element"
          :loading-data="loadingProgressions"
        ></Loader>
      </transition>

      <!-- Progress level -->
      <SoundButton
        v-if="globalSceneStore.canDisplayGlobalUI"
        @mouseenter.native="soundDesign.audioBtnEnter"
        @mouseleave.native="soundDesign.audioBtnLeave"
      >
      </SoundButton>

      <!-- Progress level -->
      <ProgressLevel
        class="progress-level"
        v-if="authStore.isAuth && globalSceneStore.canDisplayGlobalUI"
        @mouseenter.native="soundDesign.progressLevelEnter"
        @mouseleave.native="soundDesign.progressLevelLeave()"
      />

      <!-- Logo -->
      <LogoMedia v-if="globalSceneStore.canDisplayGlobalUI" class="logo" />

      <!-- About page -->
      <div class="actions-button">
        <div
          v-if="globalSceneStore.canDisplayGlobalUI && authStore.isAuth"
          class="logout-btn"
          @click="logout"
        >
          <div
            @mouseenter="soundDesign.aboutEnter"
            @mouseleave="soundDesign.aboutLeave"
          >
            <p class="point-name main-font">Se déconnecter</p>
          </div>
        </div>
        <nuxt-link
          v-if="globalSceneStore.canDisplayGlobalUI"
          to="/about"
          class="about-btn"
        >
          <div
            @mouseenter="soundDesign.aboutEnter"
            @mouseleave="soundDesign.aboutLeave"
          >
            <p class="point-name main-font">À propos</p>
          </div>
        </nuxt-link>
      </div>

      <!-- Global scene -->
      <canvas id="canvasGlobalScene" ref="canvasGlobalScene"></canvas>

      <!-- Page Slot -->
      <Nuxt v-if="this.globalStore.isAppInit" />

      <!-- Navigation panel -->
      <transition
        v-on:enter="animEnterNavigationPanel"
        v-on:leave="animLeaveNavigationPanel"
      >
        <SceneNavigationPanel
          v-if="
            (this.globalSceneStore.activeRoom ||
              this.globalSceneStore.activeObject) &&
              globalSceneStore.canDisplayGlobalUI
          "
        />
      </transition>

      <!-- Activity panel -->
      <transition v-on:leave="onLeaveAnimationActivityPanel">
        <ActivityPanel
          v-if="activityStore.canDisplayActivityPanel"
          class="activity-panel overlay-element"
        />
      </transition>

      <PreviewScene
        v-if="globalSceneStore.canDisplayGlobalUI"
        class="preview"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalStore from "~/store/global";
import AppInitializer from "~/core/utils/initializers/AppInitializer";
import SceneNavigationPanel from "~/components/scene/SceneNavigationPanel.vue";
import { AssetsManager, SoundDesignManager } from "~/core/managers";
import { AssetManagerInitializer } from "~/core/utils/initializers";
import LogoMedia from "~/components/medias/LogoMedia.vue";
import gsap from "gsap";

// Scene
import PreviewScene from "~/components/global/PreviewScene.vue";
import GlobalSceneStore from "~/store/globalScene";
import CustomButton from "~/components/buttons/CustomButton.vue";

// Auth
import AuthStore from "~/store/auth";

// Progress Level
import ProgressLevel from "~/components/global/ProgressLevel.vue";

// Activities
import ActivityOnboarding from "~/components/activities/ActivityOnboarding.vue";
import ActivityPanel from "~/components/activities/ActivityPanel.vue";
import ActivityStore from "~/store/activity";
import SoundButton from "~/components/global/SoundButton.vue";
import { LoaderAnimation } from "~/core/animations/loader";
import { NavigationPanelAnimation } from "~/core/animations/activities";
import { AUDIO_ASSET } from "~/core/enums";

@Component({
  components: {
    SceneNavigationPanel,
    LogoMedia,
    ActivityOnboarding,
    ActivityPanel,
    ProgressLevel,
    PreviewScene,
    SoundButton,
    CustomButton
  }
})
export default class DefaultLayout extends Vue {
  public globalStore = getModule(GlobalStore, this.$store);
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public isLoaderVisible: boolean = true;
  public loadingProgressions: string = "0";
  public animationElements = {
    loader: new LoaderAnimation(),
    navigationPanel: new NavigationPanelAnimation()
  };
  public canDisplayLoader = false;

  // Auth
  public authStore: AuthStore = getModule(AuthStore, this.$store);

  // Warnings
  public isChrome: boolean =
    navigator.userAgent.indexOf("Chrome") != -1 &&
    navigator.userAgent.indexOf("Edg") == -1;
  public isMobile: boolean =
    window.innerWidth <= 600 && window.innerHeight <= 800;

  public permissionStatus!: PermissionStatus;

  public agent = navigator.userAgent;

  public soundDesign = {
    audioBtnEnter: () => SoundDesignManager.playSound(AUDIO_ASSET.MOUSE_HOVER),
    audioBtnLeave: () => SoundDesignManager.stopSound(AUDIO_ASSET.MOUSE_HOVER),

    progressLevelEnter: () =>
      SoundDesignManager.playSound(AUDIO_ASSET.MOUSE_HOVER),
    progressLevelLeave: () =>
      SoundDesignManager.stopSound(AUDIO_ASSET.MOUSE_HOVER),

    aboutEnter: () => SoundDesignManager.playSound(AUDIO_ASSET.MOUSE_HOVER),
    aboutLeave: () => SoundDesignManager.stopSound(AUDIO_ASSET.MOUSE_HOVER)
  };

  public async mounted() {
    // We don't init application on mounted. We wait animation loader is finished otherwise, it cause jerky animation
    this.canDisplayLoader = true;

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then(stream => {
        (<any>window).localStream = stream;
        (<any>window).localAudio.srcObject = stream;
        (<any>window).localAudio.autoplay = true;
      })
      .catch(err => {
        console.log("u got an error:" + err);
      });
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
      this._getMicrophonePermissions();

      this.globalStore.setIsAppInit(true);
    }
  }

  private _getMicrophonePermissions() {
    let that: this = this;
    navigator.permissions
      .query({ name: "microphone" })
      .then(function(permissionStatus) {
        that.permissionStatus = permissionStatus;
        that.permissionStatus.onchange = function() {};
        that.permissionStatus.state === "granted"
          ? that.globalStore.setMicrophonePermission(true)
          : that.globalStore.setMicrophonePermission(false);
      });
  }

  public async animEnterLoader(el: Element, done: Function) {
    this.animationElements.loader.enter({
      el,
      onComplete: async () => {
        await this.initApp();
        done();
      },
      onStart: () => {}
    });
  }

  public animEnterNavigationPanel(el: Element, done: Function) {
    this.animationElements.navigationPanel.enter({
      el,
      onComplete: async () => {
        done();
      },
      onStart: () => {}
    });
  }

  public animLeaveNavigationPanel(el: Element, done: Function) {
    this.animationElements.navigationPanel.leave({
      el,
      onComplete: async () => {
        done();
      },
      onStart: () => {}
    });
  }

  public onLeaveAnimationActivityPanel(el: Element, done: Function) {
    gsap.to(el, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        done();
      }
    });
  }

  public logout() {
    this.authStore.logout();
    this.globalSceneStore.setActiveObject(null)
    if (this.$route.path !== "/") {
      this.$router.push("/");
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

  padding: 100px;

  h1 {
    color: $dark-blue;
    text-align: center;
  }

  a {
    color: white;
  }

  .logo {
    top: 0;
  }

  &.mobile {
    padding: 45px;

    h1 {
      font-size: 25px;

      span {
        color: white;
      }
    }
  }
}

.progress-level {
  // margin: 24px;
  position: absolute;
  z-index: 100;
}
.logo {
  width: 100px;
  margin-top: 10px;
  position: absolute;
  z-index: 40;
  left: 50%;
  transform: translate(-50%, 0px);
}

.actions-button {
  position: absolute;
  margin: 24px;
  z-index: 35;
  right: 0;
  display: flex;
}

.about-btn,
.logout-btn {
  // margin: 24px;
  // position: absolute;
  // z-index: 35;
  // right: 0;
  cursor: pointer;
  margin-left: 20px;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 132%;
    text-align: center;
    font-feature-settings: "liga" off;
    color: $dark-blue;
    transition: 0.1s ease all;
  }

  &:hover {
    text-decoration: none;

    p {
      color: $orange;
    }
  }
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
  z-index: 35;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 25px;
}
</style>
