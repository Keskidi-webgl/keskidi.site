import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const modelsLoader = (url:string) =>{

  return new Promise(resolve => {
    new GLTFLoader().load(url, resolve);
    console.log('okokok',url)
  })

}

export default modelsLoader;
