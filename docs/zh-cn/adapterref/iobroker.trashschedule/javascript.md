---
chapters: {"pages":{"de/adapterref/iobroker.trashschedule/README.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/README.md"},"de/adapterref/iobroker.trashschedule/blockly.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/blockly.md"},"de/adapterref/iobroker.trashschedule/faq.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/faq.md"},"de/adapterref/iobroker.trashschedule/javascript.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/javascript.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.trashschedule/javascript.md
title: ioBroker.trashschedule
hash: cxuDJQ+FE/gJo8Qr10VP3+MokTAvixeultz+dNobj/k=
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

## 提货前 1 天提醒
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

## 取货日提醒
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

## 关于日历中未找到的废物类型的提醒
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