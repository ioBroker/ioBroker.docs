---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecosense/README.md
title: ioBroker.ecosense
hash: 018GiKWCdCZqMuaZqzItczXStZp7mjUqE31V8XwLEvU=
---
![Логотип](../../../en/adapterref/iobroker.ecosense/admin/ecosense.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ecosense.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ecosense.svg)
![Тестирование и выпуск](https://github.com/mrdimixx/ioBroker.ecosense/workflows/Test%20and%20Release/badge.svg)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

# ioBroker.ecosense

## Адаптер EcoSense для ioBroker

Считывает концентрацию радона с радоновых мониторов **EcoSense EcoQube** из облачного хранилища EcoSense.

Производитель / устройство: [EcoSense EcoQube](https://ecosense.io/products/ecoqube)

Радон — это радиоактивный газ без запаха, вторая по распространенности причина рака легких. С помощью этого адаптера вы можете использовать измерения EcoQube в ioBroker — для построения графиков, уведомлений или для управления вентилятором.

> **Примечание:** EcoSense не предоставляет официальный, документированный API. Адаптер использует тот же облачный интерфейс, что и приложение EcoQube. Если EcoSense внесет в него изменения, адаптер может перестать работать до обновления.

### Требования

- Устройство EcoQube, подключенное к Wi-Fi и отображающее показания в приложении EcoQube.
- Адрес электронной почты и пароль вашей учетной записи EcoSense (используемые в приложении)
- Учетные записи с двухфакторной аутентификацией не поддерживаются.

### Конфигурация

| Параметр                                  | Описание                                                                        | По умолчанию |
| ----------------------------------------- | ------------------------------------------------------------------------------- | ------------ |
| Электронная почта / Пароль                | Вход в приложение EcoQube. Пароль хранится в зашифрованном виде.                | –            |
| Интервал опроса                           | Продолжительность интервала между двумя запросами к облаку (минимум 5 минут)    | 10           |
| Предупреждающий порог (оранжевый)         | Исходя из этого значения `alertLevel` становится 1 (рекомендация ВОЗ)            | 100          |
| Порог срабатывания сигнализации (красный) | Исходя из этого значения `alertLevel` становится 2 (немецкое эталонное значение) | 300          |

Сам прибор EcoQube загружает новые данные примерно каждые 10 минут, поэтому более короткий интервал не обеспечит получение более свежих данных.

### Штаты

Для каждого устройства EcoQube создается имя, соответствующее его серийному номеру (отображаемое имя совпадает с именем из приложения):

| Состояние                  | Тип        | Описание                                                                            |
| -------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| `<serial>.radon`           | число      | Концентрация радона в Бк/м³ (`null` (пока устройство прогревается)                  |
| `<serial>.radonPci`        | число      | Концентрация радона в пКи/л                                                         |
| `<serial>.alertLevel`      | число      | 0 = зеленый, 1 = оранжевый, 2 = красный (в зависимости от ваших пороговых значений) |
| `<serial>.alertText`       | нить       | `green`, `orange` или `red`                                                         |
| `<serial>.lastMeasurement` | число      | Время последнего измерения, загруженного устройством.                               |
| `<serial>.online`          | логический | Устройство загружено за последние 3 периода загрузки (\~30 мин).                    |
| `<serial>.firmware`        | нить       | Версия прошивки                                                                     |
| `<serial>.json`            | нить       | Данные устройства в формате JSON (без персональных данных)                          |
| `<serial>.raw.*`           | смешанный  | Все остальные простые поля облачные сервисы предоставляют без изменений.            |
| `info.connection`          | логический | Последний запрос к облачным сервисам был успешно выполнен.                          |
| `info.lastPoll`            | число      | Отметка времени последнего успешного запроса                                        |

**Конфиденциальность:** облако также возвращает адрес электронной почты учетной записи, ваш публичный IP-адрес, имя сети Wi-Fi и местоположение, указанное в приложении. Адаптер отбрасывает эти поля — они никогда не записываются в состояния или журналы.

### Тестирование доступа к облаку без ioBroker

```bash
npm install
ECOSENSE_EMAIL="you@example.com" ECOSENSE_PASSWORD="secret" npm run check-api
```

Скрипт выполняет вход в систему, перечисляет все поля, возвращаемые API, и выводит необработанный JSON без персональных данных. Пожалуйста, приложите этот вывод, когда будете сообщать о проблеме с отсутствующими значениями.

### Пожертвовать

Если вам понравился этот адаптер и вы хотите поддержать его разработку, вы можете угостить меня кофе:

### Кредиты

Благодарим [rwestergren/hass-ecosense-radon](https://github.com/rwestergren/hass-ecosense-radon) (Home Assistant), чья работа продемонстрировала, как работает вход в облако EcoSense и конечная точка устройства. Этот адаптер является независимой реализацией.

Данный адаптер не связан с компанией EcoSense / FTLab и не одобрен ею.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.2 (2026-10-22)

- (mrdimixx) object IDs from serial numbers and cloud field names now only contain letters, digits, `_` and `-` (dots and slashes are replaced as well)
- (mrdimixx) dependencies updated

### 0.1.1 (2026-09-30)

- (mrdimixx) maintenance: author e-mail, request timeout via AbortSignal instead of setTimeout, CI actions updated
- (mrdimixx) releases are now published via npm trusted publishing (with provenance)

### 0.1.0 (2026-09-30)

- (mrdimixx) initial release
- (mrdimixx) radon concentration in Bq/m³ and pCi/L, alert level with configurable thresholds (WHO 100 / German reference value 300 Bq/m³)
- (mrdimixx) states for last measurement, online status and firmware of each EcoQube
- (mrdimixx) personal data delivered by the cloud (e-mail, public IP, Wi-Fi name, location) is never stored

Older changes can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 mrdimixx <stoppeld@gmx.de>

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