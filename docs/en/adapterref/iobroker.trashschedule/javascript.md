---
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/faq.md"},"en/adapterref/iobroker.trashschedule/javascript.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/javascript.md"}}}
---
![Logo](../../admin/trashschedule.png)

# ioBroker.trashschedule

Common function to send messages / notifications

```javascript
function sendText(text) {
    // Own logic (pushover, telegram, ...)
    sendTo('pushover', 'send', {
        message: text,
        sound: '',
        title: 'Trashschedule'
    });
}
```

## Notify 1 day before pickup

```javascript
schedule('0 18 * * *', async () => {
    const nextDateFoundState = await getStateAsync('trashschedule.0.next.dateFound');
    const daysLeftState = await getStateAsync('trashschedule.0.next.daysLeft');

    if (nextDateFoundState.val && daysLeftState.val == 1) {
        const nextTextState = await getStateAsync('trashschedule.0.next.typesText');

        if (nextTextState && nextTextState.val) {
            sendText(`Trash will be picked up tomorrow: ${nextTextState.val}`);
        }
    }
});
```

## Notify at pickup day

```javascript
schedule('0 7 * * *', async () => {
    const nextDateFoundState = await getStateAsync('trashschedule.0.next.dateFound');
    const daysLeftState = await getStateAsync('trashschedule.0.next.daysLeft');

    if (nextDateFoundState.val && daysLeftState.val == 0) {
        const nextTextState = await getStateAsync('trashschedule.0.next.typesText');

        if (nextTextState && nextTextState.val) {
            sendText(`Trash will be picked up today: ${nextTextState.val}`);
        }
    }
});
```

## Notify about missing trash types in calendar

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

                sendText(`Some trash type are missing in calendar: ${text}`);
            }
        } catch (err) {
            console.error(err);
        }
    }
});
```