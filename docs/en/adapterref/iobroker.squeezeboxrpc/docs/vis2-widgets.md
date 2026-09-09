---
chapters: {"pages":{"en/adapterref/iobroker.squeezeboxrpc/README.md":{"title":{"en":"ioBroker Logitech/Lyrion Squeezebox Adapter over JSON/RPC-Protocol"},"content":"en/adapterref/iobroker.squeezeboxrpc/README.md"},"en/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md":{"title":{"en":"SqueezeboxRPC widgets for VIS 1"},"content":"en/adapterref/iobroker.squeezeboxrpc/docs/vis1-widgets.md"},"en/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md":{"title":{"en":"SqueezeboxRPC widgets for VIS 2"},"content":"en/adapterref/iobroker.squeezeboxrpc/docs/vis2-widgets.md"}}}
---
# SqueezeboxRPC widgets for VIS 2

This document describes every VIS 2 widget shipped with the adapter.
Start with a **Players** widget. All other widgets reference it and receive
the active adapter instance and player through the shared selection mechanism,
including references across VIS views.

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

Selects the active LMS player and publishes the selection to every
referenced SqueezeboxRPC widget.

| Setting                        | Default               | Description                                                                     |
| ------------------------------ | --------------------- | ------------------------------------------------------------------------------- |
| SqueezeboxRPC instance         | —                     | Adapter instance whose players are loaded.                                      |
| Format                         | Buttons               | Displays player buttons or a compact select field.                              |
| Player configuration           | Discovered players    | Reorders, enables or disables players and assigns per-player presentation data. |
| Wrap CamelCase                 | On                    | Allows CamelCase labels to wrap.                                                |
| Image width / height           | `50` / `50` px        | Size of player buttons.                                                         |
| Opacity                        | `0.5`                 | Inactive-button opacity.                                                        |
| Border width / style           | `2px` / `solid`       | Button border appearance.                                                       |
| Normal / active border color   | `#2e2e2e` / `#87ceeb` | Selection indication.                                                           |
| Border radius                  | `5px`                 | Corner radius.                                                                  |
| Background                     | `#000000`             | Button and generated text-image background.                                     |
| Button margin                  | `0px`                 | Space around player buttons.                                                    |
| Individual button image / text | —                     | Per-player replacement image and label.                                         |

Configuration is retained when players temporarily disappear; newly discovered
players are appended. Selection is published through a browser-global bus,
so referenced widgets may be located on other views.

## Favorites

![Favorites widget](../widgets/squeezeboxrpc/img/favorites.png)

Displays LMS favorites and starts a favorite on the selected player.

| Setting                          | Default               | Description                                                         |
| -------------------------------- | --------------------- | ------------------------------------------------------------------- |
| Players widget reference         | —                     | Players widget that supplies instance and active player.            |
| Favorite configuration           | Discovered favorites  | Reorders, hides and configures favorites using stable favorite IDs. |
| Edit-mode index helper           | Off                   | Shows zero-based indexes only in the editor.                        |
| Wrap CamelCase                   | On                    | Allows generated labels to wrap.                                    |
| Image width / height             | `50` / `50` px        | Favorite button size.                                               |
| Opacity                          | `0.5`                 | Inactive-button opacity.                                            |
| Border width / style             | `2px` / `solid`       | Button border appearance.                                           |
| Normal / active border color     | `#2e2e2e` / `#87ceeb` | Normal and active favorite indication.                              |
| Border radius                    | `5px`                 | Corner radius.                                                      |
| Background                       | `#000000`             | Button background.                                                  |
| Button margin                    | `0px`                 | Space around buttons.                                               |
| Individual favorite image / text | —                     | Per-favorite replacement image and label.                           |

Overflow remains inside the widget and uses a narrow scrollbar.
Failed images fall back to generated text images.

## Play button

<img src="../widgets/squeezeboxrpc/img/play.svg" width="128px" alt="Play button">

Controls and displays play, pause and stop for the selected player.

| Setting                   | Default      | Description                           |
| ------------------------- | ------------ | ------------------------------------- |
| Players widget reference  | —            | Source of the selected player.        |
| Pause / play / stop image | Built-in SVG | Optional custom image for each state. |
| SVG fill / stroke color   | `#ffffff`    | Built-in icon colors.                 |
| SVG stroke width          | `0.3`        | Built-in icon stroke width.           |

## Forward button

<img src="../widgets/squeezeboxrpc/img/fwd.svg" width="128px" alt="Forward button">

Sends the LMS jump-forward command to the selected player.

