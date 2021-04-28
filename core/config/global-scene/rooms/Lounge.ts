import {Room} from "~/core/config/global-scene/rooms/types";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";
import {Bedroom, Mezzanine} from "~/core/config/global-scene/rooms/index";
import {VinylRoomObject} from "~/core/config/global-scene/room-objects";

const Lounge: Room = {
  urlSlug: ROOM_SLUG.LOUNGE,
  name: 'lounge',

  nextRoom: () => Bedroom,

  previousRoom: () => Mezzanine,

  fullUrl: `/rooms/${ROOM_SLUG.LOUNGE}`,

  objects: () => [VinylRoomObject]
}

export default Lounge
