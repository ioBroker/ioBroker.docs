---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/restricted-login.md
title: ioBroker.шелли
hash: 12+LDyaR+6pN2ryvIDARzC297K5BCZkj2QnshinnNuM=
---
![логотип](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.шелли
## Защищенный вход
Чтобы защитить устройства Shelly от несанкционированного доступа, установите любой логин и пароль на вкладке *Общие настройки* в конфигурации ioBroker.

![iobroker_general_restrict_login](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_restrict_login.png)

Затем активируйте защищенный доступ на всех устройствах Shelly.

** Поколение 2 не предлагает вариант имени пользователя. Если вы используете устройства Gen 1 и Gen 2, настройте один и тот же пароль на всех устройствах.**

### Предупреждения
Если в ioBroker настроен пароль устройства, адаптер будет писать предупреждения в лог, если некоторые устройства Shelly не защищены!

Чтобы прекратить получать предупреждения, либо

- пароль можно удалить из конфигурации адаптера (= пароль не требуется) или
- Активировать защищенный доступ на всех устройствах Shelly

### Устройства первого поколения
1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Перейдите в «Настройки Интернета и безопасности -> Ограниченный вход».
3. Установите флажок для безопасного доступа и введите данные доступа, которые вы только что настроили.
4. Сохраните конфигурацию — Shelly перезапустится автоматически.
5. Убедитесь, что одинаковые учетные данные настроены на всех устройствах Shelly.

![Шелли ген 1](../../../de/adapterref/iobroker.shelly/./img/shelly_restrict_login-gen1.png)

### Устройства поколения 2 (Plus и Pro)
1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Перейдите к ```Устройство -> Аутентификация```
3. Активируйте функцию пароля и введите только что настроенный пароль.
4. Сохраните конфигурацию

![Шелли ген 2](../../../de/adapterref/iobroker.shelly/./img/shelly_restrict_login-gen2.png)