# ioBroker.googlefindmydevice

ioBroker adapter to read tracker locations (e.g. Bluetooth item trackers) from
[Google Find Hub / Find My Device](https://www.google.com/android/find), Google's
device- and item-tracking service, and expose them as ioBroker states.

> **Supported devices:** Bluetooth item trackers only (e.g. Chipolo,
> Pebblebee - anything on Google's "Find My Device" network). Phones, tablets
> and other devices linked to the same Google account are **not** supported
> and will not show up as ioBroker objects - see
> [Why not phone/tablet locations too?](#why-not-phonetablet-locations-too)
> below for why. For those, keep using Google's own app or
> [google.com/android/find](https://www.google.com/android/find).

## Status: early development

Google does not offer an official API for Find Hub. This adapter is being built
on top of a reverse-engineered understanding of the protocol, cross-referenced
against [leonboe1/GoogleFindMyTools](https://github.com/leonboe1/GoogleFindMyTools)
(GPL-3.0). Because Find Hub tracker locations are end-to-end encrypted and
Google only delivers a fresh location asynchronously over its push
infrastructure, this is inherently more involved than a typical REST-API
adapter and may break if Google changes its internal protocol.

Currently implemented and confirmed working against real Google accounts:

- Reading a Google account's Bluetooth trackers (name, manufacturer, model,
  Fast Pair ID, pairing date, device type) and keeping them updated on a poll
  interval. Phones, tablets and other non-tracker devices linked to the
  account are deliberately left out - Google's API returns no usable data for
  them here, and phone location would need an entirely different, browser-
  session-based API this adapter doesn't use (see below).
- Decrypting real location reports once available (latitude, longitude,
  altitude, last-seen time, or a semantic location like "Home").
- Actively requesting a fresh location per tracker ("locate now"), with an
  enable/interval setting per device in the adapter configuration - see
  **Requesting locations** below.
- All setup happens inside the adapter's own configuration page in ioBroker
  Admin - see **Configuration** below. No separate program or browser
  automation is needed or used.

## Installation

Requirements: Node.js >= 22, js-controller >= 6.0.11, Admin >= 7.8.23.

1. In ioBroker Admin open **Adapters**, search for "Google Find My Device"
   and install it.
2. Create an instance and start it (play button). New instances start disabled, and the buttons of the
   configuration page only work while the instance is running. Until the setup is finished the instance only logs
   that it is not set up yet - that is expected. Then follow the [Configuration](#configuration) below.

## Configuration

The adapter needs a one-time setup, done entirely in its own configuration
page in ioBroker Admin. It has two parts, and the page always shows only the
part you still have to do. No password is ever entered into the adapter - you
only copy values out of your own browser, exactly like you'd copy an API key
from some other web dashboard.

### Part 1 of 2: connect your Google account

This takes about two minutes. The adapter needs access to the Google account
your trackers are linked to.

1. Click **Open Google login page** in the configuration page (or open
   `https://accounts.google.com/EmbeddedSetup` yourself). It opens in a new
   browser tab. Do **not** log in there yet.
2. In that tab open your browser's developer tools (`F12`) → "Application" tab
   → "Cookies" → `https://accounts.google.com`. The list is empty at first -
   that's expected, it fills in once you log in. Leave the developer tools
   open.

   **From now on the clock is ticking:** the value from step 4 only stays valid
   for a short time, so do steps 3, 4 and 5 one right after the other.

3. Log in on that page with the Google account your trackers are linked to
   (including two-factor confirmation if enabled). The page may look empty
   afterwards, or get stuck on something like "I agree" and not visibly
   proceed - that's normal (it isn't meant for humans), the token is already
   valid by then.
4. Switch back to the open developer tools and refresh the cookie list until
   a row named `oauth_token` appears:

   ![Finding oauth_token in DevTools' Application > Cookies panel](docs/step1-oauth-token.png)

5. Copy the complete value of that row, paste it into the field "Google login
   token (oauth_token)" of the configuration page and click **Connect**.

The adapter exchanges the value for a long-lived token right away. If Google
rejects it (usually because it expired), the page tells you immediately and
you paste a fresh value. On success the page switches to Part 2 on its own
and asks you to save the configuration. **Save now:** saving restarts the
instance, and it has to restart with the connected account before Part 2 can
be finished. From then on the adapter refreshes what it needs by itself.

Once an account is connected, the Part 1 instructions and the token field
disappear. If Google invalidates the session some day, or you want to use
another account, click **Connect a different account**. It clears the saved
login, the decryption key and the tracker table from the page and asks you to
save; afterwards you repeat Part 1.

**Why not automate this login?** An earlier version of this project tried
driving a real browser (Puppeteer) through the login. Google reliably
detects that and blocks it with "this browser or app may not be secure" -
confirmed by testing. The reliable fix for that is dedicated bot-detection-
evasion tooling, which this project deliberately does not use. Logging in
yourself, in your own normal browser, sidesteps the problem entirely since
there is nothing to detect.

### Part 2 of 2: unlock the locations

Google encrypts tracker locations end-to-end. Without this part the adapter
still lists your trackers by name, but it cannot show real coordinates. Part 2
unlocks that encryption once, again entirely in your own browser. There is no
time pressure here - you can do Part 2 in your own time. The configuration
page shows it as soon as Part 1 is done:

1. Click **Open Google's unlock page**. It opens in a new browser tab. (The
   same link is also written to the instance log, level "warn".)
2. In that tab open the developer tools (`F12`) and switch to the **Console**
   tab. Chrome blocks pasting into the console by default: type
   `allow pasting` manually and press Enter.
3. Back in the configuration page click **Show the script for the console**,
   copy the script with the copy button (it is also in the instance log), paste
   it into the console and press Enter.
4. Do what Google asks on that page (e.g. entering a phone's screen-lock PIN to
   confirm it's really you) and click "Weiter"/"Next". A text field then
   appears at the top of that page:

   ![Console tab with the pasted script, and the PIN/confirmation step of the encryption-unlock page](docs/step2-console.png)

5. Copy the complete content of that text field, paste it into the field
   "Result from the browser console (JSON)" of the configuration page and
   click **Verify and unlock**. A wrong or incomplete paste is reported in the
   page right away. On success the page asks you to save the configuration,
   and Part 2 disappears. Saving restarts the instance once more; the first
   locations appear after the next poll.

The screenshots of both parts are also shown in the configuration page; click
one to enlarge it.

### Poll interval

How often tracker names and metadata are refreshed, in minutes (1 to 1440,
default 15). This does not contact the trackers themselves - see below for
that.

### Requesting locations

Google only ever hands out a location report if something actually asked the
tracker for one recently - listing devices alone almost never returns
coordinates. Getting a fresh one means actively pinging the tracker over
Bluetooth (via whichever nearby Android phone hears it), which **noticeably
uses that tracker's battery**. Because of that, this adapter does **not**
request locations for any tracker automatically.

Once Part 2 (location decryption) is set up, a table appears in the adapter
configuration listing every discovered tracker with two settings each:

- **Request location** - off by default for every newly discovered tracker.
  Turn it on for the trackers you actually want live coordinates for.
- **Interval (minutes)** - how often to request a fresh location for that
  tracker while it's enabled (5 minutes minimum, so it's still possible to
  request one relatively often for something like an actively-moving bike,
  without hammering it constantly).

Device names, manufacturer/model info and pairing date are always kept
up to date on the regular poll interval regardless of these settings, since
reading that doesn't touch the tracker itself.

## Usage

### Objects

Every tracker is a `device` object directly below the instance,
`googlefindmydevice.0.<id>`, named like the tracker in Find Hub. `<id>` is
Google's identifier of the tracker with unsafe characters replaced by `_`.

| State | Type | Description |
| --- | --- | --- |
| `<id>.name` | string | Name of the tracker |
| `<id>.manufacturer` | string | Manufacturer |
| `<id>.model` | string | Model |
| `<id>.fastPairModelId` | string | Fast Pair model ID |
| `<id>.deviceType` | string | Device type |
| `<id>.pairDate` | number | Pairing date (timestamp in ms) |
| `<id>.sharedWithCount` | number | Number of people the tracker is shared with |
| `<id>.latitude` / `<id>.longitude` | number | Coordinates of the last GPS report |
| `<id>.altitude` | number | Altitude in metres |
| `<id>.accuracy` | number | Accuracy in metres |
| `<id>.lastSeen` | number | Time of the last report (timestamp in ms) |
| `<id>.semanticLocation` | string | Named place such as "Home", if Google reports one instead of coordinates |
| `<id>.isOwnReport` | boolean | `true` if the tracker reported directly, `false` if a stranger's device nearby relayed it |
| `<id>.mapsLink` | string | Google Maps link to the last GPS position |
| `info.connection` | boolean | `true` while the last poll succeeded |

Only devices that Google lists with a tracker identifier appear. Phones and tablets
have none and are left out on purpose. Some headphones and earbuds are listed
without one as well (for example when they only report the last location of
their phone connection instead of being part of the Find Hub network) and do
not appear either. If a device you expect is missing, set the instance's log
level to *debug*: every skipped device is logged with its manufacturer, model
and type (without its name), which helps to tell why it was left out.

A report is either a GPS position or a semantic location. For a semantic
report `accuracy`, `isOwnReport` and `mapsLink` are cleared so they never
describe an older position; `lastSeen` is always updated.

### Upgrading from 0.0.7 or older

Earlier versions placed trackers in a `devices` folder
(`googlefindmydevice.0.devices.<id>.*`). The IDs no longer contain `devices`.
The old folder is removed automatically on the first start; update scripts,
visualizations, aliases and history settings that still use the old IDs.

## Why not phone/tablet locations too?

Investigated and deliberately not implemented. Phones and tablets linked to
the account use a completely different Google system for location than
Bluetooth trackers: the same web app as
[google.com/android/find](https://www.google.com/android/find), authenticated
with a full Google **browser session** (cookies) rather than the narrowly-
scoped Android Device Manager token this adapter uses for everything else,
talking to an undocumented internal RPC ("batchexecute") and push channel
("Punctual") that the reference project this adapter is based on doesn't
cover either. Storing a full browser session in the adapter config would be a
meaningfully bigger security exposure than the current setup (it can do
anything your Google account can, not just look up device locations), for a
feature that could not be fully confirmed working even with live network
capture. Bluetooth tracker locations (the actual point of this adapter) are
unaffected by this.

## Support

- Project website: [iobrokergoogle.ne-xt.de](https://iobrokergoogle.ne-xt.de/)
- Bugs and feature requests:
  [GitHub issues](https://github.com/beabel/ioBroker.googlefindmydevice/issues)
- Questions and feedback:
  [ioBroker forum thread](https://forum.iobroker.net/topic/85388/test-adapter-googlefindmydevice-v0.0.x-github)

## Disclaimer

This project is not affiliated with, endorsed by, or supported by Google.
"Find Hub" and "Find My Device" are trademarks of Google LLC. Use at your own
risk; Google's internal APIs are undocumented and may change without notice.

## Attribution

The end-to-end-encryption routines in this adapter are a Node.js port of the
algorithm implemented in
[leonboe1/GoogleFindMyTools](https://github.com/leonboe1/GoogleFindMyTools),
an independently reverse-engineered client for Google's Find Hub / Find My
Device protocol, licensed GPL-3.0 by Leon Böttger. The GCM-checkin and
account-login exchange re-implement the relevant parts of the established
[gpsoauth](https://github.com/simon-weber/gpsoauth) Python library (MIT,
Simon Weber). The FCM/MCS push-notification client (used to receive the
asynchronous answer to a "locate now" request) re-implements the relevant
parts of the [firebase-messaging](https://github.com/sdb9696/firebase-messaging)
Python library (MIT, (c) 2017 Matthieu Lemoine, (c) 2023 Steven Beth) and the
"aesgcm" Web Push decryption scheme from
[encrypted-content-encoding](https://github.com/martinthomson/encrypted-content-encoding)
(MIT, Martin Thomson).

## Changelog

### 0.1.6 (2026-11-01)

* (beabel) **NEW**: headphones, speakers and other Fast Pair devices that carry a Find Hub key are now listed and located like trackers (experimental; Google only returns a location if one of its devices has seen them recently).
* (beabel) **FIXED**: a device that was paired again (and so got a new id) is no longer asked for its location under the old id every time; the log says once that its row can be removed from the device table.

### 0.1.5 (2026-11-01)

* (beabel) **ENHANCED**: the adapter remembers which push messages it already received, so Google does not deliver them again at every start.
* (beabel) **CHANGED**: removed the optional BLE identifier (EID) states of version 0.1.4 again; their values did not match what a tracker really broadcasts. States left over from 0.1.4 are deleted at the start.
* (beabel) **ENHANCED**: the debug log describes the structure of skipped devices (such as headphones) in more detail, field numbers and sizes only, to prepare support for them.

### 0.1.4 (2026-10-31)

* (beabel) **NEW**: optional BLE identifier (EID) states for trackers (off by default, switch on per tracker in the device table).
* (beabel) **FIXED**: push messages are now read correctly even if Google adds extra parameters to the encryption headers; if a push message still cannot be decrypted, the debug log says why (sizes and parameter names only).
* (beabel) **ENHANCED**: the debug log shows the structure of the identifier block of every device (field numbers and sizes only, never names or ids) to help support devices such as headphones.

### 0.1.3 (2026-10-31)

* (beabel) **ENHANCED**: the debug log now lists every device that is left out because Google gives it no tracker
  identifier (manufacturer, model and type, never its name), and the README explains which devices appear.
* (beabel) **ENHANCED**: the README says explicitly that saving after "Connect" restarts the instance before Part 2.
* (beabel) **TESTING**: updated `@iobroker/testing` to 6.3.1.

### 0.1.2 (2026-10-03)

* (beabel) **ENHANCED**: admin translations moved to the short i18n format (`admin/i18n/<lang>.json`); updated
  `@iobroker/testing` to 6.3.0.
* (beabel) **ENHANCED**: the Google account's email address is no longer written to the log.

Older changelog entries: CHANGELOG_OLD.md

## License

Because this adapter is a derivative of the GPL-3.0 GoogleFindMyTools work
credited above, it is licensed under the **GNU General Public License v3.0**
— see the full text in [LICENSE](LICENSE).

Copyright (c) 2026 Maik Ries <iobroker@ne-xt.de>