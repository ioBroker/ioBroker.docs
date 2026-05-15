---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/restricted-login.md
title: ioBroker.shelly
hash: KJs5Qz34Ommj2ehpimk+/hQAXBwFDWhdig5al0gPRwU=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/restricted-login.md)

## Защищенный вход
Для защиты устройств Shelly от несанкционированного доступа необходимо указать имя пользователя и пароль на вкладке «Общие настройки» в конфигурации ioBroker.

![iobroker_general_restrict_login](../../../de/adapterref/iobroker.shelly/img/iobroker_general_restrict_login.png)

Затем на всех устройствах Shelly необходимо включить защищенный доступ.

**Важный:**

- Устройства второго поколения и старше не предоставляют возможность выбора имени пользователя — имя пользователя можно выбрать произвольно, но это актуально только для устройств первого поколения.
- На всех устройствах должен быть установлен один и тот же пароль.
- Поколение 1: Необходимо настроить имя пользователя и пароль от экземпляра.
- Поколение 2+: Необходимо настроить только пароль из настроек экземпляра.

### Предупреждения
Если в ioBroker настроен пароль для устройства, адаптер будет записывать предупреждения в журнал, если некоторые устройства Shelly окажутся незащищенными!

Чтобы перестать получать предупреждения, вы можете либо...

- пароль удаляется из конфигурации адаптера (= пароль не требуется) или
— На всех устройствах Shelly должен быть включен защищенный доступ.

### Устройства 2-го поколения и старше (Plus и Pro)
1. Откройте веб-интерфейс конфигурации Shelly в браузере (не в приложении Shelly!).
2. Перейдите в «Настройки -> Аутентификация».
3. Активируйте функцию ввода пароля и введите только что настроенный пароль.
4. Сохраните конфигурацию.

![shelly gen2](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen2.png)

### Устройства первого поколения
1. Откройте веб-интерфейс конфигурации Shelly в браузере (не в приложении Shelly!).
2. Перейдите в раздел «Настройки интернета и безопасности» -> «Ограниченный вход в систему».
3. Установите флажок для безопасного доступа и введите только что настроенные данные доступа.
4. Сохраните конфигурацию — Shelly автоматически перезагрузится.
5. Убедитесь, что на всех устройствах Shelly настроены идентичные данные доступа.

![shelly gen1](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen1.png)