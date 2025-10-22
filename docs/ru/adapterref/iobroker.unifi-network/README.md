---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi-network/README.md
title: ioBroker.unifi-network
hash: hO/Usw4gISR0Mq4L5WELhWY8t4hA2lTLct4tFu7Q5/4=
---
![Логотип](../../../en/adapterref/iobroker.unifi-network/admin/unifi-network.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.unifi-network.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi-network.svg)
![Количество установок](https://iobroker.live/badges/unifi-network-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/unifi-network-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.unifi-network.png?downloads=true)

# IoBroker.unifi-network
**Тесты:** ![Тестирование и выпуск](https://github.com/Scrounger/ioBroker.unifi-network/workflows/Test%20and%20Release/badge.svg)

## Сетевой адаптер unifi для ioBroker
Unifi Network использует интерфейс websocket для получения информации в режиме реального времени из приложения unifi-network.

## Важный
1. Адаптер разработан исключительно на базе ОС UniFi. Совместимость с сетевым контроллером должна быть гарантирована, но не может быть гарантирована.

2. **Этот адаптер может быть очень ресурсоемким!**<br> Это зависит от вашей среды, то есть от количества устройств и клиентов Unifi в вашей сети. На это можно повлиять с помощью параметра `debounce time [s]` API реального времени в настройках адаптера. Этот параметр не влияет на события реального времени, а только на «циклическое» обновление данных устройств, клиентов и т. д.

3. **Не все состояния доступны сразу после запуска адаптера**<br> Состояния создаются и обновляются только тогда, когда данные отправляются сетевым контроллером. Это может занять некоторое время, прежде чем данные будут отправлены в первый раз.

## Конфигурация
### Локальный пользователь (UniFi OS)
Для входа в систему вам потребуется создать локального пользователя в консоли UniFi OS. Облачные пользователи Ubiquiti SSO не подойдут. Для максимальной эффективности интеграции рекомендуется использовать учетную запись администратора или пользователя с полными правами на чтение и запись, но это не обязательно.

1. Войдите в свой локальный портал на устройстве UniFi OS и нажмите «Пользователи».

**Примечание**: Это **необходимо** сделать из UniFi OS, обратившись к ней напрямую по IP-адресу (например, 192.168.1.1), а не через unifi.ui.com или в приложении UniFi Network.

2. Перейдите в раздел **Администраторы и пользователи** в меню слева и выберите вкладку «Администраторы» или перейдите по адресу [IP-адрес]/admins/ (например, 192.168.1.1/admins/).

3. Нажмите **+** в правом верхнем углу и выберите **Добавить администратора**.

4. Выберите **Ограничить только локальным доступом** и введите новое имя пользователя и пароль.

5. Выберите **Оператор точки доступа** и **Администратор сайта** для сетевой роли.

**Примечание** Это не обязательно. Если разрешений недостаточно, вы будете уведомлены об этом через сообщение в журнале.

![информация об изображении](../../../en/adapterref/iobroker.unifi-network/doc/config_local_user.png)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.7 (2025-10-19)

- (Scrounger) event 'UpgradeScheduled' added to ignore list
- (DEV2DEV-DE) german translation updated

### 1.1.6 (2025-10-08)

- (Scrounger) dependencies updated #22
- (Scrounger) firewall channel added #29
- (Scrounger) bug fix #28

### 1.1.5 (2025-10-06)

- (Scrounger) check site exist on self hosted controller
- (Scrounger) login bug fixes #27

### 1.1.4 (2025-10-06)

- (Scrounger) logging improved
- (Scrounger) auto detect UniFi OS or self hosted controller
- (Scrounger) auto translation bug fix
- (Scrounger) image downloading improved
- (Scrounger) bug fixes

### 1.1.3 (2025-10-03)

- (Scrounger) login bug fix for self hosted controllers v9.x.x

### 1.1.2 (2025-10-02)

- (Scrounger) login bug fix for self hosted controllers
- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.1.1 (2025-09-30)

- (Scrounger) bug fixes
- (Scrounger) roles added
- (Scrounger) reponsiv adapter config implemented

### 1.1.0 (2025-09-21)

- (Scrounger) dependencies updated
- (Scrounger) check adapter settings for timeout and interval implemented
- (Scrounger) translation optimized
- (Scrounger) bug fixes

### 1.1.0-beta.0 (2025-09-03)

- (Scrounger) replaced fetch with undici
- (Scrounger) firewall group added
- (Scrounger) more network events handler added
- (Scrounger) bug fixes

### 1.0.0-beta.0 (2025-04-25)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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