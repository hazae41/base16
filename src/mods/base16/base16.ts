import { Cursor, CursorWriteError } from "@hazae41/cursor"
import { OptionInit } from "@hazae41/option"
import { Ok, Result } from "@hazae41/result"
import { fromBuffer } from "./buffer.js"

export const global: OptionInit<Adapter> = { inner: fromBuffer() }

export interface Copiable extends Disposable {
  readonly bytes: Uint8Array

  copy(): Uint8Array

  trySize(): Result<number, never>

  tryWrite(cursor: Cursor): Result<void, CursorWriteError>
}

export class Copied implements Copiable {

  /**
   * A copiable that's already copied
   * @param bytes 
   */
  constructor(
    readonly bytes: Uint8Array
  ) { }

  [Symbol.dispose]() { }

  static new(bytes: Uint8Array) {
    return new Copied(bytes)
  }

  static from(buffer: ArrayBuffer) {
    return new Copied(new Uint8Array(buffer))
  }

  copy() {
    return this.bytes
  }

  trySize(): Result<number, never> {
    return new Ok(this.bytes.length)
  }

  tryWrite(cursor: Cursor): Result<void, CursorWriteError> {
    return cursor.tryWrite(this.bytes)
  }

}

export interface Adapter {
  tryEncode(bytes: Uint8Array): Result<string, Error>
  tryDecode(text: string): Result<Copiable, Error>
}

