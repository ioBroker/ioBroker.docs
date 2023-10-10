![Logo](admin/heos.png)
# ioBroker.heos

[![NPM version](http://img.shields.io/npm/v/iobroker.heos.svg)](https://www.npmjs.com/package/iobroker.heos)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heos.svg)](https://www.npmjs.com/package/iobroker.heos)
![Number of Installations (latest)](http://iobroker.live/badges/heos-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/heos-stable.svg)
[![Dependency Status](https://img.shields.io/david/withstu/iobroker.heos.svg)](https://david-dm.org/withstu/iobroker.heos)
[![Known Vulnerabilities](https://snyk.io/test/github/withstu/ioBroker.heos/badge.svg)](https://snyk.io/test/github/withstu/ioBroker.heos)

[![NPM](https://nodei.co/npm/iobroker.heos.png?downloads=true)](https://nodei.co/npm/iobroker.heos/)

The adapter lets control HEOS from ioBroker.

## Disclaimer
HEOS, DENON and Marantz are trademarks of D&M Holdings Inc.
The developers of this module are in no way endorsed by or affiliated with D&M Holdings Inc.,
or any associated subsidiaries, logos or trademarks.

## Reference
The used HEOS API is documented here: https://rn.dmglobal.com/euheos/HEOS_CLI_ProtocolSpecification_2021.pdf

## Network Requirements
The protocol SSDP is used for finding the players. UPnP requires multicast access to the 239.255.255.250:1900 along with the appropriate IGMP messages. The source port for receiving SSDP Messages can be configured in the adapter settings (Default setting is ```0``` means the port is automatically choosen). Further Details: https://support.denon.com/app/answers/detail/a_id/4717/~/network-requirements-for-heos
For the API access to the HEOS Players the adapter uses the port ```1255```.

## Configuration

* **AutoPlay**: Automatically plays music after the player is connected or on unmute. Can be configured globally in configuration. If it is enabled globally you can disable it for one specific player with the state ```auto_play```.
* **Command scope**: Defines to which players the command ```scope/[cmd]``` of the command state is send to. It can be send to all players, all leading players or to all PIDs in the comma separated state: ```heos.0.command_scope_pid```
* **Mute Regex**:
In the configuration you can activate a function to mute the player based on a regex match on the song information. That can be used to mute ads automatically. For example for Spotify you can use the following regex: ```spotify:ad:|Advertisement```.
* **ignore_broadcast_cmd**: This player state configures, if the player should ignore commands to all players e.g. player/set_mute&state=on or pressing the play button for presets/playlists

## States and their meanings

### Command State

The HEOS player can be controlled by the different player states. To control the players in a more advanced way you can use the command state. On the one hand there is one global command state (heos.0.command) to control the whole adapter or multiple players with one command. On the other hand there is a command state per player.

#### HEOS Command State (heos.0.command)

* ```system/connect```: Try to Connect to HEOS
* ```system/disconnect```: Disconnect from HEOS
* ```system/reconnect```: Disconnect and Connect
* ```system/load_sources```: Reload sources
* ```system/reboot```: Reboot connected player
* ```system/reboot_all```: Reboot all players
* ```group/set_group?pid=<pid1>,<pid2>,...```: Set group with the list of player ids e.g. ```group/set_group?pid=12345678,12345679```.
* ```group/set_group?pid=<pid1>```: Delete existing group e.g. "group/set_group?pid=12345678"
* ```group/ungroup_all```: Delete all groups
* ```group/group_all```: Group all player in one group
* ```player/[cmd]```: Send the command to all players. e.g. player/set_mute&state=on 
* ```leader/[cmd]```: Send the command to all leading players. e.g. leader/set_mute&state=on
* ```scope/[cmd]```: Send the command to the configured scope all players, leading players or comma separated player pids in scope_pids
* ```...```: All other commands are tried to send to HEOS (Look in the HEOS API PDF for details)

#### Player Command State (heos.0.players.123456789.command)

Note: Multiple commands are possible, if they are separated with the pipe e.g. set_volume&level=20|play_preset&preset=1

* ```set_volume?level=0|1|..|100```: Set the player volume 
* ```set_play_state?state=play|pause|stop```: Set the player state
* ```set_play_mode?repeat=on_all|on_one|off&shuffle=on|off```: Set Repeat and Shuffle mode
* ```set_mute?state=on|off```: Mute player
* ```volume_down?step=1..10```: Lower volume
* ```volume_up?step=1..10```: Raise volume
* ```play_next```: Play next
* ```play_previous```: Play previous
* ```play_preset?preset=1|2|..|n```: Play preset n
* ```play_stream?url=url_path```: Play URL-Stream
* ```add_to_queue?sid=1025&aid=4&cid=[CID]```: Play playlist with [CID] on player (aid: 1 – play now; 2 – play next; 3 – add to end; 4 – replace and play)

### Presets & Playlists
Each source e.g. preset/favorite or playlists are located in the sources state folder (```heos.0.sources```). You can find your presets/favorites in the subfolder with the ID 1028 and the playlists in the subfolder with the ID 1025. Initially the adapter don't create your individual presets and playlists, because you have to trigger an update by setting the following states to true:
- Presets/Favorites: ```heos.0.sources.1028.browse```
- Playlists: ```heos.0.sources.1025.browse```
After that the adapter creates the states for the presets or playlists so that you easily can play the preset on all players.

### Image color extraction
With version 1.7.6 the prominent colors of the song cover are extracted and saved to three new player states:
* **current_image_color_palette**: Prominent colors selected by node-vibrant.
* **current_image_color_background**: Color with the biggest population in the image. Can be used as background color for player controls in VIS.
* **current_image_color_foreground**: Color with the second biggest population in the image and a good read contrast to the background color. Can be used as text color for player controls in VIS.

## Seek
The seek functionality is not working on all sources. Spotify and Amazon Music are supporting seeking.

## SayIt
[SayIt Adapter](https://github.com/ioBroker/ioBroker.sayit) is supported.

![Sayit](docs/media/sayit.png)
![Sayit Config](docs/media/sayit-config.png)

## Material UI
[Material UI Adapter](https://github.com/ioBroker/ioBroker.material) is supported.

![Material](docs/media/material-ui.png)

## VIS

### Installation
* Create following string states:
    * 0_userdata.0.heos.queue_pid
    * 0_userdata.0.heos.queue_html
    * 0_userdata.0.heos.browse_result_html

### Player View
* Open the file: [player_view.json](docs/vis/views/player_view.json)
* Replace 123456789 with the player pid
* Import view into VIS

![Player view](docs/media/player-view.png)

### Presets
* Click button ```heos.0.sources.1028.browse``` to load presets
* Open the file: [presets_view.json](docs/vis/views/presets_view.json)
* Import view into VIS

![Presets config](docs/media/presets-config.png)
![Presets](docs/media/presets.png)

### Queue
* Queue Widget: [queue_player_widget.json](docs/vis/views/queue_player_widget.json)
* Queue View: [queue_view.json](docs/vis/views/queue_view.json)
* Queue HTML Generation Script: [queue.js](docs/vis/scripts/queue.js)

![Queue widget](docs/media/queue-widget.png)

### Browse Sources
* Browse Widget: [browse_player_widget.json](docs/vis/views/browse_player_widget.json)
* Browse View: [browse_view.json](docs/vis/views/browse_view.json)
* Browse HTML Generation Script: [browse.js](docs/vis/scripts/browse.js)

![Browse widget](docs/media/browse-widget.png)
![Browse sources](docs/media/browse-sources.png)
![Browse tunein](docs/media/browse-tunein.png)

Alternative you can use the script from Uhula: https://forum.iobroker.net/post/498779


## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (withstu) update dependencies
* (withstu) add admin 5 UI support
* (withstu) improve preferred IP handling
* (withstu) improve undefined station handling #299

### 2.1.0 (2023-08-05)
* (withstu) replace got with axios
* (withstu) improve upnp handling
* (withstu) prevent duplicate connect messages

### 2.0.0 (2023-08-05)
* (withstu) fix pipelines and remove node 14.x support

### 1.12.3 (2023-08-05)
* (withstu) update dependencies

### 1.12.2 (2023-05-13)
* (withstu) optimize error handling

### 1.12.1 (2023-02-26)
* (withstu) optimize leader election

### 1.12.0 (2023-02-25)
* (withstu) optimize scope handling
* (withstu) switch to HEOS default cmd delimiter
* (withstu) add configuration to prefer list of IPs for adapter connection
* (withstu) optimize error handling

### 1.11.4 (2022-11-04)
* (withstu) improve play all button in browse feature

### 1.11.3 (2022-11-04)
* (withstu) update some dependencies
* (withstu) improve failure handling
* (withstu) improve play all button in browse feature

### 1.11.2 (2022-10-16)
* (withstu) adopt to new adapter structure

### 1.11.1 (2022-10-16)
* (withstu) fix release

### 1.11.0 (2022-10-16)
* (withstu) improve player failure detection
* (withstu) fix bug in regex mute
* (withstu) fix upnp NaN warning #192

### 1.10.0 (2022-06-16)
* (foxriver76) fix default value of `sid` (closes #174)

### 1.9.2 (2022-01-22)
* (withstu) add volume lock

### 1.9.1 (2021-08-17)
* (withstu) fix type issues
* (withstu) fix roles and repeat state

### 1.9.0 (2021-07-27)
* (stephanritscher) add option to configure udp source port

### 1.8.6 (2021-06-13)
* (withstu) test fixed pipeline

### 1.8.4 (2021-06-13)
* (withstu) improve stability

### 1.8.3 (2021-05-13)
* (withstu) fix upnp values on failure

### 1.8.2 (2021-05-12)
* (withstu) BREAKING: add queue paging
* (withstu) BREAKING: volume_max -> volume_limit
* (foxriver76) Fix type issues and some more minor changes

### 1.8.1 (2021-05-07)
* (withstu) fix reboot loop

### 1.8.0 (2021-04-24)
* (withstu) add reboot on failure configuration

### 1.7.9 (2021-04-07)
* (withstu) fix reboot
* (withstu) add power state

### 1.7.8 (2021-04-05)
* (withstu) add reboot

### 1.7.7 (2021-02-25)
* (withstu) add creation of missing version state

### 1.7.6 (2021-02-24)
* (withstu) add image color extraction

### 1.7.5 (2021-02-12)
* (withstu) add bit depth

### 1.7.4 (2021-02-01)
* (withstu) fix upnp init bug

### 1.7.3 (2021-02-01)
* (withstu) add upnp module and support bitrate, audio format and sample rate

### 1.7.2 (2021-01-30)
* (withstu) fix seek in groups

### 1.7.1 (2021-01-30)
* (withstu) add seek

### 1.7.0 (2021-01-29)
* (withstu) reboot not responding players
* (withstu) delete old presets and playlists

### 1.6.2 (2021-01-02)
* (withstu) fix "user not logged in" handling

### 1.6.1 (2020-11-25)
* (withstu) clear timeout and interval on unload; fix roles; remove sleep in tts module

### 1.6.0 (2020-11-22)
* (withstu) add regex mute

### 1.5.6 (2020-11-22)
* (withstu) add source images & optimize auto play

### 1.5.5 (2020-11-01)
* (withstu) update some packages and add sources event

### 1.5.4 (2020-10-24)
* (withstu) ignore invalid now playing responses

### 1.5.3 (2020-10-18)
* (withstu) minor improvements related to auto play feature

### 1.5.2 (2020-10-11)
* (withstu) improve tts stop method

### 1.5.1 (2020-10-11)
* (withstu) improve tts and don't update queue during tts

### 1.5.0 (2020-10-10)
* (withstu) add tts support and maximum volume

### 1.4.0 (2020-10-10)
* (withstu) add more play and queue settings
* (withstu) bugfixing for invalid heos responses (empty player name)

### 1.3.4 (2020-10-04)
* (withstu) remove sorting and available filter and fix browse play

### 1.3.3 (2020-10-04)
* (withstu) fix previous page button in browse feature

### 1.3.2 (2020-10-04)
* (withstu) fix preset sorting

### 1.3.1 (2020-10-03)
* (withstu) add back button to browse feature

### 1.3.0 (2020-10-03)
* (withstu) add queue and some browse improvements

### 1.2.4 (2020-09-29)
* (withstu) minor bugfix

### 1.2.3 (2020-09-29)
* (withstu) improve browse feature (add pictures and sources view)

### 1.2.2 (2020-09-28)
* (withstu) rename browse command

### 1.2.1 (2020-09-28)
* (withstu) introduce browse_result state

### 1.2.0 (2020-09-27)
* (withstu) Breaking change: restructure playlists/presets (you should delete the devices playlists, presets and sources before installation)

### 1.1.2 (2020-09-26)
* (withstu) log browse parameters

### 1.1.1 (2020-09-26)
* (withstu) add source browse feature (Click the button in the sources. You can find the possible next commands in the log.)

### 1.1.0 (2020-09-26)
* (withstu) encrypt password

### 1.0.1 (2020-09-21)
* (withstu) remove connected state, because it is included in the info channel

### 1.0.0 (2020-09-21)
* (withstu) initial release

## License
MIT License

Copyright (c) 2023 withstu <withstu@gmx.de>

derived from https://forum.iobroker.net/topic/10420/vorlage-denon-heos-script by Uwe Uhula
TTS derived from https://github.com/ioBroker/ioBroker.sonos

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
