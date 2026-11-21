---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.samsung_tizen/README.md
title: ioBroker.samsung_tizen
hash: lPV0xhmcYhsN6JkQEXky/I7+GWuCvmcBCicpBKjJgls=
---
![Логотип](../../../en/adapterref/iobroker.samsung_tizen/admin/samsung.png)

# ioBroker.samsung\_tizen

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub

Этот адаптер позволяет управлять телевизорами Samsung под управлением операционной системы Tizen (модели 2016 года и новее).

## 1. Конфигурация

Как настроить этот адаптер. Сначала проверьте настройки телевизора: включите телевизор и перейдите в «Настройки» / «Основные» / «Диспетчер внешних устройств» / «Диспетчер подключений устройств». Там для уведомления о доступе необходимо установить значение «Только при первом использовании».

### 1.1. Протокол

Протокол для подключения к телевизору через WebSocket.

Возможные значения: `http` или `wss` На более новых устройствах используйте `wss`.

### 1.2. IP-адрес

IP-адрес вашего телевизора Samsung.

Не знаете адрес? Нажмите **«Поиск телевизора»** в верхней части настроек: адаптер выполнит поиск в сети включенного телевизора Samsung и заполнит его IP-адрес, MAC-адрес, протокол и порт. Если ответят несколько телевизоров, будет выбран первый, а остальные будут предложены в списке полей IP-адреса, которые заполняются при открытии настроек. Для поиска экземпляр адаптера должен быть запущен. Телевизор, находящийся в режиме глубокого ожидания или в другой подсети, не найден — в этом случае введите его адрес вручную.

### 1.3. Порт

Порт для подключения к телевизору через WebSocket:

- 8001 — небезопасный порт
- 8002 — защищенный порт

### 1.4. Токен

Токен для безопасного подключения к вашему телевизору.

Сохраните конфигурацию адаптера, указав token = 0, и перейдите на вкладку «Объекты» в административной панели ioBroker.

Затем перейдите к `samsung_tizen.0.config.getToken` и нажмите на объект и кнопку.

Если всё сработает, появится новый объект. `samsung_tizen.0.config.token` Появляется сообщение, и его имя совпадает с вашим токеном. Скопируйте имя (например, 123456789), вернитесь к настройкам адаптера и вставьте его в поле токена.

Можно отключить, присвоив значение "0".

#### Как получить токен вручную

Установить `wscat` На устройстве, где запущен ioBroker, выполните следующую команду:

```sh
npm install wscat
```

Включите телевизор и запросите токен через соединение WebSocket:

```sh
wscat -n -c wss://tvIp:8002/api/v2/channels/samsung.remote.control?name=aW9Ccm9rZXI=
```

На экране телевизора появится всплывающее окно, которое необходимо принять. Получите токен из возвращенного JSON-ответа:

```json
{
    "data": {
        "clients": [
            {
                "attributes": { "name": "aW9Ccm9rZXI=" },
                "connectTime": 1575818900205,
                "deviceName": "aW9Ccm9rZXI=",
                "id": "12345678-797c-45b0-b0f1-233535918548",
                "isHost": false
            }
        ],
        "id": "12345678-797c-45b0-b0f1-233535918548",
        "token": "10916644"
    },
    "event": "ms.channel.connect"
}
```

### 1.5. MAC-адрес

MAC-адрес вашего телевизора Samsung используется для функции Wake-on-LAN.

Кнопка «Считать MAC-адрес с телевизора» запрашивает у телевизора введенный IP-адрес. Телевизор должен быть включен.

Это работает только в том случае, если ваш телевизор подключен кабелем, а не по беспроводной связи.

Если ваш телевизор подключен по беспроводной сети, его можно включить только из кратковременного режима ожидания.

Функцию Wake-on-LAN можно отключить, присвоив ей значение "0".

### 1.6. Телевизионные опросы общественного мнения

#### Избирательный пункт

Порт, используемый для запроса состояния питания.

По умолчанию: 9110

Известные доступные порты: 9110, 9119, 9197

#### Интервал опроса

Как часто отправляется запрос на проведение опроса.

По умолчанию: 60 секунд

Можно отключить, присвоив значение "0".

### 1.7. Задержка команды

Задержка в миллисекундах между командами, отправляемыми через `samsung_tizen.0.control.sendCmd` объект.

## 2. Использование

### 2.1. Мастер настройки

Первая вкладка настроек, «Настройка», проходит весь процесс установки: она ищет телевизор в сети, сопрягает его (телевизор один раз спрашивает, может ли ioBroker подключиться — выберите «Разрешить» на телевизоре, помощник самостоятельно получает токен), считывает MAC-адрес для Wake-on-LAN и отправляет тестовый ключ с новыми данными, прежде чем что-либо будет сохранено. Кнопка «Применить и сохранить» записывает IP-адрес, протокол, порт, токен и MAC-адрес в настройки. Экземпляр должен быть запущен; для этой вкладки требуется admin 8 или более поздняя версия. Ручной способ (состояние) `config.getToken` токен на имя `config.token`) по-прежнему работает.

