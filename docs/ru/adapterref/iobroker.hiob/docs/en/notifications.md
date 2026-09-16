---
chapters: {"pages":{"en/adapterref/iobroker.hiob/README.md":{"title":{"en":"ioBroker.hiob"},"content":"en/adapterref/iobroker.hiob/README.md"},"en/adapterref/iobroker.hiob/docs/en/README.md":{"title":{"en":"ioBroker.hiob Adapter for ioBroker"},"content":"en/adapterref/iobroker.hiob/docs/en/README.md"},"en/adapterref/iobroker.hiob/docs/en/example.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/example.md"},"en/adapterref/iobroker.hiob/docs/en/app.md":{"title":{"en":"Step 1: Installation and APP setup"},"content":"en/adapterref/iobroker.hiob/docs/en/app.md"},"en/adapterref/iobroker.hiob/docs/en/enum.md":{"title":{"en":"Step 1: Create Enums"},"content":"en/adapterref/iobroker.hiob/docs/en/enum.md"},"en/adapterref/iobroker.hiob/docs/en/widgets.md":{"title":{"en":"Step 3: Create Widgets"},"content":"en/adapterref/iobroker.hiob/docs/en/widgets.md"},"en/adapterref/iobroker.hiob/docs/en/sreens.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/sreens.md"},"en/adapterref/iobroker.hiob/docs/en/backups.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/backups.md"},"en/adapterref/iobroker.hiob/docs/en/general.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/general.md"},"en/adapterref/iobroker.hiob/docs/en/secureCon.md":{"title":{"en":"Secure connection"},"content":"en/adapterref/iobroker.hiob/docs/en/secureCon.md"},"en/adapterref/iobroker.hiob/docs/en/aessecure.md":{"title":{"en":"Step 1: AES states"},"content":"en/adapterref/iobroker.hiob/docs/en/aessecure.md"},"en/adapterref/iobroker.hiob/docs/en/custom.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/custom.md"},"en/adapterref/iobroker.hiob/docs/en/notifications.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/notifications.md"},"en/adapterref/iobroker.hiob/docs/en/example_log.md":{"title":{"en":"ioBroker Logs"},"content":"en/adapterref/iobroker.hiob/docs/en/example_log.md"},"en/adapterref/iobroker.hiob/docs/en/example_ram.md":{"title":{"en":"ioBroker RAM"},"content":"en/adapterref/iobroker.hiob/docs/en/example_ram.md"},"en/adapterref/iobroker.hiob/docs/en/example_updates.md":{"title":{"en":"ioBroker Infos, News and Updates"},"content":"en/adapterref/iobroker.hiob/docs/en/example_updates.md"},"en/adapterref/iobroker.hiob/docs/en/example_window.md":{"title":{"en":"ioBroker Status Windows"},"content":"en/adapterref/iobroker.hiob/docs/en/example_window.md"},"en/adapterref/iobroker.hiob/docs/en/example_door.md":{"title":{"en":"ioBroker Status doors"},"content":"en/adapterref/iobroker.hiob/docs/en/example_door.md"},"en/adapterref/iobroker.hiob/docs/en/button.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/button.md"},"en/adapterref/iobroker.hiob/docs/en/value.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/value.md"},"en/adapterref/iobroker.hiob/docs/en/advanced.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/advanced.md"},"en/adapterref/iobroker.hiob/docs/en/switch_w_slider.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/switch_w_slider.md"},"en/adapterref/iobroker.hiob/docs/en/division.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/division.md"},"en/adapterref/iobroker.hiob/docs/en/webview.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/webview.md"},"en/adapterref/iobroker.hiob/docs/en/table.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/table.md"},"en/adapterref/iobroker.hiob/docs/en/graph.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/graph.md"},"en/adapterref/iobroker.hiob/docs/en/color.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/color.md"},"en/adapterref/iobroker.hiob/docs/en/media_player.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/media_player.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hiob/docs/en/notifications.md
title: без названия
hash: wot1LFs0L0krXwfbYdqUSB6WKKHMOnFrLOmlRALwM7U=
---
![Логотип](../../../../../en/adapterref/iobroker.hiob/admin/hiob.png)

