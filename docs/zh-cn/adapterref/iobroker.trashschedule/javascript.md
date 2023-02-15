---
chapters: {"pages":{"de/adapterref/iobroker.trashschedule/README.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/README.md"},"de/adapterref/iobroker.trashschedule/blockly.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/blockly.md"},"de/adapterref/iobroker.trashschedule/faq.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/faq.md"},"de/adapterref/iobroker.trashschedule/javascript.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.trashschedule/javascript.md
title: ioBroker.trashschedule
hash: faj6aOTZ4soqf5aFj3ie/U9vtAOowzbSnbWz7H5rtNE=
---
![标识](../../../de/admin/trashschedule.png)

# IoBroker.trashschedule
发送消息的通用函数

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

## 提货前1天提醒
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

## 取件日提醒
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