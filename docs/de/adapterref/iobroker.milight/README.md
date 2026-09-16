---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.milight/README.md
title: ioBroker.milight
hash: gH5MmGu2CA0Hmsc6WrFnc9b5uy994z34NNheypNY4oA=
---
![Logo](../../../en/adapterref/iobroker.milight/admin/easybulb_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/milight-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.milight.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.milight.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.milight.png?downloads=true)

# ioBroker.milight

Adapter für ioBroker für LED-Lampen wie milight, easybulb, limitless

## Allgemeine Einstellungen:

auf der Admin-Seite

- IP-Adresse -> IP-Adresse der Brücke
- Port -> Port der Brücke
- delaybetweenPackages -> ms Verzögerung zwischen UDP-Paketen (100 ms für v5)
- repeatPackage -> Anzahl der Wiederholungen (1 für v5)
- Version des MiLight-Protokolls v5 oder v6 -> legt automatisch den entsprechenden Port fest
- Volle Helligkeit einstellen, wenn in den Weißmodus gewechselt wird

## Lampentypen in den Zonen:

auf der Admin-Seite

- Basic = Bridge NUR für Zone 1 und V6
- RGBWW = Vollfarblampe mit weißer LED und Farbtemperatureinstellung (höhere Farbtemperatur bedeutet kühlere Farben), NUR in Version 6
- RGB = reine Farblampe ohne Weiß, NUR für Zone 1
- RGBW = Farblampe mit weißer LED
- Weiß = WW/CW-Weißlichtlampe mit Farbtemperaturanpassung (höhere Farbtemperatur bedeutet kühlere Farbwiedergabe)

Mit Zone0 oder ZoneAll können Befehle an alle 4 Zonen gesendet werden. Der Adapter wird in Version 6 mit Basis-/Brückenbefehlen und in Version 5 mit RGBW-Befehlen konfiguriert.

## Staaten in Version 6

