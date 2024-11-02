---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.notification-manager/README.md
title: ioBroker.менеджер уведомлений
hash: 6DCRrUYRYkWX5WRD5rVWvyOwZ0X6vqzzshhOrNp6tTc=
---
![Логотип](../../../en/adapterref/iobroker.notification-manager/admin/notification-manager.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.notification-manager.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.notification-manager.svg)
![Количество установок](https://iobroker.live/badges/notification-manager-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/notification-manager-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.notification-manager.png?downloads=true)

# IoBroker.менеджер уведомлений
**Тесты:** ![Тест и выпуск](https://github.com/foxriver76/ioBroker.notification-manager/workflows/Test%20and%20Release/badge.svg)

## Адаптер менеджера уведомлений для ioBroker
Управляйте уведомлениями ioBroker, например, отправляя их в виде сообщений

### Общее описание
Этот адаптер позволяет перенаправлять внутренний ioBroker `Notifications` на адаптеры мессенджеров, которые поддерживают `Notification System`. Если у вас отсутствует адаптер, пожалуйста, откройте тикет по соответствующему адаптеру.

### Конфигурация
Для каждого `category` вы можете настроить, должен ли `category` быть активным. Если категория не активна, `notification-manager` не будет обрабатывать ничего для этого конкретного `category`.

Кроме того, вы можете настроить, должен ли `notification-manager` подавлять определенные `categories`. Если `notification` для подавленного `category` зарегистрирован, адаптер немедленно очистит этот `notification`, не отправляя вам никаких сообщений.

Наконец, вы можете настроить поддерживаемые адаптеры обмена сообщениями. Всякий раз, когда генерируется новый `notification` для `active` (и `non-suppressed`) `category`, адаптер отправит `notification` через первый настроенный адаптер. Если отправка сообщения прошла успешно, `notification-manager` очистит `notification`. ЕСЛИ отправка не удалась, он повторит попытку со вторым адаптером.

Всякий раз, когда категория `active`, но еще не настроены какие-либо конкретные параметры, адаптер будет использовать настроенные резервные параметры. Новые категории всегда `active` по умолчанию, чтобы гарантировать, что вы будете уведомлены. Это означает, что всякий раз, когда какой-либо адаптер реализует новый `category`, будут применены резервные параметры для данного `severity`.

Вы можете дополнительно определить только категорию `suppress`. `notification-manager` затем просто подтвердит уведомление, так что оно не появится в вашей системе.

Начиная с версии js-controller 7, адаптеры имеют возможность добавлять дополнительные `contextData` к уведомлениям. Например, это используется для отображения определенных действий для пользователя в графическом интерфейсе администратора. По умолчанию `notification-manager` будет отправлять вам эти уведомления и __НЕ__ удалять их, так что они останутся для последующих взаимодействий пользователя. Однако, если вы решите, что вам не нужны такие взаимодействия для определенных `category`, вы можете отключить их с помощью флажка.

### Регистрация уведомлений, ориентированных на пользователя
Как пользователь вы в лучшем случае знаете, когда вы хотите получать уведомления о конкретных ситуациях в вашей системе.
Таким образом, `notification-manager` предоставляет вам интерфейс для регистрации ваших собственных уведомлений внутри системы уведомлений ioBroker. Поддерживаются три категории, по одной для каждого уровня серьезности `notify`, `info` и `alert`.

Уведомления можно зарегистрировать через `sendTo`

```ts
(async () => {
    try {
        await sendToAsync('notification-manager.0', 'registerUserNotification', { category: 'notify', message: 'Your delivery has arrived' });
    } catch (e) {
        log(`Could not register notification: ${e}`, 'error');
    }
})();
```

### Требования к адаптерам обмена сообщениями
Пожалуйста, установите флаг `common.supportedMessages.notifications` на `true` в вашем `io-package.json`.

Всякий раз, когда через адаптер обмена сообщениями должно быть доставлено новое уведомление, `notification-manager` отправит сообщение настроенному экземпляру.

Сообщения состоят из команды `sendNotification` и сообщения со следующей структурой:

```json
{
  "host": "system.host.moritz-ThinkPad-P16-Gen-1",
  "scope": {
    "name": "System-Benachrichtigungen",
    "description": "Diese Benachrichtigungen werden vom ioBroker-System erfasst und weisen auf Probleme hin, die überprüft und behoben werden sollten."
  },
  "category": {
    "instances": {
      "system.adapter.backitup.0": {
        "messages": [
          {
            "message": "Restart loop detected",
            "ts": 1684074961226
          }
        ]
      },
      "system.adapter.notification-manager.0": {
        "messages": [
          {
            "message": "Restart loop detected",
            "ts": 1684075183094
          }
        ]
      }
    },
    "description": "Eine Adapterinstanz stürzt beim Start häufig ab und wurde aus diesem Grund gestoppt. Die Protokolldatei muss vor dem Neustart der Instanz überprüft werden.",
    "name": "Probleme mit häufig abstürzenden Adapterinstanzen",
    "severity": "alert"
  }
}
```

Где `category.instances` показывает затронутые экземпляры адаптера для этого уведомления.
Кроме того, категория имеет описание i18n и имя i18n.
Те же свойства существуют для области действия категории. Кроме того, включен затронутый хост.

После отправки уведомления `notification-manager` ожидает ответа со свойством `{ sent: true }`, если адаптер обмена сообщениями смог доставить уведомление, в противном случае он должен ответить `{ sent: false }`.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2024-10-10)
* (@foxriver76) by default we do not delete notifications with `contextData`
* (@foxriver76) added checkbox to also delete notifications with `contextData` for specific categories

### 1.2.1 (2024-08-29)
* (@foxriver76) fixed issue if host name contains `.`

### 1.2.0 (2024-08-05)
* (@klein0r) Added Blockly blocks

### 1.1.2 (2024-05-02)
* (foxriver76) made logging a bit more silent

### 1.1.1 (2024-03-16)
* (foxriver76) added possibility to suppress messages
* (foxriver76) fixed issue that bottom of settings page is shown behind toolbar
* (foxriver76) fixed issue that all notifications are cleared instead of only the handled one

### 1.0.0 (2023-12-08)
* (foxriver76) added possibility to send custom messages
* (foxriver76) added UI indicators for each category

### 0.1.2 (2023-10-11)
* (foxriver76) also show notifications provided by adapters in the configuration

### 0.1.1 (2023-07-04)
* (foxriver76) added possibility to send test messages from web interface (closes #1)

### 0.1.0 (2023-06-02)
* (foxriver76) initial release

## License
MIT License

Copyright (c) 2024 foxriver76 <moritz.heusinger@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Icon made by "Good Ware" from www.flaticon.com