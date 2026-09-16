---
title:       "Nachrichten zwischen Instanzen"
lastChanged: "08.09.2026"
---

# Nachrichten zwischen Instanzen

Zustände sind Werte: sie stehen im Objektbaum, jeder darf sie lesen, und sie
bleiben stehen. Für vieles ist das genau richtig. Für einen **Auftrag** ist es
das nicht.

„Schicke diese Nachricht per Telegram" ist kein Wert, den man irgendwo
hinterlegt. Es ist eine einmalige Anweisung, oft mit mehreren Angaben und
manchmal mit einer Antwort. Dafür gibt es das Nachrichtenfach, die
**Messagebox**.

## Voraussetzung

Eine Instanz kann nur Nachrichten empfangen, wenn ihr Adapter das ankündigt. In
der `io-package.json`:

```json
"common": {
  "messagebox": true
}
```

Damit legt ioBroker für jede Instanz das Objekt
`system.adapter.<name>.<nummer>.messagebox` an. Fehlt der Eintrag, verschwindet
jedes `sendTo` spurlos. Das ist der häufigste Grund dafür, dass Nachrichten
scheinbar nicht ankommen.

## Senden

```js
this.sendTo('telegram.0', 'send', { text: 'Waschmaschine fertig' });
```

Die drei Angaben sind immer dieselben: an **wen**, welcher **Befehl**, welche
**Nutzlast**. Die Nutzlast ist beliebig, meist ein Objekt.

Soll eine Antwort kommen, wird ein vierter Parameter angehängt:

```js
this.sendTo('sql.0', 'getHistory', {
    id: 'javascript.0.Temperatur',
    options: { start: Date.now() - 3600000, aggregate: 'average' }
}, result => {
    this.log.info(`${result.result.length} Werte erhalten`);
});
```

Der Rückruf kommt asynchron. Wer nicht ewig warten will, gibt eine Frist an:

```js
this.sendTo('sql.0', 'getHistory', payload, callback, { timeout: 5000 });
```

Ohne Frist wartet der Aufruf im Zweifel für immer, wenn die Gegenstelle nicht
antwortet.

?> Aus einem Skript im JavaScript-Adapter heißt derselbe Aufruf schlicht
`sendTo(...)`, ohne `this`. Das ist derselbe Mechanismus.

## Empfangen

Im Adapter wird die Nachricht in `onMessage` behandelt. Das Objekt, das
ankommt, hat vier Felder:

| Feld | Inhalt |
| ---- | ------ |
| `command` | Der Befehl, also das zweite Argument von `sendTo`. |
| `message` | Die Nutzlast. |
| `from` | Wer geschickt hat, zum Beispiel `system.adapter.javascript.0`. |
| `callback` | Nur gesetzt, wenn der Absender eine Antwort erwartet. |

```js
onMessage(obj) {
    if (!obj) {
        return;
    }

    switch (obj.command) {
        case 'send':
            this.sendMessage(obj.message);
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, { sent: true }, obj.callback);
            }
            break;

        default:
            this.log.warn(`Unbekannter Befehl: ${obj.command}`);
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, { error: 'unknown command' }, obj.callback);
            }
            break;
    }
}
```

Zwei Dinge daran sind wichtig.

**Immer antworten, wenn `obj.callback` gesetzt ist.** Auch im Fehlerfall. Sonst
hängt der Absender in seiner Frist fest, und wenn er keine gesetzt hat, dann
für immer.

**`obj.from` und `obj.callback` unverändert zurückgeben.** Über diese beiden
Angaben findet die Antwort ihren Weg. Wer sie selbst zusammenbaut, verschickt
ins Leere.

## Was sich damit machen lässt

**Aufträge an andere Adapter.** Der klassische Fall: Benachrichtigungsadapter
wie `telegram`, `pushover` oder `email` nehmen ihre Aufträge ausschließlich so
entgegen.

**Werte aus einer Datenbank holen.** `getHistory` an `history`, `sql` oder
`influxdb`. Voraussetzung ist `common.getHistory: true` beim empfangenden
Adapter. Siehe [Datenaufzeichnung](/docs/config/history.md).

**Die eigene Konfigurationsoberfläche befragen.** Die Konfigurationsseite im
Admin kann `sendTo` an die eigene Instanz schicken, um zum Beispiel eine Liste
der gefundenen Geräte zu holen oder eine Eingabe prüfen zu lassen. Das ist der
saubere Weg, wenn die Prüfung Wissen braucht, das nur der Adaptercode hat.

!> Die Instanz muss dafür **laufen**. Eine gestoppte Instanz hat kein
Nachrichtenfach, das jemand bedient. Die Konfigurationsoberfläche sollte das
abfangen und eine verständliche Meldung zeigen, statt in eine Frist zu laufen.

## An den Host statt an eine Instanz

`sendToHost` geht nicht an eine Instanz, sondern an den js-controller eines
Hosts. Damit lassen sich Systemauskünfte holen und Verwaltungsbefehle absetzen,
etwa das Auflisten der Instanzen oder das Auslesen der Protokolldateien. Das ist
der Weg, den der Admin selbst benutzt.

## Rechte

Nachrichten sind eine eigene Berechtigung. In der Benutzerverwaltung steht
`sendTo` unter den sonstigen Rechten, getrennt von Lese- und Schreibrechten auf
Objekte. Ein Benutzer ohne dieses Recht kann keine Aufträge absetzen, auch wenn
er sonst alles lesen darf. Siehe
[Benutzer und Rechte](/docs/config/userrights.md).
