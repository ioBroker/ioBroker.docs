---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apsystems-ez1/README.md
title: kein Titel
hash: Rp3jir57KqzgaGiuzBt6D9bNJixl+TrBk2HMs67FyqA=
---
![Logo](../../../en/adapterref/iobroker.apsystems-ez1/admin/apsystems-ez1.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.apsystems-ez1.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.apsystems-ez1.svg)
![Anzahl der Installationen](https://iobroker.live/badges/apsystems-ez1-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/apsystems-ez1-stable.svg)

---

## 📌 Beschreibung
Dieser Adapter integriert sich in **APsystems EZ1 Mikro-Wechselrichter** über die **lokale HTTP-API (Port 8050)** des Geräts.

Er ermöglicht das Auslesen von Wechselrichterdaten in Echtzeit und die Steuerung bestimmter Geräteparameter.

### ✔ Unterstützte Funktionen
- Echtzeit-Leistungs- und Energiewerte ablesen
- Geräteinformationen auslesen (Firmware, SSID, IP usw.)
- Lesen Sie **Alarmzustände**
- **MaxPower** einstellen
- **Ein-/Aus-Zustand einstellen**
- Unterstützung für **mehrere Geräte** in einer Adapterinstanz
- HTTP-Timeout- und Wiederholungslogik
- Optionale **E-Mail-Benachrichtigung** bei wiederholten Fehlern
- Enthält ein **VIS2-Widget** zur Überwachung und Steuerung

### 🔗 Herstellerinformationen
Produktseite von APsystems EZ1: https://apsystems.com

---

## 🛠 Installation
Installation über ioBroker Admin:

**Adapter → Suche „apsystems-ez1“ → Installieren**

oder über die Befehlszeile:

```
iobroker install iobroker.apsystems-ez1
```

---

## ⚙️ Konfiguration
Der Adapter unterstützt **mehrere Geräte** über ein JSON-Array:

### **Geräte**
Beispiel:

```json
[
  { "name": "Roof", "ip": "192.168.1.50" },
  { "name": "Garage", "ip": "192.168.1.51" }
]
```

### PollInterval
- Intervall in Sekunden zwischen den Umfragen
- Standardwert: 30

### HttpTimeout
- HTTP-Timeout in Millisekunden
- Standardwert: 5000

### HttpRetries
- Anzahl der Wiederholungsversuche
- Standardwert: 2

### EZ1 API-Port
- IP-Portnummer des Geräts
- Standardwert: 8050

### AlertEmail
- Optionale E-Mail-Adresse für dauerhafte Fehlermeldungen
- Erfordert lokales sendmail

---

## 📊 Erstellte Staaten
Alle Staaten werden unter folgender Grundlage geschaffen:

```
apsystems-ez1.<instance>.devices.<DeviceName>.*
```

### Geräteinformationen
|Bundesland |Typ |Beschreibung|
| -------- | ------- | ------- |
|Geräte-ID |Zeichenfolge |Geräte-ID|
|devVer |string |Firmwareversion|
|ssid |string |Verbundene WLAN-SSID|
|ipAddr |string |Geräte-IP-Adresse|

### Strom und Energie
|Bundesland |Typ |Beschreibung|
| -------- | ------- | ------- |
|output.p1 |number |Power channel 1 (W)|
|output.p2 |number |Power channel 2 (W)|
|output.p |number |Gesamtleistung (W)|
|output.e1 |number |Energiekanal 1 (kWh)|
|output.e2 |number |Energiekanal 2 (kWh)|
|output.e |number |Gesamtenergie (kWh)|
|output.te1 |number |Lebensdauerenergie Kanal 1|
|output.te2 |number |Lifetime energy channel 2|

### Kontrolle
|Status |Typ |Schreiben |Beschreibung|
| -------- | ------- | ------- | ------- |
|control.maxPower |number |yes |Maximale Leistung einstellen (W)|
|control.onOff |boolean |yes |Wechselrichter ein-/ausschalten|

### Alarme
|Bundesland |Typ |Beschreibung|
| -------- | ------- | ------- |
|alarm.og |boolean |Off-Grid-Alarm|
|alarm.isce1 |boolean |DC1 Kurzschluss|
|alarm.isce2 |boolean |DC2 Kurzschluss|
|alarm.oe |boolean |Fehlerausgabe|

## 🖼 VIS2-Widget
Eine VIS2-Widget-Vorlage ist enthalten unter:

```
vis2/ez1-control
```

Es wird angezeigt:

- Leistungs- und Energiewerte
- Alarmzustände
- MaxPower- und Ein-/Ausschalter

Möglicherweise müssen Sie die Instanz-ID innerhalb des Widgets anpassen.

## 🌐 EZ1 Lokale API-Endpunkte
Der Adapter verwendet die folgenden Endpunkte:

```
GET /getDeviceInfo
GET /getOutputData
GET /getMaxPower
GET /getAlarm
GET /getOnOff

GET /setMaxPower?p=VALUE
GET /setOnOff?status=0|1
```

---

## 🧪 Entwicklung & Test
Abhängigkeiten installieren:

```
npm install
```

Tests ausführen:

```
npm test
```

Adapter auf dem Entwicklungsserver ausführen:

```
dev-server watch
```

---

## 📦 Veröffentlichung
Releases werden über GitHub Actions verwaltet.
Pushen Sie ein Tag wie folgt:

```
v0.1.7
```

und eine neue Version wird automatisch veröffentlicht.

---

## 🧑‍💻 Autor
Haining Zhi GitHub: https://github.com/zhihaining

---

## Changelog
### 0.2.4 (2026-02-06)
- Fix review findings

### 0.2.3 (2026-01-13)
- release 0.2.3 to npm

### 0.1.6

- Fix warning at startup of validator function

### 0.1.5

- First pre‑release version

### 0.1.4

- First hardware‑tested version

### 0.1.3

- Refactor release script, add i18n step, avoid duplicates

### 0.1.2

- Fix JSON parsing and repository checker issues; add dminUI config and icons

### 0.1.1

- Initial release

---

## License

MIT License
Copyright (c) 2026

---