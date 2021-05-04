<template>
  <div class="activities-result">

    <canvas id="confetti"></canvas>
    <img class="activities-result--img" :src="activityStore.dataWord.activity_data.good_object" alt="">

      <div class="activities-result--marquee" >
        <span v-for="index in 20" :key="index">BRAVO&nbsp;</span>
      </div>

    <CustomButton
      @click.native="nextActivity"
      arrow-color="#FF6644"
      color="white"
      text="Continuer"
    ></CustomButton>

  </div>
</template>

<script lang="ts">
import {Component, getModule, Vue} from 'nuxt-property-decorator'
import GlobalSceneStore from "~/store/globalScene"
import ActivityStore from "~/store/activity"
import CustomButton from "~/components/buttons/CustomButton.vue";
import {ACTIVITY_TYPE} from "~/core/enums";

@Component({
  components:{
    CustomButton
  }
})
export default class ActivitiesResult extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store)
  public activityStore = getModule(ActivityStore, this.$store)
  public index:number = 10

  nextActivity(){
    this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITIES_PROGRESSION)
  }

  mounted(){
    this.createConfetti()
  }

  createConfetti(){

    // TODO --> update confetti code & add destroy method

    const AMOUNT = 150;
    const INTERVAL = 50;
    const COLORS = ['#000648', '#256DFF', '#FFFFFF', '#FF9D6F'];
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    const wW = window.innerWidth;
    const wH = window.innerHeight;

    const random = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const randomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const confetties = [];

    class Confetti {
      constructor(width, height, color, speed, x, y, rotation) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
      }

      update() {
        const y = this.y < wH ? this.y += this.speed : -20;
        const x = this.x + Math.sin(this.y * (this.speed/100));
        this.x = x > wW ? 0 : x;
        this.y = y;
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(x + (this.width/2), y + (this.height/2) );
        ctx.rotate((y*this.speed) * Math.PI/180);
        ctx.scale(Math.cos(y/10), 1);
        ctx.fillRect(
          -this.width/2,
          -this.height/2,
          this.width,
          this.height
        );
        ctx.restore();
      }

    }

    canvas.width = wW;
    canvas.height = wH;

    const drawConfetti = () => {
      ctx.clearRect(0, 0, wW, wH);

      confetties.forEach(confetti => {
        confetti.update();
      });

      requestAnimationFrame(drawConfetti);
    }



    const renderConfetti = () => {
      let count = 0;
      let stagger = setInterval(() => {
        if(count < AMOUNT) {
          const x = random(0, wW);
          const speed = random(2.2, 2.8);
          const width = 24 / speed;
          const height = 48 / speed;
          const color = COLORS[randomInt(0, COLORS.length)];
          const confetti = new Confetti(width, height, color, speed, x, -20, 0);
          confetties.push(confetti);
        }
        else {
          clearInterval(stagger);
        }
        count++;
      }, INTERVAL);

      drawConfetti();
    }

    renderConfetti();
  }

}
</script>

<style scoped lang="scss">
.activities-result {
  background: linear-gradient(107.28deg, #ff6644 29.48%, #ff9d6f 100%);
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
  &--img{
    width: 540px;
    height: 540px;
    z-index: 4;
  }
  &--marquee{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    span{
      text-transform: uppercase;
      will-change: transform;
      transform: translateX(0);
      white-space: nowrap;
      animation: marquee 24s linear infinite;

      // Extra Styling
      font-size: 120px;
      font-family:$main_font;
      font-weight: 900;
      color: white;
    }
  }
}

#confetti{
  position: absolute;
  top: 0;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

</style>
