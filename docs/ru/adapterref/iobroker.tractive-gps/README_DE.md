---
chapters: {"pages":{"en/adapterref/iobroker.tractive-gps/README.md":{"title":{"en":"ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/README.md"},"en/adapterref/iobroker.tractive-gps/README_DE.md":{"title":{"en":"ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/README_DE.md"},"en/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md":{"title":{"en":"Developer documentation for ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tractive-gps/README_DE.md
title: ioBroker.tractive-gps
hash: uRR3zyQhEWf5v1b3dzQXPfvWJiZJScwCOrP+PGIHI40=
---
![Логотип](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)
![Версия NPM](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/tractive-gps-stable.svg)
![Количество установок](https://iobroker.live/badges/tractive-gps-installed.svg)

# ioBroker.tractive-gps

**Версия:**

## Haftungsausschlus

Alle in diesem Projekt genannten Produkt- und Firmennamen, Logos und Marken gehören ihren jeweiligen Eigentümern. Tractive und die damit verbunden Namen, Logos und Marken sind Eigentum der Tractive GmbH beziehungsweise ihrer Jeweiligen Rechteinhaber. Ihre Verwendung dient ausschließlich der Identifikation und bedeutet weder eine Verbindung mit noch ein Sponsoring ore eine Unterstützung durch die Tractive GmbH или mit ihr verbundene Unternehmen. Dies ist ein in Private, nicht komerzielles Projekt, das zu Freizeitzwecken entwickelt wird.

## Часовой

**Этот адаптер предназначен для Sentry-Bibliotheken, а также автоматического и программного обеспечения, а также для облегчения работы.** Weitere Einzelheiten und eine Anleitung zum Deaktivieren der Fehlerberichterstattung enthält die [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Приложение Sentry-Fehlerberichterstattung работает с js-контроллером 3.0.

## Описание

Адаптер позволяет использовать ioBroker с Tractive-Konto и получать актуальную информацию о домах и GPS-трекерах, а также ioBroker-Datenpunkte. Используйте позиционирование, аккумуляторы, настройки, информацию и дополнительные функции отслеживания в автоматическом и визуальном режиме.

Адаптер является неофициальным сервисным центром Tractive-Service. Функциональные возможности Tractive-Konto и активные подписки для трекера доступны для просмотра. Адаптер сообщества Dieser предназначен для использования с Tractive, когда он используется Tractive unterstützt.

> [Документация на английском языке](/#/adapters/tractive-gps)

## Voraussetzungen

- Node.js 22.13 или более новая версия
- js-контроллер 7.2.2 или новый
- Администратор 7.8.23 или новый
- VIS 1 или VIS 2 ab версии 2.12.8 для виджетов; версия позолочена для VIS 2
- Tractive-Konto mit Mindestens Einem zugeordneten Tracker

## Функции

- Ruft die echten Namen und Profildaten der mit dem Konto verbunden Tiere ab.
- Вы должны знать координаты GPS, высоту, значения, позиции, настройки, настройки ioBroker-Standort и Aktualisierungszeit.
- Kann Koordinaten необязательно в eine lesbare Adresse umwandeln.
- Stellt Batteriesstand, Ladezustand, verwendete Positionsquelle (`KNOWN_WIFI` /`GPS` ), Zuhause-/Unterwegs-Status, Online-Status und Energiesparzustand bereit.
- Liefert Modell, Firmware, Hardwareversion, Fähigkeiten, Geschlecht, Geburtstag, Größe, Gewicht und weitere verfügbare Informationen.
- Благодаря отслеживанию в реальном времени, светодиодам и сигналам трекер оснащен множеством функций.
- Speichert alle abgerufenen Konto-, Abonnement-, Freigabe-, Tier-, Tracker-, Positions- und Hardwaredaten als logischen lokalen Datenbaum sowie als vollständigen JSON-Schnappschuss.
- Получите отзывчивую карту для VIS 1 и VIS 2 с Tierbild, интерактивной картой, Bereichsanzeige, Tracker-Status и Befehlssteuerung.
- Unterstützt ein von Tractive bereitgestelltes Bild или ein eigenes, в ioBroker hochgeladenes Bild.
- Если вы хотите, чтобы данные или данные Tracker были проверены, они автоматически возвращались к объекту.

## Конфигурация

Die Adaptinstanz öffnen und folgende Einstellungen vornehmen:

| Einstellung                        | Описание                                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Электронная почта                  | Адрес электронной почты Tractive-Kontos.                                                                       |
| Пароль                             | Пароль Tractive-Kontos. Это значит, что ioBroker-Standardverfahren verschlüsselt Gespeichert.                  |
| Aktualisierungsintervall           | Zeit zwischen den regularen Positionsabfragen. Zur Auswahl stehen 2 до 60 минут.                               |
| Координаты в eine Adresse auflösen | Ruft eine lesbare Adresse zu den aktuellen Koordinaten ab. Деактивируйте, когда будет указан правильный адрес. |

Mit **Verbindung testen** können die eingegebenen Zugangsdaten geprüft werden. Все настройки были отменены с помощью обычной кнопки ioBroker-Button **Speichern** в конце конечной настройки конфигурации.

Когда вы впервые услышите пароль, когда пароль будет прочитан, вы увидите. Пароль в формате ioBroker-Verschlüsselungsformat автоматически используется для автоматического ввода пароля в актуальном формате AES.

### Актуализация данных

- Positionen werden entsprechend dem eingestellten Aktualisierungsintervall abgerufen.
- Информация о батарее и оборудовании предоставляется каждые 15 минут.
- Уровневый профиль, изображения и статистика всегда будут актуальными.
- Когда вы начнете использовать адаптеры, это будет необходимо во время работы.

Трактивный доступ может быть открыт с HTTP 429. При использовании адаптера, вращающегося в месте установки, необходимо приостановить работу, чтобы начать работу с устройствами и автоматическим подключением. Eine erfolgreiche Aktualisierung — это`info.lastSuccessfulSync` унд`info.dataFresh` erkennbar.

## Объекты и точки данных

Die wichtigsten Objekte sind folgendermaßen gegliedert:

```text
tractive-gps.0
├── info
│   ├── connection
│   ├── dataFresh
│   ├── lastSync
│   ├── lastSuccessfulSync
│   ├── currentApi
│   ├── refresh
│   └── status
├── account.*
├── subscriptions.<subscription-id>.*
├── pets.<pet-id>
│   ├── info.*
│   ├── activity.*
│   └── media.*
├── trackers.<tracker-id>
│   ├── info.*
│   ├── status.*
│   ├── location.*
│   ├── hardware.*
│   └── commands.*
```

### Adapterinformationen

- `info.connection` : Zeigt an, ob die letzte Synchronisierung erfolgreich war.
- `info.dataFresh` : Zeigt an, ob aktuelle nutzbare Daten vorhanden sind.
- `info.lastSync` : Zeitpunkt des letzten Synchronisierungsversuchs.
- `info.lastSuccessfulSync` : Zeitpunkt der Letzten erfolgreichen Synchronisierung.
- `info.refresh` : Taster zum manuellen Starten eines vollständigen Abgleichs.
- `info.status` : Актуальный статус адаптера.
- `info.currentApi` : Vollständiger JSON-Schnappschuss der aktuell verfügbaren Tractive-Daten.

### Тьер

Die Datenpunkte unter`pets.<pet-id>.*` enthalten nutzliche Tierprofildaten, Tracker-Zuordnung, Aktivitätsziele und das Profilbild. Подробная информация и внутренний API-Felder weggelassen.

### Трекер

Die Datenpunkte unter`trackers.<tracker-id>.*` Enthalten Tracker-Kennung, Betriebs- und Onlinestatus, Position, Positionsquelle, Entfernung zum ioBroker-Systemstandort, Adresse, Batterieinformationen und unterstützte Befehle.`location.sensorUsed` enthält die Tractive-Positionsquelle.`status.home` wird aus`KNOWN_WIFI` beziehungsweise`GPS` абгелитет. Эйнен доппельтен Датенпункт`connectionType` gibt es nicht mehr. Breiten- und Längengrad des ioBroker-Standorts werden in den Systemeinstellungen festgelegt.

### Vollständige API-Daten

Ну, для сценариев, автоматизации и визуализации без каких-либо ошибок, которые можно было бы использовать в качестве ангельских дат. Ознакомьтесь с метаданными API, внутренними версиями и дополнительными сведениями о них. Комбинированные ответы на ваши вопросы в формате JSON-Wert`info.currentApi` верфюгбар. Anmeldepasswort и Zugriffstoken не используются.

## Трекер-Бефеле

Если вы хотите, чтобы трекер ювелирных изделий работал с драгоценными камнями, вы можете использовать следующие функции:

- `trackers.<tracker-id>.commands.liveTracking`
- `trackers.<tracker-id>.commands.led`
- `trackers.<tracker-id>.commands.buzzer`

Der gewünschte Datenpunkt wird auf`true` Одер`false` гесетц. Лучше всего, чтобы получить Tractive den Befehl angenommen шляпу.

## VIS-виджеты

Адаптер — это классический вариант`PetTrackerCard` для VIS 1 sowie eine родной React-`PetTrackerCard` Для VIS 2. Для использования Tier beziehungsweise jeden Tracker wird ein eigenes Widget eingefügt und in den Widget-Einstellungen mit den Gewünschten Datenpunkten verbunden.

Die Karte kann Folgendes anzeigen:

- Название уровня, Tierart, Geschlecht, Alter und Gewicht,
- Имя трекера и онлайн-статус,
- Tierbild aus dem lokalen Datenpunkt`media.localProfilePictureUrl` ,
- интерактивная листовка-/OpenStreetMap-Карта,
- драгоценный камень или мануэль eingestellter Positionsradius,
- Подставка для аккумулятора, Positionsquelle, Zuhause-/Unterwegs-Status und Entfernung zu ioBroker,
- letzte Aktualisierung, Adresse, Energiesparzustand, Ladezustand, Geschwindigkeit, Höhe und Positionsgenauigkeit,
- Schalter für Signalton, LED и Live-Tracking bei unterstützten Trackern.

Für das Tractive-Bild wird`pets.<pet-id>.media.localProfilePictureUrl` также Bilddatenpunkt ausgewählt. Вы указываете URL-адрес на локальном компьютере ioBroker-Dateispeicher abgelegten Kopie. Wird kein Bild geliefert или cann es nicht geladen werden, lässt sich im Widget-Bereich **Darstellung** ein eigenes Bild auswählen order hochladen.

Die Karte kann den vollständigen Genauigkeits- или Bereichskreis autotisch einpassen. Минимальное и максимальное масштабирование, измерение, изменение и изменение радиуса можно выполнить на панели конфигурации Widget-Einstellungen. Карта доступна на карте OpenStreetMap.

Für die Befehlsschalter werden die zugehörigen Datenpunkte unter`trackers.<tracker-id>.commands.*` im Widget-Bereich **Befehle** zugeordnet. Während der Bearbeitung der VIS-Ansicht sind die Befehle gesperrt; im Laufzeitmodus lassen sie sich bedienen.

## Datenschutz und Sicherheit

- Этот пароль будет использоваться для получения дополнительных настроек ioBroker-Konfigurationsverfahren.
- Zugriffstoken bleiben im Arbeitsspeicher und werden autotisch erneuert.
- Ausgewählte Konto- und Abonnementinformationen werden im logischen Objektbaum Gespeichert. Die vollständigen abgerufenen API-Datan werden local in`info.currentApi` абгелегт. Der Zugriff auf den ioBroker-Objektbaum sollte entsprechend geschützt werden.
- Пароль и Zugriffstoken используются для API-данных, которые не являются подсказками и не используются в дополнительных конфигурациях без настройки в Arbeitsspeicher.
- Если вы находитесь в локальном положении в ioBroker-Datenpunkten, то это означает, что функция адаптеров не работает.
- Die Rückwärts-Geokodierung не является обязательным и отправляется в активную координацию по адресу Tractive.
- Sentry-Fehlerberichterstattung richtet находится в глобальном масштабе ioBroker-Sentry-Konfiguration.
- API-Antwortinhalte und der vollständige locale Schnappschuss werden weder in das Adaptorprotokoll geschrieben noch ausdrücklich an Sentry übertragen.

## Fehlerbehebung

- **Verbindungstest schlägt fehl:** адрес электронной почты, пароль, подключение к Интернету и подключение к HTTPS-запросу.
- **На панели управления или панели Tracker:** нажмите кнопку Tracker, чтобы активировать Tractive-Konto, и отключите адаптер, который не запустится.
- **Дата недействительна:**`info.status` ,`info.dataFresh` унд`info.lastSuccessfulSync` prüfen.
- **HTTP 429 выдает сообщение:** Die Instanz weiterlaufen lassen. Адаптер приостанавливает работу и автоматически включается при включении тягового механизма.
- **Адрес электронной панели:** Rückwärts-Geokodierung в активной конфигурации адаптера.
- **Эйн Бефель чувствовал:** Der Tracker не дает покоя.
- **Tierbild fehlt:**`localProfilePictureUrl` Im Widget zuordnen или ein eigenes Bild auswählen.

## Разработка документации

Информация для Mitwirkende stehen в [Entwicklerdocumentation](/#/docs/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md) .

## Кредиты

Ursprünglich erstellt von [xXBJXx](https://github.com/xXBJXx) und gepflegt durch die Organization Адаптеры сообщества ioBroker.

## Лицензия

Авторские права (c) 2023-2026 ioBroker Community Developers <iobroker-community-adapters@gmx.de>\
&#x20;Авторские права (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

Лицензия MIT. См. [ЛИЦЕНЗИЮ](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/blob/main/LICENSE) .

## Changelog

### 3.1.0 (2026-08-25)

- (xXBJXx) Hinweise des Repository-Checkers zu Abhängigkeiten, Metadaten, Dokumentation und adapterverwalteten Timern behoben (#319).
- (xXBJXx) Eine klassische VIS-1-Tierkarte zusätzlich zum nativen VIS-2-Widget ergänzt und korrekt registriert, einschließlich Tierbild, Leaflet-Karte, Positions- und Tracker-Details, automatischer Theme-Farben und Tracker-Befehlssteuerung.

### 3.0.0 (2026-08-24)

- (xXBJXx) BREAKING: vollständig für Node.js 22, js-controller 7.2.2 und Admin 8 neu geschrieben.
- (xXBJXx) Sentry über die ioBroker-Adapterintegration eingerichtet (#4).
- (xXBJXx) Gespeicherte Autorisierungsdaten durch eine Anmeldung im Arbeitsspeicher, automatische Token-Erneuerung, Antwortprüfung, Wiederholungen und kontoweite Ratenbegrenzung ersetzt (#16, #115, #213, #231).
- (xXBJXx) Objektstrukturen `pets.*`, `trackers.*` und Zustandsinformationen ergänzt.
- (xXBJXx) Tiernamen korrigiert sowie alle verfügbaren Tierprofildaten mit richtigen Größen- und Gewichtseinheiten ergänzt.
- (xXBJXx) Fehlende Datenpunktdefinitionen für zuvor unbekannte API-Felder korrigiert (#81, #113, #305; ersetzt #114 und #175).
- (xXBJXx) Die doppelte API-Hierarchie durch einen ausgewählten Datenbaum für Konto, Abonnements, Tiere, Tracker, Position und Hardware ersetzt und den vollständigen JSON-Schnappschuss beibehalten.
- (xXBJXx) `sensor_used` und Entfernung zu ioBroker auf Grundlage von PR #3 wiederhergestellt, den Zuhause-/Unterwegs-Status ergänzt und den doppelten Datenpunkt `connectionType` entfernt.
- (xXBJXx) Tractive-CDN-URLs für Profilbilder korrigiert und Zuhause-/Unterwegs-Status sowie Entfernung zur VIS-2-Karte hinzugefügt.
- (xXBJXx) Tractive-Profilbilder in ioBroker zwischengespeichert, damit VIS 2 die als Binärdownload ausgelieferten CDN-Dateien anzeigen kann.
- (xXBJXx) Die Profilbildablage durch einen eigenen ioBroker-Dateicontainer vom Typ `meta` korrigiert.
- (xXBJXx) Lokale Profilbild-URL, textuellen Ladezustand, Geschwindigkeit und Höhe in die ausgewählten Datenpunkte und die VIS-2-Karte aufgenommen.
- (xXBJXx) Erkennung relativer ioBroker-Datei-URLs in `localProfilePictureUrl` korrigiert.
- (xXBJXx) Live-Tracking-, LED- und Signalton-Befehle für unterstützte Tracker ergänzt.
- (xXBJXx) Bedienelemente für Signalton, LED und Live-Tracking in die VIS-2-Karte aufgenommen.
- (xXBJXx) Die VIS-2-Karte in kompakte Bereiche für Befehle, Position, Tracker und Tierdaten gegliedert.
- (xXBJXx) Release-Werkzeuge aktualisiert und Lerna mit einheitlicher Versionierung für die privaten npm-Workspaces ergänzt.
- (xXBJXx) Adapterkonfiguration für Admin 8 erneuert und die ungültige jsonConfig-Konfiguration entfernt (#176).
- (xXBJXx) VIS-2-Widget `PetTrackerCard` mit Tierbild, Leaflet-/OpenStreetMap-Karte, Bereichsanzeige und Tracker-Informationen ergänzt.
- (xXBJXx) Unterstützung für Tractive-Profilbilder und eigene ioBroker-Bilder ergänzt.
- (xXBJXx) Automatische Farben für das helle und dunkle VIS-2-Theme ergänzt.
- (xXBJXx) Konfigurierbare Kartenbedienung, automatische Bereichsanpassung sowie minimalen und maximalen Zoom ergänzt.
- (xXBJXx) Passwortspeicherung auf serverseitige ioBroker-AES-Verschlüsselung mit automatischer Migration älterer Passwörter umgestellt.
- (xXBJXx) Wiederkehrende API-Anfragen reduziert und getrennte Aktualisierungsintervalle für Positionen, Batterieinformationen und statische Profildaten ergänzt.
- (xXBJXx) Adaptive Behandlung von HTTP 429, globale Anfragepausen, vorsichtige Wiederholungen und zwischengespeicherte Adressauflösung ergänzt.
- (xXBJXx) Lint-Prüfung auf ESLint 9 und `@iobroker/eslint-config` umgestellt (#45).
- (xXBJXx) Node.js 24 zur CI-Testmatrix hinzugefügt (#116).
- (xXBJXx) Automatische npm-Veröffentlichungen auf Trusted Publishing mit GitHub OIDC umgestellt (#169).
- (xXBJXx) Repository-Metadaten und Schema-Konfiguration aktualisiert und dadurch die Wartungs-PRs #214, #215, #216 und #291 ersetzt.
- (xXBJXx) Abhängigkeiten und Workspace-Werkzeuge aktualisiert und dadurch die PRs #91, #140, #147, #203, #211, #220, #256, #281, #298, #301 und #303 ersetzt.
- (xXBJXx) Tests, Dokumentation und Datenschutzmaßnahmen aktualisiert.

### 2.1.0 (2024-11-12)

- (mcm1957) Node.js 20 wird benötigt.
- (mcm1957) js-controller 5.0.19 und Admin 6.17.14 werden benötigt.
- (simatec) Oberfläche an die Regeln für responsives Design angepasst.
- (mcm1957) Fehler beim jsonConfig-Befehl zur erneuten Autorisierung korrigiert.
- (mcm1957) Abhängigkeiten aktualisiert.

### 2.0.1 (2024-08-20)

- (bluefox) Verschlüsselung des Zugriffstokens korrigiert.

### 2.0.0 (2024-08-18)

- (bluefox) BREAKING: Zugangsdaten müssen erneut eingegeben werden.
- (bluefox) Alten Code entfernt und Bedienoberfläche neu geschrieben.
- (bluefox) Abhängigkeiten aktualisiert.

### 1.2.0 (2024-04-28)

- (mcm1957) Node.js 18 und js-controller 5 oder neuer werden benötigt.
- (mcm1957) Abhängigkeiten aktualisiert.

### 1.1.0 (2023-11-05)

- (Scrounger) Objekte werden nur noch bei Bedarf erstellt.
- (Scrounger) Übermäßig viele Warnungen reduziert.
- (Scrounger) Entfernungsberechnung zwischen ioBroker und Tracker ergänzt.

Frühere Änderungen sind in [CHANGELOG_OLD.md](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/blob/main/CHANGELOG_OLD.md) dokumentiert.