---
chapters: {"pages":{"en/adapterref/iobroker.smart-text2command/README.md":{"title":{"en":"ioBroker.smart-text2command"},"content":"en/adapterref/iobroker.smart-text2command/README.md"},"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md":{"title":{"en":"Testanleitung ohne echte Geräte"},"content":"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md"},"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md":{"title":{"en":"Example sentences for smart-text2command (English)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md"},"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md":{"title":{"en":"Beispielsätze für smart-text2command (Deutsch)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md":{"title":{"en":"`sendTo`-API für andere ioBroker-Adapter"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md":{"title":{"en":"Konfigurierte `sendTo`-Aktion für eigene Intents"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md"},"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md":{"title":{"en":"Entwicklung und technische Architektur"},"content":"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md"},"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md":{"title":{"en":"ioBroker.smart-text2command – Technische Spezifikation"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md"}}}
---
# `sendTo`-API für andere ioBroker-Adapter

Diese Anleitung beschreibt den aktuellen Aufruf von `smart-text2command` aus
einer anderen ioBroker-Adapterinstanz. Ziel ist beispielsweise
`smart-text2command.0`. Für einen anderen Instanzindex muss der Zielname
entsprechend angepasst werden.

## Aufruf und Antwort

Der aufrufende Adapter sendet den Befehl `processText` mit einem JSON-Objekt an
die Zielinstanz. **Ein Callback ist erforderlich:** Die Zielinstanz verarbeitet
Nachrichten ohne Callback derzeit nicht. Im Callback steht das Ergebnis
in `reply.message`. `sendTo` liefert das Verarbeitungsergebnis nicht als
direkten Rückgabewert.

```ts
import { randomUUID } from 'node:crypto';

this.sendTo(
    'smart-text2command.0',
    'processText',
    {
        requestId: randomUUID(),
        sessionId: 'sprachgeraet-wohnzimmer',
        language: 'de',
        text: 'Welche Temperatur',
        mode: 'execute',
    },
    reply => {
        if (!reply || reply instanceof Error) {
            this.log.warn(`Keine Antwort von smart-text2command: ${String(reply)}`);
            return;
        }
        const result = reply.message as Record<string, unknown>;
        if (typeof result?.error === 'string') {
            this.log.warn(`API-Aufruf fehlgeschlagen: ${result.error}`);
            return;
        }
        // result.status und result.response auswerten;
        // bei status === 'clarification' result.clarification.id merken.
        this.log.info(String(result.response));
    },
    { timeout: 30_000 },
);
```

`reply.message` ist entweder ein `CommandResult` oder bei einer Ablehnung durch
den Nachrichtenrouter ein Objekt `{ "error": "..." }`. Der aufrufende Adapter
sollte auch einen ausbleibenden Callback beziehungsweise einen Transportfehler behandeln.

## Anfrageformat

| Feld              | Pflicht             | Bedeutung                                                                                                                                                                                     |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `requestId`       | ja                  | Neue eindeutige ID **für jede Gesprächsrunde**. Eine identische Anfrage mit derselben ID liefert innerhalb von fünf Minuten dasselbe Ergebnis; dieselbe ID mit anderem Inhalt wird abgelehnt. |
| `text`            | ja                  | Eingabetext oder kurze Antwort auf eine Rückfrage; 1 bis 1000 Zeichen, nicht nur Leerzeichen.                                                                                                 |
| `mode`            | ja                  | `analyze` plant und liest/schreibt keinen Geräte-State; `execute` darf freigegebene Aktionen ausführen. Der Modus muss bei einer Fortsetzung gleich bleiben.                                  |
| `sessionId`       | nein                | Stabile ID für **ein** unabhängiges Gespräch, etwa eine Sitzung eines Sprachgeräts oder Nutzers. Bei jeder Fortsetzung exakt wiederverwenden.                                                 |
| `language`        | nein                | Derzeit `de` oder `en`; ohne Angabe gilt die konfigurierte Standardsprache. Sprachspezifische Texte stehen in Sprachdateien.                                                                  |
| `clarificationId` | nur bei Fortsetzung | ID aus `result.clarification.id`. Verknüpft eine kurze Antwort mit genau einer offenen Rückfrage.                                                                                             |
| `selection`       | nein                | Optionale technische ID aus `result.clarification.options[].id`, etwa für eine Schaltfläche. Für gesprochene Antworten genügt `text`. `selection` setzt `clarificationId` voraus.             |

`requestId`, `sessionId` und `clarificationId` dürfen jeweils nur 1 bis 100
Zeichen aus `A–Z`, `a–z`, `0–9`, `.`, `_`, `:` und `-` enthalten.
Eine `selection` darf höchstens 100 Zeichen und keine Steuerzeichen enthalten.
Der Nachrichtenrouter lehnt serialisierte Anfragen über 65.536 Zeichen ab.

## Optionale Session-Historie

In der Adapterkonfiguration unter **Einstellungen** kann ein Administrator
**Externe sendTo-Anfragen in der Session-Historie speichern** aktivieren. Die
Option ist standardmäßig ausgeschaltet. Bei aktivierter Option erscheinen
`processText`-Anfragen und ihre Antworten zusammen mit den Testlabor-Sitzungen
in der Session-Historie; die Herkunft und der aufrufende Adapter werden dort
angezeigt. Die Speicherung ist auf 30 Sitzungen mit jeweils bis zu 50 Anfragen begrenzt.

Anfragen mit derselben `sessionId` desselben Absenders und Nutzers werden in
einem Verlauf gesammelt. Gleiche Session-IDs anderer Absender oder Nutzer
bleiben getrennt. Ohne `sessionId` erhält jede `requestId` einen eigenen
Verlauf. Schlägt die Speicherung fehl, bleibt das Verarbeitungsergebnis erhalten
und enthält zusätzlich `historyError: "HISTORY_SAVE_FAILED"`.

## Mehrteilige Gespräche

Ein Aufruf **ohne** `clarificationId` beginnt immer eine neue Anfrage, auch
wenn dieselbe `sessionId` gesendet wird. Dabei wird eine zuvor offene Rückfrage
derselben Absender-/Nutzer-/Sitzungskombination beendet. Ein Aufruf **mit**
`clarificationId` versucht, den Text als Antwort auf genau diese Rückfrage zu
verstehen. Bei einer unpassenden Antwort wiederholt der Adapter die Frage mit
derselben ID; er führt den Text nicht als neuen Befehl aus.

Beispiel einer Fortsetzung nach „Welche Temperatur?“:

```json
{
    "requestId": "req-2",
    "sessionId": "sprachgeraet-wohnzimmer",
    "language": "de",
    "text": "Wohnzimmer",
    "mode": "execute",
    "clarificationId": "<id aus der vorigen Antwort>"
}
```

Bleiben nach „Wohnzimmer“ mehrere geeignete Geräte übrig, liefert der Adapter
eine **neue** Rückfrage mit neuer `clarificationId`. Der Aufrufer ersetzt die
gespeicherte ID und sendet in der nächsten Runde beispielsweise nur „Heizung“.
Die ursprüngliche Absicht bleibt erhalten. Auch Raum-, Funktions- und
Wertrückfragen werden so fortgesetzt.

Eine offene Rückfrage läuft nach fünf Minuten oder einem Adapterneustart ab. Die
nächste Antwort mit dieser ID erhält `status: "rejected"`,
`errorCode: "CLARIFICATION_EXPIRED"` und einen sprechbaren Hinweis. Eine
unbekannte ID oder eine ID aus einer anderen Absender-/Nutzer-/Sitzungskombination
wird ebenso abgelehnt. Die ID ist nach erfolgreicher Fortsetzung verbraucht.

Ganze Antworten wie „Stopp“, „Abbrechen“ oder „Vergiss es“ beenden eine offene
Rückfrage, sofern der Aufrufer die `clarificationId` mitsendet. Das Ergebnis hat
`status: "cancelled"` und einen sprechbaren `response`-Text. Die Rückfrage nennt
diese Abbruchmöglichkeiten nicht. Soll stattdessen bewusst ein neuer Befehl
beginnen, lässt der Aufrufer die `clarificationId` weg.

## Ergebnis auswerten

Ein verarbeitetes Ergebnis enthält mindestens `requestId`, `status`, `language`
und den für Anzeige oder Sprachausgabe geeigneten Text `response`.

| `status`        | Bedeutung für den Aufrufer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clarification` | `response` ausgeben oder ansagen; `clarification.id` zusammen mit `sessionId` und `mode` für die nächste Antwort speichern. `clarification.key` kann unter anderem `room`, `device`, `capability`, `value`, `parameter` oder `sendToOption` sein; bei `parameter` nennt `clarification.parameter` den fehlenden Parameter. `options` enthält gegebenenfalls technische IDs und Anzeigenamen. Bei `sendToOption` kann die nächste Antwort eine Options-ID oder ein Anzeigename sein; der Adapter ruft danach den konfigurierten `sendTo`-Empfänger erneut auf. |
| `success`       | `response` ausgeben oder ansagen. Im Analysemodus beschreibt `actions[].status: "planned"` nur den Plan. Im Ausführungsmodus bedeutet `accepted` bei Schreibaktionen, dass der Befehl übergeben wurde; ein bestätigter Gerätezustand wird damit nicht behauptet. Leseaktionen können einen bestätigten Wert liefern.                                                                                                                                                                                                                                          |
| `cancelled`     | Abbruchbestätigung aus `response` ausgeben; gespeicherte Rückfrage-ID löschen.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `rejected`      | `response` ausgeben; `errorCode` für technische Behandlung auswerten. Keine Aktion wurde ausgeführt.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `error`         | Verarbeitungs- oder Ausführungsfehler; `response` und gegebenenfalls `errorCode` auswerten.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

`analysis`, `candidates`, `intent`, `confidence`, `modelVersion` und `durationMs`
sind zusätzliche Diagnosefelder. Der aufrufende Adapter sollte seine
Dialogsteuerung auf `status` und `clarification` stützen, nicht auf NLP-Konfidenz
oder den Wortlaut von `response`. Fehler des Nachrichtenrouters erscheinen als
`{ "error": "..." }` statt als `CommandResult`; der Text dieses Feldes ist nicht
durchgängig ein stabiler Fehlercode. Bekannte technische Routerfehler sind
`RATE_LIMITED` und `REQUEST_TOO_LARGE`.

### JSON-Beispiele der Rückmeldearten

Die folgenden Beispiele zeigen jeweils **`reply.message`**, nicht die
ioBroker-Nachrichtenhülle. Geräte- und State-IDs sind Beispiele; optionale
Felder können je nach Anfrage fehlen.

**Rückfrage mit Geräteauswahl** nach `requestId: "req-1"` und „Welche Temperatur“:

```json
{
    "requestId": "req-1",
    "status": "clarification",
    "language": "de",
    "intent": "device.getValue",
    "response": "Ich habe das Gerät nicht eindeutig verstanden. Meintest du Heizung (Wohnzimmer), Temperatursensor (Schlafzimmer)?",
    "clarification": {
        "id": "a89a5821-c40e-4e03-8810-0f2284c3563e",
        "key": "device",
        "options": [
            { "id": "0_userdata.0.test_heizung_wohnzimmer", "label": "Heizung (Wohnzimmer)" },
            { "id": "0_userdata.0.test_sensor_schlafzimmer", "label": "Temperatursensor (Schlafzimmer)" }
        ]
    }
}
```

**Unpassende Antwort:** Die Rückfrage bleibt mit **derselben** ID offen. Der
Aufrufer kann den Nutzer erneut antworten lassen.

```json
{
    "requestId": "req-2",
    "status": "clarification",
    "language": "de",
    "intent": "device.getValue",
    "response": "Die Antwort passt nicht zur Rückfrage. Ich habe das Gerät nicht eindeutig verstanden. Meintest du Heizung (Wohnzimmer), Temperatursensor (Schlafzimmer)?",
    "errorCode": "INVALID_SELECTION",
    "clarification": {
        "id": "a89a5821-c40e-4e03-8810-0f2284c3563e",
        "key": "device",
        "options": [
            { "id": "0_userdata.0.test_heizung_wohnzimmer", "label": "Heizung (Wohnzimmer)" },
            { "id": "0_userdata.0.test_sensor_schlafzimmer", "label": "Temperatursensor (Schlafzimmer)" }
        ]
    }
}
```

**Rückfrage nach einem Wert:** Bei `key: "value"` kann `options` fehlen. Als
nächste Antwort genügt beispielsweise `text: "25 Grad"` mit dieser `clarificationId`.

```json
{
    "requestId": "set-1",
    "status": "clarification",
    "language": "de",
    "intent": "device.setTemperature",
    "response": "Welchen Wert soll ich setzen?",
    "clarification": {
        "id": "27dd43e1-26c8-47fc-8175-e1259cb3988d",
        "key": "value"
    }
}
```

**Erfolgreiche Analyse** (`mode: "analyze"`): `planned` bedeutet, dass kein
Geräte-State gelesen oder geschrieben wurde.

```json
{
    "requestId": "check-1",
    "status": "success",
    "language": "de",
    "intent": "device.getValue",
    "response": "Geplant: Wert von Heizung im Raum Wohnzimmer lesen.",
    "actions": [
        {
            "deviceId": "0_userdata.0.test_heizung_wohnzimmer",
            "stateId": "0_userdata.0.test_heizung_wohnzimmer.IST",
            "status": "planned"
        }
    ],
    "analysis": {
        "plan": {
            "action": "getValue",
            "operation": "read",
            "stateId": "0_userdata.0.test_heizung_wohnzimmer.IST"
        },
        "policyDecision": "allowed"
    }
}
```

**Erfolgreiches Lesen** (`mode: "execute"`): `confirmed` enthält den tatsächlich
gelesenen Wert.

```json
{
    "requestId": "req-3",
    "status": "success",
    "language": "de",
    "intent": "device.getValue",
    "response": "Der Wert von Heizung im Raum Wohnzimmer beträgt 21 °C.",
    "actions": [
        {
            "deviceId": "0_userdata.0.test_heizung_wohnzimmer",
            "stateId": "0_userdata.0.test_heizung_wohnzimmer.IST",
            "status": "confirmed",
            "value": 21
        }
    ]
}
```

**Erfolgreiches Schreiben** (`mode: "execute"`): `accepted` bestätigt die
Übergabe des Befehls, nicht den späteren Gerätezustand.

```json
{
    "requestId": "set-2",
    "status": "success",
    "language": "de",
    "intent": "device.setTemperature",
    "response": "Der Befehl, Solltemperatur von Heizung im Raum Wohnzimmer auf 25 °C zu setzen, wurde übergeben.",
    "actions": [
        {
            "deviceId": "0_userdata.0.test_heizung_wohnzimmer",
            "stateId": "0_userdata.0.test_heizung_wohnzimmer.SOLL",
            "status": "accepted"
        }
    ]
}
```

Bei einem freigegebenen booleschen State mit Rolle `button` oder `button.*`
verwendet der Adapter die Aktion `press`. Der Text „Drücke AUF am Rollladen im
Wohnzimmer“ löst einen einzelnen Schreibzugriff mit `true` aus. Ein Button bietet
keine Ein- oder Ausschaltaktion.

```json
{
    "requestId": "press-1",
    "status": "success",
    "language": "de",
    "intent": "device.press",
    "response": "Der Tastendruck für AUF von Rollladen im Raum Wohnzimmer wurde übergeben.",
    "actions": [
        {
            "deviceId": "0_userdata.0.test_rollladen_wohnzimmer",
            "stateId": "0_userdata.0.test_rollladen_wohnzimmer.AUF",
            "status": "accepted"
        }
    ]
}
```

**Abbruch** einer offenen Rückfrage durch „Abbrechen“ mit gültiger `clarificationId`:

```json
{
    "requestId": "cancel-1",
    "status": "cancelled",
    "language": "de",
    "response": "Okay, die Anfrage wurde abgebrochen."
}
```

**Abgelehnte Anfrage**, hier eine abgelaufene Rückfrage. Andere Ablehnungsgründe
werden ebenfalls über `errorCode` und `response` beschrieben.

```json
{
    "requestId": "req-4",
    "status": "rejected",
    "language": "de",
    "response": "Die Rückfrage ist abgelaufen. Bitte stelle die Anfrage erneut.",
    "errorCode": "CLARIFICATION_EXPIRED"
}
```

**Verarbeitungsfehler** als `CommandResult`:

```json
{
    "requestId": "req-5",
    "status": "error",
    "language": "de",
    "response": "Verarbeitung fehlgeschlagen.",
    "errorCode": "PROCESSING_ERROR"
}
```

**Fehlgeschlagener Lesezugriff:** Hier enthält `actions[].status` den Wert
`failed`. Die übrigen Felder bleiben im selben `CommandResult`-Format.

```json
{
    "requestId": "read-err-1",
    "status": "error",
    "language": "de",
    "intent": "device.getValue",
    "response": "Der Datenpunkt liefert derzeit keinen Wert.",
    "errorCode": "STATE_UNAVAILABLE",
    "actions": [
        {
            "deviceId": "0_userdata.0.test_heizung_wohnzimmer",
            "stateId": "0_userdata.0.test_heizung_wohnzimmer.IST",
            "status": "failed",
            "message": "STATE_UNAVAILABLE"
        }
    ]
}
```

**Bei der erneuten Prüfung abgelehnte Aktion:** `actions[].status: "rejected"`
kann auftreten, wenn die Freigabe unmittelbar vor der Ausführung nicht mehr gilt.

```json
{
    "requestId": "write-err-1",
    "status": "rejected",
    "language": "de",
    "intent": "device.setTemperature",
    "response": "Diese Aktion ist für das Gerät nicht freigegeben.",
    "errorCode": "ACTION_NOT_APPROVED",
    "actions": [
        {
            "deviceId": "0_userdata.0.test_heizung_wohnzimmer",
            "stateId": "0_userdata.0.test_heizung_wohnzimmer.SOLL",
            "status": "rejected",
            "message": "ACTION_NOT_APPROVED"
        }
    ]
}
```

**Fehler des Nachrichtenrouters:** Dieses Format hat kein `status`, kein
`requestId` und keinen sprechbaren `response`-Text. Es muss vor der Auswertung
als `CommandResult` erkannt werden.

```json
{
    "error": "RATE_LIMITED"
}
```

### Eigener Intent mit ausgehender `sendTo`-Aktion

Wenn ein eigener Intent einen vom Admin konfigurierten `sendTo`-Aufruf auslöst,
bleibt das äußere `processText`-Ergebnis ein `CommandResult`. Fehlende Parameter
werden wie andere Rückfragen fortgesetzt:

```json
{
    "requestId": "req-2001",
    "status": "clarification",
    "language": "de",
    "intent": "sendeWert",
    "response": "Bitte gib den Wert an.",
    "clarification": {
        "id": "clarification-2001",
        "key": "parameter",
        "parameter": "wert"
    }
}
```

Nach vollständiger Eingabe übernimmt der Adapter den sprechbaren `text` aus dem
versionierten Empfängerobjekt als `response`:

```json
{
    "requestId": "req-2002",
    "status": "success",
    "language": "de",
    "intent": "sendeWert",
    "response": "Der Befehl wurde ausgeführt."
}
```

Die Konfiguration und das Antwortobjekt des Empfängers beschreibt [SENDTO_INTENT_ACTION_SPECIFICATION.md](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md).

## Parallele Nutzer und Berechtigungen

Der Adapter bindet Rückfragen an den ioBroker-Absender `message.from`, den
optionalen Benutzer `message.user` und die `sessionId`. Der aufrufende Adapter
muss für gleichzeitig laufende Gespräche unterschiedliche `sessionId`s vergeben
und die zugehörige `clarificationId` je Gespräch getrennt speichern. Wenn er
eine **verlässlich authentifizierte** ioBroker-Benutzer-ID besitzt, kann er
diese über die `sendTo`-Option `user` mitsenden; ein Adapter kann diese Angabe
technisch selbst setzen. Sie ersetzt daher keine Prüfung im aufrufenden Adapter.
Zwei Personen an demselben Sprachgerät lassen sich ohne Identitätsinformation des
aufrufenden Dienstes nicht zuverlässig trennen.

`processText` verlangt keine Admin-Anmeldung des Absenders. Der Admin gibt Geräte
und konkrete Aktionen dauerhaft frei oder konfiguriert für eigene Intents einen
festen `sendTo`-Empfänger mit Befehl und Nachrichtenrahmen. `execute` prüft
Gerätefreigaben; beim eigenen `sendTo`-Intent werden ausschließlich die
konfigurierten Ziele und geprüften Parameter verwendet. Wenn der aufrufende
Adapter Texte von externen oder nicht vertrauenswürdigen Nutzern annimmt, muss
**er** entscheiden, wer `execute` verwenden darf. `sessionId` und `clarificationId`
sind keine Berechtigungsnachweise. `input.text` ist eine separate, nur
analysierende State-Schnittstelle und eignet sich nicht für unabhängige Mehrbenutzergespräche.

Der Router begrenzt `processText` derzeit auf 30 Aufrufe pro Minute
**je sendendem Adapter** (`message.from`), also gemeinsam für dessen Nutzer.
Der aufrufende Adapter sollte bei parallelen Nutzern diese Grenze berücksichtigen
und `RATE_LIMITED` behandeln.