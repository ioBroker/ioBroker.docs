---
chapters: {"pages":{"en/adapterref/iobroker.zeptrion/README.md":{"title":{"en":"ioBroker.zeptrion"},"content":"en/adapterref/iobroker.zeptrion/README.md"},"en/adapterref/iobroker.zeptrion/README_de.md":{"title":{"en":"ioBroker.zeptrion"},"content":"en/adapterref/iobroker.zeptrion/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zeptrion/README_de.md
title: ioBroker.zeptrion
hash: PCYPBAP9QA8c3nmVrkS/1lhMLRuAAJhPM3JYE56o/xk=
---
# ioBroker.zeptrion

![Версия NPM](https://img.shields.io/npm/v/iobroker.zeptrion.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zeptrion.svg)
![Тесты](https://github.com/bueste/ioBroker.zeptrion/workflows/Test%20and%20Release/badge.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)
![Спенден](https://img.shields.io/badge/Spenden-PayPal-blue.svg)
![Купи мне кофе](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

![Логотип](../../../en/adapterref/iobroker.zeptrion/admin/zeptrion.png)

Адаптер для [Feller](https://www.feller.ch/) **[Zeptrion / zApp](https://www.feller.ch/de/connected-buildings/zeptrion)** WLAN-Aktoren (WLAN-Nebenstelle 4K = zApp-Gateway, WLAN-Zwischenmodul 2K = zApp-Booster) для Licht- und Storensteuerung, basierend auf der Zrap Webservice API (Feller-Dokument 10.ZEPAPI-E.1612 / Версия 1.0, встроенное ПО ab 01.08.18).

## Funktionsumfang

- **Управление каналами** (`zrap/chctrl` ): вкл/выкл/стоп/переключение, открыть/закрыть, переместить\_открыть/переместить\_закрыть, увеличить\_затемнение/уменьшить\_затемнение, включая временные ограничения (`_t` в мс), sowie Szenen cancel\_s1-4 / store\_s1-4 / delete\_s1-4 - als einzelne Buttons UND als freeies`command` -Текстфельд.
- **Каналзустанд** (`zrap/chscan` als periodischer Resync +`zrap/chnotify` также Long-Poll-Push für nahezu Echtzeit-Updates) и **Kanalbeschreibung** (`zrap/chdes` , чтение/запись: имя, группа, значок, тип, категория).
- **Geräteinformationen** (`zrap/id` ): Версия аппаратного обеспечения/программного обеспечения/загрузчика, серийный номер, имя системы, типовой код.
- **Сигнальная башня** (`zrap/rssi` , gepollt).
- **Статус сети** (`zrap/net` , только для чтения): SSID, IP, MAC, Modus, Verschlüsselung, Maske, Gateway.
- **Systembefehle** (`zrap/sys` ): Neustart, Werksreset, Zurücksetzen в режиме точки доступа.
- **Стандор** (`zrap/loc` ), **NTP-Конфигурация** (`zrap/ntp` ) и **Дата/Время** (`zrap/date` ) вкл. Ein-Klick-Synchronisation der Geräte-Uhrzeit с ioBroker-Host.
- **mDNS-Discovery** (глава 4 документа API): durchsucht das lokale Netz nach zeptrion-Geräten und übernimmt Funde deaktiviert in die Konfigurationstabelle (Discovery kombiniert mit manueller Kontrolle/Aktivierung).
- **Sammelbefehle für Hagelalarm** :`control.closeAllShutters` /`openAllShutters` /`stopAllShutters` Все настроенные каналы всегда активны.
  - Данк Multicast-Bündelung (siehe unten) как EIN Request pro Gerät, nicht pro Channel.
- **Multicast-Befehlsbündelung** : Канал передачи сообщений, внутренний интервал в течение 50 мс автоматически включается в работу`zrap/chctrl` -Multicast-POST доступен (глава 3.6.5 der API-Doku) для отслеживания последовательности запросов Einzel.
- **Storen-Positionsschätzung** (опционально,`posEstimate` ): da die Hardware laut Doku für Storenkanäle praktisch immer`-1` (unbekannt) Liefert, kann pro Gerät eine Motor-Laufzeit Hinterlegt Werden; der Adaptor schätzt daaus die Position and bewegungsrichtung und verstrichener Zeit (Best Effort, kein Hardware-Feedback, manuell kalibrierbar).
- **Smartfront-Unterstützung** (опция,`zapi/smartfront/*` ): Температура/Хеллигкейт/Люфтфеухтигкеит Ауслесен, светодиодная установка (для настройки с использованием функции Feller-Smartfront-Taster, флажок в конфигурации).
- Надежная обработка ошибок: используется ECONNREFUSED/Timeout/DNS-Fehler, Backoff bei wiederholten Fehlern, pro Gerät und global sichtbarer Verbindungsstatus. mDNS-Discovery не может быть исключен из исключений во время/выключения сетевого пакета.

Nichtimplementiert (siehe "Bekannte Einschränkungen"): Schreibzugriff auf`zrap/net` (WLAN-Zugangsdaten ändern),`zrap/scheduler` , Smartbutton-Webhook-Программирование (`zapi/smartbt/*` ).

## Установка

Admin-Oberfläche -> Адаптер -> "zeptrion" suchen -> Installieren.

## Конфигурация

- **HTTP Timeout** : Timeout pro Request an ein Gerät (Default 4000 ms).
- **Кнопка обнаружения** : durchsucht das lokale Netz для mDNS (тип службы`_zapp._tcp` , Отступать`_http._tcp` для прошивки < 01.08.xx и для проверки имени хоста`zapp-YYWWNNNN` ). Если вы не хотите, чтобы ваша таблица была **деактивирована** в дополнительной таблице, вы можете указать идентификатор/имя, контрольный канал (3340-4-x = 4 канала, 3340-2-x = 2 канала) и активировать его. mDNS функционирует для внутренних сегментов сети/VLAN.
- **Информационная таблица** (также полная инструкция для Discovery):
  - `Aktiv` ,`ID` (az 0-9 \_ -),`Bezeichnung` ,`IP-Adresse/Hostname` ,`Kanäle` (1-4),`Art` (Storen/Licht/unbekannt - steuert die ioBroker-Objektrollen, siehe unten),`Laufzeit Storenmotor` (Секунда, 0=деактивировать - отключить`posEstimate` frei, siehe unten, gilt als Standard für alle Kanäle),`Laufzeit/Kanal` (optional, kommagetrennt, zB)`22,28` - überschreibt die Standard-Laufzeit einzeln je Kanal; nützlich bei 2K-Geräten, deren beide Kanäle unterschiedliche Motor-Laufzeiten haben; leere Einträge упал на Standard-Laufzeit zurück),`Smartfront` (Флажок, при котором активируется Feller-Smartfront-Taster),`Poll (s)` (По умолчанию 30, для RSSI + периодического сканирования-Resync; собственные каналы обновлений будут отключены после chnotify-Long-Poll).

## Objektbaum pro Gerät (`zeptrion.0.<id>` )

```
<id>.info.connection / lastError / hw / sw / boot / sn / sys / type / oen / rssi / refresh
<id>.network.ssid / ip / mac / mode / enc / mask / gw / bssid        (read-only)
<id>.system.reboot / unlock / factoryDefault / networkDefault      (Buttons; factoryDefault erfordert unlock binnen 30s)
<id>.location.name                                                  (read/write)
<id>.ntp.url / per                                                   (read/write)
<id>.date.rfc1123 / tz / dst / syncNow                               (read/write + Button)

<id>.channels.chN.val                                    Kanalzustand 0-100 / -1 (roher Hardwarewert)
<id>.channels.chN.posEstimate                             nur bei Art=Storen: Software-Positionsschätzung
                                                           0=zu/100=offen, auch manuell schreibbar (Kalibrierung)
<id>.channels.chN.name / group / icon / type / cat        Kanalbeschreibung (read/write)
<id>.channels.chN.command                                 freies Kommando (String)
<id>.channels.chN.stop / on / off / toggle / open / close /
                  move_open / move_close / dim_up / dim_down        (Buttons)
<id>.channels.chN.recall_s1..4 / store_s1..4 / delete_s1..4          (Buttons)

<id>.smartfront.temp / lux / hum       nur wenn "Smartfront" aktiviert (read)
<id>.smartfront.ledState               aktueller LED-Status als JSON (read)
<id>.smartfront.ledSet                 LED(s) setzen, JSON-Array (write)
```

Глобальный:

```
info.connection                mind. ein Gerät erreichbar
control.closeAllShutters       Button: ALLE konfigurierten Kanäle -> "close"
control.openAllShutters        Button: ALLE konfigurierten Kanäle -> "open"
control.stopAllShutters        Button: ALLE konfigurierten Kanäle -> "stop"
```

## Objekt-Rollen und "Art" (вид)

Die zrap-API selbst unterscheidet nicht zwischen Licht- und Storenkanal - das steckt allein in der Verkabelung/im Aktor. Damit Visualisierungen (VIS, evtl. spätere ioBroker.iot/Alexa-Anbindung) Каналы trotzdem sinnvoll klassifizieren können, kann pro Gerät die "Art" gesetzt werden:

| Искусство                | `<ch>.val` Ролле | `stop` /`open` /`close` Ролле                            |
| ------------------------ | ---------------- | -------------------------------------------------------- |
| Сторэн/Ролладен          | `level.blind`    | `button.stop` /`button.open.blind` /`button.close.blind` |
| Свет                     | `level.dimmer`   | щедрый`button`                                           |
| unbekannt (По умолчанию) | `value`          | щедрый`button`                                           |

Важно:`level.blind` täuscht **keine** echte Positionsrückmeldung vor - laut Feller-Dokuliefert`chscan` /`chnotify` für einen Storenkanal, так что все будет в порядке`-1` (необдуманно), если аппаратное обеспечение не установлено в нужном положении. Die Rolle verbessert nur die Erkennung durch VIS-Widgets, der Zahlenwert bleibt idR uninformativ.

## Hagelalarm-Nutzung

```javascript
// JavaScript-Adapter Beispiel
on({id: 'wetter.0.warnungen.hagel', val: true}, function () {
    setState('zeptrion.0.control.closeAllShutters', true);
});
```

Fehler bei einzelnen Geräten (оффлайн и т. д.) для использования неактивных каналов - jeder fehlgeschlagene Kanal wird einzeln geologgt und in`<id>.info.lastError` vermerkt.

## Bekannte Einschränkungen / bewusste Entscheidungen

- **Smartbutton-Webhook-Программирование** (`zapi/smartbt/prgm` /`prgn` /`prgs` ) это не реализовано: дабеи руфт дер Taster bei Tastendruck прямой URL-адрес на ioBroker auf (echtes Push, ganz ohne Polling). Если вы хотите использовать HTTP-сервер в выбранном адаптере, то это не является действительным — большая архитектура, kein kleiner Zusatz. Bleibt als möglicher zukünftiger Ausbauschritt documentiert.
- **Schreibzugriff auf`zrap/net`** это не реализовано - WLAN-данные указаны для использования сценария, который может вызвать риск (Verbindungsverlust, Reboot notig). Kann bei Bedarf ergänzt werden.
- **Планировщик (`zrap/scheduler` )** и **zeptrionAir-Smartfront-Services** (`zapi/smartfront/*` ,`zapi/smartbt/*` ) если он не реализован, то вариант использования Storen/Hagel не имеет значения. Die vorhandene`zrapGet` /`zrapPost` -Структура в`main.js` lässt sich leicht erweitern.
- `chctrl` liefert laut Doku HTTP 302 ohne Body — перенаправления werden bewusst nicht verfolgt (`maxRedirects: 0` ), um unnötige Zusatzrequests zu vermeiden.
- Bei wiederholten Fehlern eines Geräts wird das Poll-Intervall bis Maximum das 5-fache verlängert (einfacher Backoff).

## Разработка / Тесты

```bash
npm install
npm run lint
npm test              # Package-Konsistenz + Unit-Tests
npm run test:integration   # startet echten js-controller (dauert länger)
```

## Changelog

### 1.0.5 (2026-07-22)
- Admin-UI: Die drei `validatorErrorText`-Meldungen sind jetzt Inline-i18n-Objekte statt reiner englischer Texte (ioBroker-Checker W5617).
- Abhängigkeiten: Deklarierte Mindestversionen für `bonjour-service` (^1.2.1 -> ^1.4.3) und `eslint` (^10.6.0 -> ^10.7.0) angehoben; beide waren durch die bestehenden Caret-Ranges ohnehin abgedeckt, daher keine Verhaltensänderung.

### 1.0.4 (2026-07-21)
- Nur Dokumentation: Buy-Me-a-Coffee-Link neben dem PayPal-Spenden-Badge ergänzt. Keine funktionalen Änderungen.

### 0.7.0 (2026-07-10)
- Skalierung für 20+ Geräte: paralleles Setup, Poll-Jitter, Duplikat-Erkennung
- Strikte Startup-Validierung jeder konfigurierten Geräte-Zeile
- CSV-Massenimport (eigener Konfig-Tab) mit Zeilen-Validierung und Auto-ID
- FIX: Positionsschätzung nach Stopp während Endlagenfahrt korrekt
- FIX: Adapter-Timer-Cleanup (this.clearTimeout), führende Nullen in chdes-Codes bleiben erhalten

### 0.6.0 (2026-07-10)
- Auto-ID aus Host, Geräte-Test-Button (Erreichbarkeit + zeptrion-Verifikation + Kanalzahl-Prüfung)
- Kanal-Objektnamen aus dem Gerät (chdes), neues Icon, Geräte-Icons

### 0.5.1 (2026-07-10)
- KRITISCHER FIX: XML-Parser übersprang die Nutzdaten wegen des XML-Deklarations-Keys - alle GET-Werte blieben in 0.5.0 null

### 0.5.0 (2026-07-07)
- setPosition: zeitbasierte %-Anfahrt für Storen (Chunking wegen 32s-API-Limit, Referenzfahrt bei unbekannter Position)
- tiltOpen/tiltClose: Lamellen-Kipp-Impulse (konfigurierbare Impulsdauer)
- calibrate: Positionsschätzung ohne Fahrt setzen

### 0.4.0 (2026-07-07) - Security- & Qualitäts-Härtung
- **Verriegelter Werksreset**: `system.factoryDefault` funktioniert nur noch innerhalb
  von 30s nach Setzen von `system.unlock` - ein einzelner versehentlicher setState aus
  Script/VIS kann das Gerät nicht mehr plätten.
- **Crashsicheres onStateChange**: der komplette Handler (inkl. der Sammelbefehle) läuft
  jetzt in einer zentralen Fehlerbehandlung - keine Unhandled Promise Rejections mehr
  möglich.
- **Eingabevalidierung**: Kanalbeschreibung (32/32/24/4/4 Bytes UTF-8), Standort (32),
  NTP-URL (32) und NTP-Intervall (0-255) werden vor dem Senden geprüft; klare
  Fehlermeldung statt HTTP-400 vom Gerät. Umlaute zählen korrekt als 2 Bytes.
- **Adapter-verwaltete Timer** (`this.setTimeout`) überall - automatische Aufräumung
  beim Unload gemäss ioBroker-Guidelines.
- **Verbindungs-Ökonomie**: solange der chnotify-Long-Poll gesund läuft, wird der
  redundante chscan-Resync nur noch bei jedem 5. Poll ausgeführt (schont die
  schwachen Embedded-Webserver der Unterputzaktoren).
- **chnotify abschaltbar** (Experten-Tab) für Umgebungen mit Verbindungsproblemen.
- **Admin-UI neu**: Tabs (Geräte/Experten), durchgängig EN+DE, Eingabe-Validatoren
  (ID-Muster, Host-Muster), Tooltips an jeder Spalte, Sicherheitshinweis.
- ESLint auf Flat Config (v9) migriert, Lint läuft sauber durch; Smoke-Tests für
  Kommando-Validierung, Byte-Limits, Positionsmathematik und Multicast-Body.

### 0.3.0 (2026-07-07)
- Kanalbefehle desselben Geräts werden innerhalb eines 50ms-Fensters automatisch zu
  einem einzigen Multicast-POST an `/zrap/chctrl` gebündelt statt sequentiell einzeln
  gesendet - insbesondere `control.closeAllShutters` (Hagelalarm) profitiert davon
  massiv (ein Request pro Gerät statt einer pro Kanal).
- Optionale zeitbasierte Storen-Positionsschätzung (`posEstimate`) anhand konfigurierbarer
  Motor-Laufzeit, da die Hardware selbst keine Position zurückmeldet.
- Optionale Smartfront-Unterstützung (`zapi/smartfront/*`): Temperatur/Helligkeit/
  Feuchtigkeit auslesen, LED-Hintergrundfarbe setzen.
- Rollen-Korrektur: `level.blind` sitzt jetzt auf der Positionsschätzung statt auf dem
  rohen (meist -1) Hardwarewert.

### 0.2.0 (2026-07-07)
- Kanalzustände werden jetzt primär über `zrap/chnotify` (Long-Poll) nahezu in
  Echtzeit aktualisiert statt nur per Intervall-Polling; `chscan`-Poll bleibt als
  periodischer Resync/Fallback erhalten.
- Zusätzliches Sicherheitsnetz (Busy-Window, 5s) verhindert, dass ein zeitgleicher
  chscan-Resync einen gerade gesendeten Bewegungsbefehl mit einem veralteten Wert
  überschreibt.
- mDNS-Discovery-Handler gegen Exceptions durch fremde/kaputte Netzwerkpakete
  abgesichert (try/catch je Service-Event statt nur um die Subscription herum).
- Neues Geräte-Feld "Art" (Storen/Licht/unbekannt) steuert Standard-Objektrollen
  (`level.blind`, `button.stop`, `button.open.blind`, `button.close.blind` bzw.
  `level.dimmer`) für bessere VIS-/Smart-Home-Integration.
- Strukturierte `native`-Metadaten (Host, Kanalnummer, Art) an Geräte-/Kanal-Objekten.

### 0.1.0 (2026-07-07)
- Erste Version: Kanalsteuerung, Kanalzustand/-beschreibung, Geräte-/Netzwerkinfo,
  Systembefehle, Standort/NTP/Datum, Sammelbefehle für Hagelalarm, mDNS-Discovery.

## License

MIT License

Copyright (c) 2026 Stefan Bühler

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