<template>

  <div class="activity-1-result">
    <h2 class="activity-item--title">Result</h2>
    <canvas class="activity-1-result"></canvas>
  </div>

</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'


@Component({})
export default class activity1Result extends Vue {

  public mounted() {
    console.log("activity1-result")
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
