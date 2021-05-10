<template>
  <div class="activity-element">
    <aside class="activity-element-aside">
      <slot name="activity-element-aside"></slot>
    </aside>
    <main class="activity-element-content">
      <slot name="activity-element-content"></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";

@Component({})
export default class ActivityElement extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
}
</script>

<style lang="scss">
.activity-element {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  font-family: $main_font;

  &-aside {
    width: 570px;
    //max-width: 30%;
    background: linear-gradient(107.28deg, #ff6644 29.48%, #ff9d6f 100%);
    padding: 80px 60px 0 60px;
    box-sizing: border-box;
    position: relative;

    canvas {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  &-content {
    background: $dark-cream;
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    position: relative;
    overflow-x: hidden;
    padding: 160px 120px 0 120px;
  }
}
</style>
