---
chapters: {"pages":{"en/adapterref/iobroker.eusec/README.md":{"title":{"en":"ioBroker.euSec"},"content":"en/adapterref/iobroker.eusec/README.md"},"en/adapterref/iobroker.eusec/docs/devices.md":{"title":{"en":"Supported devices"},"content":"en/adapterref/iobroker.eusec/docs/devices.md"},"en/adapterref/iobroker.eusec/docs/debugging.md":{"title":{"en":"Debugging"},"content":"en/adapterref/iobroker.eusec/docs/debugging.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eusec/docs/devices.md
title: Unterstützte Geräte
hash: vBhHM8apBov3dLZ1psh9T1ADfF97XC6PCvxRKTebJ5w=
---
# Unterstützte Geräte

Der Adapter kommuniziert über die [eufy-security-client-](https://github.com/bropat/eufy-security-client) Bibliothek (Version 4.1.1) mit den Geräten. Alle von dieser Bibliothek unterstützten Geräte sind auch mit dem Adapter kompatibel; siehe die [Liste der unterstützten Geräte](https://bropat.github.io/eufy-security-client/#/supported_devices) .

Diese Bibliothek wird nicht mehr weiterentwickelt. Die unten aufgeführten Geräte fehlen in ihrer Liste oder funktionieren nicht mit der Bibliothek allein; der Adapter behebt diese Probleme selbst.

| Gerät                      | Was funktioniert                                                                                                                                                                                                  | Bekannte Grenzen                                                                                                                                          | Ausgabe                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| eufyCam C31 (T817L)        | Livestream, Bewegungs- und Personenerkennung, Licht, Alarm. Die Bibliothek kennt die Kamera nicht; der Adapter handhabt sie wie die SoloCam Spotlight 1080.                                                       | Schwenk- und Neigefunktion sind noch nicht verfügbar. Die Kamera zeigt den Akkustand an, obwohl sie netzbetrieben ist.                                    | [#156](https://github.com/iobroker-community-adapters/ioBroker.eusec/issues/156) |
| Floodlight Cam E30 (T8426) | Livestream, voreingestellte Positionen, Schwenken und Neigen. Die Bibliothek sendet der Kamera die Befehle älterer Flutlichtstrahler; der Adapter sendet stattdessen die Befehle der Floodlight Cam E340 (T8425). | Gegensprechfunktion, Kalibrierung sowie Licht- und Erkennungseinstellungen wurden noch nicht an einer realen Kamera getestet. Verfügbar ab Version 3.4.0. |                                                                                  |

Ihr Gerät fehlt in beiden Listen oder funktioniert nicht wie beschrieben? Erstellen Sie ein [Ticket](https://github.com/iobroker-community-adapters/ioBroker.eusec/issues) mit der Modellnummer und einem Debug-Protokoll des Adapterstarts (siehe [Debugging](/#/docs/adapterref/iobroker.eusec/docs/debugging.md) ).