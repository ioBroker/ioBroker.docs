---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: AVn5YzHd9CTBo8vIgT61hMQK4ryROLtKMXW09AeSWz4=
---
![Логотип](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Количество установок](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**Тесты:** ![Тест и выпуск](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Адаптер Zendure Solarflow для ioBroker
Этот проект представляет собой адаптер ioBroker для чтения данных из API Zendure Solarflow Cloud. Он использует официальный API, предоставленный Zendure.
Подробнее об API можно прочитать здесь: https://github.com/Zendure/developer-device-data-report

## Функции
- Получайте все телеметрические данные с ваших устройств Solarflow, включая те, которые не отображаются в официальном приложении, например, напряжение батареи.
- Управляйте Solarflow HUB как в официальном приложении. Большинство настроек доступны.
- Управляйте пределом выхода - вы не ограничены использованием Shelly Pro EM для реализации нулевой подачи. Вы также можете разрабатывать более сложные сценарии через скрипт или блок в ioBroker.
- Остановка входа, если напряжение одной батареи падает до низкого уровня (защита батареи). Работает только при установке выходного предела через адаптер
- Управляйте несколькими Solarflow одновременно!
- Получите более точные расчеты!
- Работает со всеми устройствами Zendure SolarFlow: HUB1200, Hyper2000, HUB2000 и AIO! Я могу протестировать только на HUB1200, так как у меня нет других устройств...

## Примечания
1. Пожалуйста, деактивируйте/снимите флажки со всех режимов в приложении Zendure, в противном случае невозможно будет установить предел выходной мощности!

   ![Окно настроек Solarflow](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

2. Вы выйдете из официального приложения iOS или Android после входа с помощью адаптера ioBroker. Это нормальное поведение. В качестве обходного пути вы можете создать вторую учетную запись Zendure с другим адресом электронной почты и предоставить доступ к Solarflow HUB этой учетной записи. Затем используйте вторую учетную запись для ioBroker / адаптера Zendure Solarflow.

3. Адаптер покажет использование +10 Вт от батареи, если нет солнечного входа и устройство находится в сети. Это будет отражать «резервное» использование устройства.

## Кредиты
Благодарность за это выражается https://github.com/reinhard-brandstaedter/solarflow, который очень помог со знаниями о сервере MQTT от Zendure! Спасибо!

## Пожертвовать
Если вы найдете этот адаптер полезным для себя и захотите поддержать мою работу, не стесняйтесь сделать пожертвование через Paypal. Спасибо! (это персональная ссылка для пожертвований для Nograx, не имеющая никакого отношения к проекту ioBroker!)<br />

## Changelog
### 1.10.1 (2025-01-06)

- Fix input limit when hub is bundled with ace
- Fix calculation when low voltage block is activated

### 1.10.0 (2024-12-02)

- Add setting to perform a full charge if SOC from Zendure is greater than 50% when on low voltage
- Bugfixes

### 1.9.3 (2024-11-22)

- Fix for Low Voltage Block not deactivated

### 1.9.2 (2024-11-21)

- Fix some state definitions

### 1.9.1 (2024-11-21)

- Improvement for 'Low Voltage Block'.
- Changed the state "hubState" a an option value.

### 1.9.0 (2024-11-20)

- New option to force Solarflow device to go offline when "Low Voltage Block"-option is used.

## License

MIT License

Copyright (c) 2025 Peter Frommert

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