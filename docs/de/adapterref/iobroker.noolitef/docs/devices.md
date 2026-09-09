---
chapters: {"pages":{"en/adapterref/iobroker.noolitef/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.noolitef/README.md"},"en/adapterref/iobroker.noolitef/docs/install.md":{"title":{"en":"Installation Guide"},"content":"en/adapterref/iobroker.noolitef/docs/install.md"},"en/adapterref/iobroker.noolitef/docs/programming.md":{"title":{"en":"Programming Guide"},"content":"en/adapterref/iobroker.noolitef/docs/programming.md"},"en/adapterref/iobroker.noolitef/docs/devices.md":{"title":{"en":"Device Setup List"},"content":"en/adapterref/iobroker.noolitef/docs/devices.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.noolitef/docs/devices.md
title: Geräte-Setup-Liste
hash: we7C4VFMWe/feXrbOxyNBxOgvjtVvXy6+gbF7bdiRvQ=
---
# Geräte-Setup-Liste

## Gerätetyp

### Ein-/Ausschalter

_Ein-/Ausschalter_ – Die separaten Tasten für die Befehle EIN und AUS.

Das Gerät kann folgende Zustände aufweisen:

- onTurnOn – wird auf _„true“_ gesetzt, wenn der Benutzer die EIN-Taste drückt
- onTurnOff – wird auf _„true“_ gesetzt, wenn der Benutzer die AUS-Taste drückt.
- onBrightUp – wird auf _„true“_ gesetzt, wenn der Benutzer die EIN-Taste lange drückt.
- onBrightDown – wird auf _„true“_ gesetzt, wenn der Benutzer die AUS-Taste lange gedrückt hält.
- onStopReq - _true_ , wenn der Benutzer aufgehört hat, die Tasten lange gedrückt zu halten
- onLowBattery – auf _„true“_ setzen, wenn der Akku schwach ist

### Ein- und Aus-Taste

_Ein- und Aus-Tastenfeld_ – Die Taste mit den Befehlen EIN und AUS

Das Gerät kann folgende Zustände aufweisen:

- onSwitch – ändert den Wert _von „true“ auf „false“,_ wenn der Benutzer diese Taste drückt
- onBrightBack – Wert _auf „wahr“_ setzen, wenn der Benutzer diese Taste lange drückt
- onStopReq - _true_ , wenn der Benutzer aufgehört hat, die Taste lange gedrückt zu halten.
- onLowBattery – auf _„true“_ setzen, wenn der Akku schwach ist

### Szenario-Schaltfläche

_Szenario-Schaltfläche_ – Die Szenario-Schaltfläche für voreingestellte Noolite-Geräteobjekte

Das Gerät kann folgende Zustände aufweisen:

- onExecuteScenario - wird auf _„true“_ gesetzt, wenn der Benutzer diese Taste kurz drückt.
- onSaveScenario – wird auf _„true“_ gesetzt, wenn der Benutzer diese Schaltfläche lange drückt.
- onLowBattery – auf _„true“_ setzen, wenn der Akku schwach ist

### RGB-Fernbedienung

_RGB-Fernbedienung_ – RGB-Fernbedienung mit Ein-/Ausschalter, Farbauswahltaste und Farbwechseltaste

Das Gerät kann folgende Zustände aufweisen:

- onSwitch - ändert den Wert _von true/false,_ wenn der Benutzer die EIN/AUS-Taste drückt
- onSwitchMode – wird auf _„true“_ gesetzt, wenn der Benutzer _die Modusauswahltaste_ drückt.
- onSwitchColour - wird auf _„true“_ gesetzt, wenn der Benutzer _die Farbauswahltaste_ drückt.
- onBrightBack - wird _aktiviert_ , wenn der Benutzer die EIN/AUS-Taste lange drückt
- onStopReq - _wahr_ , wenn der Benutzer aufgehört hat, die EIN/AUS-Taste lange gedrückt zu halten
- onLowBattery – auf _„true“_ setzen, wenn der Akku schwach ist

### Türsender

_Türsensor_ – Das magnetische Türsensorobjekt

Das Gerät kann folgende Zustände aufweisen:

- isOpen – _wahr_ , wenn die Tür offen ist, _falsch,_ wenn die Tür geschlossen ist.
- onLowBattery – auf _„true“_ setzen, wenn der Akku schwach ist

### Wassersensor

_Wassersensor_ – Das Wassersensor-Geräteobjekt

Das Gerät kann folgende Zustände aufweisen:

- Alarm – _wird ausgelöst_ , wenn ein Wasserleck erkannt wird
- onLowBattery – auf _„true“_ setzen, wenn der Akku schwach ist

### Bewegungsmelder

_Bewegungssensor_ – Das Bewegungssensor-Geräteobjekt

Das Gerät kann folgende Zustände aufweisen:

- MotionDetect – auf _„true“_ setzen, wenn der Sensor Bewegungen erkannt hat, andernfalls auf „ _false“._
- onLowBattery – auf _„true“_ setzen, wenn der Akku schwach ist

### Schalten

_Schalter_ – Das einfache Relaisobjekt

- Status – Wenn auf _„true“_ gesetzt, sendet der Treiber _bei_ Aktivierung einen Befehl an das Relais, andernfalls _bei Deaktivierung_ .

### Dimmer

_Dimmer_ – Das Relais mit Dimmfunktion

Das Gerät kann folgende Zustände aufweisen:

- Status – Wenn auf _„true“_ gesetzt, sendet der Treiber _bei_ Aktivierung einen Befehl an das Relais, andernfalls _bei Deaktivierung_ .
- Helligkeit – Sende den Befehl _„setBrightness“_ mit dem Statuswert an das Relais. Der Wert wird in Prozent angegeben.

### RGB-Band

_RGB-Band_ – Das RGB-Controller-Objekt

Das Gerät kann folgende Zustände aufweisen:

- Status – Wenn auf _„true“_ gesetzt, sendet der Treiber _bei_ Aktivierung einen Befehl an das Relais, andernfalls _bei Deaktivierung_ .
- currentColor – Farbe für RGB-Band festlegen. Farbe als _#RRGGBB-_ Muster festgelegt.