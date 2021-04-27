import {Initializers} from "~/core/defs";
import {AssetsManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";

/**
 * @description
 * This initializer is responsible for initialize AssetManager
 */
export default class AssetManagerInitializer extends Initializers<null, void> {
  init(): void {
    AssetsManager
      //.enableLocalMode()
      .registerGltf(GLTF_ASSET.ACTIVITY_OBJECT_MOULA, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/moulaga.gltf', 'moulaga.gltf')
      .registerGltf(GLTF_ASSET.ACTIVITY_OBJECT_NOOB, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/pouce_bad.gltf', 'pouce_bad.gltf')
      .registerGltf(GLTF_ASSET.GLOBAL_SCENE, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/scene_global_no_bake.gltf', 'scene_globale.gltf')
      .registerGltf(GLTF_ASSET.ACTIVITY_OBJECT_CRUSH, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/crush-enveloppe.gltf', 'enveloppe.gltf')
      .registerFbx(GLTF_ASSET.TOM, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso_idle.fbx')
  }

}
