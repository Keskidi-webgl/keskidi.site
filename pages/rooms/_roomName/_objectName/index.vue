<template>
  <div class="page-container" data-namespace="rooms.roomName.objectName">
    <nuxt-link class="interactive-points" to="{{}}"></nuxt-link>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import {Context} from "@nuxt/types";
import {RouteValidator} from "~/core/validators";
import SceneConfig from '~/core/config/scene.config'

@Component
export default class ObjectPage extends Vue {

  /**
   * Validate route params
   */
  public validate({params}: Context) {
    return RouteValidator.validateObjectPageParam(params.roomName, params.objectName)
  }
}
</script>

<style lang="scss">

</style>
