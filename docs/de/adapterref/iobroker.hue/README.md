---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hue/README.md
title: ioBroker Philips Hue Bridge Adapter
hash: Aq2WzV2zV9MVj1xtm+eJYxyciDnHRZC2IgSzLdgQe7Y=
---
![Logo](../../../en/adapterref/iobroker.hue/admin/hue.jpeg)

![Anzahl der Installationen](http://iobroker.live/badges/hue-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hue.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.hue/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/hue/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hue.svg)

# ioBroker Philips Hue Bridge Adapter

**Dieser Adapter nutzt den Dienst [Sentry.io](https://sentry.io) , um mir als Entwickler automatisch Ausnahmen, Codefehler und neue Geräteschemata zu melden.** Weitere Details finden Sie unten!

## Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?

Sentry.io ist ein Dienst, der Entwicklern einen Überblick über Fehler in ihren Anwendungen bietet. Genau dies wird in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der ioBroker GmbH die Berechtigung zur Erfassung von Diagnosedaten erteilt haben, wird auch Ihre Installations-ID (eine eindeutige ID **ohne** weitere Informationen wie E-Mail-Adresse, Name usw.) übermittelt. Dadurch kann Sentry Fehler gruppieren und die Anzahl der betroffenen Benutzer anzeigen. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

## Englisch :gb:

Dieser Adapter verbindet Ihre Philips Hue Bridges mit ioBroker, um Philips Hue LED-Lampen, Friends of Hue LED-Lampen, LED-Streifen, Steckdosen wie von Osram und andere SmartLink-fähige Geräte (wie LivingWhites und einige LivingColors) zu steuern.

### Aufstellen

Nachdem Sie diesen Adapter in ioBroker installiert haben, erstellen Sie entsprechend eine Adapterinstanz. Anschließend müssen Sie Ihre Hue Bridge in den Adaptereinstellungen mit ioBroker verbinden:

1. Wenn Sie eine andere Bridge als v2 verwenden, konfigurieren Sie den Port auf 80 (nicht https), ansonsten sollte Port 443 ( https) verwendet werden.
2. Klicken Sie auf die Schaltfläche „Bridge suchen“, um die IP-Adresse Ihrer Bridge zu ermitteln. Dadurch werden alle Bridges in Ihrer Umgebung gesucht. Wählen Sie anschließend die Bridge aus, mit der Sie sich verbinden möchten. Das Feld „Bridge-Adresse“ wird automatisch mit der IP-Adresse Ihrer ausgewählten Hue-Bridge ausgefüllt.
3. Klicken Sie anschließend in den Einstellungen auf „Benutzer erstellen“ und gehen Sie dann zu Ihrer Hue Bridge (Ihrem Gerät), um die runde Taste zu drücken. Sie haben 30 Sekunden Zeit. Nach dem Drücken der Taste wird im Feld „Bridge-Benutzer“ eine automatisch generierte Zeichenfolge angezeigt.
4. Ändern Sie alle weiteren Optionen in den Adaptereinstellungen und wählen Sie dann „Speichern und schließen“.
5. Abschließend sollten Sie nun alles eingerichtet haben: Der Adapter generiert alle Objekte, um Ihre Hue-Geräte entsprechend zu steuern.

Bitte beachten Sie: Die Schaltfläche „Bridge suchen“ in den Adaptereinstellungen ist inaktiv, wenn das Feld „Bridge-Adresse“ ausgefüllt ist, und die Schaltfläche „Benutzer erstellen“ ist inaktiv, wenn das Feld „Bridge-Benutzer“ ausgefüllt ist.

### Einstellungen

| Name                                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Brückenadresse**                    | Die IP-Adresse Ihrer Hue Bridge können Sie durch Drücken dieser Taste ermitteln.`Find Bridge` Taste.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Hafen**                             | Port Ihrer Hue Bridge, normalerweise 443 (SSL) und 80 (nicht-SSL).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **SSL**                               | Wenn diese Option aktiviert ist, wird die Verbindung über SSL gesichert, der Port ändert sich automatisch auf 443 (die Verwendung von SSL wird dringend empfohlen).                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Benutzer**                          | Benutzername Ihres Bridge-Benutzers. Sie können ihn erstellen, indem Sie die entsprechende Taste drücken.`Create User` Drücken Sie die entsprechende Taste und folgen Sie den Anweisungen auf dem Bildschirm.                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Szenen ignorieren**                 | Wenn diese Option aktiviert ist, werden die Szenen nicht vom Adapter angezeigt/gesteuert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Gruppen ignorieren**                | Wenn diese Option aktiviert ist, werden Gruppen vom Adapter nicht angezeigt/gesteuert.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **„Legacy“-Struktur**                 | Um die Abwärtskompatibilität zu gewährleisten, ist es möglich, eine alte Objektstruktur in ioBroker zu speichern. Diese alte Struktur ist`hue.<instance_number>.<bridge_name_channel>.<light_or_group_channel>.<state>` Die neue Struktur beseitigt`<bridge_name_channel>` Daher ist es notwendig, alte Skripte usw. anzupassen. Wenn der Adapter eine bestehende alte Struktur erkennt, wird diese ohne Aktivierung des Kontrollkästchens verwendet. Soll jedoch von der alten zur neuen Struktur migriert werden, muss die gesamte Struktur gelöscht werden.`hue.<instance_number>` einmalig einen Namespace erstellen. |
| **Natives Ein-/Ausschaltverhalten**   | Ist diese Option aktiviert, schaltet der Adapter die Lampen genauso ein und aus wie die Hue-App. Andernfalls leuchten die Lampen beim Einschalten mit 100 % Helligkeit. Ist eine Gruppe bereits eingeschaltet, wirkt sich die Helligkeitsanpassung nur auf die bereits eingeschalteten Lampen aus; ausgeschaltete Lampen werden nicht eingeschaltet.                                                                                                                                                                                                                                                                      |
| **Synchronisierungssoftwaresensoren** | Synchronisieren Sie auch Softwaresensoren. Dies sind virtuelle Sensoren, die beispielsweise von Hue Labs-Szenen erstellt werden. Durch die Steuerung der`status` Anhand der Datenpunkte eines solchen Sensors lassen sich Szenen starten/stoppen, die dieser Logik folgen. In den meisten Fällen`0` schaltet die Szene aus und`1` schaltet es ein.                                                                                                                                                                                                                                                                        |
| **Schalten Sie mit anderen ein**      | Schalten Sie die Beleuchtung auch mit CT-Status, Farbstatus usw. ein. Einstellen auf`false` und schalten sich nur bei eingeschalteter Stromversorgung und Helligkeit ein.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Umfragen**                          | Ist diese Option aktiviert, fragt der Adapter Zustandsänderungen ab; andernfalls kann er nur zur Steuerung von Lampen verwendet werden, nicht aber zur Anzeige ihres Status.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Abstimmungsintervall**              | Legt fest, wie oft die Zustände abgefragt und somit in ioBroker aktualisiert werden. Kurze Abfrageintervalle können in bestimmten Umgebungen zu Leistungsproblemen führen. Daher beträgt das minimal zulässige Abfrageintervall 2 Sekunden. Wird das Abfrageintervall auf weniger als 2 Sekunden eingestellt, wird es zur Laufzeit auf 2 Sekunden festgelegt.                                                                                                                                                                                                                                                             |

### Befehle

Befehlszustände (z. B.`hue.0.All.command` ) kann verwendet werden, um mehrere Befehle an die Brücke zu senden. Dies ermöglicht es, eine Gruppe oder ein Licht mithilfe einer Übergangszeit in einen bestimmten Zustand zu versetzen.

```javascript
setState('hue.0.All.command', { "bri": 50, "transitiontime": 30 }, false);
```

Für Gruppen, die Szenen enthalten, wie`hue.0.Wohnzimmer.scene_hell` Die Szenen können auch mit einer Übergangszeit aktiviert werden. Dazu übergeben Sie das Szenenargument an den entsprechenden Befehl.

```javascript
setState('hue.0.All.Wohnzimmer', { "scene": "hell", "transitiontime": 30 }, false);
```

### Weitere Informationen

Mit Version 3.3.0 erklärt die Gruppe:`anyOn` Und`allOn` wurden kontrollierbar, beachten Sie, dass sie sich einfach so verhalten werden.`on` Zustand, wenn kontrolliert. In manchen Fällen kann es wünschenswert sein, einen kontrollierbaren Zustand zu haben.`anyOn` Zustand in Ihrer Visualisierung.

## Deutsch :de:

Bindet Philips Hue / LivingColors / LivingWhites Lampen ein. In den Adapter-Einstellungen muss die IP der Hue Bridge sowie ein Benutzername konfiguriert werden. Um einen Benutzer zu aktivieren, drücken Sie einmal auf „Benutzer erstellen“ und drücken Sie dann innerhalb von 30 Sekunden den Button an der Hue Bridge. Dann wird der Benutzer automatisch übergeben.

## Roadmap/Aufgaben

- Automatische Brückenerkennung
- Automatische Benutzereinrichtung über Bridge-Link-Taste

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### __WORK IN PROGRESS__

### 3.16.2 (2025-04-12)
* (@foxriver76) do not try to use v2 functionality on legacy Hue bridges (closes #720)

### 3.16.1 (2025-03-07)
* (@foxriver76) fix if no tamper report is present on state creation

### 3.16.0 (2025-03-07)
* (@foxriver76) added tamper states for contact sensors

### 3.15.0 (2025-03-06)
* (@foxriver76) added support for contact sensors

### 3.14.1 (2025-02-01)
* (@foxriver76) improved error handling for smart scenes

### 3.14.0 (2025-01-08)
* (@foxriver76) added dynamic scenes (Note: new states are added by UUID)

### 3.13.1 (2024-10-16)
* (@foxriver76) correct min color temperature to 2000 (valid for color lights) instead of 2200

### 3.13.0 (2024-10-16)
* (@Jey-Cee) optimized settings page for mobile devices (ported to json-config)

### 3.12.0 (2024-07-14)
* (foxriver76) `level` and `bri` states of groups are now updated via push API

### 3.11.0 (2024-03-26)
* (seb2010) added possibility to use global light-scenes in commands (in addition to object-lightscene)
* (foxriver76) dropped support of node 16 (End-Of-Life)

### 3.10.2 (2023-12-25)
* (foxriver76) bring back short delay between setting and polling a group
* (foxriver76) use adapter internal timer methods

### 3.10.1 (2023-10-17)
* (foxriver76) fixed frontend/backend communication (closes #481)

### 3.10.0 (2023-08-29)
* (foxriver76) fixed problem on auto-deletion of groups
* (foxriver76) implemented Hue Tap Dial (closes #368, closes #416)

### 3.9.6 (2023-08-16)
* (foxriver76) do not set invalid states on unknown group updates
* (foxriver76) only use push connection if ssl is configured

### 3.9.5 (2023-07-31)
* (foxriver76) fixed crash case

### 3.9.4 (2023-07-30)
* (foxriver76) fixed the edge case crash on button updates
* (foxriver76) fixed crash case if uuids cannot be retrieved

### 3.9.3 (2023-06-14)
* (foxriver76) fixed crash cases on unknown push updates (closes #417)

### 3.9.2 (2023-06-13)
* (foxriver76) fixed sensor converting (closes #415)

### 3.9.1 (2023-06-13)
* (foxriver76) implemented more commands of the Push API (mainly buttons)

### 3.9.0 (2023-06-11)
* (foxriver76) implemented poll API (closes #227, #343)
* (foxriver76) fixed polling not working (closes #408, #410)

### 3.8.0 (2023-06-09)
* (Schmakus) Possibility to disable turn on lights with states other than `on` and `brightness` [#386]

### 3.7.1 (2022-07-12)
* (Eistee82) also update state for `CLIPGenericFlag` sensors

### 3.7.0 (2022-05-30)
* (foxriver76) support software sensor `CLIPGenericFlag` (closes #328)

### 3.6.5 (2022-01-11)
* (foxriver76) correctly identify third party switches (closes #273)

### 3.6.3 (2022-01-09)
* (foxriver76) added `info.connection` state (closes #268)

### 3.6.1 (2022-01-09)
* (foxriver76) ct values of groups can be even lower due to third party lights

### 3.6.0 (2021-12-30)
* (foxriver76) allow triggering scenes via `command` state, this allows starting a scene with `transitiontime`

### 3.5.31 (2021-11-20)
* (foxriver76) ct value fixed of #234 ported for 0 (All) group

### 3.5.30 (2021-11-14)
* (foxriver76) we fixed Sentry IOBROKER-HUE-1K, IOBROKER-HUE-A, IOBROKER-HUE-1J

### 3.5.29 (2021-11-14)
* (bluefox) Caught SENTRY error.

### 3.5.28 (2021-11-04)
* (foxriver76) another fixed for invalid ct values (fixes #234)

### 3.5.27 (2021-11-01)
* (foxriver76) we fixed missing object type of some scenes (closes #255)

### 3.5.26 (2021-10-20)
* (foxriver76) fixed an issue with the username set in Hue API (fixes 249)
* (klein0r) fixed translation of search popup (fixes #247)

### 3.5.25 (2021-09-15)
* (foxriver76) if we cannot determine the correct ct value, we won't set it (fixes #234)

### 3.5.23 (2021-08-26)
* (Pmant) fixed for third party devices delivering wrong ct values

### 3.5.22 (2021-08-12)
* (foxriver76) fixed several sentry issues (closes #217, closes #218, closes #219, closes #220)

### 3.5.20 (2021-08-10)
* (foxriver76) we now define minimum ct of groups to 2000 instead of 2179 (fixes #216)

### 3.5.19 (2021-06-02)
* (foxriver76) fixed crash case if we cannot get min/max ct values

### 3.5.18 (2021-06-01)
* (foxriver76) get the correct min/max ct values from api for lights (closes #192)

### 3.5.17 (2021-05-26)
* (foxriver76) prevent edge case crash (fixes #196)

### 3.5.16 (2021-05-07)
* (foxriver76) make buttons type `boolean` (closes #189)

### 3.5.15 (2021-05-05)
* (foxriver76) fixed some default type values, which produced warnings once

### 3.5.14 (2021-05-04)
* (foxriver76) protect the user token from access by foreign adapters
* (foxriver76) fixed types of default values on groups

### 3.5.13 (2021-05-03)
* (foxriver76) we fixed some more types

### 3.5.12 (2021-05-02)
* (foxriver76) we give skipped switches common.type 'mixed' instead of none
* (foxriver76) we have corrected the min max of color temperature (empirically found)

### 3.5.11 (2021-05-02)
* (foxriver76) we now update objects if a type has changed

### 3.5.10 (2021-04-30)
* (foxriver76) we removed the common.max from lightlevel, was 17,000 but can be much higher
* (foxriver76) we added common.type for states where the attribute was missing

### 3.5.9 (2021-04-30)
* (foxriver76) start this adapter in TIER 2

### 3.5.8 (2021-04-17)
* (foxriver76) minor changes

### 3.5.5 (2021-04-07)
* (foxriver76) fixed a bug where an error on user creation crashed the adapter instance

### 3.5.4 (2021-03-25)
* (foxriver76) fixing several edge case crashes

### 3.5.2 (2021-02-24)
* (foxriver76) fixed crashes if wrong data type or invalid value passed for ct and hue, now logging an error
* (foxriver76) fixed crashes if rgb where outside allowed range or wrong type
* (foxriver76) fixed potential crashes on bridge discovery, due to unnecessary stringify/parse logic
* (foxriver76) fixed a graphical issue with the label of bridge user when newly created, due to missing call of updateTextFields

### 3.5.1 (2021-02-20)
* (foxriver76) avoid crash cases on invalid xy, setting state for non-existing device and on failing user creation

### 3.5.0 (2021-02-18)
* (foxriver76) use official js-controller regex for replacing forbidden chars (fixes #165)
* (foxriver76) use release-script
* (foxriver76) sentry added

### 3.4.0 (2021-01-20)
* (foxriver76) we now restart the adapter automatically to add new devices if they have been added to bridge

### 3.3.11 (2021-01-12)
* (foxriver76) fixed updating `anyOn` and `allOn` if legacy structure used

### 3.3.9 (2021-01-11)
* (foxriver76) we do not set states of non-existing states anymore

### 3.3.8 (2020-10-11)
* (foxriver76) marked read-only states accordingly

### 3.3.7 (2020-10-04)
* (Apollon77) do not catch undhandeledRejections anymore, because controller can handle and report now
* (foxriver76) dependencies updated
* (foxriver76) temperature is now correctly read-only
* (foxriver76) fixed duplicate filtering on browse

### 3.3.5 (2020-06-03)
* (foxriver76) fixed issue on frontend validation of polling intervals starting with 1

### 3.3.4 (2020-06-02)
* (foxriver76) implemented fixed for problems with switches and handling id conflicts

### 3.3.3 (2020-05-31)
* (foxriver76) we now handle potential id conflicts, when adding devices from a different type with same name over time

### 3.3.2 (2020-05-15)
* (foxriver76) internal optimizations - polling after change timeout removed, was 150 ms now instant

### 3.3.0 (2020-05-14)
* (foxriver76) introduce `allOn` state for groups
* (foxriver76) `anyOn` and `allOn` are now controllable and act like the `on` state
* (foxriver76) when native turn on/off behaviour is used, the brightness change of partially turned on groups will not turn
the whole group on, like the hue app does, instead it will only change the brightness of the currently turned on lamps

### 3.2.9 (2020-05-12)
* (foxriver76) fixed issues on user creation
* (foxriver76) minor frontend (admin config) optimizations

### 3.2.8 (2020-04-26)
* (foxriver76) replace dots in light/group/sensor/.. names by underscores
* (foxriver76) fixed potential state update delay after state change on lights/groups containing blanks

### 3.2.4 (2020-04-08)
* (xXBJXx) changed role of battery to `value.battery` and made unit `%`

### 3.2.3 (2020-02-20)
* (Apollon77) minor fixed regarding handleParam called with non-existing id

### 3.2.2 (2020-02-12)
* (foxriver76) fixed potential issues when error type is not HueError

### 3.2.1 (2020-01-26)
* (foxriver76) if lights/groups/sensors are deleted during runtime, restart of adapter is no longer necessary
* (foxriver76) if controller supports recursive deletion, device will be deleted automatically

### 3.1.1 (2020-01-15)
* (foxriver76) added additional frontend validation of polling interval
* (foxriver76) if errors are hue errors, log message instead of Error

### 3.1.0 (2020-01-12)
* (foxriver76) added new indicators for entertainment groups (class and activeStream)
* (foxriver76) added possibility to enable/disable streaming of entertainment group

### 3.0.3 (2020-01-11)
* (foxriver76) fixed turning on/off switchs like Osram Plug

### 3.0.1 (2020-01-10)
* (foxriver76) removed queue, because handled by dependency now
* (foxriver76) improved error handling
* __Nodejs >= 10 required__

### 2.5.0 (2019-12-23)
* (foxriver76) implemented a mechanic to prevent regular polling of recently changed state
* (foxriver76) this prevents fluctuating of buttons on low polling intervals + possible strange triggers in scripts

### 2.4.7 (2019-12-14)
* (foxriver76) do not set default values on every adapter start
* (foxriver76) this is now done only on object creation

### 2.4.6 (2019-12-06)
* (foxriver76) log unhandeld promise rejections
* (foxriver76) fixed potential issue for negative temperature values

### 2.4.4 (2019-11-27)
* (foxriver76) only stringify huge jsons if necessary
* (foxriver76) prevent possible double polling at adapter start
* (foxriver76) use timeouts instead of interval
* (foxriver76) improved performance

### 2.4.3 (2019-11-19)
* (foxriver76) increased version of node-hue-api to fixed authentication for old bridge

### 2.4.2 (2019-11-16)
* (foxriver76) we now use nupnp + upnp to discover bridges (previously only upnp)

### 2.4.1 (2019-11-13)
* (foxriver76) added possibility to control zones and entertainment areas
* (foxriver76) log queue retires on debug instead warn
* (foxriver76) __BETA__: added possibility to control software sensors (Note: this may be handled in a more suitable fashion soon)

### 2.3.1 (2019-11-02)
* (foxriver76) fixed controlling `on` state of sensors

### 2.2.3 (2019-10-21)
* (foxriver76) migrate everything to Hue v3
* (foxriver76) add possibility to turn on/off sensor
* (foxriver76) add anyOn state for all group
* (foxriver76) different kinds of fixes for v3 (Osram Plugs, SSL connection, etc)

### 2.1.0 (2019-10-15)
* (foxriver76) usage and adaptions for node-hue-api v3
* (foxriver76) ability to turn lights on with last settings
* (foxriver76) polling interval minimum is now 2 sec

### 2.0.1 (2019-10-04)
* (foxriver76) fixed bug, that prevented some sensor states getting updated during runtime

### 2.0.0 (2019-09-23)
__ATTENTION: Remove all objects once, ids have changed__
* (foxriver76) internal optimizations
* (foxriver76) usage of iobroker testing
* (foxriver76) add possibility to sync scenes
* (foxriver76) restart adapter when room is deleted in app
* (foxriver76) fixed .hue value, user had to set 0-360° but adapter set 0-65535
* (foxriver76) fixed .color.temperature
* (foxriver76) remove unnecessary bridge channel, adapter namespace is the bridge
* (foxriver76) add "update available" indicator for light bulbs
* (foxriver76) we now poll the root endpoint instead of (|lights| + |groups| + |sensors|) endpoints every pollingInterval seconds
* (foxriver76) min poll interval now 3 seconds instead of 5 seconds
* (foxriver76) add new indicator state 'anyOn'

### 1.2.4 (2019.09.18)
* (Apollon77) Make compatible with js-controller 2.0

### 1.2.3 (2019.03.11//2019.07.07)
* (jens-maus) Refactored command queue handling to use 'bottleneck' package so that command execution are processed with minimum delay.

### 1.1.2 (2019.01.25)
* (BasGo) Added compact mode

### 1.1.1 (2018.08.17)
* (bluefox) Ignoring of groups was implemented

### 1.1.0 (2018.08.17)
* (bluefox) The command queue was optimized

### 1.0.1 (2018.08.14)
* (bluefox) Roles were adjusted
* (bluefox) temperature changed from 153-cold, 500-warm to 2200-warm, 6500-cold
* (bluefox) hue changed from 0-65535 to 0-360°

### 1.0.0 (2018.04.12)
* (arteck) Enable/Disable OSRAM check from HUE Bridge
* (arteck) polling ZLLSwitch and ZGPSwitch     
* (bluefox) admin3
* (bluefox) do not send commands ofter than 10 in 10 seconds

### 0.6.9 (2017.05.18)
* (bluefox) Enable adapter by default

### 0.6.8 (2017.04.22)
* (bluefox) Poll groups

### 0.6.7 (2017.04.21)
* (bluefox) Fix error with turn on the lamp on start
* (bluefox) configurable port

### 0.6.6 (2017.04.20)
* (bluefox) Use new version of npm library

### 0.6.0 (2016.11.30)
* (pmant) support new lamps
* (pmant) add light name to log

### 0.5.9 (2016.10.11)
* (pmant) fixed error with null values

### 0.5.8 (2016.06.05)
* (bluefox) fixed typo

### 0.5.7 (2016.06.05)
* (soef) write back known states for group/room
* (soef) Integer conversion for bri_inc command

### 0.5.6
* (Pmant) (experimental) support for power switches

### 0.5.5
* (Pmant) fixed error with xy state
* (Pmant) support level in command state

### 0.5.4
* (Pman) Lightset 0 fixed
* (Pman) support for diffent gamuts
* (Pman) support Rooms (new HUE App)

### 0.5.3
* (soef) Default Lightset 0 added

### 0.5.2
* (Pman) fixed jscs warnings
* (Pman) improve RGB conversion
* (Pman) add update rgb color

### 0.5.1
* (Pman) fixed find bridge popup

### 0.5.0
* (Pman) update to node-hue-api 1.2.x
* (Pman) add level state (bri percentage)

### 0.4.4
* (bluefox) fixed config edit

### 0.4.3
* (Pmant) fixed adapter crash

### 0.4.2
* (Pmant) add find bridge (experimental)
* (Pmant) add create user (experimental)
* (Pmant) fixed enable polling

### 0.4.1
* (Pmant) calculate and write back inc values

### 0.4.0
* (Pmant) add command state

### 0.3.2
* (Pmant) add groups as channels (write only)
* (Pmant) fixed prevent duplicate channel names

### 0.3.1
* (Pmant) fixed another bug with spaces
* (Pmant) fixed hue/sat bug
* (Pmant) fixed effect bug
* (Pmant) fixed xy colormode

### 0.3.0
* (Pmant) fixed rgb states only for color lights
* (Pmant) change set known state changes immediately
* (Pmant) change on/off sets brightness to 254/0
* (Pmant) change changing any color (hs,ct,xy) while light is off sets brightness to max
* (Pmant) fixed set brightness to zero if light is off
* (Pmant) change set bri to zero if lamp is not reachable
* (Pmant) fixed bridges and lamps with spaces in name

### 0.2.1
* (Pmant) add rgb states (write only)
* (Pmant) fixed parent/children warnings
* (Pmant) add switch light off if brightness is zero

### 0.1.4
* (bluefox) fixed some null objects

### 0.1.3
* (hobbyquaker) config UI
* (hobbyquaker) added children

### 0.1.2
* (hobbyquaker) fixes

### 0.1.1

* (hobbyquaker) fixed min/max attributes
* (hobbyquaker) added common.oper.read/write attributes

### 0.1.0

* (hobbyquaker) first release

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.hue/blob/master/CHANGELOG_OLD.md)

## License

Apache 2.0


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2017-2025 Bluefox <dogafox@gmail.com>  
Copyright (c) 2014-2016 hobbyquaker