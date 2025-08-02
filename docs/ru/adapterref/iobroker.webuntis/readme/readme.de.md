---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webuntis/readme/readme.de.md
title: ioBroker.webuntis
hash: 2zyXQ+eth4PsBxl3M8+AAEMZhT4Nfg3Erk9UW8e503M=
---
![Логотип](https://github.com/Newan/ioBroker.webuntis/admin/webuntis.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.webuntis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webuntis.svg)
![Количество установок](https://iobroker.live/badges/webuntis-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/webuntis-stable.svg)
![Статус зависимости](https://img.shields.io/david/Newan/iobroker.webuntis.svg)
![НПМ](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)

# IoBroker.webuntis
**Тесты:** ![Тест и выпуск](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

## Адаптер webuntis для ioBroker
Dieser Adaptor bezieht Daten aus Webuntis. Für eine deutsche Anleitung

Этот адаптер получает данные из WebUntis. Для английского-tutorial ![кликните сюда](https://github.com/Newan/ioBroker.webuntis/readme.md)

## Конфигурация
При установке адаптеров в Iobroker и их мгновенном запуске происходит автоматическая настройка конфигурации.

Zur Vorbereitung, geht man in einem Webbrowser auf die Seite ![webuntis.com](https://webuntis.com) Imuchfeld auf der Seite gibt man den gewünschten Schulnamen ein.
Daraufhin öffnet sich eine Webseite. В адресе браузера stehen nun die gewünschten Daten.

![webuntis_start](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_start.png)

Доступны следующие струнные из адреса Adresszeile

- базовый URL-адрес
- школьный секрет

Im Beispiel-Screenshot sind dies folgende Daten als Beispiel: https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login

- hepta.webuntis.com => URL-адрес школьной базы
- hbs-F%C3%BCrth => школьный секрет

**Sollte im school-Sercet ein __+__ vorhanden sein. Muss dieses im folgenden Schritt durch ein Leerzeichen ersetzt werden**

Монахиня wechselt man в Iobroker-Konfigurationsfenster des Adapters

![webuntis_config](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_config.png)

- Имя пользователя (Вид или Elternteil) gibt man den Benutzernamen ein.
- Пароль, пароль пользователя
- Школьный секретный человек, ден Teil der Webadresse ein, der zwischen "/?school" und "#/" steht
- URL-адрес schoolbase-URL может быть предоставлен пользователю с помощью Teil der Webadresse ein, der zwischen "https://" und "/webuntes/" steht

Speichern und nun erhält man alle Daten die der Adaptor abbrufen kann.

Если вы хотите получить доступ к адаптерам, вы можете перейти на форум Iobroker-Forum и получить дополнительную информацию: https://forum.iobroker.net/topic/51690/tester-neuer-adapter-webuntis