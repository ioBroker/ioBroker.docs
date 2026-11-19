---
title: Adapter documentation
lastChanged: 19.11.2026
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdocs.md
---
# Adapter documentation: README, doc/ and common.docs

An adapter carries its documentation in three places, each written for a different reader:

| File                            | Reader                                        | Language                  |
|---------------------------------|-----------------------------------------------|---------------------------|
| `README.md`                     | everyone who finds the adapter on GitHub, npm or iobroker.net | English only |
| `doc/en/…`, `doc/de/…`          | users who install and configure the adapter   | one folder per language   |
| `DEVELOPMENT.md`                | people who want to build or change the adapter | English                  |

`common.docs` in `io-package.json` tells ioBroker where the user documentation is.

## 1. README.md

### Must

- **English only.** No German paragraphs, no bilingual sections, no "Deutsche Beschreibung weiter unten".
  Translations belong in `doc/<lang>/` (see section 2). The [repository checker][checker] reports a
  README that is not English (`W6016`).
- **Say what the adapter does** in the first lines: which device, service or protocol it connects and what
  the user gets from it.
- **Link the manufacturer or the device**, if there is one: product page, API documentation, the
  service's website. A reader must be able to tell which device is meant without guessing.
- **Long enough to be used.** A user must be able to install, configure and use the adapter without
  reading the code: requirements, the settings in the admin dialog, the states the adapter creates,
  known limitations. There is no fixed word count - the review judges this, also with the help of AI.
  A README made of a title, one sentence, the changelog and the license is not enough.
- **No instructions for development.** Building, tests, dev-server, debugging, release process and
  "how to contribute" go into `DEVELOPMENT.md`. The README links it with one line.
- **No installation via npm or GitHub.** Adapters are installed from the admin. Instructions like
  `npm install iobroker.xyz` or "install from GitHub URL" are reported by the checker (`E6012`, `E6013`).
- **`## Changelog` and `## License`** as the last two sections, the license being the very last one
  (`E6003`, `E6004`, `W6021`).
- If the adapter uses Sentry: the Sentry notice near the top (`W6023`).

### Skeleton

```markdown
![Logo](admin/myadapter.png)
# ioBroker.myadapter

[![NPM version](https://img.shields.io/npm/v/iobroker.myadapter.svg)](https://www.npmjs.com/package/iobroker.myadapter)
...

## myadapter adapter for ioBroker

Connects ioBroker to the XY-1000 heat pump by [Manufacturer](https://www.manufacturer.example/xy-1000)
over its local Modbus TCP interface. Reads temperatures, power and operating mode and lets you
change the target temperature and the mode.

## Requirements
- XY-1000 with firmware 2.4 or newer, Modbus TCP enabled in the device menu
- The device must be reachable from the ioBroker host on port 502

## Configuration
| Setting  | Description                                   | Default |
|----------|-----------------------------------------------|---------|
| IP       | Address of the heat pump                      | -       |
| Interval | Polling interval in seconds                   | 30      |

## States
| State               | Writable | Description                 |
|---------------------|:--------:|-----------------------------|
| `info.connection`   |    -     | Connected to the device     |
| `control.mode`      |    ✓     | 0 = off, 1 = heat, 2 = cool |

## Known limitations
- Only one device per instance.

## Documentation
- [User guide (English)](doc/en/README.md)
- [Benutzerhandbuch (Deutsch)](doc/de/README.md)

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2026-11-19)
- (author) initial release

## License
MIT License

Copyright (c) 2026 Author Name
...
```

## 2. User documentation in doc/en and doc/de

The README is the business card of the adapter. The real user guide lives in its own folder, one
sub-folder per language:

```
doc/
  en/
    README.md        ← main page of the guide
    devices.md       ← further pages, linked from README.md
    media/           ← screenshots for this language
  de/
    README.md
    devices.md
    media/
```

What belongs in there: step-by-step setup with screenshots, every setting explained, the object tree
and what each state means, examples (Blockly, JavaScript, vis), FAQ and troubleshooting. Further
pages are linked from `README.md` of the same folder; iobroker.net follows these links and shows the
pages as chapters of the adapter.

**Why doc/de matters.** Without German documentation, the German page of the adapter on iobroker.net
is a machine translation of the English README. A German guide written (or at least read) by a
person is far better - and a large part of the ioBroker users read German.

**README_de.md is only a workaround.** A German copy of the README in the repository root

- is not shown on iobroker.net unless it is declared in `common.docs`,
- duplicates changelog and license, which then drift apart from the README,
- leaves no room for more than one page or for screenshots per language.

Move its content to `doc/de/README.md` and remove changelog and license from it - iobroker.net takes
both from the English README automatically.

*Note*: Some adapters use `docs/` instead of `doc/`. Both work, as long as `common.docs` points to the
right files.

## 3. common.docs in io-package.json

`common.docs` lists the user documentation per language. The keys are language codes, the values are
paths **relative to the repository root**:

```json
{
  "common": {
    "docs": {
      "en": "doc/en/README.md",
      "de": "doc/de/README.md"
    }
  }
}
```

Several pages per language are written as an array:

```json
"docs": {
  "en": ["doc/en/README.md", "doc/en/devices.md"],
  "de": ["doc/de/README.md", "doc/de/devices.md"]
}
```

Rules:

- **`en` is mandatory** as soon as `docs` exists (the [io-package.json schema][schema] requires it). If
  there is no separate English guide, `"en": "README.md"` is fine.
- Allowed keys: `en`, `de`, `ru`, `pt`, `nl`, `fr`, `it`, `es`, `pl`, `uk`, `zh-cn`.
- Paths without leading slash, no URLs. Upper and lower case must match the file on GitHub exactly.
- The **first entry** of a language becomes the adapter page on iobroker.net in that language.
  Pages linked from it in the same folder are picked up automatically; list them anyway if they are
  not linked.
- Changelog, license and badges always come from `README.md`. Do not repeat them in `doc/`.

## Checklist for the review

- [ ] `README.md` is English only
- [ ] `README.md` says what the adapter does and links the manufacturer / device / service (if applicable)
- [ ] `README.md` is detailed enough to install, configure and use the adapter
- [ ] No development or contribution instructions in `README.md` - they are in `DEVELOPMENT.md`
- [ ] User guide in `doc/en/` and `doc/de/` (instead of `README_de.md` in the root)
- [ ] `common.docs` in `io-package.json` points to these files, `en` is present

See also: [Publishing an adapter](/docs/dev/adapterpublish.md), [io-package.json](/docs/dev/iopackage.md),
[Style guide for adapter documentation](/docs/dev/adapterdocstyleguide.md).

[checker]: https://adapter-check.iobroker.in/
[schema]: https://github.com/ioBroker/ioBroker.js-controller/blob/master/schemas/io-package.json
