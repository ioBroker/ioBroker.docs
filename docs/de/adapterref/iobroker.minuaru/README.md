---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.minuaru/README.md
title: ioBroker.minuaru
hash: FcP6n5IGihVpfpDGmfcy4xmu9IwO+tIKJtQniwuseCQ=
---
![Logo](../../../en/adapterref/iobroker.minuaru/admin/minuaru.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.minuaru.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.minuaru.svg)
![NPM](https://nodei.co/npm/iobroker.minuaru.png?downloads=true)

# IoBroker.minuaru
[!Anzahl der Installationen](https://iobroker.live/badges/minuaru-installed.svg) [!Aktuelle Version im stabilen Repository](https://iobroker.live/badges/minuaru-stable.svg)

## Minuaru-Adapter für ioBroker
Alarmsystem für ioBroker und minuvis

## Anweisungen
- Adapter wie gewohnt installieren
- Instanz von Minuaru erstellen
- Konfigurieren der Adaptereinstellungen

- Wählen Sie die Telegramminstanz aus und legen Sie den Benutzernamen fest, wenn Sie Alarme an Telegramm senden möchten

![minuaruTelegramSettings](https://user-images.githubusercontent.com/20790635/151257135-3b8e335f-9510-4531-9452-a982426011ab.png)

- Passen Sie ggf. den Nachrichtentext des Telegramms an

![minuaruTelegramMessageSettings](https://user-images.githubusercontent.com/20790635/151257507-b882a3ec-88b3-4c91-bc24-c774db30908f.png)

- Übersetzen Sie bei Bedarf den Spaltentitel der Alarmtabelle

![minuaruAlarmtableSettingsheader](https://user-images.githubusercontent.com/20790635/151255365-4613045d-c868-4e5e-b428-9077b7ae6f99.png)

- Ändern Sie bei Bedarf die Farben der Nachrichtenzeilen und der Textfarbe

![minuaruAlarmtableSettingsColor](https://user-images.githubusercontent.com/20790635/151256690-ee9bead9-9277-4438-998b-c04d8c566124.png)

- Minuaru auf gewünschte Objekte aktivieren

![aktiviere Minuaru](https://user-images.githubusercontent.com/20790635/151258456-58e99565-8af5-4200-a1f0-c6c75f4351d2.png)

- Minuaru aktivieren und die Einstellung eines Objekts festlegen

![setSettingsObjects](https://user-images.githubusercontent.com/20790635/151258700-4d3ca8ca-5df0-4c3d-9638-968b97d788eb.png)

> für **ioBroker.minuvis**-Benutzer (Sie benötigen Version >= 2.3.0):

- Aktiviere die Alarmseite und die minuaru.0-Instanz im Builder

![Alarmseite aktivieren](https://user-images.githubusercontent.com/20790635/151258040-6bb074e3-bd35-45b5-9888-5e826a7d3edc.png)

- Die Nummer im Minuvis-Header verweist auf die Alarmseite

![useNewAlarmPage](https://user-images.githubusercontent.com/20790635/151259455-c8d5a676-027a-4651-813b-211ca2083fd9.png)

- Bestätigen Sie die Alarme, um die Anzahl der anstehenden Alarme zu reduzieren

![AcknowledgeAlarms](https://user-images.githubusercontent.com/20790635/151259642-4daec6cf-35fa-4e68-9d92-0000c2d41c25.png)

- Verwenden Sie die HTML- oder JSON-Objekte zur Integration in andere Visualisierungen

![andereObjekte](https://user-images.githubusercontent.com/20790635/151259992-61758c9c-e102-4f38-ae0e-931721d04a17.png)

## Changelog
### 1.1.0 (2023-03-19)
* (svallant) respect ack-flag at control-states

### 1.0.1 (2022-11-25)
* (svallant) fix translation

### 1.0.0 (2022-11-24)
* (svallant) several bugfixes

### 0.9.0 (2022-01-29)
* (svallant) beta release

### 0.0.1 (2022-01-16)
* (svallant) initial release

## License
MIT License

Copyright (c) 2023 svallant <svallant@gmx.eu>

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