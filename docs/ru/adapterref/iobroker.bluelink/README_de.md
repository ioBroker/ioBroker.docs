---
chapters: {"pages":{"en/adapterref/iobroker.bluelink/README.md":{"title":{"en":"ioBroker.bluelink"},"content":"en/adapterref/iobroker.bluelink/README.md"},"en/adapterref/iobroker.bluelink/README_de.md":{"title":{"en":"ioBroker.bluelink (Deutsche Dokumentation)"},"content":"en/adapterref/iobroker.bluelink/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bluelink/README_de.md
title: ioBroker.bluelink (Немецкая документация)
hash: LEQLpgG+YkMu8ZjeHKtxRSd17cnNHyAAmFjseiNR7cg=
---
![Логотип](../../../en/adapterref/iobroker.bluelink/admin/bluelink.png)

# ioBroker.bluelink (Немецкая документация)

**[Документация на английском языке (README.md)](/#/adapters/bluelink)**

---

## Übersicht

Адаптер **ioBroker.bluelink** связывает автомобили **Hyundai (Bluelink)** и **Kia (Kia Connect / UVO)** с ioBroker. Unterstützt werden Elektrofahrzeuge (EV), Plug-in-Hybride / Vollhybride (PHEV/HEV) sowie Verbrenner (ICE) – einschließlich aktueller Modelle der ccNC-Generation (z. B. Kia EV3, EV6, EV9, Hyundai IONIQ 5, IONIQ 6, Kona).

### Основные функции

- **100 % автоматический вход в систему без головы (EU OneApp/CCI):** прямой доступ к адресу электронной почты и паролю – **вручную создается токен, используется внешний скрипт, браузер, QR-код и код Captcha** .
- **Umfangreiche Fahrzeug-Telemetrie:** Ladestand der Hochvoltbatterie (SoC) и 12V-Hilfsbatterie, Batteriegesundheit (SoH), Ladestatus, Restreichweite (DTE), Kilometerstand, Tür-/Fenster-/Kofferraum-/Motorhauben-Status, Klimasstatus, Reifendruck-Warnungen und Fahrthistorie.
- **Vollständige Fernsteuerung:** Verriegeln/Entriegeln, Klimatisierung start/stoppen (включая Zieltemperatur, Frontscheibenheizung, Lenkrad-/Heckscheibenheizung), Laden start/stoppen sowie AC-/DC-Ladelimits setzen.
- **Стандарт и адрес:** GPS-координаты (`lat`, `lon`, `speed`), директор Google-Maps-Link и дополнительный адрес Straßenadress-Auflösung über OpenStreetMap.
- **Intelligent 12V-Batterieschutz:** Standardmäßige Abfrage über den Cloud-Server-Cache ohne Aufwecken des Fahrzeugs soil configurierbarer Schwellenwert for die 12V-Batterie.

---

## Аутентификация и Ersteinrichtung (EU Hyundai и Kia)

### 1. Особенности конфигурации адаптера

Для Einrichtung und Den Betrieb ist **keine manuelle Token-Generierung erforderlich** :

1. Wähle in den Instanz-Einstellungen deine **Marke** (`Kia` Одер `Hyundai`), den **Motor** -Typ (`EV`, `PHEV/MHEV` Одер `Diesel/Benzin`) und die **App-Sprache** (`DE`).
2. Введите **адрес электронной почты** (адрес электронной почты, указанный в учетных записях Kia Connect / Bluelink), **пароль** , который содержит 4-значный **PIN-код** (для Steuerbefehle и Fahrzeug).
3. Speichere und schließe die Einstellungen.

Начните работу с автоматическим адаптером во внутреннем пространстве **OneApp / Connected Car Infrastructure (CCI) -** аутентификация и проверка полного набора сеансовых токенов.

> **Wichtiger Hinweis:** Verwende **keine** externen Token-Skripte (wie z.B. `bluelink_refresh_token`)! Этот сценарий не позволяет проверять и использовать Legacy-OAuth-Flow для Hyundai/Kia, используя брандмауэр с Hersteller mit. `HTTP 403 Forbidden` Чтобы заблокировать и отменить доступ к вашему IP-адресу, вы можете временно использовать его или использовать его.

### 2. Технические функции автоматического входа в систему

Для Hyundai и Kia в других европейских странах OAuth-Endpunkt dauerhaft abgeschaltet haben, nutzt der Adaptor einen eigenen **OneApp/CCI Token-Manager** (`lib/tokenManager.js`):

1. **Инициализация сеанса:** Запустите собственный мобильный сеанс на `idpconnect-eu.kia.com` бзв. `idpconnect-eu.hyundai.com` с новым OneApp-Client-ID, одним внешним перенаправлением на другие веб-страницы для частого использования (дальше, когда браузер-капчи и QR-код полностью заполнены).
2. **RSA-Passwortverschlüsselung:** Lädt den aktuellen öffentlichen RSA-Schlüssel (`/auth/api/v1/accounts/certs`) от сервера и получения локального пароля с помощью RSA-PKCS1v1.5.
3. **Безголовый вход:** Sendet die verschlüsselten Zugangsdaten an `/auth/account/signin` и используется напрямую для HTTP 302 в OAuth-Autorisierungscode (`code=`).
4. **Signierter CCI-Token-Abruf:** Tauscht den Autorisierungscode gegen ein OneApp-CCI-Token-Set (`/auth/v1/token`), Signiert mit erforderlichen HMAC-SHA256 `X-Fingerprint`.
5. **CCS-Token-Tausch:** Значение CCI-Token über `/auth/v1/token-exchange?serviceType=CCS` Получите токен CCS-Bearer-Token, который будет использовать стандартную телеметрию и управление по Fahrzeug-API.
6. **Автоматическое получение токенов:** выбор адаптера-начала или использование токенов, связанных с адаптером, в исходном ресурсе `/auth/v2/token-refresh` и для этого не нужен новый пароль-логин, если он будет обновлен.

### 3. Ошибка при входе в систему

- **Новые Nutzungsbedingungen (AGB) в лучшем приложении:** Meldet das Log `Account consent or verification is required`, откройте официальное **приложение Kia App** bzw. **Приложение Hyundai Bluelink** на вашем смартфоне объединяет и лучшие события в новых Nutzungsbedingungen или Datenschutzhinweise. Начните работу с адаптером-Instanz neu.
- **Временные IP-зажимы (`HTTP 403 Forbidden`) или длинный вход в систему:** Mehrfache fehlgeschlagene Login-Versuche (insbesondere durch veraltete Adaptor-Versionen или externe Skripte wie `bluelink_refresh_token`) Для этого необходимо использовать межсетевой экран (WAF) Kia/Hyundai с оффентным IP-адресом, который определяется временным доступом к Интернету или возможностью его использования. Для использования внешнего скрипта потребуется 30–60 минут (или использование маршрутизатора для нового IP-адреса) и переход к входу в систему через адаптер.
- **Мануэль Токен-Абруф auslösen:** Über den Datenpunkt `bluelink.0.info.fetchToken` (`true`) kannst du jederzeit im laufenden Betrieb eine sofortige Token-Erneuerung anstoßen.

---

## Konfigurationsoptionen

| Einstellung                                                        | Описание                                                                                                                                                                                  |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Бренд (Marke)**                                                  | Fahrzeughersteller (`Kia` Одер `Hyundai`).                                                                                                                                                |
| **Мотор**                                                          | Антрибсарт: `EV` (Электро), `PHEV/MHEV` (Гибридный) одер `Diesel/Benzin` (Вербреннер).                                                                                                       |
| **максимальный запас хода в км**                                   | Максимальный электрический ток в км (wird nur bei PHEV angezeigt und benötigt).                                                                                                           |
| **Язык приложений**                                                | Sprache für API-Antworten (`DE`, `EN`, `NL`, `IT`, `ES`, `PL`).                                                                                                                          |
| **Имя пользователя**                                               | Адрес электронной почты определяет Kia Connect или учетные записи Hyundai Bluelink.                                                                                                       |
| **Пароль**                                                         | Пароль учетной записи (wird von ioBroker verschlüsselt Gespeichert).                                                                                                                      |
| **Приколоть**                                                      | 4-значный PIN-код безопасности в приложении для смартфона (verschlüsselt Gespeichert).                                                                                                    |
| **Получать историю ежедневных поездок**                            | Ruft die tägliche Fahrthistorie und Verbrauchsdaten ab (nur EV, benötigt ca. 3 API-Abfragen pro Tag).                                                                                     |
| **Прекратите обновление, если заряд 12-вольтовой батареи ниже...** | Schützt die 12V-Starterbatterie vor Tiefentladung.                                                                                                                                        |
| **Запрос максимум 400**                                            | Anzahl der täglichen Status-Abfragen verteilt auf 24 Stunden (z. B. `100` = ок. все 14,4 минуты). Максимальный `400`, а ограничение скорости дер Херстеллера не является цу überschreiten. |
| **errorCounter**                                                   | Anzahl aufeinanderfolgender Fehler, bevor eine Fehlermeldung geologgt und bis zum nächsten Zyklus pausiert wird.                                                                          |
| **Определите адрес по координатам.**                               | Löst die GPS-Koordinaten über OpenStreetMap (Nominatim) на лесной улице Straßenadresse (`vehicleLocation.position_text`) на.                                                             |

---

## Datenpunkte & Fernsteuerung

### Статус адаптера и аутентификации (`info.*`)

| Пункт данных            | Ролле / Тип                        | Описание                                                                                 |
| ----------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `info.connection`       | `indicator.connected` (`boolean`) | `true`, поэтому адаптер не работает и не работает с облаком.                            |
| `info.tokenType`        | `text` (`string`)                 | Aktiver Login-Modus (`cci` für EU OneApp/CCI-Flow, `legacy` (для альтернативных токенов). |
| `info.tokenExpiry`      | `text` (`string`)                 | ISO-8601-Zeitstempel des Ablaufs des aktuellen CCS-Access-Tokens.                        |
| `info.lastTokenRefresh` | `value.time` (`number`)           | Zeitstempel (ms) des letzten erfolgreichen Логины bzw. Токен-обновляется.                |
| `info.fetchToken`       | `button` (`boolean`)              | Ауф `true` setzen (`ack: false`), um manuell ein neues Token anzufordern.                |

### Fahrzeug-Fernsteuerung (`<VIN>.control.*`)

| Пункт данных                        | Тип / Роль              | Описание                                                                                                                                                        |
| ----------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `control.lock`                      | `boolean` (`button`)   | Fahrzeug verriegeln.                                                                                                                                            |
| `control.unlock`                    | `boolean` (`button`)   | Fahrzeug entriegeln.                                                                                                                                            |
| `control.charge`                    | `boolean` (`button`)   | Ladevorgang starten.                                                                                                                                            |
| `control.charge_stop`               | `boolean` (`button`)   | Ladevorgang stoppen.                                                                                                                                            |
| `control.charge_limit_slow`         | `number` (`indicator`) | Зиль-Ладелитим (`50` –`100` %) для AC-Laden (Wallbox/Schuko).                                                                                                   |
| `control.charge_limit_fast`         | `number` (`indicator`) | Зиль-Ладелитим (`50` –`100` %) для DC-Schnellladen (HPC).                                                                                                       |
| `control.clima.start`               | `boolean` (`button`)   | Работа по климатизации с использованием `control.clima.set.*` gesetzten Werten starten.                                                                          |
| `control.clima.stop`                | `boolean` (`button`)   | Vorklimatisierung stoppen.                                                                                                                                      |
| `control.clima.set.airTemp`         | `number` (`indicator`) | Температура Циля-Инненраума в °C (стандарт: `18`).                                                                                                              |
| `control.clima.set.defrost`         | `boolean` (`state`)    | Передняя разморозка активирована.                                                                                                                               |
| `control.clima.set.heating`         | `number` (`state`)     | Lenkrad- und Heckscheibenheizung aktivieren (`1` = эйн, `0` = aus).                                                                                              |
| `control.force_refresh_from_server` | `boolean` (`button`)   | Ruft den letzten bekannten Status vom Hyundai/Kia-Server ab ( **weckt das Auto nicht auf** ).                                                                   |
| `control.force_refresh_from_car`    | `boolean` (`button`)   | Weckt das Fahrzeug for Mobilfunk auf und fragt Live-Status + GPS напрямую от Auto ab ( **батарея 12 В** ).                                                      |
| `control.force_location`            | `boolean` (`button`)   | Актуальный фрагмент Live-GPS-Standort напрямую от Fahrzeug ab.                                                                                                  |
| `control.force_update`              | `boolean` (`state`)    | Регулярное голосование: `false` (Стандартный) = nur Server-Cache abfragen; `true` = bei jedem Intervall das Auto aufwecken ( **nicht empfohlen** ).               |
| `control.batteryControlState12V`    | `number` (`state`)     | Самая точная стоимость батареи 12 В в % (стандарт: `65`). Fällt `soc-12V` Если включена блокировка функции будильника, функция Auto не работает или не работает. |

### Fahrzeug-Telemetrie (`<VIN>.*`)

- ** `<VIN>.vehicleStatus.battery.*`:**
  - `soc`: Ladestand der Hochvoltbatterie в `%`.
  - `soh`: Gesundheitszustand (Состояние здоровья) der Hochvoltbatterie в `%`.
  - `charge`: `true`, während das Fahrzeug lädt.
  - `plugin`: Статус Штекера (`0` = nicht gesteckt, `1` = DC-Schnellader, `2` = Ladeziegel/ICCB, `3` = AC-Wallbox/Ladesäule).
  - `minutes_to_charged`: Verbleibende Ladedauer в Minuten.
  - `soc-12V`: Установка батареи Hilfs 12 В в `%`.
- ** `<VIN>.vehicleStatus.*`:**
  - `dte` /`evModeRange` /`gasModeRange`: Geschätzte Restreichweite в `km`.
  - `doorLock`, `trunkOpen`, `hoodOpen`, `doorOpen.*`: Verriegelungs- und Öffnungsstatus aller Türen, Kofferraum und Motorhaube.
  - `airCtrlOn`, `airTemp`, `steerWheelHeat`, `sideBackWindowHeat`: Aktueller Status der Klimaanlage und Heizungen.
- ** `<VIN>.vehicleLocation.*`:**
  - `lat`, `lon`, `speed`: Актуальные GPS-положения и наблюдения.
  - `position_url`: Директор Google-Maps-Link zum Fahrzeugstandort.
  - `position_text`: Aufgelöste Straßenadresse (Sofern OpenStreetMap-Auflösung aktiv ist).
- ** `<VIN>.odometer.value`:** Aktueller Gesamtkilometerstand in `km`.
- ** `<VIN>.driveHistory.*`:** Tägliche und kumulierte Verbrauchs-, Rekuperations- und Streckenstatistiken (EV).

---

## Сообщество и ссылки

- [Тема на форуме ioBroker](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo)
- [Вики GitHub](https://github.com/Newan/ioBroker.bluelink/wiki)

---

## Changelog

### **WORK IN PROGRESS**
* (meistermopper) Automatischer In-Memory-Fallback auf vollständigen CCI-Login ergänzt, falls der Token-Refresh im laufenden Betrieb mit `HTTP 401 (code 9030: jwt-expired / Token expired)` fehlschlägt.
* (meistermopper) Veralteten Bereich „Fallback / Refresh Token“ aus der Admin-UI (jsonConfig) und Dokumentation entfernt, da die OneApp/CCI-Authentifizierung vollständig automatisch erfolgt.
* (meistermopper) Ausführliche deutsche und englische Dokumentation zur automatischen OneApp/CCI-Authentifizierung, Konfiguration und Datenpunkten ergänzt.
* (meistermopper) Admin-UI und i18n-Übersetzungen in allen 11 unterstützten Sprachen modernisiert.
* (meistermopper) Race-Condition beim Adapter-Neustart nach dem Speichern eines neuen CCI-Tokens behoben (verhindert SIGKILL-Timeouts).

### 3.1.36 (2026-11-01)
* (meistermopper) EU-Login repariert: OneApp/CCI-Flow für europäische Fahrzeuge bei Benutzername/Passwort-Eingabe erzwungen (Legacy-Login ist serverseitig abgeschaltet).
* (meistermopper) Robuste CookieJar-Pfad-/Domain-Verwaltung, Redirect-Hop-Nachverfolgung und evcc-kompatibles Node-TLS integriert.
* (meistermopper) Fallback auf zufällige Device-ID ergänzt, falls die veraltete Push-Geräteregistrierung fehlschlägt (hyundai_kia_connect_api #1342).
* (meistermopper) Unterstützung für das Einfügen von evcc-Token-Bundles in das Refresh-Token-Feld hinzugefügt.

### 3.1.35 (2026-10-15)
* (arteck) Fix EU Hyundai/Kia login

### 3.1.34 (2026-09-17)
* (arteck) fix location request

### 3.1.33 (2026-08-22)
* (ipod86) Login-Fix für EU Hyundai/Kia (OneApp/CCI-Flow)

### 3.1.32 (2026-08-20)
* (ipod86) Fix EU Hyundai/Kia login