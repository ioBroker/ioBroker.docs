---
chapters: {"pages":{"de/adapterref/iobroker.awtrix-light/README.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/README.md"},"de/adapterref/iobroker.awtrix-light/weather-app.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/weather-app.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.awtrix-light/weather-app.md
title: ioBroker.awtrix-light
hash: yES6pra10Z+PwF/i1SgF+xx2KsTlB4pXj5TsMMgfnRs=
---
![логотип](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
##Приложение «Погода» (экспертное приложение)
Этот скрипт отображает правильный значок текущей погодной ситуации в экспертном приложении. Для этого значки из [ioBroker.openweathermap](https://github.com/ioBroker/ioBroker.openweathermap/tree/master) сопоставляются со значками на устройстве.

*Спасибо Andy200877 с форума ioBroker за идею.*

### Иконки
Загрузите следующие значки на устройство через веб-интерфейс:

- `11201` (01d ясное небо) - день ясного неба
- `52163` (01n ясное небо) - ясное небо ночью
- `22315` (02d малооблачно) - малооблачный день (11-25% облачности)
- `26088` (02n малооблачно) - малооблачно ночью (11-25% облачности)
- `22378` (03d рассеянная облачность) - день с рассеянной облачностью (25-50% облачности)
- `21907` (03n рассеянная облачность) - рассеянная облачность ночью (25-50% облачности)
- `13852` (04d разорванная облачность) - пасмурный день (51-100%)
- `52159` (04н разорванная облачность) - облачная ночь (51-100%)
- `43706` (09d ливень) - дождливый день
- `43739` (09n ливень дождь) - ливень ночью
- `22257` (10д дождь) - дождливый день
- `72` (дождь 10н) - дождь ночью
- `43733` (11д гроза) - грозовой день
- `43748` (11н гроза) - Грозовая ночь
- `43732` (13д снега) - снежный день
- `26090` (13н снега) - снежная ночь
- `43708` (50d туман) - туманный день
- `43741` (50n туман) - Туманная ночь

### Новое экспертное приложение
Создает новое экспертное приложение с именем `weather`.

### Скрипт
```javascript
// v0.2
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
    '04d': '13852', // broken clouds day
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