---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.oasecontrol/README.md
title: ioBroker.oasecontrol
hash: d0ERCppohm4g2Z0mkWNOXFm5kB6Ldlq89QGMf1Mm4JY=
---
# IoBroker.oasecontrol
**Tests:** ![Test und Freigabe](https://github.com/mr-suw/ioBroker.oasecontrol/workflows/Test%20and%20Release/badge.svg)

## Oasecontrol-Adapter für ioBroker
ioBroker.oasecontrol steuert Außengeräte von OASE aus.
Unterstützte Geräte sind die InScenio FM-Master EGC-Serie.

Aktuell getestete Geräte:

- FM-Master WLAN EGC Home mit 4 Steckdosen

Aktuell unterstützte Funktionen:

- schaltbare Steckdosen
- dimmbare Steckdose
- neue Objektelemente zum Erstellen eines schreibgeschützten Steckdosenschalters

Könnte auch funktionieren mit

- [InScenio FM-Master Cloud-Serie](https://www.oase.com/en/products-a-z/family/product/p/70788-inscenio-fm-master-cloud-int.html)

## Kompatibilität
kompatibel mit OASE FW: 51.25

getestet mit 51,25

Stellen Sie sicher, dass Sie die MAC-Adresse von io.broker zur Broadcast-Whitelist Ihres WLAN-Zugangspunkts hinzufügen.

## Einrichtung in ioBroker
**IP-OASE-Gerät:** Statische IPv4-Adresse Ihres OASE-Geräts

**IP-TCP-Server:** Statische IPv4-Adresse Ihrer ioBroker-Instanz

**OASE-Gerätepasswort**: Das ist der schwierigste Teil; es muss beim App-Login abgefangen werden. Es handelt sich um eine verschlüsselte Zeichenkette mit 74 Zeichen, die von http://app-oasecloud-prod.azurewebsites.net/User/Inventory abgeleitet wird. Die Zeichen \\\u müssen durch \u ersetzt werden.

**Abfrageintervall [s]:** Wie oft in Sekunden das OASE-Gerät auf neue Daten abgefragt werden soll.

## Setup-Prüfung
Sie haben diesen Adapter erfolgreich eingerichtet, wenn die Protokollsequenz wie folgt aussieht:

```
authenticated to device
Starting TCP server with TLS...
Detected device:FM-Master EGC Home
```

OaseControl-Objekte sind wie folgt vorhanden:

```
info.connection = true
...
serial-number = < device serial number >
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.4 (2026-05-31)
* Fix errors reported by checker

### 0.1.3 (2026-05-16)
* Fix deploy issue

### 0.1.0 (2026-05-16)
* Adapter requires node.js >= 22 now

### 0.0.8
* NPM release

## License
MIT license

Copyright (c) 2026 mrsuw mrsuw@icloud.com