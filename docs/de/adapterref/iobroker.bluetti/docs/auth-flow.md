---
chapters: {"pages":{"en/adapterref/iobroker.bluetti/README.md":{"title":{"en":"ioBroker.bluetti"},"content":"en/adapterref/iobroker.bluetti/README.md"},"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md":{"title":{"en":"BLUETTI Home Assistant API Notes"},"content":"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md"},"en/adapterref/iobroker.bluetti/docs/auth-flow.md":{"title":{"en":"BLUETTI Auth, Token and Device Selection Flow"},"content":"en/adapterref/iobroker.bluetti/docs/auth-flow.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bluetti/docs/auth-flow.md
title: BLUETTI-Authentifizierungs-, Token- und Geräteauswahlablauf
hash: y4fx9qc/zcQeQsAFn/lPcFKvglx66XzwcTh290lLV2M=
---
# BLUETTI-Authentifizierungs-, Token- und Geräteauswahlablauf

> **Implementierungsstatus (Juli 2026): Implementiert und live verifiziert.** OAuth-Login, Token-Austausch/Aktualisierung, Geräteerkennung/-auswahl und Leseabfrage sind implementiert und wurden mit einem echten BLUETTI-Konto (Elite 30 V2) auf js-controller 7.0.7 durchgängig getestet. Die folgenden Abschnitte stellen den **ursprünglichen Entwurf** dar und werden aus historischen Gründen aufbewahrt; bei Abweichungen von der Implementierung gelten die folgenden Hinweise:
>
> - **Standardmäßige Client-Anmeldeinformationen werden mitgeliefert.** BLUETTIs SSO stellt keinen benutzerbezogenen OAuth-Client bereit; der Adapter verwendet standardmäßig den festen Client, der von der offiziellen Home Assistant-Integration verwendet wird (`client_id=HomeAssistant` ,`client_secret=SG9tZUFzc2lzdGFudA==` (wörtlich gesendet – _nicht_ Base64-dekodiert). Administratoren sehen keine Client-ID/geheimnis-Eingaben mehr; Expertenüberschreibungen funktionieren weiterhin über direkte Bearbeitungen nativer Objekte.
> - **Das rotierende OAuth-Token wird in einem verschlüsselten Zustand gespeichert (`auth.tokenJson` ), nicht in der nativen Konfiguration.** Jeder Schreibvorgang an`system.adapter.<ns>` Die Instanz wird neu gestartet, daher führte das Speichern des Tokens (oder des temporären Authentifizierungsstatus) in den nativen Feldern zu Neustartschleifen beim Anmelden und bei jeder Token-Aktualisierung. Die veralteten nativen Felder`oauthTokenJson` ,`oauthLastRefresh` , Und`authStatus` wurden in #140 entfernt.
> - **Die dynamische ioBroker-Admin-Callback-URL funktioniert.** BLUETTI akzeptiert sie sowohl beim Autorisierungs- als auch beim Tokenisierungsschritt; es gibt keine feste Whitelist für Redirect-URIs für diesen Client.
> - **Der Token-Austausch verwendet einen Standardformulartext** (Client-ID/Secret im Text, keine Basisauthentifizierung, kein PKCE, kein Scope). Die Autorisierung`code` Die vom Administrator prozentcodierte Nachricht kommt an und muss vor der Token-Anfrage URL-decodiert werden, andernfalls lehnt BLUETTI sie ab.`invalid_grant` Die
> - **REST-Aufrufe senden das Zugriffstoken ohne`Bearer ` Präfix.**
>
> Die offenen Fragen am Ende dieses Dokuments werden durch die obigen Ausführungen beantwortet. Eine bekannte Folgefrage bleibt jedoch bestehen: Das Token-Ablauffeld von BLUETTI wird noch nicht analysiert, sodass das Token bei jeder Abfrage aktualisiert wird (harmlos, da das Token in einem Zustand gespeichert ist, aber ressourcenintensiv).

Status: Repository-Architekturplan für Problem Nr. 15. Dieses Dokument soll im GitHub-Repository nachverfolgt werden, damit zukünftige Implementierungsarbeiten auf denselben Annahmen zum Authentifizierungsablauf und den gleichen offenen Fragen aufbauen können. Für dieses Dokument sind keine produktiven BLUETTI-Zugangsdaten erforderlich.

## Entscheidung

Die Implementierung eines kompletten OAuth-Ablaufs direkt im Code ist noch **nicht** der nächste sichere Schritt.

Eine erste kleine Implementierung ist erst dann sinnvoll, wenn ein weiterer, durch den Quellcode gestützter Testlauf die genauen Details der BLUETTI OAuth-Anfrage/Antwort außerhalb des OAuth-Helfers von Home Assistant bestätigt:

- ob BLUETTI die dynamische ioBroker Admin-Callback-URL akzeptiert als`redirect_uri` ,
- die genauen Autorisierungs-URL-Parameter,
- das genaue Token-Austauschformular/der Token-Text und die erforderlichen Header,
- ob Aktualisierungstoken immer zurückgegeben werden und wie Ablauffelder strukturiert sind.

Der Provider und die Tests decken bereits Token-Injektion, einen Aktualisierungsversuch und den API-Code für den Token-Ablauf ab.`805` und die Zuordnung von Cloud- zu Authentifizierungsfehlern. Was noch fehlt, ist der benutzerseitige OAuth-Bootstrap und die Konfiguration des persistenten Tokens/Geräts.

## Quellengestützte Fakten

Aus der offiziellen Home Assistant-Integration, dokumentiert in`docs/research/bluetti-ha-api-notes.md` :

| Bereich                       | Tatsache                                                                                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Autorisierungsendpunkt        | `https://sso.bluettipower.com/oauth2/grant`                                                                                                                        |
| Token-Endpunkt                | `https://sso.bluettipower.com/oauth2/token`                                                                                                                        |
| Kundenberechtigung            | Die vordefinierten Standardanmeldeinformationen werden vom Administrator verwendet; Experten können diese jedoch weiterhin direkt im nativen Objekt überschreiben. |
| Endpunkt der Geräteliste      | `GET https://gw.bluettipower.com/api/bluiotdata/ha/v1/devices`                                                                                                     |
| Gerätestatus-Endpunkt         | `GET https://gw.bluettipower.com/api/bluiotdata/ha/v1/deviceStates?sns=<serial>`                                                                                   |
| Gerätebindungsendpunkt        | `POST https://gw.bluettipower.com/api/bluiotdata/ha/v1/bindDevices` mit`{ "bindSnList": [...] }`                                                                   |
| REST-Authentifizierungsheader | Headername`Authorization` ; Der Wert ist die rohe Zugriffstoken-Zeichenfolge ohne`Bearer ` Präfix                                                                  |
| Token-Ablaufsignal            | HTTP 401/403 oder BLUETTI API-Code`805`                                                                                                                            |

Aus der ioBroker-Admin-/Adapter-Dokumentation:

- JSON-Konfiguration kann eine verwenden`sendTo` Knopf mit`openUrl` Den Adapter nach einer OAuth-Start-URL fragen und diese für den Benutzer öffnen.
- Administrator legt`/oauth2_callbacks/<adapterNamespace>/` sendet dann eine`oauth2Callback` Nachricht an diese Adapterinstanz mit den Abfrageparametern.
- Sensible Adapter-native Felder können aufgelistet werden in`encryptedNative` Und`protectedNative` In`io-package.json` Sie werden zur Laufzeit des Adapters entschlüsselt, aber nicht im Klartext gespeichert.
- Der neuere zentrale Anmeldeinformationsspeicher von ioBroker ist zwar vorhanden, erfordert jedoch neuere Plattformversionen als die, die dieser Adapter aktuell unterstützt. Für die erste Implementierung ist eine verschlüsselte/geschützte native Konfiguration besser geeignet.

OAuth-Endpunkt-Smoke-Check, 02.07.2026:

- Eine GET-Anfrage an`https://sso.bluettipower.com/oauth2/grant` mit`response_type=code` ,`client_id=HomeAssistant` , ein lokaler ioBroker-Stil`redirect_uri` (`http://127.0.0.1:8081/oauth2_callbacks/bluetti.0/` und eine zufällige`state` Es wurde der HTTP-Statuscode 200 mit der BLUETTI-Anmeldeseite zurückgegeben.
- Dies bestätigt, dass BLUETTI die dynamische Callback-URL vor dem Login nicht ablehnt.
- Es beweist **nicht** , dass die Weiterleitung nach dem Login und der Token-Austausch mit einer ioBroker-Callback-URL erfolgreich sind.

## Vorgeschlagener Benutzerablauf

1. Der Benutzer öffnet die BLUETTI-Adapterinstanzkonfiguration in ioBroker Admin.
2. Der Administrator zeigt Folgendes an:
   - aktueller Authentifizierungsstatus,
   - **Mit der BLUETTI-Taste authentifizieren** ,
   - Die Geräteauswahlsteuerung ist deaktiviert, bis die Authentifizierung erfolgreich war.
   - Ausgewählte Geräteseriennummern/Gerätenamen nach der Erkennung.
3. Der Button ist eine JSON-Konfiguration.`sendTo` Aktion, zum Beispiel Befehl`getOAuthStartLink` , mit`openUrl: true` Die
4. Der Adapter empfängt`getOAuthStartLink` und baut:
   - ein zufällig`state` Wert,
   - eine Callback-URL:`${data._origin}oauth2_callbacks/${adapter.namespace}/` ,
   - Die BLUETTI-Autorisierungs-URL mit Client-ID, Callback-URL und Status.
5. Der Administrator öffnet die BLUETTI-Anmelde-/Zustimmungsseite.
6. BLUETTI leitet zur Callback-URL des ioBroker-Administrators weiter mit`code` Und`state` Die
7. Admin sendet`oauth2Callback` zur Adapterinstanz.
8. Adapter überprüft`state` Börsen`code` Für Tokendaten speichert es die Tokendaten verschlüsselt und ruft dann die Benutzerprodukte ab.
9. Der Benutzer kehrt zur Adapterkonfiguration zurück und wählt ein oder mehrere BLUETTI-Geräte aus.
10. Adapteraufrufe`bindDevices` für ausgewählte Seriennummern und speichert ausgewählte Geräte-Metadaten.

## OAuth-Machbarkeit in ioBroker Admin

OAuth ist in ioBroker Admin realistisch **, wenn BLUETTI die Admin-Callback-URL dynamisch akzeptiert** .

Der direkte Admin-Callback wird bevorzugt, da er den Ablauf lokal hält und keinen produktiven ioBroker-Cloud-Proxy erfordert. Die wahrscheinliche Callback-Struktur ist:

```text
http(s)://<admin-host>:<admin-port>/oauth2_callbacks/bluetti.0/
```

Risiko: Die Home Assistant-Integration nutzt das OAuth/Anwendungsanmeldeinformations-Framework von Home Assistant. Wenn BLUETTI eine für die Integration registrierte feste Umleitungs-URI validiert, kann dies zu einem Risiko führen.`HomeAssistant` Der Client ioBroker kann eine dynamische Admin-Callback-URL nicht einfach wiederverwenden. In diesem Fall stehen folgende Optionen zur Verfügung:

1. Eine BLUETTI/ioBroker-kompatible OAuth-Anwendung oder einen ioBroker OAuth Cloud-Code-Endpunkt anfordern/koordinieren,
2. einen dokumentierten festen Callback-/Proxy-Dienst verwenden,
3. Versenden Sie OAuth erst, wenn BLUETTI eine unterstützte Umleitungsstrategie bereitstellt.

Implementieren Sie **kein** Scraping von Benutzernamen/Passwörtern oder Browserautomatisierung als Fallback. Das wäre fehleranfällig und unsicher für einen veröffentlichten Adapter.

## Rückruf- und Statusbearbeitung

Der Adapter sollte zwei Nachrichtenbefehle verarbeiten können:

| Befehl              | Richtung        | Zweck                                                                                                   |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| `getOAuthStartLink` | Admin → Adapter | Erstellen Sie einen Status und geben Sie die Autorisierungs-URL zurück über `{ openUrl }`               |
| `oauth2Callback`    | Admin → Adapter | Callback-Abfrage validieren, Code austauschen, Token speichern, zurückgeben`{ result }` oder`{ error }` |

Regeln für den Umgang mit Zuständen:

- Erzeuge eine kryptografisch zufällige`state` Die
- Speichern Sie den ausstehenden Status mit einer kurzen TTL, zum Beispiel 10 Minuten.
- Bei der ersten Implementierung ist ein Zustand im Arbeitsspeicher akzeptabel; wenn der Adapter während des Logins neu startet, schlägt der Callback fehl und der Benutzer versucht es erneut.
- Ein späterer Härtungsschritt kann den ausstehenden Status im Instanzdatenverzeichnis mit TTL-Bereinigung beibehalten.
- Niemals einloggen`code` Zugriffstoken, Aktualisierungstoken oder die vollständige Callback-URL.

## Token-Speicher

Speichern Sie Token-Daten im verschlüsselten`auth.tokenJson` Status, nicht in nativen Konfigurationsfeldern.

| Feld                         | Empfindlich | Zweck                                                                                               |
| ---------------------------- | ----------: | --------------------------------------------------------------------------------------------------- |
| `auth.tokenJson` (Zustand)   |          Ja | JSON-Zeichenkette mit Token-Antwort: Zugriffstoken, Aktualisierungstoken, Erstellungs-/Ablauffelder |
| `deviceSerial` (einheimisch) |   teilweise | Seriennummer des ausgewählten Geräts, das für Polling und bindDevices verwendet wird                |

`auth.tokenJson` ist verschlüsselt mit`this.encrypt()` und wird als ioBroker-Status gespeichert, um Neustarts des Adapters bei Tokenrotation zu vermeiden.

### Sicherheitsbewertung (#141)

Der`auth.tokenJson` Der Zustand wird erklärt mit`read: false, write: false` und sein Wert wird verschlüsselt über`this.encrypt()` Dies schützt vor:

- Beiläufige Anzeige im Objektbaum der Admin-Benutzeroberfläche (nicht sichtbar)
- Datenlecks in Backups und direkter Dateisystemzugriff (verschlüsselt im Ruhezustand)

Es bietet **keinen** Schutz vor einem ioBroker-Administrator, der den Rohdatenwert per Skript oder über die REST-API auslesen und mit dem instanzweiten Verschlüsselungsschlüssel entschlüsseln kann. Dies ist ein akzeptabler Kompromiss:

- ioBroker-Administratoren haben bereits vollen Systemzugriff (Dateisystem, Datenbank, andere Adapter, native Konfiguration).
- Verschieben des Tokens nach`encryptedNative` würde die Adapter-Neustartschleife bei jeder Token-Aktualisierung wieder einführen (jeder native-config-Schreibvorgang löst einen js-controller-Neustart aus), was genau das Problem war, das durch die Verschiebung der Tokens in einen Zustand in #140 behoben wurde.
- Durch das Speichern des Tokens im Dateisystem ginge die in ioBroker integrierte Verschlüsselung verloren und die Fehlersuche würde erschwert.

Der verschlüsselte Zustand ist der korrekte, für ioBroker typische Ansatz zum Rotieren von Token, der keine Neustarts des Adapters auslösen darf.

Geräteseriennummern sind keine OAuth-Geheimnisse, können aber die Hardware des Benutzers identifizieren. Sie sollten nicht vollständig protokolliert werden. Ob sie verschlüsselt werden, ist eine Produktentscheidung; ihr Schutz ist jedoch sinnvoll.

Das Speichern aktualisierter Tokendaten erfordert die Aktualisierung des Instanzobjekts, nicht nur die Mutation.`this.config` Die Implementierung sollte aktualisiert werden`system.adapter.<namespace>.native` durch ioBroker-Objekt-APIs, wobei nicht verwandte native Felder erhalten bleiben.

## Tokenaktualisierung bei Adapterneustarts

Beim Start des Adapters:

1. Lesen und analysieren Sie die verschlüsselte Nachricht.`auth.tokenJson` Zustand.
2. Falls fehlt, setzen Sie`info.connection = false` und Authentifizierungsstatus zu`not_authenticated` ; keine Umfrage durchführen.
3. Die Gültigkeit wird wie folgt berechnet:
   - `expires_at - 30s` , oder
   - `created_at + expires_in - 30s` Die
4. Falls das Token abgelaufen ist oder kurz vor dem Ablauf steht, aktualisieren Sie es vor der ersten Abfrage.
5. Drosselung der Aktualisierungsversuche, beispielsweise einmal pro Stunde nach einem fehlgeschlagenen Versuch, entsprechend dem defensiven Verhalten der Home Assistant-Integration.
6. Jedes erfolgreich aktualisierte Token wird in der verschlüsselten nativen Konfiguration gespeichert.
7. Bauen Sie das bestehende`BluettiCloudProvider` mit einem`BluettiTokenProvider` Das:
   - gibt das aktuelle Zugriffstoken zurück.
   - Aktualisiert und speichert ein Token auf Anfrage.
   - Die Authentifizierung wird als abgelaufen markiert, wenn der Anbieter HTTP 401/403 oder einen entsprechenden API-Code empfängt.`805` Die

Aktualisierungsfehler dürfen nicht als Ausfälle des BLUETTI-Geräts behandelt werden.

## Geräteauswahl und bindDevices

Die Geräteauswahl sollte nach erfolgreicher OAuth-Authentifizierung und vor dem Polling erfolgen.

Fließen:

1. Adapteraufrufe`getUserProducts()` unter Verwendung des neuen Tokens.
2. Die Administratorkonfiguration ruft die Geräteliste über eine`sendTo` /`selectSendTo` Die Steuerung oder der Adapter speichert die ermittelte Liste zur Anzeige nach dem OAuth-Callback.
3. Der Benutzer wählt eine einzelne Seriennummer aus.
4. Adapteraufrufe`POST /api/bluiotdata/ha/v1/bindDevices` mit`{ "bindSnList": [deviceSerial] }` Die
5. Der Adapter speichert die ausgewählte Seriennummer.
6. Beim Polling wird nur die ausgewählte Seriennummer verwendet.

Darstellung:

| Nativer/Konfigurationswert | Verwenden                                                                       |
| -------------------------- | ------------------------------------------------------------------------------- |
| `deviceSerial: string`     | Umfrageziel                                                                     |
| `bindDevices` Ergebnis     | Dient nur zur Bestätigung der Konfiguration; gibt keine Kontrollzustände preis. |

Die erste Implementierung sollte dies schreibgeschützt halten.`fulfillment` Die /control-Endpunkte bleiben außerhalb des Geltungsbereichs.

## Fehlerklassifizierung

Authentifizierungs-, Cloud- und Geräteausfälle müssen getrennt bleiben, da der Ausfallstatus von dieser Unterscheidung abhängt.

| Quelle                                                     | Anbieterstatus      | Adapter-/Authentifizierungsstatus |       `info.connection` | Auswirkungen des Ausfallmodells           |
| ---------------------------------------------------------- | ------------------- | --------------------------------- | ----------------------: | ----------------------------------------- |
| Fehlendes Token                                            | `auth_failed`       | `not_authenticated`               |                  FALSCH | kein Verdacht auf Stromausfall            |
| Ungültiges/abgelaufenes Token, HTTP 401/403, API `805`     | `auth_failed`       | `reauth_required`                 |                  FALSCH | kein Verdacht auf Stromausfall            |
| Token-Aktualisierung Netzwerk-Timeout                      | `cloud_unreachable` | `refresh_deferred`                |                  FALSCH | Cloud nicht verfügbar, kein Geräteausfall |
| Gateway-Timeout/Netzwerkfehler während der Abfrage         | `cloud_unreachable` | `authenticated`                   |                  FALSCH | kann als veraltet markiert werden         |
| API-Fehler bei Nicht-Authentifizierung                     | `provider_error`    | `authenticated`                   |                  FALSCH | Anbieter-/API-Fehler                      |
| Produkt `online != "1"`                                    | `ok`                | `authenticated`                   | für dieses Gerät falsch | Gerät offline-Signal                      |
| Erfolgreiche Abfrage für mindestens ein ausgewähltes Gerät | `ok`                | `authenticated`                   |                    WAHR | Telemetriedaten frisch                    |

`info.connection` Dies sollte nur dann zutreffen, wenn die Authentifizierung funktioniert und mindestens ein ausgewähltes Gerät brauchbare Status-/Telemetriedaten zurückgibt.

## Minimale Implementierungssequenz

1. **OAuth-Startlink-/Status-Helfer**
   - `src/lib/bluetti-oauth-flow.ts` Erstellt die Autorisierungs-URL aus dem ioBroker Admin-Ursprung und dem Adapter-Namespace.
   - Es verwendet einen 10-minütigen Speicherzugriff.`state` TTL, validiert Callback-Status/Code, weist OAuth-Fehler zurück und verbraucht Zustände nur einmal, um Wiederholungen zu verhindern.
   - Die Unit-Tests umfassen URL-Parameter, Callback-Normalisierung, einmaligen Zustandsverbrauch, Ablauf und OAuth-Fehler-Callbacks.
   - Dieser Helfer ist absichtlich nicht fest verdrahtet.`main.ts` noch.

2. **Token-Manager ohne Polling-Lebenszyklus**
   - `src/lib/bluetti-stored-token-provider.ts` analysiert das gespeicherte Token-JSON und gibt die vorhandenen Daten frei.`BluettiTokenProvider` Schnittstelle und bleibt unabhängig von`main.ts` Die
   - Es unterstützt`expires_at` Und`created_at + expires_in` , ein 30-Sekunden-Ablaufpuffer, explizit`markTokenExpired()` , Aktualisierungsdrosselung nach Fehlern, Beibehaltung des Aktualisierungstokens, wenn BLUETTI kein neues Aktualisierungstoken ausgibt, und ein Persistenz-Callback für das aktualisierte Token-JSON.
   - Die Unit-Tests umfassen Ablaufberechnung, Aktualisierung, Persistenz, Aktualisierungsdrosselung, fehlerhafte gespeicherte Daten, beibehaltene Aktualisierungstoken und Schwärzung.

3. **OAuth-Token-Austauschclient**
   - `src/lib/bluetti-oauth-token-client.ts` sendet standardmäßige OAuth-Formularkörper an`/oauth2/token` unter Verwendung der von der nativen ioBroker-Konfiguration bereitgestellten Anmeldeinformationen.
   - Es unterstützt`authorization_code` Austausch und`refresh_token` Aktualisierung mit eingespritztem`fetchImpl` , Timeout-Behandlung, strukturierte Fehler, Antwortnormalisierung und -redaktion.
   - Die Unit-Tests umfassen die Form des Anfragetextes und -headers, die Normalisierung des Erstellungsdatums, Aktualisierungsanfragen, OAuth-Fehler, HTTP-Fehler, ungültige Antworten, Timeouts, Netzwerkfehler und die Schwärzung von Geheimnissen.
   - Die Anfragestruktur wird durch die Home Assistant-Integration und die OAuth-Konventionen quellgesichert; der Austausch nach dem Login benötigt noch einen Live-ioBroker-Callback-Test.

4. **Konfiguration der Administratorauthentifizierung und Callback-Verkabelung**
   - `admin/jsonConfig.json` hat einen Ein-Knopf-Bedienfeld`sendTo` Authentifizierungsablauf für`getOAuthStartLink` Es werden keine Client-ID-/Client-Geheimnis-Eingaben mehr angezeigt.
   - `io-package.json` ermöglicht`messagebox` und Geschäfte`oauthClientSecret` als geschütztes und verschlüsseltes natives Feld.
   - `src/main.ts` Griffe`getOAuthStartLink` ,`oauth2Callback` , Und`getDevices` speichert das Token-JSON serverseitig im`auth.tokenJson` Der Status wird beibehalten und es werden keine Token-Materialien an Administratoren zurückgesendet.
   - Die Geräteerkennung/-auswahl ist weiterhin absichtlich nicht verkabelt.

5. **Auswahl des Administratorgeräts**
   - Fügen Sie JSON-Konfigurationssteuerelemente für die Geräteauswahl hinzu.
   - Fügen Sie Adapter-Nachrichtenhandler hinzu für`discoverDevices` Und`saveSelectedDevices` Die
   - Ausgewählte Seriennummern werden in geschützten/verschlüsselten nativen Feldern gespeichert, wenn die vollständigen Seriennummern beibehalten werden.

6. **Integration des Anbieterlebenszyklus**
   - Wire-Token-Anbieter und ausgewählte Seriennummern in`src/main.ts` Die
   - Die Abfrage sollte erst gestartet werden, wenn die Authentifizierung erfolgreich war und Geräte ausgewählt wurden.
   - Die Erstellung von Telemetrieobjekten sollte in den späteren Telemetrie-Problemen (#4/#6) erfolgen, es sei denn, sie ist für ein Minimum erforderlich.`info.connection` nachweisen.

## Offene Fragen vor dem Einbinden von #15 in Admin/main.ts

- Akzeptiert BLUETTI die dynamische ioBroker Admin-Callback-URL auch nach dem Login, und zwar nicht nur für die anfängliche Login-Seite?
- Tut`/oauth2/token` akzeptieren Sie den in implementierten Standardformularkörper`BluettiOAuthTokenClient` Oder benötigt BLUETTI trotz der eingerichteten Anmeldeinformationen für Home Assistant eine Basisauthentifizierung oder eine andere Variante?
- Gibt die Aktualisierung immer ein Ergebnis zurück?`refresh_token` Und sollte das alte Refresh-Token beibehalten werden, wenn es weggelassen wird? Der aktuelle Token-Anbieter behält es vorsorglich bei.
- Werden Token-Ablauffelder zurückgegeben als`expires_at` ,`expires_in` ,`created_at` Oder eine andere Form? Der aktuelle Code unterstützt die bekannten Home Assistant-Formen.
- Tut`bindDevices` Muss dies bei jeder Aktualisierung der Geräteauswahl aufgerufen werden oder nur für neu ausgewählte Geräte?
- Sollen vollständige Seriennummern verschlüsselt oder nur geschützt/geschwärzt gespeichert werden?

## Empfehlung für Ausgabe Nr. 15

Dieses Dokument dient als Implementierungsplan Nr. 15. Der aktuelle Branch implementiert lediglich den Anmelde-Smoke-Testpfad; Geräteauswahl und Telemetrieabfrage sollten erst nach einem erfolgreichen Live-Test des ioBroker-Admin-Callbacks hinzugefügt werden.

Die nächste Codeänderung sollte die Geräteerkennung/-auswahl als separaten Admin-Schritt hinzufügen: den gespeicherten Token-Provider aus der verschlüsselten nativen Konfiguration instanziieren, den Endpunkt der verifizierten Geräteliste aufrufen, Seriennummer/Name/Status zur Auswahl stellen und die ausgewählten Seriennummern speichern, ohne vorher mit dem Telemetrie-Polling zu beginnen.