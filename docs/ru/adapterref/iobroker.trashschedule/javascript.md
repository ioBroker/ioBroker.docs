---
chapters: {"pages":{"de/adapterref/iobroker.trashschedule/README.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/README.md"},"de/adapterref/iobroker.trashschedule/blockly.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/blockly.md"},"de/adapterref/iobroker.trashschedule/faq.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/faq.md"},"de/adapterref/iobroker.trashschedule/javascript.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/javascript.md
title: ioBroker.trashschedule
hash: cxuDJQ+FE/gJo8Qr10VP3+MokTAvixeultz+dNobj/k=
---
![логотип](../../../de/admin/trashschedule.png)

# IoBroker.trashschedule
Общая функция отправки сообщений

```javascript
function sendText(text) {
    // Eigene Logik (pushover, telegram, ...)
    sendTo('pushover', 'send', {
        message: text,
        sound: '',
        title: 'Müllkalender'
    });
}
```

## Напоминание за 1 день до получения
```javascript
schedule('0 18 * * *', async () => {
    const nextDateFoundState = await getStateAsync('trashschedule.0.next.dateFound');
    const daysLeftState = await getStateAsync('trashschedule.0.next.daysLeft');

    if (nextDateFoundState.val && daysLeftState.val == 1) {
        const nextTextState = await getStateAsync('trashschedule.0.next.typesText');

        if (nextTextState && nextTextState.val) {
            sendText(`Morgen wird der Müll abgeholt: ${nextTextState.val}`);
        }
    }
});
```

## Напоминание в день получения
```javascript
schedule('0 7 * * *', async () => {
    const nextDateFoundState = await getStateAsync('trashschedule.0.next.dateFound');
    const daysLeftState = await getStateAsync('trashschedule.0.next.daysLeft');

    if (nextDateFoundState.val && daysLeftState.val == 0) {
        const nextTextState = await getStateAsync('trashschedule.0.next.typesText');

        if (nextTextState && nextTextState.val) {
            sendText(`Heute wird der Müll abgeholt: ${nextTextState.val}`);
        }
    }
});
```

## Напоминание о типах отходов, которых нет в календаре
```javascript
schedule('0 12 * * *', async () => {
    const notFoundJsonState = await getStateAsync('trashschedule.0.type.jsonNotFound');

    if (notFoundJsonState && notFoundJsonState.val) {
        try {
            const notFoundTypes = JSON.parse(notFoundJsonState.val);
            const notFoundTypesWarn = notFoundTypes.filter(t => !t.hideWarnings);

            if (notFoundTypesWarn.length > 0) {
                const text = notFoundTypesWarn
                    .map(t => t.name)
                    .join(', ');

                sendText(`Einige Abfalltypen wurden im Kalender nicht gefunden: ${text}`);
            }
        } catch (err) {
            console.error(err);
        }
    }
});
```
