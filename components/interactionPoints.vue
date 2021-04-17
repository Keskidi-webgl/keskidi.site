<template>
  <div class="point point-0">
    <div class="label">1</div>
<!--    <div class="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit</div>-->
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
}
.point .label
{
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #00000077;
  border: 1px solid #ffffff77;
  color: #ffffff;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  line-height: 40px;
  font-weight: 100;
  font-size: 14px;
}
</style>
