---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.notification-manager/README.md
title: ioBroker.notification-менеджер
hash: K10xkBT17q5WBQJ8eY2Yeuw/3KIbAMBBPvJUfVKKJPM=
---
![Логотип](../../../en/adapterref/iobroker.notification-manager/admin/notification-manager.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.notification-manager.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.notification-manager.svg)
![Количество установок](https://iobroker.live/badges/notification-manager-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/notification-manager-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.notification-manager.png?downloads=true)

# IoBroker.notification-manager
**Тесты:** ![Тестируйте и выпускайте](https://github.com/foxriver76/ioBroker.notification-manager/workflows/Test%20and%20Release/badge.svg)

## Адаптер диспетчера уведомлений для ioBroker
Управление уведомлениями ioBroker, например. отправив их в виде сообщений

### Общее описание
Этот адаптер позволяет перенаправить внутренний `Notifications` ioBroker на адаптеры обмена сообщениями, которые поддерживают `Notification System`. Если вам не хватает адаптера, пожалуйста, откройте тикет на соответствующий адаптер.

### Требования к адаптерам обмена сообщениями
Установите флаг `common.supportedMessages.notifications` на `true` в `io-package.json`.

Всякий раз, когда новое уведомление должно быть доставлено через адаптер обмена сообщениями, `notification-manager` отправит сообщение настроенному экземпляру.

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
Кроме того, у категории есть описание i18n и имя i18n.
Те же свойства существуют для области действия категории. Кроме того, затронутый узел включен.

После отправки уведомления `notification-manager` ожидает ответ со свойством `{ sent: true }`, если адаптер обмена сообщениями смог доставить уведомление, в противном случае он должен ответить `{ sent: false }`.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.1 (2023-07-04)
* (foxriver76) added possibility to send test messages from web interface (closes #1)

### 0.1.0 (2023-06-02)
* (foxriver76) initial release

## License
MIT License

Copyright (c) 2023 foxriver76 <moritz.heusinger@gmail.com>

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