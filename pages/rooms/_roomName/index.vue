<template>
  <div class="page-container" data-namespace="rooms.roomName">
    <h1>Page chambre : {{ $route.params.roomName }}</h1>
    <div style="position: absolute; top: 0; z-index: 3" class="button-container">
      <nuxt-link to="/rooms/bedroom">Aller à chambre</nuxt-link>
      <nuxt-link to="/rooms/lounge">Aller au salon</nuxt-link>
      <nuxt-link to="/rooms/mezzanine">Aller à la mezzanine</nuxt-link>
      <nuxt-link to="/">Retour à la home</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {SceneManager} from "~/core/managers";
import {URL_ROOM_NAME} from "~/core/enums";

@Component({})
export default class RoomPage extends Vue {

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    console.log('params.roomName : ', params.roomName)
    return RouteValidator.validateRoomPageParam(params.roomName)
  }

  beforeCreate() {
    if (this.$route.params.roomName === URL_ROOM_NAME.LOUNGE) {
      SceneManager.GLOBAL_SCENE.goToPresetPosition('lounge', 3)
    }

    if (this.$route.params.roomName === URL_ROOM_NAME.BEDROOM) {
      SceneManager.GLOBAL_SCENE.goToPresetPosition('bedroom', 3)
    }

    if (this.$route.params.roomName === URL_ROOM_NAME.MEZZANINE) {
      SceneManager.GLOBAL_SCENE.goToPresetPosition('mezzanine', 3)
    }

  }

}
</script>

<style lang="scss">

</style>
