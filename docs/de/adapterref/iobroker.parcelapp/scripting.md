---
chapters: {"pages":{"de/adapterref/iobroker.parcelapp/README.md":{"title":{"de":"ioBroker.parcelapp — Nutzerdokumentation"},"content":"de/adapterref/iobroker.parcelapp/README.md"},"de/adapterref/iobroker.parcelapp/scripting.md":{"title":{"de":"Skripte und Automatisierung"},"content":"de/adapterref/iobroker.parcelapp/scripting.md"},"de/adapterref/iobroker.parcelapp/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.parcelapp/faq.md"}}}
---
# Skripte und Automatisierung

Kapitel: [Hauptseite](/#/adapters/parcelapp) · **diese Seite** · [Häufige Fragen](/#/docs/adapterref/iobroker.parcelapp/faq.md)

---

## Auf eine Sendung reagieren

Nimm `statusCode`, nie `status`. Der Text ändert sich mit der Systemsprache, die Zahl nicht.

```javascript
// Ansage für eine Sendung, die in Zustellung ist.
on({ id: /^parcelapp\.0\.deliveries\..*\.statusCode$/, change: "ne" }, obj => {
  if (obj.state.val !== 4) {
    return; // 4 = In Zustellung
  }
  const base = obj.id.replace(/\.statusCode$/, "");
  const was = getState(`${base}.description`).val;
  const wann = getState(`${base}.deliveryWindow`).val;
  say(wann ? `${was} kommt zwischen ${wann}` : `${was} ist in Zustellung`);
});
```

Die Codes stehen auf der [Hauptseite](/#/adapters/parcelapp#status-codes). Zwei davon verdienen ein eigenes
Skript: **6** (Zustellversuch fehlgeschlagen) und **7** (Ausnahme) sind die Zustände, in denen eine
Sendung dich braucht.

## Auf den ganzen Tag reagieren

`summary.todayCount` und `summary.deliveryWindow` beschreiben den Tag statt einer einzelnen Sendung
— gut für eine Morgenmeldung:

```javascript
schedule("0 7 * * *", () => {
  const anzahl = getState("parcelapp.0.summary.todayCount").val;
  if (anzahl === 0) {
    return;
  }
  const fenster = getState("parcelapp.0.summary.deliveryWindow").val;
  say(fenster ? `${anzahl} Pakete heute, zwischen ${fenster}` : `${anzahl} Pakete werden heute erwartet`);
});
```

## `lastUpdated` ist eine Änderungsmarke

`lastUpdated` wird nur geschrieben, wenn sich die Sendungsdaten wirklich geändert haben, nicht bei
jeder Abfrage — eine von Tag zu Tag weiterrückende Schätzung, ein neuer Anzeigename des Zustellers
oder eine andere Systemsprache zählen nicht, ein neuer Zusteller-Code schon. Damit taugt es als „da ist etwas passiert"-Auslöser — und ein alter Zeitstempel ist
eine Information, kein Fehler:

```javascript
// Warnen bei einer Sendung, die sich seit vier Tagen nicht bewegt.
schedule("0 18 * * *", () => {
  $("state[id=parcelapp.0.deliveries.*.lastUpdated]").each(id => {
    const tage = (Date.now() - new Date(getState(id).val).getTime()) / 86400000;
    if (tage > 4) {
      log(`Seit ${Math.floor(tage)} Tagen keine Bewegung: ${id}`);
    }
  });
});
```

---

## Eine Sendung per Skript hinzufügen

Der Adapter nimmt eine `addDelivery`-Nachricht entgegen und reicht sie an dein parcel.app-Konto
weiter:

```javascript
sendTo(
  "parcelapp.0",
  "addDelivery",
  {
    tracking_number: "1234567890",
    carrier_code: "dhl",
    description: "Mein Paket",
    // optional:
    language: "de", // Sprache der Sendungsverfolgung, ISO 639-1, Vorgabe "en"
    send_push_confirmation: true, // parcel.app-Push nach dem Hinzufügen, Vorgabe false
    postcode: "10115", // manche Zusteller (z. B. bpost, DPD Deutschland) verfolgen ohne sie nicht
    email: "du@example.com", // manche Dienste (z. B. Apple-Store-Bestellungen) verlangen sie
  },
  result => {
    if (result.success) {
      log("Zu parcel.app hinzugefügt");
    } else {
      log(`Konnte nicht hinzugefügt werden: ${result.error_message}`, "warn");
    }
  },
);
```

### Die Antwort

Der Rückruf bekommt immer ein Objekt mit `success` und, im Fehlerfall, `error_message`. Diese Form
ist stabil — Skripte, die dagegen geschrieben sind, funktionieren weiter. Der Rückruf ist optional:
ein `sendTo` ohne ihn fügt die Sendung genauso hinzu, das Ergebnis steht dann im Log auf Stufe info
(`addDelivery: added '…'` oder `addDelivery: parcel.app rejected '…': …`).

`success: false` kann mehrere Ursachen haben, und `error_message` sagt welche: ein unbekanntes
`carrier_code`, eine Sendungsnummer, die der Zusteller nicht kennt, eine fehlende `postcode` oder
`email` bei einem Zusteller, der sie braucht, das Tageslimit für POSTs oder ein Prüffehler des
Adapters, noch bevor die Anfrage überhaupt hinausging. Lehnt parcel.app die
Anfrage ab, trägt `error_message` hinter dem HTTP-Status den Grund von parcel.app selbst — zum
Beispiel `HTTP 400: Unknown carrier code` — und nicht nur die Statuszeile.

### Was der Adapter vor dem Senden prüft

| Regel                                                                                     | Antwort                                                              |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `tracking_number`, `carrier_code` und `description` sind Pflicht und nicht leer           | `tracking_number, carrier_code and description are required`         |
| Jedes Feld höchstens 512 Zeichen                                                          | `each field must be at most 512 characters`                          |
| Höchstens 20 Aufrufe in beliebigen 24 Stunden — das POST-Tageslimit von parcel.app selbst | `daily limit of 20 addDelivery requests reached; next possible at …` |

Diese Wächter gibt es, damit ein außer Kontrolle geratenes Skript das POST-Tagesbudget von parcel.app
nicht mit Aufrufen verbraucht, die parcel.app ohnehin abweisen würde, und keine mehrere Megabyte
große Anfrage dorthin schickt. Sie greifen vor dem Netzwerkaufruf, ein abgelehnter Aufruf kostet also
nichts. Die erste Abweisung in einem 24-Stunden-Fenster erscheint als Warnung, jede weitere auf
Debug-Stufe.

### Was nach dem erfolgreichen Hinzufügen passiert

Der Adapter fragt sofort noch einmal ab — höchstens einmal je Abfrageintervall, frühestens 60
Sekunden nach der vorigen Abfrage und nur, solange das Stundenbudget es erlaubt; sonst holt die
nächste reguläre Abfrage die Sendung ab. Ihre Sendungsdaten sind aber meist noch leer — parcel.app
selbst liegt im Schnitt **45 und höchstens etwa 90 Minuten** hinter der Website des Zustellers, vorher
trägt eine frisch hinzugefügte Sendung keine Ereignisse. Das ist eine Verzögerung auf parcel.app-Seite,
kein Fehler des Adapters.

### Zustellerkürzel

`carrier_code` ist die Kennung, die parcel.app verwendet, nicht der Eigenname des Zustellers —
`dhl`, `ups`, `fedex` und so weiter. Die Liste, aus der der Adapter die Namen auflöst, ist
[`supported_carriers.json`](https://api.parcel.app/external/supported_carriers.json); der lesbare
Name einer bereits verfolgten Sendung steht immer in ihrem `carrier`-Datenpunkt.

---

## Die Verbindung per Skript testen

Die Nachricht `checkConnection` führt eine echte Anfrage aus und antwortet in dem Format, das die
Admin-Oberfläche erwartet — `{ result: "..." }` bei Erfolg, `{ error: "..." }` bei Misserfolg:

```javascript
sendTo("parcelapp.0", "checkConnection", { apiKey: "dein-schluessel" }, reply => {
  log(reply.error ? `Fehlgeschlagen: ${reply.error}` : `Ok: ${reply.result}`);
});
```

Die Form unterscheidet sich absichtlich von `addDelivery`: die `sendTo`-Komponente des ioBroker-
Admins liest genau `result`/`error`. `checkConnection` gehört nicht in einen Zeitplan — jeder Aufruf
verbraucht eine der 20 Anfragen pro Stunde. Mit dem eingestellten Schlüssel antwortet der Adapter
selbst, solange die Abkühlzeit einer parcel.app-Anfragegrenze läuft oder das Stundenbudget verbraucht
ist.