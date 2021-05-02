<template>
  <div class="activity-one-result">
    <img :src="resultData.goodObjectUrl" alt="">
    <CustomButton arrow-color="#FF6644" color="white" text="Passer à l'activité suivante"></CustomButton>
  </div>
</template>

<script lang="ts">
import {Component, getModule, Prop, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import CustomButton from "~/components/buttons/CustomButton.vue";
import {ActivityOneResultData} from "~/core/types";

@Component({
  components: {
    CustomButton
  }
})
export default class ActivityOneResult extends Vue {
  @Prop({type: Object, required: true})
  readonly resultData!: ActivityOneResultData;

  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)

  mounted() {
    console.log('mounted activity one result', this.resultData)
  }
}
</script>

<style scoped lang="scss">
.activity-one-result {
  background: linear-gradient(107.28deg, #FF6644 29.48%, #FF9D6F 100%);
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  img {
    width: 500px;
    margin-bottom: 60px;
  }
}
</style>
