<template>
  <div @click="toggleSound" class="sound">
    <div class="soundWave">
      <div :class="{isActive: globalStore.isSoundEnabled}" v-for="index in 4" class="sound-bar sound-barActive "></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalStore from "~/store/global";
import GlobalSceneStore from "~/store/globalScene";
import ActivityStore from "~/store/activity";
import {AssetsManager} from "~/core/managers";
import {AUDIO_ASSET} from "~/core/enums";

@Component
export default class SoundButton extends Vue {
  public globalStore = getModule(GlobalStore, this.$store);
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public activityStore = getModule(ActivityStore, this.$store);
  public audio = AssetsManager.getAudio(AUDIO_ASSET.GLOBAL_AMBIANCE).data!

  mounted() {
    this.audio.loop = true
    if (this.globalStore.isSoundEnabled) {
      this.audio.play()
    }
  }

  public toggleSound() {
    if (this.audio.paused) {
      this.audio.play();
      this.globalStore.setUserAudioPreferences(true);
    } else {
      this.audio.pause();
      this.globalStore.setUserAudioPreferences(false);
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #505861;
$size: 2px;
$duration-base: .8;

.sound {
  display: flex;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  z-index: 99;
  left: 25px;

  &-bar {
    width: $size;
    height: $size;
    background-color: $dark-blue;
    margin-right: $size;
    transform: scaleY(1);
    transition: 0.6s all ease;

    &:nth-child(1) {
      animation-name: bar-scale-md;
      animation-duration: $duration-base + 0.2s;
    }

    &:nth-child(4n) {
      animation-name: bar-scale-xl;
      animation-duration: $duration-base + .2s;
    }

    &:nth-child(4) {
      animation-duration: $duration-base + .35s;
    }

    &:nth-child(3) {
      animation-name: bar-scale-lg;
      animation-duration: $duration-base + 0s;
    }

    &:nth-child(6) {
      animation-name: bar-scale-md;
      animation-duration: $duration-base + .05s;
    }

    //&:nth-child(1),
    &:nth-child(2),
    &:nth-child(5),
    &:nth-child(7),
    &:nth-child(9) {
      animation-name: bar-scale-sm;
      animation-duration: .9s;
    }
  }
}

.soundWave {
  display: flex;
  height: 40px;
  width: 40px;
  border: 2px solid $dark-blue;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  transition: 0.6s all ease;
}

@keyframes bar-scale-sm {
  0%, 50% {
    transform: scaleY(1);
  }
  25% {
    transform: scaleY(6);
  }
  75% {
    transform: scaleY(4);
  }
}

@keyframes bar-scale-md {
  0%, 50% {
    transform: scaleY(2);
  }
  25% {
    transform: scaleY(6);
  }
  75% {
    transform: scaleY(5);
  }
}

@keyframes bar-scale-lg {
  0%, 50% {
    transform: scaleY(8);
  }
  25% {
    transform: scaleY(4);
  }
  75% {
    transform: scaleY(6);
  }
}

@keyframes bar-scale-xl {
  0%, 50% {
    transform: scaleY(1);
  }
  25% {
    transform: scaleY(7);
  }
  75% {
    transform: scaleY(11);
  }
}

.isActive {
  animation-duration: .5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  transition: 0.6s all ease;

}

</style>
