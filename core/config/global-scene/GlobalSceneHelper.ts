import GlobalSceneConfig from "~/core/config/global-scene/global-scene.config";
import {Room} from "~/core/config/global-scene/rooms/types";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";
import {CameraPosition} from "~/core/config/global-scene/camera-positions/types";
import {InteractionPoint} from "~/core/config/global-scene/interact-points/types";
import {ROOM_OBJECT_SLUG} from "~/core/config/global-scene/room-objects/enums";
import {RoomObject} from "~/core/config/global-scene/room-objects/types";

class GlobalSceneHelper {
  // Rooms
  allRooms(): Array<Room> {
    return GlobalSceneConfig.rooms
  }

  getRoomByName(name: string): Room {
    const room = GlobalSceneConfig.rooms.find(room => room.name === name)
    if (!room) throw new Error(`Room ${name} doesn't exist`)

    return room
  }

  getRoomBySlug(slug: ROOM_SLUG): Room {
    const room = GlobalSceneConfig.rooms.find(room => room.urlSlug === slug)
    if (!room) throw new Error(`Room with slug ${slug} doesn't exist`)

    return room
  }

  // Camera positions
  getCameraPosition(name: string): CameraPosition {
    const cameraPosition = GlobalSceneConfig.cameraPositions.find(cameraPos => cameraPos.name === name)
    if (!cameraPosition) throw new Error(`Camera position ${name} doesn't exist`)

    return cameraPosition
  }

  // InteractionPoints
  getInteractionPoint(name: string): InteractionPoint {
    const interactPoint = GlobalSceneConfig.interactPoints.find(interactPoint => interactPoint.name === name)
    if (!interactPoint) throw new Error(`Interaction point ${name} doesn't exist`)

    return interactPoint
  }

  // Room objects
  getRoomObjectByName(name: string): RoomObject {
    const roomObject = GlobalSceneConfig.roomObjects.find(roomObject => roomObject.name === name)
    if (!roomObject) throw new Error(`Room object ${name} doesn't exist`)

    return roomObject
  }

  getRoomObjectBySlug(slug: ROOM_OBJECT_SLUG): RoomObject {
    const roomObject = GlobalSceneConfig.roomObjects.find(roomObject => roomObject.urlSlug === slug)
    if (!roomObject) throw new Error(`Room object with slug ${slug} doesn't exist`)

    return roomObject
  }
}

const instance = new GlobalSceneHelper()

export default instance
