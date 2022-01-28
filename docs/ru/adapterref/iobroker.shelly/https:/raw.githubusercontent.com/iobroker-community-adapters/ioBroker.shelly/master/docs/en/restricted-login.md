---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md
title: ioBroker.шелли
hash: EGaADnnibnxatRZByNCswqiZD/5YEwI6XQehKJ3UB/4=
---
![логотип](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../../admin/shelly.png)

# IoBroker.шелли
## Ограниченный вход
Чтобы защитить свои устройства Shelly с ограниченным входом в систему, выберите имя пользователя и пароль в конфигурации ioBroker на вкладке *общие настройки*.

![iobroker_general_restrict_login](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_general_restrict_login.png)

Активируйте ограничение входа на все ваши устройства Shelly.

**Устройства 2-го поколения не предоставляют опцию имени пользователя. Если вы используете устройства Gen 1 и Gen 2, используйте один и тот же пароль на всех устройствах.**

### Поколение 1
1. Откройте веб-конфигурацию Shelly в веб-браузере (не в приложении Shelly!)
2. Перейдите в «Настройки Интернета и безопасности -> Ограниченный вход».
3. Активируйте чекбокс и введите настроенные ранее логин и пароль
4. Сохраните конфигурацию — Shelly автоматически перезагрузится.
5. Убедитесь, что на всех ваших устройствах Shelly настроены одни и те же имя пользователя и пароль.

![Шелли ген 1](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_restrict_login-gen1.png)

### Поколение 2
1. Откройте веб-конфигурацию Shelly в веб-браузере (не в приложении Shelly!)
2. Перейдите к ```Устройство -> Аутентификация```
3. Включите функцию аутентификации и введите ранее настроенный пароль.
4. Сохраните конфигурацию

![Шелли ген 2](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_restrict_login-gen2.png)