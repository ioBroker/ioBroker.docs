---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pwned-check/README.md
title: ioBroker.pwned-check
hash: sNdUuNSMyJgF50zCZdm/VRqPHfz61xWaBB6ND8QPB7U=
---
![Логотип](../../../en/adapterref/iobroker.pwned-check/admin/pwned-check.svg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.pwned-check.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pwned-check.svg)
![Количество установок](https://iobroker.live/badges/pwned-check-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/pwned-check-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.pwned-check.png?downloads=true)
![Тестирование и выпуск](https://github.com/ipod86/ioBroker.pwned-check/workflows/Test%20and%20Release/badge.svg)

# ioBroker.pwned-check

## Адаптер ioBroker для проверки утечек паролей и адресов электронной почты.

Этот адаптер проверяет, фигурировали ли ваши пароли или адреса электронной почты в известных утечках данных, при этом ваши пароли никогда не отправляются ни на какой сервер.

## Функции

- **Конфиденциальность превыше всего** – пароли никогда не передаются. Хэш SHA-1 вычисляется локально в браузере; в API отправляются только первые 5 символов (k-анонимность).
- **Проверка пароля** — используется бесплатный API анонимности [Have I Been Pwned](https://haveibeenpwned.com/API/v3#PwnedPasswords) — ключ API не требуется.
- **Проверка электронной почты** — используется бесплатный API [XposedOrNot](https://xposedornot.com) — ключ API не требуется.
- **Подробная информация о нарушении** — отдельные данные по каждому источнику утечки.`emails.<id>.leaks.*`
- **Уведомления ioBroker** — отправляет системное уведомление при обнаружении нового взлома на настроенном системном языке (поддерживается 11 языков).
- **Визуализация в HTML** — генерирует готовый к использованию HTML-файл данных для применения в VIS или других панелях мониторинга.
- **Настраиваемый внешний вид** – тема (светлая/темная), прозрачность фона, прозрачность карточки, размер шрифта.
- **Настраиваемый интервал** – проверка каждые 3, 6, 12 или 24 часа.
- **Обнаружение вредоносных программ** – выявляет pawns-cli (прокси-программа iProyal) путем проверки процессов и файлов ( **только для Linux** — автоматически пропускается в Windows и macOS).

## Поддержка платформы

Проверка на утечку паролей и адресов электронной почты работает на **всех платформах** (Linux, Windows, macOS).

**Проверка на наличие вредоносных программ** (pawns-cli check) предназначена **только для Linux** — инструмент обнаружения вредоносных программ (pawns-cli) представляет собой исполняемый файл для Linux и недоступен для Windows или macOS. На системах, отличных от Linux, проверка автоматически пропускается; никакой дополнительной настройки не требуется.

## Установка

Установите через административный интерфейс ioBroker — найдите **pwned-check** .

## Конфигурация

### вкладка «Пароли»

Добавьте по одной записи для каждого пароля, который вы хотите отслеживать. Введите **описание** (например, название сервиса) и **пароль** . Хэш SHA-1 вычисляется в вашем браузере и сохраняется — пароль в открытом виде никогда не сохраняется.

| Поле     | Описание                                         |
| -------- | ------------------------------------------------ |
| Описание | Метка для этого пароля (например, "GitHub")      |
| Пароль   | Вводится один раз; сохраняется только хеш SHA-1. |

### Вкладка «Электронная почта»

Добавьте по одной записи для каждого адреса электронной почты, подлежащего мониторингу.

| Поле              | Описание                             |
| ----------------- | ------------------------------------ |
| Электронная почта | Адрес электронной почты для проверки |

### вкладка «Настройки»

| Параметр           | Описание                                                    | По умолчанию |
| ------------------ | ----------------------------------------------------------- | ------------ |
| Интервал           | Как часто следует проверять наличие новых нарушений?        | 24 часа      |
| Тема               | Визуализация света или тьмы                                 | Свет         |
| Прозрачность фона  | Прозрачность внешнего контейнера (0 = полностью прозрачный) | 100%         |
| Прозрачность карты | Прозрачность индивидуального входного билета                | 100%         |
| размер шрифта      | Размер текста в визуализации                                | 14 пикселей  |

## Точки данных

Адаптер создает точки данных в рамках`pwned-check.<instance>` .

### Пароли

| Точка данных               | Тип        | Описание                                                                       |
| -------------------------- | ---------- | ------------------------------------------------------------------------------ |
| `passwords.<id>.isPwned`   | логический | `true` если будет обнаружено нарушение                                         |
| `passwords.<id>.leakCount` | число      | Количество раз, когда данные были обнаружены в базах данных утечек информации. |
| `passwords.<id>.lastCheck` | нить       | ISO-метка времени последней успешной проверки                                  |

### Электронные письма

| Точка данных                  | Тип        | Описание                                       |
| ----------------------------- | ---------- | ---------------------------------------------- |
| `emails.<id>.isPwned`         | логический | `true` если будет обнаружено нарушение         |
| `emails.<id>.lastCheck`       | нить       | ISO-метка времени последней успешной проверки  |
| `emails.<id>.leaks.<service>` | логический | `true` для каждого найденного источника утечки |

### Другой

| Точка данных      | Тип        | Описание                                                 |
| ----------------- | ---------- | -------------------------------------------------------- |
| `visualisation`   | нить       | HTML-фрагмент для использования в VIS или ioBroker.vis-2 |
| `info.connection` | логический | `true` пока выполняется проверка                         |

## Конфиденциальность

- Пароли **никогда не** хранятся в открытом виде — только их хеш SHA-1.
- Хэши паролей проверяются с использованием метода **k-анонимности** HIBP: передаются только первые 5 шестнадцатеричных символов хеша; полный хэш никогда не покидает вашу систему.
- Адреса электронной почты отправляются в API XposedOrNot по протоколу HTTPS.

## Changelog
### 0.0.10 (2026-07-19)
* (ipod86) fix: validate checkInterval bounds (clamp to 1–596 h) and switch to setTimeout loop to prevent concurrent check runs
* (ipod86) fix: remove redundant safeTextColor alias in updateVisualisation
* (ipod86) fix: correct JSDoc on loadPrevState method

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

Older changelogs are available in [CHANGELOG_OLD.md](https://github.com/ipod86/ioBroker.pwned-check/blob/main/CHANGELOG_OLD.md).

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