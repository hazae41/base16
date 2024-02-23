import "@hazae41/symbol-dispose-polyfill"

import { assert, test } from "@hazae41/phobos"
import { fromAlocer } from "./alocer.js"
import { fromScure } from "./scure.js"

test("encode and decode", async ({ message }) => {
  const scure = fromScure()
  const encodeda = scure.encodeOrThrow(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]))
  const decodeda = scure.padStartAndDecodeOrThrow("0123456789abcdef").copyAndDispose()

  console.log(encodeda, decodeda)

  const alocer = await fromAlocer()
  const encodedb = alocer.encodeOrThrow(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]))
  const decodedb = alocer.padStartAndDecodeOrThrow("0123456789abcdef").copyAndDispose()

  console.log(encodedb, decodedb)

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda).equals(Buffer.from(decodedb)))
})