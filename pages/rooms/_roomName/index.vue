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
import AuthMiddleware from "~/middleware/auth";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";

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
    return RouteValidator.validateRoomSlug(<ROOM_SLUG>params.roomName)
  }

  mounted() {
    const roomSlug = <ROOM_SLUG>this.$route.params.roomName
    SceneManager.GLOBAL_SCENE.goToPresetPosition(roomSlug, 2, () => {
      this.globalSceneStore.setActiveRoom(roomSlug)
      this.addInteractionPoints()
    })
  }

  beforeDestroy() {
    this.removeInteractionPoints()
  }

  addInteractionPoints() {
    this.globalSceneStore.activeRoom!.objects.forEach((object) => {
      this.globalSceneStore.addInteractivePoint(object.urlSlug)
    })
  }

  removeInteractionPoints() {
    this.globalSceneStore.activeRoom?.objects.forEach((object) => {
      this.globalSceneStore.removeInteractivePoint(object.urlSlug)
    })
  }

}
</script>

<style lang="scss">

</style>
