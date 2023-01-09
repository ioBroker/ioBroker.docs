---
chapters: {"pages":{"en/adapterref/iobroker.lametric/README.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/README.md"},"en/adapterref/iobroker.lametric/apps.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/apps.md"},"en/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/my-data-diy.md"},"en/adapterref/iobroker.lametric/notifications.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/notifications.md"},"en/adapterref/iobroker.lametric/blockly.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/blockly.md"}}}
---
![Logo](../../admin/lametric.png)

# ioBroker.lametric

## Notifications

To show messages/notifications on your *LaMetric Time*, send a message to the specific instance with the JavaScript adapter (or other adapters):

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

### Example single frame

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

### Example multiple frames

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

### Example to show some information cyclic

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

### Example custom sound

Requires mp3 file with the following format:

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