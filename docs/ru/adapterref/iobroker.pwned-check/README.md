---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pwned-check/README.md
title: ioBroker.pwned-check
hash: vgvs+zBTh58scQomT7gXNZRJIJQNXbdjCPyF6VIckY4=
---
![Логотип](../../../en/adapterref/iobroker.pwned-check/admin/pwned-check.svg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.pwned-check.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pwned-check.svg)
![Количество установок](https://iobroker.live/badges/pwned-check-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/pwned-check-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.pwned-check.png?downloads=true)

# IoBroker.pwned-check
**Тесты:** ![Тестирование и выпуск](https://github.com/ipod86/ioBroker.pwned-check/workflows/Test%20and%20Release/badge.svg)

## Адаптер ioBroker для проверки утечек паролей и адресов электронной почты
Этот адаптер проверяет, фигурировали ли ваши пароли или адреса электронной почты в известных утечках данных, при этом ваши пароли никогда не отправляются ни на какой сервер.

## Функции
- **Конфиденциальность превыше всего** – пароли никогда не передаются. Хэш SHA-1 вычисляется локально в браузере; в API отправляются только первые 5 символов (k-анонимность).
- **Проверка пароля** – использует бесплатный API k-анонимности [Have I Been Pwned](https://haveibeenpwned.com/API/v3#PwnedPasswords) — ключ API не требуется
- **Проверка электронной почты** – используется бесплатный API [XposedOrNot](https://xposedornot.com) — ключ API не требуется
- **Подробности утечки** – отдельные данные по каждому источнику утечки в разделе `emails.<id>.leaks.*`
- **Уведомления ioBroker** – отправляет системное уведомление при обнаружении нового взлома на настроенном системном языке (поддерживается 11 языков).
- **Визуализация HTML** – генерирует готовый к использованию HTML-файл для отображения в VIS или других панелях мониторинга.
- **Настраиваемый внешний вид** – тема (светлая/темная), прозрачность фона, прозрачность карточки, размер шрифта.
- **Настраиваемый интервал** – проверка каждые 3, 6, 12 или 24 часа
- **Обнаружение вредоносных программ** – обнаруживает pawns-cli (прокси-программа iProyal) путем проверки процессов и файлов (**Только для Linux** — автоматически пропускается в Windows и macOS)

## Поддержка платформы
Проверка на утечку паролей и электронной почты работает на **всех платформах** (Linux, Windows, macOS).

**Обнаружение вредоносных программ** (проверка с помощью pawns-cli) **только для Linux** — инструмент обнаружения вредоносных программ (pawns-cli) представляет собой исполняемый файл для Linux и недоступен для Windows или macOS. Проверка автоматически пропускается в системах, отличных от Linux; никакой настройки не требуется.

## Установка
Установите через административный интерфейс ioBroker — найдите **pwned-check**.

## Конфигурация
### Вкладка «Пароли»
Добавьте по одной записи для каждого пароля, который вы хотите отслеживать. Введите **описание** (например, название сервиса) и **пароль**. Хэш SHA-1 вычисляется в вашем браузере и сохраняется — пароль в открытом виде никогда не сохраняется.

| Поле | Описание |
|-------|-------------|
| Описание | Метка для этого пароля (например, "GitHub") |
| Пароль | Вводится один раз; сохраняется только хеш SHA-1 |

### Вкладка «Электронная почта»
Добавьте по одной записи для каждого адреса электронной почты, подлежащего мониторингу.

| Поле | Описание |
|-------|-------------|
| Электронная почта | Адрес электронной почты для проверки |

### Вкладка «Настройки»
| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Интервал | Как часто проверять наличие новых нарушений | 24 часа |
| Тема | Визуализация света или тьмы | Свет |
| Прозрачность фона | Непрозрачность внешнего контейнера (0 = полная прозрачность) | 100% |
| Прозрачность карты | Прозрачность индивидуальной карты | 100% |
| Размер шрифта | Размер текста на визуализации | 14 пикселей |

## Точки данных
Адаптер создает точки данных в разделе `pwned-check.<instance>`.

### Пароли
| Точка данных | Тип | Описание |
|-----------|------|-------------|
| `passwords.<id>.isPwned` | логическое значение | `true` если обнаружено нарушение |
| `passwords.<id>.lastCheck` | строка | ISO-метка времени последней успешной проверки |
| `passwords.<id>.lastCheck` | строка | ISO-метка времени последней успешной проверки |

### Электронная почта
| Точка данных | Тип | Описание |
|-----------|------|-------------|
| `emails.<id>.isPwned` | логическое значение | `true` если обнаружено нарушение |
| `emails.<id>.leaks.<service>` | логическое значение | `true` для каждого найденного источника утечки |
| `emails.<id>.leaks.<service>` | логическое значение | `true` для каждого найденного источника утечки |

### Другой
| Точка данных | Тип | Описание |
|-----------|------|-------------|
| `visualisation` | строка | HTML-фрагмент для использования в VIS или ioBroker.vis-2 |
| `info.connection` | логическое значение | `true` во время выполнения проверки |

## Конфиденциальность
— Пароли **никогда** не хранятся в открытом виде — только их хеш SHA-1.
— Хэши паролей проверяются с использованием метода HIBP **k-анонимности**: передаются только первые 5 шестнадцатеричных символов хеша; полный хэш никогда не покидает вашу систему.
- Адреса электронной почты отправляются в API XposedOrNot по протоколу HTTPS.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.9 (2026-07-01)
* (ipod86) fix: update adapter-core to 3.4.1, clarify malware scanner description in README (W0034)
* (ipod86) fix: update admin dependency to >= 7.8.23 and fix dependabot cooldown format (W8917)

### 0.0.8 (2026-06-09)
* (ipod86) fix: robust language detection for widget (toLowerCase + language fallback)
* (ipod86) fix: translate all widget strings to system language (SAFE/PWNED/section headers/last check)

### 0.0.7 (2026-06-08)
* (ipod86) fix: translate all object names and widget texts to English/system language
* (ipod86) fix: malware notification now only sent on new detection, not on every check
* (ipod86) fix: malware check skipped on non-Linux platforms (Windows/macOS)
* (ipod86) fix: i18n description key corrected in 9 language files

### 0.0.6 (2026-06-06)
* (ipod86) fix: add missing intermediate folder/channel objects for emails, passwords, system, leaks (E3009)
* (ipod86) fix: update @alcalzone/release-script to >=5.2.1 (E0036)

### 0.0.5 (2026-05-31)
* (ipod86) fix: use this.setInterval/clearInterval/setTimeout/delay instead of plain JS timers (W5004, W5005, W5051)
* (ipod86) fix: add missing i18n key "label" to all languages (W5604)
* (ipod86) fix: engines.node >= 22, @tsconfig/node22, @types/node ^22, deploy node 24 (E0028, E3022)
* (ipod86) fix: add dependabot ignore block for @types/node major versions (E8917)
* (ipod86) fix: remove Node 20 from test matrix (W3024)
* (ipod86) fix: upgrade typescript to 6.0.3, release-script to 5.2.0, @iobroker/eslint-config to 2.3.4

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 ipod86

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