<template>
  <div class="preview-scene">
    <img :src="getScene()" class="doodle" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";

@Component
export default class PreviewScene extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);

  getScene() {
    if (this.globalSceneStore.activeRoom)
      return require("~/assets/img/house/" +
        this.globalSceneStore.activeRoom!.name +
        ".png");
    else return require("~/assets/img/house/global.png");
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
}
</style>
