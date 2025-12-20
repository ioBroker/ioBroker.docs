---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/ble-devices.md
title: ioBroker.shelly
hash: aEWF5+BxF+wZ1WT86EnQQ3RuVt4QqUNKVvn3yZ9Z2YE=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
**此功能为实验性功能！**

必须在 Plus 或 Pro 设备（第二代及以上）上创建一个新脚本（见下文），才能以 JSON 格式接收此状态下的事件：`shelly.0.<device>.BLE.Event`。

所有已知 BLE 设备的设备状态都收集在 `shelly.0.ble.<macAddress>` 中。*设备对象名称可以更改以识别设备。*

自适配器版本 7.1.0 起，在 `shelly.0.ble.<macAddress>.receivedBy` 下提供了已接收到蓝牙消息的所有设备列表（JSON 对象）。示例格式：

```json
{
  "shelly1pmminig3-3030f9e512ac": {
    "rssi": -49,
    "ts": 1714383830316
  },
  "shellypmminig3-84fce63c5d7c": {
    "rssi": -39,
    "ts": 1714383830416
  }
}
```

### YouTube 上的 Shelly BLE 视频教程（德语）
- https://www.youtube.com/watch?v=qOjEFsCjhLg
- https://www.youtube.com/watch?v=FubPHOsktbU

＃＃＃ 要求
- Shelly Gen2+ 设备上的自定义脚本（见下文，只需复制/粘贴）
- Shelly BLU 设备
- 与适配器版本相匹配的正确脚本版本

| 适配器版本 | 脚本版本 |
|-----------------------------------------------------------------------------------------------------------------|----------------|
| [版本 >= 10.3.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v10.3.0/docs/en/ble-devices.md) | v1.2 |
| [版本 >= 10.0.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v10.1.0/docs/en/ble-devices.md) | v1.0 |
| [版本 >= 9.1.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v9.1.0/docs/en/ble-devices.md) | v0.5 |
| [版本 >= 8.2.1](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v8.2.1/docs/en/ble-devices.md) | v0.4 |
| [版本 >= 8.0.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v8.0.0/docs/en/ble-devices.md) | v0.3 |
| [版本 >= 6.8.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v6.8.0/docs/en/ble-devices.md) | v0.2 |
| [版本 >= 6.6.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v6.6.0/docs/en/ble-devices.md) | v0.1 |
| [>= 6.6.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v6.6.0/docs/en/ble-devices.md) | v0.1 |

*自脚本版本 v1.0 起，BLE 消息的处理已迁移至 ioBroker。旧版本可能无法在第三代设备上运行，因为这些设备需要更多资源来解包蓝牙消息。*

## 加密
自适配器版本 >10.0.0 起，已支持加密。

- 使用 Shelly Debug App（例如，在 Android 智能手机上）对设备进行加密。
复制加密密钥
- 触发新的 BLE 事件以生成所需的状态
- 将加密密钥保存到 `shelly.0.ble.<macAddress>.encryptionKey` 中（`ack: false`）。

之后，即可解码下一个BLE事件。

## 激活蓝牙
**重要提示** 请务必启用将用作网关的 Shelly 设备上的蓝牙功能。

## JavaScript（Shelly 脚本）
在 Shelly Plus 或 Pro 设备（第二代及更高版本）的 Shelly 脚本部分添加并运行此脚本：

```javascript
// v1.2
const SCRIPT_VERSION = '1.2';
const BTHOME_SVC_ID_STR = 'fcd2';

let SHELLY_ID = undefined;

function convertToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        h = str.charCodeAt(i).toString(16);
        hex += ('00' + h).slice(-2);
    }
    return hex;
}

// Callback for the BLE scanner object
function bleScanCallback(event, result) {
    // exit if not a result of a scan
    if (event !== BLE.Scanner.SCAN_RESULT) {
        return;
    }

    // exit if service_data member is missing
    if (
        typeof result.service_data === 'undefined' ||
        typeof result.service_data[BTHOME_SVC_ID_STR] === 'undefined'
    ) {
        return;
    }

    // create MQTT-Payload
    let message = {
        scriptVersion: SCRIPT_VERSION,
        src: SHELLY_ID,
        srcBle: {
            type: result.local_name,
            mac: result.addr,
            rssi: result.rssi
        },
        payload: convertToHex(result.service_data[BTHOME_SVC_ID_STR])
    };

    if (MQTT.isConnected()) {
        MQTT.publish(SHELLY_ID + '/events/ble', JSON.stringify(message));
    }
}

// Initializes the script and performs the necessary checks and configurations
function init() {
    // get the config of ble component
    let bleConfig = Shelly.getComponentConfig('ble');

    // exit if the BLE isn't enabled
    if (!bleConfig.enable) {
        console.log('Error: The Bluetooth is not enabled, please enable it in the settings');
        return;
    }

    // check if the scanner is already running
    if (BLE.Scanner.isRunning()) {
        console.log('Info: The BLE gateway is running, the BLE scan configuration is managed by the device');
    } else {
        // start the scanner
        let bleScanner = BLE.Scanner.Start({
            duration_ms: BLE.Scanner.INFINITE_SCAN,
            active: true
        });

        if (!bleScanner) {
            console.log('Error: Can not start new scanner');
        }
    }

    BLE.Scanner.Subscribe(bleScanCallback);
}

Shelly.call('Mqtt.GetConfig', '', function (res, err_code, err_msg, ud) {
    SHELLY_ID = res['topic_prefix'];

    init();
});
```

## 示例有效载荷（仅供开发使用）
**Shelly BLU Button（和 Tough 1）**

- 文档：https://shelly-api-docs.shelly.cloud/docs-ble/Devices/button
- 已使用固件版本：`20250314-080633/v1.0.22@cb5ca611` 进行测试

```json
{
  "encryption": false,
  "BTHome_version": 2,
  "pid": 6,
  "battery": 70,
  "button": 1 // 1 = einzelner Druck, 2 = Doppeldruck, 3 = Dreifachdruck, 4 = langer Druck
}
```

**Shelly BLU H&T**

- 文档：https://shelly-api-docs.shelly.cloud/docs-ble/Devices/ht
- 已使用固件版本：`20250314-080647/v1.0.22@cb5ca611` 进行测试

```json

```

**Shelly BLU 门窗**

- 文档：https://shelly-api-docs.shelly.cloud/docs-ble/Devices/dw
- 已使用固件版本：`20250314-080641/v1.0.22@cb5ca611` 进行测试

```json
{
  "encryption": false,
  "BTHome_version": 2,
  "pid": 12,
  "battery": 100,
  "illuminance": 13,
  "window": 0, // 1 = offen, 0 = geschlossen
  "rotation": 0
}
```

**Shelly BLU Motion**

- 文档：https://shelly-api-docs.shelly.cloud/docs-ble/Devices/motion
- 已使用固件版本：`20250314-080656/v1.0.22@cb5ca611` 进行测试

```json
{
  "encryption": false,
  "BTHome_version": 2,
  "pid": 182,
  "battery": 100,
  "temperature": 25.9,
  "illuminance": 427,
  "motion": 1 // 1 = Bewegung, 0 = Bewegung beendet
}
```