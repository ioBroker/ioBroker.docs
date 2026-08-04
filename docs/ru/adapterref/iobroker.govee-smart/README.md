---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.govee-smart/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart
hash: MmAk/+FsnENpdUXKDHJwMHjEWCcEPZ5LfKNvlaSWMh8=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart

![npm версия](https://img.shields.io/npm/v/iobroker.govee-smart)
![стабильный](https://iobroker.live/badges/govee-smart-stable.svg)
![Установки](https://iobroker.live/badges/govee-smart-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.govee-smart)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Часовой](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Управляйте всеми устройствами Wi-Fi ([Гови](https://www.govee.com/)) из ioBroker — освещением, датчиками и бытовой техникой. Устройства, работающие только по Bluetooth, не поддерживаются.

Адаптер использует все доступные каналы Govee (LAN, Cloud REST, AWS IoT MQTT, OpenAPI MQTT, App API) и выбирает тот, который обеспечивает наиболее быстрый ответ для каждого устройства. Подробности в **[Вики](https://github.com/krobipd/ioBroker.govee-smart/wiki)**.

---

## Документация
Полная пользовательская документация находится в **[Вики](https://github.com/krobipd/ioBroker.govee-smart/wiki)**.

| Тема | Английский | Немецкий |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Целевая страница | [Главная страница](https://github.com/krobipd/ioBroker.govee-smart/wiki/Home) | [Стартовая страница]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Startseite) |
| Поддерживаемые модели, значения статуса, добавляйте свои | [Устройства](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) | [Герэте](https://github.com/krobipd/ioBroker.govee-smart/wiki/Geraete) |
| Каждая точка данных, куда она попадает, что она делает | [[Дерево состояний](https://github.com/krobipd/ioBroker.govee-smart/wiki/State-Tree) | [Точки данных]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Datenpunkte) |
| Термометры, обогреватели, чайники и т. д. — дерево состояний, обновления, устранение неполадок | [[Датчики и бытовая техника](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensors-and-Appliances) | [Датчики и бытовая техника]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensoren-und-Appliances) |
| Освещение — подсчет сегментов, мастер, нарезка полос, пакетные команды | [Сегменты](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segments) | [Сегменты](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segmente) |
| Освещение — библиотека сцен, ползунок скорости, облачные и локальные снимки | [[Сцены и снимки](https://github.com/krobipd/ioBroker.govee-smart/wiki/Scenes-and-Snapshots) | [Сцены и снимки]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Szenen-und-Snapshots) |
| Светофоры — групповое веерное распространение, пересечение возможностей | [Группы](https://github.com/krobipd/ioBroker.govee-smart/wiki/Groups) | [Группы]](https://github.com/krobipd/ioBroker.govee-smart/wiki/Gruppen) |
| Именование папок, запуск, диагностика, устранение неполадок | [Поведение](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) | [Верхальтен](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) |
| Именование папок, запуск, диагностика, устранение неполадок | [Поведение](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) | [Поведение](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) |

---

## Функции
- **Ориентация на возможности** — состояния генерируются на основе данных, предоставляемых API Govee для каждого устройства. Нет необходимости жестко задавать артикулы, нет необходимости вручную поддерживать список устройств, от которого можно отстать.
- **LAN-first для освещения** — Обнаружение многоадресных UDP-запросов, команды менее чем за 50 мс, обновления статуса через AWS IoT MQTT
- **Облако + MQTT-передача данных для датчиков и устройств** — показания через API приложения, события через брокер MQTT OpenAPI.
- **Задание цвета и яркости для каждого сегмента** для светодиодных лент с соответствующими возможностями, включая пакетные команды и визуальный мастер определения сегментов (с отображением карты ленты в реальном времени и возможностью корректировки) для обрезанных лент.
— **Сцены, сценарии, созданные пользователем, музыкальный режим, переключение градиента** — активируются локально через BLE-over-LAN, где это возможно, в противном случае используется облачное хранилище.
— **Облачные и локальные снимки** — Снимки приложения Govee и снимки со стороны ioBroker рядом.
- **Группы** — интеграция групп Govee с ioBroker с возможностью пересечения функций между участниками.
- **Кнопка экспорта диагностических данных для каждого устройства** — вывод JSON-данных в один клик для отчетов об ошибках.
- **Работает без учетных данных** — По умолчанию работает только в локальной сети, каждый уровень учетных данных открывает дополнительные возможности.
- **Ограниченное использование облачных сервисов** — ежедневные и поминутные лимиты соответствуют квоте Govee.

---

## Система Sentry / Отчет об ошибках
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Сообщение об ошибках отправляется только в том случае, если включена функция отправки сообщений об ошибках в диагностике ioBroker (**Системные настройки → Диагностика и отправка сообщений об ошибках**). Передается только анонимный идентификатор установки — имя, адрес электронной почты или IP-адрес не передаются.

Подробности и инструкции по отключению см. в разделе [документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Для отправки сообщений об ошибках требуется js-controller версии 3.0 или новее.

---

## Требования
- Node.js >= 22
- ioBroker js-controller >= 7.2.2
- ioBroker Admin >= 8.0.1
- Учетная запись Govee и как минимум одно устройство Govee WiFi. Для управления по локальной сети требуется светильник с включенным режимом LAN в приложении Govee Home — см. список поддерживаемых устройств Govee для работы по локальной сети на сайте [https://app-h5.govee.com/user-manual/wlan-guide].

---

## Начиная
Адаптер работает только по локальной сети без каких-либо учетных данных. Добавление ключа API открывает доступ к сценариям, сегментам и управлению устройствами. Добавление вашего адреса электронной почты и пароля Govee добавляет показания датчиков (температура/влажность через API приложения), отправку статуса в реальном времени и полный групповой контроль. См. раздел [Страница настроек](https://github.com/krobipd/ioBroker.govee-smart/wiki/Setup) для получения информации об уровнях учетных данных, способах получения ключа API и сетевых требованиях.

---

## Поддержка устройств
Статус тестирования каждого устройства отображается в разделе `diag.tier`. В разделе [Страница устройств](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) перечислены все поддерживаемые модели и значение их статуса.

---

## Поиск неисправностей
Распространенные проблемы (устройства не обнаружены, пустой список сцен, не меняющиеся цвета сегментов, ограниченное количество команд для групп, задержка обновления статуса) описаны на странице Wiki [Поведение](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior)/[Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten).

Для всего остального установите значение **`diag.export`** в `true` на соответствующем устройстве, скопируйте JSON из `diag.result` и откройте [Проблема на GitHub](https://github.com/krobipd/ioBroker.govee-smart/issues).

---

## Благодарности
Реализация протокола аутентификации MQTT и BLE-over-LAN (ptReal) в этом адаптере основана на исследованиях [govee2mqtt](https://github.com/wez/govee2mqtt), проведенных Уэзом Фурлонгом. Их обратное проектирование протокола MQTT Govee AWS IoT и недокументированных API-интерфейсов оказалось бесценным.

---

## Поддерживать
- [Вики](https://github.com/krobipd/ioBroker.govee-smart/wiki) — пользовательская документация (EN / DE)
- [Проблемы на GitHub](https://github.com/krobipd/ioBroker.govee-smart/issues) — сообщения об ошибках, запросы на добавление новых функций
- [Форум ioBroker](https://forum.iobroker.net/) — общие вопросы

### Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.24.0 (2026-08-04)

- This version needs ioBroker Admin 8. The segment detection wizard is built for Admin 8 and no longer runs on Admin 7, so this update is not offered there.

### 2.23.1 (2026-08-04)

- Test release during the move to ioBroker Admin 8.

### 2.23.0 (2026-08-04)

- Test release during the move to ioBroker Admin 8.

### 2.22.0 (2026-07-23)

- A Govee app device group of the "same mode" type no longer appears as a phantom, uncontrollable device in the object tree.
- Seven more Govee models join the catalog, from Edison bulbs to a ceiling fan. They start as experimental — enable them in the adapter settings to try them.
- Sensors that reach the cloud through a Govee gateway now show which gateway they are connected through, instead of an empty IP field.

### 2.21.0 (2026-07-12) — stable

- The segment-detection wizard for cut LED strips now has a visual admin interface: a live map of the strip that fills in as you measure each segment and can be corrected before you apply it.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_