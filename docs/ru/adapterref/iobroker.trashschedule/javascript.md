---
chapters: {"pages":{"de/adapterref/iobroker.trashschedule/README.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/README.md"},"de/adapterref/iobroker.trashschedule/blockly.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/blockly.md"},"de/adapterref/iobroker.trashschedule/faq.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/faq.md"},"de/adapterref/iobroker.trashschedule/javascript.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trashschedule/javascript.md
title: ioBroker.trashschedule
hash: faj6aOTZ4soqf5aFj3ie/U9vtAOowzbSnbWz7H5rtNE=
---
![логотип](../../../de/admin/trashschedule.png)

# IoBroker.trashschedule
Общая функция для отправки сообщений

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
    const nextDateFound = getState('trashschedule.0.next.dateFound').val;
    const daysLeft = getState('trashschedule.0.next.daysLeft').val;

    if (nextDateFound && daysLeft == 1) {
        const nextText = getState('trashschedule.0.next.typesText').val;

        sendText(`Morgen wird der Müll abgeholt: ${nextText}`);
    }
});
```

## Напоминание о дне самовывоза
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