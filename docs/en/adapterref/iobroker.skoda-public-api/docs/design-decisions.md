---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
---
# Entwurfsentscheidungen — ioBroker.skoda-public-api

Dieses Dokument hält die geltenden Produkt- und Architekturentscheidungen fest. Wer
eine davon ändert, sollte zuerst die Begründung und die betroffenen Invarianten prüfen.

## Randbedingungen der API (nicht verhandelbar)

Quelle: <https://public.api.connect.skoda-auto.cz/docs>, eingecheckte Spec unter
`spec/skoda-openapi.json` (`info.version: v0`).

| Eigenschaft | Wert |
|---|---|
| Authentifizierung | statischer `X-API-Key`, erzeugt in der MyŠkoda-App (ab v8.16) |
| Key-Gültigkeit | begrenzt, Ablauf nur via Header `X-API-Key-Expires-At` sichtbar |
| Key-Bindung | an die bei der Erstellung ausgewählten VINs |
| Basis-URL | `https://public.api.connect.skoda-auto.cz/api/v1` |
| Lese-Endpunkte | genau einer: `GET /vehicles/{vin}` (optional `?include=`) |
| Schreib-Endpunkte | 8 POSTs für Start/Stop plus 3 PUTs für Ladelimit, Lademodus und Ladeprofile |
| Rate-Limit | **20 Requests/Stunde pro VIN** |
| Quota-Verbrauch | alle Antworten **außer** 401, 403, 429 |
| Rückmeldung auf Befehle | `202 Accepted`, **kein Operation-Status-Endpunkt** |
| Fahrzeugliste | **existiert nicht** — VIN muss manuell konfiguriert werden |
| Push/Webhooks | keine |

Nicht in der API enthalten und daher unmöglich: Ver-/Entriegeln, Hupe/Lichthupe,
Setzen eines beliebigen Ladestroms in Ampere und automatische Key-Rotation. Ziel-SoC,
Lademodus und vollständige Ladeprofile sind als Schreib-States verfügbar. In einem
Ladeprofil kann `maxChargingCurrent` auf `REDUCED` oder `MAXIMUM` gesetzt werden.

## Entscheidungen

### E1 — Qualitätsniveau: Veröffentlichung über npm und ioBroker
Der Adapter wird öffentlich auf npm und GitHub veröffentlicht und für das offizielle
ioBroker-Repository `latest` gepflegt. `stable` folgt erst nach öffentlichem Test und
Nutzerfeedback. Grundlage sind eine vollständige `io-package.json`, JSON Config,
automatisierte Tests, eine Plattformmatrix für Releases und reproduzierbare npm-Pakete.
**Begründung:** Öffentliche Verteilung braucht nachvollziehbare Metadaten, Migrationen
und Prüfungen über alle unterstützten Plattformen.

### E2 — Name: `ioBroker.skoda-public-api`
npm-Paket `iobroker.skoda-public-api`. Bindestrich statt Unterstrich (Konvention:
271 von 797 Repo-Adaptern nutzen Bindestriche, 8 nutzen Unterstriche).
Terminologie folgt Škoda ("MyŠkoda Public API").
**Begründung:** Herkunft soll im Namen erkennbar sein, um Verwechslung mit
`vw-connect` (inoffizielle App-API) auszuschließen.

### E3 — Anwendungsfälle
Monitoring/VIS, Vorklimatisierung, zeit-/preisgesteuertes Laden, sowie
**eingeschränktes PV-Überschussladen** per Bang-Bang.
**Bekannte Einschränkung:** Ohne Strommodulation (API kann sie nicht) ist
Überschussladen nur sinnvoll, wenn der AC-Ladestrom in der MyŠkoda-App auf
`REDUCED` (z. B. 10 A ≈ 2,3 kW einphasig) steht. Die Wallbox (Bosch) hängt an
einem fremden Lademanagement und scheidet als Regelorgan aus.

