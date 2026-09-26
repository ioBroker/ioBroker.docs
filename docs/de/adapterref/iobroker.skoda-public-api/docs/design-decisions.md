---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skoda-public-api/docs/design-decisions.md
title: Entwurfsentscheidungen - ioBroker.skoda-public-api
hash: zV0G2eT8/11jCgsfrbVf/WJvQ/7B4ftQDSL/x+NdtXo=
---
# Entwurfsentscheidungen – ioBroker.skoda-public-api

Dieses Dokument hält die geltenden Produkt- und Architekturentscheidungen fest. Wer sich davon ändert, sollte zunächst die Begründung und die betroffenen Invarianten prüfen.

## Randbedingungen der API (nicht verkäuflich)

Quelle: <https://public.api.connect.skoda-auto.cz/docs> , eingecheckte Spec unter `spec/skoda-openapi.json` (`info.version: v0`).

| Größe                   | Wert                                                                        |
| ----------------------- | --------------------------------------------------------------------------- |
| A;                      | Statiker `X-API-Key`, erzeugt in der MyŠkoda-App (ab v8.16)                 |
| Key-Gültigkeit          | begrenzt, Ablauf nur über Header `X-API-Key-Expires-At` sichtbar             |
| Tastenbelegung          | an die bei der Erstellung ausgewählten VINs                                 |
| Basis-URL               | `https://public.api.connect.skoda-auto.cz/api/v1`                           |
| Lese-Endpunkte          | genau einer: `GET /vehicles/{vin}` (optional `?include=`)                    |
| Schreib-Endpunkte       | 8 POSTs für Start/Stop plus 3 PUTs für Ladelimit, Lademodus und Ladeprofile |
| Ratenbegrenzung         | **20 Anfragen/Stunde pro VIN**                                              |
| Quotenverbrauch         | alle Antworten **außer** 401, 403, 429                                      |
| Rückmeldung auf Befehle | `202 Accepted`, **kein Operation-Status-Endpunkt**                         |
| Fahrzeugliste           | **existiert nicht** – VIN muss manuell konfiguriert werden                  |
| Push/Webhooks           | keine                                                                       |

Nicht in der API enthalten und daher unmöglich: Ver-/Entriegeln, Hupe/Lichthupe, Setzen eines beliebigen Ladestroms in Ampere und automatische Schlüsselrotation. Ziel-SoC, Lademodus und vollständige Ladeprofile sind als Schreib-States verfügbar. In einem Ladeprofil kann `maxChargingCurrent` auf `REDUCED` Oder `MAXIMUM` gesetzt werden.

## Entscheidungen

### E1 – Qualitätsniveau: Veröffentlichung über npm und ioBroker

Der Adapter wird öffentlich auf npm und GitHub veröffentlicht und für das offizielle ioBroker-Repository `latest` gepflegt. `stable` folgt erst nach öffentlichem Test und Nutzerfeedback. Grundlage sind eine vollständige `io-package.json`, JSON Config, automatisierte Tests, eine Plattformmatrix für Releases und reproduzierbare npm-Pakete. **Begründung:** Öffentliche Verteilung braucht nachvollziehbare Metadaten, Migrationen und Prüfungen über alle unterstützten Plattformen.

### E2 — Name: `ioBroker.skoda-public-api`

npm-Paket `iobroker.skoda-public-api`. Bindestrich statt Unterstrich (Konvention: 271 von 797 Repo-Adaptern nutzen Bindestriche, 8 nutzen Unterstriche). Terminologie folgt Škoda („MyŠkoda Public API“). **Begründung:** Herkunft soll im Namen erkennbar sein, um Verwechslung mit `vw-connect` (inoffizielle App-API) auszuschließen.

### E3 — Anwendungsfälle

Überwachung/VIS, Vorklimatisierung, zeit-/preisgesteuertes Laden, sowie **eingeschränktes PV-Überschussladen** per Bang-Bang. **Bekannte Einschränkung:** Ohne Strommodulation (API kann sie nicht) ist Überschussladen nur sinnvoll, wenn der AC-Ladestrom in der MyŠkoda-App aktiviert ist `REDUCED` (z. B. 10 A ≈ 2,3 kW einphasig) steht. Die Wallbox (Bosch) hängt an einem fremden Lademanagement und scheidet als Regelorgan aus.

