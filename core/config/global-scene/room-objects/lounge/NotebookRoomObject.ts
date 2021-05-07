import { RoomObject } from "~/core/config/global-scene/room-objects/types";
import { ROOM_OBJECT_SLUG } from "~/core/config/global-scene/room-objects/enums";
import { Lounge } from "~/core/config/global-scene/rooms";
import { WORD_ID } from "~/core/enums/word";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";
import {AssetsManager} from "~/core/managers";
import {GLTF_ASSET} from "~/core/enums";
import GlobalScene from "~/core/scene/GlobalScene";
import {LoopOnce} from "three";

const NotebookRoomObject: RoomObject = {
  name: "notebook",
  nameForHuman: "La tise",
  urlSlug: ROOM_OBJECT_SLUG.NOTEBOOK,
  room: () => Lounge,

  fullUrl: `/rooms/${ROOM_SLUG.LOUNGE}/${ROOM_OBJECT_SLUG.NOTEBOOK}`,
  wordId: WORD_ID.TISE,
  animation: () => {
    const gltfObject = AssetsManager.getGltf(GLTF_ASSET.NOTEBOOK).data!
    const animationClip = GlobalScene.context.generateAnimationAction(gltfObject.animations[0], GLTF_ASSET.NOTEBOOK)
    animationClip.clampWhenFinished = true
    animationClip.setLoop(LoopOnce, 1)
    animationClip.play()
  }
};

export default NotebookRoomObject;
