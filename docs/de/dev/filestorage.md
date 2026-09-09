---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/filestorage.md
title: Dateien speichern
lastChanged: "09.09.2026"
---

# Dateien speichern

Ein Adapter, der Dateien ablegen muss, schreibt sie nicht ins Dateisystem,
sondern in den Datenspeicher von ioBroker. Damit liegen sie unabhängig vom
Betriebssystem an einer bekannten Stelle, sind über die Oberfläche unter
**Dateien** sichtbar und können in die Datensicherung einfließen.

## Der Ablageort ist ein Objekt

Dateien hängen immer an einem Objekt vom Typ `meta`. Dieses Objekt ist der
Einhängepunkt; die Datei bekommt einen Pfad relativ dazu. Ohne ein solches
Objekt schlägt das Schreiben fehl.

Das Feld, auf das es ankommt, ist `common.type`:

| `common.type` | Bedeutung |
|---|---|
| `meta.user` | Die Dateien **kommen in die Datensicherung**. Für alles, was nicht neu erzeugt werden kann: Schlüssel, Zertifikate, hochgeladene Inhalte, benutzereigene Dateien. |
| `meta.folder` | Die Dateien **kommen nicht in die Datensicherung**. Für Zwischenstände, Zwischenspeicher und alles, was der Adapter jederzeit neu erzeugen kann. |

!> Das Feld heißt `common.type`, nicht `common.role`. Die Datensicherung prüft
genau darauf. Steht dort etwas anderes, fehlen die Dateien nach dem
Wiederherstellen.

## Den Ablageort anlegen

Am einfachsten geht das über `instanceObjects` in der
[io-package.json](/docs/dev/iopackage.md), dann entsteht er mit jeder Instanz
von selbst:

```json
"instanceObjects": [
    {
        "_id": "keys",
        "type": "meta",
        "common": {
            "name": "Schlüssel",
            "type": "meta.user"
        },
        "native": {}
    },
    {
        "_id": "temp",
        "type": "meta",
        "common": {
            "name": "Zwischenspeicher",
            "type": "meta.folder"
        },
        "native": {}
    }
]
```

Zur Laufzeit geht es genauso:

```js
await this.setObjectNotExists('keys', {
    type: 'meta',
    common: { name: 'Schlüssel', type: 'meta.user' },
    native: {}
});
```

## Schreiben und lesen

Der erste Parameter ist immer der Einhängepunkt, der zweite der Pfad darunter:

```js
// schreiben
await this.writeFileAsync(`${this.namespace}.keys`, 'private-key.pem', privateKey);
await this.writeFileAsync(`${this.namespace}.temp`, 'cache.json', JSON.stringify(daten));

// lesen
const { file } = await this.readFileAsync(`${this.namespace}.keys`, 'private-key.pem');

// auflisten und löschen
const eintraege = await this.readDirAsync(`${this.namespace}.temp`, '');
await this.delFileAsync(`${this.namespace}.temp`, 'cache.json');
```

Unterverzeichnisse entstehen einfach durch den Pfad:
`'zertifikate/2026/host.pem'`. `mkdirAsync` gibt es zusätzlich, ist aber selten
nötig. Als Inhalt sind Zeichenketten und `Buffer` erlaubt, Bilder und
Archive also ebenso wie Text.

## Der gemeinsame Ordner

Neben den eigenen Einhängepunkten gibt es `meta.user`, den allgemeinen Ordner
für Dateien der Benutzer. Er wird bei der Einrichtung angelegt und ist in der
Oberfläche unter **Dateien** der vorgeschlagene Platz für Uploads. Ein Adapter
schreibt dort nur hinein, wenn die Datei ausdrücklich dem Benutzer gehört und
nicht ihm selbst.

## Der Sonderfall dataFolder

Braucht ein Adapter echte Dateien im Dateisystem, etwa weil ein fremdes
Programm darauf zugreift, kann er in `common.dataFolder` einen Ordner
angeben. Die Datensicherung nimmt diesen Ordner mit auf. Der Weg über
`meta`-Objekte ist trotzdem der bessere, weil er auch bei Multihost und in
Containern funktioniert.

## Faustregeln

* Alles, was nach einem Wiederherstellen wieder da sein muss, gehört unter
  `meta.user`.
* Alles, was der Adapter beim nächsten Start neu bauen kann, gehört unter
  `meta.folder`. Das hält die Datensicherung klein.
* Beides trennen, statt alles in einen Topf zu werfen.

?> Wie leicht die beiden Felder durcheinandergeraten, zeigt der Adapter
[sayit](https://github.com/ioBroker/ioBroker.sayit): Sein Wurzelobjekt trägt
richtig `"type": "meta.user"`, das Objekt `tts.userfiles` daneben aber
`"role": "meta.user"`. Die Klangdateien darin landen deshalb nicht in der
Datensicherung. Wer ein fremdes `io-package.json` als Vorlage nimmt, sollte
diese Stelle prüfen.
