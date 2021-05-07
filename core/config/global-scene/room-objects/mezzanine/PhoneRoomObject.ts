import { RoomObject } from "~/core/config/global-scene/room-objects/types";
import { ROOM_OBJECT_SLUG } from "~/core/config/global-scene/room-objects/enums";
import { Mezzanine } from "~/core/config/global-scene/rooms";
import { WORD_ID } from "~/core/enums/word";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";

const PhoneRoomObject: RoomObject = {
  name: "phone",
  nameForHuman: "Ghoster",
  urlSlug: ROOM_OBJECT_SLUG.PHONE,
  room: () => Mezzanine,

  fullUrl: `/rooms/${ROOM_SLUG.MEZZANINE}/${ROOM_OBJECT_SLUG.PHONE}`,
  wordId: WORD_ID.GHOSTER
};

export default PhoneRoomObject;
