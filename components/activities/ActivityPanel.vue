<template>
  <div class="activity-panel">
    <!-- Activity one -->
    <transition v-on:enter="animationEnterActivityOne">
      <ActivityOne v-if="activityDisplay.one()"/>
    </transition>

    <!-- Activity two -->
    <ActivityTwo v-if="activityDisplay.two()"/>

    <!-- Acitivity three   -->
    <ActivityThree v-if="activityDisplay.three()"/>

    <!-- Activities result -->
    <ActivitiesResult v-if="activityDisplay.result()"/>

    <!-- Activities progression -->
    <ActivitiesProgression v-if="activityDisplay.progression()"/>


    <!-- Activity onboarding -->
    <transition v-on:enter="animationEnterOnboarding" v-on:leave="animationLeaveOnBoarding">
      <ActivityOnboarding v-if="activityDisplay.onBoarding()" class="activity-onboarding overlay-element"/>
    </transition>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import ActivityOne from "~/components/activities/activity-one/ActivityOne.vue";
import {ACTIVITY_TYPE} from "~/core/enums";
import ActivityTwo from "~/components/activities/activity-two/ActivityTwo.vue";
import GlobalScene from "~/core/scene/GlobalScene";
import ActivityOneResult from "~/components/activities/activity-one/ActivityOneResult.vue";
import Helpers from "~/core/utils/helpers";
import GlobalStore from "~/store/global";
import ActivityThree from "~/components/activities/activity-three/ActivityThree.vue";
import ActivitiesResult from "~/components/activities/activities-result/ActivitiesResult.vue";
import ActivitiesProgression from "~/components/activities/activities-progression/ActivitiesProgression.vue";
import ActivityOnboarding from "~/components/activities/ActivityOnboarding.vue";
import gsap from "gsap";
import CustomEase from 'gsap/CustomEase'
import {ActivityOneAnimation, OnboardingActivityAnimation} from "~/core/animations/activities";
import TomSceneElement from "~/core/scene/TomSceneElement";
import ActivityScene from "~/core/scene/ActivityScene";

gsap.registerPlugin(CustomEase)

@Component({
  components: {
    ActivityThree,
    ActivityOne,
    ActivityTwo,
    ActivityOneResult,
    ActivitiesResult,
    ActivitiesProgression,
    ActivityOnboarding
  }
})
export default class ActivityPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public globalStore = getModule(GlobalStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public activityDisplay = {
    one: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_1,
    two: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_2,
    three: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_3,
    result: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITIES_RESULT,
    progression: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITIES_PROGRESSION,
    onBoarding: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_ONBOARDING
  }

  public animationElements = {
    onboarding: new OnboardingActivityAnimation(),
    activityOne: new ActivityOneAnimation()
  }

  public mounted() {
    const isWordAchieved = Helpers.isActivityWordAchieved(this.activityStore.dataWord!, this.globalStore.achievedWords)
    if (isWordAchieved) {
      this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_2)
    } else {
      this.activityStore.setCurrentActivity(this.globalStore.achievedWords.length
        ? ACTIVITY_TYPE.ACTIVITY_1
        : ACTIVITY_TYPE.ACTIVITY_ONBOARDING
      )
    }
  }

  public goToHome() {
    GlobalScene.context.resume()
    this.$router.push("/")
  }

  public animationEnterOnboarding(el: HTMLCollection, done: Function) {
    this.animationElements.onboarding.enter({
      el,
      onStart: () => {},
      onComplete: () => {}
    })
  }

  public animationLeaveOnBoarding(el: HTMLCollection, done: Function) {
    this.animationElements.onboarding.leave({
      el,
      onStart: () => {

      },
      onComplete: () => {
        done()
        this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_1)
      }
    })
  }

  public animationEnterActivityOne(el: HTMLCollection, done: Function) {
    this.animationElements.activityOne.enter({
      el,
      onStart: () => {},
      onComplete: () => {
        done()
      }
    })
  }
}
</script>

<style scoped lang="scss">
.activity-panel {
  background-color: #fff8ee;
}
</style>
