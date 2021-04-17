<template>
  <div class="point point-0">
  </div>
</template>


<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import {Vector3} from 'three'
import SceneManager from "~/core/managers/SceneManager";


@Component
export default class InteractionPoints extends Vue {

  public mounted() {
   console.log("interaction points")

  }
}
</script>

<style scoped>
.point
{
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #00000077;
  border: 1px solid #ffffff77;
}
</style>