| Setting                  | Default      | Description                    |
| ------------------------ | ------------ | ------------------------------ |
| Players widget reference | —            | Source of the selected player. |
| Forward image            | Built-in SVG | Optional custom icon.          |
| SVG fill / stroke color  | `#ffffff`    | Built-in icon colors.          |
| SVG stroke width         | `0.3`        | Built-in icon stroke width.    |

## Rewind button

<img src="../widgets/squeezeboxrpc/img/rew.svg" width="128px" alt="Rewind button">

Sends the LMS jump-back command to the selected player.

| Setting                  | Default      | Description                    |
| ------------------------ | ------------ | ------------------------------ |
| Players widget reference | —            | Source of the selected player. |
| Rewind image             | Built-in SVG | Optional custom icon.          |
| SVG fill / stroke color  | `#ffffff`    | Built-in icon colors.          |
| SVG stroke width         | `0.3`        | Built-in icon stroke width.    |

## Repeat button

<img src="../widgets/squeezeboxrpc/img/repeat0.svg" width="128px" alt="Repeat button">

Displays and changes the selected player's `PlaylistRepeat` state.

| Setting                              | Default      | Description                                  |
| ------------------------------------ | ------------ | -------------------------------------------- |
| Players widget reference             | —            | Source of the selected player.               |
| Mode-off / mode-one / mode-two image | Built-in SVG | Optional image for repeat states 0, 1 and 2. |
| SVG fill / stroke color              | `#ffffff`    | Built-in icon colors.                        |
| SVG stroke width                     | `0.3`        | Built-in icon stroke width.                  |

Clicks cycle `0 → 1 → 2 → 0`. State 0 is disabled, state 1 shows repeat-one, and
state 2 shows enabled repeat-all. Without a state-2 image,
the state-0 custom image or built-in repeat icon is reused.

## Shuffle button

<img
src="../widgets/squeezeboxrpc/img/shuffle0.svg"
width="128px"
alt="Shuffle button"

>

Displays and changes the selected player's `PlaylistShuffle` state.

| Setting                              | Default      | Description                                   |
| ------------------------------------ | ------------ | --------------------------------------------- |
| Players widget reference             | —            | Source of the selected player.                |
| Mode-off / mode-one / mode-two image | Built-in SVG | Optional image for shuffle states 0, 1 and 2. |
| SVG fill / stroke color              | `#ffffff`    | Built-in icon colors.                         |
| SVG stroke width                     | `0.3`        | Built-in icon stroke width.                   |

## Volume bar

![Volume bar](../widgets/squeezeboxrpc/img/volume.png)

Displays volume as segments and changes it when the user clicks or taps the bar.

| Setting                  | Default               | Description                                   |
| ------------------------ | --------------------- | --------------------------------------------- |
| Players widget reference | —                     | Supplies the selected player's `Volume`.      |
| Calculation              | Segment step          | Segment-step or exact-position input mapping. |
| Segments                 | `10`                  | Number of segments, from 2 to 100.            |
| Orientation              | Vertical              | Vertical or horizontal layout.                |
| Reverse                  | Off                   | Reverses direction and input mapping.         |
| Inactive / active fill   | `#005000` / `#00ff00` | Segment colors.                               |
| Normal / active border   | `#909090` / `#87ceeb` | Segment border colors.                        |
| Margin / border width    | `1px` / `1px`         | Segment spacing and border width.             |

## SyncGroup

![SyncGroup widget](../widgets/squeezeboxrpc/img/syncgroups.png)

Manages the LMS synchronization group of the selected player.

| Setting                  | Default         | Description                                           |
| ------------------------ | --------------- | ----------------------------------------------------- |
| Players widget reference | —               | Supplies player list, appearance and selected player. |
| Border width / style     | `2px` / `solid` | Button border appearance.                             |
| No-group border          | `#2e2e2e`       | Player is not synchronized.                           |
| Own-group border         | `#87ceeb`       | Player belongs to the selected player's group.        |
| Other-group border       | `#ff0080`       | Player belongs to another group.                      |
| Border radius            | `5px`           | Corner radius.                                        |
| Background               | `#000000`       | Button background.                                    |
| Button margin            | `0px`           | Space around buttons.                                 |

Overlapping LMS relationships are merged into complete groups.
Clicking a player synchronizes or unsynchronizes it;
the selected player itself is disabled.

## Playtime bar

![Playtime bar](../widgets/squeezeboxrpc/img/playtime.png)

Shows elapsed time relative to duration and seeks when the user
clicks or taps a position.

| Setting                  | Default         | Description                                  |
| ------------------------ | --------------- | -------------------------------------------- |
| Players widget reference | —               | Supplies `Time`, `Duration` and seek target. |
| Main bar color           | `#909090`       | Complete-duration background.                |
| Playtime color           | `#00ff00`       | Elapsed-time fill.                           |
| Border width / style     | `2px` / `solid` | Outer border.                                |
| Border color             | `#ffffff`       | Outer border color.                          |
| Border radius            | `2px`           | Corner radius.                               |

