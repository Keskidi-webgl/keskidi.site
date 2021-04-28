import {RoomObject} from "~/core/config/global-scene/room-objects/types";
import {ROOM_OBJECT_SLUG} from "~/core/config/global-scene/room-objects/enums";
import {Bedroom} from "~/core/config/global-scene/rooms";
import {WORD_ID} from "~/core/enums/word";

const PaperRoomObject: RoomObject = {
  name: 'paper',
  urlSlug: ROOM_OBJECT_SLUG.PAPER,
  room: Bedroom,

  fullUrl: `${Bedroom.fullUrl}/${ROOM_OBJECT_SLUG.PAPER}`,
  wordId: WORD_ID.CRUSH
}

export default PaperRoomObject
