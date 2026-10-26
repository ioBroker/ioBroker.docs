---
chapters: {"pages":{"de/adapterref/iobroker.awtrix-ng/README.md":{"title":{"de":"ioBroker.awtrix-ng"},"content":"de/adapterref/iobroker.awtrix-ng/README.md"},"de/adapterref/iobroker.awtrix-ng/weather-app.md":{"title":{"de":"ioBroker.awtrix-ng"},"content":"de/adapterref/iobroker.awtrix-ng/weather-app.md"}}}
---
![Logo](../../admin/awtrix-ng.png)

# ioBroker.awtrix-ng

## Wetter-App

Dieses Beispiel zeigt das aktuelle Wetter aus dem Adapter [ioBroker.openweathermap](https://github.com/ioBroker/ioBroker.openweathermap) in einer Experten-App an:

- Ein passendes Icon zur Wetterlage (Tag und Nacht)
- Die Wetterlage als Text, optional mit der aktuellen Temperatur
- Eine Textfarbe abhängig von der Temperatur (über 30 °C rot, unter 0 °C blau)
- Ein Wetter-Overlay (Niesel, Regen, Gewitter, Schnee) über der Anzeige

### Vorbereitung

1. Lade die Icons aus der Tabelle unten über die Weboberfläche von Awtrix NG auf das Gerät. Awtrix NG sucht ein Icon als `/ICONS/<id>.gif` (bzw. `.jpg`) - der Dateiname muss also der Icon-ID entsprechen.
2. Erstelle in den Instanz-Einstellungen (Tab Expertenoptionen) eine Experten-App mit dem Namen `weather` und speichere die Einstellungen.
3. Lege im Adapter [ioBroker.javascript](https://github.com/ioBroker/ioBroker.javascript) ein neues JavaScript an und füge das Script unten ein.

### Icons

| Code | Wetterlage | Icon (Tag) | Icon (Nacht) |
|------|------------|------------|--------------|
| 01 | Klarer Himmel | 11201 | 52163 |
| 02 | Wenige Wolken | 22315 | 26088 |
| 03 | Aufgelockerte Bewölkung | 22378 | 21907 |
| 04 | Bewölkt | 60742 | 52159 |
| 09 | Schauer | 43706 | 43739 |
| 10 | Regen | 22257 | 72 |
| 11 | Gewitter | 43733 | 43748 |
| 13 | Schnee | 43732 | 26090 |
| 50 | Nebel | 43708 | 43741 |

### Script

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

Die Experten-App überträgt Änderungen, die kurz nacheinander gesetzt werden (Icon, Overlay, Textfarbe, Text), gemeinsam an das Gerät.