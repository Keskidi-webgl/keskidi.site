import {Room} from "~/core/config/global-scene/rooms/types";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {
  BedroomCameraPosition,
  HomeCameraPosition,
  LoungeCameraPosition,
  MezzanineCameraPosition,
  PaperCameraPosition,
  SkateCameraPosition,
  TelevisionCameraPosition,
  TomCameraPosition,
  VinylCameraPosition
} from "~/core/config/global-scene/camera-positions";
import {
  BedroomInteractPoint,
  LoungeInteractPoint,
  MezzanineInteractPoint,
  PaperInteractPoint,
  SkateInteractPoint,
  TelevisionInteractPoint,
  TomInteractPoint,
  VinylInteractPoint
} from "~/core/config/global-scene/interact-points";
import {Bedroom, Lounge, Mezzanine} from "~/core/config/global-scene/rooms";

export default {
  // ROOMS
  rooms: [
    Bedroom,
    Lounge,
    Mezzanine
  ] as Array<Room>,

  // CAMERA POSITIONS
  cameraPositions: [
    /* Global */
    BedroomCameraPosition,
    HomeCameraPosition,
    LoungeCameraPosition,
    MezzanineCameraPosition,
    TomCameraPosition,
    /* Bedroom */
    PaperCameraPosition,
    SkateCameraPosition,
    /* Lounge */
    VinylCameraPosition,
    /* Mezzanine */
    TelevisionCameraPosition
  ] as Array<CameraPosition>,

  // INTERACT POINTS
  interactPoints: [
    /* Global */
    BedroomInteractPoint,
    LoungeInteractPoint,
    MezzanineInteractPoint,
    TomInteractPoint,
    /* Bedroom */
    PaperInteractPoint,
    SkateInteractPoint,
    /* Lounge */
    VinylInteractPoint,
    /* Mezzanine */
    TelevisionInteractPoint
  ] as Array<InteractionPoint>,
}