### E4 – Regellogik lebt außerhalb des Adapters

Der Adapter ist ein reines API-Binding. Hysterese, Schwellen und Mindestlaufzeiten gehören in ein ioBroker-Skript. Vorlage kommt nach `examples/pv-surplus-charging.js`. **Begründung:** Jede PV-Anlage hat andere State-IDs und Zählersemantik; Das in einer Instanzkonfiguration zu pressen erzeugte Konfigurationshölle und macht den Adapter untestbar. Die **Quota-Verwaltung bleibt aber im Adapter** – sonst müsste jedes Skript die Rate-Limit-Logik neu bauen.

### E5 – Befehle: Queue mit Coalescing, TTL 10 Minuten

Der Befehl kommt in eine Warteschlange, wird ausgeführt, sobald Budget da ist, verfällt nach 10 Minuten. Ergebnis in `info.lastCommand.result`: `SENT`, `QUEUED`, `COALESCED`, `EXPIRED`, `REJECTED_BY_VEHICLE`. **Begründung:** Bang-Bang-Regelung produziert Schaltnervosität (Wolke zieht durch). Coalescing dämpft sie an der einzigen Stelle, die das Budget kennt.

Auch ein mit `202` Der angenommene Sollwert darf dieselben Schreibvorgänge nur begrenzt unterdrücken. Die Bestätigungsfrist ab Annahme entspricht der konfigurierten TTL. Ein passender Ist-Zustand mit neuerem Fahrzeugzeitstempel hebt sie vorzeitig auf. Nach Ablauf werden neue Schreibvorgänge wieder gegen frische Daten geprüft; ohne neuere Daten gilt der Ist als unbekannt. Kein automatisches Nachsenden.

Der beobachtete Bestätigungsstatus steht getrennt unter `info.commandConfirmation.<group>.*`: `WAITING`, `CONFIRMED`, `TIMED_OUT` oder nach einem Neustart `INTERRUPTED`. Jede Gruppe beschreibt den letzten angenommenen Befehl, nicht den letzten Schreibversuch. Neue angenommene Befehle derselben Gruppe ersetzen die Beobachtung; Coalescing verlängerte die Frist nicht. Der ursprüngliche Sendestatus in `info.lastCommand` bleibt unverändert.

**Quota-Invariante:** Die Anzeige verwendet ausschließlich bestehende Poll-Antworten. Ein eigener lokaler Timer meldet den Fristablauf, ohne die Sende-Queue oder den PollScheduler zu wecken. Weder zusätzliche API-Abfragen noch automatische Wiederholungen sind zulässig. Zur Bestätigung wird ein passender Wert und ein neuerer Zeitstempel des betreffenden fehlerfreien Antwortblocks benötigt. Ein Timeout ist kein Beweis dafür, dass das Fahrzeug den Befehl nicht ausgeführt hat; Nach Ablauf der Frist eintreffende Daten ändern den abgeschlossenen Status nicht nachträglich.

### E6 – Befehls-Schnittstelle: Schalter primär, Tasten sekundär

`<vin>.charging.enabled`(`role: switch`) trägt den **Soll-Zustand** ; `<vin>.charging.start` /`.stop` (`role: button`) erzwingen einen Aufruf. Boolean-Abbildung: `true` genau bei `charging.status.state === 'CHARGING'` Die `CONNECT_CABLE`, `READY_FOR_CHARGING`, `CONSERVING` sind `false`. **Begründung:** Coalescing auf einem Soll-Zustand ist ein trivialer Vergleich; auf Buttons wäre es eine Heuristik. `ack=true` bedeutet **„an die API übergeben“** , nicht „das Auto hat es getan“ – mehr weiß der Adapter wegen `202` ohne Status-Endpunkt nicht.

### E7 – Objektbaum: 1:1-Spiegel der API

