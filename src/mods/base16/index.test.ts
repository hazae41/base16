import { Alocer } from "@hazae41/alocer"
import { assert, test } from "@hazae41/phobos"
import { base16 } from "@scure/base"
import { fromAlocer } from "./alocer.js"
import { fromScure } from "./scure.js"

test("encode and decode", async ({ message }) => {
  const scure = fromScure(base16)
  const encodeda = scure.tryEncode(new Uint8Array([1, 2, 3, 4, 5, 6])).unwrap()
  const decodeda = scure.tryDecode(encodeda).unwrap().copy()

  await Alocer.initBundledOnce()
  const alocer = fromAlocer(Alocer)
  const encodedb = alocer.tryEncode(new Uint8Array([1, 2, 3, 4, 5, 6])).unwrap()
  const decodedb = alocer.tryDecode(encodedb).unwrap().copy()

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda).equals(Buffer.from(decodedb)))
})