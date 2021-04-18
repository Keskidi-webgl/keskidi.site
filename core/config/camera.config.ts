import CamPositionConfigElement from "~/core/config/presetCamPositionConfig/CamPositionConfigElement";
import {
  BedroomCamPositionConfig,
  HomeCamPositionConfig,
  LoungeCamPositionConfig,
  MezzanineCamPositionConfig
} from "~/core/config/presetCamPositionConfig";

class CameraConfig {
  public presetPositions: Array<CamPositionConfigElement> = [
    HomeCamPositionConfig,
    LoungeCamPositionConfig,
    MezzanineCamPositionConfig,
    BedroomCamPositionConfig
  ]
}

const instance = new CameraConfig()

export default instance
