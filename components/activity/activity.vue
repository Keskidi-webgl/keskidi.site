<template>
  <div class="activity">
    <div class="activity-item activity-1 activity-itemActive">
      <h2 class="activity-item--title">S'enjailler</h2>
      <span>Pour vous, quel objet représente ce mot ?</span>

      <button class="activity-item--btn"> ACTIVITE SUIVANTE</button>
    </div>

    <div class="activity-item activity-2">
      <h1>activity 2</h1>
      <button class="activity-item--btn"> ACTIVITE SUIVANTE</button>
    </div>

    <div class="activity-item activity-3">
      <h1>activity 3</h1>
      <button class="activity-item--btn"> ACTIVITE SUIVANTE</button>
    </div>

    <canvas ref="activitycanvas"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import {GlobalSceneInitializer} from "~/core/utils/initializers";
import ActivitySceneInitializer from "~/core/utils/initializers/ActivitySceneInitializer";
import {SceneManager} from "~/core/managers";

@Component({})
export default class activity extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)

  public mounted() {
    console.log("activity")
  }

}
</script>

<style lang="scss">
.activity{
  position: absolute;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: white;
  top: 0;
  transform: translateY(100%);
  padding: 2.5rem;
  overflow: hidden;
  &-item{
    width: 100%;
    height: 100%;
    display: none;
    &--title{
      font-size: 6rem;
    }
    &--btn{
      padding: 20px;
      background: red;
      z-index: 999;
    }
  }
  &-itemActive{
    display: flex;
    flex-direction: column;
  }

}
</style>
