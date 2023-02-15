---
chapters: {"pages":{"en/adapterref/iobroker.birthdays/README.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/README.md"},"en/adapterref/iobroker.birthdays/ical.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/ical.md"},"en/adapterref/iobroker.birthdays/carddav.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/carddav.md"},"en/adapterref/iobroker.birthdays/blockly.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/blockly.md"},"en/adapterref/iobroker.birthdays/javascript.md":{"title":{"en":"ioBroker.birthdays"},"content":"en/adapterref/iobroker.birthdays/javascript.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.birthdays/javascript.md
title: ioBroker.生日
hash: RIwb5Sf7GsGAIGq9+rhvFhbU2gtWyhVPzmxFfpd0a/Q=
---
![标识](../../../en/admin/birthdays.png)

# IoBroker.生日
发送消息/通知的常用功能

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

## 生日前1天通知
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

## 下周生日提醒
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