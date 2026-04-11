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

  - currentNavIndex (`number, ro`)

    Indicates the index into the current nav list.  
    The complete nav list is read in chunks of 25 items.
    The native part of this object also contains some other properties of the current navigation like  
    all nav names, the number of items in the current complete nav list as well as the type and subtype of the current items the index points to.
      nav types:
        "0": "Directory",
        "1": "PlayableItem",
        "2": "SearchDirectory",
        "3": "Unknown",
        "4": "FormItem",
        "5": "MessageItem",
        "6": "AmazonLogin"
      nav subtypes:
        "0": "None",
        "1": "Station",
        "2": "Podcast",
        "3": "Track",
        "4": "Text",
        "5": "Password",
        "6": "Options",
        "7": "Submit",
        "8": "Button",
        "9": "Disabled"

  - currentNavKey (`number, rw`)

    Indicates or sets the selected key of the complete nav list.

  - currentNavList (`string, ro`)

    A JSON-formatted string of the currently selected chunk of the nav list.
    It is a key/value array containing all the properties of each item like f.i.  
    {"key":"116","name":"1LIVE diGGi ","type":"1","subtype":"1","graphicuri":"","artist":"","contextmenu":"0"}  
    It can be used by a js script to dynamically generate a JSON object or HTML page for use in a media player widget.

  - currentNavName (`string, ro`)

    The name of the currently selected item of the nav list, e.g. directory or playable item.

  - navigationBack (`boolean, wo`)

    navigate back one level in the navigation tree

  - navigationDown (`boolean, wo`)

    navigate down within the current level of the navigation tree

  - navigationUp (`boolean, wo`)

    navigate up within the current level of the navigation tree

  - navigationSelect (`boolean, wo`)

    selects the currently indexed item. This opens the next level in the navigation tree if the selected item is a directory. If the selected item is a playable item, it will automatically start playing.

  - navigationHome (`boolean, wo`)

    navigate back to the top level of the navigation tree

  - navigationSearch (`string, rw`)

    allows to enter a search term which is sent to the device. However, the device will only start searching if navigationSelect is pressed and the selected item is of type SearchDirectory. The navigation search term should be entered briefly before navigationSelect is pressed.

  - presetDown (`boolean, wo`)

    navigate down within the presets of the current mode. The next station or track automatically starts  
    playing.

  - presetUp (`boolean, wo`)

    navigate up within the presets of the current mode. The next station or track automatically starts  
    playing.

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

        - set (`boolean, wo`)

          Sets that preset to the currently playing radio station or track
          If you try setting a preset of a mode X while a radio station of a different mode is playing,  
          you will get a warning.