---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nextcloudtalk/README.md
title: ioBroker Nextcloud Talk Adapter
hash: AvcJQp7vvOTlRPuDaTvGbQyOHDDvlEj6jxsjSOT1sLo=
---
# ioBroker Nextcloud Talk Adapter

Этот адаптер отправляет сообщения в комнаты Nextcloud Talk и может, при желании, принимать сообщения из одной из комнат.

## Конфигурация

Теперь этот адаптер использует систему конфигурации ioBroker JSON. Введите следующие параметры в диалоговом окне экземпляра:

1. **URL сервера** – например `https://nextcloud.example.com`
2. **Имя пользователя** для базовой аутентификации
3. Для пользователя сгенерирован **токен приложения** .

## Отправка инструкции

Напишите JSON-строку для `nextcloudtalk.0.send` Чтобы выбрать комнату и текст одновременно:

```js
setState('nextcloudtalk.0.send', JSON.stringify({ roomId: 'abc123', text: 'Hello from ioBroker' }));
```

Оба поля должны быть непустыми строками. При записи необходимо использовать `ack=false`, что является значением по умолчанию для `setState`. The `send` состояние не меняется `roomID`.

Существующие скрипты и правила Blockly могут продолжать использовать устаревшие состояния: set `roomID` в токен комнаты обсуждения, затем напишите сообщение в `text` с `ack=false`. `roomID` выбирает комнату; пишет `text` отправляет сообщение. Оба способа отправки используют Talk. `/ocs/v2.php/apps/spreed/api/v1/chat/{token}` конечная точка.

## Получение инструкций

1. В настройках экземпляра адаптера включите функцию **«Принимать сообщения»** и введите один **токен комнаты для приема** сообщений. Настроенная учетная запись Nextcloud должна принадлежать к этой беседе. Прием сообщений по умолчанию отключен, и отслеживается только эта комната.
2. Отправьте _новое_ сообщение в эту комнату с другого аккаунта Talk. Первый опрос определяет текущую позицию и не воспроизводит старые сообщения.
3. Смотреть `nextcloudtalk.0.received` Каждое входящее сообщение от пользователя записывает подтвержденную JSON-строку, например:

   ```json
   {"roomId":"abc123","id":42,"text":"Light on","actorId":"alice","actorDisplayName":"Alice","timestamp":1780000000,"messageType":"comment"}
   ```

### Используйте это сообщение на JavaScript.

Подпишитесь на каждое обновление, проанализируйте JSON и определите, каких отправителей и какие тексты принимает ваш скрипт:

```js
on({ id: 'nextcloudtalk.0.received', change: 'any', ack: true }, obj => {
    const message = JSON.parse(obj.state.val);
    if (message.actorId === 'alice' && message.text === 'Light on') {
        // Perform your chosen ioBroker action here.
    }
});
```

### Используйте это сообщение в Blockly.

Создайте триггер изменения состояния для `nextcloudtalk.0.received` и выберите **любое обновление** . Внутри него передайте текущее значение триггера. **Преобразуйте JSON в объект** и сохраните результат в переменной, например, такой: `message` Используйте **атрибут … объекта …** с этой переменной для чтения. `text`, `actorId` или другое поле. Например, сравните `actorId` с `alice` и `text` с `Light on` в блоке **if** перед выполнением действия.

Адаптер игнорирует собственные сообщения и сообщения системы Talk. Он не помечает сообщения или уведомления как прочитанные и не выполняет команды чата. `nextcloudtalk.0.receiveCursor` Сохраняет токен комнаты и идентификатор последнего обработанного сообщения при перезапусках. Перезапуск между публикацией. `received` Сохранение курсора может привести к повторному отображению сообщения; скрипты, требующие защиты от дубликатов, должны отслеживать `roomId` и `id` В журнале адаптера при успешном выполнении опроса ничего не говорится; при сбое запроса появляются предупреждения.

## Changelog

### Unreleased

### 2.0.0
* Add atomic per-message sending through `send` while keeping `roomID` and `text` compatible.
* Add optional single-room Talk message receiving through the `received` state.
* Add separate sending and receiving how-to guides.

### 1.0.3
* Adapter requires node.js >= 22 now

### 1.0.2
* updated logo
* tests

### 1.0.1
* initial version

### 1.0.0
* initial version

## License

Copyright (c) 2025-2026 Rello <github@scherello.de>

[GNU Affero General Public License v3.0](https://github.com/Rello/ioBroker.nextcloudtalk/blob/master/LICENSE)