For streams without a finite positive duration, the fill stays empty and
the bar does not seek.

## String

![String widget](../widgets/squeezeboxrpc/img/string.png)

Displays a string-valued state such as title, artist or album.

| Setting                  | Default | Description                      |
| ------------------------ | ------- | -------------------------------- |
| Players widget reference | —       | Source of the selected player.   |
| Player attribute         | —       | State to display.                |
| HTML prepend / append    | —       | Text or markup around the value. |

## Number

![Number widget](../widgets/squeezeboxrpc/img/number.png)

Displays and formats a numeric state of the selected player.

| Setting                  | Default   | Description                       |
| ------------------------ | --------- | --------------------------------- |
| Players widget reference | —         | Source of the selected player.    |
| Player attribute         | —         | Numeric state to display.         |
| HTML prepend / append    | —         | Text or markup around the value.  |
| Decimal places           | Automatic | Fixed fractional digits when set. |
| Decimal comma            | On        | Uses comma as decimal separator.  |
| Thousands separator      | Off       | Groups thousands.                 |

## DateTime

![DateTime widget](../widgets/squeezeboxrpc/img/datetime.png)

Formats a numeric player value as date/time or duration text.

| Setting                  | Default    | Description                                                                |
| ------------------------ | ---------- | -------------------------------------------------------------------------- |
| Players widget reference | —          | Source of the selected player.                                             |
| Player attribute         | —          | Numeric state to format.                                                   |
| HTML prepend / append    | —          | Text or markup around the formatted value.                                 |
| Format                   | `hh:mm:ss` | Formatting pattern.                                                        |
| Factor                   | `1000`     | Multiplier before formatting, normally converting seconds to milliseconds. |

## Image

![Image widget](../widgets/squeezeboxrpc/img/image.png)

Displays an image URL, usually the active player's cover artwork.

| Setting                  | Default | Description                              |
| ------------------------ | ------- | ---------------------------------------- |
| Players widget reference | —       | Source of the selected player.           |
| Player attribute         | —       | URL-valued state, normally `ArtworkUrl`. |
| Stretch                  | Off     | Stretches the image to widget bounds.    |
| HTML prepend / append    | —       | Text added around the URL.               |

Image loading is retried when the subscribed state changes;
failed external URLs remain subject to browser network and mixed-content rules.

## Playlist

![Playlist widget](../widgets/squeezeboxrpc/img/playlist.png)

Browses stored LMS playlists and offers start/add actions for the selected player.

| Setting                  | Default | Description                            |
| ------------------------ | ------- | -------------------------------------- |
| Players widget reference | —       | Supplies instance and selected player. |

Stored playlist entries are fetched from LMS.
This is separate from the active queue shown by PlaylistDetail.

## PlaylistDetail

![PlaylistDetail widget](../widgets/squeezeboxrpc/img/playlistdetail.png)

Shows the selected player's current queue with artwork, metadata, duration and actions.

| Setting                      | Default                     | Description                                               |
| ---------------------------- | --------------------------- | --------------------------------------------------------- |
| Players widget reference     | —                           | Supplies `Playlist`, `PlaylistCurrentIndex` and commands. |
| Row background               | `#f5f7fa`                   | Normal row background.                                    |
| Active/hover background      | `#dbeafe`                   | Current and hovered row background.                       |
| Border color / width / style | `#cbd5e1` / `1px` / `solid` | Row border appearance.                                    |
| Row spacing                  | `4px`                       | Vertical distance between rows.                           |
| Show thumbnail               | On                          | Shows `ArtworkUrl` when present.                          |
| Show index                   | On                          | Shows one-based track indexes.                            |

Play jumps directly to the track. Delete removes it only from the active
queue and never edits a stored playlist. Long text is truncated with
an ellipsis, and overflow is vertically scrollable.

## Browser

<img src="../widgets/squeezeboxrpc/img/browser.svg" width="128px" alt="Browser widget">

Navigates My Music, radio, favorites, apps and other menu items exposed by LMS.

| Setting                  | Default | Description                                       |
| ------------------------ | ------- | ------------------------------------------------- |
| Players widget reference | —       | Supplies instance and selected player.            |
| Debug                    | Off     | Logs browser diagnostics.                         |
| Debug fetch results      | Off     | Logs raw command responses when Debug is enabled. |

The breadcrumb control navigates upward. Next, play and add buttons appear
only when LMS supplies the corresponding action.