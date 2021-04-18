<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <nuxt-link class="interactive-points" to="{{}}"></nuxt-link>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {URL_OBJECT_IDENTIFIER, URL_ROOM_IDENTIFIER} from "~/core/enums";
import {SceneManager} from "~/core/managers";

@Component
export default class ObjectPage extends Vue {

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    return RouteValidator.validateObjectPageParam(params.roomName, params.objectName)
  }

  mounted() {
    const objectIdentifier = <URL_OBJECT_IDENTIFIER>this.$route.params.objectName
    console.log('objectIdentifier : ', objectIdentifier)
    SceneManager.GLOBAL_SCENE.goToPresetPosition(objectIdentifier, 1, () => {
      console.log('finish')
    })
  }
}
</script>

<style lang="scss">

</style>
