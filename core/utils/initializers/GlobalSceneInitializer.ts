import {AssetsManager, SceneManager} from "~/core/managers";
import Helpers from "~/core/utils/helpers";
import {
  DoubleSide,
  HemisphereLight,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
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
    this._registerPresetPositions()
    this._optimizeScene()
    //this._configGUI()

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
    renderer.shadowMap.enabled = true

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
      1900
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
      powerPreference: 'high-performance'
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
    this._addClouds()
    this._addRecordPlayer()
    this._addComputer()
  }

  /**
   * Retrieve gltf global scene and inject it into Global scene instance
   */
  private _addGltfGlobalScene() {
    const globalSceneGltf = AssetsManager.getGltf(GLTF_ASSET.GLOBAL_SCENE).data
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
    skateSticker.scene.position.set(21, 123, 215)
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

    const light = new PointLight(0xffffff, 2, 100)
    GlobalScene.context.scene.add(cat.scene)
    const {x, y, z} = cat.scene.position
    light.position.set(x, y + 40, z + 40)
    light.shadow.bias = -0.005
    //GlobalScene.context.scene.add(light)
    //GlobalScene.context.scene.add(cat.scene)
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
    phone.scene.position.set(-210, 264, -155)
    phone.scene.rotation.y = Helpers.degreeToRadiant(45)
    GlobalScene.context.scene.add(phone.scene)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.PHONE, phone.scene)
  }

  private _addClouds() {
    const clouds = AssetsManager.getGltf(GLTF_ASSET.CLOUDS).data
    GlobalScene.context.scene.add(clouds.scene)
    clouds.scene.rotation.y = Helpers.degreeToRadiant(-90)
    clouds.scene.position.set(0, 400, 0)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.CLOUDS, clouds.scene)
    const animationAction = GlobalScene.context.generateAnimationAction(clouds.animations[0], GLTF_ASSET.CLOUDS)
    animationAction.play()
  }

  private _addRecordPlayer() {
    const recordPlayer = AssetsManager.getGltf(GLTF_ASSET.RECORD_PLAYER).data
    GlobalScene.context.scene.add(recordPlayer.scene)
    recordPlayer.scene.position.set(-34, 122.3, 142)
    recordPlayer.scene.rotation.y = Helpers.degreeToRadiant(180)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.RECORD_PLAYER, recordPlayer.scene)
    const animationAction = GlobalScene.context.generateAnimationAction(recordPlayer.animations[0], GLTF_ASSET.RECORD_PLAYER)
    animationAction.play()
  }

  private _addComputer() {
    const computer = AssetsManager.getGltf(GLTF_ASSET.COMPUTER).data
    GlobalScene.context.scene.add(computer.scene)
    computer.scene.position.set(270, 109.9, 75)
    computer.scene.rotation.y = Helpers.degreeToRadiant(-90)
    GlobalScene.context.createAnimationMixer(GLTF_ASSET.COMPUTER, computer.scene)
  }

  /**
   * Add lights to the global scene
   */
  private _addLights(withHelper: boolean = false) {
    const pointLight = new PointLight(0xffffff, 0.5)
    pointLight.shadow.bias = -0.005;
    pointLight.position.set(100, 150, 550)
    GlobalScene.context.scene.add(pointLight)
    const hemisphereLights = new HemisphereLight(0xdff9fb, 0x080820, 1);
    GlobalScene.context.scene.add(hemisphereLights);
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
      GlobalScene.context.scene.getObjectByName('t_shirt')!,
      GlobalScene.context.scene.getObjectByName('chaussure_droite')!,
      GlobalScene.context.scene.getObjectByName('chaussure_gauche')!,
      GlobalScene.context.scene.getObjectByName('papiers')!,
      GlobalScene.context.scene.getObjectByName(GLTF_ASSET.CAT)!,
      GlobalScene.context.scene.getObjectByName(GLTF_ASSET.PAPER)!,
      GlobalScene.context.scene.getObjectByName(GLTF_ASSET.NOTEBOOK)!,
      GlobalScene.context.scene.getObjectByName(GLTF_ASSET.PHONE)!,
      GlobalScene.context.scene.getObjectByName(GLTF_ASSET.RECORD_PLAYER)!,
      GlobalScene.context.scene.getObjectByName(GLTF_ASSET.COMPUTER)!,
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
