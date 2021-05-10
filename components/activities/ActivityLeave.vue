<template>
  <div ref="leave" class="activity-leave hide">
    <div class="activity-leave--card ">
      <h2 class="main-font">
        Waiiiiiit !
        <img
          src="~/assets/img/circle-doodle-huge.png"
          class="doodle circle-doodle"
          alt=""
        />
      </h2>
      <div class="text-container">
        <p class="main-font p1">
          Es-tu sûr.e de vouloir
          <strong
            ><span
              >quitter
              <img
                src="~/assets/img/doodle-line.png"
                class="doodle line-doodle"
                alt=""
              />
            </span>
            l'activité
          </strong>
          ?
          <img
            src="~/assets/img/arrow-draft-two.png"
            class="doodle arrow-two-doodle"
            alt=""
          />
        </p>
        <p class="main-font p2">
          Tu
          <span
            >perdras
            <img
              src="~/assets/img/doodle-packed.png"
              class="doodle packed-doodle"
              alt=""
            />
          </span>
          toute ta progression...
          <img
            src="~/assets/img/arrow-draft-one.png"
            class="doodle arrow-one-doodle"
            alt=""
          />
        </p>
      </div>

      <div class="buttons-container">
        <button @click="resumeActivity" class="main-font">
          Ah non, je continue
        </button>
        <button
          @click="hideActivityPanel"
          class="bg-transparent darkfont main-font"
        >
          Oui, pas grave
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

    let progress: HTMLElement | null = document.querySelector(
      ".progress-level"
    );
    progress ? (progress!.style.zIndex = "100") : false;
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
  padding: 100px;

  &--card {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 40px;
    -webkit-backdrop-filter: blur(59.4294px);
    backdrop-filter: blur(59.4294px);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 50px 100px;
    min-width: 800px;
    min-height: 500px;
    height: 100%;
    width: 100%;

    .text-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .doodle {
      position: absolute;
      z-index: -1;
    }

    h2 {
      font-style: normal;
      font-weight: bold;
      font-size: 90px;
      line-height: 108px;
      text-align: center;
      letter-spacing: -0.02em;
      color: $dark-blue;
      mix-blend-mode: normal;
      position: relative;
      // margin-bottom: 60px;

      .circle-doodle {
        right: 0;
        top: 50%;
        transform: translateY(calc(-50% + 10px));
      }
    }

    p {
      font-style: normal;
      font-weight: normal;
      font-size: 40px;
      line-height: 100%;
      text-align: center;
      color: $dark-blue;
      position: relative;

      &.p1 {
        // margin-bottom: 50px;

        .arrow-two-doodle {
          top: -30px;
          left: -60px;
        }

        span {
          position: relative;
          font-weight: bold;

          .line-doodle {
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }

      &.p2 {
        span {
          position: relative;

          .packed-doodle {
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .arrow-one-doodle {
          right: -60px;
          bottom: -10px;
        }
      }
    }

    .buttons-container {
      // margin-top: 88px;

      button {
        padding: 10px 30px;
        border-radius: 50px;
        border: 2px solid $dark-blue;
        background: $dark-blue;
        color: white;
        margin: 0 20px;
        position: relative;
        overflow: hidden;

        transition: 0.3s ease all;

        &.darkfont {
          color: $dark-blue;
          position: relative;
        }

        &:hover {
          &.darkfont {
            background-color: white;
            color: $orange;
            border-color: $orange;
          }

          background-color: $orange;
          border-color: $orange;
        }
      }
    }
  }
}
.hide {
  display: none;
}
</style>
