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

### Alocer (WebAssembly)

```typescript
import { Base16 } from "@hazae41/base16"
import { Alocer } from "@hazae41/alocer"

await Alocer.initBundledOnce()
const base16 = Base16.fromAlocer(Alocer)

/**
 * Set it globally (optional)
 **/
Base16.set(base16)
```

### Scure (JavaScript)

```typescript
import { Base16 } from "@hazae41/base16"
import * as scure from "@scure/base"

const base16 = Base16.fromScure(scure.base16)

/**
 * Set it globally (optional)
 **/
Base16.set(base16)
```

## Usage

### Direct

```tsx
const encoded: string = base16.tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = base16.tryDecode(encoded).unwrap().copy()
```