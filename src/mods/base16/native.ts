import { BytesOrMemory, Slice } from "libs/copiable/index.js";
import { Adapter } from "./adapter.js";

declare global {
  interface Uint8Array {
    toHex(): string;
  }

  interface Uint8ArrayConstructor {
    fromHex(hex: string): Uint8Array;
  }
}

export function fromNative() {

  function getBytes(bytes: BytesOrMemory) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeOrThrow(bytes: BytesOrMemory) {
    return getBytes(bytes).toHex()
  }

  function decodeOrThrow(text: string) {
    return new Slice(Uint8Array.fromHex(text))
  }

  function padStartAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? "0" + text : text)
  }

  function padEndAndDecodeOrThrow(text: string) {
    return decodeOrThrow(text.length % 2 ? text + "0" : text)
  }

  return { encodeOrThrow, decodeOrThrow, padStartAndDecodeOrThrow, padEndAndDecodeOrThrow } satisfies Adapter
}