### E4 — Regellogik lebt außerhalb des Adapters
Der Adapter ist ein reines API-Binding. Hysterese, Schwellen und Mindestlaufzeiten
gehören in ein ioBroker-Skript. Vorlage kommt nach `examples/pv-surplus-charging.js`.
**Begründung:** Jede PV-Anlage hat andere State-IDs und Zählersemantik; das in eine
Instanzkonfiguration zu pressen erzeugt Konfigurationshölle und macht den Adapter
untestbar. Die **Quota-Verwaltung bleibt aber im Adapter** — sonst müsste jedes
Skript die Rate-Limit-Logik neu bauen.

### E5 — Befehle: Queue mit Coalescing, TTL 10 Minuten
Befehl kommt in eine Queue, wird ausgeführt sobald Budget da ist, verfällt nach
10 min. Ergebnis in `info.lastCommand.result`: `SENT`, `QUEUED`, `COALESCED`,
`EXPIRED`, `REJECTED_BY_VEHICLE`.
**Begründung:** Bang-Bang-Regelung produziert Schaltnervosität (Wolke zieht durch).
Coalescing dämpft sie an der einzigen Stelle, die das Budget kennt.

Auch ein mit `202` angenommener Sollwert darf gleiche
Schreibvorgänge nur begrenzt unterdrücken. Die Bestätigungsfrist ab Annahme entspricht
der konfigurierten TTL. Ein passender Ist-Zustand mit neuerem Fahrzeugzeitstempel hebt
sie vorzeitig auf. Nach Ablauf werden neue Schreibvorgänge wieder gegen frische Daten
geprüft; ohne neuere Daten gilt der Ist als unbekannt. Kein automatisches Nachsenden.

Der beobachtete Bestätigungsstatus steht getrennt unter
`info.commandConfirmation.<group>.*`: `WAITING`, `CONFIRMED`, `TIMED_OUT` oder nach
einem Neustart `INTERRUPTED`. Jede Gruppe beschreibt den letzten angenommenen Befehl,
nicht den letzten Schreibversuch. Neue angenommene Befehle derselben Gruppe ersetzen
die Beobachtung; Coalescing verlängert die Frist nicht. Der ursprüngliche Sendestatus
in `info.lastCommand` bleibt unverändert.

**Quota-Invariante:** Die Anzeige verwendet ausschließlich bestehende Poll-Antworten.
Ein eigener lokaler Timer meldet den Fristablauf, ohne die Sende-Queue oder den
PollScheduler zu wecken. Weder zusätzliche API-Abfragen noch automatische Wiederholungen
sind zulässig. Bestätigung verlangt einen passenden Wert und einen neueren Zeitstempel
des betreffenden fehlerfreien Antwortblocks. Ein Timeout ist kein Nachweis, dass das
Fahrzeug den Befehl nicht ausgeführt hat; nach Fristablauf eintreffende Daten ändern
den abgeschlossenen Status nicht nachträglich.

### E6 — Befehls-Interface: Schalter primär, Buttons sekundär
`<vin>.charging.enabled` (`role: switch`) trägt den **Soll-Zustand**;
`<vin>.charging.start` / `.stop` (`role: button`) erzwingen einen Aufruf.
Boolean-Abbildung: `true` genau bei `charging.status.state === 'CHARGING'`.
`CONNECT_CABLE`, `READY_FOR_CHARGING`, `CONSERVING` sind `false`.
**Begründung:** Coalescing auf einem Soll-Zustand ist ein trivialer Vergleich;
auf Buttons wäre es eine Heuristik.
`ack=true` bedeutet **"an die API übergeben"**, nicht "das Auto hat es getan" —
mehr weiß der Adapter wegen `202` ohne Status-Endpunkt nicht.

### E7 — Objektbaum: 1:1-Spiegel der API
Wurzel ist die VIN. Struktur folgt exakt dem JSON der Antwort.
**Begründung:** Bei `version: v0` erscheinen neue Felder von selbst; umbenannte
Felder fallen beim Regenerieren als Compile-Fehler auf statt als State, der still
aufhört sich zu aktualisieren.
**Typisierung** kommt aus der Spec (`type`, `unit`, `role`, `common.states` mit
stabilen Enum-Labels), unbekannte Felder werden dynamisch mit geratenem Typ angelegt.
**Ausnahmen vom 1:1-Prinzip:** zusätzlicher State `parkingPosition.position`
im Format `lat;lon` mit `role: value.gps` für VIS-Karten und Geofence-Adapter.

