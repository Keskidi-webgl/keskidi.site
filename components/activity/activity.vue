<template>
  <div class="activity-container">

<!-- composant progress-bar    -->

    <activity1></activity1>
    <activity2></activity2>
    <activity3></activity3>

<!--  components  conclusion progression -->

<!--    <canvas ref="activitycanvas"></canvas>-->
  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import SceneModule from "~/store/scene";
import activity1 from "~/components/activity/activity-1/activity-1.vue";
import activity2 from "~/components/activity/activity-2/activity-2.vue";
import activity3 from "~/components/activity/activity-3/activity-3.vue";
@Component({
  components:{
    activity1,
    activity2,
    activity3
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
