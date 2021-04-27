<template>
  <div :style="buttonContainerStyle()" class="custom-button">
    <span class="text-infos main-font" :style="textStyle()">{{ text }}</span>
    <div :style="arrowContainerStyle()" class="arrow-container">
      <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 13.5H25" :stroke="arrowColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.5 2L25 13.5L13.5 25" :stroke="arrowColor" stroke-width="2.5" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator'


@Component
export default class CustomButton extends Vue {
  @Prop({type: String, required: true}) readonly text!: string
  @Prop({type: String, required: true}) readonly color!: string
  @Prop({type: String, required: true}) readonly arrowColor!: string

  public mounted() {
  }

  public buttonContainerStyle() {
    return {
      borderColor: this.color
    }
  }

  public textStyle() {
    return {
      color: this.color
    }
  }

  public arrowContainerStyle() {
    return {
      backgroundColor: this.color
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-button {
  width: 270px;
  z-index: 30;
  display: flex;
  justify-content: space-between;
  border-radius: 40px;
  cursor: pointer;
  border: 3px solid;
  box-sizing: border-box;
  height: 60px;
  align-items: center;

  span {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrow-container {
    border-radius: 50%;
    width: 59px;
    height: 59px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(1px);
  }
}
</style>
