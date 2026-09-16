---
chapters: {"pages":{"en/adapterref/iobroker.clage-dsx/README.md":{"title":{"en":"ioBroker.clage-dsx"},"content":"en/adapterref/iobroker.clage-dsx/README.md"},"en/adapterref/iobroker.clage-dsx/README_DE.md":{"title":{"en":"ioBroker.clage-dsx"},"content":"en/adapterref/iobroker.clage-dsx/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.clage-dsx/README_DE.md
title: ioBroker.clage-dsx
hash: AqL/8/g9JmPBKjdl4er9zADHJyTnoyZDKMV5Cg5ReIk=
---
# ioBroker.clage-dsx

![Версия NPM](https://img.shields.io/npm/v/iobroker.clage-dsx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.clage-dsx.svg)
![Тестирование и выпуск](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml/badge.svg)

![CLAGE-DSX-Logo](../../../en/adapterref/iobroker.clage-dsx/admin/clage-dsx.png)

## Описание

Адаптер связывает ioBroker с локальным домашним сервером [CLAGE](https://www.clage.de/) и обеспечивает доступ к другим устройствам. Связь осуществляется через HTTPS-API в локальной сети Netzwerk; ein Cloud-Dienst ничего не даст.

Grundlage ist die mitgelieferte \[Спецификация API-интерфейса CLAGE Home Server v1.3.4] ( <https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/CLAGE> HomeServer API v1.3.4.pdf).

## Voraussetzungen

- ioBroker с Node.js 22 или новее
- Домашний сервер CLAGE должен быть установлен на ioBroker-Host
- Имя пользователя и пароль Home-Server-API-Kontos
- HTTPS-Zugriff на домашнем сервере

## Конфигурация

In den Einstellungen der Instanz werden drei Werte eingetragen:

1. **IP-адрес домашних серверов CLAGE** , zum Beispiel`192.168.2.35` (без`https://` )
2. **API-Benutzername** , zum Beispiel`admin`
3. **API-пароль** , например`geheim`

Alle Drei Felder sind erforderlich. Der историческая родная Konfigurationsschlüssel für den Benutzernamen heißt`port` ; Вы должны обеспечить совместимость с лучшими установками.

Die Werte`admin` унд`geheim` воспользуйтесь документацией CLAGE-API. Это возможно, если на собственном домашнем сервере указаны данные API-запросов; Если пароль введен, он будет функционировать только тогда, когда он будет настроен правильно.

Домашний сервер имеет нормальный сертификат TLS. Местный сертификат адаптера указан для непосредственного подключения к его конфигурации.

## Aktueller Funktionsumfang

Для некоторых условий CLAGE необходимо указать дату адаптера:

- Identität, Verbindungsstatus, RSSI, LQI, API-Rechtemaske и Letzte Funkaktivität
- Sollwert, Temperaturgrenze, Ein-/Auslaufttemperatur und alle vier Temperaturspeicher
- Durchfluss, Durchflussgrenze, Ventilstellung, Rohwert und berechnete Leistung, Heizstatus und Fehler
- Firmware- und Seriennummern, Leistungsteilinformationen und Betriebszeitzähler
- Gesamtverbrauch sowie letzten Zapfvorgang und Verbrauchshistorie как JSON
- актуальная история Фелера и истории Фелера как JSON
- Версия, идентификационный номер, функциональный канал, адрес и информация о домашних серверах
- все таймеры, такие как глобальные и другие, которые используются в фильтре

Schreibbare Datenpunkte:

- `Setpoint` : API-Wert в Центельграде, цум Байшпиль.`450` = 45,0 °C
- `Themperatur` : Температура в °C; die historische Schreibweise bleibt aus Kompatabilitätsgründen erhalten
- `flowMax` : Durchflussgrenze в дозе 0,1 л/мин; besondere API-Werte Sind`253` (ECO) унд`254` (АВТО)
- `Name` : Gerätename
- `setup.flowMax` ,`setup.loadShedding` ,`setup.scaldProtection` унд`setup.sound`
- `timers.createJson` ,`timers.updateJson` унд`timers.deleteId` для контроля таймера

`info.connection` Однако на домашнем сервере это недопустимо, и это необходимо для получения дополнительной информации.

Адаптер предназначен для Schreibzugriffen die-Rechtemaske API. В течение нескольких секунд активируется фактическое обновление и стандартный список с последовательным длинным опросом HTTP. Интервал, длительный опрос и время просмотра истории (стандартный срок 30 дней) находятся на панели конфигурации адаптера.

## Таймер-JSON

Ein Timer kann durch Schreiben eines JSON wie diesem auf`timers.createJson` angelegt werden:

```json
{"type":0,"weekdays":127,"start":"06:00","stop":"07:00","deviceId":"A001FF0034","setpoint":450}
```

Für Änderungen wird derselbe Aufbau mit numerischer`id` ауф`timers.updateJson` гешрибен. Zum Löschen eines einzelnen Таймеры с числовым идентификатором`timers.deleteId` гешрибен. В процессе работы по уходу за детьми и развлечениями в Funkadresse мы ничего не испытываем.

## Fehlerbehebung

- IP-адрес указан в соответствии с протоколом и выбранным пользователем.
- API-данные в конфигурации домашних серверов CLAGE.
- TCP-порт 443 должен быть установлен на ioBroker-Host.
- HTTP-статус`401` bedeutet ungültige Zugangsdaten;`403` bedeutet unzureichende API-Rechte.
- Ein Gerät cann angemeldet, aber vorübergehend nicht erreichbar sein. Умирает мелдет API`404` ,`410` oder einem отрицательный Gerätefehlercode.

## Лицензия

Авторские права (c) 2026 TheBam <elektrobam@gmx.de>

Лицензия MIT. См. [ЛИЦЕНЗИЮ](https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/LICENSE) .

## Changelog

### 0.0.7

- Datenpunktrollen für Zeitstempel, Versionsinformationen und die numerische Bus-ID korrigiert

### 0.0.6

- Live-Temperaturen, Temperaturspeicher, Ventilstellung, berechnete Leistung und Funkdiagnose ergänzt
- Geräteeinstellungen, Verbrauchs- und Fehlerhistorie ergänzt
- Rechtegeprüfte Schreibzugriffe auf Einstellungen und Timerverwaltung ergänzt
- Home-Server-Informationen, adaptive Abfrage und sequenzielles HTTP Long Polling ergänzt
- Abfrageintervalle konfigurierbar gemacht

[Ältere Changelog-Einträge](https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/CHANGELOG_OLD.md)