|                     verfügbarer Zustand                    |         Grund-/Brückenprogramm         |                 Weiß                 |                  RGB                 |                  RGBW                  |                  RGBWW                 |
| :--------------------------------------------------------: | :------------------------------------: | :----------------------------------: | :----------------------------------: | :------------------------------------: | :------------------------------------: |
|                    EIN/AUS als Schalter                    |        Zustand(Zone1), Funktion        |        Zustand(Zone), Funktion       |       Zustand(Zone1), Funktion       |         Zustand(Zone), Funktion        |         Zustand(Zone), Funktion        |
|                        EIN als Taste                       |            on(zone1), native           |           on(zone), native           |           on(zone1), native          |            on(zone), native            |            on(zone), native            |
|                        AUS als Taste                       |           aus (Zone 1), nativ          |           aus(Zone), nativ           |          aus (Zone 1), nativ         |            aus(Zone), nativ            |            aus(Zone), nativ            |
|              Farbmodus als boolescher Zustand              |                                        |                                      |                                      |  Farbmodus (0=Nachtmodus, 1=Weißmodus) |  Farbmodus (0=Nachtmodus, 1=Weißmodus) |
|                  maxWhite als Schaltfläche                 |                                        |        maxBright(zone), native       |                                      |                                        |                                        |
|                 Weißmodus als Schaltfläche                 |        whiteMode(zone1), native        |                                      |                                      |         whiteMode(zone), native        |         whiteMode(zone), native        |
|                    Nachtmodus als Taste                    |                                        |        Nachtmodus(Zone), nativ       |                                      |         Nachtmodus(Zone), nativ        |         Nachtmodus(Zone), nativ        |
|                Helligkeit als Wert (0-100%)                |        Helligkeit (Zone), nativ        |                                      |                                      |        Helligkeit (Zone), nativ        |        Helligkeit (Zone), nativ        |
|                Farbe als 3 Hexadezimalwerte                |           Farbe(Zone), nativ           |                                      |          Farbe(Zone), nativ          |           Farbe(Zone), nativ           |           Farbe(Zone), nativ           |
|        RGB als kombinierter Wert (#000000 - #FFFFFF)       |            rgb(Zone), nativ            |                                      |           rgb(Zone), nativ           |            rgb(Zone), nativ            |            rgb(Zone), nativ            |
|                       Modus als Wert                       |           Modus(Zone), nativ           |                                      |                                      |           Modus(Zone), nativ           |           Modus(Zone), nativ           |
|                modeSpeedUp als Schaltfläche                |                                        |       modeSpeedUp(zone), native      |                                      |       modeSpeedUp (zone), native       |       modeSpeedUp (zone), native       |
|                   modeSpeedDown als Taste                  |                                        |      modeSpeedDown (Zone), nativ     |                                      |       modeSpeedDown(zone), native      |       modeSpeedDown(zone), native      |
|                    Link als Schaltfläche                   |                                        |                                      |                                      |            Link(Zone), nativ           |            Link(Zone), nativ           |
|      Als Schaltfläche „Verknüpfung aufheben“ entfernen     |                                        |                                      |                                      |          unlink(zone), native          |          unlink(zone), native          |
|                   Sättigungswert (0-100%)                  |                                        |                                      |                                      |                                        |         Sättigung (Zone), nativ        |
| Farbtemperatur als Wert (0-100 entspricht 2700K bis 6500K) |                                        |                                      |                                      |                                        |      Farbtemperatur (Zone), nativ      |
|                Helligkeit erhöhen als Taste                |   Helligkeit erhöhen (Zone), Funktion  |   Helligkeitserhöhung (Zone), nativ  |   Helligkeitserhöhung (Zone), nativ  |   Helligkeit erhöhen (Zone), Funktion  |   Helligkeit erhöhen (Zone), Funktion  |
|               Helligkeit verringern als Taste              | Helligkeit verringern (Zone), Funktion | Helligkeitsreduzierung (Zone), nativ | Helligkeitsreduzierung (Zone), nativ | Helligkeit verringern (Zone), Funktion | Helligkeit verringern (Zone), Funktion |
|              Farbe nach oben als Schaltfläche              |         colorUp(zone), Funktion        |                                      |                                      |         colorUp(zone), Funktion        |         colorUp(zone), Funktion        |
|              Farbe nach unten als Schaltfläche             |     Farbe Abwärts (Zone), Funktion     |                                      |    Farbe Abwärts (Zone), Funktion    |     Farbe Abwärts (Zone), Funktion     |                                        |
|            Sättigung erhöhen (als Schaltfläche)            |                                        |                                      |                                      |                                        |   Sättigung erhöhen (Zone), Funktion   |
|           Sättigung verringern (als Schaltfläche)          |                                        |                                      |                                      |                                        |  Sättigung reduzieren (Zone), Funktion |
|                colorTempUp als Schaltfläche                |                                        |       colorTempUp (Zone), nativ      |                                      |                                        |      colorTempUp (Zone), Funktion      |
|               colorTempDown als Schaltfläche               |                                        |      colorTempDown (Zone), nativ     |                                      |                                        |     colorTempDown (Zone), Funktion     |
|                  Farbton als Wert (0-360)                  |                                        |                                      |                                      |        Farbton (Zone), Funktion        |        Farbton (Zone), Funktion        |

## Staaten in Version 5/ Version 4

|                verfügbarer Zustand                |                   RGB                  |           Weiß          |                      RGBW                      |
| :-----------------------------------------------: | :------------------------------------: | :---------------------: | :--------------------------------------------: |
|                EIN/AUS als Schalter               |         Zustand(Zone), Funktion        | Zustand(Zone), Funktion |             Zustand(Zone), Funktion            |
|                   EIN als Taste                   |            on(zone), native            |     on(zone), native    |                on(zone), native                |
|                   AUS als Taste                   |            aus(Zone), nativ            |     aus(Zone), nativ    |                aus(Zone), nativ                |
|          Farbmodus als boolescher Zustand         |                                        |                         | colorMode (0/hs=whiteMode, 1/ct=color(hue=55)) |
|             maxWhite als Schaltfläche             |                                        | maxBright(zone), native |                                                |
|             Weißmodus als Schaltfläche            |                                        |                         |             whiteMode(zone), native            |
|                Nachtmodus als Taste               |                                        |                         |             Nachtmodus(Zone), nativ            |
|           Farbe als Farbtonwert (0-255)           |                                        |                         |              Farbton, einheimisch              |
|   RGB als kombinierter Wert (#000000 - #FFFFFF)   |                                        |                         |                   RGB, nativ                   |
|            colorTempUp als Schaltfläche           |                                        |   wärmer, einheimische  |                                                |
|           colorTempDown als Schaltfläche          |                                        |   kühler, einheimische  |                                                |
|            Helligkeit als Wert (0-100%)           |                                        |                         |                Helligkeit, nativ               |
| Helligkeit als Wert (0-100%), erweiterter Bereich |                                        |                         |                                                |
|          effectModeNext als Schaltfläche          |                                        |                         |             effectModeNext, native             |
|           Als Schaltfläche beschleunigen          |             speedUp, native            |                         |              effectSpeedUp, native             |
|        Geschwindigkeit verringern als Taste       |            speedDown, native           |                         |     EffektGeschwindigkeitVerringern, nativ     |
|            als Schaltfläche „Aufhellen“           |            brightUp, native            |     brightUp, native    |                                                |
|              als Taste hell herunter              |           brightDown, native           |    brightDown, native   |                                                |
|          effectModeNext als Schaltfläche          |          effectSpeedUp, native         |                         |                                                |
|          effectModePrev als Schaltfläche          | EffektGeschwindigkeitVerringern, nativ |                         |                                                |

effectSpeedUp/Down hat unterschiedliche Bedeutungen (bei RGB ändert es den Modus, bei RGBW ändert es die Geschwindigkeit)!

## Konfiguration:

auf der Admin-Seite der Adapterversion 5, die auch für Lampen der Version 4 verwendet werden kann.

## TODO:

- ??

## Bekannte Probleme:

- ??

## Changelog

### **WORK IN PROGRESS**
- (iobroker-bot) Adapter requires node.js >= 20 now.:
### 0.4.0
* compact mode
### 0.3.6
* (foxthefox) node-milight-promise 0.3.1 (former version 0.2.32)

### 0.3.5
* (mrinc)     fix for the v5 color setting (was always blue)
* (foxthefox) nightModeSwitch added on white bulbs for command from Alexa

### 0.3.4
* (foxthefox) adminv3 added

### 0.3.3
* (foxthefox) setting of state after usage of command OFF/ON
* (foxthefox) v6 widget for RGBW; RGBWW mode switch night/weiß instead weiß/farbe
* (foxthefox) v6 widget for RGBW, RGBWW speedup/down correction, no hide of color temp vs. color when switching night/weiß
* (foxthefox) v5 widget for RGBW with color changing to matching the selected color
* (foxthefox) v6 widget for RGBWW with colortemperature changing to matching the selected colortemperature

### 0.3.2
* (foxthefox) V5 uses brightUp/brightDown instead brightnessUp/brightnessDown
* (foxthefox) corrections in V5 for white Commands (cooler/warmer/maxBright)
* (foxthefox) new RGBWW V6 widget
* (foxthefox) update for effects and correctios in RGBW V6 widget
* (foxthefox) added CW/WW widget V4 and V6
* (foxthefox) added disco button in RGBW V4

### 0.3.1
* (bluefox) added checking of methods before calling them

### 0.3.0
* (foxthefox) cleanup of states
* (foxthefox) added white/rgb lamp
* (foxthefox) correction of mismatch RGBW/RGBWW in v6
* (foxthefox) v6 brightness only 0-0x64(100)

### 0.2.2/0.2.1
* (foxthefox) debug messages with v5/v6 prefix; v6 colorset->colormode

### 0.2.0 
* (bluefox) discovery for v6

### 0.1.1
* (foxthefox) switch lamp on with full brightness -> checkbox in admin for v5

### 0.1.0
* (foxthefox) tested with bridge version 4 and protocol version v5
* (bluefox)v6 implementation
* (foxthefox) node-milight-promise 0.0.9
* (foxthefox) jqui widget RGBW lamp

### 0.0.1
* (foxthefox) initial setup

## License

The MIT License (MIT)

Copyright (c) 2018-2026 foxthefox <foxthefox@wysiwis.net>