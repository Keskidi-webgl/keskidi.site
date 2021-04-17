<template>
  <div class="page-container" data-namespace="rooms.roomName">

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {SceneManager} from "~/core/managers";
import SceneModule from "~/store/scene";

@Component({})
export default class RoomPage extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    console.log('params.roomName : ', params.roomName)
    return RouteValidator.validateRoomPageParam(params.roomName)
  }

  mounted() {
    SceneManager.GLOBAL_SCENE.goToPresetPosition(this.$route.params.roomName, 1, () => {
      this.sceneModule.setActiveRoom(this.$route.params.roomName)
    })
  }

}
</script>

<style lang="scss">

</style>
