<template>
  <div class="scene-navigation-panel">
    <nuxt-link
      :class="{ isDisabled: globalSceneStore.isCameraMoving }"
      v-if="!globalSceneStore.activeObject"
      class="scene-navigation-panel-button scene-btn previous-scene"
      :to="previousSceneLink()"
    >
      <p ref="room" class="room-name js-split-char main-font">{{ prev }}</p>
      <img src="~/assets/img/next-arrow.svg" alt="" />
    </nuxt-link>
    <nuxt-link
      v-if="!globalSceneStore.activeObject"
      :class="{ isDisabled: globalSceneStore.isCameraMoving }"
      class="scene-navigation-panel-button back-home"
      :to="backHomeLink()"
    >
      <img src="~/assets/img/home.svg" alt="" />
    </nuxt-link>
    <nuxt-link
      :class="{ isDisabled: globalSceneStore.isCameraMoving }"
      v-if="!globalSceneStore.activeObject"
      class="scene-navigation-panel-button scene-btn next-scene"
      :to="nextSceneLink()"
    >
      <p ref="room" class="room-name js-split-char main-font">{{ next }}</p>
      <img src="~/assets/img/next-arrow.svg" alt="" />
    </nuxt-link>

    <nuxt-link
      v-if="globalSceneStore.activeObject"
      :class="{ isDisabled: globalSceneStore.isCameraMoving }"
      class="scene-navigation-panel-button object-room"
      :to="goBackObjectRoom()"
    >
      <img src="~/assets/img/next-arrow.svg" alt="" />
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from "nuxt-property-decorator";
import GlobalSceneStore from "~/store/globalScene";
import gsap from "gsap";

@Component({})
export default class SceneNavigationPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public next: string | undefined = this.globalSceneStore.activeRoom?.nextRoom()
    .nameForHuman;
  public prev:
    | string
    | undefined = this.globalSceneStore.activeRoom?.previousRoom().nameForHuman;

  public words:any

  public backHomeLink() {
    return "/";
  }

  public nextSceneLink() {
    let nextRoom = this.globalSceneStore.activeRoom?.nextRoom();
    this.next = nextRoom?.nameForHuman;
    return nextRoom?.name;
  }

  public previousSceneLink() {
    let prevRoom = this.globalSceneStore.activeRoom?.previousRoom();
    this.prev = prevRoom?.nameForHuman;
    return prevRoom?.fullUrl;
  }

  public goBackObjectRoom() {
    return this.globalSceneStore.activeObject?.room().fullUrl;
  }

  // TODO --> ADD CUSTOM EVENT WHEN we leave current page
  mounted(){
    this.words = document.querySelectorAll('.js-split-char')
    this.launchSplitText()
    this.splitText()
  }

  launchSplitText(){
    let words = document.querySelectorAll('.js-split-char')
    let sceneBtn = document.querySelectorAll('.scene-btn')

    sceneBtn.forEach((el:any,index:number)=>{
      el.addEventListener('mouseenter',()=>{
        //@ts-ignore
        this.splitAnimation(words[index])
      })
    })
  }

  splitText(){
    console.log("split INIIT",this.words)
    this.words.forEach((el:any)=>{
        let txtSpan = ''
        let txt = el.textContent
        txt!.split('').forEach((content:any) =>{
          txtSpan += `<span>${content}</span>`
        })
        el.innerHTML = txtSpan
      })
    }

  splitAnimation(el:HTMLElement){
    let letters = el.querySelectorAll( 'span')

    console.log("lauch animation split")
    for (let i = letters.length - 1; i>= 0; i--){
      let $el = letters[i]
      let delay = 0.02 * i

      gsap.to($el,{
        duration:0.2,
        ease: 'power1.in',
        delay: delay,
        yPercent:'-50',
        opacity: 1,
        onComplete:function (){
          gsap.set($el, {
            yPercent: '50'
          });
          console.log("ekip")
          gsap.to($el,  {
            duration: 0.3,
            ease: 'power1.out',
            opacity: 1,
            yPercent: '0',
          });
        }})

    }
  }

}
</script>

<style lang="scss">
.scene-navigation-panel {
  position: fixed;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;

  .scene-navigation-panel-button {
    width: 35px;
    height: 35px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
    position: relative;

    &.previous-scene img {
      transform: rotate(180deg);
    }

    &.next-scene,
    &.previous-scene,
    &.object-room {
      box-shadow: 0px 4px 25px -1px rgba(0, 0, 0, 0.15);

      .room-name {
        position: absolute;
        top: -30px;
        color: $dark-blue;
        opacity: 0;
        transition: 0.2s ease all;
      }

      &:hover .room-name {
        opacity: 1;
      }

      img {
        width: 8px;
      }

      &:before {
        content: "";
        background-color: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        border-radius: 50%;
        height: 48px;
        width: 48px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        box-shadow: 0px 4px 25px -1px rgba(190, 190, 190, 0.15);
      }
    }

    &.back-home {
      background-color: $dark-blue;
      width: 52px;
      height: 52px;
      box-shadow: 0px 2px 9px 3px rgba(0, 6, 72, 0.25);

      img {
        width: 27px;
      }
    }

    &.object-room {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        transform: rotate(90deg);
      }
    }
  }

  .isDisabled {
    pointer-events: none;
  }
  .js-split-char {
    display: block;
    overflow: hidden;
    width: 130px;
    span , path {
      display: inline-block;
      vertical-align: middle;
      min-width: 0.25em;
      line-height:1;
    }
  }
}
</style>
