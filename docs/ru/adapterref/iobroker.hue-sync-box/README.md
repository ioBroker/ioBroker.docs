---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hue-sync-box/README.md
title: ioBroker.hue-sync-box
hash: TwPvpTI0WugmeEEYQaO99mQZkBRXGcQtNFGvSp8OepI=
---
![Логотип](../../../en/adapterref/iobroker.hue-sync-box/admin/hueSyncBox.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.hue-sync-box.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hue-sync-box.svg)
![Количество установок](https://iobroker.live/badges/hue-sync-box-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/hue-sync-box-stable.svg)

# IoBroker.hue-sync-box
![Тестируйте и выпускайте](https://github.com/xXBJXx/ioBroker.hue-sync-box/workflows/Test%20and%20Release/badge.svg)

## Адаптер hue-sync-box для ioBroker
**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Для адаптера требуется версия Node.js >= 16.x
### Что такое Philips Hue Sync Box?
Philips Hue Sync Box — это устройство, которое позволяет синхронизировать цвета и световые эффекты ламп Philips Hue с экраном вашего компьютера. Это возможно благодаря тому, что Sync Box определяет цвета и световые эффекты вашего экрана и передает их на ваши светильники Philips Hue.

### Что может адаптер?
Адаптер опрашивает API-интерфейс Philips Hue Sync Box каждые 15 секунд и соответствующим образом обновляет точки данных.
Есть некоторые точки данных, которые могут изменить настройки Sync Box (например, переключатель включения/выключения синхронизации, переключение входов HDMI и т. д.).
Любое изменение точек данных немедленно отправляется в блок синхронизации Philips Hue и запускает обновление точек данных.
Одновременно можно создать несколько блоков Philips Hue Sync.

## Что необходимо для использования адаптера?
- IP-адрес Philips Hue Sync Box (только IPv4)
- Токен Hue Sync Box (см. ниже)

## Как добавить блок синхронизации Philips Hue к адаптеру?
1. Откройте конфигурацию адаптера и нажмите на кнопку «Добавить ящик».
2. введите имя ящика, имя должно быть только 1x, потому что оно будет использоваться в качестве идентификатора.
3. Введите IP-адрес ящика. (только для IPv4) (небольшая подсказка: при вводе IP-адреса точка будет автоматически вставляться в каждое 3-е число)

   ![name_ip_token](../../../en/adapterref/iobroker.hue-sync-box/admin/media/name_ip_token.png)

4. Нажмите на кнопку «зарегистрировать ящик», откроется новое окно, в котором вы можете зарегистрировать ящик (см. ниже)

   ![Регистрация](../../../en/adapterref/iobroker.hue-sync-box/admin/media/registration.png)

5. Как только будет нажата кнопка «регистрация», процесс запустится, далее у вас есть 30 секунд, чтобы нажать кнопку на боксе и удерживать ее в течение

около 3 секунд, пока светодиод не начнет мигать зеленым цветом. (см. ниже) ![Регистрация](../../../en/adapterref/iobroker.hue-sync-box/admin/media/registration_timer.png)

6. После того, как вы отпустите клавишу устройства, через несколько секунд отобразится токен и вставлен в поле. (см. ниже)

![жетон](admin/media/registration_successful.png) ![жетон](../../../en/adapterref/iobroker.hue-sync-box/admin/media/token.png)

7. Теперь вы можете нажать на кнопку «добавить», и поле будет добавлено, тогда вам просто нужно нажать на кнопку «сохранить», чтобы сохранить конфигурацию.

   ![Адаптер_GUI](../../../en/adapterref/iobroker.hue-sync-box/admin/media/Adapter_GUI.png)

## Удалите блок синхронизации hue из адаптера
### Внимание! Чтобы удаление с опциями работало, токен должен быть создан через функцию регистрации адаптера.
1. Откройте конфигурацию адаптера и нажмите на кнопку «Удалить» Значок корзины.
2. откроется новое окно с 2 вариантами, выберите вариант, который вы хотите использовать. Если ни один из вариантов не выбран, поле будет удалено только из

   конфиг. (см. ниже)

   - `deregister from the box` - ящик будет удален из адаптера и токен будет удален из ящика
   - `delete object` - ящик будет удален из адаптера и объекты будут удалены из ioBroker

     ![delete_box](../../../en/adapterref/iobroker.hue-sync-box/admin/media/delete_device.png)

вы также можете выбрать оба варианта одновременно, тогда ящик будет удален из адаптера, и объекты будут удалены из ioBroker, а токен будет удален из ящика.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.5 (2023-02-06)
* (xXBJXx) Dependency update

### 0.3.4 (2023-01-15)
* (xXBJXx) fixed Sentry error reporting

### 0.3.3 (2023-01-14)
* (xXBJXx) fixed a bug

### 0.3.2 (2023-01-13)
* (xXBJXx) update dependencies
* (xXBJXx) Log output extended and improved
* (xXBJXx) Added data point for the response JSON
* (xXBJXx) Added data point "Reachable" to check if the box is reachable

### 0.3.1 (2022-12-20)
* (xXBJXx) Fixed error message that occurs after a successful registration.

### 0.3.0 (2022-12-20)
* (xXBJXx) added delete function for objects and Token
* (xXBJXx) added funktion for sync the `execution.intensity` state

### 0.2.1 (2022-12-17)
* (xXBJXx) typo corrected in README
* (xXBJXx) Fixed a bug when sending commands to the box

### 0.2.0 (2022-12-17)
* (xXBJXx) Optimization and improvement of the registration process

### 0.1.0 (2022-12-16)
* (Issi) First release

## License
MIT License

Copyright (c) 2022-2023 Issi <issi.dev.iobroker@gmail.com>

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
