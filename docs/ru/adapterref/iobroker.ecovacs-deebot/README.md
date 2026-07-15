---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecovacs-deebot/README.md
title: ioBroker.ecovacs-deebot
hash: Pfjue01765+6tWgkRnw7rf4zZ3X6XMZYNCFdeAOJpG4=
---
# IoBroker.ecovacs-deebot
![Логотип](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![Стабильная версия](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![Последняя версия](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Количество установок](http://iobroker.live/badges/ecovacs-deebot-installed.svg)

Этот адаптер использует библиотеку [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

> **⚠️ Статус поддержки: Проект, управляемый сообществом** > Этот адаптер теперь работает по модели поддержки, управляемой **сообществом**. Разработчик сосредоточен на основном движке и устройствах, находящихся в его личном владении. Поддержка всех остальных моделей полностью зависит от вклада сообщества (запросы на слияние).

---

## 🗺️ Дорожная карта и стратегия
Для обеспечения долгосрочной ремонтопригодности мы оптимизируем архитектуру адаптера. **Примечание: В настоящее время мы находимся в цикле выпуска версии 1.4.x.**

1. **Этап 1 (планируется): Окончательная поддержка устаревших версий (адаптер v1.5.x / библиотека v0.9.6)**
* Это будет последняя «безопасная гавань» для всех устаревших устройств, использующих протоколы XML (XMPP/XML или MQTT/XML).
* После выпуска новые устаревшие функции добавляться не будут.
2. **Этап 2 (планируемый): Модернизация (Адаптер v2.0.x / Библиотека v1.0.0)**
* Переход к **чистому стеку MQTT/JSON**.
* Полное удаление устаревшего кода для повышения производительности и стабильности.
* **Критическое изменение:** В версии 2.x поддержка устаревших моделей (например, OZMO 930, Deebot 900) прекращена.

---

## Модели и уровни поддержки
Поддержка разделена на уровни в зависимости от доступности устройства для разработчика:

| **Уровень** | **Серия моделей (примеры)** | **Статус** |
| :--- | :--- | :--- |
| 🟢 Активные устройства | OZMO 920/950, T8 AIVI, X1 Turbo | **Полностью поддерживаются.** Устройства, принадлежащие сопровождающему |
| 🟡 Сообщество | T10, T20, T30, X2, X8 и т. д. | **Прилагаются все усилия.** Поддержка осуществляется посредством запросов на слияние от сообщества |
| 🔴 Устаревшие модели | OZMO 930, Deebot 900/901 и др. | **Только для технического обслуживания.** Поддерживается только в **версии 1.5.x** |

### Как обеспечить поддержку вашей модели?
Если у вас современная модель (MQTT/JSON), которая в настоящее время не поддерживается:

1. Проверьте библиотеку [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).
2. Предоставьте **запрос на слияние** с необходимыми определениями модели.
3. **Запросы на добавление новых моделей без запроса на слияние (Pull Request) будут закрыты без предварительного уведомления.**

---

## Установка и необходимые условия
* **Node.js:** >= 20.x (начиная с версии 1.4.16)
* **ioBroker:** Стабильная установка
* **Необязательно:** `canvas` для отображения карты (подробнее см. в [Вики](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)).

## Отказ от ответственности
Я никоим образом не связан с компанией Ecovacs Robotics Co., Ltd. или Yeedi Technology Limited. Это частный проект, которым я занимаюсь в качестве хобби.

## Changelog

### 1.4.16 (alpha)
- Breaking change: Bump minimum required version of Node.js to 20.x
- Add more states for air drying timer
- Use adapter-dev module
- Some further improvements and optimizations
- Bumped ecovacs-deebot.js to 0.9.6 (latest beta)
- Bumped several other dependencies
 
### 1.4.15 (latest stable)
- Breaking change: Bump minimum required version of Node.js to 18.x
- Bumped ecovacs-deebot.js to 0.9.6 (beta)
- Add state (button) for manually requesting the cleaning log
- Separate mopping and scrubbing mode
- Add states for air drying timer
- Some further improvements and optimizations

### 0.0.1 - 1.4.14
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive))

---

## License
MIT License - Copyright (c) 2026 Sascha Hölzel