---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miner/README.md
title: ioBroker.miner
hash: N6VVMr5r7l3q/UR60Pfkh8RpqILAlgq0AO/KxXvGNZ8=
---
![Logo](../../../en/adapterref/iobroker.miner/admin/miner.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.miner.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.miner.svg)
![Anzahl der Installationen](https://iobroker.live/badges/miner-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/miner-stable.svg)
![NPM](https://nodei.co/npm/iobroker.miner.png?downloads=true)

# IoBroker.miner
**Tests:** ![Test und Freigabe](https://github.com/SimonFischer04/ioBroker.miner/workflows/Test%20and%20Release/badge.svg)

## Miner-Adapter für ioBroker
Interaktion mit verschiedenen Krypto-Miner-APIs

## Roadmap
- [X] v0.1: Geräteverwaltung, TRM-Implementierung
- [X] Weitere Miner-Unterstützung: bos+, xmrig, avalon, ...?
- [ ] weitere Funktionen implementieren (Steuerung + Informationen von Geräten)
- [ ] Pools Unterstützung
- [ ] Geräteerkennung
- [ ] Wache
- [ ] mehr: siehe Todo.md / issues

## Verwendung
Beim Hinzufügen eines neuen Geräts in den Instanzeinstellungen (oder im Admin-Gerätemanager) sollte ein Dialogfeld wie dieses angezeigt werden:

![AddDevice.png](../../../en/adapterref/iobroker.miner/docs/AddDevice.png)

Die Optionen sollten weitgehend selbsterklärend sein. Alle Optionen verfügen außerdem über Tooltips mit weiteren Details. Sollten dennoch Fragen offen sein, können Sie diese gerne in einem Issue, einer Diskussion oder im Forum stellen.

### Brainins OS Miner-Typen
Es gibt zwei Implementierungen des Braiins-Miners, da Braiins den API-Stack über die Firmware-Generationen hinweg geändert hat:

- `bos`: Verwenden Sie dies für die offizielle Braiins OS-Firmware ab Version 23.03, typischerweise für Antminer der S19-Serie und neuer. Diese Implementierung nutzt die öffentliche Braiins OS-API (PAPI) über gRPC.
- `bosMiner`: Verwenden Sie dies für ältere Brains OS-Firmware-Versionen vor 23.03, typischerweise für Geräte vor S19 wie die Antminer-Serien S9 und S17. Dadurch wird weiterhin die ältere, CGMiner-kompatible API verwendet.

`bosMiner` unterstützt auch den Zustand `control.powerTarget`. Da das ältere Brains OS dies nicht über die CGMiner-kompatible API bereitstellt, verwendet der Adapter einen SSH-Workaround: Er meldet sich beim Miner an, aktualisiert `power_target` im Abschnitt `[autotuning]` und `timestamp` im Abschnitt `[format]` von `/etc/bosminer.toml`, speichert ein Backup unter `/etc/bosminer.toml.iobroker-power-target.bak`, stoppt `bosminer`, schreibt die Konfiguration und startet `bosminer` erneut. Konfigurieren Sie gültige SSH-Zugangsdaten für `bosMiner`-Geräte. Der Standardbenutzername lautet `root` und es wird kein Passwort benötigt.

Warnung: Die Änderung von `control.powerTarget` bei älteren `bosMiner`-Geräten erfordert einen vollständigen `bosminer`-Stop/Start-Zyklus. Ändern Sie diesen Wert nicht häufig; verwenden Sie ihn nur für gezielte Zielwertänderungen, nicht für schnelle Automatisierungsschleifen.

Wenn Sie sich nicht sicher sind, welches Gerät Sie wählen sollen, überprüfen Sie zuerst die Firmware-Generation/Gerätefamilie:

- S19/S21/T19 und neuere Brains OS-Images sind im aktuellen Firmware-Download-Ablauf aufgeführt und sollten normalerweise `bos` verwenden.
- S17-Images werden auf der Braiins-Downloadseite als `v 23.01` und S9-Images als `v 22.08.1` veröffentlicht, daher sollten diese älteren Generationen `bosMiner` verwenden.

Referenzen:

- Öffentliche API von Braiins OS: https://academy.braiins.com/braiins-os/papi-about
- Braiins OS Firmware-Downloads: https://braiins.com/os-firmware/download

## Objektmodell
Alle Objekte werden unter folgendem Pfad erstellt:

`miner.<instance>.miner.<minerId>`

`<minerId>` ist die stabile ID aus der Gerätekonfiguration (`settings.id`). Dies ermöglicht mehrere Miner-Prozesse auf demselben Host.

### Gruppen (Kanäle)
- `info`: Identitäts-/Konfigurations-/Firmware-/Verbindungsmetadaten
- `stats`: Live-Leistungsmetriken (Hashrate, Shares, Stromverbrauch, Temperaturen, ...)
- `control`: beschreibbare Steuerelemente (Start/Stopp, Neustart, ...)
- `raw`: Rohdaten der API (Experte)

### Entitäten (optionale Teilbäume)
Manche Miner legen Unterentitäten offen. Falls verfügbar, werden diese unterhalb des Miners platziert:

- `pools.<index>...`
- `hardware.gpus.<index>...`
- `hardware.hashboards.<index>...`

### Beispiele
- `miner.0.miner.<minerId>.enabled`
- `miner.0.miner.<minerId>.control.running`
- `miner.0.miner.<minerId>.stats.totalHashrate`
- `miner.0.miner.<minerId>.hardware.gpus.0.stats.temp`
- `miner.0.miner.<minerId>.raw.stats`

### Miner aktivieren/deaktivieren
Jedes Mining-Gerät verfügt über einen beschreibbaren Top-Level-Zustand `enabled`:

`miner.<instance>.miner.<minerId>.enabled`

Setzen Sie diesen Status auf `false`, um den Miner im Adapter zur Laufzeit zu deaktivieren. Deaktivierte Miner werden entladen und es findet keine Abfrage oder Steuerung für sie statt. Setzen Sie ihn wieder auf `true`, um den Miner ohne Neustart des Adapters erneut zu initialisieren.

Dies unterscheidet sich von `control.running`: `enabled` steuert, ob der Adapter den Miner überhaupt verwaltet, während `control.running` einen unterstützten Miner auffordert, mit dem Mining zu beginnen oder es zu beenden.

### Beispielbaum
Dies ist lediglich eine Übersicht/Idee/ein Plan. Noch sind nicht alle Elemente umgesetzt, aber er soll Ihnen eine Vorstellung von der geplanten Struktur und Benennung vermitteln. Die tatsächliche Umsetzung kann in einigen Details abweichen, die allgemeine Struktur sollte jedoch ähnlich sein.

```
miner.0
  miner
    <minerId>                        (device)
      enabled                        (boolean)  enable/disable adapter handling for this miner
      info                           (channel)
        minerType                    (string)   e.g. xmRig / teamRedMiner / bosMiner
        host                         (string)
        version                      (string)   (maps to feature: version)
        online                        (boolean)  derived from lastSeen
        lastSeen                     (number)   unix ms
      stats                          (channel)
        totalHashrate                (number)   H/s (maps to feature: totalHashrate)
        power                        (number)   W
        dynamicPowerTarget           (number)   W, current dynamic target reported by miner
        efficiency                   (number)   H/W
        acceptedShares               (number)
        rejectedShares               (number)
      control                        (channel)  (writable states only here, top-level)
        running                      (boolean)  start/stop (maps to feature: running)
        reboot                       (boolean)  "button"
        profile                      (string)   performance profile (e.g. low/medium/high)
        powerTarget                  (number)   W, configured target to write to miner
      pools                          (channel)
        0                            (channel)
          info
            url                      (string)
            user                     (string)
          stats
            status                   (string)
            acceptedShares           (number)
            rejectedShares           (number)
        1 ...
      hardware                       (channel)
        gpus                         (channel)
          0                          (channel)
            info
              name                   (string)
            stats
              hashrate               (number)
              temp                   (number)   °C
              fanRpm                 (number)
              power                  (number)
          1 ...
        hashboards                   (channel)  (ASICs)
          0
            stats
              hashrate               (number)
              temp                   (number)
      raw                            (channel)
        stats                        (object/string) raw miner payload (maps to feature: rawStats)
```

## Credits
- Das Logo wurde mit ChatGPT erstellt.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-07-12)
- (copilot) Adapter requires node.js >= 22 now
* (SimonFischer04) **NEW**: Added a new `bos` miner type for newer Braiins OS firmware using the Braiins Public API
* (SimonFischer04) **ENHANCED**: Extended legacy `bosMiner` devices with writable `control.powerTarget` support for deliberate power target changes
* (SimonFischer04) **NEW**: Added top-level `enabled` state to dynamically enable or disable miner handling at runtime
* (SimonFischer04) **FIXED**: Removed example configuration (option1, option2) from native section and code (fixes #126 / E5040)

### 1.0.4 (2026-04-07)
* (SimonFischer04) fix repo url in package-json

### 1.0.3 (2026-04-07)
* (SimonFischer04) increase admin requirement to fix DM (does not work at all with current stable 7.7.22)

### 1.0.2 (2026-04-07)
* (SimonFischer04) **CI/CD**: Migrated deploy workflow from NPM classic tokens to Trusted Publishing (OIDC) (fixes #80)
* (SimonFischer04) cleanup readme

### 1.0.1 (2026-04-06)
* (SimonFischer04) fix release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 SimonFischer04 <simi.fischa@gmail.com>  

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](https://github.com/SimonFischer04/ioBroker.miner/blob/main/LICENSE) for details.