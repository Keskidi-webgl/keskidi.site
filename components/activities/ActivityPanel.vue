<template>
  <div class="activity-panel">
    <!-- Activity one -->
    <transition v-on:enter="animationEnterActivityOne">
      <ActivityOne v-if="activityDisplay.one()" />
    </transition>

    <!-- Activity two -->
    <transition
      v-on:enter="animationEnterActivityTwo"
      v-on:leave="animationLeaveActivityTwo"
    >
      <ActivityTwo v-if="activityDisplay.two()" />
    </transition>

    <!-- Acitivity three   -->
    <transition
      v-on:enter="animationEnterActivityThree"
      v-on:leave="animationLeaveActivityThree"
    >
      <ActivityThree v-if="activityDisplay.three()" />
    </transition>

    <!-- Activities result -->
    <transition
      v-on:enter="animationEnterActivityResult"
      v-on:leave="animationLeaveActivityResult"
    >
      <ActivitiesResult v-if="activityDisplay.result()" />
    </transition>

    <!-- Activities progression -->
    <transition
      v-on:enter="animationEnterActivityProgression"
      v-on:leave="animationLeaveActivityProgression"
    >
      <ActivitiesProgression v-if="activityDisplay.progression()" />
    </transition>

    <transition
      v-on:enter="animationEnterActivityKeskidico"
      v-on:leave="animationLeaveActivityKeskidico"
    >
      <ActivitiesKeskidico v-if="activityDisplay.presentKeskidico()" />
    </transition>

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
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
import ActivityOne from "~/components/activities/activity-one/ActivityOne.vue";
import {ACTIVITY_TYPE, AUDIO_ASSET} from "~/core/enums";
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
import {
  ActivityKeskidiAnimation,
  ActivityOneAnimation,
  ActivityProgressionAnimation,
  ActivityResultAnimation,
  ActivityThreeAnimation,
  OnboardingActivityAnimation
} from "~/core/animations/activities";
import ActivityTwoAnimation from "~/core/animations/activities/ActivityTwoAnimation";
import ActivityLeave from "~/components/activities/ActivityLeave.vue";
import {AssetsManager} from "~/core/managers";
import SoundButton from "~/components/global/SoundButton.vue";

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

  public audios = [
    AssetsManager.getAudio(AUDIO_ASSET.GLOBAL_AMBIANCE)!.data,
    AssetsManager.getAudio(AUDIO_ASSET.OUTSIDE_AMBIANCE)!.data,
  ]

  public animationElements = {
    onboarding: new OnboardingActivityAnimation(),
    activityOne: new ActivityOneAnimation(),
    activityTwo: new ActivityTwoAnimation(),
    activityThree: new ActivityThreeAnimation(),
    activityResult: new ActivityResultAnimation(),
    activityProgression: new ActivityProgressionAnimation(),
    activityKeskidico: new ActivityKeskidiAnimation()
  };

  public mounted() {
    this.manageSong('low')
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

  public beforeDestroy() {
    this.manageSong('up')
  }

  public leaveActivity() {
    //@ts-ignore
    this.$refs.leaveActivity.$el.classList.remove("hide");
  }

  public goToHome() {
    GlobalScene.context.resume();
    this.$router.push("/");
  }

  public manageSong(name: 'low'|'up') {
    gsap.to(this.audios, {
      volume: name === 'low' ? 0.2 : SoundButton.MAX_VOLUME,
      duration: 1
    })
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

  public animationLeaveActivityThree(el: Element, done: Function) {
    this.animationElements.activityThree.leave({
      el,
      onStart: () => {},
      onComplete: () => {
        this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITIES_RESULT);
        done();
      }
    });
  }

  public animationEnterActivityResult(el: Element, done: Function) {
    this.animationElements.activityResult.enter({
      el,
      onStart: () => {},
      onComplete: () => {
        done();
      }
    });
  }

  public animationLeaveActivityResult(el: Element, done: Function) {
    this.animationElements.activityResult.leave({
      el,
      onStart: () => {},
      onComplete: () => {
        this.activityStore.setCurrentActivity(
          ACTIVITY_TYPE.ACTIVITIES_PROGRESSION
        );
        done();
      }
    });
  }

  public animationEnterActivityProgression(el: Element, done: Function) {
    this.animationElements.activityProgression.enter({
      el,
      onStart: () => {},
      onComplete: () => {
        this.activityStore.setCurrentActivity(
          ACTIVITY_TYPE.ACTIVITIES_PROGRESSION
        );
        done();
      }
    });
  }

  public animationLeaveActivityProgression(el: Element, done: Function) {
    this.animationElements.activityProgression.leave({
      el,
      onStart: () => {},
      onComplete: () => {
        if (this.globalStore.achievedWords.length > 1) {
          GlobalScene.context.resume();
          this.activityStore.hideActivityPanel();
          this.$router.push(this.globalSceneStore.activeObject!.room().fullUrl);
        } else {
          this.activityStore.setCurrentActivity(ACTIVITY_TYPE.KESKIDICO);
        }
        done();
      }
    });
  }

  public animationEnterActivityKeskidico(el: Element, done: Function) {
    this.animationElements.activityKeskidico.enter({
      el,
      onStart: () => {},
      onComplete: () => {
        done();
      }
    });
  }

  public animationLeaveActivityKeskidico(el: Element, done: Function) {
    this.animationElements.activityKeskidico.leave({
      el,
      onStart: () => {},
      onComplete: () => {
        GlobalScene.context.resume();
        this.activityStore.hideActivityPanel();
        this.$router.push(this.globalSceneStore.activeObject!.room().fullUrl);
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
