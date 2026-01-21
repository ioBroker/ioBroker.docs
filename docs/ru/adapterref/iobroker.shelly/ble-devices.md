---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/ble-devices.md
title: ioBroker.shelly
hash: aEWF5+BxF+wZ1WT86EnQQ3RuVt4QqUNKVvn3yZ9Z2YE=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
**Эта функция экспериментальная!**

Для получения событий в этом состоянии в формате JSON необходимо создать новый скрипт (см. ниже) на устройстве Plus или Pro (Gen 2+): `shelly.0.<device>.BLE.Event`.

Статус всех известных BLE-устройств собирается в `shelly.0.ble.<macAddress>`. *Имя объекта устройства можно изменить для идентификации устройства.*

Начиная с версии адаптера 7.1.0, список всех устройств (объект JSON), получивших сообщение Bluetooth, предоставляется в разделе `shelly.0.ble.<macAddress>.receivedBy`. Пример формата:

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

### Видеоуроки по Shelly BLE на YouTube (на немецком языке)
- https://www.youtube.com/watch?v=qOjEFsCjhLg
- https://www.youtube.com/watch?v=FubPHOsktbU

### Требования
— Пользовательский скрипт для устройства Shelly Gen2+ (см. ниже, просто скопируйте/вставьте).
- Устройство Shelly BLU
- Правильная версия скрипта для используемой версии адаптера

| Версия адаптера | Версия скрипта |
|-----------------------------------------------------------------------------------------------------------------|----------------|
| [>= 10.3.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v10.3.0/docs/en/ble-devices.md) | v1.2 |
| [>= 10.0.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v10.1.0/docs/en/ble-devices.md) | v1.0 |
| [>= 9.1.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v9.1.0/docs/en/ble-devices.md) | v0.5 |
| [>= 8.2.1](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v8.2.1/docs/en/ble-devices.md) | v0.4 |
| [>= 8.0.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v8.0.0/docs/en/ble-devices.md) | v0.3 |
| [>= 6.8.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v6.8.0/docs/en/ble-devices.md) | v0.2 |
| [>= 6.6.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v6.6.0/docs/en/ble-devices.md) | v0.1 |
| [>= 6.6.0](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/v6.6.0/docs/en/ble-devices.md) | v0.1 |

*Начиная с версии скрипта v1.0, обработка BLE-сообщений перенесена в ioBroker. Более старые версии могут не работать на устройствах Gen3, поскольку им требуется больше ресурсов для распаковки Bluetooth-сообщений.*

## Шифрование
Поддержка шифрования появилась начиная с версии адаптера >10.0.0.

— Используйте приложение Shelly Debug (например, на смартфоне Android), чтобы зашифровать устройство.
- Скопируйте ключ шифрования
- Инициировать новое событие BLE для генерации необходимых состояний.
- Сохраните ключ шифрования в файле `shelly.0.ble.<macAddress>.encryptionKey` (с параметром `ack: false`).

После этого можно будет расшифровать следующее событие BLE.

## Активировать Bluetooth
**ВАЖНО** Пожалуйста, не забудьте активировать функцию Bluetooth на устройстве Shelly, которое будет использоваться в качестве шлюза.

## JavaScript (Shelly Scripting)
Добавьте и запустите этот скрипт в разделе «Скрипты Shelly» на устройстве Shelly Plus или Pro (2-го поколения и выше):

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

## Примеры полезных нагрузок (только для использования в процессе разработки)
**Кнопка Shelly BLU (и Tough 1)**

- Документация: https://shelly-api-docs.shelly.cloud/docs-ble/Devices/button
- Протестировано с прошивкой: `20250314-080633/v1.0.22@cb5ca611`

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

- Документация: https://shelly-api-docs.shelly.cloud/docs-ble/Devices/ht
- Протестировано с прошивкой: `20250314-080647/v1.0.22@cb5ca611`

```json

```

**Дверь/окно Shelly BLU**

- Документация: https://shelly-api-docs.shelly.cloud/docs-ble/Devices/dw
- Протестировано с прошивкой: `20250314-080641/v1.0.22@cb5ca611`

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

- Документация: https://shelly-api-docs.shelly.cloud/docs-ble/Devices/motion
- Протестировано с прошивкой: `20250314-080656/v1.0.22@cb5ca611`

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