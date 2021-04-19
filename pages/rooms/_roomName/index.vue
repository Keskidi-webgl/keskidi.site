<template>
  <div class="page-container" data-namespace="rooms.roomName">
    <InteractionPoints :data="point" v-for="(point, index) in sceneModule.activeInteractionPoints" v-bind:key="index"/>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {SceneManager} from "~/core/managers";
import SceneModule from "~/store/scene";
import {URL_ROOM_IDENTIFIER} from "~/core/enums";

@Component({})
export default class RoomPage extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    return RouteValidator.validateRoomPageParam(params.roomName)
  }

  mounted() {
    const roomIdentifier = <URL_ROOM_IDENTIFIER>this.$route.params.roomName
    SceneManager.GLOBAL_SCENE.goToPresetPosition(roomIdentifier, 2, () => {
      this.sceneModule.setActiveRoom(roomIdentifier)
      this.addInteractionPoints()
    })
  }

  beforeDestroy() {
    this.removeInteractionPoints()
  }

  addInteractionPoints() {
    this.sceneModule.activeRoom?.objects.forEach((object) => {
      this.sceneModule.addInteractivePoint(object.interactPointName)
    })
  }

  removeInteractionPoints() {
    this.sceneModule.activeRoom?.objects.forEach((object) => {
      this.sceneModule.removeInteractivePoint(object.interactPointName)
    })
  }

}
</script>

<style lang="scss">

</style>
