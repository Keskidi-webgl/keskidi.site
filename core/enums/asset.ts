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
  ACTIVITY_OBJECT_MOULA= 'moulaObject',
  ACTIVITY_OBJECT_NOOB= 'noobObject',
  ACTIVITY_OBJECT_CRUSH= 'crushObject',
  ACTIVITY_OBJECT_WATCH= 'watchObject',
  ACTIVITY_OBJECT_BOOK= 'bookObject',
  ACTIVITY_OBJECT_CHICKEN= 'chickenObject',
  ACTIVITY_OBJECT_BEER= 'beerObject',

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
