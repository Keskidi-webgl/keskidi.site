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
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"

@Component({})

export default class ActivityElement extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
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
    width: 480px;
    max-width: 30%;
    background: linear-gradient(107.28deg, #FF6644 29.48%, #FF9D6F 100%);
    padding: 80px 60px 0 60px;
    box-sizing: border-box;
  }

  &-content {
    background: #FFF8EE;
    flex: 1;
  }
}
</style>
