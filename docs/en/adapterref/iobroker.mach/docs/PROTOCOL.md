---
chapters: {"pages":{"en/adapterref/iobroker.mach/README.md":{"title":{"en":"ioBroker.mach"},"content":"en/adapterref/iobroker.mach/README.md"},"en/adapterref/iobroker.mach/docs/PROTOCOL.md":{"title":{"en":"MACH cloud protocol (as used by this adapter)"},"content":"en/adapterref/iobroker.mach/docs/PROTOCOL.md"}}}
---
# MACH cloud protocol (as used by this adapter)

This document describes what the adapter needs to talk to a MACH box
through the MACH cloud. It was worked out independently for
interoperability and is neither complete nor official. Everything here can
change with an app or firmware update.

All examples use placeholder values. Never publish your real `machId`,
`sharedSecret`, tokens or captures.

## 1. Login

Backend: `https://mach-backend.solvesall.com`. Every request is a JSON
`POST` that carries the account credentials:

```json
{ "auth": { "username": "user@example.com", "password": "…" } }
```

| Step | Endpoint | Purpose |
|---|---|---|
| 1 | `/v0/api/mobile/authenticate` | check credentials |
| 2 | `/v0/api/mobile/syncData` (`payload: {current: [], deleted: []}`) | list of paired boxes; each entry has `machId`, `name` and `sharedSecret` (Base64, 16 bytes = AES-128 key) |
| 3 | `/v0/api/mach-basic-lte/get-drivers-json` | value table (see § 5) |
| 4 | `/v0/api/mach-basic/getConfig` (`mach: {machId}`) | drivers installed in this box |
| 5 | `/v0/lte1/mobile/auth` (`machId`) | `url` (WebSocket) and `token` |

The adapter also calls `getSignedCredentials` and `getReleaseType` like the
app does; their content is not used.

## 2. WebSocket

Connect to the `url` from step 5 with the headers `token: <token>` and
`id: <machId>`. Send the text frame `GET_SYSTEM_CONNECTED` every 10 seconds
as a heartbeat. Everything else is binary.

## 3. Framing

A message has three layers:

```
L0  [00][part][of][ L1 chunk ][FF]          split into chunks (LTE: 1460 bytes)
L1  [01][len:2][msgId][IV:16][CT][CRC-8][FE]
L2  [len:2][msgId][opcode][payload…][CRC-8] + HMAC-SHA1 (20 bytes)
```

- **L0:** a single-part message therefore starts with `00 01 01 01`. Long
  answers (e.g. the full state) arrive in several parts and must be
  reassembled in order.
- **L1:** `len` (big endian) is the length of the whole L1 frame, from
  `01` to `FE`. `IV` + `CT` is AES-128-CBC with PKCS#7 padding, key =
  `sharedSecret`. The CRC-8 covers `[len][msgId][IV][CT]`.
- **L2** is the decrypted plaintext. The HMAC-SHA1 (key = `sharedSecret`)
  covers everything before it.
- **CRC-8:** polynomial `0xD9`, initial value `0`, no reflection, no final
  XOR. A wrong L1 CRC is answered with L1 status 3 (`INCORRECT_CRC`) and
  the command is ignored.

Answers from the box have a status byte after the opcode:
`[len:2][msgId][opcode][status][payload…][CRC-8]`. A short L1 error looks
like `01 00 07 [msgId] [status] [crc] FE`.

| Code | L1 status | L2 status |
|---|---|---|
| 0 | OK | OK |
| 1 | INCORRECT_MESSAGE_LENGTH | INCORRECT_MESSAGE_LENGTH |
| 2 | INVALID_APP_COMMAND | INVALID_APP_COMMAND |
| 3 | INCORRECT_CRC | PAYLOAD_NOT_MATCHING_SPECIFIED_APP_COMMAND |
| 4 | MISSING_ENCODED_L2_MESSAGE | INCORRECT_CRC |
| 5 | ERROR_DECODING_L2_MESSAGE | ERROR_DECODING_MESSAGE_USING_STORED_SECRET |
| 6 | MISSING_SHARED_SECRET | MEMORY_ERROR |
| 7 | HMAC_SIGNATURE_MISMATCH | NOT_IMPLEMENTED |
| 8 | MEMORY_ALLOCATION_ERROR | – |

## 4. Commands used by the adapter

`msgId` is a per-connection counter. The CRC-8 at the end of L2 covers
`[len][msgId][opcode][payload]`.

| Opcode | Name | Payload |
|---|---|---|
| `0x05` | GET_ALL_DEVICE_VALUES | empty → answer is a value list (§ 5) |
| `0x06` | GET_DEVICE_VALUE_FOR_VALUEID | `[valueId:2]` → answer is a value list with this value |
| `0x07` | SET_DEVICE_VALUE_FOR_VALUEID | `[valueId:2][value]`, value encoded as in § 5a |
| `0x09` | SYSTEM_RESET | empty (restart, like "Restart MACH" in the app) |

During the handshake the adapter also sends `0x02`, `0x0c`, `0x35` and
`0x3c` with empty payloads, like the app.

**Never send** `0x08` (SET_DETECTED_DEVICES – overwrites the device list
of the box), `0x18` (FACTORY_RESET) or `0x19`. The adapter has no code path
for them.

Push messages from the box use `msgId = 0xFF` and opcode `0x0B`; their
payload is the same value list.

## 5. Value list and value table

A value list is a sequence of entries:

```
[valueId:2][type:2][len:1][value:len]
```

`len` can be 0 (no value) and up to 255 (texts).

What a `valueId` means comes from the value table of
`get-drivers-json`:

- `valueIds`: name → number (e.g. `AIR_HEATER_TEMPERATURE` → 67)
- `config`: driver → name → type key
- `typesConfigs`: type key → `dividend`, `categories`, `offState`, …

The type key contains the kind of value:

| Kind | Decoding |
|---|---|
| `INTEGER` | signed big endian; `offState` and 0 → no value |
| `FLOAT` | signed big endian ÷ `dividend` |
| `CATEGORICAL` | `categories[first byte]` |
| `STRING` | UTF-8, trailing zeros removed |

Example: `AIR_HEATER_TEMPERATURE` (67 = `0x0043`) has dividend 2, so the
raw value `0x0A` means 5 °C. Writing 5 °C is `0x07` with payload
`00 43 0A`.

## 5a. Encoding a value for writing

The value table marks writable values (`writable: true` in `typesConfigs`).
The value bytes after `[valueId:2]` depend on the kind:

| Kind | Bytes |
|---|---|
| `CATEGORICAL` | 1 byte: position in `categories` (`off`=0, `on`=1, …) |
| `INTEGER` | signed big endian, `bytes` long (default 2); with `offState`, "off" is a single byte `0` |
| `FLOAT` | value × `dividend`, signed big endian, `bytes` long (default 2) |
| `STRING` | `[length:1][UTF-8]` |

`range` and `step` in the value table give the allowed values. Types with
`hasState: false` are actions (`start`, `press`, `save`/`restore`): writing
the position triggers the action, there is no state to read back.

Examples: heating on `00 40 01`, heating target 17.5 °C `00 43 23`
(dividend 2), light group 1 at 42 % `00 5b 2a`.

## 6. Older push frame view (before 2.0.0)

Before the value table was known, the adapter decoded push messages by
their first bytes ("outer ID", e.g. `43804701` = heating target). The
outer ID is a value list entry read from the low byte of its `valueId`.
Versions before 2.0.0 created `named.*` and `frames.*` states from this
view; 2.0.0 removed them, everything is under `values.*`. Values that are
not in the value table are stored raw under `tlv.<id>`.