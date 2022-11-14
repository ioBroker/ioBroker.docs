---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-erweitert
hash: gZVj/D9w98YLqH5xqzxzt65Ef4puIsHGMUuDHo5+Krk=
---
![Logo](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Anzahl der Installationen](http://iobroker.live/badges/nuki-extended-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)

# IoBroker.nuki-extended Dieser ioBroker-Adapter (früher ioBroker.Nuki2) ermöglicht die Steuerung und Überwachung des [Nuki Smart Lock](https://nuki.io/de/smart-lock/) und/oder dem [Nuki Opener](https://nuki.io/de/opener/) unter Verwendung sowohl der [Nuki Bridge API (v1.9.0, 06.05.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) und die [Nuki Web API (v1. 2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.nuki-extended/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/nuki-extended/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

**Inhaltsverzeichnis**

1. [Funktionen](#Funktionen)
2. [Installation](#installation)
   1. [Nuki Bridge API](#nuki-bridge-api)
   2. [Nuki-Web-API](#nuki-web-api)
3. [Kanäle & Zustände](#channels--states)
4. [Smart Home / Alexa-Integration mit ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
   1. [Tür abschließen um 22 Uhr abends](#lock-door-at-10pm-in-the-evening)
   2. [Lassen Sie sich von Alexa über Sperränderungen informieren](#let-alexa-inform-you-about-lock-changes)
   3. [Lassen Sie sich von Telegram über Sperränderungen informieren](#let-telegram-inform-you-about-lock-changes)
   4. [Lassen Sie sich von Alexa und Telegram über jemanden informieren, der über Opener klingelt](#let-telegram-and-alexa-inform-you-about-somebody-ringing-via-opener)
5. [Änderungsprotokoll](#Änderungsprotokoll)
6. [Credits](#Credits)
7. [Lizenz](#Lizenz)

## Merkmale
- Unterstützung für Nuki Smartlock und Nuki Opener
- Unterstützung für Nuki Bridge API und Nuki Web API
- ~~Unterstützung für gehashte Token auf Hardwarebrücken (siehe https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- Fallback auf die Nuki Web API falls angewendete Aktionen auf der Nuki Bridge API fehlschlagen, z.B. wegen Bridge Error 503 (siehe https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Wiederholen, falls angewendete Aktionen auf der Nuki Bridge API fehlschlagen (wenn die Nuki Web API nicht verwendet wird)
- Option zur regelmäßigen Synchronisierung anstelle des Bridge-API-Callbacks (der aufgrund von Hardware Bridge verzögert werden kann)
- Aktualisieren aller Zustände der Nuki Web API, wenn der Callback über die Nuki Bridge API empfangen wird
- Autorisierte Benutzer für Nuki Smartlock und Nuki Opener abrufen (siehe unten [Channels & States](#general-information))
- Konfiguration für Nuki Smartlock und Nuki Opener abrufen (siehe unten [Channels & States](#general-config))
- Setup Nuki Notifications abrufen (siehe unten [Channels & States](#users))
- Webinterface, das die letzten Ereignisse von deinem Nuki Smartlock und Nuki Opener anzeigt:

  ![Nuki Erweitertes Webinterface](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Installation
### Nuki Bridge-API
So erhalten Sie Ihr Hardware-Bridge-Token (funktioniert nicht für Software-Bridges):

1. Rufen Sie ```http://<bridge_ip>:<bridge_port>/auth``` von einem beliebigen Browser in Ihrem Netzwerk aus auf. Die Bridge schaltet ihre LED ein.
2. Drücken Sie innerhalb von 30 Sekunden die Taste der Bridge.
3. Ergebnis des Browseraufrufs sollte in etwa so aussehen:

```
{
   "token":"token123",
   "success":true
}
```

4. Verwenden Sie den generierten Token im nuki-extended Adapter.

### Nuki Web-API
Gehen Sie wie folgt vor, um die Nuki Web API zu verwenden:

1. Rufen Sie einen Token unter https://web.nuki.io/de/#/admin/web-api ab
2. Verwenden Sie diesen Token im nuki-extended Adapter
3. Stellen Sie sicher, dass Ihre nuki Geräte auf der Nuki Web API veröffentlicht sind (verwenden Sie die Smartphone App über Einstellungen „Nuki Web aktivieren“)

## Kanäle & Zustände
Wenn Sie ioBroker.nuki-extended erfolgreich eingerichtet haben, werden die folgenden Kanäle und Zustände erstellt:

### Bridges (mit Nuki Bridge API)
Als Gerät wird eine Bridge mit dem Namensmuster ```bridge__<name of bridge>``` angelegt. Die folgenden Kanäle / Zustände werden in jeder Brücke erstellt:

| Kanal | Zustand | Beschreibung |
|:------- |:----- |:----------- |
| - | \_verbunden | Flag, das angibt, ob die Bridge mit dem Nuki-Server verbunden ist oder nicht |
| - | Name | Name der Bridge / des Servers |
| - | BridgeId | ID der Bridge / des Servers |
| - | BridgeIp | IP-Adresse der Bridge |
| - | BridgePort | Hafen der Brücke |
| - | Brückentyp | Art der Brücke |
| - | Hardware-ID | ID der Hardwarebrücke (nur Hardwarebrücke) |
| - | aufgefrischt | Zeitstempel der letzten Aktualisierung |
| - | Betriebszeit | Betriebszeit der Brücke in Sekunden |
| - | versFirmware | Version der Bridge-Firmware (nur Hardware-Bridge) |
| - | versWifi | Version der WLAN-Modul-Firmware (nur Hardware-Bridge) |
| - | versApp | Version der Bridge-App (nur Software Bridge) |
| Rückrufe | - | Rückrufe der Brücke |
| Rückrufe | Liste | Liste der Rückrufe |
| Rückrufe._callbackId_ | \_löschen | Löschen Sie den Rückruf |
| Rückrufe._callbackId_ | url | URL des Rückrufs |

### Allgemeine Informationen
| Kanal | Zustand | Beschreibung |
|:------- |:----- |:----------- |
| - | Verbindung | Verbindungsstatus des Adapters |
| - | bridgeApiSync | Zeigt an, ob die Synchronisierung über die Bridge-API aktiviert ist |
| - | bridgeApiLast | Zeitstempel der letzten Bridge-API-Synchronisierung |
| - | webApiSync | Gibt an, ob die Synchronisierung über die Web-API aktiviert ist |
| - | webApiLast | Zeitstempel der letzten Web-API-Synchronisierung |
| Benachrichtigungen | - | Benachrichtigungen |
| Benachrichtigungen._BenachrichtigungsIndex_ | - | - |
| Benachrichtigungen._NotificationIndex_.Einstellungen | - | Benachrichtigungseinstellungen |
| notifications._notificationIndex_.settings._settingsIndex_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | Authentifizierungs-IDs | Eine Reihe von Authentifizierungs-IDs zum Filtern von Push-Benachrichtigungen an bestimmte Benutzer oder Tastaturen. Wenn kein Eintrag erfolgt, werden Push-Benachrichtigungen für alle Benutzer und Tastaturen ausgelöst |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | Die Smartlock-ID, wenn nicht gesetzt, werden alle Smart Locks des Kontos für Push-Benachrichtigungen aktiviert |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | Ein Set, auf dem Push-Benachrichtigungen ausgelöst werden sollen: Lock, Unlock, Unlatch, Lockngo, Open, Ring, Doorsensor, Warnings, Smartlock |
| Benachrichtigungen._BenachrichtigungsIndex_ | Sprache | Die Sprache der Push-Nachrichten |
| Benachrichtigungen._BenachrichtigungsIndex_ | lastActiveDate | Das letzte aktive Datum |
| Benachrichtigungen._BenachrichtigungsIndex_ | Benachrichtigungs-ID | Die eindeutige Benachrichtigungs-ID für die Benachrichtigung |
| Benachrichtigungen._BenachrichtigungsIndex_ | os | Das Betriebssystem<br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| Benachrichtigungen._BenachrichtigungsIndex_ | pushId | Die Push-ID oder die POST-URL für einen Webhook |
| Benachrichtigungen._BenachrichtigungsIndex_ | Referenz-ID | Die Referenz-ID, eine ID zur Identifizierung eines Fremdsystems |
| Benachrichtigungen._BenachrichtigungsIndex_ | Zustand | Aktueller Aktivierungszustand<br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| Benachrichtigungen._BenachrichtigungsIndex_ | Zustand | Aktueller Aktivierungszustand<br> `{&quot;0&quot;: &#39;INIT&#39;, &quot;1&quot;: &#39;AKTIV&#39;, &quot;2&quot;: &#39;FEHLGESCHLAGEN&#39;}` |

### Smartlocks und Opener (mit Nuki Bridge API)
Als Gerät wird ein Schloss mit dem Namensmuster ```door__<name of door>``` angelegt. Die folgenden Kanäle / Zustände werden in jedem Schloss erstellt (bei Verwendung der Nuki Bridge API):

| Kanal | Zustand | Beschreibung |
|:------- |:----- |:----------- |
| - | \_AKTION | Lösen Sie eine Aktion am Schloss | aus |
| - | ID | ID des Nuki |
| - | Name | Name des Nuki |
| - | Typ | Gerätetyp |
| - | BridgeId | Bridge-ID des Nuki |
| Zustand | - | Aktueller Zustand des Schlosses |
| Zustand | Batteriekritisch** | Gibt kritischen Batteriestand an |
| Zustand | lockState** | Aktueller Sperrzustand des Nuki |
| Zustand | gesperrt** | Anzeige bei verriegelter Tür |
| Zustand | aufgefrischt** | Zeitstempel der letzten Aktualisierung |

_** markierte Zustände werden bei einer Nuki-Aktion aktualisiert, wenn Callback gesetzt ist_

### Smartlocks und Opener (mit Nuki Web API)
Als Gerät wird ein Schloss mit dem Namensmuster ```door__<name of door>``` angelegt. Die folgenden Kanäle / Zustände werden in jedem Schloss erstellt (bei Verwendung der Nuki Web API):

| Kanal | Zustand | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| - | \_AKTION | Lösen Sie eine Aktion am Schloss | aus |
| - | ID | ID des Nuki |
| - | Name | Name des Nuki |
| - | Typ | Gerätetyp |
| - | Protokolle | Protokolle / Geschichte von Nuki |
| - | BridgeId | Bridge-ID des Nuki |

#### Information
| Kanal | Zustand | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Infos | - | Zusätzliche Informationen |
| Infos | Konto-ID | Die Konto-ID |
| Infos | Authentifizierungs-ID | Die Berechtigungs-ID |
| Infos | Favorit | Die Lieblingsfahne |
| Infos | FirmwareVersion | Die Firmware-Version |
| Infos | HardwareVersion | Die Hardwareversion |
| Infos | Vorgangs-ID | Die Vorgangs-ID – wenn gesetzt, ist das Gerät für einen anderen Vorgang gesperrt |
| Infos | Serverstatus | Der Serverstatus<br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| Infos | adminPinState | Der Admin-Pin-Status<br> `{&quot;0&quot;: &#39;OK&#39;, &quot;1&quot;: &#39;FEHLEND&#39;, &quot;2&quot;: &#39;UNGÜLTIG&#39;}` |
| Infos | virtuellesGerät | Das Flag, das ein virtuelles Smart Lock anzeigt |
| Infos | Erstellungsdatum | Das Erstellungsdatum |
| Infos | DatumAktualisiert | Das Aktualisierungsdatum |

#### Bundesland
| Kanal | Zustand | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Zustand | - | Aktueller Zustand des Schlosses |
| Zustand | BatterieKritisch | Gibt kritischen Batteriestand an |
| Zustand | geschlossen | Anzeige, ob Tür geschlossen ist (boolescher Wert von doorState) |
| Zustand | TürZustand | Aktueller Türzustand des Nuki |
| Zustand | letzteAktion | Letzte ausgelöste Aktion |
| Zustand | lockState | Aktueller Sperrzustand des Nuki |
| Zustand | gesperrt | Anzeige bei verriegelter Tür |
| Zustand | Modus | Der Smartlock-Modus<br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| Zustand | ringToOpenTimer | Verbleibender Ring bis Öffnungszeit |
| Staat | auslösen | Der Zustandsauslöser<br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| Zustand | auslösen | Der Zustandsauslöser<br> `{&quot;0&quot;: &#39;SYSTEM&#39;, &quot;1&quot;: &#39;MANUAL&#39;, &quot;2&quot;: &#39;BUTTON&#39;, &quot;3&quot;: &#39;AUTOMATIC&#39;, &quot;4&quot;: &#39;WEB&#39;, &quot;5&quot;: &#39;APP&#39;} ` |

#### Allgemeine Konfig
| Kanal | Zustand | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Konfiguration | - | Konfiguration |
| Konfiguration | Werbemodus | Der Werbemodus (Batterieschonung)<br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| Konfiguration | autoUnlatch | True, wenn die Tür beim Entriegeln (Knopf) entriegelt werden soll |
| Konfiguration | SchaltflächeAktiviert | True, wenn die Schaltfläche auf dem Smartlock aktiviert ist |
| Konfiguration | Fähigkeiten | Die Fähigkeiten zeigen an, ob die Türöffnung über App, RTO oder beides möglich ist |
| Konfiguration | fobAktion1 | Die Fob-Aktion, wenn die Taste einmal gedrückt wird<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| Konfiguration | fobAktion2 | Die Schlüsselanhänger-Aktion, wenn die Taste zweimal gedrückt wird<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| Konfiguration | fobAktion3 | Die Schlüsselanhänger-Aktion, wenn die Taste dreimal gedrückt wird<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| Konfiguration | fobAktion3 | Die Schlüsselanhänger-Aktion, wenn die Taste dreimal gedrückt wird<br> `{&quot;0&quot;: &#39;NONE&#39;, &quot;1&quot;: &#39;UNLOCK&#39;, &quot;2&quot;: &#39;LOCK&#39;, &quot;3&quot;: &#39;LOCK_N_GO&#39;, &quot;4&quot;: &#39;INTELLIGENT&#39;}` |
| Konfiguration | fobGepaart | True, wenn ein Schlüsselanhänger mit dem Smartlock gekoppelt ist |
| Konfiguration | gpsLatitude | Breitengrad |
| Konfiguration | homekitState | Der Homekit-Zustand<br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| Konfiguration | homekitState | Der Homekit-Zustand<br> `{&quot;0&quot;: &#39;NICHT VERFÜGBAR&#39;, &quot;1&quot;: &#39;DEAKTIVIERT&#39;, &quot;2&quot;: &#39;AKTIVIERT&#39;, &quot;3&quot;: &#39;AKTIVIERT &amp; KOPPELT&#39;}` |
| Konfiguration | TastaturGepaart | True, wenn eine Tastatur mit dem Smartlock gekoppelt ist |
| Konfiguration | ledHelligkeit | Die Helligkeit der LED: 0 (aus) bis 5 (max) |
| Konfiguration | ledEnabled | True, wenn die LED am Smartlock aktiviert ist |
| Konfiguration | Name | Der Name des Smartlocks für neue Benutzer |
| Konfiguration | Betriebsmodus | Die Betriebsart des Öffners |
| Konfiguration | PairingEnabled | True, wenn die Kopplung über die Smartlock-Taste | erlaubt ist |
| Konfiguration | singleLock | True, wenn das Smartlock nur einmal (statt zweimal) sperren soll |
| Konfiguration | Zeitzonen-ID | Die Zeitzonen-ID |
| Konfiguration | ZeitzonenOffset | Der Zeitzonen-Offset (in Minuten) |

#### Erweiterte Konfig
| Kanal | Zustand | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Erweiterte Konfiguration |
| advancedConfig | autoLockTimeout | Sekunden, bis sich das Smart Lock nach dem Entriegeln wieder verriegelt. Keine automatische Neusperre, wenn der Wert 0 ist. |
| advancedConfig | automatische Batterietyperkennung | Flag, das anzeigt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| advancedConfig | Batterietyp | Der Typ der im Smart Lock vorhandenen Batterien<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | Die gewünschte Aktion, wenn die Taste zweimal gedrückt wird<br> `{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;UNLOCK&quot;, &quot;3&quot;: &quot;LOCK&quot;, &quot;4&quot;: &quot;UNLATCH&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
| advancedConfig | lngTimeout | Timeout in Sekunden für Lock ’n’ Go |
| advancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird<br> `{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;UNLOCK&quot;, &quot;3&quot;: &quot;LOCK&quot;, &quot;4&quot;: &quot;UNLATCH&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
| advancedConfig | singleLockedPositionOffsetDegrees | Offset, der die einzelne Verriegelungsposition verändert |
| advancedConfig | totalDegrees | Die absolute Gesamtposition in Grad, die während der Kalibrierung erreicht wurde |
| advancedConfig | Entriegelungsdauer | Dauer in Sekunden für das Halten der Falle in entriegelter Position |
| advancedConfig | unlockedPositionOffsetDegrees | Offset, der die entriegelte Position verändert |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | Offset, der die Position ändert, an der der Übergang von entsperrt zu gesperrt erfolgt |

#### Opener Erweiterte Konfig
| Kanal | Zustand | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Opener-Konfiguration |
| openerAdvancedConfig | Gegensprech-ID | Die Datenbank-ID der verbundenen Gegensprechanlage |
| openerAdvancedConfig | busModeSwitch | Methode zum Umschalten zwischen Daten- und Analogmodus<br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | Dauer des Kurzschlusses für BUS-Mode-Umschaltung in ms |
| openerAdvancedConfig | electricStrikeDelay | Auslöseverzögerung des Türöffners in ms (nach Schlossfall 3 -Öffnerbetätigung-) |
| openerAdvancedConfig | randomElectricStrikeDelay | Zufälliges electricStrikeDelay (Bereich 3000 - 7000 ms), um eine Person im Inneren zu simulieren, die den Türöffner betätigt |
| openerAdvancedConfig | electricStrikeDuration | Dauer der Türöffnerbetätigung in ms (Schloßaktion 3 -Türöffnerbetätigung-) |
| openerAdvancedConfig | disableRtoAfterRing | Flag zum Deaktivieren von RTO nach dem Klingeln |
| openerAdvancedConfig | TürklingelUnterdrückung | Der Türklingel-Unterdrückungsmodus<br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | TürklingelUnterdrückung | Der Türklingel-Unterdrückungsmodus<br> `{&quot;0&quot;: &#39;NIE&#39;, &quot;1&quot;: &#39;IMMER&#39;, &quot;2&quot;: &#39;RTO&#39;, &quot;3&quot;: &#39;KONTINUIERLICH&#39;, &quot;4&quot;: &#39;KONTINUIERLICH + RTO&#39;}` |
| openerAdvancedConfig | TürklingelUnterdrückungsdauer | Dauer der Klingelunterdrückung in ms (nur in Betriebsart 2 -digitales Intercom-) |
| openerAdvancedConfig | soundRing | Der Ton für Klingeln |
| openerAdvancedConfig | TonÖffnen | Der Ton für offene |
| openerAdvancedConfig | soundRto | Der Ton für RTO |
| openerAdvancedConfig | soundCm | Der Ton für CM |
| openerAdvancedConfig | soundConfirmation | Die Tonbestätigung |
| openerAdvancedConfig | Schallpegel | Der Schallpegel |
| openerAdvancedConfig | singleButtonPressAction | Die gewünschte Aktion, wenn die Taste einmal gedrückt wird |
| openerAdvancedConfig | Batterietyp | Der Typ der im Smart Lock vorhandenen Batterien<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | Batterietyp | Der Typ der im Smart Lock vorhandenen Batterien<br> `{&quot;0&quot;: &#39;ALKALI&#39;, &quot;1&quot;: &#39;AKKU&#39;, &quot;2&quot;: &#39;LITHIUM&#39;}` |
| openerAdvancedConfig | automatische Batterietyperkennung | Flag, das anzeigt, ob die automatische Erkennung des Batterietyps aktiviert ist |
| openerAdvancedConfig | Vorgangs-ID | Die Vorgangs-ID – wenn das festgelegte Gerät für einen anderen Vorgang gesperrt ist |

#### Benutzer
| Kanal | Zustand | Beschreibung (mögliche Werte) |
|:------- |:----- |:----------------------------- |
| Benutzer | - | Benutzer der Sperre |
| Benutzer._Benutzername_ | - | Benutzer _Benutzername_ |
| Benutzer._Benutzername_ | erlaubtVonDatum | Das zulässige Ab-Datum |
| Benutzer._Benutzername_ | erlaubtUntilDate | Das Erlaubt-bis-Datum |
| Benutzer._Benutzername_ | erlaubtWochentage | Die erlaubten Wochentage<br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| Benutzer._Benutzername_ | erlaubtVonZeit | Die erlaubte Zeit (in Minuten ab Mitternacht) |
| Benutzer._Benutzername_ | erlaubtUntilTime | Die zulässige Bis-Zeit (in Minuten ab Mitternacht) |
| Benutzer._Benutzername_ | Authentifizierungs-ID | Die Smartlock-Autorisierungs-ID |
| Benutzer._Benutzername_ | Erstellungsdatum | Das Erstellungsdatum |
| Benutzer._Benutzername_ | DatumAktualisiert | Das Aktualisierungsdatum |
| Benutzer._Benutzername_ | dateLastActive | Das letzte aktive Datum |
| Benutzer._Benutzername_ | aktiviert | True, wenn der Benutzer aktiviert ist |
| Benutzer._Benutzername_ | ID | Die eindeutige ID des Benutzers |
| Benutzer._Benutzername_ | lockCount | Die Anzahl der Sperren |
| Benutzer._Benutzername_ | Name | Benutzername |
| Benutzer._Benutzername_ | remoteErlaubt | True, wenn die Authentifizierung Fernzugriff hat |
| Benutzer._Benutzername_ | Typ | Die Art der Autorisierung<br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| Benutzer._Benutzername_ | Typ | Die Art der Autorisierung<br> `{&quot;0&quot;: &#39;APP&#39;, &quot;1&quot;: &#39;BRIDGE&#39;, &quot;2&quot;: &#39;FOB&#39;, &quot;3&quot;: &#39;KEYPAD&#39;, &quot;13&quot;: &#39;KEYPAD CODE&#39;, &quot;14&quot;: &#39;Z- KEY&#39;, &quot;15&quot;: &#39;VIRTUELL&#39;}` |

## Smart Home / Alexa-Integration mit ioBroker.javascript
Einige Beispiele für eine mögliche Integration in Ihr Smart Home.

### Tür um 22 Uhr abends abschließen
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

__Ersetzen Sie `nuki-extended.0.door__home_door.status.lockState` durch den lockState Ihres Schlosses!__ Sie können die Nachricht auch über `msg` anpassen.

### Lassen Sie sich von Alexa über Sperränderungen informieren
Dazu wird der ioBroker-Adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2) benötigt.

Um die Sprachausgabe von Alexa zu nutzen definieren wir eine Funktion ```say```. Platzieren Sie die folgende Funktion in einem Skript im Ordner "global" von ioBroker.javascript. WICHTIG: Ersetzen Sie #IHRE ALEXA-ID# (ersetzen Sie auch #) durch Ihre Alexa-ID. Sie finden die Alexa-ID im Objektbaum von ioBroker ```alexa2.0.Echo-Devices```.

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

Sie können diese Funktion innerhalb von ioBroker.javascript verwenden, um einen Satz mit Alexa ```say('Hello World')``` oder ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` für die Sprachausgabe von mehreren Geräten zu sagen.

Erstellen Sie ein Skript im Ordner „common“ von ioBroker.javascript und fügen Sie den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID# (ersetzen Sie auch #) durch den Status, der den Sperrstatus enthält (z. B. ```nuki-extended.0.door__home_door.status.lockState```):

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

### Lassen Sie sich von Telegram über Lock-Änderungen informieren
Hierfür wird der ioBroker-Adapter ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram) benötigt.

Um die Nachrichtenausgabe von Telegram zu nutzen, definieren wir eine Funktion ```msg``` und ```messenger```. Platzieren Sie die folgende Funktion in einem Skript im Ordner "global" von ioBroker.javascript:

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

Erstellen Sie ein Skript im Ordner „common“ von ioBroker.javascript und fügen Sie den folgenden Listener hinzu. WICHTIG: Ersetzen Sie #LOCK STATE ID# (ersetzen Sie auch #) durch den Status, der den Sperrstatus enthält (z. B. ```nuki-extended.0.door__home_door.status.lockState```):

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

HINWEIS: Wenn Sie sowohl das Alexa- als auch das Telegram-Skript verwenden, dürfen Sie nur einen Listener für beide Aktionen definieren:

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

### Lassen Sie sich von Telegram und Alexa über Opener informieren, wenn jemand klingelt
Hierfür wird der ioBroker-Adapter ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram) und der ioBroker-Adapter ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2) benötigt.

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

Icons erstellt von <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> ([Essential Set] (https://www.flaticon.com/packs/essential-set-2)) und <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Doors](https://www.flaticon.com/packs/doors)) von <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> ist lizenziert durch <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

<!-- ### __WORK IN PROGRESS__ -->
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