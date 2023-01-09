---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/notifications.md
title: ioBroker.lametric 文件
hash: aNJ8HrBOWxtu8Qq3HfnLnEtZsdgGnKJDFWuw375fDwI=
---
![商标](../../../de/admin/lametric.png)

#ioBroker.lametric
## 通知
要在您的 *LaMetric Time* 上显示消息/通知，请使用 JavaScript 适配器（或其他适配器）将消息发送到适当的实例：

```JavaScript
sendTo(
    'lametric.0',
    'notification',
    {
        priority: '[info|warning|critical]',
        iconType: '[none|info|alert]',
        sound: '<string from sound list>',
        lifeTime: <milliseconds>,
        icon: '<icon>',
        text: '<string|array>',
        cycles: <integer>
    }
);
```

### 单帧示例
```JavaScript
sendTo(
    'lametric.0',
    'notification',
    {
        priority: 'info',
        iconType: 'none',
        sound: 'cat',
        lifeTime: 5000,
        icon: 'i31820',
        text: 'test',
        cycles: 1
    }
);
```

### 多帧示例
```JavaScript
sendTo(
    'lametric.0',
    'notification',
    {
        priority: 'info',
        iconType: 'none',
        sound: 'cat',
        lifeTime: 5000,
        icon: 'i31820',
        text: ['frame 1', 'frame 2', 'frame 3'],
        cycles: 1
    }
);
```

###循环信息示例
```JavaScript
let i = 0;
function show() {
    console.log('Show ' + i);
    sendTo(
        'lametric.0',
        'notification',
        {
            priority: 'info',
            iconType: 'info',
            lifeTime: 5000,
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAAySURBVBhXY4AAYdcKk1lngCSUDwHIfAQbzgLqgDCgIqRLwFkQCYQoBAD5EATl4wQMDADhuxQzaDgX0gAAAABJRU5ErkJggg==',
            text: 'Hi ' + i,
            cycles: 1
        }
    );
    i++;
}
setInterval(show, 10000);
show();
```

### 示例自定义声音
需要以下格式的 mp3：

- 采样率：44100、32000、24000、22050、16000、12000、11025、8000
- 通道：单声道或立体声
- 样本大小：16 位

```JavaScript
sendTo(
    'lametric.0',
    'notification',
    {
        priority: 'info',
        iconType: 'none',
        soundUrl: 'http://172.16.0.126:8082/state/sayit.0.tts.mp3',
        lifeTime: 5000,
        icon: 'i31820',
        text: 'test',
        cycles: 1
    }
);
```