import { gsap } from "gsap";

// puyb
import { Vue, Component, mixins } from 'nuxt-property-decorator'

@Component
export default class transitions extends Vue{

  public exerciceEnter(el:any,done:any){
    console.log("enter !!!")
    gsap.to(el,{
      translateY:0,
      duration:1,
      onComplete:()=>{
        console.log("FINISH !!!")
        done()
      }
    })
  }
}
