---
chapters: {"pages":{"de/adapterref/iobroker.awtrix-light/README.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/README.md"},"de/adapterref/iobroker.awtrix-light/weather-app.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/weather-app.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.awtrix-light/weather-app.md
title: ioBroker.awtrix-light
hash: xOEQ+GozvpV4FTaUnP1Z23Lv4aTSNnr8tdg+7oQ7jG0=
---
![логотип](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
## Приложение «Погода» (экспертное приложение)
Этот скрипт отображает корректный значок для текущих погодных условий в экспертном приложении. Это достигается путём сопоставления значков из [ioBroker.openweathermap](https://github.com/ioBroker/ioBroker.openweathermap/tree/master) со значками на устройстве.

*Спасибо Andy200877 с форума ioBroker за идею.*

### Иконки
Загрузите следующие иконки на устройство через веб-интерфейс:

- `11201` (01d clear sky) - день ясного неба
- `52163` (01n ясное небо) - ночь ясного неба
- `22315` (02д небольшая облачность) - днем небольшая облачность (облачность 11-25%)
- `26088` (02n небольшая облачность) - небольшая облачность ночью (11-25% облачности)
- `22378` (03д разрозненные облака) - день разрозненные облака (облачность 25-50%)
- `21907` (03n разрозненные облака) - разрозненные облака ночью (облачность 25-50%)
- `60742` (04д. облачность) - пасмурный день (51-100%)
- `52159` (04n разорванная облачность) - облачная ночь (51-100%)
- `43706` (09d ливневый дождь) - День ливневого дождя
- `43739` (09n ливневый дождь) - Ночью ливневый дождь
- `22257` (10d rain) - дождливый день
- ` 72` (10n дождь) - Ночью дождь
- `43733` (11-дневная гроза) - День грозы
- `43748` (11н гроза) - Ночь с грозой
- `43732` (13d snow) - Снежный день
- `26090` (13н снег) - Снежная ночь
- `43708` (50d туман) - День тумана
- `43741` (50н туман) - Ночной туман

### Новое экспертное приложение
Создает новое экспертное приложение с именем `weather`.

### Скрипт
```javascript
// v0.3
const displayTemp = true;

const appName = 'weather';
const objIdIcon = 'openweathermap.0.forecast.current.icon';
const objIdText = 'openweathermap.0.forecast.current.state';
const objIdTemp = 'openweathermap.0.forecast.current.temperature';

const iconMapping = {
    '01d': '11201', // clear sky day
    '01n': '52163', // clear sky night
    '02d': '22315', // few clouds day
    '02n': '26088', // few clouds night
    '03d': '22378', // scattered clouds day
    '03n': '21907', // scattered clouds night
    '04d': '60742', // broken clouds day
    '04n': '52159', // broken clouds night
    '09d': '43706', // shower rain day
    '09n': '43739', // shower rain night
    '10d': '22257', // rain day
    '10n': '72',    // rain night
    '11d': '43733', // thunderstorm day
    '11n': '43748', // thunderstorm night
    '13d': '43732', // snow day
    '13n': '26090', // snow night
    '50d': '43708', // mist day
    '50n': '43741', // mist night
};

async function refreshExpertApp() {
    try {
        const iconState = await getStateAsync(objIdIcon);
        if (iconState && iconState.ack && iconState.val) {
            const icon = /([0-9]{2}[d|n]{1})/.exec(iconState.val)[0];
            if (iconMapping[icon]) {
                await setStateAsync(`awtrix-light.0.apps.${appName}.icon`, { val: iconMapping[icon] });
            }
        }

        let temp = 0;
        const tempState = await getStateAsync(objIdTemp);
        if (tempState && tempState.ack && tempState.val) {
            temp = tempState.val;
        }

        if (temp > 30) {
            await setStateAsync(`awtrix-light.0.apps.${appName}.textColor`, { val: '#bd2020' });
        } else if (temp < 0) {
            await setStateAsync(`awtrix-light.0.apps.${appName}.textColor`, { val: '#236fd9' });
        } else {
            await setStateAsync(`awtrix-light.0.apps.${appName}.textColor`, { val: '#ffffff' });
        }

        const textState = await getStateAsync(objIdText);
        if (textState && textState.ack && textState.val) {
            if (displayTemp) {
                await setStateAsync(`awtrix-light.0.apps.${appName}.text`, { val: `${textState.val} - ${formatValue(temp, 2)} °C` });
            } else {
                await setStateAsync(`awtrix-light.0.apps.${appName}.text`, { val: textState.val });
            }
        }
    } catch (err) {
        console.error(err);
    }
}

on({ id: [objIdIcon, objIdText, objIdTemp], change: 'ne' }, refreshExpertApp);

// Init on startup
refreshExpertApp();
```