**Anzeigeeinheiten:** `charging.status.battery.remainingCruisingRangeInMeters` wird
durch 1000 geteilt und
in km dargestellt. `activeVentilation.durationInSeconds` und
`auxiliaryHeating.durationInSeconds` werden durch 60 geteilt und in Minuten dargestellt.
Die bestehenden IDs bleiben erhalten, auch wenn ihre Endung die API-Einheit nennt.
Der StateWriter rechnet ausschließlich empfangene API-Werte um, ohne Rundung, und
aktualisiert vorhandene Objekteinheiten und Standardbeschreibungen beim nächsten
Empfang des Felds. Eigene Namen bleiben erhalten. Gespeicherte Zeitreihen werden nicht
rückwirkend umgerechnet; Skripte müssen die Anzeigeeinheiten berücksichtigen. Spec,
Fixtures und Befehlsdaten bleiben unverändert in den API-Einheiten.

### E8 — Umgang mit unvollständigen Antworten
Fehlende Teile **nicht** auf `null` setzen. Letzter Wert bleibt stehen,
Quality-Flag wird auf "nicht gut" gesetzt, `errors[]` landet als JSON in
`info.lastErrors`. Zusätzlich `<vin>.info.dataAge` in Sekunden aus
`carCapturedTimestamp`.
**Begründung:** `200` ist laut Doku regelmäßig unvollständig. Ohne diese Regel
flackert die VIS; ohne `dataAge` hält man tagealte Werte für aktuelle.

Der Writer übernimmt vorhandene States und Qualitätsflags
beim ersten Poll nach dem Start. Neben Teilfehlern in `errors[]` markiert er auch
verschwundene Felder innerhalb gelieferter Teile und entfernte Profile. Absichtlich
nicht angeforderte Teile bleiben unverändert. `dataAge` ist eine Momentaufnahme zum
letzten erfolgreichen Poll und bezieht sich auf den jüngsten Zeitstempel, nicht auf
die Aktualität sämtlicher Einzelwerte.

### E9 — Instanzmodell: eine Instanz = ein API-Key, n VINs
Ein Quota-Bucket pro VIN. Die API begrenzt ihre 20 Requests pro Stunde je Fahrzeug;
Antwortheader und Reset-Fenster verschiedener VINs duerfen sich daher nicht
gegenseitig ueberschreiben. Jeder Bucket wird unter `<vin>.rateLimit.*` persistiert.
**Bewusst nicht gebaut:** mehrere Keys pro Instanz zur Vervielfachung der Quota.
Ein API-Key kann alle bei seiner Erstellung ausgewaehlten Fahrzeuge abdecken; die
serverseitige Begrenzung pro VIN macht weitere Schluessel fuer die Quota unnoetig.

### E10 — Key-Ablauf: ioBroker-Notification-System plus States
`info.apiKey.expiresAt`, `info.apiKey.daysRemaining`; Log-Eskalation bei 14 / 7 / 2
Tagen; `registerNotification()` in einem eigenen Scope (siehe `io-package.json`
→ `notifications`).
Bei abgelaufenem Key: Polling auf 1×/h drosseln.
`info.connection` wird `false` bei 401/403, **nicht** bei 429 — ein erschöpftes
Budget ist Normalbetrieb.
**Begründung:** Reparatur erfordert zwingend einen Menschen mit dem Handy in der
Hand. Ohne aktive Meldung fällt der Ausfall wochenlang nicht auf, weil alte Werte
laut E8 stehenbleiben.

### E11 — Stack: TypeScript, minimale Laufzeitabhängigkeiten
Node ≥ 22, CI-Matrix 22 und 24. Typen werden aus der eingecheckten Spec generiert.
HTTP-Aufrufe verwenden natives `fetch`; einzige direkte Laufzeitabhängigkeit ist
`@iobroker/adapter-core`.
JSON Config statt HTML-Admin. Ein wöchentlicher CI-Job vergleicht Škodas Live-Spec mit
die eingecheckte Kopie.
**Begründung:** Der Antwortbaum ist fünf Ebenen tief und auf jeder Ebene optional —
in JS ist ein `TypeError` auf `undefined` nur eine Frage der Zeit.

