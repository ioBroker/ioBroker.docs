---
chapters: {"pages":{"en/adapterref/iobroker.frontier_silicon/README.md":{"title":{"en":"FSAPI Examples"},"content":"en/adapterref/iobroker.frontier_silicon/README.md"},"en/adapterref/iobroker.frontier_silicon/states.md":{"title":{"en":"States documentation"},"content":"en/adapterref/iobroker.frontier_silicon/states.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frontier_silicon/states.md
title: Staatendokumentation
hash: y+TCc1W/jo/MrU28pP5KrkLLYgE23NfYoVB17594zAs=
---
# Staatendokumentation
Während der Adapter die Geräteeinstellungen liest, werden ioBroker-Objekte und -Zustände erstellt.
Zustände können schreibgeschützt (`ro`) oder schreibgeschützt (`rw`) sein. *OK, schreibgeschützte Schaltflächen sind auch möglich*.

- Audio

Grundlegende Audioeinstellungen. Noch keine Equalizer-Steuerung implementiert.

- maxVolume (`Zahl, ro`)

Die maximal wählbare Lautstärke

- stumm (`boolean, rw`)

`true` wenn das Gerät stummgeschaltet ist, `false` andernfalls

- Volumen (`Nummer, rw`)
  - Kontrolle
- Lautstärke runter und Lautstärke hoch

Erhöht oder verringert die Lautstärke um 1

- Gerät

- friendlyName (`string, rw`)
- Leistung (`boolean, rw`)
- radioId (`string, ro`)

Ich vermute, dass dies die MAC des Geräts ist

- Version (`string, ro`)

Softwareversion

- webfsapi (`string, ro`)

Die Adresse der API

- Infos

- Verbindung (`boolean, ro`)

Verbindungsanzeige für den Adapter

- Medien

- Status (`string, ro`)

Gültige Werte sind:

- 0: „Leerlauf“
- 1: „PUFFERUNG“
- 2: „SPIELEN“
- 3: „PAUSED“
- 4: „Neupufferung“
- 5: „FEHLER“
- 6: „GESTOPPT“
- 7: „ERROR_POPUP“

- Steuerung (`boolean, wo`)

- 0: „STOP“
- 1: „SPIELEN“
- 2: „PAUSE“
- 3: „WEITER“
- 4: „VORHERIGE“

Nehmen Sie die folgenden Namen nicht zu ernst. Das Radio verwendet sie in verschiedenen Modi unterschiedlich.

- Album (`string, ro`)
- Künstler (`string, ro`)
- Grafik (`string, ro`)

Verwenden Sie diese URL, um ein Albumcover oder das Logo eines Senders zu erhalten.

- Name (`string, ro`)
- Zeichenfolge (`string, ro`)
- Titel (`string, ro`)

- Modi

- readPresets (`boolean, wo`)

Liest alle Voreinstellungen erneut

- selectPreset (`Nummer, rw`)

Wird verwendet, um eine Voreinstellung abzurufen oder auszuwählen.
Beachten Sie, dass der Adapter rät, da dieser Wert nicht aus der API gelesen werden kann.

- ausgewählt (`Nummer, rw`)

Zeigt den gewählten Modus an bzw. wählt ihn aus. Kann auch über `modes.{number}.switchTo` ausgewählt werden.

- ausgewähltesLabel (`string, ro`)

Gibt die Bezeichnung des ausgewählten Modus an.

- `{Nummer}`

- id (`string, ro`)

Der Name dieses Modus

- Schlüssel (`Nummer, ro`)

Der Index dieses Modus. Entspricht `mode.{number}` aus dem Objektbaum und kann in `modes.selected` geschrieben werden.

- wählbar (`boolean, ro`)

`true`, wenn dieser Modus manuell ausgewählt werden kann.

- streambar (`boolean, ro`)

Nur auf Multiroom-fähigen Geräten vorhanden. `true`, wenn dieser Modus als Quelle für mehrere Multiroom-Geräte verwendet werden kann.

- switchTo (`boolean, wo`)

Wählt diesen Modus aus.

- Voreinstellungen

- verfügbar (`boolean, ro`)

Zeigt an, ob Voreinstellungen für diesen Modus verfügbar sind

- `{Nummer}`

Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}.key`.

- Schlüssel (`Nummer, ro`)

Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}` aus dem Objektbaum und kann in `modes.selectPreset` geschrieben werden.

- Name (`string, ro`)

Der Name dieser Voreinstellung

- Rückruf (`boolean, wo`)

Wählt diese Voreinstellung **und** den entsprechenden Modus aus.

Bitte beachten Sie, dass Sie manchmal zwischen „Knopfdruck“ und „Werteinstellung“ wählen können. Nutzen Sie die Option, die für Sie bequemer ist.