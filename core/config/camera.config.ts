import CamPositionConfigElement from "~/core/config/presetCamPositionConfig/CamPositionConfigElement";
import {
  BedroomCamPositionConfig,
  HomeCamPositionConfig,
  LoungeCamPositionConfig, LoungePosterCamPositionConfig, MagazineCamPositionConfig,
  MezzanineCamPositionConfig
} from "~/core/config/presetCamPositionConfig";

class CameraConfig {
  public presetPositions: Array<CamPositionConfigElement> = [
    // Global
    HomeCamPositionConfig,
    LoungeCamPositionConfig,
    MezzanineCamPositionConfig,
    BedroomCamPositionConfig,

    // Lounge
    MagazineCamPositionConfig,
    LoungePosterCamPositionConfig
  ]
}

const instance = new CameraConfig()

export default instance
