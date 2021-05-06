<template>
  <!-- TODO -->
  <div ref="leave" class="activity-leave hide">
    <div class="activity-leave--card ">
      <h2>Wait</h2>
      <p>est tu sur de vouloir quitter l'activité ?</p>
      <div>
        <button @click="resumeActivity">je continue</button>
        <button @click="hideActivityPanel" class="bg-transparent darkfont">
          je quitte
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
import { ACTIVITY_TYPE } from "~/core/enums";
import GlobalScene from "~/core/scene/GlobalScene";

@Component({
  components: {}
})
export default class ActivityLeave extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public leaveContainer!: HTMLElement;

  mounted() {
    this.leaveContainer = this.$refs.leave as HTMLElement;
  }

  hideActivityPanel() {
    GlobalScene.context.resume();
    this.activityStore.setCurrentActivity(null);
    this.activityStore.hideActivityPanel();
    this.leaveContainer.classList.add("hide");

    //this.$refs.leave.classList.add('hide')
  }

  resumeActivity() {
    this.leaveContainer.classList.add("hide");
  }
}
</script>

<style scoped lang="scss">
.activity-leave {
  background-color: rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  height: 100vh;
  width: 100vw;
  display: flex;
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &--card {
    width: 90%;
    height: 90%;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 40px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  button {
    padding: 20px 30px;
    border-radius: 50px;
    border: 2px solid $dark-blue;
    background: $dark-blue;
    color: white;
  }
  .darkfont {
    color: $dark-blue;
  }
}
.hide {
  display: none;
}
</style>
