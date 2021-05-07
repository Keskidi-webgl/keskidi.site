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
      hover-text="#FF6644"
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
  public instance:any
  public pause:boolean = false

  nextActivity(){
    this.activityStore.setCurrentActivity(ACTIVITY_TYPE.ACTIVITIES_PROGRESSION)
    this.instance.destroyConfettis()

  }

  mounted(){
    this.createConfetti()
  }

  createConfetti(){

    let that = this
    class Confetti {
      public width:number
      public height:number
      public color:string
      public speed:number
      public x:number
      public y:number
      public rotation:number
      public confetti!:Confetti
      constructor(width:number|null, height:number|null, color:string|null, speed:number|null, x:number|null, y:number|null, rotation:number|null) {
        this.width = width as number;
        this.height = height as number;
        this.color = color as string;
        this.speed = speed as number;
        this.x = x as number;
        this.y = y as number;
        this.rotation = rotation as number;
      }

      update() {
        const y = this.y < wH ? this.y += this.speed : -20;
        const x = this.x + Math.sin(this.y * (this.speed/100));
        this.x = x > wW ? 0 : x;
        this.y = y;
        ctx!.fillStyle = this.color;
        ctx!.save();
        ctx!.translate(x + (this.width/2), y + (this.height/2) );
        ctx!.rotate((y*this.speed) * Math.PI/180);
        ctx!.scale(Math.cos(y/10), 1);
        ctx!.fillRect(
          -this.width/2,
          -this.height/2,
          this.width,
          this.height
        );
        ctx!.restore();
      }

      destroyConfettis(){
        that.pause = true
      }

    }
    this.instance = new Confetti(null,null,null,null,null,null,null)

    const AMOUNT = 150;
    const INTERVAL = 50;
    const COLORS = ['#000648', '#256DFF', '#FFFFFF', '#FF9D6F'];
    const canvas :HTMLCanvasElement = document.getElementById('confetti') as HTMLCanvasElement;
    const ctx = canvas!.getContext('2d');
    const wW = window.innerWidth;
    const wH = window.innerHeight;

    const random = (min:number, max:number) => {
      return Math.random() * (max - min) + min;
    };

    const randomInt = (min:number, max:number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const confetties:Array<Confetti> = [];



    canvas!.width = wW;
    canvas!.height = wH;

    const drawConfetti = () => {
      ctx!.clearRect(0, 0, wW, wH);

      confetties.forEach((conf:Confetti) => {
        conf.update();
      });

      if (that.pause){
        return
      }
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
          let confetti  = new Confetti(width, height, color, speed, x, -20, 0);
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
