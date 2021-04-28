import {RoomObject} from "~/core/config/global-scene/room-objects/types";
import {ROOM_OBJECT_SLUG} from "~/core/config/global-scene/room-objects/enums";
import {Lounge} from "~/core/config/global-scene/rooms";
import {WORD_ID} from "~/core/enums/word";
import {ROOM_SLUG} from "~/core/config/global-scene/rooms/enums";

const VinylRoomObject: RoomObject = {
  name: 'vinyl',
  urlSlug: ROOM_OBJECT_SLUG.VINYL,
  room: Lounge,

  fullUrl: `/rooms/${ROOM_SLUG.LOUNGE}/${ROOM_OBJECT_SLUG.VINYL}`,
  wordId: WORD_ID.CRUSH
}

export default VinylRoomObject
