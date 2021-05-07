import { RoomObject } from "~/core/config/global-scene/room-objects/types";
import { ROOM_OBJECT_SLUG } from "~/core/config/global-scene/room-objects/enums";
import { Bedroom } from "~/core/config/global-scene/rooms";
import { WORD_ID } from "~/core/enums/word";
import { ROOM_SLUG } from "~/core/config/global-scene/rooms/enums";
import {AssetsManager} from "~/core/managers";
import {AUDIO_ASSET, GLTF_ASSET} from "~/core/enums";
import GlobalScene from "~/core/scene/GlobalScene";
import {LoopOnce} from "three";
import gsap from "gsap";

const PaperRoomObject: RoomObject = {
  name: "paper",
  nameForHuman: "Crush",
  urlSlug: ROOM_OBJECT_SLUG.PAPER,
  room: () => Bedroom,

  fullUrl: `/rooms/${ROOM_SLUG.BEDROOM}/${ROOM_OBJECT_SLUG.PAPER}`,
  wordId: WORD_ID.CRUSH,

  animation: () => {
    const gltfObject = AssetsManager.getGltf(GLTF_ASSET.PAPER).data!
    const animationClip = GlobalScene.context.generateAnimationAction(gltfObject.animations[0], GLTF_ASSET.PAPER)
    animationClip.clampWhenFinished = true
    animationClip.setLoop(LoopOnce, 1)
    animationClip.play()
    animationClip.reset()
  }
};

export default PaperRoomObject;
