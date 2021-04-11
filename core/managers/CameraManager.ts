import * as THREE from 'three';
import { gsap } from "gsap";

class CameraManager{
  constructor() {
  }

  goTo(camera:any,target:any){
    console.log("go to ")

    gsap.to( camera.position, {
      duration: 1,
      x: target.position.x + 10 ,
      y: target.position.y + 5 ,
      z: target.position.z - 5 ,
      onUpdate: () => {

        camera.updateProjectionMatrix();
        camera.lookAt( target.position );
      }
    } );
  }

  goBack(camera:any,target:any){
    console.log("back to ")
    gsap.to( camera.position, {
      duration: 1,
      x: target.x ,
      y: target.y ,
      z: target.z ,
      onUpdate: () => {
        camera.updateProjectionMatrix();
        camera.lookAt(target);
      }
    } );
  }
}

const cameraManagerInstance = new CameraManager();
Object.freeze(cameraManagerInstance);

export default cameraManagerInstance;
