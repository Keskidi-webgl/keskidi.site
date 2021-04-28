<template>
  <div class="page-container" data-namespace="rooms.roomName">
    <InteractionPoints :data="point" v-for="(point, index) in globalSceneStore.activeInteractionPoints" v-bind:key="index"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {SceneManager} from "~/core/managers";
import GlobalSceneStore from "~/store/globalScene";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import AuthMiddleware from "~/middleware/auth";

@Component({})
export default class RoomPage extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)

  middleware(context: Context) {
    AuthMiddleware.handle(context)
  }

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    return RouteValidator.validateRoomPageParam(params.roomName)
  }

  mounted() {
    const roomIdentifier = <URL_ROOM_IDENTIFIER>this.$route.params.roomName
    SceneManager.GLOBAL_SCENE.goToPresetPosition(roomIdentifier, 2, () => {
      this.globalSceneStore.setActiveRoom(roomIdentifier)
      this.addInteractionPoints()
    })
  }

  beforeDestroy() {
    this.removeInteractionPoints()
  }

  addInteractionPoints() {
    this.globalSceneStore.activeRoom?.objects.forEach((object) => {
      this.globalSceneStore.addInteractivePoint(object.interactPointName)
    })
  }

  removeInteractionPoints() {
    this.globalSceneStore.activeRoom?.objects.forEach((object) => {
      this.globalSceneStore.removeInteractivePoint(object.interactPointName)
    })
  }

}
</script>

<style lang="scss">

</style>
