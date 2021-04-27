<template>
  <div class="custom-card">
    <div :style="{backgroundColor: backgroundColor, width: containerWidth()}" class="custom-card-container">
      <slot></slot>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'


@Component
export default class CustomCard extends Vue {
  @Prop({type: String, required: true}) readonly backgroundColor!: string
  @Prop({type: String, required: true}) readonly width!: number

  public mounted() {
  }

  public containerWidth() {
    return `${this.width}px`
  }
}
</script>

<style lang="scss" scoped>
.custom-card {
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.3);
  display: inline-block;
  border-radius: 32px;

  &-container {
    padding: 35px 32px ;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
