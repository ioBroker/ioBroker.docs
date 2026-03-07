---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapter-dev-faq.md
title: Häufig gestellte Fragen zur Adapterentwicklung
hash: iRcUFx048IVzNc/ocxHTGchnsvUMOm4VnrymhlS21P0=
---
# Häufig gestellte Fragen zur Adapterentwicklung
## Einführung
Diese Seite dient dazu, häufig gestellte Fragen zur Entwicklung von ioBroker-Adaptern zu sammeln.
Die Idee dazu entstand am 24. November 2020 im ioBroker-Discord-Kanal #adapter, als Ralf eine Frage von Mic diskutierte.

## Bitte unterstützen Sie uns (es ist ganz einfach!)
Sie können gerne Fragen und Antworten auf dieser Seite hinzufügen. Die einzige Einschränkung: Bitte geben Sie in Ihrer Antwort das Datum an. Perfektion ist nicht nötig; beschreiben Sie einfach, was Ihnen bei der Adapterentwicklung geholfen hat. Links zu Adaptern, in denen die Frage umgesetzt wurde, sind ebenfalls sehr willkommen. Wir Entwickler freuen uns immer über Implementierungsbeispiele :-)

*Hinweis:* Dies ist keine offizielle Dokumentation. Hinweise, Workarounds, Links zu älteren Forenbeiträgen usw. sind willkommen. Ziel ist es, Entwicklern schnell und unkompliziert bei häufig gestellten Fragen zu helfen. Sollten Sie Schwierigkeiten haben, hier auf Englisch zu schreiben, verwenden Sie bitte Ihre Muttersprache (z. B. Deutsch, Russisch usw.). Wir helfen Ihnen gerne und übersetzen später.

Zum Aktualisieren des Inhaltsverzeichnisses können Sie einen Inhaltsverzeichnisgenerator verwenden, z. B. [luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc/)

# Inhaltsverzeichnis
- [Adapteraktualisierungen](#adapter-updates)
- [Aktualisierungen des Veröffentlichungsadapters](#publishing-adapter-updates)
- [Adaptertests und Fehlerberichterstattung](#adapter-testing-and-error-reporting)
- [Kompaktmodus](#compact-mode)
- [Sentry](#sentry)
- [Adapterkonfigurations-UI (admin/index_m.html)](#adapter-configuration-ui-adminindexmhtml)
- [Eingabevalidierung](#input-validation)
- [Adapterfunktionen](#adapter-functions)
- [Dateien schreiben](#writing-files)

---

### Adapter-Updates
#### Aktualisierungen des Veröffentlichungsadapters
**Frage:** In welchen Dateien muss ich die Versionsnummer ändern?

**Antwort:** Im Prinzip müssen Sie 3 Dateien bearbeiten:

* `io-package.json`: Versionsnummer ändern und Änderungsprotokoll hinzufügen
* `package.json`: Nur die Versionsnummer ändern
* `README.md`: Neue Versionsnummer und Änderungsprotokoll hinzufügen

Bitte beachten Sie, dass die Verwendung von [Semantische Versionierung](https://semver.org/), siehe [Versionierung](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning) erforderlich ist.<br> (25. November 2020)

**Frage:** Mein Adapter befindet sich im neuesten Repository. Ich habe ihn auf GitHub aktualisiert und auch auf NPM veröffentlicht. Wann wird den Benutzern die neue Version im Adminbereich angezeigt?

**Antwort:** ioBroker scannt zweimal täglich nach Versionsänderungen.<br> (25. November 2020)

**Frage:** Wie kann ich einen neuen Adapter zum neuesten Repository hinzufügen?

**Antwort:** Siehe [Füge dem neuesten Repository einen neuen Adapter hinzu.](https://github.com/ioBroker/ioBroker.repositories#add-a-new-adapter-to-the-latest-repository)<br> (25. November 2020)

### Adaptertests und Fehlerberichterstattung
#### Kompaktmodus
**Frage:** Wie kann ich den Kompaktmodus testen?

**Antwort:** Siehe [Kompaktmodus testen](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen) (auf Deutsch)<br> (25. November 2020)

#### Wächter
**Frage:** Wie kann ich Sentry zu meinem Adapter hinzufügen?

**Antwort:** Siehe [Sentry Read.me](https://github.com/ioBroker/plugin-sentry#readme)<br> (25. November 2020)

### Adapterkonfigurations-UI (admin/index_m.html)
#### Eingabevalidierung
**Frage:** Ich möchte Felder der Adapterkonfiguration mithilfe von Kernmethoden des Adapters sowie Klassen/Methoden des Node.js-Adaptercodes validieren. Die Validierung soll erfolgen, sobald ein Benutzer in der Adapterkonfiguration auf „Speichern“ klickt. Dadurch werden die Methoden `save()` oder `admin/index_m.html` aufgerufen.

**Antwort:** Sie können die Methode `sendTo()` verwenden, um die Variable `obj` von `admin/index_m.html` an den Adaptercode zu senden, den Inhalt dort zu validieren und dann das Ergebnis über einen Callback an `sendTo()` oder `admin/index_m.html` zurückzugeben.<br> Beispiel: Dies ist im Adapter [Fahrplan](https://github.com/gaudes/ioBroker.fahrplan) implementiert.<br> HINWEIS: Möglicherweise müssen Sie Ihre `io-package.json` ändern, siehe z. B. [ioBroker-Forum: sendTo() funktioniert nicht](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> (24. November 2020)

### Adapterfunktionen
#### Schreibdateien
**Frage:** Der Adapter sollte eine Datei mit Axios herunterladen und diese in iobroker-data/files/<adapter> schreiben können.

**Antwort:** Hier ist ein kleiner Codeausschnitt für diese Aktion:

```
const WebCall = await axios.get(url,{responseType: "arraybuffer"});
await Helper.Adapter.writeFileAsync(Helper.Adapter.namespace, `picture.jpg`, WebCall.data)
```

Anschließend erschien eine Warnung im ioBroker-Protokoll:<br> `writeFile will not write this file (picture.jpg) in future versions: <adapter> is not an object of type "meta"`<br> In der Datei io-package.json muss ein meta.user-Objekt in instanceObjects enthalten sein:<br>

```
"instanceObjects": [
  {
    "_id": "",
    "type": "meta",
    "common": {
      "name": "User files for <Adapter>",
      "type": "meta.user"
    },
    "native": {}
  }
]
```

Detaillierte Informationen zur Dateispeicherung, zu Metaobjekten und zum Backup-Verhalten finden Sie in [Dokumentation zur Dateispeicherung](filestorage.md).<br> (09.12.2020)