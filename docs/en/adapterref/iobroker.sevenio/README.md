![Logo](admin/sevenio.png)
# ioBroker.sevenio

[![NPM version](https://img.shields.io/npm/v/iobroker.sevenio.svg)](https://www.npmjs.com/package/iobroker.sevenio)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sevenio.svg)](https://www.npmjs.com/package/iobroker.sevenio)
![Number of Installations](https://iobroker.live/badges/sevenio-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/sevenio-stable.svg)

**Tests:** ![Test and Release](https://github.com/ipod86/ioBroker.sevenio/workflows/Test%20and%20Release/badge.svg)

## ioBroker adapter for seven.io

This adapter connects ioBroker to the [seven.io](https://www.seven.io) SMS and communication API. Send SMS messages and trigger text-to-speech voice calls directly from your automations, Blockly scripts, or JavaScript — with contact management, delivery tracking, inbound SMS polling, and account balance monitoring included.

---

## Features

- **Send SMS** — trigger via data point, Blockly block, or `sendTo()`
- **Flash SMS** — message appears directly on the recipient's screen
- **Voice calls (TTS)** — read any text aloud via an automated call
- **Delivery status** — automatic check ~60 s after sending, written to a dedicated state
- **Contact management** — sync contacts from seven.io as individual data points; create new contacts directly from ioBroker
- **Recipient by name** — enter a contact name instead of a phone number; the adapter resolves it automatically
- **Account balance polling** — configurable interval, result available as a readable state
- **Inbound SMS polling** — receive incoming SMS (requires a rented virtual number, see below)
- **Blockly block** — ready-to-use block in the sendTo category with checkboxes for SMS and/or voice call
- **`sendTo()` API** — full scripting support for JavaScript adapter

---

## Requirements

- An account at [seven.io](https://www.seven.io)
- A valid API key (found in your seven.io dashboard under *Developer → API Keys*)

**Cost model:**
- Sending SMS and voice calls is **pay-per-use** — you only pay per message or call, no monthly fee
- **Receiving inbound SMS** requires a virtual phone number rented from seven.io (~€20/month). Without a rented number, inbound polling is not available

> **Private users:** seven.io is primarily a business service. When registering, a company name is required. Private users may simply enter their own name or the word *Privat* in that field — seven.io has confirmed this is acceptable.

---

## Configuration

| Setting | Description | Default |
|---|---|---|
| **API Key** | Your seven.io API key | *(required)* |
| **Default Sender ID** | Sender name or number shown to recipients. Max 11 alphanumeric **or** 16 numeric characters. Leave empty to use the seven.io account default. To allow replies, use `getReplies: true` per message (Blockly or `sendTo()`) — see [Inbound SMS](#inbound-sms). | *(empty)* |
| **Balance polling interval** | How often (in minutes) the adapter polls your account balance | `30` |
| **Inbound SMS polling interval** | How often (in minutes) the adapter checks for new incoming SMS. Set to `0` to disable. | `0` |
| **Country code for pricing** | ISO country code (e.g. `DE`, `US`) to load SMS pricing for that country only. Leave empty to load all countries. | *(empty)* |

---

## Data points

### `info`
| State | Type | Description |
|---|---|---|
| `info.connection` | boolean | `true` when the adapter can reach the seven.io API |

### `account`
| State | Type | Description |
|---|---|---|
| `account.balance` | number | Current account balance |
| `account.currency` | string | Currency (e.g. `EUR`) |
| `account.lastCheck` | string | ISO timestamp of the last balance poll |

### `contacts`
| State | Type | Description |
|---|---|---|
| `contacts.json` | string (JSON) | Full contact list as a JSON array |
| `contacts.count` | number | Number of contacts |
| `contacts.refresh` | boolean | Set to `true` to trigger an immediate contact refresh |
| `contacts.new.name` | string | Name for a new contact to create |
| `contacts.new.number` | string | Phone number for the new contact (format: `491234567890`, without `+`) |
| `contacts.new.save` | boolean | Set to `true` to create the contact and refresh the list |
| `contacts.list.<Name>` | string | One state per contact — the state name is the contact's display name (e.g. `contacts.list.Max_Mustermann`), the value is the phone number |

### `sms`
| State | Type | R/W | Description |
|---|---|---|---|
| `sms.to` | string | rw | Recipient — phone number (`+491234567890`) **or contact name** (e.g. `Max Mustermann`) |
| `sms.from` | string | rw | Sender ID override — empty = use default from settings |
| `sms.text` | string | rw | Message text (max 1520 characters / ~10 SMS parts) |
| `sms.flash` | boolean | rw | Send as flash SMS (message shown directly on screen) |
| `sms.getReplies` | boolean | rw | Enable shared pool so recipient can reply — opt-in per message, default `false` |
| `sms.send` | boolean | rw | Set to `true` to send — resets to `false` automatically |
| `sms.lastResult` | string (JSON) | r | Full API response of the last send attempt, including `statusText` |
| `sms.lastStatus` | string | r | Human-readable status of the last send (e.g. `Success`, `Insufficient credits`) |
| `sms.lastDelivery` | string (JSON) | r | Delivery report fetched ~60 s after sending — contains `id`, `to`, `status` (e.g. `DELIVERED`) |

### `sms.inbound`
| State | Type | Description |
|---|---|---|
| `sms.inbound.id` | string | Message ID of the last received SMS |
| `sms.inbound.from` | string | Sender number of the last received SMS |
| `sms.inbound.text` | string | Text content of the last received SMS |
| `sms.inbound.timestamp` | string | Timestamp when the SMS was received |

### `voice`
| State | Type | R/W | Description |
|---|---|---|---|
| `voice.to` | string | rw | Recipient phone number |
| `voice.from` | string | rw | Verified caller number (must be registered in your seven.io account) |
| `voice.text` | string | rw | Text to read aloud (TTS), max 10 000 characters |
| `voice.ringtime` | number | rw | How long to ring before hanging up (5–60 seconds, default 30) |
| `voice.send` | boolean | rw | Set to `true` to start the call — resets to `false` automatically |
| `voice.lastResult` | string (JSON) | r | Full API response of the last call attempt |
| `voice.lastStatus` | string | r | Human-readable status of the last call (e.g. `Success`, `Call failed`) |

### `pricing`
| State | Type | Description |
|---|---|---|
| `pricing.json` | string (JSON) | Full pricing data from seven.io — per-network SMS prices for the configured country or all countries |
| `pricing.price` | number (€) | SMS price for the configured country — only set when a country code is configured |
| `pricing.lastUpdate` | string | ISO timestamp of the last pricing fetch |
| `pricing.refresh` | boolean | Set to `true` to refresh pricing data immediately |

### `stats` *(rolling 30 days)*

Statistics always cover the rolling window **today − 30 days → today**. They are fetched once on adapter start and on manual trigger — there is no automatic refresh timer.

| State | Type | Description |
|---|---|---|
| `stats.smsSent` | number | Total outbound SMS sent in the last 30 days |
| `stats.voiceCalls` | number | Total voice calls made in the last 30 days |
| `stats.inbound` | number | Total inbound SMS received in the last 30 days |
| `stats.totalCost` | number | Total cost in EUR for the last 30 days |
| `stats.lastUpdate` | string | ISO timestamp of the last stats fetch |
| `stats.json` | string (JSON) | Raw analytics data grouped by day |
| `stats.refresh` | boolean | Set to `true` to refresh statistics immediately |

---

## Inbound SMS

To receive SMS replies you need a **numeric sender** — alphanumeric names (e.g. `MyCompany`) cannot directly receive replies. You have two options:

### Option 1 — Shared pool (free, for testing and light use)

Pass `getReplies: true` per message (Blockly checkbox or `sendTo()` parameter). seven.io automatically assigns a temporary shared pool number as the sender, so replies work even with an alphanumeric sender ID.

| | |
|---|---|
| **Cost** | Free — only regular SMS sending costs apply |
| **Reply window** | 48 hours after sending |
| **Number stability** | Same number is tried within 2 weeks — not guaranteed |
| **Available countries** | DE 🇩🇪 AT 🇦🇹 CH 🇨🇭 US 🇺🇸 PL 🇵🇱 |
| **Suitable for** | Testing, low-volume, non-critical notifications |

### Option 2 — Own inbound number (~€20/month)

Rent a virtual inbound number directly in your seven.io dashboard. Replies arrive reliably and permanently.

| | |
|---|---|
| **Cost** | ~€20/month |
| **Reply window** | Unlimited |
| **Number stability** | Fixed, always the same number |
| **Available countries** | Many — check seven.io dashboard |
| **Suitable for** | Ongoing customer communication, production use |

> Configure the polling interval in the adapter settings. Set to `0` to disable inbound polling (e.g. if you use webhooks instead).

> **Multiple messages per cycle:** If several SMS arrive between two polls, the adapter processes them all — oldest first. Each message triggers a separate state change on `sms.inbound.text`, so every Blockly rule or JavaScript automation that watches this state fires once per message. The data points always reflect the most recent message after the cycle.

---

## Blockly

After installing the adapter a ready-to-use block appears in the **sendTo** category of the ioBroker Blockly editor.

```
┌─ seven.io  |  SMS ☑  Voice call ☐ ─────────────┐
│  sender (optional)  [ ""                  ]      │
│  recipient          [ "+491234567890"     ]      │
│  message            [ "Alarm!"            ]      │
│  flash SMS ☐  replies (shared pool) ☐           │
│  ring time (s)  30                               │
│  instance  sevenio.0 ▼                           │
└──────────────────────────────────────────────────┘
```

- Check **SMS** to send a text message
- Check **Voice call** to trigger an automated TTS call
- Check **both** to send an SMS and make a call at the same time (parallel, no extra delay)
- **replies (shared pool)** — when checked, seven.io uses a shared pool number as sender so the recipient can reply (see [Inbound SMS](#inbound-sms))
- The **recipient** input accepts a phone number or a contact name from your seven.io contact list

---

## sendTo() scripting

All functions are available via `sendTo()` in the JavaScript adapter.

**Send an SMS:**
```javascript
sendTo('sevenio.0', 'send', {
    to: '+491234567890',   // or a contact name: 'Max Mustermann'
    text: 'Door opened!',
    flash: false,          // optional
    getReplies: true,      // optional — enable shared pool so recipient can reply
}, result => {
    console.log(result.statusText); // e.g. 'Success'
});
```

**Trigger a voice call:**
```javascript
sendTo('sevenio.0', 'voice', {
    to: '+491234567890',
    text: 'Attention! Motion detected in the garage.',
    ringtime: 30,          // optional, 5–60 s
});
```

**Get account balance:**
```javascript
sendTo('sevenio.0', 'get_balance', {}, result => {
    console.log(result.amount, result.currency);
});
```

**Get contact list:**
```javascript
sendTo('sevenio.0', 'get_contacts', {}, contacts => {
    console.log(JSON.stringify(contacts));
});
```

**Create a contact:**
```javascript
sendTo('sevenio.0', 'create_contact', {
    name: 'Max Mustermann',
    number: '491234567890',   // without +
});
```

**Test SMS (send a test message to verify the API key):**
```javascript
sendTo('sevenio.0', 'test_sms', { to: '+491234567890' }, result => {
    console.log(result.statusText);
});
```

**Test voice call:**
```javascript
sendTo('sevenio.0', 'test_voice', { to: '+491234567890' }, result => {
    console.log(result);
});
```

**Refresh statistics immediately:**
```javascript
sendTo('sevenio.0', 'get_stats', {}, result => {
    console.log(result); // raw analytics data
});
```

Alternatively, set the `sevenio.0.stats.refresh` data point to `true` — the adapter fetches fresh statistics and resets the state to `false` automatically.

**Delayed SMS (scheduled delivery):**
```javascript
sendTo('sevenio.0', 'send', {
    to: '+491234567890',
    text: 'Good morning!',
    delay: '2026-12-24 08:00:00', // ISO datetime or Unix timestamp (seconds)
}, result => {
    console.log(result.statusText);
});
```

The `delay` parameter is forwarded directly to the seven.io API. Use an ISO datetime string (`YYYY-MM-DD HH:MM:SS`) or a Unix timestamp in seconds. The message is queued by seven.io and delivered at the specified time.

---

## SMS status codes

The `sms.lastStatus` state contains a human-readable translation of the seven.io status code:

| Code | Meaning |
|---|---|
| 100 | Success |
| 101 | Transfer to SMS center failed |
| 201 | Invalid recipient number |
| 202 | Invalid sender ID |
| 301 | Insufficient credits |
| 403 | Sender is blacklisted |
| 500 | Unknown error |
| 700 | Network delivery timeout |

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.2 (2026-07-22)
* (ipod86) Maintenance: fix io-package.json structure, improve CI and dependabot configuration

### 0.1.1 (2026-07-22)
* (ipod86) Fix: multiple inbound SMS per poll cycle now each trigger automations (processed oldest-first)

### 0.1.0 (2026-07-22)
* (ipod86) SMS sending via state, Blockly, and sendTo()
* (ipod86) Voice calls (TTS) via state, Blockly, and sendTo()
* (ipod86) Contact management — sync, create, send by name
* (ipod86) Inbound SMS polling with shared pool and own number support
* (ipod86) Delivery status check ~60 s after sending
* (ipod86) Account balance polling
* (ipod86) SMS pricing data with per-country price state
* (ipod86) Usage statistics (rolling 30-day window)

---

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
