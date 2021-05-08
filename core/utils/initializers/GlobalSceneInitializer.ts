import {AssetsManager, SceneManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";
import {
  BackSide,
  CanvasTexture,
  DoubleSide,
  HemisphereLight,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneBufferGeometry,
  PointLight,
  Scene,
  ShadowMaterial,
  SpotLight,
  SpotLightHelper,
  sRGBEncoding,
  Texture,
  Vector3,
  WebGLRenderer
} from "three";
import {Initializers} from "~/core/defs";
import {GLTF_ASSET, VIDEO_ASSET} from "~/core/enums";
import GlobalSceneStore from "~/store/globalScene";
import GlobalSceneConfig from "~/core/config/global-scene/global-scene.config";
import {Object3D} from "three/src/core/Object3D";
import GlobalScene from "~/core/scene/GlobalScene";
import TomSceneElement from "~/core/scene/TomSceneElement";
import SceneHelper from "~/core/utils/sceneHelper";

/**
 * @description
 * This initializer is responsible for creating the global scene of the application
 */
export default class GlobalSceneInitializer extends Initializers<{ canvas: HTMLCanvasElement, globalSceneStore: GlobalSceneStore }, void> {
  public floor!: Mesh

  init() {
    GlobalScene.setSceneContext(this._createSceneContext())
    this._addSceneElements()
    this._addLights(true)
    //this._createCanvasBackground()
    //this._createPlanesBackground()
    this._registerPresetPositions()
    this._optimizeScene()
    //this._configGUI()
    console.log(GlobalScene.context)

    GlobalScene.context.start()
  }

  /**
   * Create the shell to interact with global scene
   */
  private _createSceneContext() {
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
    renderer.shadowMap.autoUpdate = false
    renderer.shadowMap.needsUpdate = true

    return new SceneManager({
      canvas: this._data.canvas,
      camera: camera,
      scene: scene,
      renderer: renderer,
      defaultRation: 2,
      activateOrbitControl: false,
      onRender: (ctx) => {
        // Add interactions points tracking
        if (ctx.camera instanceof PerspectiveCamera) {
          ctx.camera.updateProjectionMatrix()
        }
        for (const point of this._data.globalSceneStore.activeInteractionPoints) {
          const screenPosition = point.canvasCoords().clone()
          screenPosition.project(GlobalScene.context.camera)
          const updateData = {
            name: point.name,
            transformX: screenPosition.x * this._data.canvas.clientWidth * 0.5,
            transformY: - screenPosition.y * this._data.canvas.clientHeight * 0.5
          }

          this._data.globalSceneStore.updatePositionsInteractivePoint(updateData)
        }

      },
      onResume: (ctx) => {
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
    }).hideGui()
      //.enableStats()
      .enableParallax()

  }

  /**
   * Create gui
   */
  private _configGUI() {
    let sceneFolder = GlobalScene.context.gui.addFolder("Scene")
    sceneFolder.add(GlobalScene.context.scene.position, 'x', -500, 500, 0.01).listen()
    sceneFolder.add(GlobalScene.context.scene.position, 'y', -500, 500, 0.01).listen()
    sceneFolder.add(GlobalScene.context.scene.position, 'z', -500, 500, 0.01).listen()
  }

  /**
   * Create perspective camera
   */
  private _createCamera() {
    const camera = new PerspectiveCamera(
      50,
      this._data.canvas.width / this._data.canvas.height,
      1,
      2000
    )
    camera.position.set(0, 1200, 1300)
    camera.lookAt(new Vector3())

    return camera
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

  private _addSceneElements() {
    this._addGltfGlobalScene()
    this._addGltfTom()
    //this._addGltfOutside()
    //this._addAnimateElements()
    this._prepareTelevision()
    this._addStickersSkate()
    this._addNotebook()
    this._addCat()
    this._addBedroomPaper()
    this._addPhone()
  }

  private _createPlanesBackground(){
    let globalScene = GlobalScene.context.scene

    const planeGeometry = new PlaneBufferGeometry( 2000, 2000 ).rotateX( Math.PI / 2 );
    var material = new ShadowMaterial({
      // depthWrite: false,
      side: BackSide,
      opacity: 0.1,
    });

    this.floor = new Mesh(planeGeometry,material)
    this.floor.name = 'floor'
    this.floor.position.y = -1
    this.floor.receiveShadow = true

    // this.floor.layers.mask = 2
    globalScene.add(this.floor)

    const light = new SpotLight( 0xD3D3D3);
    const helper = new SpotLightHelper( light );
    light.position.set(332,1664,332)


    light.angle = 0.4;
    light.penumbra = 0.05;
    light.decay = 1;
    light.distance = 2000;
    light.shadow.radius = 8

    light.shadow.mapSize.height = 2048;
    light.shadow.mapSize.width = 2048;
    light.castShadow = true

    globalScene.add( light );

    let floorFolder = GlobalScene.context.gui.addFolder("Floor")
    floorFolder.add(this.floor.position,'x',-1000,1000,0.01).listen()
    floorFolder.add(this.floor.position,'y',-1000,1000,0.01).listen()
    floorFolder.add(this.floor.position,'z',-1000,1000,0.01).listen()

    let sceneFolder = GlobalScene.context.gui.addFolder("Light")
    sceneFolder.add(light.position,'x',-1000,1000,0.01).listen()
    sceneFolder.add(light.position,'y',-1000,3000,0.01).listen()
    sceneFolder.add(light.position,'z',-1000,1000,0.01).listen()
  }

  private _createCanvasBackground(){
    const canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    const my_gradient = ctx!.createLinearGradient(0, 0, 0, 170);
    my_gradient.addColorStop(0, "#FCE9E1");
    my_gradient.addColorStop(0.5, "#FDF0E9");
    ctx!.fillStyle = my_gradient;
    ctx!.fillRect(0, 0, GlobalScene.context.width, GlobalScene.context.height);
    const texture = new CanvasTexture(canvas);
    GlobalScene.context.scene.background = texture
  }


  /**
   * Retrieve gltf global scene and inject it into Global scene instance
   */
  private _addGltfGlobalScene() {
    const globalSceneGltf = AssetsManager.getGltf(GLTF_ASSET.GLOBAL_SCENE).data
    console.log(globalSceneGltf)
    globalSceneGltf.scene.position.set(0, 0, 0)

    GlobalScene.context.scene.add(globalSceneGltf.scene)
    GlobalScene.context.scene.traverse( child => {

      if (child.name ==='socle'){
        child.receiveShadow = true
      }

    } );
    GlobalScene.context.scene.add(globalSceneGltf.scene)
  }

  private _addGltfTom() {
    GlobalScene.context.scene.add(TomSceneElement.sceneElement)
    TomSceneElement.setupForGlobalScene()
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.TOM, TomSceneElement.sceneElement)
    TomSceneElement.playAnimation('hello', GlobalScene.context)
  }

  private _addStickersSkate() {
    const skateSticker = AssetsManager.getGltf(GLTF_ASSET.SKATE_STICKER).data
    skateSticker.scene.position.set(26.5, 123, 215)
    skateSticker.scene.rotation.y = Helpers.degreeToRadiant(-90)
    GlobalScene.context.scene.add(skateSticker.scene)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.SKATE_STICKER, skateSticker.scene)
  }

  private _addNotebook() {
    const notebook = AssetsManager.getGltf(GLTF_ASSET.NOTEBOOK).data
    notebook.scene.position.set(-175, 90, 175)
    notebook.scene.rotation.y = Helpers.degreeToRadiant(-40)
    GlobalScene.context.scene.add(notebook.scene)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.NOTEBOOK, notebook.scene)
  }

  private _addCat() {
    const cat = AssetsManager.getGltf(GLTF_ASSET.CAT).data
    cat.scene.position.set(-250, 53, 260)
    cat.scene.rotation.y = Helpers.degreeToRadiant(-45)
    GlobalScene.context.scene.add(cat.scene)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.CAT, cat.scene)
    const animationClip = GlobalScene.context.generateAnimationAction(cat.animations[0], GLTF_ASSET.CAT)
    animationClip.play()
  }

  private _addBedroomPaper() {
    const paper = AssetsManager.getGltf(GLTF_ASSET.PAPER).data
    paper.scene.position.set(200, 57, 180)
    paper.scene.rotation.y = Helpers.degreeToRadiant(-30)
    GlobalScene.context.scene.add(paper.scene)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.PAPER, paper.scene)
  }

  private _addPhone() {
    const phone = AssetsManager.getGltf(GLTF_ASSET.PHONE).data
    phone.scene.position.set(-100, 264, -200)
    phone.scene.rotation.y = Helpers.degreeToRadiant(45)
    GlobalScene.context.scene.add(phone.scene)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.PHONE, phone.scene)
  }

  /**
   * Add lights to the global scene
   */
  private _addLights(withHelper: boolean = false) {
    const pointLight = new PointLight(0xffffff, 0.5)
    pointLight.shadow.bias = -0.005;
    pointLight.position.set(100, 150, 550)
    GlobalScene.context.scene.add(pointLight)

    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.7);
    GlobalScene.context.scene.add(hemiLight);
  }

  /**
   * Register preset camera positions
   */
  private _registerPresetPositions() {
    GlobalSceneConfig.cameraPositions.forEach(presetPosition => {
      GlobalScene.context.registerPresetCameraPositions(presetPosition)
    })
  }

  private _optimizeScene() {
    const objects: Array<Object3D> = [
      GlobalScene.context.scene.getObjectByName('tom')!,
      GlobalScene.context.scene.getObjectByName('enceintes')!,
      GlobalScene.context.scene.getObjectByName('tourne_disque')!,
      GlobalScene.context.scene.getObjectByName('lampe_bureau')!,
      GlobalScene.context.scene.getObjectByName('guirlande')!,
      GlobalScene.context.scene.getObjectByName('cat')!,
      GlobalScene.context.scene.getObjectByName('paper')!,
      GlobalScene.context.scene.getObjectByName('notebook')!,
      GlobalScene.context.scene.getObjectByName('phone')!,
    ]
    SceneHelper.replaceByBasicMaterial(objects, GlobalScene.context, true)
  }

  private _prepareTelevision() {
    // https://stemkoski.github.io/Three.js/Video.html
    const video = AssetsManager.getVideo(VIDEO_ASSET.TV_SCREEN).data!
    video.loop = true
    video.muted = true
    const videoCanvas = document.createElement('canvas');

    videoCanvas.width = 480;
    videoCanvas.height = 270;

    const videoCanvasCtx = videoCanvas.getContext('2d')!;
    videoCanvasCtx.fillStyle = "#000000"
    videoCanvasCtx.fillRect(0, 0, 480, 270)

    const videoTexture = new Texture(videoCanvas);
    videoTexture.minFilter = LinearFilter
    videoTexture.magFilter = LinearFilter

    // @ts-ignore
    const videoMaterial = new MeshBasicMaterial({map: videoTexture, side: DoubleSide, overdraw: 0.5});

    const televisionObject = GlobalScene.context.scene.getObjectByName('screen_tv-NEON_1')
    if (televisionObject instanceof Mesh) {
      televisionObject.material = videoMaterial
      GlobalScene.context.onRender((context) => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          videoCanvasCtx.drawImage(video, 0, 0, 480, 270)
          if (videoTexture) {
            videoTexture.needsUpdate = true
          }
        }
      })
    }
  }
}
