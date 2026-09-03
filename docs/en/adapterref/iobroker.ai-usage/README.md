# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.ai-usage@main/admin/ai-usage.svg?v=4" width="48" align="top" /> ioBroker.ai-usage

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.ai-usage)](https://www.npmjs.com/package/iobroker.ai-usage) ![stable](https://iobroker.live/badges/ai-usage-stable.svg) ![Installations](https://iobroker.live/badges/ai-usage-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.ai-usage)](https://www.npmjs.com/package/iobroker.ai-usage)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.ai-usage/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.ai-usage/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Monitors usage, limits and costs of your AI accounts — the Claude, ChatGPT and Google
subscriptions plus OpenRouter, DeepSeek, OpenAI and Anthropic API accounts. Needs ioBroker Admin 8.

---

## Features

- **One node per account** — limit windows with percent and reset time, credits, costs and tokens, named the same way for every provider
- **Totals** — summed costs, the highest utilisation of any account, and one trigger for automations
- **Warn threshold per account** — one notification when an account crosses it
- **Three subscriptions** — Claude, ChatGPT and Google, signed in with your own account; the settings page walks you through each step
- **Central credentials** — API keys come from the admin's credential storage, shared with the admin AI assistant
- **Online status** — the connection icon you know from every device, plus the reason in plain text
- **Read-only** — the adapter only reads; it never calls or configures an AI service
- **Throttle-safe** — a minimum interval and automatic backoff keep the provider from locking your account

---

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Requirements

- Node.js >= 22
- ioBroker js-controller >= 7.2.2
- **ioBroker Admin >= 8.0.1** — the adapter uses the admin's central credential storage

---

## Configuration

The instance settings show one list of AI accounts. Switch on what you want to monitor.

| Account | How it is connected |
|---------|---------------------|
| **[Claude](https://claude.ai) subscription** | Open the sign-in page, log in, copy the code shown there and paste it back |
| **[ChatGPT](https://chatgpt.com) subscription** | The adapter shows a short code; type it on the OpenAI page it links to. The settings page notices by itself. Your Codex CLI session is not touched |
| **[Google Gemini](https://gemini.google.com) subscription** | Open the sign-in page and log in. Google sends the result to `localhost`, so **your browser shows an error page — that is expected**. Copy the **whole address** from the address bar and paste it back |
| **[OpenRouter](https://openrouter.ai), [DeepSeek](https://www.deepseek.com)** | Pick the stored key from the admin's credential storage |
| **[OpenAI](https://openai.com), [Anthropic](https://www.anthropic.com)** | Needs an **admin key** of your organisation, not the key the admin assistant uses. A personal account without an organisation cannot deliver these reports at all — use the Claude subscription instead |

The three subscription endpoints are **not officially documented**; they are the ones those
providers' own tools use and can change without notice. Claude was tested against a live
subscription, ChatGPT and Google could not be — please open an issue if something looks wrong.

| Option | Description | Default |
|--------|-------------|---------|
| **Warn at %** | Per account: one notification when a plan-wide limit window crosses this utilisation | 80 |
| **Poll interval** | How often each account is queried, 60–3600 seconds. The floor keeps the provider from throttling you | 300 |
| **Notifications** | One notification on threshold crossing or broken credentials | on |

---

## State Tree

```
ai-usage.0.
├── info.connection            — at least one account is delivering data (bool)
├── total.                     — totals across all accounts
│   ├── costs.today/month/…    — summed real money (same currency only)
│   ├── maxLimitPercent        — highest plan-wide utilisation of any account
│   ├── warningsActive         — accounts above their threshold
│   ├── limitReached           — a plan-wide window is full (automation trigger)
│   ├── accountsReachable      — accounts currently delivering data
│   └── accounts               — configured accounts
├── claude / chatgpt / gemini  — one node per subscription
│   ├── warning                — this account is above its warn threshold (bool)
│   ├── limitReached           — a plan-wide window of this account is full (bool)
│   ├── info.unreach           — account is not delivering (bool) — drives the connection icon
│   ├── info.error             — why there is no data; empty while all is well, "Unknown" while the adapter itself has nothing to report
│   ├── info.lastUpdate        — time of the last successful read
│   ├── limits.<window>.*      — percent + reset time (session, week, per model, …)
│   └── credits.*              — where the provider reports a balance
└── <name>-api                 — one node per key-based account
    ├── warning / limitReached — same triggers as above
    ├── info.*                 — same three status states as above
    ├── credits.* / costs.*    — granted budget and real money
    └── tokens.*               — token counters
```

Only what an account's source actually delivers is created — and once created, a datapoint stays:
the reset time simply empties while no window is running, and a window or model disappears from the
tree only when the provider stops reporting it entirely.

**The connection icon** sits next to each account, green while it delivers. A throttle keeps it
green — the last values stay valid while the adapter waits. A rejected sign-in or a broken service
switch it off at once, an unreachable service after three attempts, so a hiccup does not make it
flap. `info.error` names the cause whenever the provider gave one.

**Only plan-wide windows raise the warning** — your session and your week — and the message names
the window it came from. A window belonging to a single model keeps its own datapoints but stays
out of it: a model you never use can sit at 100 % forever, and an alarm that never clears is worse
than none. Google reports no plan-wide window at all, so there the fullest model window speaks for
the account and the warning names that model. To watch one model anyway, build the automation on
its own `limits.<window>.percent`.

---

## Troubleshooting

### An account delivers no data
Read `info.error` — it names the cause. A rejected sign-in means signing in again in the settings,
or that the key is not an organisation admin key. A service fault or a missing connection is
outside your instance and clears up by itself. The log states the same reason once.

`Unknown` there means the adapter itself has nothing to report — it is switched off, or it has just
started and has not asked yet.

### A subscription says "not signed in" although you just signed in
Save the settings first, then sign in — the row needs a saved account to attach the sign-in to.
After a successful sign-in the account is queried immediately, so values appear within seconds.

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-09-01)

- Fixed: The reset-time datapoint of a limit window no longer disappears and reappears — it stays and simply empties while no window is running
- Fixed: The settings page no longer shows the sign-in screen to a signed-in account, and its rows load without waiting for the credential storage scan
- Improved: Claude usage is read with far fewer rejections — the query now identifies itself the way the endpoint expects
- Changed: New Claude sign-ins request only the profile permission — the stored access can no longer create API keys or run models
- New: ChatGPT accounts show their purchasable limit-reset credits — how many are available and when the next one expires
- Improved: An unreadable provider answer is now reported as a service fault instead of a missing connection

### 0.9.3 (2026-08-27)

- Fixed: The first start after updating no longer leaves a warning in the log

### 0.9.2 (2026-08-27)

- Fixed: Stopping the instance now marks the accounts as offline on installations that were updated too, not only on fresh ones — the previous version left them showing as online

### 0.9.1 (2026-08-27)

- Changed: While an account has nothing to report — the adapter switched off, or started and not asked yet — the reason now reads "Unknown" instead of a sentence about the adapter

### 0.9.0 (2026-08-27)

- Fixed: Switching the instance off now shows every account as offline in the object tree and the settings, instead of leaving them green for as long as the adapter is not running
- Fixed: After a crash or a hard kill an account no longer keeps claiming to deliver data; every account starts as "not delivering" until its first answer arrives

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Support

- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.ai-usage/issues)

### Support Development

This adapter is free and open source. If you find it useful, consider buying me a coffee:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/krobipd)

---

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

*Developed with assistance from Claude.ai*
