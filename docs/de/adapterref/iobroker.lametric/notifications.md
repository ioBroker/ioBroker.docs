---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
---
![Logo](../../admin/lametric.png)

# ioBroker.lametric

## Notifications

Um Nachrichten/Notifications auf Deiner *LaMetric Time* anzuzeigen, sende eine Nachricht mit dem JavaScript Adapter (oder einem anderen Adapter) an die entsprechende Instanz:

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

### Beispiel einzelner Frame

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

### Beispiel mehrere Frames

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

### Beispiel zyklische Informationen

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

### Beispiel custom sound

Erfordert mp3 mit folgendem Format:

- Sample Rate: 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000
- Channels: mono or stereo
- Sample Size: 16bit

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