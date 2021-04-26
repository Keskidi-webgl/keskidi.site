import ActivityCanvasInitializer from "~/core/utils/initializers/activities/ActivityCanvasInitializer";
import ActivityModule from "~/store/activity";
import SceneHelper from "~/core/utils/sceneHelper";
import {AssetsManager, SceneManager} from "~/core/managers";

export default class ActivityOneCanvasInitializer extends ActivityCanvasInitializer<{ tomCanvas: HTMLCanvasElement, objectsCanvas: HTMLCanvasElement, activityModule: ActivityModule }, void> {

  init(): void {
    this._initTomCanvas()
    this._initObjectCanvas()
  }

  /**
   * Init Tom canvas
   */
  private _initTomCanvas() {
    SceneManager.ACTIVITY_1_TOM = this._createTomScene(this._data.tomCanvas)
    SceneManager.ACTIVITY_1_TOM.scene.position.set(0, -30, -15)
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
      activateOrbitControl: false,
    })
    SceneManager.ACTIVITY_1_OBJECTS.scene.position.set(0, 0, -60)

    const {object_one, object_two, object_three} = this._data.activityModule.dataWord!.activity_data!
    const gltfNames = [object_one, object_two, object_three]

    gltfNames.forEach((gltfName, index) => {
      const gltfObject = AssetsManager.getGltf(gltfName).data
      gltfObject.scene.position.set(-10, 0, 0)
      gltfObject.scene.scale.set(0.5, 0.5, 0.5)
      gltfObject.scene.rotation.x = Math.PI / 2;
      scene.add(gltfObject.scene)
      gltfObject.scene.visible = index === 0
    })

    SceneManager.ACTIVITY_1_OBJECTS.start()
  }
}
