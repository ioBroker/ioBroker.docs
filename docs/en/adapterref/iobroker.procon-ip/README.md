![Logo](https://github.com/ylabonte/ioBroker.procon-ip/blob/master/admin/procon-ip.png?raw=true)

# ioBroker.procon-ip

![Number of Installations](http://iobroker.live/badges/procon-ip-installed.svg)
![Current stable version](http://iobroker.live/badges/procon-ip-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)](https://www.npmjs.com/package/iobroker.procon-ip)

[![Test and Release](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip)
![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)

ioBroker adapter for the Pool Digital ProCon.IP swimming pool controller.
It is intended for integration with your ioBroker home automation, eg.
to build logic that involves other devices or to be paired with your favorite
voice assistant(s):

- You can use the [_cloud_](https://github.com/ioBroker/ioBroker.cloud) or
  [_IoT_](https://github.com/ioBroker/ioBroker.iot) adapter for Alexa
  (and also Google Home, I think) and
- [_yahka_](https://github.com/jensweigele/ioBroker.yahka) adapter as bridge to
  the Apple HomeKit to be reached by Siri or
- use the [_javascript_](https://github.com/ioBroker/ioBroker.javascript)
  adapter to build your own custom logic.

See the [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki) for more
information.

## What is the ProCon.IP pool controller?

The ProCon.IP pool control is a low budget network attached control unit for
home swimming pools. With its software switched relays, it can control
multiple pumps (for the pool filter and different dosage aspects) either
simply planned per time schedule or depending on a reading/value from one of
its many input channels for measurements (eg. i/o flow sensors, Dallas 1-Wire
thermometers, redox and pH electrodes). At least there is also the option to
switch these relays on demand, which makes them also applicable for switching
lights (or anything else you want) on/off.
Not all of its functionality is reachable via API. In fact there is one
documented API for reading (polling) values as CSV (`/GetState.csv`). In my
memories there was another one for switching the relays on/off and on with
timer. But I cannot find the second one anymore. So not even pretty, but
functional: The ProCon.IP has two native web interfaces, which can be
analyzed, to some kind of reverse engineer a given functionality (like
switching the relays).

For more information see the following link (sorry it's only in german;
haven't found an english documentation/information so far):

- [pooldigital.de webshop](https://pooldigital.de/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
- [pooldigital.de forum](https://www.poolsteuerung.de/)

**Just to be clear: I have nothing to do with the development, sellings,
marketing or support of the pool control unit. I just developed a solution
to integrate such with ioBroker to make my parent's home a bit smarter.**

## Details on the adapter

The adapter uses the `/GetState.csv` API of the ProCon.IP to poll its values
and another - not documented - API, that operates with bitwise commands to
switch the relays. The second one is also used by the original web interfaces
of the ProCon.IP. So there might be future firmware upgrades, that brake
compatibility with this adapter or at least it functionality of switching the
relays.

### Compatibility

For now the adapter has been tested and developed in combination with the
ProCon.IP firmware **revision 1.7.6.a**. But it should work with any prior
newer/upcoming firmware version.

## Development and participation

Feel free to contact me, if you wish to participate in development, translation
or documentation of this adapter.

Useful links for the approach will be

- the [TypeScript adapter template](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)
  I had started from and
- the [guide for adapter developers](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

### Local testing with dev-server

For hands-on testing against a real ProCon.IP controller, use
[`@iobroker/dev-server`](https://github.com/ioBroker/dev-server). It spins up a
throwaway local ioBroker instance (js-controller + admin UI) and runs this
adapter from your local build:

```bash
npm i -g @iobroker/dev-server   # once, globally
npm run dev:setup               # creates the local .dev-server/ profile (git-ignored)
npm run dev                     # builds, runs, admin UI at http://localhost:8081
```

Configure the instance with your controller URL in the admin UI. `npm run dev`
rebuilds and reloads the adapter on source changes.

## Donation

If you want to support this adapter or say thank you, you can:

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 144px !important;" >](https://www.buymeacoffee.com/ylabonte)

## Changelog
### 1.9.0 (2026-08-23)

- **DMX512 lighting support (opt-in).** Enable "DMX512 channels" in the adapter settings to expose the controller's 16 DMX channels as writable 0–255 dimmer states (`dmx.CH01` … `dmx.CH16`).
- **Self-healing object definitions.** Objects are now updated on upgrade (via `extendObject`, versioned), so improved roles/types reach existing installations — while your custom object names are preserved.
- **Fewer redundant events.** State values are written only when they actually change, and relay/dosage/timer commands are acknowledged immediately once the controller confirms them.
- Subscriptions are narrowed to the writable command states, and the boolean status flags now use the `indicator` role.
- Large internal refactor for testability: the monolithic adapter was split into a thin shell plus focused, unit-tested modules with a CI coverage gate. No functional change from this part.

### 1.8.1 (2026-08-22)

- **Fixed relay and DMX switching**, which had silently stopped working since 1.8.0's move to the ProCon.IP 2.x library: the controller accepted a write with `200 OK` but ignored it. Updated the library to 2.1.1, which sends the exact HTTP request format the controller's firmware requires. Reads were never affected.
- Resilient startup: the adapter now comes up and keeps polling until the controller becomes reachable, instead of staying inactive when the controller was offline at boot time.
- Fixed a corner case in the forced-update handling that could keep a relay flagged for updates.
- Aligned the admin configuration defaults with the adapter's effective runtime defaults and fixed a help-text typo.
- Maintenance: fixed the unit-test runner so tests actually execute, trimmed the CI test matrix, bumped CI actions (checkout/codeql), and pinned `@types/node` to the supported Node baseline.

### 1.8.0 (2026-08-22)

- Raised the minimum Node.js version to 22 (Node 20 is end-of-life).
- Updated the ProCon.IP library to 2.x, replacing its axios HTTP client with a leaner implementation and typed error handling.
- Updated all dependencies and shrank the security-advisory backlog.
- Internal cleanup: migrated off the deprecated `setStateAsync` API to `setState`.
- Maintenance: adopted npm Trusted Publishing (OIDC), modernized the CI workflow, grouped Dependabot updates, and applied the latest ioBroker repository-checker fixes.

### 1.7.0 (2025-09-20)

- Satisfy latest requirements demanded by the ioBroker-Bot.
- Raise minimum required js-controller version to 7.0.7.
- Raise minimum required admin version to 7.6.17.
- Remove calls to deprecated methods.
- Minor code cleanup.
- Dependency updates.

### 1.6.0 (2024-09-08)

- Fix versioning according to prior changes in requirements (should have happened with v1.5.5).
    - Raise minimum required js-controller version to 5.0.19.
    - Raise minimum required node version to 20.
- Dependency updates.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2019-2026 Yannic Labonte <yannic.labonte@gmail.com>
