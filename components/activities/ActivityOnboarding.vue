<template>
  <div class="onboarding">
    <div class="onboarding-container">
      <h1 class="main-font onboarding-title">
        Tu trouveras <strong>3 activités</strong> pour devenir le
        <strong>boss du langage</strong>
        <img
          src="~/assets/img/arrow-draft-one.png"
          class="doodle bottom-left-arrow"
          alt=""
        />
        <img
          src="~/assets/img/arrow-draft-two.png"
          class="doodle top-left-arrow"
          alt=""
        />
        <img
          src="~/assets/img/circle-doodle-huge.png"
          class="doodle circle-doodle"
          alt=""
        />
        <img
          src="~/assets/img/doodle-line.png"
          class="doodle line-doodle"
          alt=""
        />
      </h1>
      <div class="list">
        <ChoiceCard
          class="onboarding-card"
          title="Découvrir"
          :image="require('~/assets/img/onboarding-discover.svg')"
        >En premier lieu, tu devras deviner entre
          <strong>2 objets</strong> celui qui correspond au mot.
        </ChoiceCard
        >
        <ChoiceCard
          class="onboarding-card"
          title="Informer"
          :image="require('~/assets/img/onboarding-info.svg')"
        >On a bien fait notre travail comme Alain Rey en te concoctant un
          <strong>mélange de connaissances</strong>.
        </ChoiceCard
        >
        <ChoiceCard
          class="onboarding-card"
          title="Pratiquer"
          :image="require('~/assets/img/onboarding-practice.svg')"
        >Ce n'est pas tout de connaître le mot, on va aussi t'apprendre à bien
          <strong>le prononcer</strong> et comment
          <strong>l'utiliser</strong>.
        </ChoiceCard
        >
      </div>
      <div class="action-container w-100">
        <CustomButton
          class="onboarding-btn-next"
          @click.native="goActivityOne"
          arrow-color="white"
          color="#000648"
          text="Et zéé parti !"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from "nuxt-property-decorator";
import CustomButton from "~/components/buttons/CustomButton.vue";
import ChoiceCard from "~/components/cards/ChoiceCard.vue";
import ActivityStore from "~/store/activity";

@Component({
  components: {
    CustomButton,
    ChoiceCard
  }
})
export default class ActivityOnboarding extends Vue {
  public activityStore = getModule(ActivityStore, this.$store)

  goActivityOne() {
    this.activityStore.setCurrentActivity(null)
  }
}
</script>

<style scoped lang="scss">

.onboarding {
  background-color: $dark-cream;
  height: 100%;
  position: relative;

  &-container {
    display: flex;
    max-width: 1140px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 100%;
    z-index: 100;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    h1 {
      color: $dark-blue;
      position: relative;
      z-index: 1;

      .doodle {
        position: absolute;
        z-index: -1;

        &.bottom-left-arrow {
          bottom: -50px;
          left: 25px;
        }

        &.top-left-arrow {
          top: -65px;
          left: -30px;
        }

        &.circle-doodle {
          left: 280px;
          top: 0px;
        }

        &.line-doodle {
          right: 0;
          bottom: -10px;
        }
      }
    }

    .list {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .action-container {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
