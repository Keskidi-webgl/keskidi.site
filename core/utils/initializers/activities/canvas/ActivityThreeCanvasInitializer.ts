import ActivityCanvasInitializer from "~/core/utils/initializers/activities/ActivityCanvasInitializer";
import {SceneManager} from "~/core/managers";
import SceneHelper from "~/core/utils/sceneHelper";
import ActivityStore from "~/store/activity";

export default class ActivityThreeCanvasInitializer extends ActivityCanvasInitializer<{ tomCanvas: HTMLCanvasElement, wordObjectCanvas: HTMLCanvasElement, activityStore: ActivityStore }, void> {
  init(): void {
    this._initTomCanvas()
    this._initObjectCanvas()
  }

  /**
   * Init Tom canvas
   */
  private _initTomCanvas() {
    SceneManager.ACTIVITY_3_TOM = this._createTomScene(this._data.tomCanvas)
    SceneManager.ACTIVITY_3_TOM.scene.position.set(0, -17, -15)
    SceneManager.ACTIVITY_3_TOM.scene.scale.set(0.5, 0.5, 0.5)
    // SceneManager.ACTIVITY_3_TOM.scene.scale.set(0.5, 0.5, 0.5)
    console.log(SceneManager.ACTIVITY_3_TOM.scene)
    SceneManager.ACTIVITY_3_TOM.start()
  }

  /*
   * Init Three objects selection canvas
   */
  private _initObjectCanvas() {
    const {scene, camera, renderer} = SceneHelper.createStarterSceneContext(this._data.wordObjectCanvas)
    SceneManager.ACTIVITY_3_OBJECTS = new SceneManager({
      canvas: this._data.wordObjectCanvas,
      camera,
      scene,
      renderer,
      defaultRation: 2,
      activateOrbitControl: false,
    })
    SceneManager.ACTIVITY_3_OBJECTS.scene.position.set(0, 0, -60)
    const wordGltfObject = this._getGltfWordRepresentation(this._data.activityStore.dataWord!)
    wordGltfObject.scene.position.set(0, 0, 0)
    wordGltfObject.scene.rotation.x = Math.PI / 2;


    scene.add(wordGltfObject.scene)

    SceneManager.ACTIVITY_3_OBJECTS.start()
  }

}
