<template>
  <ActivityElement class="activity-one">
    <!-- Aside -->
    <template class="aside" v-slot:activity-element-aside>
      <div class="aside-container">
        <ProgressBar :step="progressBarStep" :total="3" text-color="white"></ProgressBar>
        <h1 class="main-font bold big-title">{{ activityStore.dataWord.name }}</h1>
        <canvas class="tom-canvas" ref="tom-canvas"></canvas>
      </div>
    </template>
    <!-- Content -->
    <template class="content" v-slot:activity-element-content>
      <div class="content-container">
        <div class="exercise-block">
          <p class="instruction text-common">
            <img src="~/assets/img/orange-doodles.svg" alt="">
            Alors, alors... A ton avis, lequel de ces objets représente le mot <span
            class="bold">{{ activityStore.dataWord.name }}</span> ?</p>

          <div class="choices-container">
            <div v-for="choice in blockChoices" class="choice-block">
              <img :src="choice.url" alt="">
              <span>{{ choice.description }}</span>
            </div>
          </div>

          <CustomButton class="btn-validate" arrow-color="#FFF8EE" color="#000648" text="Valider"></CustomButton>
        </div>
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
import CustomButton from "~/components/buttons/CustomButton.vue";

@Component({
  components: {
    ActivityElement,
    ProgressBar,
    CustomButton
  }
})
export default class ActivityOne extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public progressBarStep: Step = {id: 1, text: 'Allez naravalo !'}

  public blockChoices = [
    {
      url: this.activityStore.dataWord!.activity_data!.object_one,
      description: this.activityStore.dataWord.activity_data.object_one_description,
      isSelected: false
    },
    {
      url: this.activityStore.dataWord!.activity_data!.object_two,
      description: this.activityStore.dataWord!.activity_data!.object_two_description,
      isSelected: false
    }
  ];

  public async mounted() {
    console.log('mounted activity one')
  }

}
</script>

<style scoped lang="scss">
.activity-one {
  .aside-container {
    h1 {
      color: white;
      padding-top: 80px;
    }
  }

  .content-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .exercise-block {
      margin: 0 auto;
      justify-content: center;
      max-width: 756px;
      padding: 20px;

      .instruction {
        color: $dark-blue;
        position: relative;

        img {
          position: absolute;
          left: -80px;
          top: -40px;
        }
      }
    }

    .choices-container {
      padding-top: 60px;
      display: flex;
      justify-content: center;

      .choice-block:first-of-type {
        margin-right: 60px;
      }

      .choice-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid $dark-blue;
        border-radius: 32px;
        width: 280px;
        padding: 20px 12px;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;

        img {
          top: -40px;
          position: absolute;
        }

        span {
          font-size: 28px;
          font-family: $secondary_font;
          padding-top: 90px;
        }
      }
    }

    .btn-validate {
      margin: 70px auto 0 auto;
    }

  }
}
</style>
