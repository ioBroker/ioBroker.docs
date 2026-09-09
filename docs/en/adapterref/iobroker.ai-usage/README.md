---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.ai-usage
BADGE-stable: https://iobroker.live/badges/ai-usage-stable.svg
BADGE-Installations: https://iobroker.live/badges/ai-usage-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.ai-usage
BADGE-Test and Release: https://github.com/krobipd/ioBroker.ai-usage/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# ioBroker.ai-usage

Monitors usage, limits and costs of your AI accounts and writes them into read-only
ioBroker states. The adapter only **reads** — it never calls a model, never changes
anything at the provider, and never sends your data anywhere.

---

## What it can watch

| Account                                      | What you get                                                                                                                                           | How it is connected                                                                                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Claude subscription** (Pro / Max)          | 5-hour and weekly limit windows with percent and reset time, per-model windows, extra-usage credits and the money spent on them                        | Sign in with your own Anthropic account: open the link, log in, paste the code back                                                                                                  |
| **ChatGPT subscription** (Plus / Pro, Codex) | 5-hour and weekly windows, additional per-surface windows, credit balance, purchasable limit-reset vouchers                                            | The adapter shows a short code; you type it on the OpenAI page. Your own Codex CLI session is never touched                                                                          |
| **Google Gemini subscription** (Pro / Ultra) | The per-model quota buckets Google reports                                                                                                             | Open the link and log in. Google redirects to `localhost`, so **your browser shows an error page — that is expected**. Copy the whole address from the address bar and paste it back |
| **OpenRouter**                               | Credits used, limit, remaining, percent                                                                                                                | Pick the stored key from the admin's credential storage                                                                                                                              |
| **DeepSeek**                                 | Balance (granted and topped-up separately), and whether it still covers calls                                                                          | Pick the stored key                                                                                                                                                                  |
| **OpenAI organisation**                      | Costs today and this month, month-end projection, today's tokens per model                                                                             | Needs an **admin key** of your organisation                                                                                                                                          |
| **Anthropic organisation**                   | Costs today and this month, month-end projection, today's tokens — Anthropic reports uncached input tokens, so prompt-cache hits are not in the figure | Needs an **admin key** of your organisation                                                                                                                                          |

The three subscription endpoints are the ones those providers' own tools use. They are
**not officially documented** and can change without notice. Claude was tested against a
live subscription; ChatGPT and Google are built from verified sources but were never run
against a real account — please open an issue if something looks wrong.

---

## Requirements

- Node.js >= 22
- ioBroker js-controller >= 7.2.2
- **ioBroker Admin >= 8.0.11** — the adapter reads API keys from the admin's central
  credential storage instead of asking for them again

---

## Setting it up

1. Install the adapter and open the instance settings.
2. The settings page shows **one list**: the three subscriptions first, then one row per
   AI key you stored under **Admin → Settings → Credentials**.
3. Switch on what you want to watch. Each row has its own **warn threshold** (10–100 %,
   default 80 %).
4. For a subscription, the sign-in area opens below its row and walks you through the
   flow that provider requires. **Save first** — the sign-in talks to the running
   instance.
5. After a successful sign-in the account is queried immediately; you do not have to wait
   for the next cycle.

### Options

| Option            | What it does                                                                                         | Default |
| ----------------- | ---------------------------------------------------------------------------------------------------- | ------- |
| **Poll interval** | How often each account is queried, in seconds. Minimum 60 s                                          | 300 s   |
| **Notifications** | One ioBroker notification when an account crosses its warn threshold or its credentials stop working | on      |

Accounts are queried in a staggered order, and a provider that answers "too many
requests" puts that account into a growing backoff (10 minutes, doubling up to an hour)
while the last values stay in place.

---

## The object tree

One device node per account, named the same way for every provider:

