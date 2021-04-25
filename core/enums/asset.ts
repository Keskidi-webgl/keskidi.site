/**
 * Type of asset
 */
export enum ASSET_TYPE {
  GLTF,
  IMAGE,
  VIDEO,
}

/**
 * Name given to gltf asset in order to retrieve it through AssetManager
 */
export enum GLTF_ASSET {
  GLOBAL_SCENE= 'globalScene',
  ACTIVITY_OBJECT_MOULA= 'moulaObject',
  ACTIVITY_OBJECT_NOOB= 'noobObject',
  ACTIVITY_OBJECT_CRUSH= 'crushObject',
  TOM = 'tom'
}

/**
 * Name given to image asset in order to retrieve it through AssetManager
 */
export enum IMAGE_ASSET {

}

/**
 * Name given to video asset in order to retrieve it through AssetManager
 */
export enum VIDEO_ASSET {

}
