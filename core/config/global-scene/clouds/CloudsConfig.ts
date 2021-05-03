import {Cloud} from "~/core/config/global-scene/clouds/types";
import {GLTF_ASSET} from "~/core/enums";

const CloudsConfig: Array<Cloud> = [
  {
    x: 40,
    y: 400,
    z: 80,
    rotationY: 80,
    type: GLTF_ASSET.CLOUD_BIG
  },
  {
    x: -400,
    y: 500,
    z: 80,
    rotationY: 80,
    type: GLTF_ASSET.CLOUD_LITTLE
  },
  {
    x: -160,
    y: 600,
    z: -70,
    rotationY: 80,
    type: GLTF_ASSET.CLOUD_LITTLE
  },
  {
    x: -350,
    y: 750,
    z: 30,
    rotationY: 80,
    type: GLTF_ASSET.CLOUD_LITTLE
  },
  {
    x: 350,
    y: 780,
    z: -200,
    rotationY: 80,
    type: GLTF_ASSET.CLOUD_BIG
  },
  {
    x: 100,
    y: 750,
    z: -180,
    rotationY: 80,
    type: GLTF_ASSET.CLOUD_LITTLE
  },
  {
    x: -100,
    y: 900,
    z: 10,
    rotationY: 80,
    type: GLTF_ASSET.CLOUD_LITTLE
  },
  {
    x: -300,
    y: 1000,
    z: 10,
    rotationY: 80,
    type: GLTF_ASSET.CLOUD_LITTLE
  },
]

export default CloudsConfig