```
ai-usage.0
├─ info.connection            at least one account is delivering data
├─ <account>                  e.g. claude, chatgpt, gemini, <name>-api
│  ├─ info.unreach            the offline marker; drives the icon in the object tree
│  ├─ info.error              why, in plain text; empty while everything works
│  ├─ info.lastUpdate         last successful query
│  ├─ warning                 above the account's warn threshold
│  ├─ limitReached            at 100 %
│  ├─ limits.<window>.percent      utilisation of a limit window
│  ├─ limits.<window>.resetAt      when it resets (empty while no window runs)
│  ├─ limits.<window>.active       whether this window is the limit in force
│  ├─ credits.*               used / limit / remaining / percent, granted / topped up,
│  │                          and whether the balance still covers calls
│  ├─ costs.*                 today / month / total / projected month-end
│  ├─ tokens.*                input and output tokens today
│  └─ models.<model>.*        per-model tokens
└─ total
   ├─ costs.today / month / projectedMonth      summed over all USD accounts
   ├─ maxLimitPercent         the fullest account (limit window or budget)
   ├─ warningsActive          accounts above their threshold
   ├─ limitReached            any account at 100 %
   ├─ accountsReachable       accounts currently delivering
   └─ accounts                accounts you switched on
```

**Datapoints stay once they exist.** A provider that leaves a field out for a while does
not make its datapoint disappear; time stamps are written empty instead. Only a whole
limit window or model that the provider stopped reporting is removed, and switching an
account off removes its node completely.

**`total.costs` only sums real money in the same currency** — piece counters (request
credits, reset vouchers) and other currencies stay out on purpose.

---

## Warnings, and what speaks for an account

Only a **plan-wide** window can raise an account's warning. A per-model bucket gets its
own datapoints but never triggers the alarm: a model you never use can sit at 100 %
forever, and an alarm that never clears is worse than no alarm. Google is the exception —
it reports no plan-wide window at all, so there the fullest model bucket speaks for the
account, and the warning names the model.

The granted budget competes with the windows: an account whose money is nearly spent is
just as blocked as one whose time window is full. Whichever side is higher gives the
warning its label.

---

## Online status

`info.unreach` means **"this account is not delivering"** and drives the connection icon
next to the account in the object tree:

| Situation                                      | Icon                               | `info.error`                         |
| ---------------------------------------------- | ---------------------------------- | ------------------------------------ |
| Everything works                               | green                              | empty                                |
| Throttled by the provider                      | green — the last values still hold | says so, with the retry delay        |
| Sign-in rejected                               | red                                | "Sign-in rejected — …"               |
| The service reports a fault                    | red                                | "The AI service reports a fault — …" |
| Not reachable at all                           | red, after three attempts          | "Not reachable after N attempts — …" |
| Instance stopped, or started and not asked yet | red                                | `Unknown`                            |

---

## Privacy and credentials

- Subscription tokens belong to the adapter alone: they live encrypted in the instance
  data directory, owner-readable only. The adapter **never** reads or writes the files of
  your own tools (`~/.codex/auth.json`, `oauth_creds.json`) — those refresh tokens rotate,
  and two programs refreshing them would sign each other out.
- API keys are read from the admin's central credential storage and never copied.
- The Claude sign-in asks for the profile scope only — the token cannot create API keys
  or call models.
- The adapter talks to the AI providers and to nobody else.

---

## Troubleshooting

**The sign-in button does nothing / the row keeps spinning.**
Save the settings first, and make sure the instance is running — the sign-in is a
conversation with the running adapter.

**Google shows an error page after signing in.**
That is expected and the reason the flow works at all. Copy the **whole address** out of
the address bar and paste it into the field.

**"Not signed in" although you signed in.**
The stored sign-in was rejected by the provider (a revoked or expired refresh token). Sign
in again — the row tells you so instead of pretending to be connected.

**An OpenAI or Anthropic account delivers nothing.**
Those reports need an **organisation admin key**. A personal account without an
organisation cannot produce them at all; use the Claude subscription instead.

**Claude answers "too many requests".**
Raise the poll interval. The adapter identifies itself the way Claude's own tooling does
and backs off on its own, but a very short interval across several tools can still add up.

---

## Support

Questions, bugs and ideas: <https://github.com/krobipd/ioBroker.ai-usage/issues>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.12.1 (2026-09-07)

