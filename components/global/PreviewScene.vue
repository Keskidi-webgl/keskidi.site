<template>
  <div class="preview-scene">
    <!-- <img :src="getScene()" class="doodle" alt="" /> -->

    <img
      src="~/assets/img/house/global.png"
      v-bind:class="{ active: !globalSceneStore.activeRoom }"
      class="doodle"
      alt=""
    />
    <img
      src="~/assets/img/house/lounge.png"
      v-bind:class="{
        active:
          globalSceneStore.activeRoom &&
          globalSceneStore.activeRoom.urlSlug == roomSlug.LOUNGE
      }"
      class="doodle"
      alt=""
    />
    <img
      src="~/assets/img/house/bedroom.png"
      v-bind:class="{
        active:
          globalSceneStore.activeRoom &&
          globalSceneStore.activeRoom.urlSlug == roomSlug.BEDROOM
      }"
      class="doodle"
      alt=""
    />
    <img
      src="~/assets/img/house/mezzanine.png"
      v-bind:class="{
        active:
          globalSceneStore.activeRoom &&
          globalSceneStore.activeRoom.urlSlug == roomSlug.MEZZANINE
      }"
      class="doodle"
      alt=""
    />
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";

@Component
export default class PreviewScene extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public roomSlug = ROOM_SLUG;

  getScene() {
    if (this.globalSceneStore.activeRoom)
      return require("~/assets/img/house/" +
        this.globalSceneStore.activeRoom!.name +
        ".svg");
    else return require("~/assets/img/house/global.svg");
  }
}
</script>

<style lang="scss" scoped>
.preview-scene {
  padding: 18px;
  height: 65px;
  width: 65px;
  background: linear-gradient(
    146.31deg,
    rgba(255, 255, 255, 0.4) 7.41%,
    rgba(255, 255, 255, 0.1) 94.07%
  );
  box-shadow: 0px 4px 30px -1px rgba(190, 190, 190, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-right: 1px solid rgba(252, 231, 220, 0.2);
  border-bottom: 1px solid rgba(247, 202, 176, 0.2);
  border-left: 1px solid rgba(243, 173, 133, 0.3);

  img {
    position: absolute;
    opacity: 0;
    transition: 0.3s ease all;
    height: 30px;

    &.active {
      opacity: 1 !important;
    }
  }
}
</style>
