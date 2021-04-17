<template>
  <div class="page-container" data-namespace="home">
    <div class="link-container">
      <nuxt-link class="interactive-points" :to="dataInteractivePoints.auth.url">Vers Tom</nuxt-link>
      <nuxt-link class="interactive-points" :to="dataInteractivePoints.lounge.url">Vers le salon</nuxt-link>
      <nuxt-link class="interactive-points" :to="dataInteractivePoints.mezzanine.url">Vers la mezzanine</nuxt-link>
      <nuxt-link class="interactive-points" :to="dataInteractivePoints.bedroom.url">Vers la chambre</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneConfig from "~/core/config/scene.config";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";
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
    SceneManager.GLOBAL_SCENE.goToPresetPosition('home', 2)
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
