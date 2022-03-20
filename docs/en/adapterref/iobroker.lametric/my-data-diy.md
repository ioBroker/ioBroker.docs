---
chapters: {"pages":{"en/adapterref/iobroker.lametric/README.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/README.md"},"en/adapterref/iobroker.lametric/apps.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/apps.md"},"en/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/my-data-diy.md"},"en/adapterref/iobroker.lametric/notifications.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/notifications.md"},"en/adapterref/iobroker.lametric/blockly.md":{"title":{"en":"ioBroker.lametric"},"content":"en/adapterref/iobroker.lametric/blockly.md"}}}
---
![Logo](../../admin/lametric.png)

# ioBroker.lametric

## My Data (DIY) *(version > 1.1.0)*

*LaMetric* offers an app (on the integrated app market) to poll custom data. This app is called [My Data DIY](https://apps.lametric.com/apps/my_data__diy_/8942). This adapter creates a new state in the required format.
You can use the Simple API Adapter to transfer the data to the LaMetric Time.

```ioBroker LaMetric Adapter -> State with Frame information <- Simple API Adapter <- My Data DIY App <- LaMetric```

### Configuration (with authentication)

1. Install the [Simple API ioBroker Adapter](https://github.com/ioBroker/ioBroker.simple-api)
2. Create a new ioBroker user called ``lametric`` with a custom password (e.g. ``HhX7dZl3Fe``)
3. Add the ``lametric`` user to the default group ``users``
4. Install this *My Data DIY* App on your *LaMetric Time* (use Market)
5. Open the *My Data (DIY)* app settings and configure the simple api url (see below)
6. Go to the adapter configuration and configure the frames with your custom information (see next chapter)

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json&user=lametric&pass=HhX7dZl3Fe
```

**Important: use json flag of SimpleAPI Adapter (available since version 2.6.2)**

**Ensure to update IP, port, user and password in the URL if necessary!**

### Configuration (without authentication)

1. Install the [Simple API ioBroker Adapter](https://github.com/ioBroker/ioBroker.simple-api)
2. Install this *My Data DIY* App on your LaMetric Time (use Market)
3. Open the *My Data (DIY)* app settings and configure the simple api url (see below)
4. Go to the adapter configuration and configure the frames with your custom information (see next chapter)

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json
```

**Ensure to update IP and port in the URL if necessary!**

### Frame Configuration *(version > 1.1.0)*

- Use the plus icon to add as many frames as you want
- Icon: Choose an icon from the [official website](https://developer.lametric.com/icons) and put the ID in the configuration field. **Important: Add an i (for static icons) or an a (for animated icons) as a prefix for that ID. (Example: `i3389`)**
- Text: Just type the text information for the frame. You can use states in curly braces. These information will be replaced with the corresponding value of the state. (Example: `{youtube.0.channels.HausAutomatisierungCom.statistics.subscriberCount} Subscribers`)

Example configuration of some frames:

![example frame config](./img/my-data-diy.png)