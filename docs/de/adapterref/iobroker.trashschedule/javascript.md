---
chapters: {"pages":{"de/adapterref/iobroker.trashschedule/README.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/README.md"},"de/adapterref/iobroker.trashschedule/blockly.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/blockly.md"},"de/adapterref/iobroker.trashschedule/faq.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/faq.md"},"de/adapterref/iobroker.trashschedule/javascript.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/javascript.md"}}}
---
![Logo](../../admin/trashschedule.png)

# ioBroker.trashschedule

Allgemeine Funktion um Nachrichten zu versenden

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

## Erinnerung 1 Tag vor Abholung

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

## Erinnerung am Abholtag

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

## Erinnerung über nicht gefundene Abfalltypen im Kalender

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