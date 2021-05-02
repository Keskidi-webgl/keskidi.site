<template>
  <div class="page-container" data-namespace="onboarding">
    <h1 class="main-font">
      Tu trouveras 3 activités pour devenir le boss du langage
    </h1>
    <div class="list">
      <ChoiceCard title="Découvrir" image="onboarding-discover.png"
        >En premier lieu, tu devras deviner entre
        <strong>2 objets</strong> celui qui correspond au mot.</ChoiceCard
      >
      <ChoiceCard title="Informer" image="onboarding-info.png"
        >On a bien fait notre traval comme Alain Rey en te concoctant un
        <strong>mélange de connaissances</strong>.</ChoiceCard
      >
      <ChoiceCard title="Pratiquer" image="onboarding-practice.png"
        >Ce n'est pas tout de connaître le mot, on va aussi t'apprendre à bien
        <strong>le prononcer</strong> et comment
        <strong>l'utiliser</strong>.</ChoiceCard
      >
    </div>
    <div class="action-container w-100">
      <CustomButton
        @click.native="hop()"
        arrow-color="white"
        color="#000648"
        text="Et zéé parti !"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import CustomButton from "~/components/buttons/CustomButton.vue";
import ChoiceCard from "~/components/cards/ChoiceCard.vue";

@Component({
  components: {
    CustomButton,
    ChoiceCard
  }
})
export default class Onboarding extends Vue {}
</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  background-color: $dark-cream;
  justify-content: space-around;
  padding: 0 135px;

  h1 {
    color: $dark-blue;
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
</style>
