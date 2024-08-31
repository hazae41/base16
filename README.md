# Base16

Base16 adapter for WebAssembly and JS implementations

```bash
npm i @hazae41/base16
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/base16)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Getting started

### Buffer (NodeJS)

```typescript
import { Base16 } from "@hazae41/base16"

Base16.set(Base16.fromBuffer())
```

### WebAssembly

```bash
npm i @hazae41/base16.wasm
```

```typescript
import { Base16 } from "@hazae41/base16"
import { Base16Wasm } from "@hazae41/base16.wasm"

await Base16Wasm.initBundled()

Base16.set(Base16.fromBufferOrWasm(Base16Wasm))
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base16 } from "@hazae41/base16"
import * as Scure from "@scure/base"

Base16.set(Base16.fromBufferOrScure(Scure))
```

## Usage

```tsx
const encoded: string = Base16.get().getOrThrow().encodeOrThrow(new Uint8Array([1,2,3,4,5]))
using decoded: Copiable = Base16.get().getOrThrow().decodeOrThrow(encoded)
const decoded2: Uint8Array = decoded.bytes.slice()
```