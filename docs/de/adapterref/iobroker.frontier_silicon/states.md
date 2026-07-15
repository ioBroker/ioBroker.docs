---
chapters: {"pages":{"en/adapterref/iobroker.frontier_silicon/README.md":{"title":{"en":"FSAPI Examples"},"content":"en/adapterref/iobroker.frontier_silicon/README.md"},"en/adapterref/iobroker.frontier_silicon/states.md":{"title":{"en":"States documentation"},"content":"en/adapterref/iobroker.frontier_silicon/states.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frontier_silicon/states.md
title: Dokumentation der Staaten
hash: m7GbrKvPlQzlicPjl2Smtwt6dhj8UPevPNzVmdBw5wY=
---
# Dokumentation der Staaten
Während der Adapter die Geräteeinstellungen liest, werden ioBroker-Objekte und Zustände erstellt.
Zustände können schreibgeschützt (`ro`) oder beschreibbar (`rw`) sein. *Auch für Tasten ist ein schreibgeschützter Zustand möglich.*

- Audio

Grundlegende Audioeinstellungen. Noch keine Equalizer-Steuerung implementiert.

- maxVolume (`number, ro`)

Die maximal wählbare Lautstärke

- mute (`boolean, rw`)

`true` wenn das Gerät stummgeschaltet ist, `false`ansonsten

- volume (`number, rw`)
  - Kontrolle
- Lautstärke leiser und Lautstärke lauter

In-/ verringert das Volumen um 1

- Gerät

- friendlyName (`string, rw`)
- Macht (`boolean, rw`)
- radioId (`string, ro`)

Ich vermute, dass dies die MAC-Adresse des Geräts ist.

- version (`string, ro`)

Softwareversion

- webfsapi (`string, ro`)

Die Adresse der API

- Info

- Verbindung (`boolean, ro`)

Verbindungsanzeige für den Adapter

- Medien

- state (`string, ro`)

Gültige Werte sind:

- 0: „LEERLAUF“
- 1: „Pufferung“
- 2: „SPIELEN“
- 3: „PAUSIERT“
- 4: „Wiederauffüllen“
- 5: „FEHLER“
- 6: „GESTOPPT“
- 7: „ERROR_POPUP“

- control (`boolean, wo`)

- 0: „STOP“
- 1: „SPIELEN“
- 2: „PAUSE“
- 3: „NÄCHSTES“
- 4: „VORHERIG“

Nehmen Sie die folgenden Bezeichnungen nicht allzu ernst. Das Radio verwendet sie in verschiedenen Betriebsmodi unterschiedlich.

- Album (`string, ro`)
- Künstler (`string, ro`)
- graphic (`string, ro`)

Über diese URL erhalten Sie ein Albumcover oder das Logo eines Senders.

- name (`string, ro`)
- string (`string, ro`)
- title (`string, ro`)

- Modi

- currentNavIndex (`number, ro`)

Gibt den Index in der aktuellen Navigationsliste an.
Die vollständige Navigationsliste wird in Blöcken von 25 Elementen gelesen.
Der native Teil dieses Objekts enthält außerdem weitere Eigenschaften der aktuellen Navigation, wie alle Navigationsnamen, die Anzahl der Elemente in der aktuellen vollständigen Navigationsliste sowie den Typ und Subtyp der Elemente, auf die der Index verweist.
Navigationstypen: "0": "Verzeichnis", "1": "Abspielbares Element", "2": "Suchverzeichnis", "3": "Unbekannt", "4": "Formularelement", "5": "Nachrichtelement", "6": "AmazonLogin" Navigationssubtypen: "0": "Keine", "1": "Sender", "2": "Podcast", "3": "Titel", "4": "Text", "5": "Passwort", "6": "Optionen", "7": "Absenden", "8": "Schaltfläche", "9": "Deaktiviert"

- currentNavKey (`number, rw`)

Zeigt den ausgewählten Schlüssel der vollständigen Navigationsliste an oder legt ihn fest.

- currentNavList (`string, ro`)

Ein JSON-formatierter String des aktuell ausgewählten Navigationsmenüpunkts.

Es handelt sich um ein Schlüssel-Wert-Paar, das alle Eigenschaften jedes Elements enthält, z. B.:

{"key":"116","name":"1LIVE diGGi ","type":"1","subtype":"1","graphicuri":"","artist":"","contextmenu":"0"}. Dieser String kann von einem JavaScript-Skript verwendet werden, um dynamisch ein JSON-Objekt oder eine HTML-Seite für die Verwendung in einem Mediaplayer-Widget zu generieren.

- currentNavName (`string, ro`)

Der Name des aktuell ausgewählten Elements der Navigationsliste, z. B. Verzeichnis oder abspielbares Element.

- navigationBack (`boolean, wo`)

Im Navigationsbaum eine Ebene zurücknavigieren

- navigationDown (`boolean, wo`)

Navigieren Sie innerhalb der aktuellen Ebene der Navigationsstruktur nach unten.

- navigationUp (`boolean, wo`)

Navigieren Sie innerhalb der aktuellen Ebene der Navigationsstruktur nach oben.

- navigationSelect (`boolean, wo`)

Wählt das aktuell indizierte Element aus. Dadurch wird die nächste Ebene im Navigationsbaum geöffnet, falls es sich beim ausgewählten Element um ein Verzeichnis handelt. Ist das ausgewählte Element abspielbar, wird die Wiedergabe automatisch gestartet.

- navigationHome (`boolean, wo`)

Navigieren Sie zurück zur obersten Ebene der Navigationsstruktur.

- navigationSearch (`string, rw`)

Hier können Sie einen Suchbegriff eingeben, der an das Gerät gesendet wird. Die Suche startet jedoch erst, wenn Sie die Navigationsauswahltaste drücken und das ausgewählte Element vom Typ „Suchverzeichnis“ ist. Der Suchbegriff sollte kurz vor dem Drücken der Navigationsauswahltaste eingegeben werden.

- presetDown (`boolean, wo`)

Navigieren Sie in den Voreinstellungen des aktuellen Modus nach unten. Der nächste Sender oder Titel wird automatisch abgespielt.

- presetUp (`boolean, wo`)

Navigieren Sie innerhalb der Voreinstellungen des aktuellen Modus nach oben. Der nächste Sender oder Titel wird automatisch abgespielt.

- readPresets (`boolean, wo`)

Liest alle Voreinstellungen erneut ein

- selectPreset (`number, rw`)

Dient zum Abrufen oder Auswählen einer Voreinstellung.
Beachten Sie, dass der Adapter diesen Wert schätzt, da er nicht über die API ausgelesen werden kann.

- ausgewählt (`number, rw`)

Zeigt den ausgewählten Modus an oder wählt ihn aus. Kann auch über `modes.{number}.switchTo` ausgewählt werden.

- selectedLabel (`string, ro`)

Zeigt die Bezeichnung des ausgewählten Modus an.

- `{number}`

- id (`string, ro`)

Der Name dieses Modus

- Schlüssel (`number, ro`)

Der Index dieses Modus. Entspricht `mode.{number}` aus dem Objektbaum und kann in `modes.selected` geschrieben werden.

- auswählbar (`boolean, ro`)

`true` falls dieser Modus manuell ausgewählt werden kann.

- streamable (`boolean, ro`)

Nur auf Multiroom-fähigen Geräten vorhanden. `true` wenn dieser Modus als Quelle für mehrere Multiroom-Geräte verwendet werden kann.

- switchTo (`boolean, wo`)

Wählt diesen Modus aus.

- Voreinstellungen

- verfügbar (`boolean, ro`)

Zeigt an, ob Voreinstellungen für diesen Modus verfügbar sind.

- `{number}`

Der Index dieser Voreinstellung. Gleich `mode.*.presets.{number}.key`.

- Schlüssel (`number, ro`)

Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}` aus dem Objektbaum und kann in `modes.selectPreset` geschrieben werden.

- name (`string, ro`)

Der Name dieser Voreinstellung

- recall (`boolean, wo`)

Wählt die Voreinstellung **und** den entsprechenden Modus aus.

- set (`boolean, wo`)

Legt die Voreinstellung auf den aktuell abgespielten Radiosender oder Titel fest. Wenn Sie versuchen, eine Voreinstellung für Modus X festzulegen, während ein Radiosender in einem anderen Modus abgespielt wird, erhalten Sie eine Warnung.