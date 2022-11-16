---
chapters: {"pages":{"en/adapterref/iobroker.birthdays/README.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/README.md"},"en/adapterref/iobroker.birthdays/ical.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/ical.md"},"en/adapterref/iobroker.birthdays/carddav.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/carddav.md"},"en/adapterref/iobroker.birthdays/blockly.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/blockly.md"},"en/adapterref/iobroker.birthdays/javascript.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/javascript.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.birthdays/javascript.md
title: ioBroker.Geburtstage
hash: +XrvphC5uZhQ3UYjVX1Kjaf+4a8NwNr7uhPakRnTUlk=
---
![Logo](../../../en/adapterref/iobroker.birthdays/../../admin/birthdays.png)

# IoBroker.geburtstage
Gemeinsame Funktion zum Senden von Nachrichten / Benachrichtigungen

```javascript
function sendText(text) {
    // Eigene Logik (pushover, telegram, ...)
    sendTo('pushover', 'send', {
        message: text,
        sound: '',
        title: 'Geburtstags-Kalender'
    });
}
```

## Denken Sie daran, 1 Tag vor dem Geburtstag
```javascript
schedule('0 7 * * *', async () => {
    const nextDaysLeft = getState('birthdays.0.next.daysLeft').val;
    const nextText = getState('birthdays.0.next.text').val;

    const nextAfterDaysLeft = getState('birthdays.0.nextAfter.daysLeft').val;
    const nextAfterText = getState('birthdays.0.nextAfter.text').val;

    // Birthday today
    if (nextDaysLeft == 0) {
        sendText(`Geburtstage heute: ${nextText}`);

        // If tomorrow is also a birthday
        if (nextAfterDaysLeft == 1) {
            sendText(`Geburtstage morgen: ${nextAfterText}`);
        }
    } else if (nextDaysLeft == 1) {
        sendText(`Geburtstage morgen: ${nextText}`);
    }
});
```

## Erinnerung an Geburtstage in der kommenden Woche
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