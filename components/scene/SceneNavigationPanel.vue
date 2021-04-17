<template>
  <div class="scene-navigation-panel">
    <nuxt-link class="scene-navigation-panel-button previous-scene" :to="previousSceneLink()">
      <img src="~/assets/img/next-arrow.svg" alt="">
    </nuxt-link>
    <nuxt-link class="scene-navigation-panel-button back-home" :to="backHomeLink()">
      <img src="~/assets/img/home.svg" alt="">
    </nuxt-link>
    <nuxt-link class="scene-navigation-panel-button next-scene" :to="nextSceneLink()">
      <img src="~/assets/img/next-arrow.svg" alt="">
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";

@Component({})
export default class SceneNavigationPanel extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)

  public backHomeLink() {
    return '/'
  }

  public nextSceneLink() {
    return this.sceneModule.activeRoom?.nextSceneUrl
  }

  public previousSceneLink() {
    return this.sceneModule.activeRoom?.previousUrl
  }
}
</script>

<style lang="scss">
.scene-navigation-panel {
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;

  .scene-navigation-panel-button {
    width: 60px;
    height: 60px;
    background-color: #c3c0c0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;

    img {
      width: 20px;
      height: 20px;
    }

    &.previous-scene {
      transform: rotate(180deg);
    }
    &.back-home {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
