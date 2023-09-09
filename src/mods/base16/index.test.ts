import { Alocer } from "@hazae41/alocer"
import { assert, test } from "@hazae41/phobos"
import { base16 } from "@scure/base"
import { fromAlocer } from "./alocer.js"
import { fromScure } from "./scure.js"

test("encode and decode", async ({ message }) => {
  const scure = fromScure(base16)
  const encodeda = scure.tryEncode(new Uint8Array([1, 2, 3, 4, 5, 6, 7])).unwrap()
  const decodeda = scure.tryPadStartAndDecode("1020304050607").unwrap().copyAndDispose()

  console.log(encodeda, decodeda)

  await Alocer.initBundledOnce()
  const alocer = fromAlocer(Alocer)
  const encodedb = alocer.tryEncode(new Uint8Array([1, 2, 3, 4, 5, 6, 7])).unwrap()
  const decodedb = alocer.tryPadStartAndDecode("1020304050607").unwrap().copyAndDispose()

  console.log(encodedb, decodedb)

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda).equals(Buffer.from(decodedb)))
})