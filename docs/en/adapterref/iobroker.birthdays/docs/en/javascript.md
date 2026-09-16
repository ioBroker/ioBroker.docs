---
chapters: {"pages":{"de/adapterref/iobroker.birthdays/README.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/README.md"},"de/adapterref/iobroker.birthdays/ical.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/ical.md"},"de/adapterref/iobroker.birthdays/carddav.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/carddav.md"},"de/adapterref/iobroker.birthdays/docs/en/blockly.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/docs/en/blockly.md"},"de/adapterref/iobroker.birthdays/docs/en/javascript.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/docs/en/javascript.md"},"de/adapterref/iobroker.birthdays/blockly.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/blockly.md"},"de/adapterref/iobroker.birthdays/javascript.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/javascript.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.birthdays/docs/en/javascript.md
title: ioBroker.birthdays
hash: RIwb5Sf7GsGAIGq9+rhvFhbU2gtWyhVPzmxFfpd0a/Q=
---
![logo](../../../../../de/adapterref/iobroker.birthdays/admin/birthdays.png)

# ioBroker.birthdays

Common function to send messages / notifications

```javascript
function sendText(text) {
    // Own logic (pushover, telegram, ...)
    sendTo('pushover', 'send', {
        message: text,
        sound: '',
        title: 'Birthday calendar'
    });
}
```

## Notify 1 day before birthday

```javascript
schedule('0 7 * * *', async () => {
    const nextDaysLeft = getState('birthdays.0.next.daysLeft').val;
    const nextText = getState('birthdays.0.next.text').val;

    const nextAfterDaysLeft = getState('birthdays.0.nextAfter.daysLeft').val;
    const nextAfterText = getState('birthdays.0.nextAfter.text').val;

    // Birthday today
    if (nextDaysLeft == 0) {
        sendText(`Birthdays today: ${nextText}`);

        // If tomorrow is also a birthday
        if (nextAfterDaysLeft == 1) {
            sendText(`Birthdays tomorrow: ${nextAfterText}`);
        }
    } else if (nextDaysLeft == 1) {
        sendText(`Birthdays tomorrow: ${nextText}`);
    }
});
```

## Reminder of birthdays in the upcoming week

```javascript
// Run script at the beginning of the week
schedule('0 7 * * 1', async () => {
    const summaryObj = JSON.parse(getState('birthdays.0.summary.json').val);

    const nextBirthdays = summaryObj
        .filter(b => b.daysLeft < 7)
        .map(b => `${b.name} turns ${b.age} on ${formatDate(new Date(b._nextBirthday), 'WW')}`);

    if (nextBirthdays.length > 0) {
        sendText(`Birthdays this week: ${nextBirthdays.join(', ')}`);
    }
});
```