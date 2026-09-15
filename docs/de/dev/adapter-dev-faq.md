---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapter-dev-faq.md
title: Häufige Fragen zur Adapterentwicklung
lastChanged: "09.09.2026"
---

# Häufige Fragen zur Adapterentwicklung

Kurze Antworten auf Fragen, die im Forum und im Discord-Kanal `#adapter`
immer wieder auftauchen. Die ausführliche Beschreibung steht jeweils auf der
verlinkten Seite.

## Veröffentlichen

### In welchen Dateien steht die Versionsnummer?

In `package.json` und `io-package.json`, dazu der Änderungshinweis in
`io-package.json` (`common.news`) und in der `README.md`. Von Hand muss das
niemand pflegen: `npm run release patch` erledigt alle Stellen auf einmal, setzt
das Etikett und schiebt es zu GitHub. Siehe
[Veröffentlichen](/docs/dev/adapterpublish.md).

Die Nummern folgen der [semantischen Versionierung](https://semver.org/lang/de/):
`patch` für Fehlerbehebungen, `minor` für neue Funktionen, `major` für
Änderungen, die vorhandene Installationen betreffen.

### Ich habe veröffentlicht. Wann sehen die Benutzer die neue Version?

Nicht sofort. Der Admin liest das Repository nicht bei jedem Aufruf neu,
sondern in Abständen. Wer nicht warten will, drückt im Admin unter **Adapter**
auf das Symbol zum Aktualisieren oder ruft auf der Konsole `iobroker update`
auf.

Dazu kommt: Eine neue Version erscheint zuerst im Repository `latest`. Ins
`stable` wandert sie erst nach einer Bewährungszeit ohne Fehlermeldungen.

### Wie kommt ein neuer Adapter überhaupt ins Repository?

Über einen Pull Request bei
[ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories).
Voraussetzungen und Ablauf stehen unter
[Veröffentlichen](/docs/dev/adapterpublish.md).

## Entwickeln und Testen

### Wie probiere ich den Adapter aus, ohne eine Installation zu zerlegen?

Mit dem [dev-server](/docs/dev/devserver.md). Er legt im Projektordner eine
eigene kleine Installation an, startet den Adapter daraus und lädt bei jeder
Änderung neu.

### Wie finde ich einen Fehler zur Laufzeit?

`dev-server debug` beim Entwickeln, `iobroker debug <adapter>.0` auf einem
laufenden System. Beides beschreibt [Debugging](/docs/dev/adapterdebug.md).

### Wie teste ich den Kompaktmodus?

Im Kompaktmodus läuft der Adapter nicht als eigener Prozess, sondern im
Prozess des js-controller. Dafür muss die Datei zwei Startwege kennen:

```js
if (require.main !== module) {
    module.exports = options => new MeinAdapter(options);
} else {
    new MeinAdapter();
}
```

Eingeschaltet wird er in der Instanzkonfiguration unter **Kompaktmodus**.
Wichtig ist, dass der Adapter im `unload`-Handler wirklich alles aufräumt:
Timer, Verbindungen, Beobachter. Sonst bleibt etwas im gemeinsamen Prozess
zurück.

### Wie bekomme ich Absturzmeldungen?

Über das Plugin
[@iobroker/plugin-sentry](https://github.com/ioBroker/plugin-sentry). Was dabei
übertragen wird und wie Benutzer das abschalten, steht unter
[Absturzmeldungen](/docs/ecosystem/sentry.md).

## Konfiguration

### Wie prüfe ich die Eingaben des Benutzers im Adaptercode?

Über die [Messagebox](/docs/dev/messagebox.md). Die Konfigurationsseite
schickt die Werte mit `sendTo` an die Instanz, der Adapter prüft sie und
schickt das Ergebnis zurück. In der
[JSON-Config](/docs/dev/adapterjsonconfig.md) gibt es dafür fertige Elemente,
die genau das tun.

Damit die Instanz Nachrichten annimmt, muss `"messagebox": true` im Block
`common` der `io-package.json` stehen.

### Muss ich noch eine `index_m.html` bauen?

Nein. Konfigurationsseiten werden heute als
[JSON-Config](/docs/dev/adapterjsonconfig.md) beschrieben. Die alten
HTML-Seiten funktionieren weiter, für einen neuen Adapter sind sie aber nicht
mehr vorgesehen.

## Dateien und Daten

### Ich schreibe eine Datei und bekomme eine Warnung im Protokoll

Die Meldung lautet sinngemäß:

```
writeFile will not write this file (picture.jpg) in future versions:
<adapter> is not an object of type "meta"
```

Dateien brauchen ein Objekt vom Typ `meta` als Ablageort. Am einfachsten legt
man es über `instanceObjects` an:

```json
"instanceObjects": [
    {
        "_id": "",
        "type": "meta",
        "common": {
            "name": "Dateien von <Adapter>",
            "type": "meta.user"
        },
        "native": {}
    }
]
```

Herunterladen und ablegen sieht dann so aus:

```js
const antwort = await axios.get(url, { responseType: 'arraybuffer' });
await this.writeFileAsync(this.namespace, 'picture.jpg', antwort.data);
```

Warum `common.type` und nicht `common.role`, und was das mit der
Datensicherung zu tun hat, steht unter
[Dateien speichern](/docs/dev/filestorage.md).

### Warum wird mein Zustand nicht angelegt?

Weil das zugehörige Objekt fehlt. `setState` ohne vorhandenes Objekt gibt eine
Warnung aus. Objekte werden beim Start mit `setObjectNotExists` angelegt,
siehe [Adapterreferenz](/docs/dev/adapterref.md).

## Etwas fehlt hier

Diese Sammlung lebt von Ergänzungen. Wer eine Frage beantwortet bekommen hat,
die hier fehlt, kann sie über den Bearbeiten-Link oben rechts hinzufügen. Ein
Verweis auf einen Adapter, in dem die Lösung zu sehen ist, hilft anderen mehr
als eine lange Erklärung.
