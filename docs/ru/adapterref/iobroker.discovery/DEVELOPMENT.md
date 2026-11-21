---
chapters: {"pages":{"en/adapterref/iobroker.discovery/README.md":{"title":{"en":"ioBroker Discover Adapter"},"content":"en/adapterref/iobroker.discovery/README.md"},"en/adapterref/iobroker.discovery/DEVELOPMENT.md":{"title":{"en":"Extending discovery"},"content":"en/adapterref/iobroker.discovery/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovery/DEVELOPMENT.md
title: Расширение возможностей обнаружения
hash: psdaBwkksLfvlU1//o2SW+rBjfdpGlp9cjbCHfvEf5Q=
---
# Расширение возможностей обнаружения

Это руководство предназначено для разработчиков адаптеров, которые хотят, чтобы адаптер обнаружения находил их устройства и предлагал их адаптер. Функция обнаружения является одним из требований для стабильного репозитория (см. [правила ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-an-adapter-to-get-added-to-the-stable-repository) ).

В большинстве случаев все изменения касаются трех файлов:

| Файл                                  | Что                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `src/lib/adapters/<adaptername>.ts`   | модуль обнаружения                                                                |
| `test/adapters/<adaptername>.test.js` | его тест, в который были введены данные, полученные с реального устройства.       |
| `README.md`                           | одна строка в разделе "Автоматически обнаружено", одна запись в журнале изменений |

Больше ничего регистрироваться не нужно: модули загружаются извне. `build/lib/adapters/` по имени файла.

**Имя файла должно точно совпадать с именем адаптера** (`myadapter.ts` для `iobroker.myadapter` Система обнаружения загружает модуль только в том случае, если адаптер с таким именем находится в репозитории, используемом при установке, поэтому она никогда не предлагает адаптер, который пользователь не может установить. Модуль с другим именем никогда не загружается.

## Как работает сканирование

```
discovery methods            devices, grouped by type          detection modules           admin
(src/lib/methods/)                                             (src/lib/adapters/)
 ping   ───────────────►  ip      192.168.1.10, .11, ...  ──►  every module with type 'ip'
 mdns   ───────────────►  mdns    192.168.1.10, ...       ──►  every module with type 'mdns'   ──► proposals in
 upnp   ───────────────►  upnp    192.168.1.11, ...       ──►  every module with type 'upnp'       system.discovery
 serial ───────────────►  serial  /dev/ttyUSB0, ...       ──►  every module with type 'serial' ──► discovery dialog
 ...                                                                                               creates instances
```

1. Эти методы сканируют сеть и собирают информацию об устройствах. Один и тот же адрес может встречаться несколько раз, по одному разу для каждого типа: `192.168.1.10` как `ip` устройство (оно ответило на пинг) и как `mdns` устройство (оно объявило о предоставлении услуги).
2. Каждое устройство передается каждому модулю, `type` матчи.
3. Модуль, распознающий устройство, добавляет **предложение** в `options.newInstances`.
4. Предложения хранятся в `system.discovery` Диалоговое окно обнаружения в административной панели отображает их и создает экземпляры, выбранные пользователем.

## Прежде чем начать

**Адаптер должен находиться в репозитории ioBroker.** Discovery предлагает экземпляр, а администратор устанавливает адаптер из репозитория для его создания. Для этого выполняются две проверки:

- **Сборка** считывает все имена адаптеров, которые может предложить модуль, и завершается с ошибкой, если какое-либо имя адаптера отсутствует в последней версии репозитория. `node scripts/proposedAdapters.js` (также запускается раз в неделю, что создает проблему). Он считывает первый аргумент `tools.getNextInstanceID()` и `tools.proposeSharedInstance()` - передать строковый литерал или `const` и разрабатывайте каждое предложение, используя один из двух вариантов, иначе модуль не пройдет проверку.
- **Во время выполнения** модуль запускается только тогда, когда его адаптер находится в репозитории, указанном при установке: пока он находится только в последней версии, пользователи стабильной версии не получают это предложение. Он работает по **имени файла** — назовите модуль в соответствии с обнаруженным им адаптером. `src/lib/adapters/<adaptername>.ts`), или же он никогда не запустится.

**Узнайте, как можно распознать устройство.** Выберите первый подходящий вариант в следующем порядке:

| Вариант                                                               | `type`   | Расходы                                            | Как это узнать                                                                                                                            |
| --------------------------------------------------------------------- | -------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| объявление службы mDNS, например `_wled._tcp`                         | `mdns`   | нет - сканирование уже это зафиксировало           | Посмотрите, что ищет сам адаптер в процессе обнаружения; `avahi-browse -art` (Linux) или `dns-sd -B _services._dns-sd._udp` (macOS/Windows) |
| Ответ UPnP/SSDP (`USN`, `SERVER`, `ST` описание по адресу `LOCATION`) | `upnp`   | нет - сканирование уже это зафиксировало           | инструмент SSDP или `gssdp-discover`                                                                                                       |
| Ответ на фиксированном порту или по HTTP-пути.                        | `ip`     | один запрос **каждому** хосту, ответившему на пинг | `curl http://<device>/<path>`                                                                                                             |
| USB/последовательный адаптер, отвечающий на зонд.                     | `serial` | открывает каждый последовательный порт хоста       | собственный код адаптера                                                                                                                  |

Ан `ip` Модуль работает с любым адресом в сети — принтерами, NAS, маршрутизатором, чужими устройствами. Используйте его только в том случае, если устройство само не объявляет о своем присутствии.

**Узнайте, что требуется для адаптера. `native` Посмотрите** на `native` в адаптере `io-package.json` Предложение содержит только те значения, которые были обнаружены в ходе обнаружения. `host`, `port`, `model` Администратор устанавливает их поверх настроек по умолчанию адаптера при создании экземпляра. `Object.assign` (на один уровень вложенности), поэтому все остальное оставьте за бортом.

## Модуль обнаружения

### Договор

```ts
export function detect(ip: string, device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void;
export const type: string | string[];   // which devices the module wants to see
export const timeout: number;            // ms, default 2000
export const dependencies?: unknown;     // truthy => run after all other modules (hm-rega waits for hm-rpc)
```

- **Вызов `callback(null, found, ip)` Ровно один раз, на каждом пути** — даже когда ничего не было найдено и когда что-то пошло не так. Второй вызов регистрируется как ошибка. Пропущенный вызов блокирует устройство до тех пор, пока не сработает сторожевой таймер.
- ** `found` является `true` Только если модуль добавил или расширил предложение.** Устройство, на котором уже есть экземпляр, распознается, но `found` является `false`.
- ** `timeout` Значение должно быть больше всего, чего ожидает модуль.** Ядро запускает сторожевой таймер с этим значением _перед_ вызовом функции. `detect()` Если оба равны, побеждает сторож.
- Ошибки не генерируются. Неудачный запрос означает «не найдено»: `callback(null, false, ip)`.
- Контракт основан на обратных вызовах — так и следует придерживаться. Внутри модуля использование промисов допустимо.

### Типы устройств

| `type`   | `detect()` называется                                 | Что передаёт устройство                                                                    |
| -------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ip`     | для каждого адреса, ответившего на пинг               | `_addr`, `_name`                                                                          |
| `mdns`   | для каждого адреса, объявившего о наличии службы mDNS | `_mdns`- использовать `tools.hasMdnsService()`, `tools.mdnsName()`, `tools.mdnsTxt()`      |
| `upnp`   | для каждого адреса, ответившего на запрос SSDP        | `_upnp`: массив карт заголовков; `_location` содержит тело `LOCATION`                      |
| `serial` | для каждого последовательного порта                   | `_addr` — это имя порта; выполните поиск с помощью `tools.testSerialPort()`                |
| `udp`    | один раз, `_addr` является `255.255.255.255`            | отправьте свою собственную трансляцию с помощью `tools.udpScan()`                          |
| `once`   | один раз за сканирование, `_addr` является `0.0.0.0`    | для слушателей, например, многоадресная рассылка                                           |
| `advice` | однажды в конце, `detect(null, null, ...)`             | Предложения без указания устройства (JavaScript, история просмотров, веб-страницы и т. д.) |

### Предложения

Существует два типа адаптеров, и, следовательно, два типа предложений.

**Один экземпляр на устройство** — адаптер хранит адрес своего устройства в `native`:

```ts
if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
    return callback(null, false, ip); // already configured
}
options.newInstances.push({
    _id: tools.getNextInstanceID(adapterName, options),
    common: { name: adapterName },
    native: { host: ip },
    comment: { add: [name, ip] }, // what the dialog shows as "found"
});
callback(null, true, ip);
```

**Один экземпляр для всех устройств** — адаптер сам находит свои устройства и не хранит в памяти свой адрес. `native` (shelly, wled, homewizard, ...). Первый результат поиска формирует предложение, каждый последующий результат добавляется в его список, а существующий экземпляр предлагается как "расширенный":

```ts
callback(null, tools.proposeSharedInstance(adapterName, `${name} (${ip})`, options), ip);
```

**Значения, которые система обнаружения не может знать** (код доступа, имя пользователя), запрашиваются в диалоговом окне. `comment.inputs` Значение присваивается атрибуту, указанному в `name`:

```ts
comment: {
    add: [name, ip],
    inputs: [
        { name: 'native.user', def: '', type: 'text', title: 'User name' },
        { name: 'native.password', def: '', type: 'password', title: 'Password' },
    ],
},
```

Диалоговое окно понимает следующие типы ввода: `text`, `password`, `checkbox`, `select` (с `options`), `link` (кнопка, URL в `def`) и `comment` (строка текста, в `def`).

### Пример: mDNS

```ts
import * as tools from '../tools';
import type { DetectCallback, DetectOptions, DiscoveryDevice } from '../types';

const adapterName = 'myadapter';

// What the device announces - seen with `avahi-browse -r` on a Foo Bar 3000, firmware 2.1
const SERVICE = '_foobar._tcp';

export function detect(ip: string, device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void {
    if (!tools.hasMdnsService(device, SERVICE)) {
        return callback(null, false, ip);
    }

    // One instance per device, addressed by `native.host`
    if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
        return callback(null, false, ip);
    }

    const name = tools.mdnsName(device) || 'Foo Bar';
    options.log.debug(`Foo Bar detected at ${ip}`);
    options.newInstances.push({
        _id: tools.getNextInstanceID(adapterName, options),
        common: { name: adapterName },
        native: { host: ip },
        comment: { add: [name, ip] },
    });
    callback(null, true, ip);
}

export const type = ['mdns'];
export const timeout = 1500;
```

Реальные модули для чтения: `wled.ts` и `shelly.ts` (mDNS, общий экземпляр), `blackmagic-atem.ts` (mDNS, один экземпляр на устройство), `bosesoundtouch.ts` (UPnP), `awtrix-light.ts` (HTTP-зонд), `alpha2.ts` (HTTP-проверка устройства, допускающего только одно соединение одновременно).

### Пример: HTTP-зонд

Только если устройство само не сообщает о своем местонахождении. Запрашивайте что-то, что однозначно идентифицирует устройство, а не просто "ответ порта 80":

```ts
const PORT = 80;
const PROBE_TIMEOUT = 1000;

export function detect(ip: string, _device: DiscoveryDevice, options: DetectOptions, callback: DetectCallback): void {
    if (tools.findInstance(options, adapterName, obj => obj.native?.host === ip)) {
        return callback(null, false, ip); // the adapter talks to it already, leave it alone
    }

    // without a callback, httpGet returns a promise: rejected on errors and non-200 answers
    tools
        .httpGet(`http://${ip}:${PORT}/api/info`, PROBE_TIMEOUT)
        .then(body => {
            let info: { vendor?: string; model?: string } | null = null;
            try {
                info = body ? JSON.parse(body) : null;
            } catch {
                // not JSON - not our device
            }
            if (info?.vendor !== 'FooBar Inc.') {
                return callback(null, false, ip);
            }
            options.newInstances.push({
                _id: tools.getNextInstanceID(adapterName, options),
                common: { name: adapterName },
                native: { host: ip },
                comment: { add: [info.model || 'Foo Bar', ip] },
            });
            callback(null, true, ip);
        })
        .catch(() => callback(null, false, ip));
}

export const type = ['ip'];
export const timeout = PROBE_TIMEOUT + 500;
```

### Правила

- **Только для чтения.** Идентификация устройства, ничего больше: никаких записей, попыток входа в систему, паролей по умолчанию, никаких изменений настроек или состояния устройства.
- **Проверяйте как можно меньше устройств.** Один запрос с коротким таймаутом. Сначала проверьте самое дешевое устройство. Не трогайте устройства, на которых уже есть экземпляр адаптера — адаптер взаимодействует с ними.
- **Будьте конкретны.** Сопоставьте информацию, которую отправляет только это устройство: тип услуги плюс текстовая запись, строка модели, поле поставщика. Ложное срабатывание предложит неправильный адаптер каждому пользователю, у которого есть такое устройство.
- **В предложениях нет секретов.** Предложения хранятся в `system.discovery` и отображается в диалоговом окне. Не копируйте токены или пароли с устройства в ответ на запрос. `native` или `comment` - запросить у пользователя ответ `inputs` поле типа `password` вместо.
- **Зависимости.** HTTP проходит через `tools.httpGet()`, `axios` или `node:http` Не добавляйте пакет для отдельного запроса; необязательный пакет — это... `require()` лениво, с запасным вариантом.
- **Объясните, почему.** Укажите, откуда берется имя службы, порт или «магическая строка» (источник адаптера, документация поставщика, данные захвата с реального устройства). Следующему человеку это понадобится.

## Тест

В каждом модуле проводится тестирование. `test/adapters/<adaptername>.test.js` (мокко, `node:assert` (других библиотек для проверки утверждений нет). Передайте ей данные, полученные от реального устройства — результат работы. `avahi-browse -r` заголовки SSDP, ответ HTTP — и охватывают как минимум:

- Устройство обнаружено, и предложение выглядит так, как ожидалось. `_id`, `native`, `comment`),
- Устройство, на котором уже есть экземпляр, пропускается.
- Аналогичного устройства другого типа **не** обнаружено.

```js
const assert = require('node:assert');
const path = require('node:path');

const mod = require(path.join('..', '..', 'build', 'lib', 'adapters', 'myadapter.js'));

function freshOptions(existingInstances = []) {
    return {
        newInstances: [],
        existingInstances,
        enums: null,
        language: 'en',
        log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
    };
}

// as announced by a Foo Bar 3000 (avahi-browse -r)
const device = {
    _addr: '192.168.1.50',
    _type: 'mdns',
    _mdns: {
        PTR: { name: '_foobar._tcp.local', data: 'Living room._foobar._tcp.local' },
        SRV: { name: 'Living room._foobar._tcp.local', data: 'foobar-3000.local' },
    },
};

function detect(dev, options, ip = '192.168.1.50') {
    return new Promise(resolve => mod.detect(ip, dev, options, (err, found) => resolve({ err, found })));
}

describe('myadapter detection', () => {
    it('proposes one instance per device', async () => {
        const options = freshOptions();
        const { found } = await detect(device, options);
        assert.strictEqual(found, true);
        assert.deepStrictEqual(options.newInstances[0].native, { host: '192.168.1.50' });
    });

    it('skips a device that already has an instance', async () => {
        const options = freshOptions([
            { _id: 'system.adapter.myadapter.0', common: { name: 'myadapter' }, native: { host: '192.168.1.50' } },
        ]);
        const { found } = await detect(device, options);
        assert.strictEqual(found, false);
        assert.strictEqual(options.newInstances.length, 0);
    });
});
```

Тесты загружают **скомпилированный** модуль из `build/`, поэтому сначала соберите:

```bash
npm install
npm run build:tsc          # TypeScript -> build/
npm run test:integration   # all tests in test/**/*.test.js
npm run lint
npm run check              # type check
node scripts/proposedAdapters.js   # is every proposed adapter in the latest repository? (network)
```

### На реальной установке

Запустите адаптер с помощью [dev-сервера](https://github.com/ioBroker/dev-server) или в тестовой установке, установите уровень логирования следующим образом: `discovery.0` к `debug` и запустить сканирование из диалогового окна обнаружения. Найденное изображение отобразится следующим образом:

```
Test 192.168.1.50 myadapter DETECTED!
```

и предложение появляется в диалоговом окне. Во время работы над модулем, `export const reloadModule = true;` Он загружается заново при каждом сканировании — удалите его перед отправкой запроса на слияние.

## Запрос на слияние

1. В `README.md` Добавьте устройство в раздел «Автоматически обнаруженные» (в алфавитном порядке) и запись в журнале изменений. `### **WORK IN PROGRESS**` В верхней части списка изменений (добавьте заголовок, если его еще нет):

   ```
   * (your-github-name) Detect Foo Bar devices from their `_foobar._tcp` mDNS announcement and propose the myadapter adapter
   ```

2. Не меняйте версию в `package.json` или `io-package.json` - релиз от разработчиков.

3. Один адаптер на один запрос на слияние. В описании: какое устройство и прошивка были протестированы, как устройство объявляет о себе и на какой платформе захваченных данных построен тест.