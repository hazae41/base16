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

### Alocer (WebAssembly)

```bash
npm i @hazae41/alocer
```

```typescript
import { Base16 } from "@hazae41/base16"

Base16.set(await Base16.fromBufferOrAlocer())
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base16 } from "@hazae41/base16"

Base16.set(Base16.fromBufferOrScure())
```

## Usage

### Direct

```tsx
const encoded: string = Base16.get().tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = Base16.get().tryDecode(encoded).unwrap().copy()
```