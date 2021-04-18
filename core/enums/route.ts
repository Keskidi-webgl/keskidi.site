/**
 * List of identifier of route in the URL
 *
 * @example
 * https://keskidi.site/rooms/mezzanine -> "mezzanine" is the identifier the room mezzanine
 */
export enum URL_ROOM_IDENTIFIER {
  BEDROOM = 'bedroom',
  MEZZANINE = 'mezzanine',
  LOUNGE = 'lounge'
}

/**
 * List of identifier of route in the URL
 *
 * @example
 * https://keskidi.site/rooms/mezzanine/neon -> "neon" is the identifier the object neon
 */
export enum URL_OBJECT_IDENTIFIER {
  // Mezzanine
  TELEVISION = 'television',
  NEON = 'neon',
  MEZZA_POSTER = 'poster1',

  // Lounge
  LOUNGE_POSTER = 'poster2',
  VINYL = 'vinyl',
  MAGAZINE = 'magazine',

  // Bedroom
  T_SHIRT = 't-shirt',
  PAPER = 'paper',
  SKATE = 'skate'
}
