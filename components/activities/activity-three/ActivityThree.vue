<template>
  <ActivityElement class="activity-three">
    <template v-slot:activity-element-aside>
      <div class="aside-container">
        <ProgressBar
          :step="progressBarStep"
          :total="3"
          text-color="#FF9D6F"
        ></ProgressBar>
        <div class="word-container">
          <h1 class="main-font bold big-title">
            {{ activityStore.dataWord.name }}
          </h1>
        </div>

        <canvas class="tom-canvas" ref="tom"></canvas>
      </div>
    </template>
    <template v-slot:activity-element-content>
      <div class="content-container">

        <h2 class="content-title">Comme dirait la prof d'anglais, repeat after me ...</h2>

      </div>
    </template>
  </ActivityElement>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import ActivityElement from "~/components/activities/ActivityElement.vue";
import ProgressBar from "~/components/activities/ProgressBar.vue";
import {Step} from "~/core/types";

@Component({
  components: {
    ActivityElement,
    ProgressBar
  }
})
export default class ActivityThree extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public progressBarStep: Step = { id: 3, text: "T'es un ouf !" };


}
</script>

<style scoped lang="scss">
.activity-three {

  .content{
    &-container{
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .word-container{
    h1{
      color: white;
    }
  }
}

</style>