Wurzel ist die VIN. Struktur folgt exakt dem JSON der Antwort. **Begründung:** Bei `version: v0` erscheinen neue Felder von selbst; Benannte Felder fallen beim Regenerieren als Compile-Fehler auf statt als State, der sich noch aufhört, zu aktualisieren. **Typisierung** kommt aus der Spec (`type`, `unit`, `role`, `common.states` mit stabilen Enum-Labels), unbekannte Felder werden dynamisch mit geratenem Typ angelegt. **Ausnahmen vom 1:1-Prinzip:** zusätzlicher Staat `parkingPosition.position` im Format `lat;lon` mit `role: value.gps` für VIS-Karten und Geofence-Adapter.

**Anzeigeeinheiten:** `charging.status.battery.remainingCruisingRangeInMeters` wird durch 1000 geteilt und in km dargestellt. `activeVentilation.durationInSeconds` und `auxiliaryHeating.durationInSeconds` werden durch 60 und geteilt in Minuten dargestellt. Die bestehenden IDs bleiben erhalten, auch wenn ihre Endung die API-Einheit nennt. Der StateWriter empfängt ausschließlich API-Werte um, ohne Rundung, und aktualisierte Objekteinheiten und Standardbeschreibungen beim nächsten Empfang des Felds. Eigene Namen bleiben erhalten. Gespeicherte Zeitreihen werden nicht rückwirkend umgerechnet; Skripte müssen die Anzeigeeinheiten berücksichtigen. Spec, Fixtures und Befehlsdaten bleiben in den API-Einheiten unverändert.

### E8 – Umgang mit unvollständigen Antworten

Fehlende Teile **nicht** auf `null` setzen. Letzter Wert bleibt stehen, Quality-Flag wird auf „nicht gut“ gesetzt, `errors[]` landet als JSON in `info.lastErrors` Zusätzlich `<vin>.info.dataAge` in Sekunden aus `carCapturedTimestamp` **Begründung:** `200` ist laut Doku regelmäßig unvollständig. Ohne diese Regel flackert die VIS; ohne `dataAge` Hält man tagealte Werte für aktuelle.

Der Autor übernimmt Staaten und Qualitätsflags beim ersten Poll nach dem Start. Neben Teilfehlern in `errors[]` markiert er auch verschwundene Felder innerhalb gelieferter Teile und entfernte Profil. Absichtlich nicht verlangte Teile bleiben unverändert. `dataAge` ist eine Momentaufnahme zum letzten erfolgreichen Poll und bezieht sich auf den neuesten Zeitstempel, nicht auf die Aktualität sämtlicher Einzelwerte.

### E9 – Instanzmodell: eine Instanz = ein API-Key, n VINs

Ein Quota-Bucket pro VIN. Die API begrenzt ihre 20 Anfragen pro Stunde je Fahrzeug; Antwortheader und Reset-Fenster verschiedener VINs duerfen sich daher nicht gegenseitig überschreiben. Jeder Eimer wird unter `<vin>.rateLimit.*` persistiert. **Bewusst nicht gebaut:** mehrere Keys pro Instanz zur Vervielfachung der Quote. Ein API-Key kann alle bei seiner Erstellung ausgewälten Fahrzeuge abdecken; Die serverseitige Begrenzung pro VIN macht weitere Schlüssel für die Quote unnoetig.

### E10 – Key-Ablauf: ioBroker-Notification-System plus States

`info.apiKey.expiresAt`, `info.apiKey.daysRemaining`; Log-Eskalation bei 14 / 7 / 2 Tagen; `registerNotification()` in einem eigenen Scope (siehe `io-package.json` →`notifications`). Bei abgelaufenem Schlüssel: Polling auf 1×/h drosseln. `info.connection` wird `false` bei 401/403, **nicht** bei 429 — ein erschöpftes Budget ist Normalbetrieb. **Begründung:** Reparatur erfordert zwingend einen Menschen mit dem Handy in der Hand. Ohne aktive Meldung fällt der Ausfall wochenlang nicht an, weil alte Werte laut E8 stehen bleiben.

### E11 – Stack: TypeScript, minimale Laufzeitabhängigkeiten

