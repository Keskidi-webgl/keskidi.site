<template>
  <div class="activity-panel">
    <!-- Activity one -->
    <transition v-on:enter="animationEnterActivityOne">
      <ActivityOne v-if="activityDisplay.one()" />
    </transition>

    <!-- Activity two -->
    <transition v-on:enter="animationEnterActivityTwo" v-on:leave="animationLeaveActivityTwo">
      <ActivityTwo v-if="activityDisplay.two()" />
    </transition>

    <!-- Acitivity three   -->
    <transition v-on:enter="animationEnterActivityThree">
      <ActivityThree v-if="activityDisplay.three()" />
    </transition>

    <!-- Activities result -->
    <ActivitiesResult v-if="activityDisplay.result()" />

    <!-- Activities progression -->
    <ActivitiesProgression v-if="activityDisplay.progression()" />

    <ActivitiesKeskidico v-if="activityDisplay.presentKeskidico()" />

    <!-- Activity onboarding -->
    <transition
      v-on:enter="animationEnterOnboarding"
      v-on:leave="animationLeaveOnBoarding"
    >
      <ActivityOnboarding
        v-if="activityDisplay.onBoarding()"
        class="activity-onboarding overlay-element"
      />
    </transition>

    <div @click="leaveActivity" class="activity-panel--cross">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L22 21.9997"
          stroke="#000648"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 22L22 2.00027"
          stroke="#000648"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <ActivityLeave ref="leaveActivity" />
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
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
import ActivitiesKeskidico from "~/components/activities/activities-progression/ActivitiesKeskidico.vue";
import ActivityOnboarding from "~/components/activities/ActivityOnboarding.vue";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import {ActivityOneAnimation, ActivityThreeAnimation, OnboardingActivityAnimation} from "~/core/animations/activities";
import ActivityTwoAnimation from "~/core/animations/activities/ActivityTwoAnimation";
import ActivityLeave from "~/components/activities/ActivityLeave.vue";

gsap.registerPlugin(CustomEase);

@Component({
  components: {
    ActivityThree,
    ActivityOne,
    ActivityTwo,
    ActivityOneResult,
    ActivitiesResult,
    ActivitiesProgression,
    ActivityOnboarding,
    ActivityLeave,
    ActivitiesKeskidico
  }
})
export default class ActivityPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public globalStore = getModule(GlobalStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public activityDisplay = {
    one: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_1,
    two: () => this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_2,
    three: () =>
      this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_3,
    result: () =>
      this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITIES_RESULT,
    progression: () =>
      this.activityStore.currentActivity ===
      ACTIVITY_TYPE.ACTIVITIES_PROGRESSION,
    onBoarding: () =>
      this.activityStore.currentActivity === ACTIVITY_TYPE.ACTIVITY_ONBOARDING,
    presentKeskidico: () =>
      this.activityStore.currentActivity === ACTIVITY_TYPE.KESKIDICO
  };

  public animationElements = {
    onboarding: new OnboardingActivityAnimation(),
    activityOne: new ActivityOneAnimation(),
    activityTwo: new ActivityTwoAnimation(),
    activityThree: new ActivityThreeAnimation()
  };

  public mounted() {
    GlobalScene.context.pause();
    const isWordAchieved = Helpers.isActivityWordAchieved(
      this.activityStore.dataWord!,
      this.globalStore.achievedWords
    );
    if (isWordAchieved) {
      this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_2);
    } else {
      this.activityStore.setCurrentActivity(
        this.globalStore.achievedWords.length
          ? ACTIVITY_TYPE.ACTIVITY_1
          : ACTIVITY_TYPE.ACTIVITY_ONBOARDING
      );
    }
  }

  leaveActivity() {
    //@ts-ignore
    this.$refs.leaveActivity.$el.classList.remove("hide");
  }

  public goToHome() {
    GlobalScene.context.resume();
    this.$router.push("/");
  }

  public animationEnterOnboarding(el: Element, done: Function) {
    this.animationElements.onboarding.enter({
      el,
      onStart: () => {},
      onComplete: () => {}
    });
  }

  public animationLeaveOnBoarding(el: Element, done: Function) {
    this.animationElements.onboarding.leave({
      el,
      onStart: () => {},
      onComplete: () => {
        done();
        this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_1);
      }
    });
  }

  public animationEnterActivityOne(el: Element, done: Function) {
    this.animationElements.activityOne.enter({
      el,
      onStart: () => {},
      onComplete: () => {
        done();
      }
    });
  }

  // Activity 2
  public animationEnterActivityTwo(el: Element, done: Function) {
    this.animationElements.activityTwo.enter({
      el,
      onStart: () => {},
      onComplete: () => {
        done();
      }
    });
  }

  public animationLeaveActivityTwo(el: Element, done: Function) {
    this.animationElements.activityTwo.leave({
      el,
      onStart: () => {},
      onComplete: () => {
        this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITY_3);
        done();
      }
    });
  }

  // Activity Three
  public animationEnterActivityThree(el: Element, done: Function) {
    this.animationElements.activityThree.enter({
      el,
      onStart: () => {},
      onComplete: () => {
        done();
      }
    });
  }
}
</script>

<style scoped lang="scss">
.activity-panel {
  background-color: #fff8ee;

  &--cross {
    position: absolute;
    top: 30px;
    right: 30px;
    background: linear-gradient(
      146.31deg,
      rgba(255, 255, 255, 0.4) 7.41%,
      rgba(255, 255, 255, 0.1) 94.07%
    );
    box-shadow: 0px 4px 25px -1px rgba(190, 190, 190, 0.15);
    backdrop-filter: blur(20px);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    cursor: pointer;
  }
}
</style>
