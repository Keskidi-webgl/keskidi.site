import {PresetCameraPosition} from "~/core/types";
import {
  BedroomCameraPosition,
  HomeCameraPosition,
  LoungeCameraPosition,
  LoungePosterCameraPosition,
  MagazineCameraPosition,
  MezzanineCameraPosition,
  NeonCameraPosition, PaperCameraPosition,
  SkateCameraPosition,
  TelevisionCameraPosition,
  TomCameraPosition,
  TshirtCameraPosition,
  VinylCameraPosition
} from "~/core/config/camPositionConfig";

class CameraConfig {
  public presetPositions: Array<PresetCameraPosition> = [
    // Global
    BedroomCameraPosition,
    HomeCameraPosition,
    LoungeCameraPosition,
    MezzanineCameraPosition,
    TomCameraPosition,

    // Lounge
    LoungePosterCameraPosition,
    MagazineCameraPosition,
    VinylCameraPosition,

    // Mezzanine
    NeonCameraPosition,
    TelevisionCameraPosition,

    // Bedroom
    PaperCameraPosition,
    SkateCameraPosition,
    TshirtCameraPosition
  ]
}

const instance = new CameraConfig()

export default instance
