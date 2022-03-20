---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/restricted-login.md
title: TR: ioBroker.shelly
hash: KSwWPyMo0b2e/iCwIZGpuh/Be6fKXaP6aO2Ypui9tbI=
---
![TR: Logo](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

TR: # ioBroker.shelly
TR: ## Geschützter Login
TR: Um die Shelly-Geräte vor unbefugtem Zugriff zu schützen, setze in der ioBroker Konfiguration einen beliebigen Benutzernamen und Passwort im Tab *Allgemeine Einstellungen*.

![TR: iobroker_general_restrict_login](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_restrict_login.png)

TR: Aktiviere den geschützten Zugriff auf allen Shelly-Geräten.

TR: **Generation 2 bieten keine Option für einen Benutzernamen. Falls Du Gen 1 und Gen 2 Geräte nutzt, konfiguriere auf allen Geräten das gleiche Passwort.**

TR: ### Gen 1
TR: 1. Öffne die Shelly-Webkonfiguration in einem Browser (nicht in der Shelly App!)
TR: 2. Gehe zu ```Internet & Security settings -> Restricted Login```
TR: 3. Setze den Haken für den gesicherten Zugriff und gib die gerade konfigurierten Zugangsdaten ein
TR: 4. Speichere die Konfiguration - der Shelly startet automatisch neu
TR: 5. Stelle sicher, dass auf allen Shelly-Geräten die identischen Zugangsdaten konfiguriert werden

![TR: shelly gen 1](../../../de/adapterref/iobroker.shelly/./img/shelly_restrict_login-gen1.png)

TR: ### Gen 2
TR: 1. Öffne die Shelly-Webkonfiguration in einem Browser (nicht in der Shelly App!)
TR: 2. Gehe zu ```Device -> Authentication```
TR: 3. Aktiviere das Passwort-Feature und gibt das gerade konfigurierte Passwort ein
TR: 4. Speichere die KOnfiguration

![TR: shelly gen 2](../../../de/adapterref/iobroker.shelly/./img/shelly_restrict_login-gen2.png)