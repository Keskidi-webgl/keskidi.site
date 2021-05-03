<template>
  <div v-if="isActive" ref="site-loader" class="site-loader">
    <transition v-on:leave="hideBackgroundOverlay">
      <div
        v-if="!globalSceneStore.isHomePageReady"
        class="background-overlay"
      ></div>
    </transition>
    <div class="site-loader-container">
      <LogoMedia class="site-loader-container-logo" theme="#000648"></LogoMedia>
      <p class="site-loader-container-expression secondary-font">
        <img src="~/assets/img/quote.svg" class="quote quote-top" alt="" />
        Tu peux me filer de la moula stp ?
        <img src="~/assets/img/quote.svg" class="quote quote-bot" alt="" />
        <img
          src="~/assets/img/arrow-draft-one.png"
          class="doodle bottom-left-arrow"
          alt=""
        />
        <img
          src="~/assets/img/arrow-draft-two.png"
          class="doodle top-left-arrow"
          alt=""
        />
        <img
          src="~/assets/img/circle-doodle-huge.png"
          class="doodle circle-doodle"
          alt=""
        />
        <img
          src="~/assets/img/doodle-packed.png"
          class="doodle packed-doodle"
          alt=""
        />
        <img src="~/assets/img/heart-draft.png" class="doodle heart" alt="" />
      </p>

      <p class="main-font text-common site-loader-container-description">
        Tu n'as rien compris à cette phrase ? Tu es au bon endroit ! Plonge et
        part à la découverte de la culture des jeunes d'aujourd'hui.
      </p>

      <CustomButton
        :class="{ disabled: !globalStore.isAppInit }"
        @click.native="hide"
        arrow-color="white"
        color="#000648"
        :text="text()"
      ></CustomButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Prop, Vue } from "nuxt-property-decorator";
import GlobalStore from "~/store/global";
import AuthStore from "~/store/auth";
import CustomButton from "~/components/buttons/CustomButton.vue";
import gsap from "gsap";
import LogoMedia from "~/components/medias/LogoMedia.vue";
import { InteractionPoint } from "~/core/config/global-scene/interact-points/types";
import GlobalSceneStore from "~/store/globalScene";
import GlobalScene from "~/core/scene/GlobalScene";
import {AssetsManager} from "~/core/managers";
import {VIDEO_ASSET} from "~/core/enums";

@Component({
  components: {
    CustomButton,
    LogoMedia
  }
})
export default class Loader extends Vue {
  @Prop({ type: String, required: true })
  readonly loadingData!: InteractionPoint;
  public globalStore: GlobalStore = getModule(GlobalStore, this.$store);
  public globalSceneStore: GlobalSceneStore = getModule(
    GlobalSceneStore,
    this.$store
  );
  public authStore: AuthStore = getModule(AuthStore, this.$store);
  public isActive: boolean = true;

  text() {
    let text = "Et c'est parti !";

    if (!this.globalStore.isAppInit) {
      text = `Chargement ${this.loadingData} %`;
    }

    return text;
  }

  hide() {
    gsap.to(".site-loader", {
      duration: 1,
      autoAlpha: 0,
      onComplete: () => {
        if (this.$route.path === "/") {
          GlobalScene.context.goToPresetPosition("home", 2, () => {
            this.isActive = false;
            this.globalSceneStore.setCanDisplayGlobalUI(true);
          });
        } else {
          this.isActive = false;
          this.globalSceneStore.setIsHomePageReady(true);
          this.globalSceneStore.setCanDisplayGlobalUI(true);
        }
        AssetsManager.getVideo(VIDEO_ASSET.TV_SCREEN).data.play()
      }
    });
  }

  public hideBackgroundOverlay(el: HTMLElement, done: () => void) {
    gsap.to(el, {
      duration: 2,
      autoAlpha: 0,
      onComplete: () => {
        done();
      }
    });
  }
}
</script>

<style scoped lang="scss">
.disabled {
  pointer-events: none;
}
.site-loader {
  z-index: 200;
  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #fceee6 0%, #efdedd 100%);
    z-index: 0;
  }
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 920px;
    margin: 0 auto;
    height: 100%;
    z-index: 90;
    color: $dark-blue;

    &-logo {
      margin-bottom: 130px;
      width: 390px;
      z-index: 90;
    }

    &-expression {
      font-style: normal;
      font-weight: normal;
      font-size: 56px;
      line-height: 70px;
      text-align: center;
      position: relative;
      z-index: 90;

      .quote {
        width: 40px;
        position: absolute;

        &-top {
          left: -50px;
          top: -20px;
        }

        &-bot {
          transform: rotate(-180deg);
          bottom: -20px;
        }
      }

      .doodle {
        position: absolute;
        z-index: -1;

        &.bottom-left-arrow {
          bottom: -50px;
          left: 25px;
        }

        &.top-left-arrow {
          top: -65px;
          left: -30px;
        }

        &.circle-doodle {
          left: 280px;
          top: 0px;
        }

        &.packed-doodle {
          right: 130px;
          bottom: -10px;
        }

        &.heart {
          right: -60px;
          top: -30px;
        }
      }
    }

    &-description {
      text-align: center;
      font-size: 24px;
      padding: 100px 0;
      z-index: 90;
    }
  }
}
</style>
