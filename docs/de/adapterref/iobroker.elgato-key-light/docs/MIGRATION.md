---
chapters: {"pages":{"en/adapterref/iobroker.elgato-key-light/README.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README.md"},"en/adapterref/iobroker.elgato-key-light/README_DE.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README_DE.md"},"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md":{"title":{"en":"Elgato local API evidence"},"content":"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md"},"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md":{"title":{"en":"Migration guide"},"content":"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md
title: Migrationsleitfaden
hash: /BMrjO91aI+blg0zAfC9YRC8spGCqNm/mJLYesZSghk=
---
# Migrationsleitfaden

## Von Version 1.1.x zur Neuentwicklung

Die Neuschreibung behält die Seriennummern der Gerätewurzeln und die bestehenden beschreibbaren Pfade darunter bei.`<serial>.light.lights.0` Vorhandene Automatisierungen für Leistung, Helligkeit, Temperatur, Farbton, Sättigung,`hex` und Vermächtnis`rgb` Deshalb arbeiten Sie weiter.

Beim ersten Startvorgang`native.devices` wird geladen. Falls die Eigenschaft noch nicht existiert, liest der Adapter ältere, adaptereigene Geräteobjekte und importiert sie.`native.device.ip` /`port` Ein erfolgreicher Kontakt ermittelt die stabile Seriennummer und speichert die normalisierte Geräteliste in der nativen Konfiguration der Instanz.`native.devices` Wenn eine solche Konfiguration existiert, ist sie für diese Instanz maßgebend; Geräteobjekte, die nicht durch ihre Konfiguration repräsentiert werden, werden nur aus dieser Instanz entfernt.

Wichtige Metadatenkorrekturen werden angewendet mit`extendObject` :

- `hardwareRevision` Umwandlung von Zahl zu Zeichenkette.
- Farbtemperatur-Anwendungen`level.color.temperature` und Kelvin.
- RGB/Hex-Nutzung`level.color.rgb` Die
- Erreichbarkeit, Gesundheit, Akku und Fähigkeiten addieren sich.

Durch das Entfernen eines konfigurierten Geräts werden auch dessen Laufzeiteintrag und der serielle Stammobjektbaum dieser Instanz gelöscht. Andere Adapterinstanzen und ihre Geräte bleiben unberührt. Sichern Sie vor dem Upgrade die Instanzobjekte und Adapterzustände und überprüfen Sie anschließend die Geräteerreichbarkeit sowie einen Lese-/Schreibzyklus für jedes Modell.

## Konfigurationsänderungen

Die Gerätekonfiguration verfügt nun über eine normale Admin-Konfigurationsseite. Das Polling bleibt bestehen.`native.interval` in Sekunden. Neue Standardwerte sind: Anforderungstimeout 3000 ms, maximaler Backoff 300 Sekunden, Schreibentprellzeit 200 ms, Erkennungstimeout 5000 ms und automatische Erkennung/Hinzufügung deaktiviert.

Der ehemalige Soldat`iobroker-react` Die Registerkarte „Adapter“ und die darin enthaltene Konfigurationsbearbeitung wurden entfernt. Die Live-Steuerung bleibt auf der Registerkarte „Adapter“ erhalten; die persistente Konfiguration befindet sich auf der Seite „Instanzkonfiguration“.

## Rückgängigmachen

Bewahren Sie ein vor dem Upgrade erstelltes ioBroker-Backup auf. Der alte Adapter versteht das nicht.`native.devices` Zum Zurücksetzen stellen Sie die gesicherte Instanz-/Objektkonfiguration wieder her oder fügen Sie Geräte manuell über die alte Registerkarte hinzu.