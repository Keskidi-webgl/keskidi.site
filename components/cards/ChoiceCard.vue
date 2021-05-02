<template>
  <div class="choice-card">
    <img :src="require(`~/assets/img/${this.image}`)" alt="" />
    <p class="choice-title big-title">{{ title }}</p>
    <span class="choice-description main-font"> <slot /> </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class ChoiceCard extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, required: true }) readonly image!: string;
}
</script>

<style scoped lang="scss">
.choice-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(
    120.55deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(42px);
  border: 1px solid #fdebe2;
  border-radius: 32px;
  height: 240px;
  width: 360px;
  padding: 38px 45px;
  position: relative;
  justify-content: flex-end;
  transform: translate(0, 20%);

  .choice-title {
    /* Titres */
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 40px;

    display: flex;
    align-items: center;
    text-align: center;

    /* Blue-dark */

    color: $dark-blue;

    mix-blend-mode: normal;
  }

  .choice-description {
    color: $dark-blue;
  }
}
</style>
