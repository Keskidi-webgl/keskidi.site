<template>
  <div class="activity-3-result">
    <h2 v-if="activityModule.dataWord" class="activity-item--title">Bravo tu as validé le mot
      {{ activityModule.dataWord.name }}</h2>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import ActivityModule from "~/store/activity";


@Component({})
export default class activity3Result extends Vue {
  public activityModule = getModule(ActivityModule, this.$store)
}
</script>

<style scoped lang="scss">
.activity-3-result {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: red;
  z-index: 10;
}
</style>
