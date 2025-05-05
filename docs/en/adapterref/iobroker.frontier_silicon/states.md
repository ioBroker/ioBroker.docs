---
chapters: {"pages":{"en/adapterref/iobroker.frontier_silicon/README.md":{"title":{"en":"FSAPI Examples"},"content":"en/adapterref/iobroker.frontier_silicon/README.md"},"en/adapterref/iobroker.frontier_silicon/states.md":{"title":{"en":"States documentation"},"content":"en/adapterref/iobroker.frontier_silicon/states.md"}}}
---
# States documentation

While the adapter reads the device's settings ioBroker objects and states are created.
States can be read-only (`ro`) or read-write (`rw`) *ok, write-only for buttons is also possible*.

- audio

  Basic audio settings. No equalizer controls implemented yet.

  - maxVolume (`number, ro`)

    The maximum volume selectable

  - mute (`boolean, rw`)

    `true` if the device is muted, `false`otherwise

  - volume (`number, rw`)
  - control
    - volumeDown and volumeUp

    In-/ or decreases volume by 1

- device

  - friendlyName (`string, rw`)
  - power (`boolean, rw`)
  - radioId (`string, ro`)

    My guess is that this is the MAC of the device

  - version (`string, ro`)

    Software version

  - webfsapi (`string, ro`)

    The address of the API

- info

  - connection (`boolean, ro`)

    Connection indicator for the adapter

- media

  - state (`string, ro`)

    valid values are:
    - 0: “IDLE”
    - 1: “BUFFERING”
    - 2: “PLAYING”
    - 3: “PAUSED”
    - 4: “REBUFFERING”
    - 5: “ERROR”
    - 6: “STOPPED”
    - 7: “ERROR_POPUP”
  
  - control (`boolean, wo`)

    - 0: “STOP”
    - 1: “PLAY”
    - 2: “PAUSE”
    - 3: “NEXT”
    - 4: “PREVIOUS”

  Do not take the following names too seriously. The radio uses them differently in different modes.

  - album (`string, ro`)
  - artist (`string, ro`)
  - graphic (`string, ro`)

    Use this URL to get an album cover or a station's logo.

  - name (`string, ro`)
  - string (`string, ro`)
  - title (`string, ro`)

- modes

  - readPresets (`boolean, wo`)

    Re-reads all presets

  - selectPreset (`number, rw`)

    Used to get or select a preset.  
    Be warned that the adapter guesses as this value cannot be read from the API.

  - selected (`number, rw`)

    Indicates or selects the selected mode. Can also be selected via `modes.{number}.switchTo`

  - selectedLabel (`string, ro`)

    Indicates the label of the selected mode.

  - `{number}`

    - id (`string, ro`)

      The name of that mode

    - key (`number, ro`)

      The index of that mode. Equals `mode.{number}` from object tree and can be written into `modes.selected`.

    - selectable (`boolean, ro`)

      `true` if this mode can be manually selected.

    - streamable (`boolean, ro`)

      Only present on multi-room enabled devices. `true` if this mode can be used as source for several multi-room devices.
  
    - switchTo (`boolean, wo`)

      Selects that mode.

    - presets

      - available (`boolean, ro`)

        Indicates whether presets for this mode are available

      - `{number}`

        The index of that preset. Equals `mode.*.presets.{number}.key`.

        - key (`number, ro`)

          The index of that preset. Equals `mode.*.presets.{number}` from object tree and can be written into `modes.selectPreset`.

        - name (`string, ro`)

          The name of that preset

        - recall (`boolean, wo`)

          Selects that preset **and** the corresponding mode.

Please be aware that you can sometimes choose between "pushing a button" or "setting a value". Use what is more convenient for you.