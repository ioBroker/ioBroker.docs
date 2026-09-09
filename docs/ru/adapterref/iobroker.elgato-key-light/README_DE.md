---
chapters: {"pages":{"en/adapterref/iobroker.elgato-key-light/README.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README.md"},"en/adapterref/iobroker.elgato-key-light/README_DE.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README_DE.md"},"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md":{"title":{"en":"Elgato local API evidence"},"content":"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md"},"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md":{"title":{"en":"Migration guide"},"content":"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.elgato-key-light/README_DE.md
title: ioBroker.elgato-key-light
hash: xXwB5c0A48ZjwEU55F5HmC96cpGXDk2a+TLIaAWU4Bk=
---
![Логотип](../../../en/adapterref/iobroker.elgato-key-light/admin/elgato-key-light.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.elgato-key-light.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.elgato-key-light.svg)
![Монтажены](https://iobroker.live/badges/elgato-key-light-installed.svg)
![Стабильный](https://iobroker.live/badges/elgato-key-light-stable.svg)

# ioBroker.elgato-key-light

[Английский](/#/adapters/elgato-key-light) | Немецкий

## Haftungsausschlus

Alle in diesem Projekt genannten Produkt- und Firmennamen, Logos und Marken sind Eigentum ihrer Jeweiligen Rechteinhaber. Ihre Verwendung dient ausschließlich der eindeutigen Bezeichnung und bedeutet weder eine Verbindung mit noch ein Sponsoring ore eine Empfehlung durch die Rechteinhaber или verbundene Unternehmen. Dieses Private, nicht komerzielle Projekt wird ausschließlich als Freizeitprojekt entwickelt. Elgato ist eine Marke der Corsair GmbH.

## Fehlerberichte mit Sentry

Адаптер позволяет использовать ioBroker для интеграции Sentry-Integration, а также автоматически устанавливать и программировать его, а затем легко использовать. Die Fehlerübermittlung seht über den js-controller seit Version 3.0 для проверки и использования, а затем становится ненужным для работы и работы.

Einzelheiten zu den übermittelten Informationen und eine Anleitung zum Deaktivieren der Fehlerberichte enthält die [offizielle ioBroker-Sentry-Documentation](https://github.com/ioBroker/ioBroker.js-controller#error-reporting-via-iobroker-sentry) .

С этим адаптером вы можете подключиться к Elgato-WLAN-Leuchten local über ioBroker steuern – ohne Elgato-Cloud-Konto. Адаптер находит Leuchten über Bonjour/mDNS или связывает его с указанным вручную частным IP-адресом без указания локального имени хоста. Вы всегда можете предоставить информацию о статусе и статусе ioBroker-Datenpunkte и использовать удобную панель управления в Admin-Oberfläche.

## Что такое адаптер?

Привязка адаптера Elgato-Leuchten в ioBroker ein. Вы можете использовать такие объекты, скрипты, изображения, визуальные эффекты и другие адаптеры ioBroker-Adapter. Типичный Anwendungen sind:

- Studioleuchten zusammen mit einem Streaming- или Aufnahme-Setup Schalten;
- Температура окружающей среды и температура окружающей среды;
- einen Elgato Light Strip über RGB-/HSV-Farben steuern;
- Erreichbarkeit und Zeitpunkt der nächsten Abfrage überwachen;
- Akku- und Ladestatus eines Key Light Mini anzeigen;
- Leuchten manuell über das eigene Elgato-Lights-Dashboard beienen.

Коммуникация доступна в локальной сети Netzwerk. Фрагмент адаптера, который необходимо сконфигурировать, необходимо изменить, чтобы он был актуален и отправлен в нужное положение. Bei fehlgeschlagenen Anfragen sorgt eine begrenzte Wiederholungs- und Backoff-Logik dafür, dass ein nicht erreichbares Gerät das Netzwerk nicht unnötig belastet.

## Unterstützte Geräte und Funktionen

Die Bedienelemente werden aus der tatsächlichen API-Antwort erzeugt und nicht anhand eines fest codierten Produktnamens. Если у вас есть совместимая версия встроенного ПО и дополнительные сведения о всех функциях, они должны быть изменены.

| Функция                       | Ключевой свет / Воздух / Кольцо | Мини-подсветка для ключа | Световая лента |
| ----------------------------- | ------------------------------- | ------------------------ | -------------- |
| Ein/Aus und Helligkeit        | Джа                             | Джа                      | Джа            |
| Фарбтемпература               | Джа                             | Джа                      | Wenn gemeldet  |
| Фарбтон, Сеттигунг, RGB и Hex | Wenn gemeldet                   | Wenn gemeldet            | Джа            |
| Akku- und Ladeinformationen   | Нет                             | Джа                      | Нет            |
| Studio-Modus / Akku-Bypass    | Нет                             | Wenn gemeldet            | Нет            |
| Идентифицировать              | Джа                             | Джа                      | Джа            |

Эффекты/эффекты световой полосы и начального запуска не имеют ничего особенного, но их действие не зависит от всех неизвестных версий аппаратного обеспечения и прошивки.

## Voraussetzungen

- Node.js 22.18 или более новая версия
- js-контроллер 7.2.2 или новый
- Администратор 7.8.23 или новый
- Netzwerkzugriff vom ioBroker-Host в Лейхтене, обычный TCP-порт 9123
- Bonjour/mDNS через UDP-порт 5353 для автоматической настройки

Elgato-Leuchte und ioBroker-Host указан в обычном режиме в локальной сети Netzwerk. Для вашего использования VLAN-Grenzen может быть использован mDNS-Reflektor. Если многоадресная рассылка не работает, ее можно настроить вручную.

## Installation und Einrichtung

1. Установите адаптер и мгновенно установите его.
2. Конфигурация мгновенного действия отключена.
3. **Сеть сканирования** Мит`_elg._tcp.local.` -Diensten suchen und die gewünschten Treffer hinzufügen. Альтернативный частный IP-адрес или собственный`.local` -Hostnamen Samt Port Manuell eintragen. Стандартный порт Elgato-API ist`9123` .
4. Eine manuelle Adresse vor dem Hinzufügen mit **Test** prüfen.
5. Конфигурация активируется и включается настройка конфигурации.
6. В разделе «Admin-Seitenleiste» вкладка **«Elgato Key Light»** для Live-Steuerung öffnen.

Netzwerksuchen zeigen nur verfügbare Geräte an. Если устройство не подключено к устройству, необходимо использовать адаптер для установки адаптера.

### Laufzeitoptionen

| Вариант                        | Стандарт | Цвек                                                                |
| ------------------------------ | -------: | ------------------------------------------------------------------- |
| Опрос                          |     60 с | Normales Intervall zum Einlesen aktueller Gerätedaten               |
| Истекло время ожидания запроса |  3000 мс | Maximale Dauer einer einzelnen Geräteanfrage                        |
| Максимальная отдача            |    300 с | Obergrenze for verzögerte Wiederholungen nach Fehlern               |
| Запись задержки                |   200 мс | Быстрый доступ к Slider-Änderungen zu weniger API-Anfragen zusammen |
| Тайм-аут обнаружения           |  5000 мс | Dauer eines Bonjour-/mDNS-Suchlaufs                                 |

В зависимости от интервала опроса актуальные данные будут проверены, будут проверены Netzwerk и Gerät aber Stärker. Schalter und Slider на Dashboard были оптимистичными в актуальном состоянии: Ваш выбор действий — это удобная панель, где вы можете найти лучшее сообщение.

## Bedienung über das Dashboard

Вкладка «Адаптер» предназначена для использования в момент установки собственной карты. Es werden nur Bedienelemente angezeigt, die das Jeweilige Gerät unterstützt:

- **Power** schaltet die Leuchte ein oder aus.
- **Яркость** может варьироваться от 0 до 100 процентов.
- **Температура** регулируется в диапазоне от 2900 К до 7000 К.
- **Цветовая** палитра в формате RGB используется в браузерах.
- В **режиме «Студия»** можно включить мини-подсветку клавиши в режиме обхода акку, когда прошивка будет выполнена вместе.
- Определите последнюю функцию **идентификации** .
- **Повторно подключите** устройство так, чтобы оно снова отключилось.

Карточка должна быть указана в режиме онлайн/оффлайн, ответах, версии встроенного ПО, полученной информации и живом таймере для вашего текущего счета. **Все включено** и **все выключено.** **Обновите** данные Dashboard-Daten neu; **Диагностика** zeigt Laufzeit- und Gerätedaten für die Fehlersuche.

Beim Ändern der Farbe eines Light Strip bleibt die separat eingestellte Helligkeit erhalten. Датенпункте`hex` унд`rgb` bilden jedoch die aktuell ausgegebene Farbe einschließlich Helligkeit ab. Derselbe blaue Farbton может быть снят с 50-ти процентными ставками и другими`#000080` und bei 100 Prozent als`#0000FF` angezeigt werden.

## Steuerung über ioBroker-Datenpunkte

Обратите внимание на то, что вы должны указать свой статус на базисном серийном номере:

```text
elgato-key-light.<Instanz>.<Seriennummer>
```

Die meisten Geräte enthalten eine Leuchte unter`light.lights.0` . Es werden nur Datenpunkte angelegt, die das Gerät unterstützt.

| Relativer Datenpunkt         | Тип / Берейх                               | Bedeutung                                                         |
| ---------------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| `reachable`                  | логическое значение, nur lesbar            | Gerät ist aktuell erreichbar                                      |
| `identify`                   | логическое значение-Taster, nur schreibbar | Geräteidentifizierung durch Schreiben von`true` auslösen          |
| `info.displayName`           | нить                                       | Anzeigenamen lesen oder ändern                                    |
| `light.numberOfLights`       | номер, ну лесбар                           | Использование API-интерфейса Anzahl der Leuchtelemente            |
| `light.lights.0.on`          | логический                                 | Ein- ord ausschalten                                              |
| `light.lights.0.brightness`  | число, 0–100 %                             | Helligkeit einstellen                                             |
| `light.lights.0.temperature` | число, 2900–7000 К                         | Weiße Farbtemperatur einstellen                                   |
| `light.lights.0.hue`         | число, 0–360°                              | Farbton einstellen                                                |
| `light.lights.0.saturation`  | число, 0–100 %                             | Farbsättigung einstellen                                          |
| `light.lights.0.hex`         | нить                                       | Farbe als`#RRGGBB` einstellen                                     |
| `light.lights.0.rgb`         | нить                                       | Farbe im bisherigen`R,G,B` -Format setzen, zum Beispiel `255,0,0` |
| `battery.level`              | число, 0–100 %, nur lesbar                 | Аккустанд eines Key Light Mini                                    |
| `battery.status`             | string, nur lesbar                         | Vom Gerät Gemeldeter Ladestatus                                   |
| `battery.powerSource`        | string, nur lesbar                         | Актуэль Стромкелле                                                |
| `battery.studioMode`         | логический                                 | Studio-Modus ein- oder ausschalten, wenn unterstützt              |
| `health.reachable`           | логическое значение, nur lesbar            | Detaillierter Erreichbarkeitsstatus                               |
| `health.latency`             | number in ms, nur lesbar                   | Dauer der letzten API-Anfrage                                     |
| `health.lastSuccess`         | Datumsstring, nur lesbar                   | Zeitpunkt des letzten erfolgreichen Kontakts                      |
| `health.lastError`           | string, nur lesbar                         | Letzter Kommunikationsfehler                                      |
| `health.consecutiveFailures` | номер, ну лесбар                           | Anzahl aufeinanderfolgender fehlgeschlagener Abfragen             |
| `health.nextPoll`            | Datumsstring, nur lesbar                   | Geplanter Zeitpunkt der nächsten Abfrage                          |

Weitere nur lesbare Datenpunkte unter`info` , для WLAN, подключения и подключения к сети, когда вы получаете одну и ту же информацию.

### Skriptbeispiele

Инстанцнумер и серийный номер могут быть использованы для идентификаторов, связанных с собственными объектами ioBroker-Objektbaum, которые можно использовать. Schreibbare Datenpunkte müssen mit`ack = false` Если адаптер не используется, он должен быть установлен как Befehl erkennt.

```javascript
const light = 'elgato-key-light.0.EW40K1A09882.light.lights.0';

// Einschalten und die Helligkeit auf 65 Prozent setzen.
setState(`${light}.on`, true, false);
setState(`${light}.brightness`, 65, false);

// Eine warme weiße Farbtemperatur einstellen.
setState(`${light}.temperature`, 3200, false);

// Eine RGB-fähige Leuchte blau färben, ohne ihre Helligkeit zu ändern.
setState(`${light}.hex`, '#0000FF', false);
```

Dieselben schreibbaren Datenpunkte können aus Blockly, Szenen, VIS и другие компоненты ioBroker-Konnen verwendet werden. Schnell aufeinanderfolgende Slider-Werte werden pro Gerät zusammengefasst; der letzte Wert gewinnt.

## Mehrere Instantzen und Geräte Löschen

Jede Adaptorinstanz besitzt ihre eigene verbindliche Geräteliste. Конфигурации, объекты и панель мониторинга позволяют настроить мгновенный запуск. Если вы хотите, чтобы мгновенный запуск был завершен, он должен умереть.

Wird ein Gerät über das Papierkorb-Symbol gelöscht, wird es aus der Laufenden Instanz, der dauerhaft Gespeicherten Instanzconfiguration und dem Geräte-Objectbaum dieser Instanz entfernt. На каждой конфигурации должна быть указана страница администратора. Geräte anderer Instantzen bleiben unberührt.

## Fehlerbehebung

### Ein Gerät wird nicht gfunden

- Prüfen, ioBroker-Host и Leuchte einander в локальном Netzwerk erreichen können.
- Для такого типа Multicast-DNS/UDP 5353 и Weiterleitung von`_elg._tcp.local.` prüfen.
- Частный IP-адрес или собственный IP-адрес`.local` -Имя хоста должно быть указано вручную, если такая сеть VLAN не может быть использована.
- Убедитесь, что TCP-порт 9123 не работает и не работает при изолированном проводе Gast-WLAN-Regel.

### Ein Gerät ist im Dashboard оффлайн

Die Karte zeigt den letzten Fehler und den Countdown bis zum nächsten Veruch. **Повторно подключите** löst sofort eine neue Abfrage aus. Für Automatisierungen или Überwachung stehen`health.lastError` ,`health.consecutiveFailures` унд`health.nextPoll` zur Verfügung.

### Bedienelemente fehlen

Адаптер может быть использован в качестве необходимого элемента для обеспечения безопасности. Если вы используете актуальную прошивку, вы можете использовать ее снова и снова.`info.capabilities` или нажмите кнопку Dashboard-Diagnose. Если элемент питания является нормальным, этот API не может быть использован.

### Diagnosedaten sammeln

Диалоговое окно «Диагностика» на приборной панели содержит версию адаптера/запуска и актуальную информацию. WLAN-Namen werden ausgelassen; Seriennummern и locale Netzwerkadressen können jedoch enthalten sein, da sie bei der Fehleruche helfen. Die Ausgabe sollte deshalb vor einer öffentlichen Weitergabe geprüft werden.

Для получения дополнительных сведений о GET-Probe выполните следующие действия:

```shell
npm run elgato:probe -- 192.168.1.50 9123
```

Маскируется серийный номер зонда, MAC-адрес и имя WLAN. Einzelheiten zum Protokoll stehen в [docs/ELGATO\_API.md](/#/docs/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md) .

## Netzwerk und Datenschutz

Коммуникация не зависит от региона, не аутентифицируется через Elgato-HTTP-API. Укажите адрес хоста для частного/локального адреса и локального имени хоста. URL-схемы, eingebettete Zugangsdaten, Pfade и öffentliche IP-адреса werden abgewiesen. Адаптер будет полезен для Elgato-Cloud-Konto и для использования телеметрии.

Локальный API-интерфейс, который можно использовать для аутентификации, должен быть найден в Leuchten и ioBroker-Host в вашей вертрауенсвурдигенской сети. TCP-порт 9123 не доступен в Интернете.

## Актуальная версия другой версии

Die Geräte-Stammbjekte auf Seriennummernbasis und die bekannten schreibbaren Pfade unter`<Seriennummer>.light.lights.0` bleiben erhalten. [docs/MIGRATION.md](/#/docs/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md) beschreibt Metadatencorrekturen, Konfigurationsmigration and Rollback. Для этого необходимо обновить ioBroker-Backup снова.

## Entwicklung

```shell
npm run install:all
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run build
```

Тестирование оборудования включает в себя необязательные, стандартные варианты тестирования и длительного отсутствия в режиме CI.

## Änderungsverlauf

### **РАБОТА В ПРОЦЕССЕ**

- (xXBJXx) Бэкэнд с действительным HTTP-клиентом, поддержкой, надежным опросом и запуском Bonjour-/mDNS-Suche überarbeitet.
- (xXBJXx) Установка режима настройки RGB, температуры, режима Akku и Studio-Modus, чтобы обеспечить мгновенную тренировку и безопасную работу.
- (xXBJXx) Конфигурация и информационная панель с возможностью создания современных карточек, данных о состоянии здоровья, диагностики и создания/API-деталей.
- (xXBJXx) Использование Node.js >= 22.18, js-controller >= 7.2.2 и Admin >= 7.8.23.
- (xXBJXx) Behebt die Issues [#116](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/116) , [#117](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/117) , [#130](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/130) , [#152](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/152) и [#159](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/159) ; ersetzt die PRs [#39](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/39) , [#129](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/129) , [#181](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/181) , [#185](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/185) , [#186](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/186) , [#209](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/209) и [#250](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/250) .

### 1.1.0 (2024-04-14)

- (mcm1957) Адаптер для Jetzt Node.js 18 и js-controller >= 5.
- (mcm1957) Abhängigkeiten wurden aktualisiert.

Дополнительная информация: [CHANGELOG\_OLD.md](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/blob/main/CHANGELOG_OLD.md)

## Лицензия

Поддержка xXBJXx и поддержка адаптеров сообщества ioBroker. Elgato ist eine Marke der Corsair GmbH; dieses Projekt ist nicht mit Elgato/Corsair verbunden und wird nicht von Elgato/Corsair unterstützt.

Авторские права (c) 2024-2026 iobroker-community-adapters <mcm57@gmx.at>

Авторские права (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

Veröffentlicht unter der MIT-Lizenz. [ЛИЦЕНЗИЯ](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/blob/main/LICENSE) СИХЕ.