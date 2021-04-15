import {NuxtAxiosInstance} from "@nuxtjs/axios";
import {ApiManager, AssetsManager, SceneManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";
import {
  AnimationMixer,
  HemisphereLight,
  HemisphereLightHelper,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
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
    globalSceneGltf.scene.scale.set(0.5, 0.5, 0.5)
    SceneManager.GLOBAL_SCENE.scene.add(globalSceneGltf.scene)
    SceneManager.GLOBAL_SCENE.camera.position.set(0, 70, 300)

    // Add floor
    const floorGeometry = new PlaneGeometry(5000, 5000, 1, 1);
    const floorMaterial = new MeshPhongMaterial({
      color: 0xeeeeee,
      shininess: 0
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI;
    floor.receiveShadow = true;
    floor.position.y = -100;
    SceneManager.GLOBAL_SCENE.scene.add(floor);

    // Add lights
    const hemiLight = new HemisphereLight(0xdff9fb, 0x080820, 1);
    hemiLight.position.set(100, 500, 700)
    const helper = new HemisphereLightHelper(hemiLight, 5);
    SceneManager.GLOBAL_SCENE.scene.add(helper);
    SceneManager.GLOBAL_SCENE.scene.add(hemiLight);

    // Create animation mixer and play animations
    const mixer = new AnimationMixer(globalSceneGltf.scene)
    console.log(globalSceneGltf.scene)
    globalSceneGltf.scene.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

    // Start
    SceneManager.GLOBAL_SCENE.start()
  }

  /**
   * Create GlobalScene shell
   */
  private _createSceneManagerInstance(canvas: HTMLCanvasElement): SceneManager {
    canvas.width = Helpers.getWindowSizes().width
    canvas.height = Helpers.getWindowSizes().height

    const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 1, 5000)
    camera.position.set(4, 4, 4)
    camera.updateMatrixWorld();

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
      .registerPresetCameraPositions({name: 'home', coord: new Vector3(2, 3, 6)})
  }
}

const instance = new AppInitializer()

export default instance
