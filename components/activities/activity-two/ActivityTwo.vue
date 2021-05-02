<template>
  <div class="activity-container">
    <ActivityElement class="activity-two">
      <!-- Aside -->
      <template ref="aside" v-slot:activity-element-aside>
        <div class="aside-container">
          <ProgressBar :step="progressBarStep" :total="3" text-color="white"></ProgressBar>

          <div class="word-container">
            <h1 class="main-font bold big-title">{{ activityStore.dataWord.name }}</h1>
            <img :src="activityStore.dataWord.activity_data.good_object" alt="">
          </div>

          <div class="aside-container-footer">
            <span>Passer à l'activité suivante ></span>
          </div>
        </div>
      </template>
      <!-- Content -->
      <template class="content" v-slot:activity-element-content>
        <div class="content-container">
          <h1>Content activity Two</h1>
        </div>
      </template>
    </ActivityElement>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import ActivityElement from "~/components/activities/ActivityElement.vue";
import {Step} from "~/core/types";
import ProgressBar from "~/components/activities/ProgressBar.vue";

@Component({
  components: {
    ActivityElement,
    ProgressBar
  }
})
export default class ActivityTwo extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public progressBarStep: Step = {id: 2, text: 'Tu gères !'}

  public async mounted() {
  }
}
</script>

<style scoped lang="scss">
.activity-container {
  width: 100%;
  height: 100%;
  .activity-two {
    .aside-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .word-container {
        position: relative;
        h1 {
          color: white;
          margin-top: 20px;
        }

        img {
          position: absolute;
          width: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -100%);
        }
      }

      &-footer {
        text-align: right;
        padding-bottom: 20px;
        color: white;

        span {
          transform: translateX(20px);
          display: inline-block;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .content-container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

    }
  }
}
</style>
