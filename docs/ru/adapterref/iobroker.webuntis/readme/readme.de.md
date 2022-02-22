---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webuntis/readme/readme.de.md
title: ioBroker.webuntis
hash: 2zyXQ+eth4PsBxl3M8+AAEMZhT4Nfg3Erk9UW8e503M=
---
![Логотип](https://github.com/Newan/ioBroker.webuntis/admin/webuntis.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.webuntis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webuntis.svg)
![Количество установок](https://iobroker.live/badges/webuntis-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/webuntis-stable.svg)
![Статус зависимости](https://img.shields.io/david/Newan/iobroker.webuntis.svg)
![НПМ](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)

# IoBroker.webuntis
**Тесты:** ![Тестируйте и выпускайте](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

## Адаптер webuntis для ioBroker
Адаптер Dieser не содержит данных в Webuntis. Für eine deutsche Anleitung

Этот адаптер получает данные от WebUntis. Для учебника по английскому языку ![кликните сюда](https://github.com/Newan/ioBroker.webuntis/readme.md)

## Конфигурация
Nach der Installation des Adapters in Iobroker und dem erstellen einer Instanz, erscheint Automaticisch das Konfigurationsfenster.

Zur Vorbereitung, geht man in einem Webbrowser auf die Seite ![webuntis.com](https://webuntis.com) Imsuchfeld auf der Seite gibt man den gewünschten Schulnamen ein.
Daraufhin öffnet sich eine Webseite. In der Adresszeile des Browsers stehen nun die gewünschten Daten.

![вебунтис_старт](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_start.png)

Wir benötigen folgende Strings aus der Adresszeile

- базовый URL
- школьная тайна

Im Beispiel-Screenshot sind folgende Daten als Beispiel: https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login

- hepta.webuntis.com => школьная база-URL
- hbs-F%C3%BCrth => школьная тайна

**Sollte im school-Sercet ein __+__ vorhanden sein. Muss dieses im folgenden Schritt durch ein Leerzeichen ersetzt werden**

Nun wechselt man in Iobroker-Konfigurationsfenster des Adapters

![webuntis_config](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_config.png)

- Unter Username (Kind oder Elternteil) gibt man den Benutzernamen ein.
- Unter Passwort, das Passwort des Users
- Unter school-secret gibt man den Teil der Webdresse ein, der zwischen "/?school" и "#/" steht
- Unter schoolbase-URL gibt man den Teil der Webdresse ein, der zwischen "https://" und "/webuntes/" steht

Speichern und nun erhält man alle Daten die der Adapter abrufen kann.

Wer Anregungen zur Verbesserung des Adapters hat, kann gerne einen hier oder im Iobroker-Forum uns weiterleiten: https://forum.iobroker.net/topic/51690/tester-neuer-adapter-webuntis