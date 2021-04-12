import {Clock, Group, Object3D, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer} from "three";
import {CanvasDimension} from "~/core/types";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import modelsLoader from "~/core/managers/AssetsManager";
import CameraManager from "~/core/managers/CameraManager";
import EventEmitter from "events"

export default class App {

  private readonly canvasElement: HTMLCanvasElement
  private sceneElements: [] = [];
  private clock: Clock;
  private scene: Scene;
  private canvasDimension: CanvasDimension
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private controls: OrbitControls;
  private home:Group;
  private stats: Stats;
  private raycaster: Raycaster;
  private currentIntersect:any;
  private mouse:any;
  private objArray:any;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvasElement = canvasElement
    this.canvasDimension = this.getWindowSizes()

    this.stats = Stats();
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );

    this.init()
    this.initModels()

    console.log(this.scene)
  }

  public bindEvents(){
    window.addEventListener('resize',this.resize.bind(this))

    window.addEventListener('mousemove',(evt)=>{
      this.mouse.x = evt.clientX / this.canvasDimension.width * 2 - 1
      this.mouse.y = - (evt.clientY / this.canvasDimension.height) * 2 + 1
    })

    window.addEventListener('click', (el) => {

      // send state in user data (is clicked....)
        if(this.currentIntersect.object.name === "Magazin") {
            console.log('magazine ')
            console.log(this.currentIntersect)
          CameraManager.goInside(this.camera,this.currentIntersect.object.parent)

          let exerciceEvent = new Event('toExercice');
          window.dispatchEvent(exerciceEvent)
        }


    })

  }

  /**
   * Init scene
   * @private
   */

  public start()
  {
    this.tick();
  }

  private initScene()
  {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('black')
  }

  private initCamera()
  {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvasDimension.width / this.canvasDimension.height,
      1,
      1000
    )
    this.camera.position.set(70, 50, 10)
    this.camera.updateMatrixWorld();



    // this.scene.add(this.camera)

    this.controls = new OrbitControls(this.camera, this.canvasElement)
    this.controls.target.set(0, 0.75, 0)
    this.controls.enableDamping = true
  }

  public init(){
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.initScene()
    this.initCamera()
    this.initLights()
    this.bindEvents()
  }

  initLights(){


    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 100, 100, 70 );

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    this.scene.add( spotLight );

    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    this.scene.add( spotLightHelper );
  }

  initModels(){

    let p3 = modelsLoader('/models/V0.gltf').then((result:any) => {
       this.home = result.scene
    });

    Promise.all([p3]).then(() => {

      this.home.scale.set(0.25, 0.25, 0.25)
      this.home.position.set(0,0,0);
      this.home.name = 'maison'
      console.log(this.home)

      this.home.traverse( (child:any)=>{

        if (child.name  === "Magazin"){
          console.log(child)
          child.material.color.set(0x00FF00);
        }


      })



      //add model to the scene

      this.scene.add(this.home);

      // todo --> make this dynamic
      this.objArray = [this.home]

      //continue the process
      this.initRenderer()
      this.start()
    });

  }


  /**
   * Init renderer
   * @private
   */
  private initRenderer()
  {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasElement,
      antialias: true,
      alpha: true
    });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1
    this.renderer.setPixelRatio(DPR)
    this.renderer.setSize(this.canvasDimension.width, this.canvasDimension.height)
  }

  private tick()
  {
    this.stats.begin()


    this.raycaster.setFromCamera(this.mouse, this.camera)

    const intersects = this.raycaster.intersectObjects(this.objArray,true)

    if(intersects.length) {

      this.currentIntersect = intersects[0]
    }
    else {
      if(this.currentIntersect) {
        console.log('mouse leave')
      }

      this.currentIntersect = null
    }



    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.tick.bind(this))
    this.stats.end()

  }
  /**
   * Event on windows resize
   */
  public resize()
  {
    // Update sizes
    this.canvasDimension.width = window.innerWidth
    this.canvasDimension.height = window.innerHeight

    // Update camera
    this.camera.aspect = this.canvasDimension.width / this.canvasDimension.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.canvasDimension.width, this.canvasDimension.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    console.log('resize enabled ✅')
  }

  /**
   * Helper to get Canvas dimensions
   * @private
   */
  private getWindowSizes(): CanvasDimension
  {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}
