---
chapters: {"pages":{"en/adapterref/iobroker.goodwe-sems/README.md":{"title":{"en":"ioBroker.goodwe-sems"},"content":"en/adapterref/iobroker.goodwe-sems/README.md"},"en/adapterref/iobroker.goodwe-sems/README.de.md":{"title":{"en":"ioBroker.goodwe-sems"},"content":"en/adapterref/iobroker.goodwe-sems/README.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.goodwe-sems/README.de.md
title: ioBroker.goodwe-sems
hash: TcsRZ/FL2hu2GbIfjfsMW+mjDW/UfHcupuYk5o0KO7k=
---
![Логотип](../../../en/adapterref/iobroker.goodwe-sems/admin/goodwe-sems.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.goodwe-sems.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.goodwe-sems.svg)
![Тестирование и выпуск](https://github.com/bueste/ioBroker.goodwe-sems/actions/workflows/test-and-release.yml/badge.svg)
![Пожертвовать](https://img.shields.io/badge/Spenden-PayPal-00457C?style=flat&logo=paypal&logoColor=white)
![Купи мне кофе](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

_[Прочитайте это на английском языке.](/#/adapters/goodwe-sems)_

# ioBroker.goodwe-sems

Liest Wechselrichter-, Batterie- und Energiefluss-Datan aus dem **[GoodWe](https://www.goodwe.com) [SEMS Portal](https://www.semsportal.com) (Cloud)** – для Anlagen, die (z. B. weil kein LAN-Zugriff auf den Wechselrichter besteht) **nicht** mit dem lokalen [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe) -Adapter (Modbus/UDP, Port 8899) abgefragt Верден Кеннен.

Войдите в систему с помощью **обычного SEMS-Portal-Konto** (dasselbe wie unter semsportal.com / в SEMS-App). Ein GoodWe-«Организация»/OpenAPI-Konto **не** дает никаких преимуществ.

## Inhaltsverzeichnis

- [Почему этот адаптер?](#warum-dieser-adapter)
- [API-Herkunft und Grenzen (немного урока)](#api-herkunft-und-grenzen-bitte-lesen)
- [Установка](#installation)
- [Конфигурация](#konfiguration)
- [Объектно-/Состоянийная структура](#objekt-state-struktur)
- [Управление изменениями, отсрочка и ограничения ставок](#fehlerbehandlung-backoff-und-rate-limits)
- [Pushover-Benachrichtigungen](#pushover-benachrichtigungen)
- [Безопасность и защита данных](#sicherheit--datenschutz)
- [Entwicklung](#entwicklung)
- [Список изменений](#changelog)
- [Лицензия](#lizenz)

## Почему этот адаптер?

GoodWe ET/EH/BH/BT-Wechselrichter lassen sich Normalerweise localer for Modbus/UDP auslesen (siehe [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe) ). Steht kein LAN-Zugriff auf den Wechselrichter zur Verfügung (z. B. weil nur ein WLAN/LTE-Stick mit dem SEMS-Portal verbunden ist und das Zielnetz nicht erreichbar ist), bleibt nur der der Umweg über die Cloud: das **[SEMS Portal](https://www.semsportal.com)** ( [GoodWe](https://www.goodwe.com) ), über das die Anlage ohnehin schon überwacht wird.

## API-Herkunft und Grenzen (немного урока)

GoodWe предлагает официальные API-интерфейсы (например, [Технический документ GoodWe API](https://community.goodwe.com/solution/API) ):

- **OpenAPI** – для SEMS- _Organization-_ Konten, erfordert Freischaltung durch GoodWe.
- **API для мониторинга данных в реальном времени** – для проверки, разрешения и включения белого списка.
- **Интерфейс пакетного дистанционного управления** – Kafka-basiert, nur Fernsteuerung.

Для **обычного** SEMS-Portal-Konto (Wie es die meisten Privatanwender haben) это очень важно. Dieser Adaptor spricht stattdessen Diesel **может быть недокументирован по HTTPS-API** , а также в официальном приложении SEMS/на веб-сайте (вход через`CrossLogin` /`SEMS+ cross-login` , Datenabfrage via`GetMonitorDetailByPowerstationId` ). Diese Endpunkte wurden nicht von GoodWe für Drittnutzung freigegeben или dokumentiert; Базовая реализация проекта.

- [pygoodwe](https://github.com/yaleman/pygoodwe) (MIT)
- [goodwe-sems-home-assistant](https://github.com/TimSoethout/goodwe-sems-home-assistant)
- [openHAB SEMSPortal-Binding](https://www.openhab.org/addons/bindings/semsportal/)

**Konsequenzen:**

- Хорошо, мы можем использовать API без использования адаптера (временно).
- Es gibt **kein dokumentiertes Echtzeit-/Push-Verfahren** (Websocket/SignalR) для Drittanbieter. Эйн`msgSocketAdr` -После ввода ответа на вход в систему, вы получите ответ на вопрос о созданном референс-проекте, который будет создан - es wäre reines Reverse-Engineering ohne belastbare Dokumentation und ein deutlich höheres Risiko (Kontosperrung, instabile). Вербиндунг). У адаптера есть лучший опрос по HTTPS в настройках интервала (по умолчанию 5 минут), который не проверяется при использовании Websocket-Verbindung vorzutäuschen.
- Это **код ограничения скорости (`GY0429` )** beobachtet (ua в документации Home-Assistant-Integration). Адаптер включает код и автоматически приостанавливает работу (по умолчанию 5-минутное охлаждение), чтобы получить информацию о том, как отключить адаптер.
- Nutzung erfolgt auf eigenes Risiko, siehe [LICENSE](https://github.com/bueste/ioBroker.goodwe-sems/blob/main/LICENSE) (MIT, ohne Gewährleistung).

**Конечный пункт не будет установлен на место:** gegen eine echte Tages-Antwort verifiziert, Lifert die von diesem Adaptor genutzte`GetMonitorDetailByPowerstationId` -Gateway-Antwort weder einen Stations-Zeitstempel (`info.time` ) noch Monats-Erzeugungs-/Einkommens-/Währungsfelder (`kpi.month_generation` ,`kpi.day_income` ,`kpi.total_income` ,`kpi.currency` ). Die entsprechenden States (`Station.PortalTimestamp` ,`KPI.MonthGeneration` ,`KPI.TodayIncome` ,`KPI.TotalIncome` ,`KPI.Currency` ) мы даем вам свой Конто и не нажимаем на кнопку Tageszeit erzeugt - это ваш ключ к выбору шлюза-API, который вам нужен, когда вы используете его.`Battery.*` - унд`PowerFlow.*` -States werden nur erzeugt, wenn das Portal tatsächlich Batterie-/Leistungsfluss-Daten für die Anlage Liefert (z. B. fehlt der`powerflow` - Schlussel komplett bei Anlagen ohne Batterie).

## Установка

Когда этот адаптер находится в официальном списке ioBroker-Adapter-Repository, его можно установить в обычном режиме: **Администратор -> Адаптер -> nach «goodwe-sems» suchen -> installieren** .

Если вы можете управлять ioBroker-Administrator и вручную использовать ioBroker-Host, выполните следующие действия:

```
iobroker url iobroker.goodwe-sems
```

## Конфигурация

| Поле                       | Описание                                                                                                                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEMS-Konto / Passworth     | Dieselben Zugangsdaten на сайте semsportal.com. Пароль от ioBroker не указан.                                                                                                             |
| Anlagen-ID (необязательно) | Leer lassen für autotische Erkennung (`GetPowerStationIdByOwner` ). Bei mehreren Anlagen pro Konto: ID manuell aus der Portal-URL übernehmen (`.../powerstation/powerstatussnmin/<ID>` ). |
| Интервал опроса            | По умолчанию 300 с. Адаптер работает минимум 60 с, независимо от конфигурации.                                                                                                            |
| Слабак                     | Зие [Пушовер-Бенахрихтигунген](#pushover-benachrichtigungen) .                                                                                                                            |

## Объектно-/Состоянийная структура

```
goodwe-sems.0.info.connection              SEMS Portal erreichbar (bool)
goodwe-sems.0.info.lastSuccess             Zeitstempel letzter erfolgreicher Poll
goodwe-sems.0.info.lastError               Letzte Fehlermeldung
goodwe-sems.0.info.consecutiveErrors       Anzahl aufeinanderfolgender Fehlversuche
goodwe-sems.0.info.rateLimited             SEMS Portal limitiert aktuell (bool)
goodwe-sems.0.info.activePollInterval      Aktuell wirksames Intervall inkl. Backoff (s)
goodwe-sems.0.info.rawResponse             Rohe JSON-Antwort (nur wenn Debug-Option aktiv)

goodwe-sems.0.Station.Name / .Capacity / .Address / .Latitude / .Longitude / .PortalTimestamp / .Status / .StationId
goodwe-sems.0.KPI.CurrentPower / .TodayGeneration / .MonthGeneration / .TotalGeneration / .TodayIncome / .TotalIncome / .Currency
goodwe-sems.0.PowerFlow.PV / .Load / .Grid / .Battery / .LoadStatus / .GridStatus / .PvStatus / .BatteryStatus
goodwe-sems.0.Battery.SOC / .Status
goodwe-sems.0.EVCharger.*                  (nur wenn vom Portal gemeldet)

goodwe-sems.0.Inverters.<Seriennummer>.Name / .Model / .Status / .WarningCode
goodwe-sems.0.Inverters.<Seriennummer>.CurrentPower / .TodayGeneration / .TotalGeneration / .Temperature
goodwe-sems.0.Inverters.<Seriennummer>.PV1..4.Voltage / .Current
goodwe-sems.0.Inverters.<Seriennummer>.AC_L1..3.Voltage / .Current / .Frequency
goodwe-sems.0.Inverters.<Seriennummer>.Battery.SOC / .Voltage / .Current
```

Bei zwei Wechselrichtern (wie in der ursprünglichen Anforderung) entstehen autotisch zwei`Inverters.<SN>.*` -Zweige - die Anzahl ist nicht fest codiert, sondern richtet sich nach dem, был порталом для драгоценностей, хранящихся в магазине.

Если вы используете портал, а также адаптер (ноч) не имеет значения, он не может быть установлен: с включенной опцией отладки вы получите полную версию Rohantwort в`info.rawResponse` (JSON), это вдохновляет и помогает пиару, если вы хотите его использовать.

## Управление изменениями, отсрочка и ограничения ставок

- Джедер Полл-Цюклус ist vollständig try/catch-abgesichert; ein einzelner Fehler kann die Polling-Schleife nicht dauerhaft stoppen.
- Класс ошибок (`SemsAuthError` ,`SemsRateLimitError` ,`SemsNetworkError` ,`SemsProtocolError` ) steuern das Verhalten gezielt:
  - **Ограничение скорости (`GY0429` )** → мягкая пауза (по умолчанию 300 с),`info.rateLimited = true` .
  - **Вход в систему-Фелер** → экспонента Отсрочка (до 1 часа), чтобы получить ложную информацию о том, что данные не указаны.
  - **Netzwerk-/Protokollfehler** → модерирует Backoff.
- В каждом конфигурационном блоке вы можете использовать следующие настройки (по умолчанию 3) и включить режим «оффлайн» и активный режим — eine Pushover-Meldung ausgelöst.
- Вся структура доступна в журнале ioBroker-Log (`error` /`warn` /`debug` je nach Schweregrad).

## Pushover-Benachrichtigungen

Konfigurierbar in drei Modi:

1. **Über eine bestehende`ioBroker.pushover` -Инстанц** (`sendTo` ) - empfohlen, keine doppelte Zugangsdatenverwaltung.
2. **Прямой доступ к Pushover-API** (собственный пользовательский ключ + API-/App-Token, расширенный доступ) — функция, работающая также в отдельных Pushover-Instanz.
3. **Beides gleichzeitig.**

Доступны следующие варианты: SEMS-Вход в систему-Фелер, SEMS-Ограничение скорости, долгий и продолжительный переход, неактивный адаптер - активная панель управления. Eine interne Sperrfrist (по умолчанию 1 час для категории) предотвращает спам в andauernden Störungen.

## Безопасность и защита данных

- SEMS-пароль и Pushover-API-токен в Wurzel фон`io-package.json` алс`encryptedNative` /`protectedNative` markiert und werden von ioBroker verschlüsselt abgelegt, nicht im Klartext geologgt (Kontoname wird в Log-Meldungen Maskiert, z. B.`st***@gmail.com` ).
- Der Adaptor führt **ausschließlich lesende** Zugriffe aus (`GetMonitorDetailByPowerstationId` ,`GetPowerStationIdByOwner` ). Es gibt bewusst **keine** Fernsteuerungs-/Schreibfunktion (`SaveRemoteControlInverter` ) - das wäre ein deutlich größeres Sicherheits- und Haftungsrisiko und war nicht Teil der Anforderung.
- Keine Drittanbieter-Abhängigkeiten für den HTTP-Zugriff: Es wird das in Node.js ≥22 eingebaute`fetch` verwendet statt einer zusätzlichen HTTP-Bibliothek - kleinere Angriffsfläche, weniger Supply-Chain-Risiko.
- Если ваш сервер входа в систему использует действительный API-базис-URL (кроме HTTPS на собственных доменах GoodWe), он может быть использован в качестве ключевого слова для входа в систему — ответ на вход в систему не может быть добавлен для сеансового токена и не может быть удален от хоста.
- Alle Netzwerkfehler werden typisiert abgefangen; es werden keine ungeprüften Daten aus der API-Antwort ausgeführt (`eval` ,`Function` , о. ä. werden nirgends verwendet).

## Entwicklung

```
npm install
npm run lint
npm test          # Unit-Tests (lib/mapping.js, lib/semsApi.js, lib/notify.js) + Package-Konsistenz-Check
```

Возможности для использования: Release zusätzlich local:

```
npx @iobroker/repochecker@latest .
```

Запросы на извлечение будут направлены на то, чтобы узнать больше о портале и получить доступ к нему (siehe`info.rawResponse` с активатором Debug-Option) или Übersetzungen zu verbessern.

## Лицензия

Лицензия MIT

Copyright (c) 2026 Штефан Бюлер

Настоящим предоставляется разрешение любому лицу, получившему копию данного программного обеспечения и сопутствующих файлов документации («Программное обеспечение»), бесплатно распоряжаться Программным обеспечением без ограничений, включая, помимо прочего, право использовать, копировать, изменять, объединять, публиковать, распространять, сублицензировать и/или продавать копии Программного обеспечения, а также разрешать лицам, которым предоставляется Программное обеспечение, делать это при соблюдении следующих условий:

Указанное выше уведомление об авторских правах и данное разрешение должны быть включены во все копии или существенные части программного обеспечения.

Программное обеспечение предоставляется «как есть», без каких-либо гарантий, явных или подразумеваемых, включая, помимо прочего, гарантии товарной пригодности, пригодности для определенной цели и отсутствия нарушений прав интеллектуальной собственности. Ни при каких обстоятельствах авторы или правообладатели не несут ответственности за какие-либо претензии, убытки или иную ответственность, независимо от того, возникли ли они в результате нарушения договора, деликта или иным образом, в связи с использованием программного обеспечения или другими действиями с ним.

## Changelog

<!--
    Platzhalter für die nächste Version (am Zeilenanfang):
    ### **WORK IN PROGRESS**
-->

### 1.0.0 (2026-07-22)

- (Stefan Bühler) Erstes stabiles Release: Der Adapter läuft seit mehreren Release-Zyklen zuverlässig mit der SEMS+-Gateway-API im produktiven Einsatz. Dieses Release enthält nur Metadaten-Änderungen - `common.news`-Übersetzungen für 0.1.15-0.1.19 korrigiert (einige Sprachen waren unübersetzte Kopien des englischen Texts - vom Repochecker als E1144 gemeldet), einen Buy-Me-a-Coffee-Link neben dem PayPal-Spenden-Badge ergänzt und Copyright-/Autoren-Metadaten vereinheitlicht. Keine funktionalen Änderungen.

### 0.1.19 (2026-07-20)

- (Stefan Bühler) Den klassischen, versionierten `GetMonitorDetailByPowerstationId`-Endpunkt (seit 0.1.14/0.1.15 als `/v3`, `/v2`, `/v1` versucht) komplett entfernt - GoodWe hat ihn abgeschaltet, jedes während der Entwicklung beobachtete Konto bekommt bei allen drei Versionen ausnahmslos 404. `getMonitorDetail()` ruft jetzt direkt die in 0.1.16 eingeführte SEMS+-Gateway-API auf, was jeden Poll-Zyklus schneller macht und unnötige, garantiert scheiternde Anfragen vermeidet
- (Stefan Bühler) Fix: Die Gateway-Session wurde nie automatisch erneuert, wenn sie serverseitig ablief - der Adapter erzeugt beim Start eine einzige, langlebige API-Client-Instanz und nutzt deren Session unbegrenzt weiter, und anders als der (jetzt entfernte) klassische Pfad hat der Gateway-Request-Helfer nie bei einer abgelaufenen Session neu eingeloggt. Das führte dazu, dass der Adapter nach einigen Stunden dauerhaft ausfiel (bestätigt an einem echten Konto: abends funktionierend, den gesamten nächsten Tag bei jedem einzelnen Poll-Zyklus fehlgeschlagen), bis er manuell neu gestartet wurde. Jeder Gateway-Aufruf loggt sich jetzt bei jedem Fehler automatisch einmalig neu ein und wiederholt den Aufruf, bevor aufgegeben wird
- (Stefan Bühler) 5 aktualisierte/neue Regressionstests (45 Unit-Tests insgesamt) für den vereinfachten direkten Gateway-Aufruf und das automatische Re-Login-und-Wiederholen-Verhalten (inklusive korrektem Aufgeben nach genau einem Versuch)

### 0.1.18 (2026-07-19)

- (Stefan Bühler) Fix: Der SEMS+-Login wurde trotz des Host-Fixes in 0.1.17 weiterhin mit `code=C0602 "account_login_abnormal"` abgelehnt, weil sich der Adapter als iOS-App ausgab (`User-Agent: PVMaster/...`, Token-`client: "ios"`) - der aufgerufene Endpunkt (`eu-semsplus.goodwe.com`) wird laut echtem Browser-Mitschnitt aber ausschließlich vom SEMS+-*Web*-Client genutzt, der `client: "semsPlusWeb"`, einen Browser-User-Agent sowie `Origin`/`Referer`-Header sendet. Der Login-Call baut jetzt eine eigene, passende Header-Identität nur für diesen einen Aufruf; alle anderen (klassischen/Legacy-)Endpunkte nutzen unverändert weiterhin die etablierte iOS-Identität
- (Stefan Bühler) 1 verschärfter Regressionstest, der die Client-Identität und Header des Login-Calls prüft

### 0.1.17 (2026-07-19)

- (Stefan Bühler) Fix: Der SEMS+-Login schlug für manche Konten fehl (`code=C0602 "account_login_abnormal"`), weil der Adapter den globalen Endpunkt (`semsplus.goodwe.com`) statt des EU-regionalen (`eu-semsplus.goodwe.com`) aufrief. Bestätigt durch einen echten Browser-HAR-Mitschnitt: derselbe Request-Body und Passwort-Hash war gegen den regionalen Host erfolgreich. Bewusst **ohne** Host-Fallback-Schleife umgesetzt - mehrere Login-Versuche mit denselben Zugangsdaten gegen verschiedene Hosts sehen für das Backend wie Credential-Stuffing aus und riskieren eine echte Kontosperre
- (Stefan Bühler) Der Login-Request sendet jetzt zusätzlich den `x-signature`-Header (exakt wie im echten Browser-Traffic), und ein echtes SEMS+-Session-Token wird von der in 0.1.16 eingeführten Gateway-API jetzt korrekt akzeptiert - zuvor bekam der Gateway-Fallback nur ein aus dem Legacy-CrossLogin abgeleitetes Token, das vom Gateway mit demselben C0602-Fehler abgelehnt wurde, da es keine echte SEMS+-Session ist
- (Stefan Bühler) 1 aktualisierter Regressionstest, der die exakte Login-URL und das Vorhandensein des Signatur-Headers beim Login prüft

### 0.1.16 (2026-07-19)

- (Stefan Bühler) Großer Fund: Manche Konten, deren SEMS+-Login abgelehnt wird und die auf die Legacy-CrossLogin-API zurückfallen, landen gar nicht auf dem klassischen `semsportal.com`-artigen Backend - sie bekommen eine Session für eine komplett andere, moderne Microservice-API ("SEMS+-Gateway", `eu-gateway.semsportal.com`). Das erklärt, warum `GetMonitorDetailByPowerstationId` unter keinem der in 0.1.14/0.1.15 versuchten Pfade (`v1`/`v2`/`v3`) je funktionieren konnte. Bestätigt durch einen echten Browser-HAR-Mitschnitt (`eu-semsplus.goodwe.com`), der die tatsächlich genutzten Endpunkte zeigt (`sems-plant/api/stations/...`, `sems-plant/api/equipments/<sn>/telemetry` usw.)
- (Stefan Bühler) Die Gateway-API verlangt zusätzlich einen berechneten `x-signature`-Header bei jedem Request, sonst wird er stillschweigend abgelehnt. Das Signatur-Schema (`base64(sha256(`${ts}@${uid}@${token}`) + "@" + ts)`) wurde empirisch aus ~230 echten Request/Response-Paaren rekonstruiert - 100 % Treffer, keine Ausnahmen
- (Stefan Bühler) `getMonitorDetail()` fällt jetzt automatisch auf diese Gateway-API zurück (Stations-Basisdaten, Geräteliste, Telemetrie/Telecounting pro Gerät), wenn alle drei klassischen Pfade 404 liefern, und wandelt das Ergebnis in dieselbe `info`/`kpi`/`inverter[]`-Struktur um, die der Rest des Adapters bereits erwartet - keine Änderungen in der Mapping-/State-Erzeugungs-Schicht nötig
- (Stefan Bühler) Bewusst konservative erste Version: Nur Felder mit gesichertem Einheiten-/Format-Nachweis werden befüllt (aktuelle Leistung, Tages-/Gesamtertrag, Wechselrichter-Werte für AC/PV/Temperatur); der stationsweite Leistungsfluss (PV/Verbrauch/Netz/Batterie) wird noch nicht befüllt, da alle bisherigen Mitschnitte nachts erfolgten und dafür ein leeres Objekt lieferten
- (Stefan Bühler) 2 neue Regressionstests (47 Unit-Tests insgesamt), darunter einer, der die tatsächliche Signaturberechnung gegen die echte, reverse-engineerte Formel verifiziert

### 0.1.15 (2026-07-19)

- (Stefan Bühler) Fix: Der v3→v2-Fallback aus 0.1.14 für `GetMonitorDetailByPowerstationId` reichte nicht aus - bei einem echten Konto lieferte das Legacy-Login-Backend `404 Route Not Found` für **beide** Pfade, `v2` und `v3`. Community-Referenzen widersprechen sich, welche Version korrekt ist (pygoodwe verwendet fest `v2`, ein separater Artikel von 2023 nutzt `v1`, unsere eigene Traffic-Analyse beobachtete `v3`) - `getMonitorDetail()` probiert jetzt alle drei Versionen der Reihe nach durch (`v3` → `v2` → `v1`) und nutzt die erste, die keinen 404 liefert
- (Stefan Bühler) Diagnose: Debug-Logs enthalten jetzt die vollständige Request-URL (inkl. aufgelöster API-Basis) statt nur des relativen Pfads, und der Login-Erfolgs-Log gibt jetzt ebenfalls die aufgelöste API-Basis aus - so lässt sich genau erkennen, welche Host+Pfad-Kombination fehlschlägt
- (Stefan Bühler) 2 aktualisierte/neue Regressionstests (45 Unit-Tests insgesamt) für den dreistufigen Versions-Fallback und den Fall, dass alle drei Pfade fehlschlagen

### 0.1.14 (2026-07-19)

- (Stefan Bühler) Fix: `GetMonitorDetailByPowerstationId` lieferte `404 Route Not Found` für Konten, deren SEMS+-Login abgelehnt wird (beobachtet: `code=C0602`) und die auf die Legacy-CrossLogin-API zurückfallen - dieses Backend stellt den Endpunkt unter dem `v2`-API-Pfad bereit, nicht `v3`. Root Cause gefunden anhand des Debug-Logs eines echten Kontos sowie der Referenzimplementierung [pygoodwe](https://github.com/yaleman/pygoodwe), deren rein-legacy-Client den `v2`-Pfad fest verdrahtet. `getMonitorDetail()` versucht jetzt zuerst `v3` und wiederholt bei erkanntem 404 automatisch einmal mit `v2` - beide Backend-Varianten funktionieren damit ohne jede Konfigurationsänderung durch den Nutzer
- (Stefan Bühler) Fix: Fehlermeldungen zeigen jetzt auch das `error_msg`-Feld der API an (wurde bisher stillschweigend verworfen, was selbst bei aussagekräftiger Fehlerbeschreibung in der Antwort nur zu einem nichtssagenden „unbekannter Fehler" führte)
- (Stefan Bühler) 2 neue Regressionstests (44 Unit-Tests gesamt) für den v3→v2-Fallback sowie den Fall, dass beide Pfade fehlschlagen

### 0.1.13 (2026-07-19)

- (Stefan Bühler) Diagnose: rohe JSON-Antwort jedes SEMS-API-Aufrufs wird jetzt auf Debug-Level geloggt, nicht mehr nur beim Monitor-Detail-Aufruf. Tests mit einem echten Konto zeigten eine Meldung `SEMS-API-Fehler: ... GetPowerStationIdByOwner ... unbekannter Fehler (code=undefined)` - die vom Adapter angenommene Erfolgs-/Fehler-Code-Konvention (`code: 0`/`"0"`/`"00000"`) wurde bisher nur gegen selbst geschriebene Testfixtures geprüft, nicht gegen diesen konkreten Endpunkt auf einem echten Konto. Dieses Logging ist der schnellste Weg, die tatsächliche Antwortstruktur zu sehen und den echten Fehler zu beheben, ohne dass Zugangsdaten von irgendjemandem benötigt werden

### 0.1.12 (2026-07-19)

Weitere Fixes aus einem Repochecker-Recheck der `ioBroker.repositories`-Listing-PR:

- (Stefan Bühler) **[E2004]** Eintrag `0.1.10` aus `common.news` in `io-package.json` entfernt - die CI dieser Version schlug vor dem Deploy-Schritt fehl, sie wurde also nie tatsächlich auf npm veröffentlicht
- (Stefan Bühler) **[S3014]** `needs: check-and-lint` beim `adapter-tests`-Job ergänzt, damit dieser erst nach erfolgreichem Linting läuft
- (Stefan Bühler) **[W0066]** `@types/node` auf `^22` fixiert (war das offene `>=22`, das auf eine neuere Major-Version mit unpassenden Typdefinitionen auflösen könnte)
- (Stefan Bühler) **[W4040]/[W4042]** JSON-Schema-Zuordnungen in `.vscode/settings.json` korrigiert: `fileMatch`-Einträge dürfen keinen führenden Slash haben, und das jsonConfig-Schema muss zusätzlich auf `admin/jsonCustom.json` und `admin/jsonTab.json` passen
- (Stefan Bühler) **[S8913]** `.github/workflows/automerge-dependabot.yml` (mit `iobroker-bot-orga/action-automerge-dependabot@v1`) und `.github/auto-merge.yml` ergänzt, damit Patch-Updates (und Minor-Updates bei Dev-Dependencies) von Dependabot automatisch gemerged werden

### 0.1.11 (2026-07-19)

- (Stefan Bühler) einen echten CI-Fehler aus 0.1.10 behoben: Node.js 20.x aus der `adapter-tests`-Matrix in `.github/workflows/test-and-release.yml` entfernt. Diese Version ist inkompatibel mit `engines.node >=22` (ebenfalls seit 0.1.10), sobald die offizielle `ioBroker/testing-action-adapter@v1`-Action `npm ci` mit aktiviertem `engine-strict` ausführt - das ließ diesen Matrix-Job abstürzen und brach per Fail-Fast alle anderen Jobs ab

### 0.1.10 (2026-07-19)

Zweite Runde von Fixes für weitere Befunde eines strengeren automatisierten `@iobroker/repochecker`-Rechecks der `ioBroker.repositories`-Listing-PR:

- (Stefan Bühler) **[W0028]** `engines.node` auf `>=22` angehoben
- (Stefan Bühler) **[W0063]** `chai`, `chai-as-promised`, `mocha`, `sinon` aus devDependencies entfernt (bereits in `@iobroker/testing` enthalten)
- (Stefan Bühler) **[S0065]/[S0085]/[S0087]** `@types/node`, `@tsconfig/node22` und `/tsconfig.json` für Editor-Typprüfung ergänzt
- (Stefan Bühler) **[S5026]** Release-Plugin `@alcalzone/release-script-plugin-manual-review` ergänzt
- (Stefan Bühler) **[W3013]/[W3015]/[W3017]** `.github/workflows/test-and-release.yml` neu geschrieben: nutzt jetzt die offiziellen geteilten Actions `ioBroker/testing-action-check@v1`, `ioBroker/testing-action-adapter@v1` und `ioBroker/testing-action-deploy@v1` statt handgeschriebener Steps
- (Stefan Bühler) `test/integration.js` ergänzt (Adapter-Start-Smoke-Test über den Integrations-Harness von `@iobroker/testing`), damit `npm run test:integration` erfolgreich läuft
- (Stefan Bühler) **[E1032]** `common.news` in `io-package.json` auf die vom Repository-Builder verwendeten 7 Einträge gekürzt
- (Stefan Bühler) **[E5512]** fehlende Pflicht-Eigenschaft `size` beim Pushover-Abschnitts-Header in `admin/jsonConfig.json` ergänzt
- (Stefan Bühler) **[S5601]** `admin/i18n` vom langen `{lang}/translations.json`-Format auf das kurze `{lang}.json`-Format migriert
- (Stefan Bühler) **[S4036]** `.vscode/settings.json` mit JSON-Schema-Zuordnungen für `io-package.json` und `admin/jsonConfig.json` ergänzt
- (Stefan Bühler) **[S8901]** `.github/dependabot.yml` ergänzt (npm + github-actions, wöchentlich, mit Cooldown und einer Ignore-Regel für Major-/Minor-Updates von `@types/node`)

### 0.1.9 (2026-07-19)

Behebt die strengeren Befunde des automatisierten `@iobroker/repochecker`, die bei der `ioBroker.repositories`-Listing-PR aufgetreten sind:

- (Stefan Bühler) **[E1057]** `encryptedNative`/`protectedNative` von `common` an die Wurzel von `io-package.json` verschoben, entsprechend dem aktuellen Schema
- (Stefan Bühler) **[E3009]/[E3010]/[E3011]/[E3012]** `engines.node` auf `>=20`, `@iobroker/adapter-core` auf `^3.4.1`, die `js-controller`-Abhängigkeit auf `>=6.0.11`, die `admin`-GlobalDependency auf `>=7.6.20` angehoben
- (Stefan Bühler) **[E3040]** devDependencies aktualisiert (`@iobroker/adapter-dev`, `@iobroker/testing`, mocha, esbuild u. a.) auf aktuelle Major-Versionen
- (Stefan Bühler) **[E3000er-Serie]** `.github/workflows/test-and-release.yml` auf das aktuelle offizielle Template umgestellt: Jobs umbenannt (`check-and-lint`, `adapter-tests`, `adapter-check`, `deploy`), volle OS/Node-Testmatrix (ubuntu/windows/macos x 20/22/24), `concurrency`-Gruppe, Deploy-Job auf Node 24 fixiert
- (Stefan Bühler) **[E5005]** globale `setTimeout`/`clearTimeout` durch adapter-verwaltete Timer (`adapter.setTimeout`/`adapter.clearTimeout`) in `lib/notify.js` und `lib/semsApi.js` ersetzt
- (Stefan Bühler) **[E5043]** auf `require("node:crypto")` umgestellt
- (Stefan Bühler) **[E5507]/[E5510]/[E5512]/[E5612]** `admin/jsonConfig.json` korrigiert: fehlende `lg`/`xl`-Responsive-Größen bei allen Items ergänzt, einen literalen Label-String durch einen echten i18n-Key ersetzt (`loginTab`, in allen 11 Übersetzungsdateien ergänzt)
- (Stefan Bühler) **[E6004]/[E6015]/[W0037]/[W0076]** `README.md` ins Englische übersetzt (Pflichtsprache), bisherigen deutschen Inhalt nach `README.de.md` verschoben, `CHANGELOG_OLD.md` für ältere Einträge ergänzt
- (Stefan Bühler) **[W9501]** überflüssige `.npmignore` entfernt (durch `files` in package.json ersetzt)
- (Stefan Bühler) **[E9006]** `.commitinfo` zur `.gitignore` ergänzt
- (Stefan Bühler) **[S4036]/[S5026]** `prettier.config.mjs` ergänzt, Codebasis neu formatiert, `jsdoc/reject-any-type` für den opaken Node-Timer-Handle-Typ mit begründendem Kommentar deaktiviert

### 0.1.8 (2026-07-19)

ioBroker-Adapter-Check-Befunde behoben:

- (Stefan Bühler) **[E254]** News-Einträge für 0.1.1/0.1.2 entfernt - diese Tags wurden zwar gepusht, aber der zugehörige npm-Publish-Job schlug damals fehl (fehlendes NPM_TOKEN bzw. zu alte npm-CLI für OIDC), die Versionen existieren nie auf npm
- (Stefan Bühler) **[W132]** dadurch automatisch unter dem 7-Einträge-Limit des Repository-Builders für `common.news`
- (Stefan Bühler) **[W184]** veraltetes `common.title` entfernt (durch `common.titleLang` ersetzt) und veraltetes/ignoriertes `common.main` entfernt (Entry-Point kommt aus `package.json`)
- (Stefan Bühler) **[W034]** `@iobroker/adapter-core` von ^3.1.6 auf ^3.2.2 angehoben
- (Stefan Bühler) **[W173]/[W174]/[E999]/[W401]**: `password` ist bereits korrekt in `encryptedNative`/`protectedNative` gelistet (per Tarball-Inspektion verifiziert) - diese Meldungen sowie der globale Axios-404-Fehler beim Abruf von `sources-dist-latest.json` sind Nebenwirkungen davon, dass der Adapter noch nicht im offiziellen ioBroker-Repository gelistet war

### 0.1.7 (2026-07-19)

- (Stefan Bühler) Branding: Platzhalter-Icon durch das offizielle GoodWe-Logo ersetzt (mit Genehmigung von GoodWe verwendet)

### 0.1.6 (2026-07-18)

- (Stefan Bühler) Dev-Toolchain aktualisiert: mocha 11, sinon 22, @alcalzone/release-script 5, @iobroker/eslint-config 2; verbleibende transitive CVEs (adm-zip, diff, esbuild, serialize-javascript) per npm-`overrides` erzwungen behoben - `npm audit`: 0 Schwachstellen (auch inkl. Dev-Dependencies)

Sicherheits-/Qualitätsaudit (Security-Tester, Maintainer-Review, Fuzzing der Mapping-Schicht):

- (Stefan Bühler) **Security:** Wechselrichter-Seriennummern aus der (nicht vertrauenswürdigen) Portal-Antwort werden bereinigt, bevor sie Teil von ioBroker-Objekt-IDs werden (verhindert kaputte/unerwartet verschachtelte Objektbäume durch Sonderzeichen wie `.` `*` `]`)
- (Stefan Bühler) **Security:** die vom Login-Server gelieferte API-Basis-URL wird validiert - nur HTTPS auf GoodWe-eigenen Domains (`*.semsportal.com`, `*.goodwe.com`), sonst Fallback auf die bekannte Regional-URL. Eine manipulierte Login-Antwort kann das Session-Token damit nicht mehr an fremde Hosts umleiten
- (Stefan Bühler) **Fix:** `null`/defekte Einträge im `inverter[]`-Array des Portals ließen den kompletten Poll-Zyklus abstürzen - werden jetzt übersprungen, gesunde Wechselrichter derselben Antwort werden weiter verarbeitet
- (Stefan Bühler) **Fix:** Zahlen in Exponentialschreibweise (`"1e5"`) wurden falsch geparst (ergab 15 statt 100000)
- (Stefan Bühler) **Fix:** offensichtlich ungültige Portal-Zeitstempel (`99/99/9999 …`) erzeugten durch JS-Date-Rollover absurde Epochen-Werte - werden jetzt verworfen
- (Stefan Bühler) **Fix:** automatische Anlagen-Erkennung filtert Einträge ohne verwertbare ID (verhinderte sonst dauerhafte Fehlzyklen)
- (Stefan Bühler) **Robustheit:** keine State-Writes mehr nach Adapter-Unload; `adapterError`-Dedupe wird nach Erholung ebenfalls zurückgesetzt
- (Stefan Bühler) 14 neue Regressionstests (42 Unit-Tests gesamt); `npm audit`: 0 Schwachstellen in Produktions-Dependencies (verbleibende betreffen ausschließlich Dev-Toolchain)

### 0.1.5 (2026-07-18)

- (Stefan Bühler) fix: PayPal-Spendenlink im README korrigiert (Button-Link statt Donate-Link)

Ältere Changelog-Einträge stehen in [CHANGELOG_OLD.md](https://github.com/bueste/ioBroker.goodwe-sems/blob/main/CHANGELOG_OLD.md) (Englisch).