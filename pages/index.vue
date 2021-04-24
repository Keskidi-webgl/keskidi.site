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

@Component
export default class HomePage extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)
  /**
   * Data for point of interactive points
   */
  public dataInteractivePoints = {
    auth: {url: '/auth'},
    lounge: {url: SceneConfig.getRoomConfig(URL_ROOM_IDENTIFIER.LOUNGE)?.fullUrl},
    mezzanine: {url: SceneConfig.getRoomConfig(URL_ROOM_IDENTIFIER.MEZZANINE)?.fullUrl},
    bedroom: {url: SceneConfig.getRoomConfig(URL_ROOM_IDENTIFIER.BEDROOM)?.fullUrl},
  }

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
  }

  removeInteractionPoints() {
    this.sceneModule.removeInteractivePoint(INTERACT_POINT_NAME.BEDROOM)
    this.sceneModule.removeInteractivePoint(INTERACT_POINT_NAME.LOUNGE)
    this.sceneModule.removeInteractivePoint(INTERACT_POINT_NAME.MEZZANINE)
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
