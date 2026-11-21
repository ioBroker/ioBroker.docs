---
chapters: {"pages":{"de/adapterref/iobroker.awtrix-ng/README.md":{"title":{"de":"ioBroker.awtrix-ng"},"content":"de/adapterref/iobroker.awtrix-ng/README.md"},"de/adapterref/iobroker.awtrix-ng/weather-app.md":{"title":{"de":"ioBroker.awtrix-ng"},"content":"de/adapterref/iobroker.awtrix-ng/weather-app.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.awtrix-ng/weather-app.md
title: ioBroker.awtrix-ng
hash: yb/Wfy2EvS6udz8CtbObWrg9ThOD2GAqrkREkVIcQgc=
---
![логотип](../../../de/admin/awtrix-ng.png)

# ioBroker.awtrix-ng

## приложение погоды

В этом примере в экспертном приложении отображается текущая погода, полученная от адаптера [ioBroker.openweathermap](https://github.com/ioBroker/ioBroker.openweathermap) :

- Подходящая иконка для отображения погодных условий (день и ночь).
- Прогноз погоды в текстовом формате, при желании с указанием текущей температуры.
- Цвет текста зависит от температуры (красный при температуре выше 30 °C, синий при температуре ниже 0 °C).
- Наложение погодных условий (моросящий дождь, дождь, гроза, снег) на изображение.

### Подготовка

1. Загрузите значки из таблицы ниже на устройство через веб-интерфейс Awtrix NG. Awtrix NG будет искать значок следующим образом: `/ICONS/<id>.gif` (или `.jpg`) - следовательно, имя файла должно совпадать с идентификатором значка.
2. В настройках экземпляра (вкладка «Параметры эксперта») создайте экспертное приложение с именем... `weather` и сохраните настройки.
3. Создайте новый JavaScript-файл в адаптере [ioBroker.javascript](https://github.com/ioBroker/ioBroker.javascript) и вставьте в него приведенный ниже скрипт.

### Иконки

| код | Погодная ситуация     | Иконка (Тег) | Икона (Ночь) |
| --- | --------------------- | ------------ | ------------ |
| 01  | Ясное небо            | 11201        | 52163        |
| 02  | Мало облаков          | 22315        | 26088        |
| 03  | Переменная облачность | 22378        | 21907        |
| 04  | Облачно               | 60742        | 52159        |
| 09  | душ                   | 43706        | 43739        |
| 10  | Дождь                 | 22257        | 72           |
| 11  | Гроза                 | 43733        | 43748        |
| 13  | Снег                  | 43732        | 26090        |
| 50  | Туман                 | 43708        | 43741        |

### Сценарий

```javascript
// v1.0
const awtrixApp = 'awtrix-ng.0.apps.weather';
const weatherPrefix = 'openweathermap.0.forecast.current';

// Temperatur im Text anzeigen
const displayTemp = true;
const tempDecimals = 1;

// OpenWeatherMap-Icon (z.B. 01d) -> Icon-ID auf dem Gerät
const iconMap = {
    '01d': '11201', '01n': '52163', // Klarer Himmel
    '02d': '22315', '02n': '26088', // Wenige Wolken
    '03d': '22378', '03n': '21907', // Aufgelockerte Bewölkung
    '04d': '60742', '04n': '52159', // Bewölkt
    '09d': '43706', '09n': '43739', // Schauer
    '10d': '22257', '10n': '72',    // Regen
    '11d': '43733', '11n': '43748', // Gewitter
    '13d': '43732', '13n': '26090', // Schnee
    '50d': '43708', '50n': '43741', // Nebel
};

// Wetterlage (ohne Tag/Nacht) -> Overlay
const overlayMap = {
    '09': 'drizzle',
    '10': 'rain',
    '11': 'thunder',
    '13': 'snow',
};

function updateWeatherApp() {
    const iconState = getState(`${weatherPrefix}.icon`);
    const textState = getState(`${weatherPrefix}.state`);
    const tempState = getState(`${weatherPrefix}.temperature`);

    if (!iconState?.ack || !textState?.ack || !tempState?.ack || !iconState.val || !textState.val) {
        return;
    }

    // Icon-Code aus der URL bzw. dem Wert extrahieren (z.B. 01d)
    const iconCode = String(iconState.val).match(/(\d{2}[dn])/)?.[1];
    const temperature = Number(tempState.val);

    if (iconCode && iconMap[iconCode]) {
        setState(`${awtrixApp}.icon`, iconMap[iconCode]);
    }

    setState(`${awtrixApp}.overlay`, (iconCode && overlayMap[iconCode.substring(0, 2)]) ?? 'none');

    if (temperature > 30) {
        setState(`${awtrixApp}.textColor`, '#BD2020');
    } else if (temperature < 0) {
        setState(`${awtrixApp}.textColor`, '#236FD9');
    } else {
        setState(`${awtrixApp}.textColor`, '#FFFFFF');
    }

    let text = String(textState.val);
    if (displayTemp && !isNaN(temperature)) {
        text += ` ${temperature.toFixed(tempDecimals)}°C`;
    }
    setState(`${awtrixApp}.text`, text);
}

on(
    {
        id: [`${weatherPrefix}.icon`, `${weatherPrefix}.state`, `${weatherPrefix}.temperature`],
        change: 'ne',
        ack: true,
    },
    updateWeatherApp,
);

updateWeatherApp();
```

Приложение для экспертов передает на устройство все внесенные изменения в быстрой последовательности (значок, наложение, цвет текста, сам текст).