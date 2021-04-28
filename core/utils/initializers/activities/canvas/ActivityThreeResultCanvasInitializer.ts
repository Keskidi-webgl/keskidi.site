import ActivityCanvasInitializer from "~/core/utils/initializers/activities/ActivityCanvasInitializer";
import SceneHelper from "~/core/utils/sceneHelper";
import {SceneManager} from "~/core/managers";
import ActivityModule from "~/store/activity";

export default class ActivityThreeResultCanvasInitializer extends ActivityCanvasInitializer<{ wordObjectCanvas: HTMLCanvasElement, activityModule: ActivityModule }, void> {
  init(): void {
    this._initObjectCanvas()
  }

  private _initObjectCanvas() {
    const {scene, camera, renderer} = SceneHelper.createStarterSceneContext(this._data.wordObjectCanvas)
    SceneManager.ACTIVITY_3_RESULTS = new SceneManager({
      canvas: this._data.wordObjectCanvas,
      camera,
      scene,
      renderer,
      defaultRation: 2,
      activateOrbitControl: false,
    })

    SceneManager.ACTIVITY_3_RESULTS.scene.position.set(0, 0, -60)
    const wordGltfObject = this._getGltfWordRepresentation(this._data.activityModule.dataWord!)
    wordGltfObject.scene.position.set(0, 0, 0)
    wordGltfObject.scene.rotation.x = Math.PI / 2;
    scene.add(wordGltfObject.scene)

    console.log(SceneManager.ACTIVITY_3_RESULTS.scene)
    SceneManager.ACTIVITY_3_RESULTS.start()
  }

}
