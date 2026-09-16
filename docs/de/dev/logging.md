---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/logging.md
title: Log-Transporter
lastChanged: "09.09.2026"
---

# Log-Transporter

Normalerweise schreibt jeder Adapter seine Meldungen über `this.log` in die
Protokolldatei, und damit ist die Sache erledigt. Manche Adapter brauchen die
Meldungen aber selbst: Der Admin zeigt sie in den **Protokollen** an, andere
schreiben sie in eine Datenbank oder schicken sie weiter. Dafür gibt es den
Log-Transporter.

?> Für die eigene Protokollierung genügt `this.log.info(...)`. Diese Seite
beschreibt den Sonderfall, dass ein Adapter die Meldungen **aller anderen**
mitlesen will.

## Einschalten

In der `io-package.json` im Block `common`:

```json
"logTransporter": true
```

Erst dadurch steht die Methode `requireLog` überhaupt zur Verfügung. Im
Adaptercode wird sie eingeschaltet und das Ereignis `log` abonniert:

```js
async onReady() {
    await this.requireLog(true);
}

onLog(logObject) {
    // logObject.severity, .message, .from, .ts, ._id
}
```

Der Handler wird wie die anderen im Konstruktor gebunden:

```js
this.on('log', this.onLog.bind(this));
```

## Aufbau einer Meldung

| Feld | Inhalt |
|---|---|
| `_id` | fortlaufende Kennung der Meldung |
| `from` | Instanz, aus der sie stammt, z. B. `system.adapter.web.0` |
| `severity` | Protokollstufe: `silly`, `debug`, `info`, `warn`, `error` |
| `ts` | Zeitstempel in Millisekunden |
| `message` | der Text |

Beispiel:

```js
{ _id: 4711, from: 'testlog.0', message: 'testlog.0 (12504) adapter disabled',
  severity: 'error', ts: 1585413238439 }
```

## Was im Hintergrund passiert

Trägt ein Adapter das Merkmal `logTransporter`, legt der js-controller für
jede Instanz den Zustand `system.adapter.<name>.<instanz>.logging` an. Setzt
der Adapter ihn über `requireLog(true)` auf `true`, meldet er damit an: Ich
will die Meldungen haben.

Alle anderen Instanzen beobachten die Zustände `*.logging`. Sobald einer davon
auf `true` steht, schreiben sie ihre Meldungen zusätzlich in eine
FIFO-Warteschlange für diesen Empfänger. Der Empfänger liest sie aus und
bekommt sie als Ereignis `log` zugestellt.

!> `requireLog(false)` wirkt nicht sofort. Die anderen Instanzen hören erst
nach etwa zehn Sekunden auf zu liefern.

## Wozu das gut ist

* Der **Admin** zeigt damit die Protokolle live an, ohne die Datei zu lesen.
* Adapter wie `sql` oder `telegram` können damit Fehlermeldungen weiterleiten.
* Ein Adapter, der nur seine eigenen Meldungen behandeln will, braucht das
  nicht: Dafür schreibt er einfach beim Protokollieren selbst mit.

Wer bei einem bestimmten Ereignis den Benutzer erreichen möchte, statt jede
Meldung mitzulesen, ist mit
[Benachrichtigungen](/docs/dev/notifications.md) besser bedient.
