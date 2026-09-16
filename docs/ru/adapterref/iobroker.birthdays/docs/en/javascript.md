---
chapters: {"pages":{"de/adapterref/iobroker.birthdays/README.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/README.md"},"de/adapterref/iobroker.birthdays/ical.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/ical.md"},"de/adapterref/iobroker.birthdays/carddav.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/carddav.md"},"de/adapterref/iobroker.birthdays/docs/en/blockly.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/docs/en/blockly.md"},"de/adapterref/iobroker.birthdays/docs/en/javascript.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/docs/en/javascript.md"},"de/adapterref/iobroker.birthdays/blockly.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/blockly.md"},"de/adapterref/iobroker.birthdays/javascript.md":{"title":{"de":"ioBroker.birthdays"},"content":"de/adapterref/iobroker.birthdays/javascript.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.birthdays/docs/en/javascript.md
title: ioBroker.birthdays
hash: RIwb5Sf7GsGAIGq9+rhvFhbU2gtWyhVPzmxFfpd0a/Q=
---
![логотип](../../../../../de/adapterref/iobroker.birthdays/admin/birthdays.png)

# ioBroker.birthdays

Обычная функция для отправки сообщений/уведомлений.

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

## Уведомить за 1 день до дня рождения

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

## Напоминание о днях рождения на предстоящей неделе

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