---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-technic/README.md
title: ioBroker VIS 2 Technic Widgets
hash: Abcg2n0+2FDne7QqbLMDghBF19jYZHtcjnwNua8Jy88=
---
# IoBroker VIS 2 Technic Widgets

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-2-widgets-technic.svg)
![Лицензия: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Виджеты Technic для ioBroker VIS 2 с единым темно-бирюзовым дизайном для визуализации умного дома.

## Виджеты
**Окно - Стена** – Управление окнами и рулонными шторами с визуализацией в формате SVG, переключением режимов «Авто»/«Ручной», ползунком положения, контекстным меню и кнопками быстрой настройки (0 / 25 / 50 / 75 / 100%).

**Переключатель - Логическое значение** – Переключатель включения/выключения с возможностью выбора SVG-иконок и настраиваемыми цветами включения/выключения.

**Диммер для освещения** – диммер с углом поворота 270°, регулируемой ручкой, динамической анимацией светового луча, переключением питания и отображением процента яркости.

## Требования
- ioBroker js-controller >= 6.0.11
- ioBroker VIS 2 >= 2.0.0
- Node.js >= 20

## Установка
Установите через административный интерфейс ioBroker, найдя "vis-2-widgets-technic" в списке адаптеров.

После установки выполните принудительное обновление страницы в браузере (Ctrl+Shift+R).

## Дизайн
Все виджеты используют единую цветовую палитру:

- Бирюзовый `#2ecfbf` – Активное / ВКЛ состояние
- Вторичный `#5f8f8a` – Неактивное / ВЫКЛ. состояние
- Фон `#0d1820` – Фон виджета
- Текст `#c8e6e3` – Метки и текст

## Changelog

### 0.1.20 (2026-06-28)
- fix: complete translations for all news entries

### 0.1.19 (2026-06-28)
- fix: remove duplicate English news translations flagged by repochecker

### 0.1.18 (2026-06-27)
- Remove postinstall script, fix i18n translations (component mode), remove demo widget and template keys

### 0.1.17 (2026-06-27)
- Release 0.1.17

### 0.1.16 (2026-06-26)
- Translate all widget names and labels to English, fix window blind open/close logic, add quick-set buttons (0/25/50/75/100%)

### 0.1.15 (2026-06-21)
- Release 0.1.15

### 0.1.14 (2026-06-21)
- Release 0.1.14

### 0.1.13 (2026-06-19)
- fix: workflow permissions and provenance flag

### 0.1.12 (2026-06-19)
- fix: enable npm provenance via GitHub Actions, remove debug script

### 0.1.11 (2026-06-19)
- fix: remove process.env/exit for compact mode compliance

### 0.1.10 (2026-06-19)
- fix: correct web restart command chaining in install.js

### 0.1.9 (2026-06-19)
- fix: call iobroker.js directly to bypass broken wrapper recursion

### 0.1.8 (2026-06-19)
- fix: capture real stderr in install.js for debugging

### 0.1.7 (2026-06-19)
- fix: persistent logging in install.js for debugging

### 0.1.6 (2026-06-19)
- fix: persistent logging in install.js for debugging

### 0.1.5 (2026-06-19)
- fix: robust install.js with retry and file verification for fresh installs

### 0.1.4 (2026-06-18)
- Initial npm release

### 0.1.3 (2026-06-18)
- Added BeleuchtungDimmer widget

### 0.1.2 (2026-05-01)
- AnAusSchalter widget with SVG icons and freely configurable colors

### 0.1.1 (2026-04-01)
- FensterNormal widget with SVG transparency and context menu

### 0.1.0 (2026-03-01)
- Initial release

## License

MIT License
Copyright (c) 2026 iobroker-community-adapters

See [LICENSE](LICENSE) for full text.