- [Вернуться к сводке](/#/docs/adapterref/iobroker.hiob/docs/en/README.md)

## Уведомления

❗ **Важно** ❗: Эта функция пока находится на стадии бета-тестирования:

- Если у приложения **нет** активного соединения с ioBroker, сохраняется **до** 250 сообщений, которые отправляются при повторном подключении.
- **Нет никакой** гарантии, что уведомления будут получены.
- Возможно **значительное** потребление заряда батареи.
- Приложение может **в любой момент** **потерять** связь с сервером, если оно находится в фоновом режиме.

### Первые шаги

1. Отключите оптимизацию батареи для этого приложения на вашем устройстве. (В настройках устройства)
   - Это необходимо для того, чтобы предотвратить остановку приложения в фоновом режиме операционной системой Android в целях экономии энергии.
2. разрешить уведомления для приложения
3. В настройках приложения можно включить фоновые уведомления.
4. перезапустите приложение один раз.

### Отправить уведомления

- `notificationBacklog` Сообщения из очереди
- `sendNotification` Сообщение в текстовом формате или в формате JSON.

![Пример](../../../../../en/adapterref/iobroker.hiob/docs/en/img/notify_state.png)

### Пользовательские уведомления

#### Схема

```JSON
{
	"$schema": "https://json-schema.org/draft/2019-09/schema",
    "type": "object",
    "properties": {
      "title": {
      	"type": "string",
        "descreption": "The title of your notification",
        "exclusiveMinimum": 0
      },
      "body": {
      	"type": "string",
        "descreption": "The body of your notification",
        "exclusiveMinimum": 0
      },
      "locked": {
      	"type": "boolean",
        "descreption": "Wether it should be dissmisable ",
      },
      "group": {
      	"type": "boolean",
        "descreption": "Goups ",
      },
      "colorARGB": {
      	"type": "string",
        "descreption": "ARGB Color Hex code ",
        "exclusiveMinimum": 0
      },
      "id": {
      	"type": "number",
        "descreption": "Notification ID. If you do not want to send a new notification, give it the same ID and the old one will be overwritten",
      }
    }
}
```

#### Цвет - цвет`ARGB`

- `A` — это значение альфа-канала, где 0 означает прозрачность, а 255 — полную непрозрачность. — Преобразовать десятичное число в шестнадцатеричное: 255 == FF
- `R` Красный цвет, от 0 до 255 - Преобразовать десятичное число в шестнадцатеричное 255 == FF
- `G` Зеленый цвет, от 0 до 255 - Преобразовать десятичное число в шестнадцатеричное 255 == FF
- `B` синий, от 0 до 255 - Преобразовать десятичную дробь в шестнадцатеричную 255 == FF
- `ARGB` == FFFFFFFF

#### Пример

```JSON
{
  "title": "Bewegung",
  "body": "Es wurde eine Bewungung in der Küche erkannt",
  "locked": false,
  "colorARGB": "FFFF0000"
}
```

#### Пример использования функции Blockly sendTo

Также можно отправлять уведомления через Blockly, используя функцию sendTo:

- Параметры
  - **uuid** : Идентификатор устройства. Его можно найти по адресу hiob.x.devices
  - **Уведомление** : Отправляемое уведомление: Схема объекта (см. выше)
- **Пример**<br>![Пример](../../../../../en/adapterref/iobroker.hiob/docs/en/img/sendToExample.png)

```JS
sendTo('hiob.0', 'send', { 'uuid': '52e34cca-c85a-423a-a07b-c711a0d1575a', 'notification': { 'title': 'Title', 'body': 'Bewegung erkannt' } });
```

#### Пример использования одного и того же идентификатора — Javascript Adapter >= 7.9.0

**Блокли** <br>![Пример](img/notificationBlockly2.png)<br>![Пример](img/notificationID.png)<br> **Блокированный результат** <br>![Пример](img/notificationCallback.png)<br> **Уведомление**<br>![Пример](../../../../../en/adapterref/iobroker.hiob/docs/en/img/notificationIDExample.gif)

- [Вернуться к сводке](/#/docs/adapterref/iobroker.hiob/docs/en/README.md)