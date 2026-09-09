---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.samsung_tizen/README.md
title: iobroker.samsung_tizen
hash: U5ZNj4kmUyCtFUJoVT9K60DcEQznPM6p839v6/XR2s4=
---
![Логотип](../../../en/adapterref/iobroker.samsung_tizen/admin/samsung.png)

# iobroker.samsung\_tizen

Этот адаптер предназначен для управления телевизорами Samsung с операционной системой TizenOS (>=2016).

1. [Установка](#1-installation)
2. [Конфигурация](#2-Configuration)\
   2.1. [Протокол](#21-protocol)\
   2.2. [IP-адрес](#22-ip-address)\
   2.3. [Порт](#23-port)\
   2.4. [Токен](#24-token)\
   2.5. [MAC-адрес](#25-mac-adress)\
   2.6. [Телевизионные государственные опросы](#26-tv-state-polling)\
   2.7. [Задержка команды](#27-command-delay)
3. [Использование](#3-usage)\
   3.1. [Контроль](#31-control)\
   3.2. [Приложения](#32-apps)\
   3.3. [Команды](#33-commands)
4. [Лицензия](#4-License)

## 1. Конфигурация

Как настроить этот адаптер. Сначала проверьте настройки телевизора, включите телевизор и перейдите в «Настройки» / «Общие» / «Диспетчер внешних устройств» / «Диспетчер подключений устройств». Там уведомление о доступе должно быть активировано в режиме «только при первом использовании».

### 1.1. Протокол

Протокол для подключения к телевизору через WebSocket. Возможные значения: http или wss; на более новых устройствах используйте wss.

### 1.2. IP-адрес

IP-адрес вашего телевизора Samsung

### 1.3. Порт

Порт для подключения WebSocket к вашему телевизору. 8001 — незащищенный порт, 8002 — защищенный порт.

### 1.4. Токен

Токен для безопасного подключения к вашему телевизору. Сохраните адаптер с токеном = 0 и перейдите на вкладку объектов администрирования iobroker. Затем перейдите к объекту iobroker.samsung\_tizen.0.config.getToken и нажмите кнопку. Если все работает правильно, должен появиться новый объект iobroker.samsung\_tizen.0.config.token с идентификатором iobroker.samsung\_tizen.0.config.token и именем, совпадающим с вашим токеном — скопируйте имя (например, 123456789), вернитесь в конфигурацию адаптера и вставьте его в поле токена. Можно деактивировать значением "0".

<details><summary>How to get a token manually</summary>
<p>
Install "wscat" on the device where ioBroker is running with following command:

```sh
npm install wscat
```

Включите телевизор и запросите токен через соединение WebSocket.

```sh
wscat -n -c wss://tvIp:8002/api/v2/channels/samsung.remote.control?name=aW9Ccm9rZXI=
```

На вашем телевизоре появится всплывающее окно, которое необходимо принять. Получите токен из возвращенного JSON-ответа.

```json
{"name":"aW9Ccm9rZXI="},"connectTime":1575818900205,"deviceName":"aW9Ccm9rZXI=","id":"12345678-797c-45b0-b0f1-233535918548","isHost":false}],"id":"12345678-797c-45b0-b0f1-233535918548","token":"10916644"},"event":"ms.channel.connect"}
```

</p>
</details>

### 1.5. MAC-адрес

Для функции WakeOnLAN будет использоваться MAC-адрес вашего телевизора Samsung. Работает только при проводном, а не беспроводном подключении телевизора. Если телевизор подключен по беспроводной сети, его можно включить только из режима короткого ожидания (shortStandby). Функцию WakeOnLAN можно отключить, присвоив ей значение "0".

### 1.6. Телевизионные опросы общественного мнения

#### Избирательный пункт

Порт для получения состояния питания (по умолчанию: 9110). Известные доступные порты: 9110, 9119, 9197.

#### Интервал опроса

Как часто следует отправлять запрос на опрос? По умолчанию: 60 секунд. Можно отключить, присвоив значение "0".

### 1.7. Задержка команды

Задержка в миллисекундах между командами, отправляемыми через объект iobroker.samsung\_tizen.0.control.sendCmd.

## 2. Использование

### 2.1. Контроль

#### Отправить один ключ

Чтобы отправить один сигнал нажатием клавиши, нажмите кнопку, например, под iobroker.samsung\_tizen.0.control.KEY\_MUTE.

#### Отправить клавишу для неопределенной кнопки

Вы можете отправить пользовательский (неопределенный) ключ с помощью объекта iobroker.samsung\_tizen.0.control.sendCmd. Введите ключ, который вы хотите отправить, например, KEY\_POWER.

#### Отправка нескольких нажатий клавиш в одной команде

Для отправки нескольких нажатий клавиш в одной команде используйте объект iobroker.samsung\_tizen.0.control.sendCmd. Вводите клавиши, разделенные запятыми, например, KEY\_POWER,KEY\_HDMI,KEY\_VOLUP.

#### Создайте макросы для команд.

Перейдите по ссылке iobroker.samsung\_tizen.0.command, здесь вы найдете примеры макросов и сможете создать свои собственные. <a name="use_cmd">Как создать новый макрос</a>

### 2.2. ПРИЛОЖЕНИЯ

#### Загрузить установленные приложения

Чтобы загрузить установленные приложения, нажмите кнопку iobroker.samsung\_tizen.0.apps.getInstalledApps. После этого для каждого установленного приложения будет создан отдельный объект с именем start\_app\_name.

#### Запустить приложение

Вы можете запустить приложение, щелкнув по объекту iobroker.samsung\_tizen.0.apps.start\_app\_name.

### Состояние мощности

Если у вас настроен опрос состояния питания, как указано выше, то в разделе iobroker.samsung\_tizen.0.powerOn вы увидите состояние true, если ваш телевизор включен, или false, если он выключен.

### 2.3. Команды

Команды можно отправлять вручную через объект iobroker.samsung\_tizen.0.control.sendCmd, как указано в... <a name="use_ctrl">Контроль</a> или через созданные пользователем объекты в iobroker.samsung\_tizen.0.command. Есть несколько примеров команд, но вы также можете создавать свои собственные макросы.

<details><summary>How to create a command macro </summary>
<p>

1. Перейдите в раздел «Адаптеры» и откройте файл iobroker.samsung\_tizen.0.command.
2. Нажмите на значок «+», чтобы создать новый объект.
   ![cmd1](../../../en/adapterref/iobroker.samsung_tizen/images/cmd1.png)
3. Убедитесь, что родительским объектом является iobroker.samsung\_tizen.0.command.
4. Введите новое имя для вашей команды и убедитесь, что тип — точка данных, а stateType = логическое значение.
   ![cmd2](../../../en/adapterref/iobroker.samsung_tizen/images/cmd2.png)
5. В поле «Имя» введите ключи, которые вы хотите отправить.
6. роль должна быть кнопкой
7. и сохранить
   ![cmd3](../../../en/adapterref/iobroker.samsung_tizen/images/cmd3.png)
8. Затем вы можете отправить свою команду с помощью только что созданного объекта.
   ![cmd4](../../../en/adapterref/iobroker.samsung_tizen/images/cmd4.png)

</p>
</details>

## Установка

Установите этот адаптер, используя репозитории ioBroker.

> \[!NOTE] Этот адаптер не поддерживает установку из GitHub.

## Кредиты

Первое поколение этого адаптера было разработано Stefan0875 (<https://github.com/Stefan0875>), который был адаптирован и поддерживается высоким давлением (<https://github.com/Highpressure>) и наконец, дахуби (<https://github.com/dahuby>Большое спасибо за их работу и предоставление публичной лицензии.

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



[Older changelogs can be found there](CHANGELOG_OLD.md)

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