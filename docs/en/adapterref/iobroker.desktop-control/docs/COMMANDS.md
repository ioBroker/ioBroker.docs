---
chapters: {"pages":{"en/adapterref/iobroker.desktop-control/README.md":{"title":{"en":"ioBroker.desktop-control"},"content":"en/adapterref/iobroker.desktop-control/README.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md":{"title":{"en":"Command reference"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md":{"title":{"en":"Befehlsreferenz"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md"}}}
---
# Command reference

_Deutsche Fassung: [COMMANDS.de.md](/#/docs/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md)_

_Generated automatically from `WinCtl.exe --dump-protocol` (protocol 1, version 0.6.4). Do not edit by hand._

Commands are sent to `{base}/{id}/cmd/<command>` (payload: JSON object or - for commands with a *short form* - a plain string).

## System

### `ping`
Sign of life, answers with time and agent version  

### `get_state`
Publishes all state values again  

### `reload_config`
Reloads the agent config and reconnects  

### `exit`  _(⚠ security relevant)_
Stops the agent  

### `list_commands`
Returns the list of all commands  

### `check_update`
Checks for a newer agent version (GitHub releases)  

### `update`
Installs the newest agent version and restarts the agent  

## Power & session

### `lock`
Locks the screen (Win+L)  

### `sleep`
Standby  

### `hibernate`
Hibernate  

### `shutdown`
Shuts the PC down  
Short form: payload `<text>` equals `{"delay": "<text>"}`.  

Examples:

```
60
{"delay":0,"force":true}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `delay` | integer |  | 10 | Delay in seconds |
| `force` | boolean |  | false | Force programs to close |

### `restart`
Restarts the PC  
Short form: payload `<text>` equals `{"delay": "<text>"}`.  

Examples:

```
30
{"delay":0,"force":true}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `delay` | integer |  | 10 | Delay in seconds |
| `force` | boolean |  | false | Force programs to close |

### `logoff`
Logs the user off  

### `cancel_shutdown`
Cancels a planned shutdown/restart  

### `monitor_off`
Turns the monitors off  

### `monitor_on`
Wakes the monitors up  

### `screensaver`
Starts the screen saver (the one set in Windows or a .scr file)  
Short form: payload `<text>` equals `{"file": "<text>"}`.  

Examples:

```
{"file":"C:/Windows/System32/Mystify.scr"}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `file` | string |  | "" | Path to a .scr file (empty = the one set in Windows) |

### `keep_awake`  _(needs a GUI session)_
Prevents standby and screen saver  
Short form: payload `<text>` equals `{"state": "<text>"}`.  

Examples:

```
{"state":true,"display":false}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `state` | boolean |  | true | on/off |
| `display` | boolean |  | true | Keep the screen on as well |

## Programs & windows

### `run`  _(⚠ security relevant)_
Starts a program (alias from the agent settings)  
Short form: payload `<text>` equals `{"path": "<text>"}`.  

Examples:

```
notepad
{"path":"kodi","args":"--fullscreen","window":"maximized"}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `path` | string | yes |  | Alias (e.g. 'notepad') or path to the .exe |
| `args` | string |  |  | Arguments as a string or list |
| `workdir` | string |  |  | Working directory |
| `hidden` | boolean |  |  | Start without a window |
| `window` | string |  |  | Window state (normal / minimized / maximized) |
| `admin` | boolean |  |  | As administrator (UAC prompt on the PC!) |
| `wait` | boolean |  |  | Wait for the end and return the exit code |
| `timeout` | integer |  | 60 | Wait time in seconds with wait |

### `open`
Opens a URL, file or folder with the default app  
Short form: payload `<text>` equals `{"target": "<text>"}`.  

Examples:

```
https://www.iobroker.net
ms-settings:display
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `target` | string | yes |  | URL (always allowed), otherwise alias/path |

### `kill`  _(⚠ security relevant)_
Ends processes by name or PID  
Short form: payload `<text>` equals `{"name": "<text>"}`.  

Examples:

```
notepad
{"pid":1234}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `name` | string |  |  | Process name, e.g. 'chrome' |
| `pid` | integer |  |  | Process ID |

### `list_processes`
Lists running processes  
Short form: payload `<text>` equals `{"filter": "<text>"}`.  

Examples:

```
chrome
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `filter` | string |  |  | Name filter |

### `list_windows`
Lists visible windows  

### `focus_window`
Brings a window to the front (title contains …)  
Short form: payload `<text>` equals `{"title": "<text>"}`.  

Examples:

```
Kodi
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | string | yes |  | Part of the window title |

### `close_window`
Closes a window (title contains …)  
Short form: payload `<text>` equals `{"title": "<text>"}`.  

Examples:

```
Notepad
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | string | yes |  | Part of the window title |

### `minimize_all`
Minimizes all windows (show desktop) or restores them  

Examples:

```
{"undo":true}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `undo` | boolean |  | false | Restore instead of minimise |

### `empty_recycle_bin`
Empties the recycle bin  

### `shell`  _(⚠ security relevant)_
Runs a PowerShell/cmd command and returns the output  
Short form: payload `<text>` equals `{"command": "<text>"}`.  

Examples:

```
Get-Date
{"command":"ipconfig","shell":"cmd"}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `command` | string | yes |  | Command / script |
| `shell` | string |  | "powershell" | Interpreter (powershell / cmd) |
| `timeout` | integer |  | 30 | Seconds |

## Audio

### `volume`
Sets the master volume (0-100)  
Short form: payload `<text>` equals `{"level": "<text>"}`.  

Examples:

```
30
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `level` | integer | yes |  | 0 - 100 |

### `volume_change`
Changes the volume relatively  
Short form: payload `<text>` equals `{"delta": "<text>"}`.  

Examples:

```
-10
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `delta` | integer |  | 5 | e.g. 5 or -10 |

### `mute`
Mute / unmute / toggle  
Short form: payload `<text>` equals `{"state": "<text>"}`.  

Examples:

```
toggle
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `state` | string |  | "toggle" | true / false / toggle |

### `media`
Sends a media key  
Short form: payload `<text>` equals `{"key": "<text>"}`.  

Examples:

```
playpause
next
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `key` | string | yes |  | Media key (playpause / next / prev / stop / volume_up / volume_down / mute) |

### `speak`
Text to speech  
Short form: payload `<text>` equals `{"text": "<text>"}`.  

Examples:

```
Dinner is ready
{"text":"Attention","voice":"Zira","rate":2,"volume":80}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | string | yes |  | Text to speak |
| `voice` | string |  |  | Part of the voice name, e.g. 'Hedda' |
| `rate` | integer |  | 0 | -10 (slow) to 10 (fast) |
| `volume` | integer |  | 100 | 0-100 |
| `wait` | boolean |  |  | Wait until speaking has finished |
| `interrupt` | boolean |  | true | Cancel the current output |

### `list_voices`
Lists the installed voices  

### `play_sound`
Plays an audio file (mp3/wav/wma, path or URL)  
Short form: payload `<text>` equals `{"source": "<text>"}`.  

Examples:

```
http://192.168.1.5/gong.mp3
{"source":"C:\\Sounds\\doorbell.wav","wait":true}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `source` | string | yes |  | Path or URL |
| `wait` | boolean |  | false | Wait until the end |

### `stop_sound`
Stops play_sound / speak  

### `beep`
Simple beep  

Examples:

```
{"freq":1200,"ms":500}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `freq` | integer |  | 800 | Hz |
| `ms` | integer |  | 300 | Duration in ms |

## Display

### `show_image`  _(needs a GUI session)_
Shows an image as popup, full screen or in a corner  
Short form: payload `<text>` equals `{"source": "<text>"}`.  

Examples:

```
http://camera/snapshot.jpg
{"source":"http://camera/snapshot.jpg","mode":"corner","position":"top-right","size":30,"seconds":10,"caption":"Front door","slot":"doorbell"}
{"source":"https://picsum.photos/1920/1080","mode":"fullscreen","seconds":15}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `source` | string | yes |  | Path, http(s) URL or data: URI |
| `base64` | string |  |  | Alternatively: Base64 data |
| `fit` | string |  | "contain" | Scaling (contain / stretch / center) |
| `mode` | string |  | "popup" | popup = window in the centre, fullscreen = full screen, corner = corner (e.g. doorbell camera) (popup / fullscreen / corner) |
| `seconds` | number |  |  | Close automatically after X seconds (0 = stays until click/close_popups) |
| `monitor` | integer |  | -1 | Monitor index (0 = first, -1 = primary monitor) |
| `position` | string |  | "bottom-right" | Position with mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right) |
| `size` | number |  |  | Width in % of the screen (5 - 100, aspect ratio is kept; empty = automatic: corner 28 %, popup max. 70 %) |
| `margin` | integer |  | 16 | Distance to the screen edge in pixels (mode=corner) |
| `border` | integer |  | 2 | Border width in pixels (0 = no border) |
| `border_color` | string |  | "#282828" | Border colour, e.g. #ff0000 |
| `caption_size` | number |  | 11 | Font size of the caption |
| `caption_color` | string |  | "#ffffff" | Colour of the caption |
| `caption` | string |  |  | Caption below the content |
| `slot` | string |  |  | Same slot replaces the previous popup (e.g. to refresh a camera image) |
| `click_close` | boolean |  |  | Click closes the popup |
| `opacity` | number |  |  | Opacity 0.1 - 1 |
| `activate` | boolean |  | false | Take the focus (default: no, does not disturb work) |
| `bg` | string |  |  | Background colour, e.g. #000000 |

### `show_video`  _(needs a GUI session)_
Plays a video with Edge/Chromium (mp4, WebM, …)  
Short form: payload `<text>` equals `{"source": "<text>"}`.  

Examples:

```
http://server/video.mp4
{"source":"http://server/video.mp4","mode":"corner","position":"bottom-left","size":25,"muted":true,"loop":true}
{"source":"C:\\Videos\\intro.mp4","mode":"fullscreen","close_when_done":true}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `source` | string | yes |  | Path or URL |
| `loop` | boolean |  | false | Loop endlessly |
| `muted` | boolean |  | false | Without sound |
| `volume` | number |  | 1 | 0 - 1 |
| `controls` | boolean |  | false | Show the controls |
| `close_when_done` | boolean |  | true | Close when finished |
| `engine` | string |  | "auto" | Player: auto = Edge (WebView2), otherwise IE11; edge = Edge only; ie = old IE11 (auto / edge / ie) |
| `mode` | string |  | "popup" | popup = window in the centre, fullscreen = full screen, corner = corner (e.g. doorbell camera) (popup / fullscreen / corner) |
| `seconds` | number |  |  | Close automatically after X seconds (0 = stays until click/close_popups) |
| `monitor` | integer |  | -1 | Monitor index (0 = first, -1 = primary monitor) |
| `position` | string |  | "bottom-right" | Position with mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right) |
| `size` | number |  |  | Width in % of the screen (5 - 100, aspect ratio is kept; empty = automatic: corner 28 %, popup max. 70 %) |
| `margin` | integer |  | 16 | Distance to the screen edge in pixels (mode=corner) |
| `border` | integer |  | 2 | Border width in pixels (0 = no border) |
| `border_color` | string |  | "#282828" | Border colour, e.g. #ff0000 |
| `caption_size` | number |  | 11 | Font size of the caption |
| `caption_color` | string |  | "#ffffff" | Colour of the caption |
| `caption` | string |  |  | Caption below the content |
| `slot` | string |  |  | Same slot replaces the previous popup (e.g. to refresh a camera image) |
| `click_close` | boolean |  |  | Click closes the popup |
| `opacity` | number |  |  | Opacity 0.1 - 1 |
| `activate` | boolean |  | false | Take the focus (default: no, does not disturb work) |
| `bg` | string |  |  | Background colour, e.g. #000000 |

### `show_web`  _(needs a GUI session)_
Shows a web page (vis, Lovelace, camera stream) with Edge/Chromium in a window or full screen, also several pages in turn (slideshow)  
Short form: payload `<text>` equals `{"url": "<text>"}`.  

Examples:

```
http://192.168.1.5:8082/vis/
{"url":"http://192.168.1.5:8082/vis/","mode":"fullscreen"}
{"urls":["http://192.168.1.5:8082/vis/","http://camera/snapshot.jpg"],"interval":20,"mode":"fullscreen"}
{"url":"http://camera/stream","mode":"corner","size":35,"seconds":30,"slot":"camera"}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `url` | string |  |  | Address (or 'urls' for a slide show) |
| `urls` | array |  |  | Slide show: several addresses, switching after 'interval' seconds |
| `interval` | number |  | 30 | Slide show: seconds per page |
| `zoom` | number |  | 1 | Zoom, e.g. 1.25 = 125 % (Edge only) |
| `engine` | string |  | "auto" | Browser: auto = Edge (WebView2), otherwise IE11; edge = Edge only; ie = old IE11 (auto / edge / ie) |
| `mode` | string |  | "popup" | popup = window in the centre, fullscreen = full screen, corner = corner (e.g. doorbell camera) (popup / fullscreen / corner) |
| `seconds` | number |  |  | Close automatically after X seconds (0 = stays until click/close_popups) |
| `monitor` | integer |  | -1 | Monitor index (0 = first, -1 = primary monitor) |
| `position` | string |  | "bottom-right" | Position with mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right) |
| `size` | number |  |  | Width in % of the screen (5 - 100, aspect ratio is kept; empty = automatic: corner 28 %, popup max. 70 %) |
| `margin` | integer |  | 16 | Distance to the screen edge in pixels (mode=corner) |
| `border` | integer |  | 2 | Border width in pixels (0 = no border) |
| `border_color` | string |  | "#282828" | Border colour, e.g. #ff0000 |
| `caption_size` | number |  | 11 | Font size of the caption |
| `caption_color` | string |  | "#ffffff" | Colour of the caption |
| `caption` | string |  |  | Caption below the content |
| `slot` | string |  |  | Same slot replaces the previous popup (e.g. to refresh a camera image) |
| `click_close` | boolean |  |  | Click closes the popup |
| `opacity` | number |  |  | Opacity 0.1 - 1 |
| `activate` | boolean |  | false | Take the focus (default: no, does not disturb work) |
| `bg` | string |  |  | Background colour, e.g. #000000 |

### `show_text`  _(needs a GUI session)_
Shows text as an overlay  
Short form: payload `<text>` equals `{"text": "<text>"}`.  

Examples:

```
Washing machine finished
{"text":"Alarm!","size":60,"color":"#ffffff","bg":"#c00000","position":"center","seconds":10}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | string | yes |  | Text |
| `seconds` | number |  | 5 | Display duration |
| `size` | number |  | 40 | Font size |
| `color` | string |  | "#ffffff" | Text colour |
| `bg` | string |  | "#202020" | Background |
| `opacity` | number |  | 0.9 | Opacity |
| `position` | string |  | "bottom" | Position (top / center / bottom) |
| `monitor` | integer |  | -1 | Monitor index |
| `bold` | boolean |  | true | Bold |
| `font` | string |  | "Segoe UI" | Font |
| `click_through` | boolean |  | true | Mouse clicks pass through |
| `slot` | string |  |  | Replaces the overlay with the same slot |
| `max_width` | number |  | 80 | Maximum width in % of the screen (text wraps) |
| `padding` | integer |  | 24 | Padding in pixels |
| `margin` | integer |  |  | Distance to the edge in pixels (top: 40, bottom: 60) |

### `ask`  _(needs a GUI session)_
Shows a dialog with buttons/input and returns the answer  
Short form: payload `<text>` equals `{"text": "<text>"}`.  

Examples:

```
Switch the light off?
{"text":"Start cinema mode?","buttons":["Yes","No"],"timeout":30}
{"text":"How warm should it be?","input":true,"default":"21","buttons":["OK","Cancel"]}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | string | yes |  | Question text |
| `title` | string |  |  | Title |
| `buttons` | array |  | ["OK"] | Button labels, e.g. ["Yes","No"] |
| `input` | boolean |  | false | Show a text input field |
| `default` | string |  |  | Default value of the input field |
| `password` | boolean |  | false | Hide the input |
| `timeout` | integer |  | 0 | Seconds until closed automatically (0 = never) |
| `width` | integer |  | 460 | Width of the dialog in pixels |
| `font_size` | number |  | 10 | Font size |
| `monitor` | integer |  | -1 | Monitor index (-1 = primary monitor) |

### `notify`  _(needs a GUI session)_
Shows a Windows notification  
Short form: payload `<text>` equals `{"text": "<text>"}`.  

Examples:

```
Parcel has arrived
{"text":"Window open","title":"Heating","icon":"warning","seconds":10}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | string | yes |  | Text |
| `title` | string |  | "WinCtl" | Title |
| `icon` | string |  | "info" | Icon (info / warning / error / none) |
| `seconds` | integer |  | 5 | Duration |

### `close_popups`  _(needs a GUI session)_
Closes all popups, overlays and dialogs  

### `screenshot`  _(needs a GUI session)_
Takes a screenshot (stored in the ioBroker file storage)  

Examples:

```
{"monitor":0,"scale":1,"format":"png"}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `monitor` | integer |  | -1 | -1 = all monitors, 0 = first ... |
| `scale` | number |  | 0.5 | Scale-down 0.05 - 1 |
| `quality` | integer |  | 70 | JPEG quality |
| `format` | string |  | "jpeg" | Image format (jpeg / png) |
| `inline` | boolean |  | false | Also send Base64 in the result |

### `set_wallpaper`
Sets the desktop wallpaper  
Short form: payload `<text>` equals `{"source": "<text>"}`.  

Examples:

```
https://picsum.photos/1920/1080
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `source` | string | yes |  | Path or URL |

### `brightness`
Sets the brightness (internal laptop displays only)  
Short form: payload `<text>` equals `{"level": "<text>"}`.  

Examples:

```
60
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `level` | integer | yes |  | 0 - 100 |

## Input

### `start_menu`
Opens or closes the start menu (Windows key)  

### `send_keys`  _(needs a GUI session)_
Sends key presses (SendKeys syntax)  
Short form: payload `<text>` equals `{"keys": "<text>"}`.  

Examples:

```
^c
%{F4}
{ENTER}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `keys` | string | yes |  | e.g. ^c or %{F4} or {ENTER} |

### `type_text`  _(needs a GUI session)_
Types text into the active window  
Short form: payload `<text>` equals `{"text": "<text>"}`.  

Examples:

```
Hello world
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | string | yes |  | Text |

### `mouse`
Moves/clicks the mouse  

Examples:

```
{"x":100,"y":200,"click":"single"}
{"wheel":-3}
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `x` | integer |  |  | X coordinate |
| `y` | integer |  |  | Y coordinate |
| `relative` | boolean |  | false | Relative to the current position |
| `click` | string |  | "none" | Click type (none / single / double) |
| `button` | string |  | "left" | Button (left / right / middle) |
| `wheel` | integer |  |  | Scroll wheel steps (+ up / - down) |

### `clipboard_set`  _(needs a GUI session)_
Sets the clipboard text  
Short form: payload `<text>` equals `{"text": "<text>"}`.  

Examples:

```
Text for the clipboard
```

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | string | yes |  | Text |

### `clipboard_get`  _(needs a GUI session)_
Reads the clipboard text  

## States

| Topic (`{base}/{id}/state/…`) | Type | Unit | Role | Description |
|---|---|---|---|---|
| `locked` | boolean |  | `indicator` | Screen locked |
| `user_present` | boolean |  | `indicator` | User active (not locked and input within the idle threshold) |
| `idle` | number | s | `value` | Seconds since the last mouse/keyboard input |
| `active_window` | string |  | `text` | Title of the active window |
| `active_process` | string |  | `text` | Process of the active window |
| `volume` | number | % | `level.volume` | Master volume |
| `muted` | boolean |  | `media.mute` | Muted |
| `cpu` | number | % | `value` | CPU load |
| `ram` | number | % | `value` | RAM usage |
| `ram_free_gb` | number | GB | `value` | Free memory |
| `uptime_min` | number | min | `value` | Time since Windows start |
| `battery` | number | % | `value.battery` | Battery level (devices with battery only) |
| `charging` | boolean |  | `indicator` | Power supply connected (devices with battery only) |
| `monitors` | number |  | `value` | Number of monitors |
| `ip` | string |  | `text` | Local IPv4 address |
| `user` | string |  | `text` | Logged-in user |
| `keep_awake` | boolean |  | `indicator` | keep_awake active |
| `webcam_in_use` | boolean |  | `indicator` | Camera in use (e.g. video call) |
| `webcam_app` | string |  | `text` | Program(s) using the camera |
| `mic_in_use` | boolean |  | `indicator` | Microphone in use |
| `mic_app` | string |  | `text` | Program(s) using the microphone |
| `web_url` | string |  | `text.url` | Page that show_web currently displays (empty = none) |
| `update_available` | boolean |  | `indicator` | Newer agent version available (checked at start and every 12 h) |
| `latest_version` | string |  | `text` | Newest agent version on GitHub |
| `disk/<drive>_free_gb` | number | GB | `value` | Free space per drive, e.g. `disk.C_free_gb` |
| `disk/<drive>_used_percent` | number | % | `value` | Usage per drive, e.g. `disk.C_used_percent` |
| `proc/<name>` | boolean |  | `indicator` | Watched program is running (agent settings "Processes") |