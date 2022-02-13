---
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md
title: ioBroker.shelly
hash: PQLcH/5udMusTlxjjlZXllm+3nin3omqilO1WkBgvKY=
---
![Logo](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../../admin/shelly.png)

# IoBroker.shelly
## Geschützter Login
Um die Shelly-Geräte vor unbefugtem Zugriff zu schützen, setzen Sie in der ioBroker-Konfiguration einen beliebigen Benutzernamen und ein Passwort im Tab *Allgemeine Einstellungen*.

![iobroker_general_restrict_login](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/./img/iobroker_general_restrict_login.png)

Aktiviere den geschützten Zugriff auf alle Shelly-Geräte.

**Generation 2 bietet keine Option für einen Benutzernamen. Falls Du Gen 1 und Gen 2 Geräte nutzt, konfiguriere auf allen Geräten das gleiche Passwort.**

### Gen 1
1. Öffnet die Shelly-Webkonfiguration in einem Browser (nicht in der Shelly App!)
2. Gehe zu ```Internet- & Sicherheitseinstellungen -> Eingeschränkte Anmeldung```
3. Setze den Haken für den gesicherten Zugriff und gib die gerade konfigurierten Zugangsdaten ein
4. Speichere die Konfiguration - der Shelly startet automatisch neu
5. Stelle sicher, dass auf allen Shelly-Geräten die identischen Zugangsdaten konfiguriert werden

![Shelly Gen 1](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../shelly_restrict_login-gen1.png)

### Gen 2
1. Öffnet die Shelly-Webkonfiguration in einem Browser (nicht in der Shelly App!)
2. Gehe zu ```Gerät -> Authentifizierung```
3. Aktiviere das Passwort-Feature und gibt das gerade konfigurierte Passwort ein
4. Speichere die KKonfiguration

![Shelly Gen 2](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../shelly_restrict_login-gen2.png)