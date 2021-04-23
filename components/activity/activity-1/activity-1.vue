<template>

    <!--    composant activité 1-->
    <div class="activity-item activity-1 activity-itemActive">
      <h2 class="activity-item--title">S'enjailler</h2>
      <span>Pour vous, quel objet représente ce mot ?</span>

      <button class="activity-item--btn"> ACTIVITE SUIVANTE</button>
      <canvas class="activity-1-objects"></canvas>
      <canvas class="activity-1-tom"></canvas>

      <activity1-result></activity1-result>
      <!--    composant enfant activité   overlay resultat avec le canvas cuisse de poulet -->
    </div>

</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import activity1Result from "~/components/activity/activity-1/activity-1-result.vue";
@Component({
  components:{
    activity1Result
  }
})
export default class activity1 extends Vue {

  public mounted() {
    console.log("activity1")
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
