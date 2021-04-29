<template>
  <div class="scene-navigation-panel">
    <nuxt-link :class="{isDisabled: globalSceneStore.isCameraMoving}"
               v-if="!globalSceneStore.activeObject"
               class="scene-navigation-panel-button previous-scene"
               :to="previousSceneLink()">
      <img src="~/assets/img/next-arrow.svg" alt="">
    </nuxt-link>
    <nuxt-link v-if="!globalSceneStore.activeObject"
               :class="{isDisabled: globalSceneStore.isCameraMoving}"
               class="scene-navigation-panel-button back-home"
               :to="backHomeLink()">
      <img src="~/assets/img/home.svg" alt="">
    </nuxt-link>
    <nuxt-link :class="{isDisabled: globalSceneStore.isCameraMoving}"
               v-if="!globalSceneStore.activeObject"
               class="scene-navigation-panel-button next-scene"
               :to="nextSceneLink()">
      <img src="~/assets/img/next-arrow.svg" alt="">
    </nuxt-link>
    <nuxt-link v-if="globalSceneStore.activeObject"
               :class="{isDisabled: globalSceneStore.isCameraMoving}"
               class="scene-navigation-panel-button object-room"
               :to="goBackObjectRoom()">
      <img src="~/assets/img/next-arrow.svg" alt="">
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene";

@Component({})
export default class SceneNavigationPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)

  public backHomeLink() {
    return '/'
  }

  public nextSceneLink() {
    return this.globalSceneStore.activeRoom?.nextRoom().fullUrl
  }

  public previousSceneLink() {
    return this.globalSceneStore.activeRoom?.previousRoom().fullUrl
  }

  public goBackObjectRoom() {
    return this.globalSceneStore.activeObject?.room().fullUrl
  }
}
</script>

<style lang="scss">
.scene-navigation-panel {
  position: fixed;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;

  .scene-navigation-panel-button {
    width: 48px;
    height: 48px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;

    &.previous-scene {
      transform: rotate(180deg);
    }

    &.next-scene .previous-scene {
      img {
        width: 8px;
      }
    }

    &.back-home {
      background-color: $eletric-blue;
      width: 52px;
      height: 52px;

      img {
        width: 16px;
      }
    }

    &.object-room {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        transform: rotate(90deg);
      }
    }
  }

  .isDisabled {
    pointer-events: none;
  }
}
</style>
