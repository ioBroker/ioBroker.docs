---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.androidtv.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.androidtv.svg
BADGE-Number of Installations: https://iobroker.live/badges/androidtv-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/androidtv-stable.svg
BADGE-Test and Release: https://github.com/Schimi1983/ioBroker.androidtv/workflows/Test%20and%20Release/badge.svg
BADGE-GitHub Sponsors: https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white
BADGE-PayPal: https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white
---
![Logo](../../admin/androidtv.png)

# ioBroker.androidtv – Anleitung

Steuere deine **NVIDIA SHIELD**, andere **Android-TV- / Google-TV-Geräte** und **Amazon Fire TV** aus ioBroker: ein- und ausschalten, Apps starten, Fernbedienungstasten drücken und sehen, was gerade läuft.

Produktseiten: [NVIDIA SHIELD TV](https://www.nvidia.com/de-de/shield/), [Android TV / Google TV](https://www.android.com/intl/de_de/tv/), [Amazon Fire TV](https://www.amazon.de/firetv).

**Voraussetzungen:** Node.js 22, js-controller 6.0.11 und Admin 7.6.20 oder neuer. ioBroker muss das Gerät im Netzwerk erreichen. Kein Cloud-Konto nötig.

## Einrichtung

### 1. Gerät hinzufügen

Instanz-Einstellungen › Reiter **Geräte** › **Gerät hinzufügen**: Namen und **IP-Adresse** des Geräts eintragen (steht in den Netzwerkeinstellungen des Geräts; am besten im Router eine feste IP vergeben). Dann den **Gerätetyp** wählen:

| Gerätetyp | Für | Was geht | Was du einmalig machst |
| --- | --- | --- | --- |
| **Android TV / Google TV – Standard** | NVIDIA SHIELD, Chromecast mit Google TV, Fernseher mit Android TV / Google TV | Ein/Aus, Apps, Fernbedienungstasten, Lautstärke | einen Code vom Fernseher eingeben |
| **Android TV / Google TV – mit Titel und Play/Pause (ADB nötig)** | dieselben Geräte | alles oben + Titel, Play/Pause, Position | Code eingeben + am Gerät *Netzwerk-Debugging* einschalten |
| **Amazon Fire TV** | Fire TV Stick, Cube, Fernseher mit Fire TV | Ein/Aus, Apps, Fernbedienungstasten, Titel, Play/Pause | am Gerät *ADB-Debugging* einschalten |

Unsicher? Mit **Standard** anfangen – umstellen geht jederzeit.

### 2. Verbinden

**Standard:** Gerät einschalten, auf seiner Karte **Gerät koppeln** klicken und den 6-stelligen Code vom Fernseher eingeben. Fertig – der Statuspunkt auf der Karte wird grün.

**Mit Titel und Play/Pause:** wie oben koppeln. Dann am Gerät **Einstellungen › Geräteeinstellungen › Entwickleroptionen** öffnen und **Netzwerk-Debugging** einschalten (keine Entwickleroptionen? *Info* › 7× auf **Build** klicken). Manche Fernseher (z. B. Philips) brauchen zusätzlich **USB-Debugging**. Am Fernseher **„Debugging zulassen?“** mit **Immer zulassen** bestätigen.

**Amazon Fire TV:** am Fire TV **Einstellungen › Mein Fire TV › Entwickleroptionen** öffnen und **ADB-Debugging** einschalten (keine Entwickleroptionen? *Info* › 7× auf den Gerätenamen klicken). Am Fernseher **„USB-Debugging zulassen?“** mit **Immer zulassen** bestätigen.

> Mit ADB (Debugging) können auch andere Geräte in deinem Netz auf den Fernseher zugreifen. Nur im eigenen, vertrauenswürdigen Netz verwenden.

### 3. Optional: aus dem tiefen Standby einschalten

Manche Geräte (z. B. Fire TV) schalten im tiefen Standby ihr Netzwerk ab. Am Gerät **Wake on LAN** / **Netzwerk-Standby** einschalten und in den Geräte-Einstellungen (Zahnrad auf der Karte) die **MAC-Adresse** eintragen – am besten aus dem Router (bei Kabel: die MAC der LAN-Schnittstelle).

## Bedienung

Jedes Gerät erscheint als `androidtv.0.<Name>`:

| Was | Datenpunkt |
| --- | --- |
| Ein-/ausschalten, ist es an? | `power` |
| Welche App läuft? | `currentAppName` (z. B. `Netflix`), App-Kennung in `currentApp` |
| App starten | Knöpfe in `apps` |
| Fernbedienungstasten | Knöpfe in `keys` (z. B. `keys.home`, `keys.playPause`, `keys.volumeUp`) |
| Text eingeben | `sendText` |
| Was läuft gerade? | `media.title`, `media.state`, `media.position` (nicht bei *Standard*) |
| Verbunden? | `info.connected`, lesbarer Status in `info.status` |

Diese Datenpunkte nutzt du in Skripten, Blockly, Szenen oder Visualisierungen wie jeden anderen.

### Reiter Geräte

Jedes Gerät ist eine Karte mit Status und laufender App. Der Schalter aktiviert/deaktiviert das Gerät, der Controller-Knopf öffnet die Schnellsteuerung (Ein/Aus, Stumm, Lautstärke, Wiedergabe/Pause, Startseite), weitere Knöpfe koppeln, verbinden neu, ändern die Einstellungen oder entfernen das Gerät. Änderungen werden sofort gespeichert und starten die Instanz neu – die Einstellungsseite danach ohne Speichern schließen, bevor du dort etwas anderes änderst.

### App-Favoriten

Reiter **App-Favoriten**: Jeder Eintrag wird bei jedem Gerät zu einem Knopf. Den **Web-Link** oder die **App-Kennung** der App eintragen (App am Fernseher starten und `currentApp` ablesen).

| App | Android TV / SHIELD | Fire TV |
| --- | --- | --- |
| Netflix | `https://www.netflix.com/title` | gleich |
| YouTube | `https://www.youtube.com` | gleich |
| Disney+ | `https://www.disneyplus.com` | gleich |
| Prime Video | `https://app.primevideo.com` | `com.amazon.firebat` |

App-Kennungen funktionieren beim Fire TV und mit dem Gerätetyp *mit Titel und Play/Pause*. Ein Link, der nur den Webbrowser öffnen würde, wird nicht gestartet (Hinweis im Log).

## Probleme & Lösungen

- **„Kopplung erforderlich“**: neu koppeln (Schritt 2) – nötig nach dem Zurücksetzen des Geräts.
- **„Nicht verbunden“**: Das Gerät ist aus oder nicht erreichbar. Der Adapter verbindet sich von selbst neu.
- **Lässt sich nach einiger Zeit nicht mehr einschalten**: tiefer Standby – Wake-on-LAN einrichten (Schritt 3). Die MAC aus dem Router nehmen, nicht aus `info.mac` (das kann die WLAN-MAC sein). Verschiedene Netze: in den Geräte-Einstellungen die Broadcast-Adresse eintragen (z. B. `192.168.20.255`).
- **„Ausschalten“ im Menü des Geräts** fährt es ganz herunter – dann schaltet es nur noch die eigene Fernbedienung ein.
- **Die SHIELD schaltet sich nach dem Ausschalten wieder ein**: Der Fernseher weckt sie per HDMI-CEC, solange er ihren Eingang zeigt. Vorher auf einen anderen Eingang umschalten oder den Fernseher ausschalten. Mit ADB erkennt der Adapter das und zeigt `power` richtig an.
- **Der Fernseher zeigt ständig „Tastatur auf Mobilgerät verwenden“**: in den Geräte-Einstellungen (Zahnrad auf der Karte) *Aktuelle App & Texteingabe* abwählen.
- **Lautstärke zeigt nichts an**: Die Lautstärke regelt der Fernseher / AV-Receiver (HDMI-CEC); die Lautstärke-Tasten funktionieren trotzdem.
- **Kein Titel bei Netflix oder Prime Video** (Prime Video zeigt nur „PrimeVideo“): Diese Apps geben den Titel nicht an Android weiter; Play/Pause und Position funktionieren. YouTube zeigt Titel und Kanal.

Technische Details, alle Datenpunkte und bekannte Einschränkungen: [README (englisch)](https://github.com/Schimi1983/ioBroker.androidtv/blob/main/README.md#technical-details).

## Unterstützung

Der Adapter ist kostenlos. Wer Danke sagen möchte: [![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Schimi1983) [![PayPal](https://img.shields.io/badge/PayPal-Spenden-00457C?logo=paypal&logoColor=white)](https://paypal.me/Schimi1983)

Fehler und Ideen: [Issues](https://github.com/Schimi1983/ioBroker.androidtv/issues) · Fragen und Testberichte: [ioBroker-Forum](https://forum.iobroker.net/topic/85827/test-adapter-androidtv-v0.2.x-latest)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (@GermanBluefox) Added the message "help": a description of all messages and data points for AI agents (e.g. pi-agent), and `common.supportedMessages.help`
- (Schimi) `currentAppName` shows "ORF ON" on Fire TV
- (Schimi) Clearer log hint when an app ID is started without ADB
- (Schimi) Setup hint: some TVs (e.g. Philips) also need USB debugging
- (Schimi) Playback info: if several apps report playback, the app in the foreground wins; changes of the playback info are written to the debug log

### 0.3.0 (2026-11-19)

- (Schimi, Voodoo2man) Devices are now managed as cards in the tab **Devices** (ioBroker device manager): status, quick controls, pairing, reconnect, settings and remove – replaces the device table (#5, #11)
- (Voodoo2man) Disabled devices no longer show the last online status (also `power`)
- (Schimi) New data point `currentAppName`: readable name of the running app (e.g. "Netflix" instead of `com.netflix.ninja`)
- (Schimi) `power` stays correct when the TV wakes the device again via HDMI-CEC right after switching it off (short check via ADB)
- (Schimi) Clearer device type names in the settings ("standard", "with title and play/pause (ADB required)", "Amazon Fire TV") with a short explanation
- (Schimi) Documentation rewritten: shorter, requirements, tips for Wake-on-LAN, HDMI-CEC and Prime Video; German guide linked in the adapter information

### 0.2.3 (2026-11-12)

- (Schimi) Device and app IDs are now unique regardless of upper/lower case
- (Schimi) Reconnect interval, playback update interval and ADB port are checked in the adapter, not only in the settings page
- (Schimi) README: links to the supported products
- (Schimi) Pairing and connection status texts in all 11 languages (was English/German only)
- (Schimi) The object for the internal files is now created from io-package.json

### 0.2.2 (2026-10-31)

- (Schimi) Object names translated into all 11 languages

### 0.2.1 (2026-10-31)

- (Schimi) Clearer error text for an invalid MAC address, translated into all languages
- (Schimi) Fast forward and rewind buttons use the official roles `button.fastforward` / `button.fastreverse`

### 0.2.0 (2026-10-29)

- (Schimi) Wake-on-LAN: `power` = on also switches on devices in deep standby without network (enter the MAC address in the device settings; optional broadcast address in the expert settings)
- (Schimi) Faster reconnect after Wake-on-LAN

Older changes: CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 Schimi <github@world-mg.de>

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