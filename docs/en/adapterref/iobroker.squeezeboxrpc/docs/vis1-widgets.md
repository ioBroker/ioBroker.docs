---
chapters: {"pages":{"en/adapterref/iobroker.squeezeboxrpc/README.md":{"title":{"en":"ioBroker Logitech/Lyrion Squeezebox Adapter over JSON/RPC-Protocol"},"content":"en/adapterref/iobroker.squeezeboxrpc/README.md"},"en/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md":{"title":{"en":"SqueezeboxRPC widgets for VIS 1"},"content":"en/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md"},"en/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md":{"title":{"en":"SqueezeboxRPC widgets for VIS 2"},"content":"en/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md"}}}
---
# SqueezeboxRPC widgets for VIS 1

This document describes every VIS 1 widget shipped with the adapter.
Add a **Players** widget first, configure its adapter instance, and reference
that widget from the other controls and displays.

## Table of contents

- [Players](#players)
- [Favorites](#favorites)
- [Play button](#play-button)
- [Forward button](#forward-button)
- [Rewind button](#rewind-button)
- [Repeat button](#repeat-button)
- [Shuffle button](#shuffle-button)
- [Volume bar](#volume-bar)
- [SyncGroup](#syncgroup)
- [Playtime bar](#playtime-bar)
- [String](#string)
- [Number](#number)
- [DateTime](#datetime)
- [Image](#image)
- [Playlist](#playlist)
- [PlaylistDetail](#playlistdetail)
- [Browser](#browser)

## Players

![Players widget](../widgets/squeezeboxrpc/img/players.png)

Selects the active LMS player and acts as the connection point for
the other SqueezeboxRPC widgets.

| Setting                              | Default               | Description                                                                              |
| ------------------------------------ | --------------------- | ---------------------------------------------------------------------------------------- |
| SqueezeboxRPC instance (`ainstance`) | —                     | Adapter instance whose players are loaded.                                               |
| Widget format (`formattype`)         | `formatbutton`        | Displays player buttons or a compact select field. SyncGroup requires the button format. |
| View index helper (`viewindex`)      | —                     | VIS 1 helper used to address configured player entries.                                  |
| Wrap CamelCase (`wrapcamelcase`)     | On                    | Allows long CamelCase player labels to wrap.                                             |
| Edit-mode helper (`editmodehelper`)  | On                    | Shows indexes in the editor to simplify individual configuration.                        |
| Image width / height                 | `50` / `50` px        | Size of every player button.                                                             |
| Opacity                              | `0.5`                 | Opacity used for inactive buttons.                                                       |
| Border width / style                 | `2px` / `solid`       | Button border dimensions and CSS border style.                                           |
| Normal / active border color         | `#2e2e2e` / `#87ceeb` | Border colors for inactive and selected players.                                         |
| Border radius                        | `5px`                 | Corner radius.                                                                           |
| Background color                     | `#000000`             | Button background and generated text-image background.                                   |
| Button margin                        | `0px`                 | Space around each player button.                                                         |
| Individual image / text              | —                     | Per-index replacement image and label.                                                   |

The selected player is shared with referenced widgets. If no custom image
is configured, the player name is rendered as a text image.

## Favorites

![Favorites widget](../widgets/squeezeboxrpc/img/favorites.png)

Displays the favorites supplied by LMS and starts a favorite on the selected player.

| Setting                             | Default               | Description                                                               |
| ----------------------------------- | --------------------- | ------------------------------------------------------------------------- |
| Players widget (`widgetPlayer`)     | —                     | Reference to the Players widget that supplies instance and active player. |
| View index (`viewindex`)            | —                     | VIS 1 helper for assigning per-favorite options.                          |
| Edit-mode helper (`editmodehelper`) | On                    | Shows favorite indexes while editing.                                     |
| Image width / height                | `50` / `50` px        | Size of each favorite button.                                             |
| Opacity                             | `0.5`                 | Opacity of inactive favorite buttons.                                     |
| Border width / style                | `2px` / `solid`       | Border dimensions and CSS border style.                                   |
| Normal / active border color        | `#2e2e2e` / `#87ceeb` | Border colors for normal and active favorites.                            |
| Border radius                       | `5px`                 | Corner radius.                                                            |
| Background color                    | `#000000`             | Button background.                                                        |
| Button margin                       | `0px`                 | Space around favorite buttons.                                            |
| Individual image / text             | —                     | Per-index replacement image and label.                                    |

The content stays within the widget and becomes vertically scrollable
when necessary. A narrow scrollbar is used.

## Play button

<img src="../widgets/squeezeboxrpc/img/play.svg" width="128px" alt="Play button">

Controls play, pause and stop for the active player and reflects its current state.

| Setting                   | Default      | Description                             |
| ------------------------- | ------------ | --------------------------------------- |
| Players widget            | —            | Source of the active player.            |
| Pause / play / stop image | Built-in SVG | Optional image for each playback state. |
| SVG fill / stroke color   | White        | Colors of the built-in icon.            |
| SVG stroke width          | `0.3`        | Stroke width of the built-in icon.      |

Custom images replace the built-in SVG for the corresponding state.

## Forward button

<img src="../widgets/squeezeboxrpc/img/fwd.svg" width="128px" alt="Forward button">

Sends the LMS jump-forward button command to the active player.

| Setting                 | Default      | Description                        |
| ----------------------- | ------------ | ---------------------------------- |
| Players widget          | —            | Source of the active player.       |
| Forward image           | Built-in SVG | Optional custom button image.      |
| SVG fill / stroke color | White        | Colors of the built-in icon.       |
| SVG stroke width        | `0.3`        | Stroke width of the built-in icon. |

## Rewind button

<img src="../widgets/squeezeboxrpc/img/rew.svg" width="128px" alt="Rewind button">

Sends the LMS jump-back command to the active player.

| Setting                 | Default      | Description                        |
| ----------------------- | ------------ | ---------------------------------- |
| Players widget          | —            | Source of the active player.       |
| Rewind image            | Built-in SVG | Optional custom button image.      |
| SVG fill / stroke color | White        | Colors of the built-in icon.       |
| SVG stroke width        | `0.3`        | Stroke width of the built-in icon. |

## Repeat button

<img src="../widgets/squeezeboxrpc/img/repeat0.svg" width="128px" alt="Repeat button">

Displays and changes `PlaylistRepeat` for the active player.

| Setting                 | Default      | Description                                               |
| ----------------------- | ------------ | --------------------------------------------------------- |
| Players widget          | —            | Source of the active player.                              |
| Repeat 0 / 1 / 2 image  | Built-in SVG | Optional image for off, repeat-one and repeat-all states. |
| SVG fill / stroke color | White        | Colors of the built-in icon.                              |
| SVG stroke width        | `0.3`        | Stroke width of the built-in icon.                        |

Clicks cycle `0 → 1 → 2 → 0`. State `0` shows repeat disabled, state `1` uses
the repeat-one icon, and state `2` uses the enabled repeat icon.
If no state-2 image is configured, the state-0 custom image or
built-in icon is reused.

## Shuffle button

<img
src="../widgets/squeezeboxrpc/img/shuffle0.svg"
width="128px"
alt="Shuffle button"

>

Displays and changes `PlaylistShuffle` for the active player.

| Setting                 | Default      | Description                                      |
| ----------------------- | ------------ | ------------------------------------------------ |
| Players widget          | —            | Source of the active player.                     |
| Shuffle 0 / 1 / 2 image | Built-in SVG | Optional images for the three LMS shuffle modes. |
| SVG fill / stroke color | White        | Colors of the built-in icon.                     |
| SVG stroke width        | `0.3`        | Stroke width of the built-in icon.               |

Each click advances to the next shuffle mode and writes the new value to `PlaylistShuffle`.

## Volume bar

![Volume bar](../widgets/squeezeboxrpc/img/volume.png)

Shows the active player's volume as segments and lets the user set
a new volume by clicking or tapping the bar.

| Setting                  | Default               | Description                                       |
| ------------------------ | --------------------- | ------------------------------------------------- |
| Players widget           | —                     | Source of the active player and `Volume` state.   |
| Calculation (`calctype`) | `segstep`             | Uses segment steps or the exact pointer position. |
| Segments                 | `10`                  | Number of displayed segments.                     |
| Orientation (`position`) | `vertical`            | Vertical or horizontal layout.                    |
| Reverse                  | Off                   | Reverses visual direction and input mapping.      |
| Inactive / active fill   | `#005000` / `#00ff00` | Segment fill colors.                              |
| Normal / active border   | VIS defaults          | Segment border colors.                            |
| Margin / border width    | `1px` / `1px`         | Segment spacing and border width.                 |

## SyncGroup

![SyncGroup widget](../widgets/squeezeboxrpc/img/syncgroups.png)

Shows all players and lets the user add or remove players from
the selected player's LMS synchronization group.

| Setting                  | Default         | Description                                      |
| ------------------------ | --------------- | ------------------------------------------------ |
| Players widget           | —               | Provides the selected player and player list.    |
| Border width / style     | `2px` / `solid` | Button border dimensions and CSS style.          |
| No-group border color    | `#2e2e2e`       | Player is not synchronized.                      |
| Own-group border color   | `#87ceeb`       | Player belongs to the selected player's group.   |
| Other-group border color | `#ff0080`       | Player belongs to another synchronization group. |
| Border radius            | `5px`           | Corner radius.                                   |
| Background color         | `#000000`       | Button background.                               |
| Button margin            | `0px`           | Space around buttons.                            |

The selected player itself cannot be toggled. Player images and labels
are inherited from the referenced Players widget.

## Playtime bar

![Playtime bar](../widgets/squeezeboxrpc/img/playtime.png)

Shows elapsed time relative to track duration and supports
seeking by clicking the bar.

| Setting              | Default         | Description                                             |
| -------------------- | --------------- | ------------------------------------------------------- |
| Players widget       | —               | Supplies `Time`, `Duration` and the seek command state. |
| Main bar color       | `#909090`       | Background for the complete duration.                   |
| Playtime color       | `#00ff00`       | Elapsed-time fill.                                      |
| Border width / style | `2px` / `solid` | Outer border.                                           |
| Border color         | `#ffffff`       | Outer border color.                                     |
| Border radius        | `2px`           | Corner radius.                                          |

For streams without a finite positive duration, the progress fill remains
empty and seeking is disabled.

## String

![String widget](../widgets/squeezeboxrpc/img/string.png)

Displays a string-valued state of the active player, such as title, artist or album.

| Setting          | Default | Description                       |
| ---------------- | ------- | --------------------------------- |
| Players widget   | —       | Source of the active player.      |
| Player attribute | —       | Player state to display.          |
| HTML/test field  | —       | VIS 1 text/HTML formatting field. |

## Number

![Number widget](../widgets/squeezeboxrpc/img/number.png)

Displays a numeric player state with optional formatting.

| Setting                   | Default   | Description                                        |
| ------------------------- | --------- | -------------------------------------------------- |
| Players widget            | —         | Source of the active player.                       |
| Player attribute          | —         | Numeric player state to display.                   |
| HTML prepend / append     | —         | Text or markup before and after the value.         |
| Decimal places (`digits`) | Automatic | Fixed number of fractional digits when configured. |
| Decimal comma             | On        | Uses a comma as decimal separator.                 |
| Thousands separator       | Off       | Groups thousands in the formatted value.           |
| HTML/test field           | —         | VIS 1 formatting field.                            |

## DateTime

![DateTime widget](../widgets/squeezeboxrpc/img/datetime.png)

Formats a numeric player state as a duration or date/time value.

| Setting               | Default    | Description                                                                          |
| --------------------- | ---------- | ------------------------------------------------------------------------------------ |
| Players widget        | —          | Source of the active player.                                                         |
| Player attribute      | —          | Numeric state to format.                                                             |
| HTML prepend / append | —          | Text or markup before and after the result.                                          |
| Format                | `hh:mm:ss` | Date/time pattern; hours, minutes and seconds are shown by default.                  |
| Factor                | `1000`     | Multiplier applied before formatting, useful for seconds-to-milliseconds conversion. |
| HTML/test field       | —          | VIS 1 formatting field.                                                              |

## Image

![Image widget](../widgets/squeezeboxrpc/img/image.png)

Displays an image URL from the active player, most commonly `ArtworkUrl`.

| Setting               | Default | Description                                 |
| --------------------- | ------- | ------------------------------------------- |
| Players widget        | —       | Source of the active player.                |
| Player attribute      | —       | URL-valued player state to display.         |
| Stretch               | Off     | Stretches the image to the widget bounds.   |
| HTML prepend / append | —       | Text added around the URL before rendering. |
| HTML/test field       | —       | VIS 1 formatting field.                     |

The widget subscribes to state updates and also loads the initial value asynchronously.

## Playlist

![Playlist widget](../widgets/squeezeboxrpc/img/playlist.png)

Opens stored LMS playlists and lets the user start or add a selected playlist.

| Setting        | Default | Description                                      |
| -------------- | ------- | ------------------------------------------------ |
| Players widget | —       | Supplies the active player and adapter instance. |

The list is loaded from LMS on demand. This widget browses stored playlists;
use PlaylistDetail for the active queue.

## PlaylistDetail

![PlaylistDetail widget](../widgets/squeezeboxrpc/img/playlistdetail.png)

Displays every track in the active player's current queue with artwork,
metadata, duration and actions.

| Setting                      | Default                     | Description                                                      |
| ---------------------------- | --------------------------- | ---------------------------------------------------------------- |
| Players widget               | —                           | Supplies `Playlist`, `PlaylistCurrentIndex` and action commands. |
| Row background               | `#f5f7fa`                   | Normal row background.                                           |
| Active/hover background      | `#dbeafe`                   | Background of the current track and hovered rows.                |
| Border color / width / style | `#cbd5e1` / `1px` / `solid` | Row border appearance.                                           |
| Row spacing                  | `4px`                       | Vertical space between tracks.                                   |
| Show thumbnail               | On                          | Shows artwork from `ArtworkUrl`.                                 |
| Show index                   | On                          | Shows a one-based track number before the title.                 |

The current track is highlighted. Play starts the selected queue item;
delete removes it only from the current queue, not from a stored playlist.
The scroll position is retained after actions.

## Browser

<img src="../widgets/squeezeboxrpc/img/browser.svg" width="128px" alt="Browser widget">

Navigates the LMS menu hierarchy and provides next, play and add actions
offered by LMS.

| Setting             | Default | Description                                        |
| ------------------- | ------- | -------------------------------------------------- |
| Players widget      | —       | Supplies adapter instance and active player.       |
| Debug               | Off     | Writes browser diagnostics to the browser console. |
| Debug fetch results | Off     | Also logs raw LMS responses when Debug is enabled. |

The breadcrumb button returns to the previous menu level.
Available actions depend on the LMS menu item and installed LMS plugins.