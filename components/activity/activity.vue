<template>
  <div class="activity-container">

<!-- composant progress-bar    -->

    <activity1></activity1>
<!--    composant activité 1-->
<!--    <div class="activity-item activity-1 activity-itemActive">-->
<!--      <h2 class="activity-item&#45;&#45;title">S'enjailler</h2>-->
<!--      <span>Pour vous, quel objet représente ce mot ?</span>-->

<!--      <button class="activity-item&#45;&#45;btn"> ACTIVITE SUIVANTE</button>-->
<!--&lt;!&ndash;   objets    <canvas></canvas>&ndash;&gt;-->
<!--&lt;!&ndash;   TOM   <canvas></canvas>&ndash;&gt;-->

<!--&lt;!&ndash;    composant enfant activité   overlay resultat avec le canvas cuisse de poulet &ndash;&gt;-->
<!--    </div>-->

    <div class="activity-item activity-2">
      <h1>activity 2</h1>
      <button class="activity-item--btn"> ACTIVITE SUIVANTE</button>
    </div>

    <div class="activity-item activity-3">
      <h1>activity 3</h1>
      <button class="activity-item--btn"> ACTIVITE SUIVANTE</button>
    </div>

<!--  components  conclusion progression -->

    <canvas ref="activitycanvas"></canvas>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import {GlobalSceneInitializer} from "~/core/utils/initializers";
import ActivitySceneInitializer from "~/core/utils/initializers/ActivitySceneInitializer";
import {SceneManager} from "~/core/managers";
import activity1 from "~/components/activity/activity-1/activity-1.vue";

@Component({
  components:{
    activity1
  }
})
export default class activity extends Vue {
  public sceneModule = getModule(SceneModule, this.$store)

  public mounted() {
    console.log("activity")
  }

}
</script>

<style lang="scss">
.activity{
  &-container{
    position: absolute;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: white;
    top: 0;
    transform: translateY(100%);
    padding: 2.5rem;
    overflow: hidden;
  }
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