### E12 — Teststrategie: Mock-Server plus Unit- und Integrationstests
**Kernpunkt: Gegen die echte API kann man nicht entwickeln.** 20 Requests sind
nach ~20 Minuten Debugging verbraucht. Der Mock ist deshalb das Entwicklungssystem,
nicht bloß Testinfrastruktur. Er muss `RateLimit-*` realistisch mitführen und auf
Kommando `429`, `401`, `422` und Teil-Fehler in `errors[]` erzeugen.
Basis-URL nur über Umgebungsvariable überschreibbar, **nicht** in der Admin-UI.

### E13 — States entstehen nur für tatsächlich gelieferte Teile
Kein Vorab-Anlegen aus der Spec. **Nie automatisch löschen.** Anlage einmal pro
Pfad, danach nur `setStateChanged`.
**Mechanismus:** Ohne `include` liefert die API genau die unterstützten Teile,
schweigend. Das ist die eingebaute Fähigkeitserkennung. `include` spart keine Quota.

### E14 — Datenschutz
Eine `sanitize()`-Funktion in der HTTP-Schicht maskiert VIN und API-Key in **jeder**
Meldung, bevor sie das Modul verlässt. Nie eine Fehlermeldung aus einer rohen URL bauen.
**Begründung:** Die VIN steht im URL-Pfad; ioBroker-Logs landen routinemäßig im Forum.
Zusammen mit `formattedAddress` ergäbe das die Heimatadresse im Klartext.
Parkposition standardmäßig **an**; abschaltbar, und dann via `include` gar nicht
erst angefordert.
Externe Fehlertelemetrie ist nicht aktiviert und darf nur nach einer eigenen
Datenschutzentscheidung ergänzt werden.

### E15 — Retries differenziert nach Fehlertyp
Siehe Tabelle in `implementation-plan.md`, Abschnitt "Fehlerbehandlung".
Kernregel: **`5xx` verbraucht Quota** → höchstens **ein** Wiederholungsversuch,
mit Jitter, und nur oberhalb der Befehlsreserve. Beide `429` sind gratis → dort
geduldig sein. Ist `Retry-After` länger als die Rest-TTL, Befehl sofort als
`EXPIRED` verwerfen.
**Befehls-States entstehen aus derselben Fähigkeitserkennung wie die Lese-States:**
Fehlt `auxiliaryHeating` in der Antwort, wird kein `auxiliaryHeating.start` angelegt.

### E16 — Listen: ID-basiert auf Profilebene, JSON darunter
`chargingProfiles.profiles.<id>.name` und `.targetStateOfChargeInPercent` als States;
`.timersJson` und `.preferredChargingTimesJson` als JSON-States.
**Begründung:** Index-basiert (`profiles.0`) zeigt nach dem Löschen eines Profils in
der App still auf ein anderes Profil. Die bisherigen Detailzustände bleiben read-only.
`.configurationJson` bietet zusätzlich das vollständige Profil zum atomaren Ändern,
da die API das ganze Profil ersetzt. Es gibt keine impliziten Teilupdates. Strikte
Validierung und ein Vergleich mit dem zuletzt gepollten Profil verhindern ungültige
Requests und das Überschreiben zwischenzeitlich erkannter Änderungen. Ohne serverseitige
Versionsprüfung lassen sich noch nicht gepollte App-Änderungen nicht erkennen.

### E17 — Profilentwürfe lokal bearbeiten, explizit gemeinsam senden
`chargingProfiles.profiles.<id>.edit.*` trennt lokale Eingaben von den gelesenen
Fahrzeugdaten. Vorhandene Einstellungen, Timer und Zeitfenster werden über stabile IDs
bearbeitet; unbekannte API-Felder bleiben erhalten. `apply` übergibt genau ein vollständiges
Profil an die vorhandene Queue, `reset` verwendet ausschließlich den letzten Poll.
Einzelfeldänderungen und Reset erzeugen keine Requests. ACK im Editor bedeutet nur lokal
übernommen; Befehlsannahme und Fahrzeugbestätigung stehen weiterhin in den Diagnose-States.

