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
    const nextDateFound = getState('trashschedule.0.next.dateFound').val;
    const daysLeft = getState('trashschedule.0.next.daysLeft').val;

    if (nextDateFound && daysLeft == 1) {
        const nextText = getState('trashschedule.0.next.typesText').val;

        sendText(`Trash will be picked up tomorrow: ${nextText}`);
    }
});
```

## Notify at pickup day

```javascript
schedule('0 7 * * *', async () => {
    const nextDateFound = getState('trashschedule.0.next.dateFound').val;
    const daysLeft = getState('trashschedule.0.next.daysLeft').val;

    if (nextDateFound && daysLeft == 0) {
        const nextText = getState('trashschedule.0.next.typesText').val;

        sendText(`Trash will be picked up today: ${nextText}`);
    }
});
```