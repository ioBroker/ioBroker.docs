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
    const nextDateFound = getState('trashschedule.0.next.dateFound').val;
    const daysLeft = getState('trashschedule.0.next.daysLeft').val;

    if (nextDateFound && daysLeft == 1) {
        const nextText = getState('trashschedule.0.next.typesText').val;

        sendText(`Morgen wird der Müll abgeholt: ${nextText}`);
    }
});
```

## Erinnerung am Abholtag

```javascript
schedule('0 7 * * *', async () => {
    const nextDateFound = getState('trashschedule.0.next.dateFound').val;
    const daysLeft = getState('trashschedule.0.next.daysLeft').val;

    if (nextDateFound && daysLeft == 0) {
        const nextText = getState('trashschedule.0.next.typesText').val;

        sendText(`Heute wird der Müll abgeholt: ${nextText}`);
    }
});
```