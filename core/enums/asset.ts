/**
 * Type of asset
 */
export enum ASSET_TYPE {
  GLTF,
  IMAGE,
  VIDEO,
  FBX
}

/**
 * Name given to gltf asset in order to retrieve it through AssetManager
 */
export enum GLTF_ASSET {
  GLOBAL_SCENE= 'globalScene',
  CLOUD_LITTLE = 'cloudLittle',
  CLOUD_BIG = 'cloudBig',

  TOM = 'tom',
  TOM_MUSCLE = 'tomMuscle',
  TOM_DOWN = 'tomBadDown',
  TOM_HEAD = 'tomHead',
  TOM_PUNCH = 'tomPunch',
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
