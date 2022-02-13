---
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-coap.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md"},"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/state-changes.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/restricted-login.md
title: ioBroker.шелли
hash: PQLcH/5udMusTlxjjlZXllm+3nin3omqilO1WkBgvKY=
---
![Логотип](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../../admin/shelly.png)

# IoBroker.шелли
## Geschützter Логин
Um die Shelly-Geräte vor unbefugtem Zugriff zu schützen, setze in der ioBroker Configuration einen beliebigen Benutzernamen und Password im Tab *Allgemeine Einstellungen*.

![iobroker_general_restrict_login](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/./img/iobroker_general_restrict_login.png)

Aktiviere den geschützten Zugriff auf allen Shelly-Geräten.

**Поколение 2 bieten keine Option für einen Benutzernamen. Falls Du Gen 1 и Gen 2 Geräte nutzt, configuriere auf allen Geräten das gleiche Passwort.**

### Поколение 1
1. Удалить конфигурацию Shelly-Web в браузере (но не в приложении Shelly!)
2. Gehe zu ```Настройки Интернета и безопасности -> Ограниченный вход```
3. Setze den Haken für den gesicherten Zugriff und gib die gerade konfigurierten Zugangsdaten ein
4. Speichere die Konfiguration - der Shelly startet autotisch neu
5. Stelle sicher, dass auf allen Shelly-Geräten die identischen Zugangsdaten konfiguriert werden

![Шелли ген 1](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../shelly_restrict_login-gen1.png)

### Поколение 2
1. Удалить конфигурацию Shelly-Web в браузере (но не в приложении Shelly!)
2. Gehe zu ```Устройство -> Аутентификация```
3. Активация функции пароля и настройка пароля
4. Speichere die KOnfiguration

![Шелли ген 2](../../../../../../../../../../en/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/de/../shelly_restrict_login-gen2.png)