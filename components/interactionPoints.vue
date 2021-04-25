<template>
  <nuxt-link :style="style()" class="point point-0" :to="data.url">
  </nuxt-link>

</template>


<script lang="ts">
import {Component, getModule, Prop, Vue} from 'nuxt-property-decorator'
import {InteractionPointConfig} from "~/core/types";
import GlobalModule from "~/store/global";


@Component
export default class InteractionPoints extends Vue {
  @Prop({type: Object, required: true}) readonly data!: InteractionPointConfig
  public globalModule: GlobalModule = getModule(GlobalModule, this.$store)

  public mounted() {
  }

  public style() {
    return `
    transform: translateX(${this.data.transformX}px) translateY(${this.data.transformY}px);
    background-color: ${this.data.isCompleted(this.globalModule) ? 'red' : '#00000077'};
    `
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #00000077;
  border: 1px solid #ffffff77;
  cursor: pointer;
}
</style>
