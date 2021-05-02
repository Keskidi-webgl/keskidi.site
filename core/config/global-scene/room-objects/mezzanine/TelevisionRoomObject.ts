import { RoomObject } from "~/core/config/global-scene/room-objects/types";
import { ROOM_OBJECT_SLUG } from "~/core/config/global-scene/room-objects/enums";
import { Mezzanine } from "~/core/config/global-scene/rooms";
import { WORD_ID } from "~/core/enums/word";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";

const TelevisionRoomObject: RoomObject = {
  name: "television",
  nameForHuman: "Noob",
  urlSlug: ROOM_OBJECT_SLUG.TELEVISION,
  room: () => Mezzanine,

  fullUrl: `/rooms/${ROOM_SLUG.MEZZANINE}/${ROOM_OBJECT_SLUG.TELEVISION}`,
  wordId: WORD_ID.NOOB
};

export default TelevisionRoomObject;
