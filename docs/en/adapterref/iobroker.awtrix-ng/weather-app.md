---
chapters: {"pages":{"en/adapterref/iobroker.awtrix-ng/README.md":{"title":{"en":"ioBroker.awtrix-ng"},"content":"en/adapterref/iobroker.awtrix-ng/README.md"},"en/adapterref/iobroker.awtrix-ng/weather-app.md":{"title":{"en":"ioBroker.awtrix-ng"},"content":"en/adapterref/iobroker.awtrix-ng/weather-app.md"}}}
---
![Logo](../../admin/awtrix-ng.png)

# ioBroker.awtrix-ng

## Weather app

This example shows the current weather of the adapter [ioBroker.openweathermap](https://github.com/ioBroker/ioBroker.openweathermap) in an expert app:

- A matching icon for the weather condition (day and night)
- The weather condition as text, optionally with the current temperature
- A text color depending on the temperature (above 30 °C red, below 0 °C blue)
- A weather overlay (drizzle, rain, thunder, snow) on top of the display

### Preparation

1. Upload the icons of the table below to the device via the web interface of Awtrix NG. Awtrix NG looks for an icon as `/ICONS/<id>.gif` (or `.jpg`) - so the file name must be the icon ID.
2. Create an expert app with the name `weather` in the instance settings (tab expert options) and save the settings.
3. Create a new JavaScript in the adapter [ioBroker.javascript](https://github.com/ioBroker/ioBroker.javascript) and paste the script below.

### Icons

| Code | Condition | Icon (day) | Icon (night) |
|------|-----------|------------|--------------|
| 01 | Clear sky | 11201 | 52163 |
| 02 | Few clouds | 22315 | 26088 |
| 03 | Scattered clouds | 22378 | 21907 |
| 04 | Broken clouds | 60742 | 52159 |
| 09 | Shower rain | 43706 | 43739 |
| 10 | Rain | 22257 | 72 |
| 11 | Thunderstorm | 43733 | 43748 |
| 13 | Snow | 43732 | 26090 |
| 50 | Mist | 43708 | 43741 |

### Script

```javascript
// v1.0
const awtrixApp = 'awtrix-ng.0.apps.weather';
const weatherPrefix = 'openweathermap.0.forecast.current';

// Show the temperature in the text
const displayTemp = true;
const tempDecimals = 1;

// OpenWeatherMap icon (e.g. 01d) -> icon ID on the device
const iconMap = {
    '01d': '11201', '01n': '52163', // Clear sky
    '02d': '22315', '02n': '26088', // Few clouds
    '03d': '22378', '03n': '21907', // Scattered clouds
    '04d': '60742', '04n': '52159', // Broken clouds
    '09d': '43706', '09n': '43739', // Shower rain
    '10d': '22257', '10n': '72',    // Rain
    '11d': '43733', '11n': '43748', // Thunderstorm
    '13d': '43732', '13n': '26090', // Snow
    '50d': '43708', '50n': '43741', // Mist
};

// Weather condition (without day / night) -> overlay
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

    // Extract the icon code of the URL / value (e.g. 01d)
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

The expert app transfers changes which are set shortly after each other (icon, overlay, text color, text) to the device together.