---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adddevice.md
title: So fügen Sie das Gerät zu Alexa oder Google Home hinzu
hash: 7LOEqf58Vo+Ne7CyV77jozHsy8UjnC7Ghl8TQAR8aD0=
---
# So fügen Sie das Gerät zu Alexa oder Google Home hinzu
Um das Gerät hinzuzufügen, haben wir 4 Schritte:

- Erweitern Sie die Statusrollen bei Bedarf um die erforderlichen neuen Rollen.
- Erweitern Sie den Typdetektor mit einem neuen Gerät
- Gerät zu iobroker.devices hinzufügen, um es simulieren zu können.
- Gerät zu alexa/google und co hinzufügen

## Neue Rollen
Wir haben 3 (oder sogar mehr) Quellen, die überprüft werden müssen, bevor ein neues Gerät hinzugefügt wird:

- Alexa-Smarthome-API: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- Yandex-API: https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- Google-API: https://developers.google.com/assistant/smarthome/guides

Zusätzlich kann es nützlich sein, das vorhandene Gerät in einem Adapter zu überprüfen.

Nehmen wir als Beispiel die Klimaanlage. Wir haben:

- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

Yandex hat das umfassendste Bild der Staaten, daher wäre es vernünftig, es als Grundlage zu nehmen.
Wir konnten sehen, dass es für den Thermostatmodus und für die Schwenkposition keine Rollen in der Dokumentation gibt.

Also werden wir es hier hinzufügen: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

Alle anderen Zustände (Leistung, eingestellte Temperatur) sind noch vorhanden.

## Typdetektor
Nachdem alle erforderlichen Rollen hinzugefügt oder gefunden wurden, muss der Typdetektor erweitert werden.
Neuen Gerätetyp zur globalen Liste hinzufügen: https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29 Nehmen Sie ein Gerät als Basis und kopieren Sie das in die `patterns` von die Klasse `ChannelDetector`.
Der Typdetektor muss irgendwie zwischen Geräten unterscheiden, daher muss Ihr Gerät einen eindeutigen Satz von Rollen haben.
Wir nehmen `level.temperature` und `level.mode.thermostat` als spezifische Muster für Klimaanlagen und markieren diese beiden Zustände als `required`.
Die komplexesten Geräte müssen ganz oben in der Liste stehen, damit sie zuerst erkannt werden und am Ende immer mehr einfache Geräte kommen.

Sie müssen eine neue Version des `iobroker.type-detector` npm-Pakets erstellen.

 ## iobroker.devices
Gehen Sie zu https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json und aktualisieren Sie dort Ihre Version.
Erweitern Sie danach die Liste der Symbole: https://github.com/ioBroker/ioBroker.devices/blob/master/src/src/Components/TypeIcon.js

 Und auch eine neue Version erstellen.