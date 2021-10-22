---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adddevice.md
title: So fügen Sie das Gerät zu Alexa oder Google Home hinzu
hash: 7LOEqf58Vo+Ne7CyV77jozHsy8UjnC7Ghl8TQAR8aD0=
---
# So fügen Sie das Gerät zu Alexa oder Google Home hinzu
Um das Gerät hinzuzufügen, haben wir 4 Schritte:

- Erweitern Sie die Statusrollen bei Bedarf um erforderliche neue Rollen.
- Erweitern Sie den Typendetektor mit neuem Gerät
- Gerät zu iobroker.devices hinzufügen, um es simulieren zu können.
- Gerät zu alexa/google und co . hinzufügen

## Neue Rollen
Wir haben 3 (oder noch mehr) Quellen, die überprüft werden müssen, bevor ein neues Gerät hinzugefügt wird:

- Alexa Smarthome API: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- Yandex-API: https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- Google-API: https://developers.google.com/assistant/smarthome/guides

Zusätzlich kann es sinnvoll sein, das vorhandene Gerät in einigen Adaptern zu überprüfen.

Nehmen wir als Beispiel eine Klimaanlage. Wir haben:

- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

Yandex hat das umfassendste Bild der Staaten, daher wäre es vernünftig, es als Grundlage zu nehmen.
Wir konnten sehen, dass es für den Thermostatmodus und für die Schwenkposition keine Rollen in der Dokumentation gibt.

Also werden wir es hier hinzufügen: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

Alle anderen Zustände (Leistung, Solltemperatur) sind noch vorhanden.

## Typ Detektor
Nachdem alle benötigten Rollen hinzugefügt oder gefunden wurden, muss der Typ Detektor erweitert werden.
Fügen Sie der globalen Liste einen neuen Gerätetyp hinzu: https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29 Nehmen Sie ein Gerät als Basis und kopieren Sie es in die `patterns` von die `ChannelDetector` Klasse.
Der Typdetektor muss irgendwie zwischen Geräten unterscheiden, daher muss Ihr Gerät eindeutige Rollen haben.
Wir nehmen `level.temperature` und `level.mode.thermostat` als spezifisches Muster für Klimaanlagen und markieren diese beiden Zustände als `required`.
Die meisten komplexen Geräte müssen in der Liste ganz oben stehen, damit sie zuerst erkannt werden und am Ende immer einfachere Geräte kommen.

Sie müssen eine neue Version des `iobroker.type-detector` npm-Pakets erstellen.

 ##iobroker.devices
Gehen Sie zu https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json und aktualisieren Sie dort Ihre Version.
Danach die Liste der Icons erweitern: https://github.com/ioBroker/ioBroker.devices/blob/master/src/src/Components/TypeIcon.js

 Und erstellen Sie auch eine neue Version.