Entwürfe behalten ihre Ausgangsversion. Änderungen aus späteren Polls blockieren Apply;
die Queue prüft dieselbe Ausgangsversion nochmals bei Aufnahme und Versand. Ein abweichendes
noch laufendes Profilupdate darf durch den Editor nicht überschrieben werden. Wiederholtes
Apply desselben Ziels verwendet das bestehende Coalescing. Abgelaufene Befehle sperren keine
manuellen Wiederholungen. Entwürfe werden nach Neustart erst mit einem erfolgreichen Poll
neu initialisiert, nie automatisch wiederhergestellt oder gesendet. Die vorhandenen
JSON-Befehle bleiben kompatibel. Nicht gepollte App-Änderungen bleiben wegen fehlender
serverseitiger Versionsprüfung weiterhin ein Restrisiko.

Der Editor verwendet eindeutige `.setting`-Rollen und mehrsprachige Metadaten.
Wiederholte Textfelder und Wochentage nutzen generische `text`-/`switch`-Rollen, damit
keine detaillierte Rolle innerhalb eines Kanals mehrfach vorkommt. Auswahltexte werden
als Strings in der System-Sprache hinterlegt, weil `common.states` Stringwerte erwartet.
Bereits vorhandene Objekte werden gezielt migriert; eigene Namen und History bleiben
unangetastet. Entfernte Felder werden nicht gelöscht, sondern mit `write=false`, `q=1`
und Verfügbarkeitsbeschreibung behalten. Nicht verfügbare Felder erhalten passende
Nur-Lese-Rollen (`indicator`, `value`, `text`) mit `read=true`; insbesondere entstehen
keine Buttons mit `read=false` und `write=false`. Bei Rückkehr werden Bedienrollen und
Schreibrechte wiederhergestellt. Ein erneuter Poll kann sie reaktivieren.
Dasselbe gilt beim Start, bis neue Fahrzeugdaten vorliegen. `edit.available` ist eine
lokale Diagnose; weder Migration noch Verfügbarkeitsprüfung erzeugen Fahrzeugrequests.

Editor-, Polling- und Bestätigungsanzeigen werden über stabile Codes lokalisiert.
Anzeigen folgen der Systemsprache, Maschinenwerte und englische Backendlogs bleiben
unverändert. Bestehende Diagnose-Labels werden ohne Änderung von Benutzer-Metadaten
migriert; auch abgeschlossene Befehlsbestätigungen erhalten beim Start aktuelle Labels.

## Bekannte Restrisiken

1. **Bang-Bang bleibt ein Kompromiss.** Die Wirksamkeit des Überschussladens
   entscheidet sich an der App-Einstellung `REDUCED`, nicht am Adapter.
2. **`429 vehicle-not-accepting-requests` kommt vom Auto**, nicht von der Quota.
   Kann Schaltvorgänge blockieren, obwohl Budget da ist. Von außen nicht vorhersehbar.
3. **API ist `v0`**, Rate-Limit laut Doku ausdrücklich nicht endgültig — in beide
   Richtungen.
4. **Nur der Enyaq ist testbar.** Alles Verbrenner-, Hybrid- und
   Standheizungsspezifische beruht auf Spec plus Mock.
5. **Die Spec hat Fehler.** `Charging` und `ChargingProfile` enthalten je ein Feld
   `tings`, das rekursiv auf den eigenen Typ zeigt — offensichtlich ein
   abgeschnittenes `settings` aus Škodas Generator. Der Codegen braucht dafür eine
   Ausnahme, sonst entsteht eine unendliche Typrekursion.
6. **Entwicklung läuft auf Node 26, Produktion auf Node 22.** Bewusst so
   entschieden (kein Versionsmanager auf dem Mac). Konsequenz: Merkwürdigkeiten im
   `dev-server` müssen erst gegen die Node-Version abgegrenzt werden, bevor man sie
   als Bug behandelt. `js-controller` 7.2.2 deklariert `>=18`, ist gegen Node 26
   aber nicht getestet.