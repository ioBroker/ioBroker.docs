---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.milight/README.md
title: ioBroker.milight
hash: qErBHu72dxLHQ4Qw9RqTJzzOvk+r3FR4JZKRKiDV7+k=
---
![Logo](../../../en/adapterref/iobroker.milight/admin/easybulb_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/milight-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.milight.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.milight.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.milight.png?downloads=true)

# IoBroker.milight
Adapter für ioBroker für LED-Lampen wie Milight, Easybulb, Limitless

## Allgemeine Einstellungen:
auf der Admin-Seite

* IP-Adresse-> IP der Bridge
* Port -> Hafen der Brücke
* delaybetweenPackages -> ms Verzögerung zwischen UDP-Paketen (100 ms für v5)
* repeatPackage -> Anzahl der Wiederholungen (1 für v5)
* Version des Milight-Protokolls v5 oder v6 -> setzt automatisch den entsprechenden Port
* Einstellung der vollen Helligkeit beim Wechsel in den Weißmodus

## Art der Glühbirnen in den Zonen:
auf der Admin-Seite

* Basic = Bridge NUR für Zone 1 und v6
* RGBWW = Vollfarbbirne mit weißer LED und Farbtemperaturanpassung (höhere Farbtemperatur bedeutet kühlere Farbe), NUR in v6
* RGB = reine Farbbirne ohne Weiß NUR für Zone 1
* RGBW = Farbbirne mit weißer LED
* Weiß = WW/CW-Weißbirne mit Farbtemperaturanpassung (höhere Farbtemperatur bedeutet kühlere Farbe)

Über Zone0 oder ZoneAll können Befehle an alle 4 Zonen gegeben werden, der Adapter ist in v6 mit Basis-/Bridge-Befehlen und in v5 mit RGBW-Befehlen konfiguriert.

