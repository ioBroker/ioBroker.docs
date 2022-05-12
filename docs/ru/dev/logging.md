---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/logging.md
title: без названия
hash: FAhDtnxOJ7Fyo4YK2D/r3ZcDQdByr87vZusjjQx1iH0=
---
## Перевозчик журналов
Если вы хотите подписаться на определенные или все журналы адаптеров ioBroker, вы можете использовать **logTransporter**. Для активации в вашем адаптере добавьте `"logTransporter": true` к общей структуре вашего `io-package.json`.<br><br> В коде вашего адаптера (например, в файле `main.js`) вам нужно будет вызвать `requireLog(true)` для активации. Как только для параметра requireLog() установлено значение true, вы можете использовать `on('log', callback)` для подписки на все новые журналы, поступающие от адаптеров. Функция обратного вызова возвращает все журналы со следующим объектом (пример):

```
{from:'testlog.0', message: 'testlog.0 (12504) adapter disabled', severity: 'error', ts:1585413238439}
```

Полный пример из `main.js`:

```
    adapter.requireLog(true);
    adapter.on('log', function(logObject) {
        // Here we have the log in "logObject" and can handle it accordingly.
        const severity = logObject.severity; // the log level (severity): info, warn, error, etc.
        // ....
});
```

## Исходная информация
Есть специальный тип адаптеров, которые потребляют логи. Обычно все адаптеры записывают свои сообщения в файл журнала с помощью logger.
Но некоторые адаптеры должны показывать логи или хранить в них что-то еще.

Для создания такого типа адаптера он должен иметь флаг **logTransporter** в общей структуре.

Если такой флаг присутствует, adapter.js автоматически создает для него специальное состояние - "system.adapter.adapterName.X.logging".
Эта переменная должна быть установлена адаптером logTransport в значение true, когда этот адаптер хочет получать журналы.

«system.adapter.adapterName.X.logging» — это очередь fifo списка типов Redis.

Другие адаптеры контролируют все переменные "*.logging" и записывают в соответствующие списки сообщения журнала.
Список ограничен 1000 сообщений (по умолчанию).

Экземпляр logTransport получает журнал событий с сообщением.

Для управления состоянием «system.adapter.adapterName.X.logging» адаптер должен использовать функцию *requireLog*.
Например. ```adapter.requireLog(true);```, чтобы включить получение журналов.

![Иллюстрация](../../en/dev/media/logging.png)

Функциональность реализована в *adapter.js*, и разработчику достаточно установить общий флаг *logTransporter* и вызвать *requireLog()*.

Функциональность адаптеров, отличных от logTransport, реализована в *adapter.js*, и разработчик не должен об этом заботиться.