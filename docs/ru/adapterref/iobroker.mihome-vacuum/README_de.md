---
chapters: {"pages":{"en/adapterref/iobroker.mihome-vacuum/README.md":{"title":{"en":"ioBroker mihome-vacuum adapter"},"content":"en/adapterref/iobroker.mihome-vacuum/README.md"},"en/adapterref/iobroker.mihome-vacuum/README_de.md":{"title":{"en":"ioBroker mihome-vacuum Adapter"},"content":"en/adapterref/iobroker.mihome-vacuum/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-vacuum/README_de.md
title: ioBroker mihome-vacuum Adapter
hash: MiiR2/98JnklM2zog3nArw9wBqun3eknZLQLPJgAsqY=
---
![Логотип](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mihome-vacuum-installed.svg)
![Установка стабилизации](https://iobroker.live/badges/mihome-vacuum-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.mihome-vacuum/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/mihome-vacuum/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)

# ioBroker mihome-vacuum Adapter

[Документация на английском языке](/#/adapters/mihome-vacuum)

Адаптер mihome-vacuum предназначен для ioBroker и совместим с устройствами Xiaomi-Ökosystem. Вы можете использовать локальную настройку IP-адреса и токена, дополнительные настройки и карты для Xiaomi Cloud, Raumreinigung, Timer, Reinigungsverlauf, Verbrauchsmaterialien sowie eigene Widgets для VIS 1 и VIS 2.

Zu den unterstützten Gerätefamilien gehören Roborock/rockrobo, Viomi und Dreame. Welche Befehle, Karten-, Raum-, Wisch-, Stations- und Wartungsfunktionen verfügbar sind, hängt vom Modell und Dessen Firmware ab.

## Установка

Установите и актуализируйте адаптер для администратора ioBroker с соответствующей версией npm. Непосредственная установка на GitHub не будет выполняться и будет отключена администратором. Das Quellrepository позволяет создавать Laufzeit-, Admin-UI- или VIS-2-Bundles; veröffentlichte Pakete enthalten diese Dateien bereits.

## Unterstützte Geräte und Funktionen

Die folgenden Modelle sind ausdrücklich als unterstützt documentiert. Weitere Modelle derselben Gerätefamilien können mit dem passenden Manager funktionieren, gelten bis zu einem erfolgreichen Test jedoch nicht als garantiert unterstützt. Верифицированные функции могут быть отключены при установке встроенного ПО.

| Герат                  | Grundsteuerung | Reinigungsverlauf | Raumreinigung | Карта |
| :--------------------- | :------------: | :---------------: | :-----------: | :---: |
| `viomi.vacuum.v6`      |        ✅       |         —         |       —       |   —   |
| `viomi.vacuum.v7`      |        ✅       |         —         |       —       |   —   |
| `viomi.vacuum.v8`      |        ✅       |         —         |       —       |   —   |
| `viomi.vacuum.v19`     |        ✅       |         —         |       —       |   —   |
| `rockrobo.vacuum.v1`   |        ✅       |         ✅         |       —       |   ✅   |
| `roborock.vacuum.s4`   |        ✅       |         ✅         |       ✅       |   ✅   |
| `roborock.vacuum.s5`   |        ✅       |         ✅         |       ✅       |   ✅   |
| `roborock.vacuum.s5e`  |        ✅       |         ✅         |       ✅       |   ✅   |
| `roborock.vacuum.m1s`  |        ✅       |         ✅         |       ✅       |   ✅   |
| `roborock.vacuum.a10`  |        ✅       |         ✅         |       ✅       |   ✅   |
| `roborock.vacuum.a15`  |        ✅       |         ✅         |       ✅       |   ✅   |
| `dreame.vacuum.r2205`  |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.r2216o` |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.r2228o` |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2008`  |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2009`  |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2027`  |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2028`  |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2029`  |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2036`  |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2041o` |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2114a` |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2148o` |        ✅       |         ✅         |       —       |   —   |
| `dreame.vacuum.p2156o` |        ✅       |         ✅         |       —       |   —   |

`✅` bedeutet, dass die Funktion für das documentierte Modell unterstützt wird.`—` bedeutet, этот адаптер не будет использоваться для данной модели.

### Unterstützung für ein neues Modell anfragen

Адаптер содержит одну библиотеку, находящуюся в первой части Modell-ID, в которой находится один из следующих пунктов:`roborock` унд`rockrobo` verwenden die Roborock-Библиотека,`viomi` die Viomi-Bibliothek,`dreame` унд`xiaomi` die Dreame/МИОТ-Библиотека. Ein Modell einer dieser Familien, das oben nicht aufgeführt ist, funktioniert meist mit derselben Bibliothek: Grundsteuerung, Status, Akku, Verbrauchsmaterial und Reinigungsverlauf stehen zur Verfügung, wenn der Roboter die Standard-Eigenschaften nutzt; Eigenschaften, die der Roboter nicht Liefert, bleiben leer. Функционирование моделей в каталоге, где указана проблема с идентификатором модели и версией прошивки, находится в таблице, которая может быть добавлена.

Zeigt das Log`Model <id> not supported! You can try to setup manually a library in settings.` , начиная с Modell-ID с вашим Präfix, адаптер не имеет значения (zum Beispiel`ijai` Одер`xtl` ). Адаптер может быть поврежден в течение нескольких дней, а затем мгновенно отключен. Über die Option **Manager** in den Instanzeinstellungen lässt sich eine der Bibliotheken erzwingen; Используйте протокол MIOT-Protokoll, который будет работать с Библиотекой мечты. Eine eigene Bibliothek für einen neuen Hersteller braucht die MIOT-Spezifikation des Modells (`https://home.miot-spec.com/spec/<Modell-ID>` ) и jemanden, der das Gerät besitzt und testen kann.

Jede Anfrage und jeder Fehlerbericht sollte enthalten: Modell-ID и Firmware (`deviceInfo.model` ,`deviceInfo.fw_ver` ), версии адаптера, js-контроллера и Node.js, а также функции дат и ничего, что связано с журналом отладки и проблемами, для всех случаев с ними`Device model detected` ,`MIIO request` унд`Status update:` . Bei Kartenproblemen zusätzlich den Wert von`auth.status` und die Ausgabe von`npm ls canvas` с помощью ioBroker-Verzeichnis. Токен, ссылки для входа, облачные хранилища и IP-адреса для других пользователей.

## Haftungsausschlus

Alle in diesem Projekt genannten Produkt- und Firmennamen, Logos und Marken gehören ihren jeweiligen Eigentümern. Xiaomi, Mi Home, Roborock, Viomi, Dreame sowie die zugehörigen Namen, Logos und Marken sind Eigentum der Jeweiligen Rechteinhaber. Ihre Verwendung dient ausschließlich der Identifikation und bedeutet keine Verbindung, Forderung or Empfehlung durch die genannten Unternehmen. Dies ist ein in Private, nicht komerzielles Open-Source-Projekt, das zu Freizeitzwecken entwickelt wird.

## Часовой

**Этот адаптер предназначен для Sentry-Bibliotheken, а также автоматического и программного обеспечения, а также для облегчения работы.** Weitere Informationen und eine Anleitung zum Abschalten der Fehlerberichte содержит [документацию по Sentry-Plugins](https://github.com/ioBroker/plugin-sentry) . Sentry-Berichte stehen ab js-controller 3.0 для Verfügung.

## Voraussetzungen

- Node.js 22.13 или более новая версия
- js-контроллер 7.2.2 или новый
- Администратор 7.8.23 или новый
- ioBroker-Host und Roboter предлагает локальную сеть Netzwerk erreichbar sein
- Для локального использования UDP-Steuerung будет использоваться локальный пакетный токен, который будет полезен.

Xiaomi Cloud не является обязательным для обычного локального управления. Это комфортные условия хранения и использования карт Xiaomi-Cloud-Karten.

## Schnellstart

1. Адаптер устанавливается и мгновенно устанавливается.
2. Мгновенная конфигурация отключена и добавлена вкладка « **Вкладка»** .
3. Die Xiaomi-Region auswählen, в регистре Sauger.
4. Нажмите кнопку **Xiaomi-Anmeldelink** .
5. Ссылка будет открыта, а Xiaomi-Anmeldung в браузере будет лучшим.
6. Когда ioBroker зарегистрируется, вы получите статус Cloud-Status **Angemeldet** anzeigt.
7. После **этого** нажмите кнопку и нажмите кнопку «Saugroboter» в списке «Auswählen».
8. Автоматическое создание токенов, IP-адресов, моделей и менеджеров.
9. Настройка и контроль конфигурации,`info.connection` ден Верт`true` erhält.

![Verbindung und Xiaomi-Cloud-Anmeldung](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Login%20VacuumControl-redacted.png)

Die Anmeldung erfolgt über einen Xiaomi-Anmeldelink. Адаптер доступен в QR-Bild. Der Link läuft nach kurzer Zeit ab; Бэй`expired` Одер`error` muss ein neuer Link erstellt werden.

Автоматическое автоматическое восстановление локального токена, IP-адреса и модели. Токен можно будет использовать в используемой конфигурации ioBroker-Instanz и в окончательной версии Oberfläche. Das Auge sollte nur verwendet werden, wenn der Token bewusst angezeigt order kopiert werden soll.

Geräte-Token, Xiaomi-Anmeldelinks, Cookies, Cloud-Sitzungen und ungekürzte Debug-Antworten durfen niemals в Issues или Forenbeiträgen veröffentlicht werden.

## Локальные изменения в Xiaomi Cloud

Местное управление не является активным для Xiaomi-Cloud-Sitzung. Если локальный токен, IP-адрес и модель являются bekannt sind, они должны быть указаны для **Manuelle Einstellungen** eingetragen werden:

- **Токен:** шестнадцатеричный локальный токен
- **IP-адрес:** актуальный региональный адрес роботов
- **Modell:** Modellkennung wie`roborock.vacuum.s5`
- **Менеджер:** Wird Normalerweise Autotisch erkannt; Роборок, Виоми или Dreame nur bei Bedarf manuell auswählen
- **Порт-де-Роботеры:** нормальный`54321`
- **Собственный порт:** локальный UDP-порт dieser Adaptorinstanz, Normalerweise`53421`

Когда робот будет работать с маршрутизатором на празднике DHCP-соединения, его IP-адрес не будет работать.

### Token manuell ermitteln

Ручное управление локальными жетонами может быть лучшим решением для Xiaomi-Cloud-Gerätesuche der schwierigste Schritt. Die folgende externe Anleitung beschreibt eine mögliche Vorgehensweise für verschiedene Xiaomi- und Roborock-Modelle:

[Anleitung zum Auslesen des Tokens](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/)

Die Anleitung stammt von einem Drittanbieter und funktioniert möglicherweise nicht mit jedem Modell, прошивка или актуальная версия приложения Mi-Home. Токен должен быть введен с паролем, проверен и сохранен в журналах, скриншотах, проблемах и других важных событиях.

## Конфигурация

### Verbindung

Der Tab Verbindung включает в себя Xiaomi-Cloud-Anmeldung, Gerätesuche и lokalen Einstellungen для прямой связи с роботами.

- Eine erfolgreiche Cloud-Anmeldung wird als geschützte und verschlüsselte Sitzung gespeichert.
- Сначала вы можете **отключить устройство** , чтобы оно стало свободным.
- Die Auswahl eines erkannten Saugers ergänzt fehlende locale Angaben и ersetzt bei Bedarf einen veralteten Token.
- Der Anmeldelink wird nach erfolgreicher Anmeldung или nach Ablauf entfernt.
- Полученные токены будут использоваться в настройках конфигурации.

### Allgemeine Einstellungen

![Allgemeine Einstellungen](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Settings%20VacuumControl.png)

- **Статус в течение нескольких секунд:** лучший, как правило, в актуальном статусе Roboterstatus abgefragt wird. Sehr kurze Intervalle belasten Netzwerk und Roboter.
- **Статус WLAN отображается в течение нескольких секунд:** лучше всего, если сигнал будет актуален.
- **Карта активации Xiaomi Cloud:** активация Xiaomi-Cloud-Kartenabruf и полезное использование Cloud-Sitzung.
- **Активация режима:** убедитесь, что он совместим с регионом Валетудо-Картенкуелле.
- **Эйджин Бефелесенден:** erzeugt die Experten-Datenpunkte`control.X_send_command` унд`control.X_get_response` .
- **Alexa/IoT-Datenpunkte Anlegen:** erzeugt zusätzlich`control.pauseResume` для Sprachassistenten und IoT-Anbindungen.`control.clean_home` ist immer vorhanden.
- **Пауза, отправленная в Zuhause:** отправленная модель, умирает benötigen, останавливается и возвращается к Befehl zur Ladestation.
- **Pausierte Zonenreinigung mit Start fortsetzen:** setzt eine unterbrochene Zonenreinigung fort, statt eine vollständige Reinigung zu starten.
- **Erweiterte Diagnoseprotokollierung:** ergänzt ausführliche, bereinigte Debug-Ausgaben. Эта опция может быть использована для активации функции.

### Картонные настройки

![Картонные настройки](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Karteeinstellung%20VacuumControl.png)

Die Kartenunterstützung hängt vom Modell und der Gewählten Quelle ab.

- **Абруфинтервал:** лучше всего, wie häufig die Kartenquelle abgefragt wird.
- **Интервал для картографических изображений:** лучший, где можно использовать PNG-даты, которые вы хотите использовать.
- **Новая карта формата с расширенными возможностями:** активна, неактивна, сегментирована.
- **Boden-, Wand- und Pfadfarbe:** passt die erzeugte Karte an.
- **Символ робота:** символ актуального положения робота.

| Пункт данных         | Описание                                              |
| -------------------- | ----------------------------------------------------- |
| `cleanmap.map64`     | Карта Base64-/Data-URL, используемая для VIS-виджетов |
| `cleanmap.mapURL`    | Pfad zur erzeugten PNG-Datei                          |
| `cleanmap.actualMap` | Kennung der aktiven Karte                             |
| `cleanmap.mapStatus` | Актуальный статус der Kartenverarbeitung              |
| `cleanmap.loadMap`   | Фордерт eine Aktualisierung der Karte an              |

Карта Xiaomi-Cloud-Karte может быть полезной **для активации Xiaomi Cloud** в качестве дополнительной функции Cloud-Anmeldung. Локальные роботы работают лучше, если Cloud-Sitzung не работает.

### Таймер

![Настройка таймера](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Timer%20VacuumControl.png)

Адаптер-таймер может быть использован в качестве канала для лучшего запуска и запуска.

1. Zuerst die Raumkanäle загружен или anlegen.
2. Затем **таймер** Tab отключится и **снова** щелкнет.
3. Wochentag, Stunde, Minute, Räume и/или Raumkanäle auswählen.
4. Таймер активируется и включается **звуковой сигнал таймера** .

Адаптер-таймер используется в ioBroker и может быть использован также в VIS или в режиме просмотра. Вы не можете отключить таймер в приложении Xiaomi.

## Функции

### Grundlegende Steuerung

| Пункт данных         | Функция                                                |
| -------------------- | ------------------------------------------------------ |
| `control.start`      | Vollständige Reinigung starten                         |
| `control.pause`      | Aktuellen Auftrag pausieren                            |
| `control.home`       | Zur Ladestation zurückkehren                           |
| `control.find`       | Ortungston des Roboters абспилен                       |
| `control.spotclean`  | Punktreinigung starten                                 |
| `control.fan_power`  | Saugleistung lesen или einstellen                      |
| `control.zoneClean`  | Eine oder mehrere Zonen and von Koordinaten reinigen   |
| `control.goTo`       | Zu Kartenkoordinaten fahren                            |
| `control.clearQueue` | Wartende Reinigungsaufträge löschen                    |
| `control.clean_home` | `true` startet die Reinigung,`false` fährt zur Station |

Weitere Befehle für Wischen, Moppwäsche, Trocknung, Staubabsaugung, Teppichmodus und Dockfunktionen werden nur angelegt, wenn das gewählte Modell sie unterstützt.

### Räume

Der Adapter erstellt unter`rooms` Канал, когда Roboter Raum- или Segmentinformationen bereitstellt.

- Мит`rooms.loadRooms` werden die Räume erneut vom Roboter geladen.
- В вашем рабочем канале есть карточный индекс или зональные координаты и стартовые настройки.
- Raumkanäle können ioBroker-Einträgen unter`enum.rooms` zugewiesen werden.
- Для начала работы могут быть выбраны соответствующие инструкции.
- `rooms.multiRoomClean` startet mehrere zugewiesene Räume gemeinsam.
- Мит`rooms.addRoom` kann anhand eines Kartenindexes или von Zonkoordinaten manuell ein Raum angelegt werden.

Назовите и установите функциональные параметры робота и выберите модель и прошивку.

### Reinigungsverlauf

Канал`history` enthält Gesamtreinigungszeit, Gesamtfläche, Anzahl der Reinigungen sowie die Letzten Reinigungsdatatensätze в формате JSON и HTML. Der Verlauf будет открыт для использования виджетов.

### Verbrauchsmaterialien und Wartung

Unterstützte Wartungswerte werden unter`consumable` angelegt, zum Beispiel Filter, Hauptbürste, Seitenbürste, Sensoren, Wasserfilter, Wischpad, Sieb, Reinigungsbürste und Staubabsaugungszähler.

Eine Lebensdauer darf erst nach Reinigung или Austausch des betreffenden Teils zurückgesetzt werden. Не используйте дополнительные материалы при использовании виджетов.

### Erweiterte eigene Befehle

Wenn **Eigene Befehle senden** aktiviert ist, können Befehle in`control.X_send_command` гешрибен верден. Антвортен ершайнен в`control.X_get_response` . Diese Funktion richtet sich erfahrene Benutzer. Ungültige oder nicht zum Modell passende Befehle können zu unerwartetem Roboterverhalten führen.

## Важные точки данных

| Канал               | Цвек                                                                    |
| ------------------- | ----------------------------------------------------------------------- |
| `info.connection`   | Status der lokalen Verbindung                                           |
| `info.state`        | Numerischer Roboterstatus mit lesbaren Statusbezeichnungen              |
| `info.error`        | Numerischer Fehlercode mit lesbaren Fehlerbezeichnungen                 |
| `info.battery`      | Akkustand in Prozent                                                    |
| `info.cleanedarea`  | Fläche der aktuellen или Letzten Reinigung                              |
| `info.cleanedtime`  | Reinigungsdauer                                                         |
| `info.wifi_signal`  | WLAN-сигнализация роботов                                               |
| `deviceInfo.model`  | Модель Эркантеса                                                        |
| `deviceInfo.fw_ver` | версия прошивки                                                         |
| `auth.status`       | Статус Xiaomi-Cloud-Anmeldung                                           |
| `auth.loginUrl`     | Временный сотрудник Anmeldelink; wird nach Abschluss или Ablauf geleert |
| `auth.lastError`    | Letzte bereinigte Fehlermeldung der Anmeldung                           |
| `auth.expiresAt`    | Ablaufzeitpunkt des Anmeldelinks                                        |

`info.state` унд`info.error` Enthalten im ioBroker-Objects lesbare Wertelisten. Unbekannte Codes bleiben sichtbar, damit der ursprüngliche Wert bei einer Fehlermeldung nicht verloren geht.

## Виджеты VIS-1 и VIS-2

Beide mitgelieferten Widgets bieten ein Responses Dashboard с картами, Verbindungs- und Roboterstatus, Akku, Fläche, Dauer, Fehlerinformationen, Auswahl der Saugleistung, Schnellsteuerung, bis zu sechs Räumen, Wartungsaktionen und einer eigenen Verlaufsansicht.

### ВИС 1

Im Widget-Set **mihome-vacuum** das Widget **Vacuum приборная панель с картой, обслуживанием и историей** использования. Zuerst den **Status-Datenpunkt** (`info.state` ) Мгновенный выбор: Виджет содержит все дополнительные сведения об атрибутах дат, а также Viomi- и Dreame-Varianten von Wasserstufe, Wischmodus и Stationsstatus.

Дизельный виджет VIS-1 используется вместе с виджетом VIS-2: режимы, режимы и режимы работы, базовая станция с их активными действиями, карта с новыми картами, статус отсутствия данных с их первым таймером и собственными настройками Anzahl и Verlaufseintragen. Jeder Bereich erscheint nur, wenn sein Datenpunkt zugewiesen ist; Datenpunkte für Funktionen, die der Roboter nicht Hat, bleiben daher leer. Таймер активируется в режиме VIS 2, VIS 1 до момента начала работы.

![VIS-1-Saugroboter-Widget](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Vis%201%20VacuumControlWidget.png)

### ВИС 2

Im Widget-Set **Mi Home Vacuum** das Widget **Staubsaugersteuerung mit Karte** auswählen. Die Einstellungen sind в Allgemein, Zustände und Steuerung, Wartung, Räume und Verlauf gegliedert.

- **Instantzauswahl:** den **Status-Datenpunkt** (`info.state` ) der gewünschten Adaptorinstanz Wählen. Все данные Datenpunkt-Attribute werden daraus autotisch gefüllt, der Wechsel von`mihome-vacuum.0` auf eine andere Instanz ist damit ein Klick.
- **Дизайн:** этот виджет соответствует темам Hellen или Dunklen Theme und der Primärfarbe des VIS-2-Projekts. Необязательный **вариант использования** может быть превышен.
- **Saugstufen:** die wählbaren Stufen stammen aus dem Datenpunkt`control.fan_power` des Roboters, jedes Modell zeigt также seine eigenen Stufen. Die Drei Zahlenwerte dienen nur als Ersatz, wenn der Datenpunkt keine Stufenliste Hat.
- **Статус и текст сообщения:** укажите дату-определение адаптеров и проверьте, что это необходимо.
- **Verlauf:** die Anzahl der angezeigten Reinigungen ist einstellbar.
- **Reinigungseinstellungen:** Wasserstufe, Wischmodus и Teppichmodus erscheinen als Bedienelemente, wenn der Roboter die passenden Datenpunkte Lifert. Die Instantzauswahl findet auch die Viomi- und Dreame-Varianten dieser Datenpunkte.
- **Базовая станция:** zeigt den Stationsstatus und bietet bei Robotern mit passender Station das Leeren des Staubbehälters sowie das Waschen und Trocknen des Mopps an.
- **Карта:** Roboter mit mehreren Karten erhalten eine Kartenauswahl auf dem Kartenbild, **Karte neu laden** holt die aktuelle Karte vom Roboter.
- **Zeitplan:** Zeigt Den Stören-Status, Den Nächsten Timer и все в ангельской конфигурации адаптера Timer. Когда таймер длится, пока виджет не активируется, его можно активировать или начать мягко. Der Bereich может использовать **Zeitplan anzeigen** ausgeblendet werden.

Jedes Bedienelement erscheint nur, wenn der Adaptor den passenden Datenpunkt für den Roboter angelegt Hat; этот виджет пропущен, поэтому он является функциональным модулем моделей. С помощью альтернативной версии адаптера виджеты могут быть заменены новыми датами в автоматическом режиме; Атрибут в ден Widget-Einstellungen müssen nur geändert werden, когда ein Datenpunkt бродит по hinzeigen soll.

![VIS-2-Saugroboter-Widget](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Vis%202%20VacuumControlWidget.png)

### Ройме, Saugleistung und Darstellung

**Автоматическое подключение** (стандартное) для виджета VIS-2 со всеми параметрами, с помощью адаптера`rooms.*` ангельская шляпа, включая eigener Saugstufe, wenn der Roboter das unterstützt. Ohne die Option может быть выбран вручную с помощью Anzeigename, Start-Datenpunkt и Saugleistungs-Datenpunkt configurieren. Виджет VIS-1 можно вручную настроить.

Виджеты используются для свободного доступа к карте и перехода к их собственному времени, а не к браузеру. Это виджет, который можно использовать, когда вы прокрутите прокрутку, получите карту, настройку или дополнительную карту. Das Zurücksetzen eines Verbrauchsmaterial-Zahlers fragt vorher nach einer Bestätigung.

### Verlauf im Widget

Der Tab Verlauf zeigt die gesamte Anzahl der Reinigungen, Gesamtfläche, Gesamtzeit sowie die letzten Reinigungsergebnisse.

![Reinigungsverlauf в ВИС 1 и ВИС 2](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/History%20vis%201%20und%202%20VacuumControlWidget.png)

## Fehlerbehebung

### Der Roboter verbindet sich nicht

- `info.connection` , IP-адрес, токен и другие модели.
- Sicherstellen, dass Roboter и ioBroker-Host в локальной сети Netzwerk Miteinander Kommunizieren Können. Einige Modelle benötigen dasselbe Subnetz.
- Роботизированный DHCP-сервер должен быть зарезервирован для IP-адреса.
- Den Roboter-Port bei`54321` belassen, sofern das Gerät nicht ausdrücklich einen anderen Port verwendet.
- Проверьте, есть ли другой плотный адаптер UDP-порта.

### Cloud-Anmeldung или Gerätesuche schlägt fehl

- Dieselbe Xiaomi-Region auswählen, в реестре роботов.
- Bei einem abgelaufenen Link einen neuen Anmeldelink erstellen.
- Если вы хотите отключить **браузер** , вы можете отключить его.
- Eine Xiaomi-Antwort mit`401` Одер`403` macht die gespeicherte Sitzung ungültig und erfordert eine neue ausdrückliche Anmeldung.

### Es wird keine Karte angezeigt

- Prüfen, ob das verbundene Modell den Kartenabruf unterstützt.
- Включите облачную карту Xiaomi или активируйте функцию Valetudo.
- Bei Xiaomi-Karten muss`auth.status` ден Верт`authenticated` хабен.
- `cleanmap.mapStatus` ,`cleanmap.map64` и готовый протокол отладки адаптеров.

### Установка штампа scheitert beim Bau von Canvas

Der Kartenrenderer добавляет дополнительный собственный пакет`canvas` . Если в Linux используется один из следующих пакетов, вам необходимо выполнить следующие действия при установке следующих системных пакетов:

```sh
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Keine alte`canvas` -Версия 2.x будет установлена вручную при установке адаптера.

### Мехрере Роботер

Для вашего робота будет полезен собственный адаптер. Jede Instanz muss einen anderen **Eigenen Port** verwenden, zum Beispiel`53421` ,`53422` и так далее.

## Unterstützung und Fehlermeldungen

Вы можете объединить только версию адаптера, версию Node.js, версию js-контроллера, модель, соответствующие журналы и дополнительные действия. Токен, Anmeldellinks, Cookies, Cloud-Sitzungen, IP-адрес и другие частные данные, которые можно использовать для дем Veröffentlichen entfernt werden.

Для воспроизведения файлов и функций, доступных в [GitHub Issue Tracker](https://github.com/iobroker-community-adapters/ioBroker.mihome-vacuum/issues) для проверки.

## Лицензия

Лицензия MIT

Авторские права (c) 2023-2026 iobroker-community-adapters

Авторские права (c) 2017-2023 bluefox

Der vollständige Lizenztext указан в [ЛИЦЕНЗИИ](https://github.com/iobroker-community-adapters/ioBroker.mihome-vacuum/blob/master/LICENSE) .