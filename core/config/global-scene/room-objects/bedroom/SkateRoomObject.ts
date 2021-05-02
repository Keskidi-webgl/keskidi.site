import { ROOM_OBJECT_SLUG } from "~/core/config/global-scene/room-objects/enums";
import { Bedroom } from "~/core/config/global-scene/rooms";
import { WORD_ID } from "~/core/enums/word";
import { RoomObject } from "~/core/config/global-scene/room-objects/types";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";

const SkateRoomObject: RoomObject = {
  name: "skate",
  nameForHuman: "Hendecks",
  urlSlug: ROOM_OBJECT_SLUG.SKATE,
  room: () => Bedroom,

  fullUrl: `/rooms/${ROOM_SLUG.BEDROOM}/${ROOM_OBJECT_SLUG.SKATE}`,
  wordId: WORD_ID.HENDEK
};

export default SkateRoomObject;
