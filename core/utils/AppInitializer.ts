import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {ApiManager, AssetsManager, SceneManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";
import {
  AnimationMixer, AxesHelper, Box3,
  HemisphereLight,
  HemisphereLightHelper,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import Helpers from "~/core/utils/helpers";

class AppInitializer {
  /**
   * Init API manager
   */
  public initApiManager(axios: NuxtAxiosInstance) {
    ApiManager.setAxios(axios)
  }

  /**
   * Init Asset manager
   */
  public async initAssetsManager() {
    return AssetsManager
      .registerGltf(GLTF_ASSET.GLOBAL_SCENE, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/scene_globale.gltf')

      .registerImage('image-1', 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/group37.png')
      .registerImage('image-2', 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/group38.png')

      .onProgress((done, total) => {
        console.log(done / total * 100, '%')
      })
      .load()
  }

  /**
   * Create global scene by injecting element into Global scene shell
   */
  public createGlobalScene(canvas: HTMLCanvasElement) {
    SceneManager.GLOBAL_SCENE = this._createSceneManagerInstance(canvas)

    // Add GLTF global scene
    const globalSceneGltf = AssetsManager.getGltf(GLTF_ASSET.GLOBAL_SCENE).data
    const box3 = new Box3().setFromObject(globalSceneGltf.scene);
    const vector = new Vector3();
    box3.getCenter(vector);
    globalSceneGltf.scene.position.set(-vector.x, -vector.y, -vector.z);

    SceneManager.GLOBAL_SCENE.scene.add(globalSceneGltf.scene)
    SceneManager.GLOBAL_SCENE.camera.lookAt(globalSceneGltf.scene.position)

    // Register preset positions
    const homeCoords = SceneManager.GLOBAL_SCENE.scene.position.multiply(new Vector3(100, 100, 100))
    const loungeCoords = SceneManager.GLOBAL_SCENE.scene.getObjectByName('salon')!.position
    const bedroomCoords = SceneManager.GLOBAL_SCENE.scene.getObjectByName('chambre')!.position
    const mezzanineCoords = SceneManager.GLOBAL_SCENE.scene.getObjectByName('mezzanine')!.position

    SceneManager.GLOBAL_SCENE.registerPresetCameraPositions({name: 'home', coord: homeCoords})
    SceneManager.GLOBAL_SCENE.registerPresetCameraPositions({name: 'lounge', coord: loungeCoords})
    SceneManager.GLOBAL_SCENE.registerPresetCameraPositions({name: 'bedroom', coord: bedroomCoords})
    SceneManager.GLOBAL_SCENE.registerPresetCameraPositions({name: 'mezzanine', coord: bedroomCoords})

    // Add exes helpers
    const axesHelper = new AxesHelper(100)
    SceneManager.GLOBAL_SCENE.scene.add( axesHelper )

    // Add lights
    const hemiLight = new HemisphereLight(0xdff9fb, 0x080820, 1);
    hemiLight.position.set(100, 500, 700)
    const helper = new HemisphereLightHelper(hemiLight, 5);
    SceneManager.GLOBAL_SCENE.scene.add(helper);
    SceneManager.GLOBAL_SCENE.scene.add(hemiLight);

    // Start
    SceneManager.GLOBAL_SCENE.start()
  }

  /**
   * Create GlobalScene shell
   */
  private _createSceneManagerInstance(canvas: HTMLCanvasElement): SceneManager {
    canvas.width = Helpers.getWindowSizes().width
    canvas.height = Helpers.getWindowSizes().height

    const camera = new PerspectiveCamera(50, canvas.width / canvas.height, 1, 5000)

    const scene = new Scene()

    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    return new SceneManager({
      canvas: canvas,
      camera: camera,
      scene: scene,
      renderer: renderer,
      activateOrbitControl: true,
    }).enableStats()
  }
}

const instance = new AppInitializer()

export default instance
