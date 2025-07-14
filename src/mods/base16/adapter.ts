import { fromNativeOrBuffer } from "./buffer.js"

const adapter = fromNativeOrBuffer()

export interface Adapter {
  encodeOrThrow(bytes: Uint8Array): string

  decodeOrThrow(text: string): Uint8Array

  padStartAndDecodeOrThrow(text: string): Uint8Array

  padEndAndDecodeOrThrow(text: string): Uint8Array
}

export function encodeOrThrow(bytes: Uint8Array): string {
  return adapter.encodeOrThrow(bytes)
}

export function decodeOrThrow(text: string): Uint8Array {
  return adapter.decodeOrThrow(text)
}

export function padStartAndDecodeOrThrow(text: string): Uint8Array {
  return adapter.padStartAndDecodeOrThrow(text)
}

export function padEndAndDecodeOrThrow(text: string): Uint8Array {
  return adapter.padEndAndDecodeOrThrow(text)
}