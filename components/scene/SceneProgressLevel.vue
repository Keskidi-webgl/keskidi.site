<template v-if="globalStore.dataWord && globalStore.achievedWords">
  <div class="home-progress-level">
    <ProgressLevel
      :level="getLevel()"
      :progress="getProgress()"
      :stroke="2"
      :radius="94 / 2"
      :total="getTotal()">
    </ProgressLevel>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import ProgressLevel from "~/components/global/ProgressLevel.vue";
import {ProgressPercentManager} from "~/core/managers";
import GlobalStore from "~/store/global";

@Component({
  components: {
    ProgressLevel
  }
})
export default class SceneProgressLevel extends Vue {
  public globalStore = getModule(GlobalStore, this.$store);

  mounted() {
    this._initProgressManager()
  }

  private _initProgressManager() {
    ProgressPercentManager.words = this.globalStore.dataWord.length
    ProgressPercentManager.userAchievedWords = this.globalStore.achievedWords.length
  }

  public getLevel() {
    return ProgressPercentManager.current!.name
  }

  public getProgress() {
    ProgressPercentManager.init()
    return this.globalStore.achievedWords.length
  }

  public getTotal() {
    ProgressPercentManager.init()
    return this.globalStore.dataWord.length
  }
}
</script>

<style lang="scss" scoped>

</style>
