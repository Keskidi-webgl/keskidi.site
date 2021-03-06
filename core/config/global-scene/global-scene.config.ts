import {Room} from "~/core/config/global-scene/rooms/types";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {
  BedroomCameraPosition,
  HomeCameraPosition,
  LoungeCameraPosition,
  MezzanineCameraPosition,
  NotebookCameraPosition,
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
  NotebookInteractPoint,
  PaperInteractPoint,
  PhoneInteractPoint,
  SkateInteractPoint,
  TelevisionInteractPoint,
  TomInteractPoint,
  VinylInteractPoint
} from "~/core/config/global-scene/interact-points";
import {Bedroom, Lounge, Mezzanine} from "~/core/config/global-scene/rooms";
import {RoomObject} from "~/core/config/global-scene/room-objects/types";
import {
  NotebookRoomObject,
  PaperRoomObject,
  PhoneRoomObject,
  SkateRoomObject,
  TelevisionRoomObject,
  VinylRoomObject
} from "~/core/config/global-scene/room-objects";
import CloudsCameraPosition from "~/core/config/global-scene/camera-positions/global/CloudsCameraPosition";
import PhoneCameraPosition from "~/core/config/global-scene/camera-positions/mezzanine/PhoneCameraPosition";

const GlobalSceneConfig = {
  // ROOMS
  rooms: [
    Bedroom,
    Lounge,
    Mezzanine
  ] as Array<Room>,

  // ROOM OBJECTS
  roomObjects: [
    /* Bedroom */
    SkateRoomObject,
    PaperRoomObject,
    /* Lounge */
    VinylRoomObject,
    NotebookRoomObject,
    /* Mezzanine */
    TelevisionRoomObject,
    PhoneRoomObject
  ] as Array<RoomObject>,

  // CAMERA POSITIONS
  cameraPositions: [
    /* Global */
    BedroomCameraPosition,
    HomeCameraPosition,
    LoungeCameraPosition,
    MezzanineCameraPosition,
    TomCameraPosition,
    CloudsCameraPosition,
    /* Bedroom */
    PaperCameraPosition,
    SkateCameraPosition,
    /* Lounge */
    VinylCameraPosition,
    NotebookCameraPosition,
    /* Mezzanine */
    TelevisionCameraPosition,
    PhoneCameraPosition
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
    NotebookInteractPoint,
    /* Mezzanine */
    TelevisionInteractPoint,
    PhoneInteractPoint
  ] as Array<InteractionPoint>,
}

export default GlobalSceneConfig
