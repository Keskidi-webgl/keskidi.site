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
import {Component, Vue} from 'nuxt-property-decorator'
import {SceneInteractor} from "~/core/defs";
import {URL_ROOM_NAME} from "~/core/enums";
import {SceneManager} from "~/core/managers";

@Component
export default class HomePage extends Vue implements SceneInteractor {

  /**
   * Data for point of interactive points
   */
  public dataInteractivePoints = {
    auth: {url: '/auth'},
    lounge: {url: `rooms/${URL_ROOM_NAME.LOUNGE}`},
    mezzanine: {url: `rooms/${URL_ROOM_NAME.MEZZANINE}`},
    bedroom: {url: `rooms/${URL_ROOM_NAME.BEDROOM}`},
  }

  beforeCreate() {
    SceneManager.GLOBAL_SCENE.goToPresetPosition('home', 3)
  }
}
</script>

<style lang="scss">

</style>
