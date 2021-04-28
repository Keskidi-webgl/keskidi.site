import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";
import {RoomObject} from "~/core/config/global-scene/room-objects/types";

export type Room = {
  urlSlug: ROOM_SLUG
  name: string
  nextRoom: () => Room
  previousRoom: () => Room
  fullUrl: string
  objects: () => Array<RoomObject>
}
