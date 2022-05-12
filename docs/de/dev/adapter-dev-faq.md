---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapter-dev-faq.md
title: Häufig gestellte Fragen zur Adapterentwicklung
hash: eYLJSbvcCz8wYyj3Pa+wrDSZhMY78b6yn9YUWmOxv0E=
---
# Häufig gestellte Fragen zur Adapterentwicklung
## Einführung
Die Idee dieser Seite ist es, häufig gestellte Fragen zur Entwicklung von ioBroker-Adaptern zu sammeln.
Geboren wurde diese Idee von Ralf im ioBroker #adapter Discord Channel am 24.11.2020 bei einer Diskussion mit einer Frage von Mic.

## Bitte tragen Sie bei (es ist wirklich einfach!)
Fühlen Sie sich frei, Fragen und entsprechende Antworten zu dieser Seite hinzuzufügen. Die einzige Einschränkung ist: Stellen Sie sicher, dass Sie der Antwort ein Datum hinzufügen. Perfektionismus ist nicht nötig, poste einfach, was dir bei der Adapterentwicklung geholfen hat. Links zu Adaptern, in denen die Frage implementiert ist, sind ebenfalls sehr willkommen. Wir Entwickler freuen uns über Umsetzungsbeispiele :-)

*Hinweis:* Dies wird keine offizielle Dokumentation sein. Alle Hinweise, Problemumgehungen, Links zu noch älteren Forenbeiträgen usw. sind willkommen. Die Absicht ist, Entwickler schnell zu unterstützen und ihnen bei häufig gestellten Entwicklerfragen zu helfen. Wenn Sie hier Probleme beim Schreiben auf Englisch haben, verwenden Sie bitte Ihre Landessprache wie Deutsch, Russisch usw. Wir helfen Ihnen gerne und übersetzen später.

Zur Aktualisierung des Inhaltsverzeichnisses können Sie einen TOC-Generator verwenden, z. [luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc/)

# Inhaltsverzeichnis
- [Adapter-Updates](#adapter-updates)
  - [Veröffentlichen von Adapteraktualisierungen](#publishing-adapter-updates)
- [Adaptertest und Fehlerberichterstattung](#adapter-testing-and-error-reporting)
  - [Kompaktmodus](#compact-mode)
  - [Wache](#Wache)
- [Benutzeroberfläche der Adapterkonfiguration (admin/index_m.html)](#adapter-configuration-ui-adminindexmhtml)
  - [Eingabevalidierung](#input-validation)
- [Adapterfunktionen](#adapter-funktionen)
  - [Dateien schreiben](#writing-files)

---

### Adapter-Updates
#### Adapteraktualisierungen veröffentlichen
**Frage:** In welchen Dateien muss ich die Versionsnummer ändern?

**Antwort:** Grundsätzlich müssen Sie 3 Dateien berühren:

 * `io-package.json`: Versionsnummer ändern und das letzte Änderungsprotokoll hinzufügen
 * `package.json`: nur Versionsnummer ändern
 * `README.md`: Neue Versionsnummer und Änderungsprotokoll hinzufügen

Bitte beachten Sie, dass die Verwendung von [Semantische Versionierung] (https://semver.org/), siehe [Versionierung](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning) erforderlich ist.<br> (25.11.2020)

**Frage:** Mein Adapter befindet sich im neuesten Repository. Ich habe den Adapter auf Github aktualisiert und auch auf NPM veröffentlicht. Wann sehen die Benutzer die neue Version im Admin?

**Antwort:** ioBroker scannt zweimal täglich nach Versionsänderungen.<br> (25. Nov. 2020)

**Frage:** Wie kann ich einen neuen Adapter zum neuesten Repository hinzufügen?

**Antwort:** Siehe [Fügen Sie dem neuesten Repository einen neuen Adapter hinzu](https://github.com/ioBroker/ioBroker.repositories#add-a-new-adapter-to-the-latest-repository)<br> (25.11.2020)

### Adaptertests und Fehlerberichte
#### Kompaktmodus
**Frage:** Wie kann ich den Kompaktmodus testen?

**Antwort:** Siehe [Kompaktmodus testen](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen)<br> (25. Nov. 2020)

#### Wachposten
**Frage:** Wie kann ich Sentry zu meinem Adapter hinzufügen?

**Antwort:** Siehe [Sentry Read.me](https://github.com/ioBroker/plugin-sentry#readme)<br> (25. Nov. 2020)

### Benutzeroberfläche für die Adapterkonfiguration (admin/index_m.html)
#### Eingabevalidierung
**Frage:** Ich möchte Felder der Adapterkonfiguration validieren, indem ich Kernadaptermethoden sowie Klassen/Methoden des node.js-Adaptercodes verwende. Die Validierung sollte stattfinden, sobald ein Benutzer in der Adapterkonfiguration auf „Speichern“ klickt, was dann `save()` von `admin/index_m.html` aufruft.

**Antwort:** Sie können die Methode `sendTo()` verwenden, um die Variable `obj` von `admin/index_m.html` an den Adaptercode zu senden, den Inhalt dort zu validieren und das Ergebnis dann per Rückruf an bereitzustellen `sendTo()` von `admin/index_m.html`.<br> Beispiel: Dies ist im Adapter [Fahrplan](https://github.com/gaudes/ioBroker.fahrplan) implementiert.<br> HINWEIS: Möglicherweise müssen Sie Ihre `io-package.json` ändern, siehe z. B. [ioBroker-Forum: sendTo() funktioniert nicht](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> (24.11.2020)

### Adapterfunktionen
#### Dateien schreiben
**Frage:** Adapter sollte eine Datei mit Axios herunterladen und in der Lage sein, sie in iobroker-data/files/<adapter> zu schreiben

**Antwort:** Hier ist ein kleines Code-Snippet für diese Aktion:

```
const WebCall = await axios.get(url,{responseType: "arraybuffer"});
await Helper.Adapter.writeFileAsync(Helper.Adapter.namespace, `picture.jpg`, WebCall.data)
```

Danach kam eine Warnung im ioBroker Log:<br> `writeFile will not write this file (picture.jpg) in future versions: <adapter> is not an object of type "meta"`<br> In io-package.json muss ein meta.user-Objekt in instanceObjects eingebunden werden:<br>

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

(09.12.2020)