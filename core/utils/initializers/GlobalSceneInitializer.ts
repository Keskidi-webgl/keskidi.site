import {AssetsManager, SceneManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";
import {
  CanvasTexture,
  CircleGeometry,
  CylinderGeometry,
  DirectionalLight,
  HemisphereLight,
  HemisphereLightHelper,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneBufferGeometry,
  Scene,
  DoubleSide,
  ShadowMaterial,
  WebGLRenderer,
  DirectionalLightHelper,
  Group,
  PlaneGeometry,
  CameraHelper,
  AmbientLight,
  SpotLight,
  FrontSide,
  Color,
  BoxGeometry, MeshLambertMaterial, sRGBEncoding, PCFSoftShadowMap, SpotLightHelper, BackSide,
} from "three";
import {Initializers} from "~/core/defs";
import {GLTF_ASSET} from "~/core/enums";
import GlobalSceneStore from "~/store/globalScene";
import GlobalSceneConfig from "~/core/config/global-scene/global-scene.config";

/**
 * @description
 * This initializer is responsible for creating the global scene of the application
 */
export default class GlobalSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, globalSceneStore: GlobalSceneStore }, void> {

  init() {
    SceneManager.GLOBAL_SCENE = this._createInstance()
    this._createCanvasBackground()
    this._addGltfGlobalScene()
    this._createPlanesBackground()
    this._addGltfTom()
    this._registerPresetPositions()
    this._addLights(true)
    // this._configGUI()
    //
    SceneManager.GLOBAL_SCENE.start()
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createInstance() {
    // Set canvas dimensions
    this._data.canvas.width = Helpers.getWindowSizes().width
    this._data.canvas.height = Helpers.getWindowSizes().height

    // Create camera
    const camera = this._createCamera()

    // Create scene
    const scene = this._createScene()

    // Create renderer
    const renderer = this._createRender()

    renderer.outputEncoding = sRGBEncoding
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    return new SceneManager({
      canvas: this._data.canvas,
      camera: camera,
      scene: scene,
      renderer: renderer,
      defaultRation: 2,
      activateOrbitControl: true,
      onRender: (ctx) => {

        // Add interactions points tracking
        if (ctx.camera instanceof PerspectiveCamera) {
          ctx.camera.updateProjectionMatrix()
        }
        for (const point of this._data.globalSceneStore.activeInteractionPoints) {
          const screenPosition = point.canvasCoords().clone()
          screenPosition.project(SceneManager.GLOBAL_SCENE.camera)
          const updateData = {
            name: point.name,
            transformX: screenPosition.x * this._data.canvas.clientWidth * 0.5,
            transformY: - screenPosition.y * this._data.canvas.clientHeight * 0.5
          }

          this._data.globalSceneStore.updatePositionsInteractivePoint(updateData)
        }
      },
      onResume:(ctx)=> {
        this._addGltfTom()
      },
      onWindowResize: (ctx) => {
        ctx.canvas.height = window.innerHeight
        ctx.canvas.width = window.innerWidth

        if (ctx.camera instanceof PerspectiveCamera) {
          ctx.camera.aspect = ctx.canvas.width / ctx.canvas.height
          camera.updateProjectionMatrix()
        }

        ctx.renderer.setSize(ctx.canvas.width, ctx.canvas.height)
        ctx.renderer.setPixelRatio(Math.min(Helpers.getWindowRatio(), ctx.defaultRatio))
      }
    })//.enableStats().enableAxesHelpers(1000)

  }

  /**
   * Create gui
   */
  private _configGUI() {
    let sceneFolder = SceneManager.GLOBAL_SCENE.gui.addFolder("Scene")
    sceneFolder.add(SceneManager.GLOBAL_SCENE.scene.position,'x',-500,500,0.01).listen()
    sceneFolder.add(SceneManager.GLOBAL_SCENE.scene.position,'y',-500,500,0.01).listen()
    sceneFolder.add(SceneManager.GLOBAL_SCENE.scene.position,'z',-500,500,0.01).listen()
  }

  /**
   * Create perspective camera
   */
  private _createCamera() {
    return new PerspectiveCamera(
      50,
      this._data.canvas.width / this._data.canvas.height,
      1,
      10000
    )
  }

  /**
   * Create scene
   */
  private _createScene() {
    return new Scene()
  }

  /**
   * Create renderer
   * @private
   */
  private _createRender() {
    return new WebGLRenderer({
      canvas: this._data.canvas,
      antialias: true,
      alpha: true,
    })
  }


  private _createPlanesBackground(){

    let globalScene = SceneManager.GLOBAL_SCENE.scene

    const planeGeometry = new PlaneBufferGeometry( 2000, 2000 ).rotateX( Math.PI / 2 );
    var material = new ShadowMaterial({
      depthWrite: false,
      side: BackSide,
      opacity: 0.1,
    });

    let floor = new Mesh(planeGeometry,material)
    floor.position.y = -1
    floor.receiveShadow = true
    globalScene.add(floor)

    const light = new SpotLight( 0xD3D3D3);
    const helper = new SpotLightHelper( light );
    light.position.set(332,1664,332)


    light.angle = 0.4;
    light.penumbra = 0.05;
    light.decay = 1;
    light.distance = 2000;
    light.shadow.radius = 1
    // light.power = 50

    light.shadow.mapSize.height = 2048;
    light.shadow.mapSize.width = 2048;
    light.castShadow = true

    //
    // light.shadow.camera.left = -100;
    // light.shadow.camera.right = 100;
    // light.shadow.camera.top = 100;
    // light.shadow.camera.bottom = -100;

    globalScene.add( light );
    globalScene.add( helper );


    let floorFolder = SceneManager.GLOBAL_SCENE.gui.addFolder("Floor")
    floorFolder.add(floor.position,'x',-1000,1000,0.01).listen()
    floorFolder.add(floor.position,'y',-1000,1000,0.01).listen()
    floorFolder.add(floor.position,'z',-1000,1000,0.01).listen()

    let sceneFolder = SceneManager.GLOBAL_SCENE.gui.addFolder("Light")
    sceneFolder.add(light.position,'x',-1000,1000,0.01).listen()
    sceneFolder.add(light.position,'y',-1000,3000,0.01).listen()
    sceneFolder.add(light.position,'z',-1000,1000,0.01).listen()
    
    console.log(globalScene,'global scene')

  }

  private _createCanvasBackground(){


    var canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    var my_gradient = ctx!.createLinearGradient(0, 0, 0, 170);
    my_gradient.addColorStop(0, "#FCE9E1");
    // my_gradient.addColorStop(0.5, "#FDF0E9");
    my_gradient.addColorStop(1, "#FF0000");
    ctx!.fillStyle = my_gradient;
    ctx!.fillRect(0, 0, SceneManager.GLOBAL_SCENE.width, SceneManager.GLOBAL_SCENE.height);

    var texture = new CanvasTexture(canvas);

    SceneManager.GLOBAL_SCENE.scene.background = texture

    console.log(canvas)

  }


  /**
   * Retrieve gltf global scene and inject it into Global scene instance
   */
  private _addGltfGlobalScene() {
    const globalSceneGltf = AssetsManager.getGltf(GLTF_ASSET.GLOBAL_SCENE).data
    globalSceneGltf.scene.position.set(0, 0, 0)

    SceneManager.GLOBAL_SCENE.scene.add(globalSceneGltf.scene)
    SceneManager.GLOBAL_SCENE.scene.traverse( child => {

      // child.castShadow = true
      // child.receiveShadow = true

      if(child instanceof Mesh){
        child.receiveShadow = true
        child.castShadow = true
        // child.material = new MeshPhongMaterial({
        //   color:0xFF0000
        // })
      }

      // @ts-ignore
      if ( child.material ) child.material.metalness = 0;

      if (child.name ==='socle'){

        child.castShadow = true
        child.receiveShadow = true
        // let transparentSocle =  child.clone()
        // transparentSocle.name = "cloned_socle"
        // transparentSocle.position.y = -20
        // const material = new MeshBasicMaterial( { color: 0xffff00 } );

        /** first version **/
        let socle = child.getObjectByName('socle_2')
        socle!.castShadow = true
        socle!.receiveShadow = true

        //
        // let __socle = child.getObjectByName('socle_1')
        // __socle!.castShadow = true
        // __socle!.receiveShadow = true
        //
        // const geometry = new CylinderGeometry( 100, 100, 20, 32 );
        // const material = new MeshPhongMaterial({
        //   specular: 0x000000,
        //   shininess: 100
        // });
        // material.opacity = 0.5
        // const circle = new Mesh( geometry, material );
        // circle.position.set(420,-208,44)
        // circle.scale.set(3.5,3.5,3.5)
        // circle.receiveShadow = true
        // // circle.rotation.x = Math.PI / 2;
        //
        // child.add(circle)
        //
        // const color = 0xFFFFFF;
        // const intensity = 1;
        // const light = new DirectionalLight(color, intensity);
        // light.position.set(0, 10, 5);
        // light.castShadow = true;
        // child.add(light);

        // child.add(light.target);
        // let material = new ShadowMaterial()
        // material.opacity= 0.5
        // transparentSocle = new Mesh()
        // child.parent?.add(transparentSocle)


        // let sceneFolder = SceneManager.GLOBAL_SCENE.gui.addFolder("Scene")
        // sceneFolder.add(circle.position,'x',-500,500,0.01).listen()
        // sceneFolder.add(circle.position,'y',-500,500,0.01).listen()
        // sceneFolder.add(circle.position,'z',-500,500,0.01).listen()
        // sceneFolder.add(light.position,'x',-500,500,0.01).listen()
        // sceneFolder.add(light.position,'y',-500,500,0.01).listen()
        // sceneFolder.add(light.position,'z',-500,500,0.01).listen()



        console.log(child)

        // var material = new ShadowMaterial();
        // material.opacity = 0.5;

        // ch

        // var mesh = new Mesh( geometry, material );
        // mesh.receiveShadow = true;
        // scene.add( mesh );


      }

    } );

    console.log(globalSceneGltf)

  }

  private _addGltfTom() {
    const tomGltf = AssetsManager.getFbx(GLTF_ASSET.TOM).data
    tomGltf.scale.set(0.8, 0.8, 0.8)
    tomGltf.position.set(50, 40, 500)
    tomGltf.rotation.y = -45
    SceneManager.GLOBAL_SCENE.scene.add(tomGltf)

    SceneManager.GLOBAL_SCENE.createAnimationMixer(GLTF_ASSET.TOM, tomGltf)
    SceneManager.GLOBAL_SCENE.playAnimation(tomGltf.animations[0], GLTF_ASSET.TOM)
  }

  /**
   * Add lights to the global scene
   */
  private _addLights(withHelper: boolean = false) {
    const hemisphereLights = new HemisphereLight(0xdff9fb, 0x080820, 1);
    //hemisphereLights.position.set(100, 500, 700)
    if (withHelper) {
      const helper = new HemisphereLightHelper(hemisphereLights, 5);
      SceneManager.GLOBAL_SCENE.scene.add(helper);
    }

    SceneManager.GLOBAL_SCENE.scene.add(hemisphereLights);
  }

  /**
   * Register preset camera positions
   */
  private _registerPresetPositions() {
    GlobalSceneConfig.cameraPositions.forEach(presetPosition => {
      SceneManager.GLOBAL_SCENE.registerPresetCameraPositions(presetPosition)
    })
  }
}