Node ≥ 22, CI-Matrix 22 und 24. Typen werden aus der eingecheckten Spezifikation generiert. HTTP-Aufrufe verwenden natives `fetch`; Die einzige direkte Laufzeitabhängigkeit ist `@iobroker/adapter-core`. JSON Config statt HTML-Admin. Ein wöchentlicher CI-Job vergleicht Škodas Live-Spec mit der eingecheckten Kopie. **Begründung:** Der Antwortbaum ist fünf Ebenen tief und auf jeder Ebene optional – in JS ist ein `TypeError` auf `undefined` nur eine Frage der Zeit.

### E12 — Teststrategie: Mock-Server plus Unit- und Integrationstests

**Kernpunkt: Gegen die echte API kann man nicht entwickeln.** 20 Anfragen sind nach \~20 Minuten Debugging verbraucht. Der Mock ist deshalb das Entwicklungssystem, nicht bloß Testinfrastruktur. Ähm, muss `RateLimit-*` realistisch mitführen und auf Kommando `429`, `401`, `422` und Teil-Fehler in `errors[]` erzeugen. Basis-URL nur über Umgebungsvariable überschreibbar, **nicht** in der Admin-UI.

### E13 – Zustände entstehen nur für tatsächlich gelieferte Teile

Keine Vorab-Anlegen aus der Spec. **Nie automatisch gelöscht.** Anlage einmal pro Pfad, danach nur `setStateChanged` **Mechanismus:** Ohne `include` liefert die API genau die unterstützten Teile, schweigend. Das ist die eingebaute Fähigkeitserkennung. `include` spart keine Quota.

### E14 — Datenschutz

Eine `sanitize()` -Funktion in der HTTP-Schicht maskiert VIN und API-Key in **jeder** Meldung, bevor sie das Modul verlässt. Nie eine Fehlermeldung aus einer rohen URL bauen. **Begründung:** Die VIN steht im URL-Pfad; ioBroker-Logs landen routinemäßig im Forum. Zusammen mit `formattedAddress` Ergäbe das die Heimatadresse im Klartext. Parkposition standardmäßig **an** ; abschaltbar, und dann via `include` gar nicht erst erforderlich. Externe Fehlertelemetrie ist nicht aktiviert und darf nur nach einer eigenen Datenschutzentscheidung ergänzt werden.

### E15 – Wiederholungen differenziert nach Fehlertyp

Siehe Tabelle in `implementation-plan.md`, Abschnitt „Fehlerbehandlung“. Kernregel: ** `5xx` Verbraucht Quota** → höchstes **ein** Wiederholungsversuch, mit Jitter, und nur oberhalb der Befehlsreserve. Beides `429` sind gratis → dort geduldig sein. Ist `Retry-After` Länger als die Rest-TTL, Befehl sofort als `EXPIRED` verwerfen. **Befehls-States entstehen aus denselben Fähigkeiten wie die Lese-States:** Fehlerkennung `auxiliaryHeating` in der Antwort, wird kein `auxiliaryHeating.start` angelegt.

### E16 – Listen: ID-basiert auf Profilebene, JSON darunter

`chargingProfiles.profiles.<id>.name` und `.targetStateOfChargeInPercent` als Staaten; `.timersJson` und `.preferredChargingTimesJson` als JSON-States. **Begründung:** Indexbasiert (`profiles.0`) zeigt nach dem Löschen eines Profils in der App immer noch ein anderes Profil. Die bisherigen Detailzustände bleiben schreibgeschützt. `.configurationJson` Bietet zusätzlich das vollständige Profil zum Atomaren Ändern, da die API das ganze Profil ersetzt. Es gibt keine impliziten Teilupdates. Strikte Validierung und ein Vergleich mit dem zuletzt gepollten Profil verhindern ungültige Anfragen und das Überschreiben zwischenzeitlich erkannter Änderungen. Ohne serverseitige Versionsprüfung lassen sich noch nicht gepolte App-Änderungen nicht erkennen.

### E17 — Profilentwürfe lokal bearbeiten, explizit gemeinsam senden

`chargingProfiles.profiles.<id>.edit.*` trennt lokale Eingaben von den gelesenen Fahrzeugdaten. Vorhandene Einstellungen, Timer und Zeitfenster werden über stabile IDs bearbeitet; Unbekannte API-Felder bleiben erhalten. `apply` übergibt genau ein vollständiges Profil an die diese Queue, `reset` Verwendet ausschließlich den letzten Poll. Einzelfeldänderungen und Reset erzeugen keine Anfragen. ACK im Editor bedeutet nur lokal übernommen; Befehlsannahme und Fahrzeugbestätigung stehen weiterhin in den Diagnose-States.

