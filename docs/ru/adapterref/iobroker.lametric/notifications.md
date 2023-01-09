---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lametric/notifications.md
title: ioBroker.lametric
hash: aNJ8HrBOWxtu8Qq3HfnLnEtZsdgGnKJDFWuw375fDwI=
---
![логотип](../../../de/admin/lametric.png)

# IoBroker.lametric
## Уведомления
Чтобы отображать сообщения/уведомления на вашем *LaMetric Time*, отправьте сообщение с адаптером JavaScript (или другим адаптером) в соответствующий экземпляр:

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

### Пример одного кадра
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

### Пример нескольких кадров
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

### Пример циклической информации
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

### Образец пользовательского звука
Требуется mp3 в следующем формате:

- Частота дискретизации: 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000
- Каналы: моно или стерео
- Размер выборки: 16 бит

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