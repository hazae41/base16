import "@hazae41/symbol-dispose-polyfill"

import { assert, test } from "@hazae41/phobos"
import { fromScure } from "./scure.js"

import { Base16Wasm } from "@hazae41/base16.wasm"
import * as Scure from "@scure/base"
import { fromWasm } from "./wasm.js"

test("encode and decode", async ({ message }) => {
  const scure = fromScure(Scure)
  const encodeda = scure.encodeOrThrow(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]))
  using decodeda = scure.padStartAndDecodeOrThrow("0123456789abcdef")

  console.log(encodeda, decodeda.bytes)

  const alocer = await fromWasm(Base16Wasm)
  const encodedb = alocer.encodeOrThrow(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]))
  using decodedb = alocer.padStartAndDecodeOrThrow("0123456789abcdef")

  console.log(encodedb, decodedb.bytes)

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda.bytes).equals(Buffer.from(decodedb.bytes)))
})