Entwürfe behalten ihre Ausgangsversion. Änderungen aus späteren Umfragen blockieren Apply; Die Queue prüft dieselbe Ausgangsversion erneut bei Aufnahme und Versand. Ein abweichendes noch laufendes Profilupdate darf durch den Editor nicht überschrieben werden. Wiederholtes Anwenden desselben Ziels verwendet das bestehende Coalescing. Abgelaufene Befehle sperren keine manuellen Wiederholungen. Entwürfe werden nach dem Neustart erst mit einer erfolgreichen Umfrage neu initialisiert, nie automatisch wie gespeichert oder gesendet. Die vorhandenen JSON-Befehle bleiben kompatibel. Nicht gepolte App-Änderungen bleiben aufgrund fehlender serverseitiger Versionsprüfung weiterhin ein Restrisiko.

Der Editor verwendet eindeutig `.setting` -Rollen und mehrsprachige Metadaten. Wiederholte Textfelder und Wochentage nutzen generische `text` -/`switch` -Rollen, damit keine detaillierte Rolle innerhalb eines Kanals mehrfach vorkommt. Auswahltexte werden als Strings in der System-Sprache hinterlegt, weil `common.states` Stringwerte erwartet. Bereits vorhandene Objekte werden gezielt migriert; eigene Namen und Geschichte bleiben unangetastet. Entfernte Felder werden nicht gelöscht, sondern mit `write=false`, `q=1` und Verfügbarkeitsbeschreibung behalten. Nicht verfügbare Felder erhalten passende Nur-Lese-Rollen (`indicator`, `value`, `text`) mit `read=true`; Es entstehen insbesondere keine Buttons mit `read=false` und `write=false`. Bei Rückkehr werden Bedienrollen und Schreibrechte wiederhergestellt. Eine erneute Umfrage kann sie reaktivieren. Dasselbe gilt beim Start, bis neue Fahrzeugdaten vorliegen. `edit.available` ist eine lokale Diagnose; Migration weder Verfügbarkeitsprüfung erzeugen Fahrzeuganfragen.

Editor-, Umfrage- und Bestätigungsanzeigen werden über stabile Codes bereitgestellt. Anzeigen folgen der Systemsprache, Maschinenwerte und englischen Backendlogs bleiben unverändert. Bestehende Diagnose-Labels werden ohne Änderung von Benutzer-Metadaten migriert; Auch abgeschlossene Befehlsbestätigungen erhalten Sie beim Start aktueller Labels.

## Bekannte Restrisiken

1. **Bang-Bang bleibt ein Kompromiss.** Die Wirksamkeit des Überschussladens entscheidet sich an der App-Einstellung `REDUCED`, nicht am Adapter.
2. ** `429 vehicle-not-accepting-requests` kommt vom Auto** , nicht von der Quota. Kann Schaltvorgänge blockieren, obwohl Budget da ist. Von außen nicht vorhersehbar.
3. **API ist `v0` ** , Rate-Limit laut Doku ausdrücklich nicht endgültig — in beide Richtungen.
4. **Nur der Enyaq ist testbar.** Alles Verbrenner-, Hybrid- und Standheizungsspezifische basiert auf Spec plus Mock.
5. **Die Spezifikation hat Fehler.** `Charging` und `ChargingProfile` enthalten je ein Feld `tings`, das rekursiv auf den eigenen Typ zeigt – offensichtlich ein abgeschnittenes `settings` aus Škodas Generator. Der Codegen braucht dafür eine Ausnahme, sonst entsteht eine unendliche Typrekursion.
6. **Entwicklung läuft auf Node 26, Produktion auf Node 22.** Bewusst so entschieden (kein Versionsmanager auf dem Mac). Konsequenz: Merkwürdigkeiten im `dev-server` Muss erst gegen die Node-Version abgegrenzt werden, bevor man sie als Bug behandelt. `js-controller` 7.2.2 deklariert `>=18`, ist gegen Node 26 aber nicht getestet.