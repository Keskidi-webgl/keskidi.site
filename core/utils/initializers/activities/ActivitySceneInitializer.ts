import {Initializers} from "~/core/defs";
import SceneHelper from "~/core/utils/sceneHelper";
import {SceneManager} from "~/core/managers";
import TomSceneElement from "~/core/scene/TomSceneElement";
import ActivityScene from "~/core/scene/ActivityScene";
import {GLTF_ASSET} from "~/core/enums";
import {PointLight} from "three";

export default class ActivitySceneInitializer extends Initializers<{ canvas: HTMLCanvasElement }, void> {
  init(): void {
    ActivityScene.setSceneContext(this._createSceneContext())
    this._addTom()
    this._addLights()
  }

  private _createSceneContext() {
    const {camera, scene, renderer} = SceneHelper.createStarterSceneContext(this._data.canvas)

    const sceneContext = new SceneManager({
      canvas: this._data.canvas,
      camera,
      scene,
      renderer,
      defaultRation: 2,
      activateOrbitControl: false,
    })

    camera.position.set(0, 12, 25)

    return sceneContext
  }

  private _addTom() {
    TomSceneElement.setupForActivityScene()
    ActivityScene.context.scene.add(TomSceneElement.sceneElement)
    ActivityScene.context.createAnimationMixer(GLTF_ASSET.TOM, TomSceneElement.sceneElement)
    TomSceneElement.playAnimation('idle', ActivityScene.context)
  }

  private _addLights() {
    const pointLight = new PointLight(0xffffff, 0.5)
    pointLight.shadow.bias = -0.005;
    pointLight.position.set(100, 250, 0)
    ActivityScene.context.scene.add(pointLight)
    const light = SceneHelper.createFreshHemisphereLight()
    light.position.z = 10
    ActivityScene.context.scene.add(light)
  }
}
