import {PresetCameraPosition} from "~/core/types";
import {
  BedroomCameraPosition,
  HomeCameraPosition,
  LoungeCameraPosition, LoungePosterCameraPosition, MagazineCameraPosition,
  MezzanineCameraPosition
} from "~/core/config/camPositionConfig";

class CameraConfig {
  public presetPositions: Array<PresetCameraPosition> = [
    // Global
    BedroomCameraPosition,
    HomeCameraPosition,
    LoungeCameraPosition,
    MezzanineCameraPosition,

    // Lounge
    LoungePosterCameraPosition,
    MagazineCameraPosition
  ]
}

const instance = new CameraConfig()

export default instance