### 2.2. Сцены

Вкладка «Сцены» содержит таблицу именованных последовательностей, например: `SceneYouTube`: `HOME, YOUTUBE, WAIT 3000, OK` - Откройте YouTube и подтвердите выбор учетной записи. Этот шаг имеет ключевое значение (`HOME`, `OK`, `BACK`, `UP`, `VOLUP`, `0` -`9` имена `TV_KEYS` детектора типа или кода Samsung `KEY_...`), приложение (`YOUTUBE`, `NETFLIX`, `DISNEY_PLUS`... - ключи `TV_APPS`) или пауза (`WAIT 2000` Каждая сцена становится кнопкой. `samsung_tizen.0.scenes.<name>` и клавиша вкладки пульта дистанционного управления.

### 2.3. Вкладка «Пульт дистанционного управления»

Вкладка «Пульт дистанционного управления» в настройках отображает пульт дистанционного управления: питание, Wake-on-LAN, источник, меню, информация, клавиши со стрелками, кнопки OK, назад, домой, отключение звука, регулировка громкости и переключение каналов, клавиши воспроизведения и кнопки для каждого известного приложения, установленного на телевизоре (YouTube, Netflix, Disney+, Prime Video и т. д.). При нажатии на кнопку также работают клавиши со стрелками, Enter, Backspace, + и - на клавиатуре. Светодиод отображает состояние питания, если включен опрос состояния питания. Клавиши реагируют на запущенный экземпляр с сохраненной конфигурацией, поэтому сначала сохраните изменения после изменения IP-адреса или токена. Если клавиша не доходит до телевизора, под пультом отображается сообщение об ошибке. Для работы с этой вкладкой требуется admin 8 или более поздняя версия.

### 2.4. Сообщения для скриптов и агентов ИИ

`sendTo('samsung_tizen.0', 'help', {})` Отвечает на описание сообщений и состояний адаптера для агентов ИИ (например, ioBroker.pi-agent) и авторов скриптов: `{ help, commands }`, где `commands` перечисляет все сообщения с `write` (Изменит ли это что-нибудь). Скрипты могут использовать `apps` (известные приложения, установленные на телевизоре), `launchApp` (`{ app: 'YOUTUBE' }`), `remote` (`{ key: 'KEY_HOME' }`), `wake`, `scenes` и `runScene` (`{ scene: '<id>' }`).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (GermanBluefox) The pairing token is no longer written to the log (startup config, websocket URL, getToken)

### 2.2.0 (2026-11-19)
* (GermanBluefox) Fixed the README structure (changelog section) (#321)
* (GermanBluefox) Added the message "help": a description of all messages and states for AI agents (e.g. pi-agent), and `common.supportedMessages.help`

### 2.1.0 (2026-10-29)
- (GermanBluefox) Added: button "Search TV" that finds the TV in the network and fills in IP address, MAC address, protocol and port; the IP address field lists all TVs found (SSDP, confirmed by the REST API of the TV)
- (GermanBluefox) Added: button to read the MAC address for Wake-on-LAN from the TV
- (GermanBluefox) Added: setup assistant (tab "Setup"): search, pairing without copying the token, Wake-on-LAN, test key and save in one go
- (GermanBluefox) Added: `powerOn` can be written to switch the TV on (Wake-on-LAN, then KEY_POWER) or off (KEY_POWER, held on The Frame); the power state is asked right after that until it is reached
- (GermanBluefox) Added: scenes - named sequences of keys, apps and pauses, configured in a table, each with a button `scenes.<name>`
- (GermanBluefox) Added: buttons for the apps installed on the TV; the adapter knows the Samsung app IDs of YouTube, Netflix, Disney+, Prime Video, Apple TV, Max, Paramount+, DAZN, Joyn, RTL+, MagentaTV, ARD, ZDF, Spotify, Twitch, Plex and the browser and asks the TV which of them are installed
- (GermanBluefox) Added: tab "Remote control" in the settings with a remote control to test the connection right away (custom component, needs admin 8)

### 2.0.2 (2026-09-04)
- (mcm1957) **BREAKING:** enhanced security (added encryption) requires that you enter the access token one more time 
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (AlanSRU) Fixed the installed-app message handlers, which stayed attached to the shared websocket: they piled up with every call and made the adapter crash with "Cannot read properties of undefined (reading 'length')" as soon as another message arrived (#302)
- (AlanSRU) Synced `engines.node` in package-lock.json with package.json (#301)
- (GermanBluefox) The adapter was refactored to TypeScript. 
- (GermanBluefox) The configuration dialog was migrated from the old HTML admin page to JsonConfig
- (GermanBluefox) The states created by the adapter now carry explicit `common.read` / `common.write` flags
- (GermanBluefox) The adapter can only be installed from npm now, no longer directly from GitHub (`common.nogit`)

### 1.1.0 (2024-04-26)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.0.0 (2023-09-30)
- (mcm1957) An official release has been created

## License

MIT License 

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020 dahuby

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.