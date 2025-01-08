---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/logging.md
title: нет названия
hash: lqS7I0eLZt6tvBnm62QI2XrnTsl3mo5xbcJoPKJRbG8=
---
## Транспортер бревен
Если вы хотите подписаться на определенные или все журналы адаптеров ioBroker, вы можете использовать **logTransporter**. Для активации в вашем адаптере добавьте `"logTransporter": true` в общую структуру вашего `io-package.json`.<br><br> В коде адаптера (например, в файле `main.js`) вам затем нужно будет вызвать `requireLog(true)` для активации. После того, как requireLog() установлен в значение true, вы можете использовать `on('log', callback)` для подписки на все новые журналы, поступающие от адаптеров. Функция обратного вызова возвращает все журналы со следующим объектом (пример):

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

## Справочная информация
Есть специальный тип адаптеров, которые потребляют логи. Обычно все адаптеры записывают свои сообщения в файл журнала с помощью логгера.
Но некоторые адаптеры должны показывать логи или хранить их как-то еще.

Для создания такого типа адаптера в его общей структуре должен быть флаг **logTransporter**.

Если такой флаг присутствует, адаптер.js автоматически создает для него специальное состояние - "system.adapter.adapterName.X.logging".
Эта переменная должна быть установлена адаптером logTransport в значение true, когда этот адаптер хочет получать логи.

«system.adapter.adapterName.X.logging» — это очередь fifo списка типов redis.

Другие адаптеры отслеживают все переменные "*.logging" и записывают в соответствующие списки сообщения журнала.
Список ограничен 1000 сообщениями (по умолчанию).

Экземпляр logTransport получает событие «log» с сообщением.

Для управления состоянием "system.adapter.adapterName.X.logging" адаптер должен использовать функцию *requireLog*.
Например, ```adapter.requireLog(true);``` для включения приема журналов.

![Иллюстрация](../../en/dev/media/logging.png)

Функциональность реализована в *adapter.js*, и разработчику нужно просто установить общий флаг *logTransporter* и вызвать *requireLog()*.

Функциональность адаптеров, не являющихся logTransport, реализована в *adapter.js*, и разработчик не должен об этом беспокоиться.