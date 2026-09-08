---
title:       "io-package.json"
lastChanged: "08.09.2026"
---

# Die Datei io-package.json

Neben der gewöhnlichen `package.json` liegt in jedem Adapter eine zweite Datei:
die `io-package.json`. Sie enthält alles, was **ioBroker** über den Adapter
wissen muss und npm nicht interessiert. Aus ihr entstehen der Eintrag in der
Adapterliste, die Instanzobjekte, die Symbole auf der Kachel und das Verhalten
beim Starten.

Der Adapter Creator legt sie vollständig an. Wer sie später von Hand ändert,
sollte wissen, was die Felder bewirken.

Die Datei hat wenige Blöcke auf oberster Ebene:

| Block | Inhalt |
| ----- | ------ |
| `common` | Der Hauptteil: Name, Betriebsart, Oberfläche, Abhängigkeiten. |
| `native` | Die Voreinstellungen der Konfiguration. Zur Laufzeit als `this.config.<feld>` lesbar. |
| `encryptedNative` | Felder aus `native`, die verschlüsselt gespeichert werden. |
| `protectedNative` | Felder aus `native`, die nur der eigene Adapter lesen darf. |
| `objects` | Objekte, die einmal je System angelegt werden. |
| `instanceObjects` | Objekte, die bei **jeder** neuen Instanz angelegt werden. |
| `notifications` | Eigene Benachrichtigungskategorien. Siehe [Benachrichtigungen](/docs/dev/notifications.md). |

## Die Felder, auf die es ankommt

### Kennung

`common.name` ist der Adaptername ohne das Vorwort `ioBroker.`, kleingeschrieben.
Er ist überall die Kennung: im Objektbaum, im npm-Paket, im Repository. Er lässt
sich später nicht mehr ändern.

`common.titleLang` ist der Anzeigename, mehrsprachig. `common.desc` die
Kurzbeschreibung, ebenfalls mehrsprachig.

`common.version` muss zur Version in der `package.json` passen. Das prüft der
Adapter Checker.

### Betriebsart

`common.mode` bestimmt, wie ioBroker die Instanz startet:

| Modus | Verhalten |
| ----- | --------- |
| `daemon` | Läuft dauerhaft. Wird neu gestartet, wenn der Prozess endet. Der Normalfall. |
| `schedule` | Läuft nach Zeitplan, der Zeitplan steht im Instanzobjekt und lässt sich im Admin ändern. |
| `once` | Läuft einmal nach jeder Änderung am Instanzobjekt und wird danach nicht neu gestartet. |
| `subscribe` | Startet, wenn `.alive` auf true gesetzt wird, und endet, wenn es auf false geht. |
| `extension` | Wird nicht von ioBroker gestartet, sondern von einer Webinstanz geladen. So arbeiten `simple-api` und ähnliche Erweiterungen. |
| `none` | Startet gar keinen Prozess. |

Bei `schedule` gehört die Voreinstellung nach `common.schedule` als
CRON-Ausdruck.

`common.compact` erlaubt, dass die Instanz im selben Prozess wie andere läuft.
Das spart auf kleinen Rechnern spürbar Arbeitsspeicher, verlangt aber, dass der
Adapter sich beim Beenden restlos aufräumt.

### Oberfläche

`common.adminUI.config` sagt, wie die Konfiguration aussieht:

* `json`: der Adapter bringt `admin/jsonConfig.json` mit. **Der heutige Weg.**
* `materialize`: die alte `admin/index_m.html`.
* `html`: die noch ältere `admin/index.html`.
* `none`: der Adapter hat keine Konfiguration.

`common.icon` ist das Symbol im Ordner `admin`, `common.extIcon` seine Adresse
auf GitHub, damit die Adapterliste es auch für nicht installierte Adapter
anzeigen kann.

### Was die Symbole auf der Kachel steuert

Die kleinen Zeichen unter dem Adapternamen im Admin kommen aus dieser Datei:

* `common.connectionType`: `local` oder `cloud`. Ob der Adapter direkt mit dem
  Gerät spricht oder über einen Dienst des Herstellers.
* `common.dataSource`: `push`, `poll` oder `assumption`. Ob Werte von selbst
  kommen, abgefragt werden oder nur vermutet sind.
* `common.plugins.sentry`: schaltet die Absturzmeldungen ein. Siehe
  [Absturzmeldungen](/docs/ecosystem/sentry.md).

Diese drei Angaben werden gern vergessen. Sie kosten drei Zeilen und ersparen
den Nutzern eine Frage im Forum.

### Abhängigkeiten

`common.dependencies` nennt, was auf **demselben** Host vorhanden sein muss, zum
Beispiel `[{"js-controller": ">=5.0.19"}]`. `common.globalDependencies` nennt,
was **irgendwo** im System laufen muss, typischerweise `[{"admin": ">=6.0.0"}]`.

`common.osDependencies.linux` listet Betriebssystempakete, die bei der
Installation mit installiert werden.

### Konfigurationswerte

Alles unter `native` ist die Voreinstellung der Konfiguration. Zur Laufzeit
steht es als `this.config.<feld>` bereit.

!> Jedes Passwort und jedes Zugangsmerkmal gehört in **beide** Listen:
`encryptedNative` **und** `protectedNative`. Das erste sorgt dafür, dass der
Wert verschlüsselt in der Datenbank liegt, das zweite dafür, dass kein anderer
Adapter ihn lesen kann. Wer nur das eine setzt, hat eine Lücke.

Beispiel aus BackItUp:

```json
"encryptedNative": ["cifsPassword", "ftpPassword", "webdavPassword"],
"protectedNative": ["cifsPassword", "ftpPassword", "webdavPassword"]
```

### Objekte, die von selbst entstehen

`instanceObjects` ist eine Liste von Objekten, die ioBroker bei jeder neuen
Instanz anlegt. Das ist der saubere Weg für alles, was ohnehin immer da sein
soll, etwa der Zweig `info` mit dem Verbindungszustand:

```json
"instanceObjects": [
  {
    "_id": "info",
    "type": "channel",
    "common": { "name": "Information" },
    "native": {}
  },
  {
    "_id": "info.connection",
    "type": "state",
    "common": {
      "role": "indicator.connected",
      "name": "Verbindung zum Gerät",
      "type": "boolean",
      "read": true,
      "write": false,
      "def": false
    },
    "native": {}
  }
]
```

?> `info.connection` ist mehr als Zierde: Der Admin färbt die Instanz danach
grün oder gelb, und andere Adapter können darauf reagieren. Ein Adapter, der
eine Verbindung aufbaut, sollte diesen Zustand führen.

### Nachrichten

`common.messagebox: true` legt für jede Instanz ein Nachrichtenfach an. Ohne
diesen Eintrag kommt kein `sendTo` an. Siehe
[Nachrichten zwischen Instanzen](/docs/dev/messagebox.md).

## Übersetzungen

Alle mehrsprachigen Felder werden nicht von Hand gepflegt. Im Projekt liegt
`@iobroker/adapter-dev`, und der Aufruf

```bash
npm run translate
```

übersetzt die neuen englischen Texte aus der `io-package.json` und aus den
i18n-Dateien in alle unterstützten Sprachen. Neue Texte werden also **nur auf
Englisch** eingetragen, den Rest erledigt der Befehl.

## Die vollständige Liste

Dieses Kapitel nennt die Felder, die man im Alltag braucht. Die vollständige
Aufstellung aller Attribute mit ihren Sonderfällen steht im
[Objekt-Schema](/docs/dev/objectsschema.md).
