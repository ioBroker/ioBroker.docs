---
chapters: {"pages":{"en/adapterref/iobroker.bluetti/README.md":{"title":{"en":"ioBroker.bluetti"},"content":"en/adapterref/iobroker.bluetti/README.md"},"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md":{"title":{"en":"BLUETTI Home Assistant API Notes"},"content":"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md"},"en/adapterref/iobroker.bluetti/docs/auth-flow.md":{"title":{"en":"BLUETTI Auth, Token and Device Selection Flow"},"content":"en/adapterref/iobroker.bluetti/docs/auth-flow.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md
title: Hinweise zur BLUETTI Home Assistant-API
hash: A4hfJQ6z0t2Hh3EflPOdpOKrCdf8pwfiXet3bjuFHoQ=
---
# Hinweise zur BLUETTI Home Assistant-API

Status: Quellenrecherche basierend auf der offiziellen BLUETTI Home Assistant-Integration.

Forschungsquelle:

- Repository: <https://github.com/bluetti-official/bluetti-home-assistant>
- Lokaler Forschungsklon:`/home/pascal/work/iobroker-bluetti-work/sources/bluetti-home-assistant`
- Quellcode-Commit geprüft:`64aa1f85e2eea9c6621cc80d390d7252cd13a83c`

Diese Notizen erfassen absichtlich nur durch die Quelle belegte Details. Die tatsächlichen Payload-Werte von Elite 30 V2 müssen weiterhin mit einer bereinigten Konto-/Geräteantwort validiert werden.

## Quelldateien geprüft

- `README.md`
- `custom_components/bluetti/config_flow.py`
- `custom_components/bluetti/application_credentials.py`
- `custom_components/bluetti/profile/application.yaml`
- `custom_components/bluetti/oauth.py`
- `custom_components/bluetti/__init__.py`
- `custom_components/bluetti/api/bluetti.py`
- `custom_components/bluetti/api/product_client.py`
- `custom_components/bluetti/api/websocket.py`
- `custom_components/bluetti/api/unify_response.py`
- `custom_components/bluetti/model/product.py`
- `custom_components/bluetti/models.py`
- `custom_components/bluetti/sensor.py`
- `custom_components/bluetti/switch.py`
- `custom_components/bluetti/select.py`
- `custom_components/bluetti/icon_config.py`

## Offizieller Integrationsumfang

In der vorgelagerten README-Datei heißt es, dass die Integration offiziell von BLUETTI unterstützt wird und BLUETTI Smart Power Station-Geräte mit Home Assistant verbindet (`README.md:6-11` ).

Die vorgelagerte Funktionsliste umfasst:

- Netzschalter
- Wechselrichterstatus
- Batterie-SOC
- AC/DC-Schalter
- AC/DC ECO
- Arbeitsmodusschalter
- Schlafmodus
- PV-Eingangsleistung
- Netzeingangsleistung
- Wechselstrom-Ausgangsleistung
- Gleichstrom-Ausgangsleistung

Quelle:`README.md:13-28` Die

Die vorgelagerten Modellmatrixlisten`PR30V2,EL30V2` / "Premium 30 V2, Elite 30 V2, AORA 30 V2" mit Unterstützung für Batterie-SOC, AC-Schalter, DC-Schalter, AC ECO, DC ECO, Arbeitsmodus-Schalter, Schlafmodus, PV-Eingangsleistung, Netz-Eingangsleistung, AC-Ausgangsleistung und DC-Ausgangsleistung (`README.md:36-50` ).

Dies bestätigt die offizielle Integrationsunterstützung für die Elite 30 V2-Modellfamilie auf Feature-Matrix-Ebene. Die tatsächlichen Feldnamen oder Beispielwerte eines realen EL30V2-Kontos werden jedoch noch **nicht** überprüft.

## Konfiguration und OAuth-Ablauf

Die vorgelagerte README-Datei beschreibt einen Konfigurationsablauf für Home Assistant, bei dem der Benutzer Folgendes hinzufügt:`bluetti` Die Integration erfolgt, die OAuth-Autorisierung wird durchgeführt, Home Assistant wird der Zugriff auf das BLUETTI-Konto/die Cloud gestattet, es wird beim BLUETTI-Konto angemeldet, dieses wird mit Home Assistant verknüpft und Geräte werden ausgewählt (`README.md:105-135` ).

Die Integration nutzt das OAuth/Anwendungsanmeldeinformations-Framework von Home Assistant:

- `config_flow.py:15-19` Importiert standardmäßige OAuth-Client-Anmeldeinformationen. Der Adapter verwendet dieselben integrierten Standardeinstellungen für die Administratoranmeldung und ermöglicht weiterhin die Anpassung durch Experten über direkte Bearbeitung nativer Objekte.
- `application_credentials.py:13-16` Erstellt die Autorisierungs- und Token-URLs aus der konfigurierten SSO-Basis-URL.
- `oauth.py:24-38` implementiert ein`OAuth2FlowHandler` Nach dem OAuth-Callback wird die Geräteauswahl fortgesetzt.
- `oauth.py:93-102` Verwendung`self._oauth_data['token']['access_token']` um ein`ProductClient` und anrufen`get_user_products()` Die
- `oauth.py:137-149` Die verfügbaren Geräte werden als Home Assistant-Mehrfachauswahl angezeigt.
- `oauth.py:42-90` Anrufe`bind_devices()` für die ausgewählten Geräteseriennummern und Geschäfte`auth_implementation` ,`token` und ausgewählt`products` im Konfigurationseintrag.

### OAuth-Endpunkte

Die Profildatei enthält diese Basis-URLs (`profile/application.yaml:1-5` ):

| Zweck             | URL                                                        |
| ----------------- | ---------------------------------------------------------- |
| SSO-Basis         | `https://sso.bluettipower.com`                             |
| API-Gateway-Basis | `https://gw.bluettipower.com`                              |
| WebSocket-Basis   | `wss://gw.bluettipower.com/api/edgeiotgw/ws-coordination/` |

Der Autorisierungsserver ist wie folgt aufgebaut (`application_credentials.py:13-16` ):

| Zweck               | URL                                         |
| ------------------- | ------------------------------------------- |
| OAuth-Autorisierung | `https://sso.bluettipower.com/oauth2/grant` |
| OAuth-Token         | `https://sso.bluettipower.com/oauth2/token` |

### Token-Verarbeitung

- REST-Anfragen senden das Zugriffstoken als unverschlüsseltes Token.`Authorization` Header-Wert, ohne ein`Bearer ` Präfix im Upstream-Code (`api/bluetti.py:63-65` ).
- WebSocket/STOMP-Verbindungsheader senden auch das Zugriffstoken als`Authorization` (`api/websocket.py:20-25` ).
- `AsyncConfigEntryAuth.async_get_access_token()` Ruft Home Assistant an`async_ensure_token_valid()` vor der Rückgabe des Zugriffstokens (`oauth.py:172-175` ).
- `AuthTokenRefresh` prüft das Ablaufdatum des Tokens einmal beim Start und anschließend täglich (`oauth.py:191-205` ).
- Die Gültigkeit des Tokens wird entweder aus dem`expires_at` oder`created_at + expires_in` mit einem Sicherheitsspielraum von 30 Sekunden (`oauth.py:209-225` ).
- Wenn ein Token weniger als sieben Tage gültig ist, ruft die Integration die OAuth-Implementierung von Home Assistant auf.`async_refresh_token(...)` , gedrosselt auf höchstens einmal pro Stunde nach einem vorherigen Aktualisierungsversuch (`oauth.py:241-267` ).
- Die Behandlung abgelaufener Tokens verwendet das Ereignis`onTokenExpired` und dauerhafte Benachrichtigung`notifyTokenExpire` (`const.py:7-8` ,`oauth.py:178-239` ).
- WebSocket`ERROR` Rahmen mit`msgCode == 805` werden als Token-Ablauf behandelt und beenden die WebSocket-Verbindung (`api/websocket.py:153-161` ).

Quellcode-Eigenheit, die vor der Implementierung überprüft werden muss: Prüfungen zur Behandlung des Ablaufs von REST-Tokens`data['code'] == 805` In`api/bluetti.py:93-101` , während das Antwortmodell ist`msgCode` (`api/unify_response.py:7-20` Dies könnte ein Fehler im vorgelagerten Prozess oder eine Inkonsistenz in der Antwortform sein.

## Verifizierte REST-Endpunkte

Alle REST-Endpunkte werden aufgerufen über`_request(...)` , wodurch dem Pfad ein Präfix vorangestellt wird`APPLICATION_PROFILE.config["server"]["gateway"]` (`api/bluetti.py:76-81` ). Mit dem Produktionsprofil bedeutet dies`https://gw.bluettipower.com` (`profile/application.yaml:1-5` ).

| Zweck                             | Verfahren | Vollständige URL                                                             | Quelle                        |
| --------------------------------- | --------: | ---------------------------------------------------------------------------- | ----------------------------- |
| Benutzergeräte/Produkte auflisten |  ERHALTEN | `https://gw.bluettipower.com/api/bluiotdata/ha/v1/devices`                   | `api/product_client.py:30-39` |
| Status des Abfragegeräts          |  ERHALTEN | `https://gw.bluettipower.com/api/bluiotdata/ha/v1/deviceStates?sns=<serial>` | `api/product_client.py:41-50` |
| Funktion des Steuergeräts         |      POST | `https://gw.bluettipower.com/api/bluiotdata/ha/v1/fulfillment`               | `api/product_client.py:52-61` |
| Ausgewählte Geräte binden         |      POST | `https://gw.bluettipower.com/api/bluiotdata/ha/v1/bindDevices`               | `api/product_client.py:62-70` |

In den ersten Versionen dieses ioBroker-Adapters ist der Kontrollendpunkt nur als Upstream-Verhalten dokumentiert. Er sollte nicht zugänglich gemacht werden, solange der Adapter schreibgeschützt ist.

## WebSocket-/Push-Update-Ablauf

Die Upstream-Integration ermöglicht außerdem eine STOMP-over-WebSocket-Verbindung:

- Die WebSocket-URL wird durch Anhängen erstellt`/websocket` zur konfigurierten WSS-Basis (`api/websocket.py:19-25` ), ergebend`wss://gw.bluettipower.com/api/edgeiotgw/ws-coordination//websocket` mit der aktuellen Profilzeichenfolge. Der doppelte Schrägstrich sollte überprüft werden, wird aber wahrscheinlich vom Server/Client toleriert oder normalisiert.
- Beim Öffnen sendet der Client ein STOMP-Paket.`CONNECT` Rahmen mit`accept-version` ,`Host` ,`Authorization` , Und`heart-beat` Überschriften (`api/websocket.py:75-85` ).
- Nach einem`CONNECTED` Rahmen, den er abonniert`/ws-subscribe/user/<user-name>/notify` (`api/websocket.py:162-168` ).
- An`MESSAGE` Der Frame-Body wird an den Handler übergeben (`api/websocket.py:169-170` ).
- `BluettiData.web_socket_message_handler()` erwartet JSON, wo`data.deviceSn` erkennt das geänderte Gerät und löst dann Folgendes aus`device.async_update()` für diese Seriennummer (`models.py:46-56` ).

Für eine erste ioBroker-Implementierung, Polling`deviceStates` ist der einfachere, validierte Pfad. WebSocket kann verzögert werden, es sei denn, Latenz- oder Ratenbegrenzungen erfordern dies.

## Antwort- und Gerätedatenmodell

### API-Wrapper

Der Upstream-Response-Wrapper ist`UnifyResponse` mit diesen Feldern (`api/unify_response.py:7-20` ):

- `msgId: str`
- `msgCode: int`
- `data: T | None`

`msgCode == 0` wird als Erfolg betrachtet.

### Benutzerprodukt-/Geräteobjekt

`UserProduct` wird modelliert mit (`model/product.py:6-15` ):

- `sn: str`
- `stateList: list`
- `online: str`
- `model: Optional[str]`
- `name: Optional[str]`
- `isBindByCurUser: Optional[str]`

### Einträge in der Staatsliste

Jede`stateList` Der Eintrag ist abgebildet in`models.py:104-114` hinein:

- `fnCode` →`BluettiState.fn_code`
- `fnName` →`BluettiState.fn_name`
- `fnValue` →`BluettiState.fn_value`
- `fnType` →`BluettiState.fn_type`
- `supportModeValues` → Modus/Auswahlwerte
- `sensorInfo` → Sensormetadaten

Die Abfrage des Gerätestatus aktualisiert die bestehenden Zustände, indem sie jeden eingehenden Eintrag mit den entsprechenden Daten abgleicht.`fnCode` und ersetzen`fnValue` (`models.py:201-229` ).

### Verhalten der Entitätszuordnung in Home Assistant

- Sensoren entstehen, wenn`fnType == 'SENSOR'` Und`sensorInfo` ist vorhanden (`sensor.py:87-96` ).
- Binäre Konnektivität wird als Sonderfall behandelt für`fnCode == 'onLine'` (`sensor.py:59-65` ,`sensor.py:97-98` ).
- Switch-Entitäten werden erstellt, wenn`fnType == 'SWITCH'` (`switch.py:24-29` ).
- Ausgewählte Entitäten werden erstellt, wenn`fnType == 'SELECT'` Und`supportModeValues` ist vorhanden (`select.py:24-28` ).
- `InvWorkState` wird als schreibgeschützte Diagnoseauswahl behandelt (`select.py:55-64` ,`select.py:89-93` ).

Sensormetadatenkarten stromaufwärts`sensorInfo.sensorType` Werte zu Home Assistant-Geräteklassen (`sensor.py:36-57` ):

| Vorstromsensortyp            | HA-Geräteklasse | Standardeinheit |
| ---------------------------- | --------------- | --------------- |
| `SensorDeviceClass.BATTERY`  | Batterie        | `%`             |
| `SensorDeviceClass.ENUM`     | enum            | —               |
| `SensorDeviceClass.DURATION` | Dauer           | `min`           |
| `SensorDeviceClass.POWER`    | Leistung        | `W`             |

Die Symbolzuordnungen erwähnen diese relevanten Punkte.`fnCode` Werte (`icon_config.py:4-28` ):

| `fnCode`                | Bedeutung abgeleitet vom Namen/Symbol des übergeordneten Kanals |
| ----------------------- | --------------------------------------------------------------- |
| `SOC`                   | Batterie-SOC                                                    |
| `InvWorkState`          | Wechselrichter/Betriebszustand                                  |
| `ChgFullTime`           | Vollladezeit                                                    |
| `ACLoadAllTotalPower`   | Gesamtleistung der Wechselstromlast/Ausgangsleistung            |
| `DCLoadAllTotalPower`   | Gesamtleistung der Gleichstromlast/Ausgangsleistung             |
| `PVAllTotalPower`       | PV-Eingangsleistung                                             |
| `GridAllTotalPower`     | Gesamtleistung des Netzeingangs                                 |
| `SetCtrlWorkMode`       | Arbeitsmodus auswählen                                          |
| `SetDCECO`              | DC ECO Auswahl/Steuerung                                        |
| `SetACECO`              | AC ECO Auswahl/Steuerung                                        |
| `SetCtrlAc`             | Wechselstromschalter                                            |
| `SetCtrlDc`             | Gleichstromschalter                                             |
| `SetCtrlPowerOn`        | Hauptschalter                                                   |
| `Storm_Mode_Cloud_Ctrl` | Sturmmodus-Wolkensteuerung                                      |
| `SetCtrlPowerOn-2`      | Schlaf-/Stromversorgungssteuerung                               |
| `onLine`                | Konnektivität                                                   |

Diese Namen sind nützliche Hinweise, aber echte EL30V2`stateList` Einträge müssen weiterhin validiert werden, bevor ein ioBroker-Status als verifiziert angezeigt wird.

## Verifizierte Elite 30 V2-Felder

Quellenverifiziert für die`PR30V2,EL30V2` Modellfamilie auf README-Matrixebene (`README.md:36-50` ):

| Fähigkeit                     | Verifizierter Quellenstatus |
| ----------------------------- | --------------------------- |
| Batterie-SOC                  | als unterstützt aufgeführt  |
| Wechselstromschalter          | als unterstützt aufgeführt  |
| Gleichstromschalter           | als unterstützt aufgeführt  |
| AC ECO                        | als unterstützt aufgeführt  |
| DC ECO                        | als unterstützt aufgeführt  |
| Arbeitsmodusschalter          | als unterstützt aufgeführt  |
| Schlafmodus                   | als unterstützt aufgeführt  |
| PV-Eingangsleistung           | als unterstützt aufgeführt  |
| Netzeingangsleistung          | als unterstützt aufgeführt  |
| Wechselstrom-Ausgangsleistung | als unterstützt aufgeführt  |
| Gleichstrom-Ausgangsleistung  | als unterstützt aufgeführt  |

## Verifizierte Elite 30 V2 Nutzlast

Aufgenommen am 05.07.2026 von einem Live-Stream`GET /api/bluiotdata/ha/v1/deviceStates` Antwort für eine echte Elite 30 V2 (`msgCode == 0` (Seriennummer geschwärzt).`stateList` enthielt genau diese 12 Einträge;`fnValue` wird in jedem Eintrag als Zeichenkette übermittelt:

| `fnCode`              | `fnName`                                | `fnType` | Beispiel`fnValue` | ioBroker-Zustand                          |
| --------------------- | --------------------------------------- | -------- | ----------------- | ----------------------------------------- |
| `SOC`                 | Batteriestand                           | SENSOR   | `79`              | `battery.soc`                             |
| `DsgFullTime`         | Akkulaufzeit in Minuten                 | SENSOR   | `2592`            | `battery.dischargeRemaining`              |
| `ChgFullTime`         | Vollständige Ladezeit in Minuten        | SENSOR   | `0`               | `battery.chargeRemaining`                 |
| `PVAllTotalPower`     | Eingangsleistung der Photovoltaikanlage | SENSOR   | `0`               | `power.pvInput`                           |
| `GridAllTotalPower`   | Netzeingangsleistung                    | SENSOR   | `241`             | `power.gridInput`                         |
| `ACLoadAllTotalPower` | Wechselstromausfall                     | SENSOR   | `241`             | `power.acOutput`                          |
| `DCLoadAllTotalPower` | Gleichstromausgang                      | SENSOR   | `0`               | `power.dcOutput`                          |
| `SetCtrlAc`           | Klimaanlage                             | SCHALTEN | `1`               | `power.acOutputActive` (schreibgeschützt) |
| `SetCtrlDc`           | DC                                      | SCHALTEN | `0`               | `power.dcOutputActive` (schreibgeschützt) |
| `SetACECO`            | AC ECO                                  | SCHALTEN | `0`               | `power.acEco` (schreibgeschützt)          |
| `SetDCECO`            | DC ECO                                  | SCHALTEN | `1`               | `power.dcEco` (schreibgeschützt)          |
| `SetCtrlWorkMode`     | Arbeitsmodus                            | WÄHLEN   | `workmode_3`      | `device.workMode`                         |

Durch diese Aufnahme bestätigt:

- Die generischen Power-fnCodes (`PVAllTotalPower` ,`GridAllTotalPower` ,`ACLoadAllTotalPower` ,`DCLoadAllTotalPower` ) **sind** die echten EL30V2-Bezeichnungen.
- `fnValue` ist sowohl für Sensoren als auch für Schalter vom Typ String; der Adapter konvertiert gemäß dem deklarierten Typ des Zielzustands.
- Der`SWITCH` /`SELECT` Einträge geben den aktuellen Status an; sie sind nur lesbar zugänglich.

In dieser Nutzlast nicht vorhanden, daher **nicht** offengelegt (darf nicht erfunden werden):

- Restenergie in Wh (`battery.remainingWh` )
- Batterietemperatur (`battery.temperature` )
- explizites UPS-Bypass-Flag (`ups.bypassActive` )
- `sensorInfo` Metadaten (fehlen im EL30V2)`stateList` Einträge)

Auch für andere Modelle/Firmwares offen:

- genau`fnCode` für Geräte, die nicht EL30V2 sind
- das vollständige`SetCtrlWorkMode` Wertebereich von Aufzählungen und menschliche Bezeichnungen

## Fehlerbehandlung und Statussignale

Verifiziertes, quellgestütztes Verhalten:

- Nicht-2xx-REST-Antworten lösen Probleme aus`ApplicationRuntimeException` mit HTTP-Status und Antworttext (`api/bluetti.py:86-88` ).
- Ablauf des WebSocket-Tokens wird erkannt als`ERROR` rahmen`msgCode == 805` (`api/websocket.py:153-161` ).
- Das Ablaufen des Tokens löst eine Home Assistant-Benachrichtigung aus, anstatt es endlos stillschweigend erneut zu versuchen (`oauth.py:227-239` ).
- Der Online-Status des Geräts wird angezeigt als`BluettiDevice.online` wahr, wenn`online == '1'` (`models.py:172-174` ).
- Wenn ein abgefragtes Gerät zurückgibt`isBindByCurUser == '0'` , Upstream startet einen Bereinigungspfad zum Aufheben der Gerätebindung (`models.py:201-229` und spätere Aufräumlogik in derselben Datei).

Offen für ioBroker-Design:

- Ordnen Sie HTTP 401/403 und den Token-Ablaufcode 805 dem expliziten Authentifizierungs-/Konfigurationsstatus zu, nicht dem Verdacht auf eine Störung.
- Ordnen Sie Gateway-/Netzwerk-Timeouts dem Erreichbarkeitsstatus des Anbieters/der Cloud zu.
- Karte`online != '1'` Geräte-Offline-Status, unabhängig von Cloud-/API-Fehlern.
- Halten`info.connection` konservativ: trifft nur dann zu, wenn der Anbieter mindestens ein ausgewähltes Gerät authentifizieren und nutzbare Telemetrie-/Statusdaten zurückgeben kann.

## Sicherheits- und Schwärzungsanforderungen

Folgendes darf vom ioBroker-Adapter niemals protokolliert werden:

- BLUETTI-Kontopasswort
- Zugriffstoken
- Aktualisierungstoken
- `Authorization` Überschrift
- vollständige Rohkonto-IDs
- Vollständige Seriennummern der Geräte, sofern nicht ausdrücklich geschwärzt
- Rohdaten der Telemetrie vor der Schwärzung

Im Upstream-Stream gibt es mindestens eine auskommentierte Debug-Zeile, die das Zugriffstoken protokolliert hätte (`api/websocket.py:31-33` ), und die Protokollierung von REST-Anfragen kann Anfragetexte enthalten (`api/bluetti.py:67-74` Die ioBroker-Implementierung sollte einen expliziten Sanitizer verwenden, anstatt diese Protokollierungsmuster zu kopieren.

## Entscheidung: Machbarkeit eines direkten Cloud-Anbieters

Ein direkter BLUETTI-Cloud-Anbieter ist, mit einigen Einschränkungen, durchaus machbar, um mit einem ioBroker-Adaptergerüst fortzufahren.

Quellengestützte Gründe:

- Eine offizielle Integration besteht und wird aufrechterhalten von`bluetti-official` (`README.md:6-11` ).
- Produktions-SSO, Gateway und WebSocket-Hosts sind im Quellcode vorhanden (`profile/application.yaml:1-5` ).
- Die REST-Endpunkte für Geräteliste und Gerätestatus sind vorhanden und klar gekapselt (`api/product_client.py:30-50` ).
- EL30V2/PR30V2 wird von der offiziellen Integration als unterstützt aufgeführt (`README.md:36-50` ).

Erforderliche Implementierungshinweise:

- Die erste Implementierung sollte ausschließlich in der Cloud erfolgen und nur lesend nutzbar sein.
- Implementieren Sie keine Kontrollzustände in Version 0.1, auch wenn der Upstream einen Erfüllungsendpunkt bereitstellt.
- Das Gerüst sollte Raum für einen OAuth-fähigen Admin-/Authentifizierungsablauf bieten. Eine einfache JSON-Konfiguration mit Benutzername und Passwort ist laut Quellcodeverifizierung nicht ausreichend.
- Umfrage via`deviceStates` sollte der erste Telemetriepfad sein; WebSocket kann später hinzugefügt werden.
- Es werden weiterhin real bereinigte EL30V2-Nutzdaten benötigt, bevor Felder, die über die README-Supportmatrix hinausgehen, als verifiziert markiert werden können.

## Unbekannte / Blockierer

- Genaue OAuth-Grant-Details und Umleitungsanforderungen außerhalb der Helper-Abstraktion von Home Assistant.
- Ob BLUETTI einen sicheren, nicht hochverfügbaren OAuth-Ablauf unterstützt, der für die ioBroker-Admin-UI geeignet ist.
- Token-Antwortfelder in der Praxis (`expires_at` ,`expires_in` , Vorhandensein von Aktualisierungstoken, Bereiche).
- Exact EL30V2`stateList` Nutzlastform und`fnCode` Werte.
- Ob die EL30V2-Telemetrie den UPS-Modus, Bypass, die verbleibende Kapazität in Wh, die Temperatur oder andere umfangreichere Diagnosedaten umfasst.
- Ratenbegrenzungen für`deviceStates` Umfragen.
- Ob der Cloud-Status zwischen BLUETTI-API-Ausfällen, Internetausfällen, Offline-Geräten und Konto-/Authentifizierungsfehlern klar unterscheidet.
- Ob das Verhalten von WebSocket-URLs mit Doppelschrägstrichen beabsichtigt oder toleriert ist.
- Ob der REST-Token-Ablaufcode`code == 805` oder`msgCode == 805` in Live-Antworten.