<template>
  <div class="page-container" data-namespace="home">
    <InteractionPoints
      class="interactive-points"
      :data="point"
      v-for="(point, index) in globalSceneStore.activeInteractionPoints"
      :key="index"
    />
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import GlobalScene from "~/core/scene/GlobalScene";
import GlobalSceneStore from "~/store/globalScene";
import {
  BedroomInteractPoint,
  LoungeInteractPoint,
  MezzanineInteractPoint,
  TomInteractPoint
} from "~/core/config/global-scene/interact-points";
import {Context} from "@nuxt/types";
import AuthMiddleware from "~/middleware/auth";

@Component
export default class HomePage extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);

  middleware(context: Context) {
    AuthMiddleware.handle(context);
  }

  transition() {
    return {
      enter: (el: Element, done: Function) => {
        done()
      },
      leave: (el: Element, done: Function) => {
        done()
      }
    }
  }

  mounted() {
    this.globalSceneStore.clearActiveRoom();
    const destination = this.globalSceneStore.isHomePageReady
      ? "home"
      : "cloud";
    const duration = this.globalSceneStore.isHomePageReady ? 1 : 0;

    GlobalScene.context.goToPresetPosition(destination, duration, () => {
      this.globalSceneStore.setIsHomePageReady(true);
      this.addInteractionPoints();
    });
  }

  beforeDestroy() {
    this.removeInteractionPoints();
  }

  addInteractionPoints() {
    this.globalSceneStore.addInteractivePoint(BedroomInteractPoint.name);
    this.globalSceneStore.addInteractivePoint(LoungeInteractPoint.name);
    this.globalSceneStore.addInteractivePoint(MezzanineInteractPoint.name);
    this.globalSceneStore.addInteractivePoint(TomInteractPoint.name);
  }

  removeInteractionPoints() {
    this.globalSceneStore.removeInteractivePoint(BedroomInteractPoint.name);
    this.globalSceneStore.removeInteractivePoint(LoungeInteractPoint.name);
    this.globalSceneStore.removeInteractivePoint(MezzanineInteractPoint.name);
    this.globalSceneStore.removeInteractivePoint(TomInteractPoint.name);
  }
}
</script>

<style lang="scss" scoped>
.link-container {
  position: absolute;
  z-index: 20;
  top: 40%;
  right: 0;
  display: flex;
  flex-direction: column;
}
</style>
