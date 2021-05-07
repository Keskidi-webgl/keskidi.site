import {URL_ROOM_IDENTIFIER} from "~/core/enums";
import {Room} from "~/core/config/global-scene/rooms/types";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";
import {Bedroom, Lounge} from "~/core/config/global-scene/rooms/index";
import {PhoneRoomObject, TelevisionRoomObject} from "~/core/config/global-scene/room-objects";

const Mezzanine: Room = {
  urlSlug: ROOM_SLUG.MEZZANINE,
  name: "mezzanine",

  nameForHuman: "Mezzanine",

  nextRoom: () => Lounge,
  previousRoom: () => Bedroom,

  fullUrl: `/rooms/${URL_ROOM_IDENTIFIER.MEZZANINE}`,

  objects: () => [
    TelevisionRoomObject,
    PhoneRoomObject
  ]
};

export default Mezzanine;
