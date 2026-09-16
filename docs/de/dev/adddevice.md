---
title:       "Gerät zu Sprachassistenten hinzufügen"
lastChanged: "08.09.2026"
---

# Ein Gerät zu den Sprachassistenten hinzufügen

Damit Alexa, Google Home oder Yandex einen neuen Gerätetyp verstehen, reicht es
nicht, ihn in einem Adapter anzulegen. Der Typ muss an vier Stellen bekannt
sein, und die Reihenfolge ist wichtig:

1. Die **Rollen** ergänzen, falls die vorhandenen nicht ausreichen.
2. Den **Typdetektor** um das Gerät erweitern.
3. Das Gerät in **iobroker.devices** aufnehmen, damit es sich dort anlegen und
   ausprobieren lässt.
4. Das Gerät im **iot-Adapter** an Alexa, Google und Co. weiterreichen.

## 1. Rollen

Vor dem Anlegen eines neuen Gerätetyps gehören drei Quellen geprüft, denn was
die Assistenten nicht kennen, lässt sich auch nicht steuern:

* [Alexa Smart Home API](https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html)
* [Google Smart Home](https://developers.google.com/assistant/smarthome/guides)
* [Yandex Dialogs](https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/)

Nützlich ist außerdem der Blick auf ein bestehendes Gerät in einem Adapter, der
dasselbe schon abbildet.

**Beispiel Klimaanlage.** Die drei Anbieter beschreiben sie unterschiedlich
ausführlich:

* [Yandex: Thermostat und Klimaanlage](https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/)
* [Alexa: ThermostatController](https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html)
* [Google: Air cooler](https://developers.google.com/assistant/smarthome/guides/aircooler)

Yandex hat davon das vollständigste Bild der Zustände, deshalb ist es die
sinnvollste Grundlage. Beim Vergleich fiel auf, dass für den Thermostatmodus und
für die Schwenkposition noch keine Rollen dokumentiert waren; sie stehen heute
unter
[Zustandsrollen](/docs/dev/stateroles.md#klimaanlage-oder-thermostat). Die
übrigen Zustände, etwa Leistung und Solltemperatur, gab es bereits.

## 2. Typdetektor

Steht die Rolle fest, kommt der
[Typdetektor](https://github.com/ioBroker/ioBroker.type-detector) an die Reihe.
Der neue Gerätetyp wird in die globale Liste aufgenommen und bekommt in den
`patterns` der Klasse `ChannelDetector` einen Eintrag; am einfachsten geht das,
indem man ein ähnliches Gerät als Vorlage nimmt.

Zwei Punkte entscheiden darüber, ob die Erkennung funktioniert:

* **Der Satz von Rollen muss eindeutig sein.** Bei der Klimaanlage sind das
  `level.temperature` und `level.mode.thermostat`, beide als `required`
  markiert. An diesem Paar erkennt der Detektor sie.
* **Die Reihenfolge zählt.** Die komplexesten Geräte stehen oben in der Liste
  und werden zuerst geprüft, die einfachen am Ende. Sonst schnappt ein
  allgemeineres Muster zu, bevor das genauere an die Reihe kommt.

Danach wird eine neue Version des npm-Pakets `iobroker.type-detector`
veröffentlicht.

## 3. iobroker.devices

Im Adapter [devices](/adapters/devices) wird die Version des Typdetektors
angehoben und die Liste der Symbole um den neuen Typ ergänzt. Auch davon braucht
es eine neue Version.

Damit lässt sich das Gerät im Adapter *Geräte verwalten* anlegen und
ausprobieren, ohne dass echte Hardware vorhanden sein muss.

## 4. Beim Assistenten

Zuletzt muss der [iot-Adapter](/adapters/iot) den neuen Typ an Alexa, Google
oder Yandex weiterreichen. Erst dann taucht das Gerät beim Assistenten auf.

?> Die Reihenfolge lässt sich nicht abkürzen. Ein Gerät, das der Typdetektor
nicht erkennt, kommt bei den Assistenten nicht an, auch wenn alle Zustände
vorhanden sind.