## Zustände in Version 6
| verfügbarer Status | Basic/Bridge | Weiß | RGB | RGBW | RGBWW |
|:-------------------------------------------:|:--------------------------------:|:------------------------------:|:------------------------------:|:-------------------------------------:|:--------------------------------------:|
| EIN/AUS als Schalter | Zustand(Zone1), Funktion | Zustand(Zone), Funktion | Zustand(Zone1), Funktion | Zustand(Zone), Funktion | Zustand(Zone), Funktion | Zustand(Zone), Funktion |
| EIN als Schaltfläche | Ein(Zone1), nativ | Ein(Zone), nativ | Ein(Zone1), nativ | Ein(Zone), nativ | Ein(Zone), nativ | Ein(Zone), nativ |
| AUS als Schaltfläche | Aus(Zone1), nativ | Aus(Zone), nativ | Aus(Zone1), nativ | Aus(Zone), nativ | Aus(Zone), nativ | Aus(Zone), nativ |
| Farbmodus als boolescher Status | | | | Farbmodus (0=Nachtmodus, 1=Weißmodus) | Farbmodus (0=Nachtmodus, 1=Weißmodus) |
| maxWhite als Schaltfläche | | maxBright(Zone), nativ | | | |
| whiteMode als Schaltfläche | whiteMode(Zone1), nativ | | | whiteMode(Zone), nativ | whiteMode(Zone), nativ |
| Nachtmodus als Schaltfläche | | Nachtmodus(Zone), nativ | | Nachtmodus(Zone), nativ | Nachtmodus(Zone), nativ |
| Helligkeit als Wert (0–100 %) | Helligkeit (Zone), nativ | | | Helligkeit (Zone), nativ | Helligkeit (Zone), nativ |
| Farbe als 3 Hex-Werte | Farbe(Zone), nativ | | Farbe(Zone), nativ | Farbe(Zone), nativ | Farbe(Zone), nativ | Farbe(Zone), nativ |
| rgb als kombinierter Wert (#000000 - #FFFFFF) | rgb(Zone), nativ | | rgb(Zone), nativ | rgb(Zone), nativ | rgb(Zone), nativ | rgb(Zone), nativ |
| Modus als Wert | Modus(Zone), nativ | | | Modus(Zone), nativ | Modus(Zone), nativ |
| modeSpeedUp als Schaltfläche | | modeSpeedUp(Zone), nativ | | modeSpeedUp (Zone), nativ | modeSpeedUp (Zone), nativ |
| modeSpeedDown als Schaltfläche | | modeSpeedDown (Zone), nativ | | modeSpeedDown(Zone), nativ | modeSpeedDown(Zone), nativ |
| Link als Schaltfläche | | | | Link(Zone), nativ | Link(Zone), nativ |
| Verknüpfung als Schaltfläche aufheben | | | | Verknüpfung (Zone), nativ | Verknüpfung (Zone), nativ |
| Sättigung als Wert (0-100%) | | | | | Sättigung (Zone), nativ |
| colorTemp als Wert (0-100 entspricht 2700 K bis 6500 K) | | | | | colorTemp (Zone), nativ |
| HelligkeitErhöhen als Schaltfläche | HelligkeitErhöhen (Zone), Funktion | HelligkeitErhöhen (Zone), nativ | HelligkeitErhöhen (Zone), nativ | HelligkeitErhöhen (Zone), Funktion | HelligkeitErhöhen (Zone), Funktion |
| HelligkeitNachunten als Schaltfläche | HelligkeitNachunten (Zone), Funktion | HelligkeitNachunten (Zone), nativ | HelligkeitNachunten (Zone), nativ | HelligkeitNachunten (Zone), Funktion | HelligkeitNachunten (Zone), Funktion |
| colorUp als Schaltfläche | colorUp(Zone), Funktion | | | colorUp(Zone), Funktion | colorUp(Zone), Funktion |
| Farbe Ab als Schaltfläche | Farbe Ab (Zone), Funktion | | Farbe Ab (Zone), Funktion | Farbe Ab (Zone), Funktion | |
| saturationUp als Schaltfläche | | | | | saturationUp (Zone), Funktion |
| saturationDown als Schaltfläche | | | | | saturationDown (Zone), Funktion |
| colorTempUp als Schaltfläche | | colorTempUp (Zone), nativ | | | colorTempUp (Zone), Funktion |
| colorTempDown als Schaltfläche | | colorTempDown (Zone), nativ | | | colorTempDown (Zone), Funktion |
| Farbton als Wert (0-360) | | | | Farbton (Zone), Funktion | Farbton (Zone), Funktion |

## Zustände in Version 5/ Version 4
| verfügbarer Status | RGB | Weiß | RGBW |
|:---------------------------------------------:|:-----------------------:|:-----------------------:|:----------------------------------------:|
| EIN/AUS als Schalter | Zustand(Zone), Funktion | Zustand(Zone), Funktion | Zustand(Zone), Funktion |
| EIN als Schaltfläche | Ein(Zone), nativ | Ein(Zone), nativ | Ein(Zone), nativ |
| AUS als Schaltfläche | Aus(Zone), nativ | Aus(Zone), nativ | Aus(Zone), nativ |
| Farbmodus als boolescher Status | | | Farbmodus (0/hs=Weißmodus, 1/ct=Farbe(Farbton=55)) |
| maxWhite als Schaltfläche | | maxBright(Zone), nativ | |
| whiteMode als Schaltfläche | | | whiteMode(Zone), nativ |
| Nachtmodus als Schaltfläche | | | Nachtmodus(Zone), nativ |
| Farbe als Farbtonwert (0-255) | | | Farbton, nativ |
| rgb als kombinierter Wert (#000000 - #FFFFFF) | | | rgb, nativ |
| colorTempUp als Schaltfläche | | wärmer, nativ | |
| colorTempDown als Schaltfläche | | kühler, nativ | |
| Helligkeit als Wert (0-100%) | | | Helligkeit, nativ |
| Helligkeit als Wert (0-100%), erweiterter Bereich | | | |
| effectModeNext als Schaltfläche | | | effectModeNext, nativ |
| SpeedUp als Schaltfläche | SpeedUp, nativ | | EffectSpeedUp, nativ |
| speedDown als Schaltfläche | speedDown, nativ | | effectSpeedDown, nativ |
| brightUp als Schaltfläche | brightUp, nativ | brightUp, nativ | |
| brightDown als Schaltfläche | brightDown, nativ | brightDown, nativ | |
| effectModeNext als Schaltfläche | effectSpeedUp, nativ | | |
| effectModePrev als Schaltfläche | effectSpeedDown, nativ | | |

effectSpeedUp/Down hat unterschiedliche Bedeutung (bei RGB ändert sich der Modus, bei RGBW ändert es die Geschwindigkeit)!

## Konfiguration:
in der Admin-Seite des Adapters Version 5 auch für v4-Lampen verwendbar

## ZU TUN:
* ??

## Bekannte Probleme:
* ??

## Changelog
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

Copyright (c) 2018 - 2020 foxthefox <foxthefox@wysiwis.net>