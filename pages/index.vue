<template>
  <div class="page-container" data-namespace="home">
    <InteractionPoints :data="point" v-for="(point, index) in globalSceneStore.activeInteractionPoints" :key="index"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {SceneManager} from "~/core/managers";
import GlobalSceneStore from "~/store/globalScene";
import {
  BedroomInteractPoint,
  LoungeInteractPoint,
  MezzanineInteractPoint,
  TomInteractPoint
} from "~/core/config/global-scene/interact-points";

@Component
export default class HomePage extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)

  mounted() {
    this.globalSceneStore.clearActiveRoom()
    SceneManager.GLOBAL_SCENE.goToPresetPosition('home', 2, () => {
      this.addInteractionPoints()
    })
  }

  beforeDestroy() {
    this.removeInteractionPoints()
  }

  addInteractionPoints() {
    this.globalSceneStore.addInteractivePoint(BedroomInteractPoint.name)
    this.globalSceneStore.addInteractivePoint(LoungeInteractPoint.name)
    this.globalSceneStore.addInteractivePoint(MezzanineInteractPoint.name)
    this.globalSceneStore.addInteractivePoint(TomInteractPoint.name)
  }

  removeInteractionPoints() {
    this.globalSceneStore.removeInteractivePoint(BedroomInteractPoint.name)
    this.globalSceneStore.removeInteractivePoint(LoungeInteractPoint.name)
    this.globalSceneStore.removeInteractivePoint(MezzanineInteractPoint.name)
    this.globalSceneStore.removeInteractivePoint(TomInteractPoint.name)
  }
}
</script>

<style lang="scss" scoped>
.link-container {
  background-color: white;
  position: absolute;
  z-index: 20;
  top: 40%;
  right: 0;
  display: flex;
  flex-direction: column;
}
</style>