- Fixed: The last-update stamp of an account no longer moves forward while the provider is only throttling — it dates the values standing next to it, so you can see how old they really are
- Improved: Twenty-five more datapoints explain themselves in the object tree — what "today" means (the provider counts it in UTC), and why the cost totals can be lower than the accounts show

### 0.12.0 (2026-09-06)

- Fixed: An account that has not been signed in yet no longer reports a rejected sign-in — no warning, no notification, and the settings page keeps offering the sign-in button
- Fixed: An account whose API key is missing or unreadable is now shown as not delivering, instead of leaving its old values standing as though they were current
- Fixed: An answer arriving while the adapter shuts down can no longer mark an account as online again after the shutdown wrote it offline
- Fixed: A throttled account counts as delivering everywhere now — the connection icon and the "reachable accounts" total no longer contradict each other
- Fixed: A limit the provider reports as empty is no longer shown as 0 % used, and a Google quota without a value no longer reads as completely used up
- Fixed: A rejected ChatGPT sign-in now says so at once instead of leaving you waiting for a quarter of an hour, and a Google account keeps delivering when one route is unavailable
- Fixed: A Google account without an AI subscription says so, instead of asking for a sign-in that cannot change the answer
- New: Every limit window shows whether it is the limit currently in force — with Claude the provider states it, elsewhere it is the window that speaks for the account
- Improved: An account is reported as at its limit when the provider says the window is closed, not only when the percentage happens to reach 100
- Improved: A window's reset time is written to the minute, so a recording of it no longer gains an entry on every single query, only on real changes
- Improved: An account that is delivering again says so in the log, instead of leaving the warning about its outage standing as the last word on it
- Improved: The settings page no longer asks the adapter for every status every four seconds — the values now arrive on their own as they change
- Changed: "Balance sufficient for calls" now sits under credits, where it belongs; the datapoint at the old place is removed automatically
- Changed: Each account node shows the readable provider name instead of the internal one — "Claude Max (Claude)" instead of "Claude Max (claude-sub)"
- Fixed: A per-model folder is now named in your ioBroker language as well, instead of carrying the provider's bare model identifier as its only name
- New: The datapoints whose meaning is not obvious from their name now carry a short explanation in eleven languages, shown in the object tree

### 0.11.0 (2026-09-05)

- Fixed: Signing in from the instance settings works again — a leftover setting from an earlier version had silently closed the adapter's message channel, so none of the three flows reached it
- Fixed: A subscription whose stored sign-in was rejected no longer claims to be signed in — the row now offers the sign-in again instead of showing a green check next to an error
- Fixed: The status badge of an account no longer blanks out for a moment when a single status read is missed — a hiccup in the settings page is not an account without a status
- Fixed: A stored credential whose name sorts high in the alphabet is no longer missing from the account list in the instance settings
- Fixed: The settings page falls back to English for a browser language the adapter does not ship, instead of passing that language on unchecked
- Improved: All object names are now available in eleven languages instead of English only, and a renamed object reaches installations that already exist
- Improved: ChatGPT usage is read with the identity that endpoint expects, the way the Claude query already did — fewer rejected requests on that account
- Improved: Monthly cost reports can no longer be cut short in silence — a report that does not fit is reported in the log instead of producing a figure that is too low
- Changed: "Highest account utilisation" says what it always measured — the fullest limit window **or** the account's remaining budget

### 0.10.0 (2026-09-01)

- Fixed: The reset-time datapoint of a limit window no longer disappears and reappears — it stays and simply empties while no window is running
- Fixed: The settings page no longer shows the sign-in screen to a signed-in account, and its rows load without waiting for the credential storage scan
- Improved: Claude usage is read with far fewer rejections — the query now identifies itself the way the endpoint expects
- Changed: New Claude sign-ins request only the profile permission — the stored access can no longer create API keys or run models
- New: ChatGPT accounts show their purchasable limit-reset credits — how many are available and when the next one expires
- Improved: An unreadable provider answer is now reported as a service fault instead of a missing connection

### 0.9.3 (2026-08-27)

- Fixed: The first start after updating no longer leaves a warning in the log

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_