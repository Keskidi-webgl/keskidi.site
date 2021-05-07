import { Room } from "~/core/config/global-scene/rooms/types";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";
import { Lounge, Mezzanine } from "~/core/config/global-scene/rooms";
import {
  PaperRoomObject,
  SkateRoomObject
} from "~/core/config/global-scene/room-objects";

const Bedroom: Room = {
  urlSlug: ROOM_SLUG.BEDROOM,

  name: "bedroom",

  nameForHuman: "Chambre",

  nextRoom: () => Mezzanine,

  previousRoom: () => Lounge,

  fullUrl: `/rooms/${ROOM_SLUG.BEDROOM}`,

  objects: () => [
    SkateRoomObject,
    PaperRoomObject
  ]
};

export default Bedroom;
