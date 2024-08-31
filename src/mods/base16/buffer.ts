import { Buffers } from "libs/buffers/buffers.js"
import { Bytes } from "libs/bytes/bytes.js"
import { BytesOrCopiable, Copied } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"

export function fromBuffer() {

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeOrThrow(bytes: BytesOrCopiable) {
    return Buffers.fromView(getBytes(bytes)).toString("hex")
  }

  function decodeOrThrow(text: string) {
    return new Copied(Bytes.fromView(Buffer.from(text, "hex")))
  }

  function padStartAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? "0" + text : text)
  }

  function padEndAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? text + "0" : text)
  }

  return { encodeOrThrow, padStartAndDecodeOrThrow, padEndAndDecodeOrThrow } satisfies Adapter
}