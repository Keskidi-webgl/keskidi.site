import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import {Room} from "~/core/config/global-scene/rooms/types";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";
import {Bedroom, Lounge} from "~/core/config/global-scene/rooms/index";
import {TelevisionRoomObject} from "~/core/config/global-scene/room-objects";

const Mezzanine: Room = {
  urlSlug: ROOM_SLUG.MEZZANINE,
  name: 'mezzanine',

  nextRoom: () => Lounge,
  previousRoom: () => Bedroom,

  fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,

  objects: () => [TelevisionRoomObject]
}

export default Mezzanine
