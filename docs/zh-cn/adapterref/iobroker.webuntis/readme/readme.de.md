---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.webuntis/readme/readme.de.md
title: ioBroker.webuntis
hash: XiWtY5XHyNiwwFhZGe/ZX9Kq/fFkMBryICwUc6RnITM=
---
![标识](https://github.com/Newan/ioBroker.webuntis/admin/webuntis.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.webuntis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.webuntis.svg)
![安装数量](https://iobroker.live/badges/webuntis-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/webuntis-stable.svg)
![依赖状态](https://img.shields.io/david/Newan/iobroker.webuntis.svg)
![新PM](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)

# IoBroker.webuntis
**测试：** ![测试和发布](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 webuntis 适配器
Dieser Adapter bezieht Daten aus Webuntis。 Für eine deutsche Anleitung

该适配器从 WebUntis 获取数据。对于英语教程![点击这里](https://github.com/Newan/ioBroker.webuntis/readme.md)

##配置
Nach der Installation des Adapters in Iobroker und dem erstellen einer Instanz, erscheint automatisch das Konfigurationsfenster。

Zur Vorbereitung, geht man in einem Webbrowser auf die Seite ![webuntis.com](https://webuntis.com) Im Suchfeld auf der Seite gibt man den gewünschten Schulnamen ein。
Daraufhin öffnet sich eine 网站。在 der Adresszeile des Browsers stehen nun die gewünschten Daten。

![webuntis_start](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_start.png)

Wir benötigen folgende Strings aus der Adresszeile

- 基本网址
- 学校的秘密

Im Beispiel-Screenshot sind dies folgende Daten als Beispiel: https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login

- hepta.webuntis.com => schoolbase-URL
- hbs-F%C3%BCrth => 学校机密

**Sollte im school-Sercet ein __+__ vorhanden sein。 Muss dieses im folgenden Schritt durch ein Leerzeichen ersetzt werden**

Iobroker-Konfigurationsfenster des Adapters 中的修女 wechselt man

![webuntis_config](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_config.png)

- Unter Username (Kind oder Elternteil) gibt man den Benutzernamen ein。
- Unter Passwort, das Passwort des Users
- Unter school-secret gibt man den Teil der Webadresse ein, der zwischen "/?school" und "#/" steht
- Unter schoolbase-URL gibt man den Teil der Webadresse ein, der zwischen "https://" und "/webuntes/" steht

Speichern und nun erhält man alle Daten die der Adapter abrufen kann。

Wer Anregungen zur Verbesserung des Adapters hat, kann gerne einen hier oder im Iobroker-Forum an uns weiterleiten: https://forum.iobroker.net/topic/51690/tester-neuer-adapter-webuntis