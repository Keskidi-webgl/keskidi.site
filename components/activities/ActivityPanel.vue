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

  public animationEnterOnboarding(el: HTMLElement, done: Function) {
    const tl = gsap.timeline()
    tl.from(document.querySelectorAll('.onboarding-card'), {
      y: 500,
      duration: 1,
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'power3'
    }, 0.3)
      .from(document.querySelector('.onboarding-title'), {
        duration: 1,
        autoAlpha: 0,
        y: -150,
        onComplete: () => {
          done()
        }
      }, 0.3)
  }

  public animationLeaveOnBoarding(el: HTMLElement, done: Function) {
    const tl = gsap.timeline({
      onComplete: () => {
        console.log('onComplete')
        done()
        this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_1)
      }
    })
    tl.to(document.querySelectorAll('.onboarding-card'), {
      y: 500,
      duration: 1,
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'power3'
    }, 0.2)
    tl.to(document.querySelector('.onboarding-btn-next'), {
      y: 500,
      duration: 1,
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'power3'
    }, 0.2)
      .to(document.querySelector('.onboarding-title'), {
        duration: 0.8,
        autoAlpha: 0,
        y: -60,
      }, 0.2)
  }

  public animationEnterActivityOne(el: HTMLElement, done: Function) {
    CustomEase.create('aside', "M0,0,C0.126,0.382,0.282,0.674,0.44,0.822,0.632,1.002,0.818,1.001,1,1")
    const tl = gsap.timeline()
    tl.from(el, {
      autoAlpha: 0
    }, .3)
      .from('.activity-element-aside', {
        duration: 2,
        x: -480,
        ease: 'aside'
      }, 0.6)
      .from('canvas', {
        autoAlpha: 0,
        y: 500
      }, 2)
      .from('.word-name', {
        autoAlpha: 0,
        y: 100,
      }, 2)
      .from('.instruction', {
        autoAlpha: 0,
        y: -60
      }, 2)
      .from('.interrogation', {
        autoAlpha: 0,
      }, 2.5)
      .from(document.querySelectorAll('.choice-card'), {
        y: 100,
        duration: 1,
        autoAlpha: 0,
        stagger: 0.3,
        ease: 'power3'
      }, 2)

  }
}
</script>

<style scoped lang="scss">
.activity-panel {
  background-color: #fff8ee;
}
</style>
