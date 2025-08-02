---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/restricted-login.md
title: ioBroker.shelly
hash: Ui9mTY78X/lhS65cNS2PF9O0KE7TPiLgyr8WYAYbVcg=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸Немецкая версия](../en/restricted-login.md).

## Защищенный вход
Чтобы защитить устройства Shelly от несанкционированного доступа, установите любое имя пользователя и пароль на вкладке *Общие настройки* в конфигурации ioBroker.

![iobroker_general_restrict_login](../../../de/adapterref/iobroker.shelly/img/iobroker_general_restrict_login.png)

Затем включите защищенный доступ на всех устройствах Shelly.

**Важный:**

- Устройства поколения 2+ не предлагают возможности выбора имени пользователя. Имя пользователя можно выбрать свободно, но оно актуально только для устройств поколения 1.
- Настройте один и тот же пароль на всех устройствах, который был установлен в экземпляре Shelly.
    - Поколение 1: настройка имени пользователя и пароля от экземпляра.
    - Поколение 2+: настройте пароль только в настройках экземпляра.

### Предупреждения
Если в ioBroker настроен пароль устройства, адаптер будет записывать в журнал предупреждения, если некоторые устройства Shelly не защищены!

Чтобы прекратить получать предупреждения, вы можете либо

- пароль можно удалить в конфигурации адаптера (= пароль не требуется) или
- Защищенный доступ можно активировать на всех устройствах Shelly.

### Устройства поколения 2+ (Plus и Pro)
1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Зайдите в «Настройки -> Аутентификация».
3. Активируйте функцию пароля и введите только что настроенный пароль.
4. Сохраните конфигурацию.

![Шелли gen2](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen2.png)

### Устройства поколения 1
1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Перейдите в «Настройки Интернета и безопасности -> Ограниченный вход».
3. Установите флажок для безопасного доступа и введите только что настроенные данные доступа.
4. Сохраните конфигурацию — Shelly автоматически перезагрузится.
5. Убедитесь, что на всех устройствах Shelly настроены одинаковые данные доступа.

![Шелли 1 поколение](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen1.png)