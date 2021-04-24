import {Initializers} from "~/core/defs";
import {AssetsManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";

/**
 * @description
 * This initializer is responsible for initialize AssetManager
 */
export default class AssetManagerInitializer extends Initializers<null, Promise<void>> {
  async init(): Promise<void> {
    await AssetsManager
      .registerGltf(GLTF_ASSET.GLOBAL_SCENE, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/scene_globale.gltf')
      .registerGltf(GLTF_ASSET.ACTIVITY_OBJECT_MOULA, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/moulaga.gltf')
      .registerGltf(GLTF_ASSET.ACTIVITY_OBJECT_NOOB, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/pouce_bad.gltf')
      .registerGltf(GLTF_ASSET.ACTIVITY_OBJECT_CRUSH, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/enveloppe.gltf')
      .registerGltf(GLTF_ASSET.TOM, 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/perso.gltf')

      .registerImage('image-1', 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/group37.png')
      .registerImage('image-2', 'https://keskidi.s3.eu-west-3.amazonaws.com/medias/group38.png')
      .load()
  }

}
