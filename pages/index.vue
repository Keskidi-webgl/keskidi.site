<template>
  <div class="page-container" data-namespace="home">
    <InteractionPoints :data="point" v-for="(point, index) in sceneModule.activeInteractionPoints" :key="index"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneConfig from "~/core/config/scene.config";
import {INTERACT_POINT_NAME, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";
import SceneModule from "~/store/scene";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {LoungeInteractPoint, MezzanineInteractPoint} from "~/core/config/global-scene/interact-points";

@Component
export default class HomePage extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)

  mounted() {
    this.sceneModule.clearActiveRoom()
    SceneManager.GLOBAL_SCENE.goToPresetPosition('home', 2, () => {
      this.addInteractionPoints()
    })
  }

  beforeDestroy() {
    this.removeInteractionPoints()
  }

  addInteractionPoints() {
    this.sceneModule.addInteractivePoint(INTERACT_POINT_NAME.BEDROOM)
    this.sceneModule.addInteractivePoint(INTERACT_POINT_NAME.LOUNGE)
    this.sceneModule.addInteractivePoint(INTERACT_POINT_NAME.MEZZANINE)
    this.sceneModule.addInteractivePoint(INTERACT_POINT_NAME.TOM)
  }

  removeInteractionPoints() {
    this.sceneModule.removeInteractivePoint(INTERACT_POINT_NAME.BEDROOM)
    this.sceneModule.removeInteractivePoint(INTERACT_POINT_NAME.LOUNGE)
    this.sceneModule.removeInteractivePoint(INTERACT_POINT_NAME.MEZZANINE)
    this.sceneModule.removeInteractivePoint(INTERACT_POINT_NAME.TOM)
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
