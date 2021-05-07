<template>
  <div class="scene-navigation-panel">
    <nuxt-link
      :class="{ isDisabled: globalSceneStore.isCameraMoving }"
      v-if="!globalSceneStore.activeObject"
      class="scene-navigation-panel-button scene-btn previous-scene"
      :to="previousSceneLink()"
      @mouseenter.native="splitAnimation('.room-prev')"
    >
      <p ref="room" class="room-name room-prev js-split-char main-font" v-html="prevSplitedRoom()"></p>
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
      @mouseenter.native="splitAnimation('.room-next')"
    >
      <p ref="room" class="room-name room-next js-split-char main-font" v-html="nextSplitedRoom()"></p>
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
import { defineComponent, useContext,onUpdated } from '@nuxtjs/composition-api'

@Component({})
export default class SceneNavigationPanel extends Vue {
  public globalSceneStore = getModule(GlobalSceneStore, this.$store);
  public next: string | undefined = this.globalSceneStore.activeRoom?.nextRoom()
    .nameForHuman;
  public prev:
    | string
    | undefined = this.globalSceneStore.activeRoom?.previousRoom().nameForHuman;

  public roomsName:Array[string] = [this.next,this.prev]
  public formatedRooms:Array[string] = []
  public words:any

  public nextRoom:string

  public backHomeLink() {
    return "/";
  }

  public nextSceneLink() {
    console.log(this.nextSplitedRoom())
    console.log(this.prevSplitedRoom())
    let nextRoom = this.globalSceneStore.activeRoom?.nextRoom();
    this.next = nextRoom?.nameForHuman;
    return nextRoom?.name;
  }

  public previousSceneLink() {
    console.log(this.prevSplitedRoom())
    console.log(this.nextSplitedRoom())
    let prevRoom = this.globalSceneStore.activeRoom?.previousRoom();
    this.prev = prevRoom?.nameForHuman;
    return prevRoom?.fullUrl;
  }

  public goBackObjectRoom() {
    return this.globalSceneStore.activeObject?.room().fullUrl;
  }

  public nextSplitedRoom(){
    return this.splitText(this.next)
  }

  public prevSplitedRoom(){
    return this.splitText(this.prev)
  }

  mounted(){

  }

  splitText(text:string){

    let txtSpan = ''
    text.split('').forEach((content:any) =>{
      txtSpan += `<span>${content}</span>`
    })

    return txtSpan
  }

  splitAnimation(identifier:string){
    let el = document.querySelector(identifier)
    let letters = el.querySelectorAll( 'span')

    // for (let i = letters.length - 1; i>= 0; i--){
    //   let $el = letters[i]
    //   let delay = 0.02 * i

    // TODO --> adapt animation & fix typescript errors
    
      gsap.to(letters,{
        duration:0.5,
        ease: 'power1.in',
        stagger:{
          each: 0.2
        },
        translateY:-50,
        autoAlpha: 1,
        onComplete:function (){
          gsap.set(letters, {
            translateY: 50
          });
          gsap.to(letters,  {
            duration: 0.3,
            ease: 'power1.out',
            opacity: 1,
            translateY: 0,
          });
        }})

    // }
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
        //transition: 0.2s ease all;
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
