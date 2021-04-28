import ActivityCanvasInitializer from "~/core/utils/initializers/activities/ActivityCanvasInitializer";
import {SceneManager} from "~/core/managers";
import SceneHelper from "~/core/utils/sceneHelper";
import ActivityModule from "~/store/activity";
import {Color} from "three";

export default class ActivityOneResultCanvasInitializer extends ActivityCanvasInitializer<{ wordObjectCanvas: HTMLCanvasElement, activityModule: ActivityModule }, void> {
  init(): void {
    this._initWordObjectCanvas()
  }

  private _initWordObjectCanvas() {
    const {scene, camera, renderer} = SceneHelper.createStarterSceneContext(this._data.wordObjectCanvas)

    SceneManager.ACTIVITY_1_RESULTS = new SceneManager({
      canvas: this._data.wordObjectCanvas,
      camera,
      scene,
      renderer,
      defaultRation: 2,
      activateOrbitControl: false,
    })

    const gltfObject = this._getGltfWordRepresentation(this._data.activityModule.dataWord!)
    gltfObject.scene.position.set(0, 0, 0)
    gltfObject.scene.rotation.x = Math.PI / 2
    scene.add(gltfObject.scene)
    scene.position.set(0, 0, -60)

    SceneManager.ACTIVITY_1_RESULTS.start()
  }

}
