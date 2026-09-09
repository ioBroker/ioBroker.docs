---
chapters: {"pages":{"en/adapterref/iobroker.webuntis/README.md":{"title":{"en":"ioBroker.webuntis"},"content":"en/adapterref/iobroker.webuntis/README.md"},"en/adapterref/iobroker.webuntis/readme/readme.de.md":{"title":{"en":"ioBroker.webuntis"},"content":"en/adapterref/iobroker.webuntis/readme/readme.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webuntis/readme/readme.de.md
title: ioBroker.webuntis
hash: 6q81uIYgZU2m31Xlxv6CPx3ltJ7uJDcqfwd7gY8qdK8=
---
![Логотип](https://github.com/Newan/ioBroker.webuntis/admin/webuntis.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.webuntis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webuntis.svg)
![Количество установок](https://iobroker.live/badges/webuntis-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/webuntis-stable.svg)
![Статус зависимости](https://img.shields.io/david/Newan/iobroker.webuntis.svg)
![НПМ](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)
![Тестирование и выпуск](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

# ioBroker.webuntis

## Адаптер Webuntis для ioBroker

Dieser Adaptor bezieht Daten aus Webuntis. Für eine deutsche Anleitung

Этот адаптер получает данные из WebUntis. Инструкция на английском языке доступна по ссылке.![кликните сюда](https://github.com/Newan/ioBroker.webuntis/readme.md)

## Конфигурация

При установке адаптеров в Iobroker и их мгновенном запуске происходит автоматическая настройка конфигурации.

Zur Vorbereitung, geht man in einem Webbrowser auf die Seite![webuntis.com](https://webuntis.com) Я Сухфельд на сайте gibt man den gewünschten Schulnamen ein. Daraufhin öffnet sich eine Webseite. В адресе браузера stehen nun die gewünschten Daten.

![webuntis\_start](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_start.png)

Доступны следующие струнные по адресу Adresszeile

- базовый URL
- школьная тайна

Im Beispiel — Снимок экрана, когда он умирает, как Beispiel: <https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login>

- hepta.webuntis.com => базовый URL школы
- hbs-F%C3%BCrth => школьный секрет

**Sollte im school-Sercet ein **+** vorhanden sein. Muss dieses im folgenden Schritt durch ein Leerzeichen ersetzt werden**

Монахиня wechselt man в Iobroker-Konfigurationsfenster des Adapters

![webuntis\_config](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_config.png)

- Имя пользователя (Вид или Elternteil) gibt man den Benutzernamen ein.
- Пароль, пароль пользователя
- В школьной тайне человек, ден Teil der Webadresse ein, der zwischen "/?school" und "#/" steht
- Чтобы получить URL-адрес школьной базы, введите адрес веб-сайта, нажмите "https\://" и "/webuntes/"

Speichern und nun erhält man alle Daten die der Adaptor abbrufen kann.

Если вы хотите узнать больше об адаптерах, вы можете сделать это или на форуме Iobroker-Forum и на сайте: <https://forum.iobroker.net/topic/51690/tester-neuer-adapter-webuntis>