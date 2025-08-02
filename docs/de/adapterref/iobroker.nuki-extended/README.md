---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-erweitert
hash: IVEO70qXQFzBzkaqwGTHYYQSEshHQEIvPLCGNOEHYyY=
---
![Logo](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Anzahl der Installationen](http://iobroker.live/badges/nuki-extended-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)

# IoBroker.nuki-extended Dieser ioBroker-Adapter (ehemals ioBroker.Nuki2) ermöglicht die Steuerung und Überwachung des [Nuki Smart Lock](https://nuki.io/de/smart-lock/) und / oder den [Nuki Opener](https://nuki.io/de/opener/) durch Verwendung sowohl der [Nuki Bridge API (v1.9.0, 06.05.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) als auch der [Nuki Web API (v1.2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.nuki-extended/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/nuki-extended/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Inhaltsverzeichnis**

1. [Funktionen](#Funktionen)
2. [Installation](#installation)
   1. [Nuki Bridge API](#nuki-bridge-api)
   2. [Nuki Web API](#nuki-web-api)
3. [Kanäle und Zustände](#channels--states)
4. [Smart Home / Alexa-Integration mit ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
1. [Tür um 22 Uhr abends abschließen](#tuer-um-22-uhr-abends-abschließen)
2. [Lassen Sie sich von Alexa über Schlossänderungen informieren](#let-alexa-inform-you-about-lock-changes)
3. [Lassen Sie sich von Telegram über Sperränderungen informieren](#let-telegram-inform-you-about-lock-changes)
4. [Lassen Sie sich von Alexa und Telegram über einen Anruf per Opener informieren](#let-telegram-and-alexa-inform-you-about-somebody-ringing-via-opener)
5. [Änderungsprotokoll](#changelog)
6. [Mitwirkende](#Mitwirkende)
7. [Lizenz](#Lizenz)

## Merkmale
- Unterstützung für Nuki Smartlock und Nuki Opener
- Unterstützung sowohl für die Nuki Bridge API als auch für die Nuki Web API
- ~~Unterstützung für gehashte Token auf Hardware-Bridges (siehe https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- Fallback auf Nuki Web API, falls angewendete Aktionen auf der Nuki Bridge API fehlschlagen, z.B. aufgrund des Bridge-Fehlers 503 (siehe https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Erneuter Versuch, falls angewendete Aktionen auf der Nuki Bridge API fehlschlagen (wenn die Nuki Web API nicht verwendet wird)
- Option zur regelmäßigen Synchronisierung anstelle der Verwendung des Bridge-API-Rückrufs (der aufgrund der Hardware Bridge verzögert werden kann)
- Aktualisieren aller Zustände der Nuki Web API, wenn ein Rückruf über die Nuki Bridge API empfangen wird
- Autorisierte Benutzer für Nuki Smartlock und Nuki Opener abrufen (siehe unten [Kanäle & Zustände](#allgemeine-informationen))
- Konfiguration für Nuki Smartlock und Nuki Opener abrufen (siehe unten [Kanäle & Zustände](#general-config))
- Eingerichtete Nuki-Benachrichtigungen abrufen (siehe unten [Kanäle & Zustände](#Benutzer))
- Weboberfläche, die die letzten Ereignisse Ihres Nuki Smartlock und Nuki Opener anzeigt:

  ![Nuki Erweitertes Webinterface](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Installation
### Nuki Bridge API
So erhalten Sie Ihr Hardware-Bridge-Token (funktioniert nicht für Software-Bridges):

1. Rufen Sie ```http://<bridge_ip>:<bridge_port>/auth``` von einem beliebigen Browser in Ihrem Netzwerk aus auf. Die Bridge schaltet ihre LED ein.
2. Drücken Sie innerhalb von 30 Sekunden die Taste der Bridge.
3. Das Ergebnis des Browseraufrufs sollte ungefähr so aussehen:

```
{
   "token":"token123",
   "success":true
}
```

4. Nutze den generierten Token im nuki-extended Adapter.

### Nuki Web API
Um die Nuki Web API zu nutzen, gehen Sie wie folgt vor:

1. Token abrufen unter https://web.nuki.io/de/#/admin/web-api
2. Nutze diesen Token im nuki-extended Adapter
3. Stelle sicher, dass deine Nuki Geräte auf der Nuki Web API veröffentlicht sind (nutze dazu die Smartphone App über Einstellungen `Nuki Web aktivieren`)

## Kanäle und Zustände
Wenn Sie ioBroker.nuki-extended erfolgreich eingerichtet haben, werden die folgenden Kanäle und Zustände erstellt:

### Bridges (mit Nuki Bridge API)
Eine Bridge wird als Gerät mit dem Namensmuster ```bridge__<name of bridge>``` angelegt. In jeder Bridge werden folgende Kanäle/Zustände angelegt:

| Kanal | Status | Beschreibung |
|:------- |:----- |:----------- |
| - | \_connected | Flag, das angibt, ob die Bridge mit dem Nuki-Server verbunden ist oder nicht |
| - | Name | Name der Brücke / des Servers |
|- |bridgeId | ID der Brücke / des Servers |
| - | bridgeIp | IP-Adresse der Brücke |
| - | Brückenhafen | Hafen der Brücke |
| - | bridgeType | Brückentyp |
| - | hardwareId | ID der Hardwarebrücke (nur Hardwarebrücke) |
| - | aktualisiert | Zeitstempel der letzten Aktualisierung |
| - | Betriebszeit | Betriebszeit der Brücke in Sekunden |
| - | versFirmware | Version der Bridge-Firmware (nur Hardware-Bridge) |
| - | versWifi | Version der Firmware des WiFi-Moduls (nur Hardware-Bridge) |
| - | versApp | Version der Bridge-App (nur Software-Bridge) |
| Rückrufe | - | Rückrufe der Brücke |
| Rückrufe | Liste | Liste der Rückrufe |
| callbacks._callbackId_ | \_delete | Löscht den Rückruf |
| callbacks._callbackId_ | url | URL des Rückrufs |

### Allgemeine Informationen
| Kanal | Status | Beschreibung |
|:------- |:----- |:----------- |
| - | Verbindung | Adapter-Verbindungsstatus |
| - | bridgeApiSync | Gibt an, ob die Synchronisierung über die Bridge-API aktiviert ist |
| - | bridgeApiLast | Zeitstempel der letzten Bridge-API-Synchronisierung |
| - | webApiSync | Gibt an, ob die Synchronisierung über die Web-API aktiviert ist |
| - | webApiLast | Zeitstempel der letzten Web-API-Synchronisierung |
| Benachrichtigungen | - | Benachrichtigungen |
| Benachrichtigungen._BenachrichtigungsIndex_ | - | - |
| notifications._notificationIndex_.settings | - | Benachrichtigungseinstellungen |
| Benachrichtigungen._BenachrichtigungsIndex_.settings._settingsIndex_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | Eine Reihe von Auth-IDs zum Filtern von Push-Benachrichtigungen an bestimmte Benutzer oder Tastaturen. Wenn kein Eintrag erfolgt, werden Push-Benachrichtigungen für alle Benutzer und Tastaturen ausgelöst |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | Die Smartlock-ID. Wenn sie nicht festgelegt ist, sind alle Smart Locks des Kontos für Push-Benachrichtigungen aktiviert |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | Ein Satz, bei dem Push-Benachrichtigungen ausgelöst werden sollen: sperren, entsperren, entriegeln, lockngo, öffnen, klingeln, Türsensor, Warnungen, Smartlock |
| notifications._notificationIndex_ | language | Die Sprache der Push-Nachrichten |
| notifications._notificationIndex_ | lastActiveDate | Das letzte aktive Datum |
| notifications._notificationIndex_ | notificationId | Die eindeutige notificationId für die Benachrichtigung |
| notifications._notificationIndex_ | os | Das Betriebssystem<br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | Die Push-ID oder die POST-URL für einen Webhook |
| notifications._notificationIndex_ | referenceId | Die Referenz-ID, eine ID zur Identifizierung eines fremden Systems |
| notifications._notificationIndex_ | status | Aktueller Aktivierungsstatus<br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| notifications._notificationIndex_ | status | Aktueller Aktivierungsstatus<br> `{&quot;0&quot;: &#39;INIT&#39;, &quot;1&quot;: &#39;AKTIV&#39;, &quot;2&quot;: &#39;FEHLER&#39;}` |

### Smartlocks und Opener (mit Nuki Bridge API)
Es wird ein Schloss als Gerät mit dem Namensmuster ```door__<name of door>``` angelegt. In jedem Schloss werden folgende Kanäle / Zustände angelegt (bei Verwendung der Nuki Bridge API):

| Kanal | Status | Beschreibung |
|:------- |:----- |:----------- |
| - | \_ACTION | Eine Aktion für das Schloss auslösen |
|- |id | ID des Nuki |
| - | Name | Name des Nuki |
| - | Typ | Gerätetyp |
|- |bridgeId | Bridge-ID des Nuki |
| Status | - | Aktueller Status des Schlosses |
| Status | BatterieKritisch** | Gibt kritischen Batteriestand an |
| status | lockState** | Aktueller Sperrzustand des Nuki |
| Status | verriegelt** | Anzeige ob Tür verriegelt ist |
| Status | aktualisiert** | Zeitstempel der letzten Aktualisierung |

_** markierte Zustände werden bei einer Nuki Aktion aktualisiert, sofern ein Callback gesetzt ist_

### Smartlocks und Opener (mit Nuki Web API)
Es wird ein Schloss als Gerät mit dem Namensmuster ```door__<name of door>``` angelegt. In jedem Schloss werden folgende Kanäle / Zustände angelegt (bei Verwendung der Nuki Web API):

| Kanal | Status | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| - | \_ACTION | Eine Aktion für das Schloss auslösen |
|- |id | ID des Nuki |
| - | Name | Name des Nuki |
| - | Typ | Gerätetyp |
| - | Protokolle | Protokolle / Geschichte von Nuki |
|- |bridgeId | Bridge-ID des Nuki |

#### Information
| Kanal | Status | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| info | - | Weitere Informationen |
| info | accountId | Die Konto-ID |
| info | authId | Die Autorisierungs-ID |
| Info | Favorit | Die Lieblingsflagge |
| info | Firmwareversion | Die Firmwareversion |
| info | Hardwareversion | Die Hardwareversion |
| info | operationId | Die Operations-ID – wenn gesetzt, ist das Gerät für eine andere Operation gesperrt |
| info | serverState | Der Serverstatus<br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| info | adminPinState | Der Admin-Pin-Status<br> `{&quot;0&quot;: &#39;OK&#39;, &quot;1&quot;: &#39;FEHLT&#39;, &quot;2&quot;: &#39;UNGÜLTIG&#39;}` |
| info | virtualDevice | Das Flag, das ein virtuelles Smart Lock anzeigt |
| info | dateCreated | Das Erstellungsdatum |
| info | dateUpdated | Das Aktualisierungsdatum |

#### Zustand
| Kanal | Status | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Status | - | Aktueller Status des Schlosses |
| Zustand | BatterieKritisch | Gibt kritischen Batteriestand an |
| Zustand | geschlossen | Anzeige, ob Tür geschlossen ist (Boolescher Wert von Türzustand) |
| state | doorState | Aktueller Tür-Zustand des Nuki |
| Status | letzteAktion | Zuletzt ausgelöste Aktion |
| state | lockState | Aktueller Sperrzustand des Nuki |
| Zustand | verriegelt | Anzeige ob Tür verriegelt |
| Zustand | Modus | Der Smartlock-Modus<br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| Status | ringToOpenTimer | Verbleibende Zeit bis zum Öffnen des Klingeltons |
| Zustand | Auslöser | Der Zustandsauslöser<br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| Zustand | Auslöser | Der Zustandsauslöser<br> `{&quot;0&quot;: &#39;SYSTEM&#39;, &quot;1&quot;: &#39;MANUELL&#39;, &quot;2&quot;: &#39;TASTE&#39;, &quot;3&quot;: &#39;AUTOMATISCH&#39;, &quot;4&quot;: &#39;WEB&#39;, &quot;5&quot;: &#39;APP&#39;}` |

#### Allgemeine Konfiguration
| Kanal | Status | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Konfiguration | - | Konfiguration |
| config | advertisingMode | Der Werbemodus (Batteriesparen)<br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | autoUnlatch | True, wenn die Tür beim Aufschließen (Knopf) entriegelt werden soll |
| config | buttonEnabled | True, wenn die Taste am Smartlock aktiviert ist |
| Konfiguration | Fähigkeiten | Die Fähigkeiten geben an, ob die Türöffnung per App, RTO oder beidem möglich ist |
| config | fobAction1 | Die Fob-Aktion, wenn die Taste einmal gedrückt wird<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | Die Fob-Aktion, wenn die Taste zweimal gedrückt wird<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Die Fob-Aktion, wenn die Taste dreimal gedrückt wird<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Die Fob-Aktion, wenn die Taste dreimal gedrückt wird<br> `{&quot;0&quot;: &#39;KEINE&#39;, &quot;1&quot;: &#39;ENTSPERREN&#39;, &quot;2&quot;: &#39;SPERREN&#39;, &quot;3&quot;: &#39;LOCK_N_GO&#39;, &quot;4&quot;: &#39;INTELLIGENT&#39;}` |
| config | fobPaired | Wahr, wenn ein Anhänger mit dem Smartlock gepaart ist |
| Konfiguration | gpsLatitude | Breitengrad |
| config | homekitState | Der Homekit-Status<br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| config | homekitState | Der Homekit-Status<br> `{&quot;0&quot;: &#39;NICHT VERFÜGBAR&#39;, &quot;1&quot;: &#39;DEAKTIVIERT&#39;, &quot;2&quot;: &#39;AKTIVIERT&#39;, &quot;3&quot;: &#39;AKTIVIERT &amp; GEPAART&#39;}` |
| config | keypadPaired | Wahr, wenn ein Tastenfeld mit dem Smartlock gepaart ist |
| config | ledBrightness | Die Helligkeit der LED: 0 (aus) bis 5 (max) |
| config | ledEnabled | True, wenn die LED am Smartlock aktiviert ist |
| config | Name | Der Name des Smartlocks für neue Benutzer |
| config | OperatingMode | Der Betriebsmodus des Öffners |
| config | pairingEnabled | True, wenn die Kopplung über den Smartlock-Knopf erlaubt ist |
| config | singleLock | True, wenn das Smartlock nur einmal (statt zweimal) schließen soll |
| config | timezoneId | Die Zeitzonen-ID |
| config | timezoneOffset | Der Zeitzonen-Offset (in Minuten) |

#### Erweiterte Konfiguration
| Kanal | Status | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Erweiterte Konfiguration |
| advancedConfig | autoLockTimeout | Sekunden, bis sich das Smart Lock nach dem Entsperren wieder selbst verriegelt. Keine automatische Wiederverriegelung, wenn der Wert 0 ist. |
| advancedConfig | automaticBatteryTypeDetection | Flag, das angibt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| advancedConfig | batteryType | Der Typ der im Smart Lock vorhandenen Batterien<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird<br> `{&quot;0&quot;: &quot;KEINE_AKTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;ENTSPERREN&quot;, &quot;3&quot;: &quot;SPERREN&quot;, &quot;4&quot;: &quot;ENTRIEGELN&quot;, &quot;5&quot;: &quot;SPERREN_UND_LOSGEHEN&quot;, &quot;6&quot;: &quot;STATUS_ANZEIGEN&quot;}` |
| advancedConfig | lngTimeout | Timeout in Sekunden für Lock ‘n’ Go |
| advancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird<br> `{&quot;0&quot;: &quot;KEINE_AKTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;ENTSPERREN&quot;, &quot;3&quot;: &quot;SPERREN&quot;, &quot;4&quot;: &quot;ENTRIEGELN&quot;, &quot;5&quot;: &quot;SPERREN_UND_LOSGEHEN&quot;, &quot;6&quot;: &quot;STATUS_ANZEIGEN&quot;}` |
| advancedConfig | singleLockedPositionOffsetDegrees | Offset, der die einzelne gesperrte Position ändert |
| advancedConfig | totalDegrees | Die absolute Gesamtposition in Grad, die während der Kalibrierung erreicht wurde |
| advancedConfig | unlatchDuration | Dauer in Sekunden, um den Riegel in der entriegelten Position zu halten |
| advancedConfig | unlockedPositionOffsetDegrees | Offset, der die entsperrte Position ändert |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | Offset, der die Position ändert, an der der Übergang von entsperrt zu gesperrt stattfindet |

#### Opener Erweiterte Konfiguration
| Kanal | Status | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Opener-Konfiguration |
| openerAdvancedConfig | intercomId | Die Datenbank-ID der verbundenen Gegensprechanlage |
| openerAdvancedConfig | busModeSwitch | Methode zum Umschalten zwischen Daten- und Analogmodus<br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | Dauer des Kurzschlusses bei BUS-Modus-Umschaltung in ms |
| openerAdvancedConfig | electricStrikeDelay | Verzögerung der Türöffnerbetätigung in ms (nach Schlossaktion 3 -Türöffnerbetätigung-) |
| openerAdvancedConfig | randomElectricStrikeDelay | Zufälliges electricStrikeDelay (Bereich 3000 - 7000 ms), um eine Person im Inneren zu simulieren, die den elektrischen Türöffner betätigt |
| openerAdvancedConfig | electricStrikeDuration | Dauer der E-Türöffnerbetätigung in ms (Schlossaktion 3 -E-Türöffnerbetätigung-) |
| openerAdvancedConfig | disableRtoAfterRing | Flag zum Deaktivieren von RTO nach dem Klingeln |
| openerAdvancedConfig | doorbellSuppression | Der Türklingel-Unterdrückungsmodus<br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | doorbellSuppression | Der Türklingel-Unterdrückungsmodus<br> `{&quot;0&quot;: &#39;NIE&#39;, &quot;1&quot;: &#39;IMMER&#39;, &quot;2&quot;: &#39;RTO&#39;, &quot;3&quot;: &#39;KONTINUIERLICH&#39;, &quot;4&quot;: &#39;KONTINUIERLICH + RTO&#39;}` |
| openerAdvancedConfig | doorbellSuppressionDuration | Dauer der Türklingelunterdrückung in ms (nur in Betriebsart 2 -digitale Gegensprechanlage-) |
| openerAdvancedConfig | soundRing | Der Ton für Klingeln |
| openerAdvancedConfig | soundOpen | Der Sound zum Öffnen |
| openerAdvancedConfig | soundRto | Der Ton für RTO |
| openerAdvancedConfig | soundCm | Der Ton für CM |
| openerAdvancedConfig | soundConfirmation | Die akustische Bestätigung |
| openerAdvancedConfig | soundLevel | Der Tonpegel |
| openerAdvancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird |
| openerAdvancedConfig | batteryType | Der Typ der im Smart Lock vorhandenen Batterien<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | batteryType | Der Typ der im Smart Lock vorhandenen Batterien<br> `{&quot;0&quot;: &#39;ALKALI&#39;, &quot;1&quot;: &#39;AKKUMULATOR&#39;, &quot;2&quot;: &#39;LITHIUM&#39;}` |
| openerAdvancedConfig | automaticBatteryTypeDetection | Flag, das angibt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| openerAdvancedConfig | operationId | Die Operations-ID – wenn das eingestellte Gerät für eine andere Operation gesperrt ist |

#### Benutzer
| Kanal | Status | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Benutzer | - | Benutzer des Schlosses |
| users._userName_ | - | Benutzer _userName_ |
| users._userName_ | allowedFromDate | Das zulässige Ab-Datum |
| users._userName_ | allowedUntilDate | Das zulässige Bis-Datum |
| users._userName_ | allowedWeekDays | Die erlaubten Wochentage<br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | Die zulässige Ab-Zeit (in Minuten ab Mitternacht) |
| users._userName_ | allowedUntilTime | Die zulässige Bis-Zeit (in Minuten ab Mitternacht) |
| users._userName_ | authId | Die Smartlock-Autorisierungs-ID |
| users._userName_ | dateCreated | Das Erstellungsdatum |
| users._userName_ | dateUpdated | Das Aktualisierungsdatum |
| users._userName_ | dateLastActive | Das letzte aktive Datum |
| users._userName_ | aktiviert | Wahr, wenn der Benutzer aktiviert ist |
| users._userName_ | id | Die eindeutige ID des Benutzers |
| users._userName_ | lockCount | Die Anzahl der Sperren |
| users._userName_ | Name | Name des Benutzers |
| users._userName_ | remoteAllowed | Wahr, wenn der Authentifizierungsanbieter Remotezugriff hat |
| users._userName_ | type | Der Typ der Autorisierung<br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | type | Der Typ der Autorisierung<br> `{&quot;0&quot;: &#39;APP&#39;, &quot;1&quot;: &#39;BRIDGE&#39;, &quot;2&quot;: &#39;FOB&#39;, &quot;3&quot;: &#39;TASTATUR&#39;, &quot;13&quot;: &#39;TASTATURCODE&#39;, &quot;14&quot;: &#39;Z-KEY&#39;, &quot;15&quot;: &#39;VIRTUELL&#39;}` |

## Smart Home / Alexa-Integration mit ioBroker.javascript
Einige Beispiele für eine mögliche Integration in Ihr Smart Home.

### Tür abends um 22 Uhr abschließen
```javascript
var states = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

schedule('0 22 * * *', function()
{
    var status = (getState('nuki-extended.0.smartlocks.home_door.state.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki-extended.0.smartlocks.home_door._ACTION', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__Ersetzen Sie `nuki-extended.0.door__home_door.status.lockState` durch den Sperrstatus Ihres Schlosses!__ Sie können die Nachricht auch über `msg` anpassen.

### Lassen Sie sich von Alexa über Schlossänderungen informieren
Dies erfordert den ioBroker-Adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Um die Sprachausgabe von Alexa nutzen zu können, definieren wir eine Funktion ```say```. Platzieren Sie die folgende Funktion in einem Skript im Ordner „global“ von ioBroker.javascript. WICHTIG: Ersetzen Sie #IHRE ALEXA-ID# (ersetzen Sie auch #) durch Ihre Alexa-ID. Sie finden die Alexa-ID im Objektbaum von ioBroker ```alexa2.0.Echo-Devices```.

```javascript
/**
 * Say something with Alexa.
 *
 * @param       {string}        message         Message to say
 * @param       {string|array}  alexas          Alexa Device to say the voice message
 * @return      void
 *
 */
function say(message, alexas = '#YOUR ALEXA ID#') // use alexas = ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'] for default voice output from multiple devices (also replace #)
{
    alexas = typeof alexas === 'string' ? [alexas] : alexas;
    alexas.forEach(function(alexa)
    {
        setState('alexa2.0.Echo-Devices.' + alexa + '.Commands.speak', message);
    });
}
```

Sie können diese Funktion innerhalb von ioBroker.javascript verwenden, um mit Alexa ```say('Hello World')``` oder ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` eine Phrase für die Sprachausgabe von mehreren Geräten auszusprechen.

Erstellen Sie ein Skript im Ordner „common“ von ioBroker.javascript und fügen Sie ihm den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID# (ersetzen Sie auch #) durch den Status, in dem der Sperrstatus gilt (z. B. ```nuki-extended.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

### Lassen Sie sich von Telegram über Sperränderungen informieren
Dies erfordert den ioBroker-Adapter ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

Um die Nachrichtenausgabe von Telegram zu nutzen, definieren wir eine Funktion ```msg``` und ```messenger```. Platzieren Sie die folgende Funktion in einem Skript im Ordner „global“ von ioBroker.javascript:

```javascript
/**
 * Send something via telegram.
 *
 * @param       {string}        message         Message to print
 * @param       {string|array}  receiver        Users to send the message to
 * @return      void
 *
 */
function msg(message, receiver = 'ALL')
{
    if (receiver == 'ALL')
        messenger(message);

    else
    {
        receiver = typeof receiver == 'string' ? [receiver] : receiver;
        receiver.forEach(function(user)
        {
            messenger(message, user);
        });
    }
}
```

```javascript
/**
 * Sends a message / text.
 *
 * @param   {string}            content         Message to send
 * @param   {string}            user            (optional) Specific user to send the message to (defaults to all registered users)
 * @return  void
 *
 */
function messenger(content, user = '')
{
    var config = {
        text: content,
        parse_mode: 'HTML',
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    sendTo('telegram', user ? Object.assign({user: user}, config) : config);
}
```

Sie können diese Funktion innerhalb von ioBroker.javascript verwenden, um alles über ```msg('Hello World')``` (an alle Benutzer) oder ```msg('Hello World', 'Zefau')``` (an bestimmte Benutzer) an Telegram zu senden.

Erstellen Sie ein Skript im Ordner „common“ von ioBroker.javascript und fügen Sie ihm den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID# (ersetzen Sie auch #) durch den Status, in dem der Sperrstatus gilt (z. B. ```nuki-extended.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

HINWEIS: Wenn Sie sowohl das Alexa- als auch das Telegram-Skript verwenden, können Sie nur einen Listener für beide Aktionen definieren:

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```

### Lassen Sie sich von Telegram und Alexa über Opener über einen Anruf informieren
Dies erfordert den ioBroker-Adapter ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram) und den ioBroker-Adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

```javascript
/*
 * Alexa and Telegram to notify on Opener Ringing state
 *
 */
let phrase = 'Somebody is ringing the doorbell.'; // Es hat an der Tür geklingelt
on({id: 'nuki-extended.0.openers.opener.state.ringStateUpdate', change: "any", ack: true}, function (s) {
  let state= s && s.state;

  if (state.val === true) {
    setState("alexa2.0.Echo-Devices.#YOUR ALEXA ID#.Commands.speak"/*speak*/, phrase);
    sendTo("telegram", "send", { text: phrase });
  }
});
```

## Credits
Danke an [@Mik13](https://github.com/Mik13) für die [Nuki Bridge API-Implementierung](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Icons von <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> ([Essential Set](https://www.flaticon.com/packs/essential-set-2)) und <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Türen](https://www.flaticon.com/packs/doors)) von <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> sind lizenziert unter <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.7.0 (2024-04-21)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.6.5 (2022-06-17)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.6.4 (2022-06-16)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.6.3 (2022-06-13)
* (theimo1221) Fix Web Api SetAction Call

### 2.6.2 (2022-06-13)
* (theimo1221) Fix Web Api Polling

### 2.6.1 (2022-06-09)
* (Apollon77) Fix Bridge functionality
* (simatec) Fix Admin display in dark mode

### 2.6.0 (2022-06-03)
* (Matze2010) Make additional refresh after callback configurable
* (theimo1221) Optimizations and fixes

### 2.5.0 (2022-05-27)
- (StrathCole) Allow web-api-only operation
- (Apollon77) Make compatible with Node.js 18.x
- (Apollon77) Add Sentry for crash reporting

### 2.4.0 (2021-12-13)
- (smaragdschlange) added support for Nuki Smart Door and Nuki Smart Lock 3.0 (Pro)

### v2.3.1 (2021-07-20)
- (Apollon77) Optimize for js-controller 3.3 and warnings prevented

### v2.3.0 (2020-08-10)
- (Zefau) added support for the door sensor of the Nuki Smartlock ([introduced with Bridge firmware 2.6.0 / 1.16.0](https://developer.nuki.io/t/bridge-beta-fw-2-6-0-1-16-0-with-door-sensor-state/6159))
- (Zefau) added support for the ring bell action of the Nuki Opener ([introduced with Bridge firmware 2.7.0 / 1.17.0](https://developer.nuki.io/t/bridge-beta-fw-2-7-0-1-17-0/6792))

### v2.2.6 (2020-07-14)
- (Zefau) fixed Web API not refreshing correctly (see [#59](https://github.com/Zefau/ioBroker.nuki-extended/issues/59))
- (Zefau) updated dependencies

### v2.2.5 (2020-03-19)
- (Zefau) fixed incorrect versioning

### v2.2.4 (2020-03-18)
- (Zefau) fixed incorrect dates of version history (see [#60](https://github.com/Zefau/ioBroker.nuki-extended/issues/60))

### v2.2.3 (2020-03-04)
- (Zefau) added refresh of configuration (via Nuki Web API) when any config item has been changed in ioBroker

### v2.2.2 (2020-03-04)
- (Zefau) fixed incorrect error message `Error triggering action via Nuki Bridge API: No Nuki Hex ID given!`
- (Zefau) added new error message if too many callbacks are already attached to Nuki Bridge (`Callback not attached because too many Callbacks attached to the Nuki Bridge already! Please delete a callback!`)

### v2.2.1 (2020-03-03)
- (Zefau) fixed incorrect state mapping of state `openerAdvancedConfig.doorbellSuppression`

  **Note:** Please delete the state `openerAdvancedConfig.doorbellSuppression` once manually and restart the adapter to take affect!
  
- (Zefau) updated dependencies

### v2.2.0 (2020-02-16)
- (Zefau) added possibility to change configuration of Nuki Smartlock or Nuki Opener (when using Web API)
- (Zefau) updated dependencies

### v2.1.0 (2020-02-03)
- (Zefau) added (optional) callback IP for Bridge API events (e.g. when ioBroker is run in docker; see [#51](https://github.com/Zefau/ioBroker.nuki-extended/issues/51))
- (Zefau) added dedicated buttons for each lock / opener action
- (Zefau) replaced `state.timestamp` with `state.lastDataUpdate` (indicates last data refresh from the APIs) and `state.lastStateUpdate` (indicates the last actual state change)

### v2.0.3 (2019-10-31)
- (Zefau) reintroduced support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)

### v2.0.2 (2019-10-31)
- (Zefau) added support for newly introduced nightmode (see https://nuki.io/de/blog/nuki-news-de/nuki-update-2019-der-winter-naht-sei-vorbereitet/)
- (Zefau) fixed incorrect behavior when bridges are defined insufficiently (no name, ip or token provided)

### v2.0.1 (2019-10-26)
- (Zefau) fixed missing `bridge_name`

### v2.0.0 (2019-10-24)
- (Zefau) added support for new Nuki Opener
- (Zefau) added support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)
- (Zefau) added fallback to Nuki Web API in case applied actions on Nuki Bridge API fail, e.g. due to bridge error 503 (see https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- (Zefau) added retry in case applied actions on Nuki Bridge API fail (when Nuki Web API is not used)
- (Zefau) added option to regularly synchronise instead of using Bridge API callback
- (Zefau) added refreshing all states of Nuki Web API when callback is received via Nuki Bridge API
- (Zefau) added states for Nuki Notifications
- (Zefau) added support for multiple devices (including Nuki Opener) on adapter web interface
- (Zefau) added option to not retrieve all information (by deselecting `config` or `users`) via Nuki Web API

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2019-2022 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.