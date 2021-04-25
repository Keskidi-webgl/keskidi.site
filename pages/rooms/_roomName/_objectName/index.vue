<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <nuxt-link class="interactive-points" to="{{}}"></nuxt-link>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import {URL_OBJECT_IDENTIFIER} from "~/core/enums";
import {ApiManager, SceneManager} from "~/core/managers";
import AuthMiddleware from "~/middleware/auth";
import Helpers from "~/core/utils/helpers";

@Component
export default class ObjectPage extends Vue {

  middleware(context: Context) {
    AuthMiddleware.handle(context)
  }
  /**
   * Validate route params
   */
  public validate({params}: Context) {
    return RouteValidator.validateObjectPageParam(params.roomName, params.objectName)
  }

  mounted() {
    const objectIdentifier = <URL_OBJECT_IDENTIFIER>this.$route.params.objectName
    SceneManager.GLOBAL_SCENE.goToPresetPosition(objectIdentifier, 1, () => {
    })
  }
}
</script>

<style lang="scss">

</style>
