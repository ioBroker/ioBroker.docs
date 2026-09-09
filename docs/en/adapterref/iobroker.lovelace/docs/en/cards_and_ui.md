---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
---
![Logo](../../admin/lovelace.png)
# Custom cards, themes & UI tips

* [Custom cards](#custom-cards)
* [Own images](#own-images)
* [Themes](#themes)
* [Icons](#icons)
* [UI tips](#ui-tips)

## Custom cards
Lovelace can be extended with self-made cards (`custom cards`). They come as a JavaScript file (*.js) that must be uploaded via the lovelace configuration (`Files` tab in Admin, or drag & drop in the instance settings).

To upload from the command line where iobroker is installed:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

After a restart of the lovelace adapter all files from the `cards` directory are included automatically.

If a card needs additional resources (css or js files), recreate the folder structure in the `cards` directory and place those files there. The adapter detects URLs starting with `/hacsfiles/` and reroutes them to the `cards` directory. So if you see `404` errors for URLs including `/hacsfiles/`, adjust the folder structure accordingly. For example, a card needing `/hacsfiles/folder1/folder2/file3.json` must be placed at `/lovelace.0/cards/folder1/folder2/file3.json`.

Often custom cards are stored on GitHub as sources and must be compiled before use. Check the `Releases` menu on GitHub for compiled files, e.g. [mini-graph-card releases](https://github.com/kalkih/mini-graph-card/releases) (look for `mini-graph-card-bundle.js`).

### Tested cards
The following cards were tested by the developer or the community and work. In general most cards should work; problems are often an incompatibility between the used Lovelace version and the card, so try to use the newest card versions.

* **[Clockwork Card](https://github.com/barleybobs/ha-clockwork-card)** — a working fork (the original is no longer maintained). Configuration: see [clock](#clock). There is no time sensor; the time comes from the browser, so configure it without `entity_id` and with time zones.
* **[Mini Media Player](https://github.com/kalkih/mini-media-player)** — a very configurable media player that also supports [text-to-speech and shortcut buttons](#mini-media-card-with-tts-and-shortcuts).
* **[Mini Graph Card](https://github.com/kalkih/mini-graph-card)** — a very configurable card for sensor data, showing several entities as graphs or bar charts.

## Own images
Custom images (e.g. for a background) can be uploaded via the same dialog as custom cards. Use them like this in the lovelace configuration:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

or

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

Read more about backgrounds in lovelace [here](https://www.home-assistant.io/lovelace/views/#background).

## Themes
Themes can be defined in the configuration dialog of ioBroker. With the 2026 frontend update the theme handling changed — see the [theme migration notes](/#/docs/adapterref/iobroker.lovelace/docs/en/theme_migration.md). Paste something like:

```yaml
midnight:
  # Main colors
  primary-color: '#5294E2'
  accent-color: '#E45E65'
  dark-primary-color: 'var(--accent-color)'
  light-primary-color: 'var(--accent-color)'
  # Text colors
  primary-text-color: '#FFFFFF'
  secondary-text-color: '#5294E2'
  disabled-text-color: '#7F848E'
  # Background colors
  primary-background-color: '#383C45'
  secondary-background-color: '#383C45'
  divider-color: 'rgba(0, 0, 0, .12)'
  # Paper card
  paper-card-background-color: '#434954'
  paper-item-icon-active-color: '#F9C536'
```

(A full example is the [midnight theme](https://community.home-assistant.io/t/midnight-theme/28598/2). Note that many `paper-*` variables of the old theme system are deprecated — see the migration notes.)

## Icons
Use icons in the form `mdi:NAME`, like `mdi:play-network`. Names can be found here: https://pictogrammers.com/library/mdi/

## UI tips

### Customizing the title bar
The title bar can be adjusted with the [card-mod](https://github.com/thomasloven/lovelace-card-mod) extension. Add the following YAML to your own theme:

Remove the bell:
```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
```

Remove search and assist:
```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
    ha-icon-button[slot="actionItems"] { display: none; }
```

Remove search, assist and the dot menu:
```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
    ha-icon-button[slot] { display: none; }
```

Hide the title bar completely: set the state `lovelace.0.instances.hideHeader` to `true` (after a reload it removes the header on all browsers). The state also exists per instance, so it can be set per browser.

#### A complete theme that looks like the default, but without the bell
The snippets above only work inside a theme. If you do not want to build one, here is a small, self-contained theme (`no-bell-icon`) that roughly matches the default dark look and removes the bell. Paste it into the theme configuration, then select it (e.g. via the state `lovelace.0.instances.set_theme`). The theme only becomes selectable after the data point exists and the adapter has restarted.

```yaml
no-bell-icon:
  primary-background-color: "#111111"
  card-background-color: "#1c1c1c"
  secondary-background-color: "#282828"
  primary-text-color: "#e1e1e1"
  secondary-text-color: "#9b9b9b"
  disabled-text-color: "#6f6f6f"
  divider-color: "rgba(225, 225, 225, .12)"

  input-label-ink-color: var(--primary-text-color)
  ha-color-form-background: var(--card-background-color)
  ha-color-form-background-hover: var(--light-primary-color)
  ha-color-form-background-disabled: var(--primary-background-color)
  wa-color-neutral-fill-normal: var(--ha-color-on-primary-normal)

  # Hide the bell icon in the toolbar. Requires card-mod.
  # https://github.com/thomasloven/lovelace-card-mod
  card-mod-theme: no-bell-icon
  card-mod-root-yaml: |
    .: |
      mwc-icon-button[label] {
        display: none;
      }
```

### Mini Media card with TTS and shortcuts
The Mini Media card supports text-to-speech (TTS) input for smart speakers (Echo, Google Home, …) and shortcut buttons for songs / stations. TTS uses a service ioBroker does not support out of the box, so an ioBroker-specific configuration is needed:

```yaml
tts:
  platform: iobroker
  entity_id: input_text.multimedia_Alexa_Arbeitszimmer_Commands_speak
```

`platform` must be `iobroker`. `entity_id` must point to an existing text `entity` that is then filled with the text — so any ioBroker text-to-speech system can be used.

Shortcut buttons can call any service; for ioBroker something like this works well:

```yaml
shortcuts:
  columns: 4
  buttons:
    - icon: 'mdi:pirate'
      type: service
      id: input_text.set_value
      data:
        entity_id: input_text.multimedia_Alexa_Arbeitszimmer_Player_playSongAmazon
        value: Piraten von Karsten Glück
    - icon: 'mdi:cake'
      type: service
      id: input_text.set_value
      data:
        entity_id: input_text.multimedia_Alexa_Arbeitszimmer_Player_playSongAmazon
        value: Wie schön dass du geboren bist
```

`input_text.set_value` writes a text into a data point; `entity_id` is the text entity and `value` the text to write.

![mini media player with TTS and shortcuts](../de/media/mini-media-player.JPG)

### Clock
Embed the time e.g. with the [Clockwork Card](#tested-cards). There is no time sensor; the browser provides the time:

```yaml
type: 'custom:clockwork-card'
title: Time
locale: en-gb
other_time:
  - Europe/Berlin
```

To hide the block on the right, hide it together with the `card-mod` card:

```yaml
type: 'custom:clockwork-card'
title: Time
style: |
    .other_clocks { display: none }
locale: en-gb
other_time:
    - Europe/Berlin
```

### Markdown bindings
The Markdown card can be used with bindings like in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects).

E.g. the text `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` produces `Admin adapter is alive` in a markdown card. In addition, Home Assistant templates (`{{ states("…") }}`, `is_state`, `state_attr`, `now()`, …) can be used.