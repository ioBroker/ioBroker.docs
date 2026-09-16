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
jeder Abfrage. Damit taugt es als „da ist etwas passiert"-Auslöser — und ein alter Zeitstempel ist
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
ist stabil — Skripte, die dagegen geschrieben sind, funktionieren weiter.

`success: false` kann mehrere Ursachen haben, und `error_message` sagt welche: ein unbekanntes
`carrier_code`, eine Sendungsnummer, die der Zusteller nicht kennt, das Tageslimit für POSTs oder
ein Prüffehler des Adapters, noch bevor die Anfrage überhaupt hinausging.

### Was der Adapter vor dem Senden prüft

| Regel                                                                           | Antwort                                                      |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `tracking_number`, `carrier_code` und `description` sind Pflicht und nicht leer | `tracking_number, carrier_code and description are required` |
| Jedes Feld höchstens 512 Zeichen                                                | `each field must be at most 512 characters`                  |
| Höchstens 20 Aufrufe je Minute                                                  | `too many addDelivery requests; max 20 per 60s`              |

Diese Wächter gibt es, damit ein außer Kontrolle geratenes Skript weder dein Tagesbudget verbrennt
noch eine mehrere Megabyte große Anfrage an parcel.app schickt. Sie greifen vor dem Netzwerkaufruf,
ein abgelehnter Aufruf kostet also nichts.

### Was nach dem erfolgreichen Hinzufügen passiert

Der Adapter fragt sofort ab, die Sendung erscheint also binnen Sekunden im Objektbaum. Ihre
Sendungsdaten sind aber meist noch leer — parcel.app selbst braucht **45 bis 90 Minuten**, bis eine
frisch hinzugefügte Sendung Ereignisse trägt. Das ist eine Verzögerung auf parcel.app-Seite, kein
Fehler des Adapters.

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
verbraucht eine der 20 Anfragen pro Stunde.