---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.samsung_tizen/README.md
title: ioBroker.samsung_tizen
hash: g/6UBdA+i0GxfgbXTTp2pgNaVnMUhd3mU05ZPz6XOW8=
---
![Логотип](../../../en/adapterref/iobroker.samsung_tizen/admin/samsung.png)

# ioBroker.samsung\_tizen

Этот адаптер позволяет управлять телевизорами Samsung под управлением операционной системы Tizen (модели 2016 года и новее).

## 1. Конфигурация

Как настроить этот адаптер. Сначала проверьте настройки телевизора: включите телевизор и перейдите в «Настройки» / «Общие» / «Диспетчер внешних устройств» / «Диспетчер подключений устройств». Там для уведомления о доступе необходимо установить параметр «Только при первом использовании».

### 1.1. Протокол

Протокол для подключения к телевизору через WebSocket.

Возможные значения:`http` или`wss` На более новых устройствах используйте`wss` .

### 1.2. IP-адрес

IP-адрес вашего телевизора Samsung.

### 1.3. Порт

Порт для подключения к телевизору через WebSocket:

- 8001 — небезопасный порт
- 8002 — защищенный порт

### 1.4. Токен

Токен для безопасного подключения к вашему телевизору.

Сохраните конфигурацию адаптера, указав token = 0, и перейдите на вкладку «Объекты» в административной панели ioBroker.

Затем перейдите к`samsung_tizen.0.config.getToken` и нажмите на объект и кнопку.

Если всё сработает, появится новый объект.`samsung_tizen.0.config.token` Появляется сообщение, и его имя совпадает с вашим токеном. Скопируйте имя (например, 123456789), вернитесь к настройкам адаптера и вставьте его в поле токена.

Можно отключить, присвоив значение "0".

#### Как получить токен вручную

Установить`wscat` На устройстве, где запущен ioBroker, выполните следующую команду:

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

Задержка в миллисекундах между командами, отправляемыми через`samsung_tizen.0.control.sendCmd` объект.

## 2. Использование

### 2.1. Контроль

#### Отправить один ключ

Для отправки одной клавиши нажмите кнопку соответствующего объекта, например.`samsung_tizen.0.control.KEY_MUTE` .

#### Отправить ключ без заранее определенной кнопки

Вы можете отправить пользовательский (не предопределенный) ключ вместе с этим.`samsung_tizen.0.control.sendCmd` объект. Введите ключ, который хотите отправить, например:`KEY_POWER` .

#### Отправка нескольких нажатий клавиш в одной команде

Для отправки нескольких нажатий клавиш в одной команде используйте...`samsung_tizen.0.control.sendCmd` объект. Введите клавиши, разделенные запятыми, например:`KEY_POWER` ,`KEY_HDMI` ,`KEY_VOLUP` .

#### Создайте макросы для команд.

Перейти к`samsung_tizen.0.command` Там вы найдете примеры макросов, а также сможете создавать свои собственные.

### 2.2. Приложения

#### Загрузите установленные приложения

Чтобы загрузить установленные приложения, нажмите на кнопку.`samsung_tizen.0.apps.getInstalledApps` кнопка. После этого — отдельный объект с именем`start_<app name>` создается для каждого установленного приложения.

#### Запустите приложение

Вы можете запустить приложение, нажав на кнопку.`samsung_tizen.0.apps.start_<app name>` объект.

### 2.3. Состояние питания

Если опрос состояния питания настроен, как описано выше,`samsung_tizen.0.powerOn` является`true` пока ваш телевизор включен и`false` пока он выключен.

### 2.4. Команды

Команды можно отправлять вручную через`samsung_tizen.0.control.sendCmd` объект, как описано в разделе «Управление», или с помощью пользовательского объекта ниже.`samsung_tizen.0.command` Здесь приведено несколько примеров команд, но вы также можете создавать свои собственные макросы.

#### Как создать макрос команды

1. Перейдите на вкладку «Объекты» и откройте`samsung_tizen.0.command` .

2. Нажмите значок «+», чтобы создать новый объект.

   ![cmd1](../../../en/adapterref/iobroker.samsung_tizen/images/cmd1.png)

3. Убедитесь, что родительский объект является`samsung_tizen.0.command` .

4. Введите имя для вашей команды и убедитесь, что тип указан правильно.`datapoint` и`stateType` является`boolean` .

   ![cmd2](../../../en/adapterref/iobroker.samsung_tizen/images/cmd2.png)

5. В поле «Имя» введите ключи, которые хотите отправить.

6. Эта роль должна быть`button` .

7. Сохраните объект.

   ![cmd3](../../../en/adapterref/iobroker.samsung_tizen/images/cmd3.png)

8. Теперь вы можете отправить свою команду с помощью только что созданного объекта.

   ![cmd4](../../../en/adapterref/iobroker.samsung_tizen/images/cmd4.png)

## Кредиты

Первое поколение этого адаптера было разработано Stefan0875 ( <https://github.com/Stefan0875> ). Затем его адаптировали и поддерживали Highpressure ( <https://github.com/Highpressure> ), а затем dahuby ( <https://github.com/dahuby> ). Большое спасибо им за работу и за предоставление публичной лицензии.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 1.0.0-alpha.2 (2023-09-24)
- (mcm1957) Dependencies have been updated

### 1.0.0-alpha.1 (2023-09-24)
- (mcm1957) Adapter requires node 16 or newer now.
- (mcm1957) Adapter has been moved to iobroker-community-adapters organization.

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