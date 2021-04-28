import ActivityCanvasInitializer from "~/core/utils/initializers/activities/ActivityCanvasInitializer";
import ActivityStore from "~/store/activity";
import SceneHelper from "~/core/utils/sceneHelper";
import {AssetsManager, SceneManager} from "~/core/managers";
import {DirectionalLight, SpotLight} from "three";

export default class ActivityOneCanvasInitializer extends ActivityCanvasInitializer<{ tomCanvas: HTMLCanvasElement, objectsCanvas: HTMLCanvasElement, activityStore: ActivityStore }, void> {

  init(): void {
    this._initTomCanvas()
    this._initObjectCanvas()
  }

  /**
   * Init Tom canvas
   */
  private _initTomCanvas() {
    SceneManager.ACTIVITY_1_TOM = this._createTomScene(this._data.tomCanvas)
    SceneManager.ACTIVITY_1_TOM.scene.position.set(0, -17, -15)
    SceneManager.ACTIVITY_1_TOM.scene.scale.set(0.5, 0.5, 0.5)

    SceneManager.ACTIVITY_1_TOM.start()
  }

  /**
   * Init Three objects selection canvas
   */
  private _initObjectCanvas() {
    const {scene, camera, renderer} = SceneHelper.createStarterSceneContext(this._data.objectsCanvas)
    SceneManager.ACTIVITY_1_OBJECTS = new SceneManager({
      canvas: this._data.objectsCanvas,
      camera,
      scene,
      renderer,
      defaultRation: 2,
      activateOrbitControl: true,
    })
    SceneManager.ACTIVITY_1_OBJECTS.scene.position.set(0, 0, -60)

    const {object_one, object_two, object_three} = this._data.activityStore.dataWord!.activity_data!
    const gltfNames = [object_one, object_two, object_three]

    gltfNames.forEach((gltfName, index) => {
      const gltfObject = AssetsManager.getGltf(gltfName).data
      gltfObject.scene.position.set(-10, 0, 0)
      gltfObject.scene.scale.set(0.5, 0.5, 0.5)
      gltfObject.scene.rotation.x = Math.PI / 2;
      const directionalLight = new SpotLight( 0xffffff);
      scene.add( directionalLight );
      directionalLight.target = gltfObject.scene
      scene.add(gltfObject.scene)
      gltfObject.scene.visible = index === 0

    })

    SceneManager.ACTIVITY_1_OBJECTS.start()
  }
}
