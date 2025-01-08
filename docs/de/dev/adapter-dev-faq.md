---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapter-dev-faq.md
title: Häufig gestellte Fragen zur Adapterentwicklung
hash: xBifYSMkiSeEcOHVKuK3c1SR01Qr030mxrhtOv9htBA=
---
# Häufig gestellte Fragen zur Adapterentwicklung
## Einführung
Die Idee dieser Seite ist es, häufig gestellte Fragen zur Entwicklung von ioBroker-Adaptern zu sammeln.

Diese Idee wurde von Ralf am 24. November 2020 im ioBroker #adapter Discord-Kanal während einer Diskussion mit einer Frage von Mic geboren.

## Bitte leisten Sie einen Beitrag (es ist ganz einfach!)
Sie können gerne Fragen und die dazugehörigen Antworten auf dieser Seite hinzufügen. Die einzige Einschränkung ist: Achten Sie darauf, der Antwort ein Datum hinzuzufügen. Perfektionismus ist nicht erforderlich. Schreiben Sie einfach, was Ihnen bei der Adapterentwicklung geholfen hat. Links zu Adaptern, in denen die Frage implementiert ist, sind ebenfalls sehr willkommen. Wir Entwickler lieben Implementierungsbeispiele :-)

*Hinweis:* Dies wird keine offizielle Dokumentation. Hinweise, Workarounds, Links zu noch älteren Forenbeiträgen usw. sind willkommen. Ziel ist es, Entwicklern bei häufig gestellten Entwicklerfragen schnell zu helfen und sie zu unterstützen. Wenn Sie Probleme haben, hier auf Englisch zu schreiben, verwenden Sie bitte Ihre Landessprache wie Deutsch, Russisch usw. Wir helfen Ihnen gerne und übersetzen später.

Zur Aktualisierung des Inhaltsverzeichnisses können Sie einen Inhaltsverzeichnisgenerator verwenden, z.B. [luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc/)

# Inhaltsverzeichnis
- [Adapter-Updates](#adapter-updates)
- [Updates des Veröffentlichungsadapters](#publishing-adapter-updates)
- [Adaptertests und Fehlerberichte](#adapter-testing-and-error-reporting)
- [Kompaktmodus](#compact-mode)
- [Wachposten](#Wachposten)
- [Adapterkonfigurations-Benutzeroberfläche (admin/index_m.html)](#adapter-configuration-ui-adminindexmhtml)
- [Eingabevalidierung](#input-validation)
- [Adapterfunktionen](#adapter-functions)
- [Dateien schreiben](#writing-files)

---

### Adapter-Updates
#### Adapter-Updates veröffentlichen
**Frage:** In welchen Dateien muss ich die Versionsnummer ändern?

**Antwort:** Grundsätzlich müssen Sie 3 Dateien berühren:

* `io-package.json`: Versionsnummer ändern und das aktuelle Änderungsprotokoll hinzufügen
* `package.json`: nur Versionsnummer ändern
* `README.md`: neue Versionsnummer und das Änderungsprotokoll hinzufügen

Bitte beachten Sie, dass die Verwendung von [Semantische Versionierung](https://semver.org/), siehe [Versionierung](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning) erforderlich ist.<br> (25. November 2020)

**Frage:** Mein Adapter befindet sich im neuesten Repository. Ich habe den Adapter auf Github aktualisiert und auch auf NPM veröffentlicht. Wann sehen die Benutzer die neue Version im Admin?

**Antwort:** ioBroker sucht zweimal täglich nach Versionsänderungen.<br> (25. November 2020)

**Frage:** Wie kann ich dem neuesten Repository einen neuen Adapter hinzufügen?

**Antwort:** Siehe [Einen neuen Adapter zum neuesten Repository hinzufügen](https://github.com/ioBroker/ioBroker.repositories#add-a-new-adapter-to-the-latest-repository)<br> (25. November 2020)

### Adaptertests und Fehlerberichte
#### Kompaktmodus
**Frage:** Wie kann ich den Kompaktmodus testen?

**Antwort:** Siehe [Kompaktmodus testen](https://forum.iobroker.net/topic/32789/anleitung-f%C3%BCr-adapter-entwickler-compact-mode-testen)<br> (25. November 2020)

#### Wachposten
**Frage:** Wie kann ich Sentry zu meinem Adapter hinzufügen?

**Antwort:** Siehe [Sentry Read.me](https://github.com/ioBroker/plugin-sentry#readme)<br> (25. November 2020)

### Adapterkonfigurations-Benutzeroberfläche (admin/index_m.html)
#### Eingabevalidierung
**Frage:** Ich möchte Felder der Adapterkonfiguration validieren, indem ich Kernadaptermethoden sowie Klassen/Methoden des Adaptercodes von node.js verwende. Die Validierung soll erfolgen, sobald ein Benutzer in der Adapterkonfiguration auf „Speichern“ klickt, woraufhin `save()` von `admin/index_m.html` aufgerufen wird.

**Antwort:** Mit der Methode `sendTo()` können Sie die Variable `obj` von `admin/index_m.html` an den Adaptercode senden, dort den Inhalt validieren und das Ergebnis anschließend per Callback an `sendTo()` von `admin/index_m.html` zurückgeben.<br> Beispiel: Dies ist im Adapter [Fahrplan](https://github.com/gaudes/ioBroker.fahrplan) implementiert.<br> HINWEIS: Möglicherweise müssen Sie Ihre `io-package.json` ändern, siehe beispielsweise [ioBroker-Forum: sendTo() funktioniert nicht](https://forum.iobroker.net/topic/5205/gel%C3%B6st-sendto-in-eigenem-adapter-funktioniert-nicht/)<br> (24. November 2020)

### Adapterfunktionen
#### Schreiben von Dateien
**Frage:** Der Adapter sollte eine Datei mit Axios herunterladen und in der Lage sein, sie in iobroker-data/files/<adapter> zu schreiben.

**Antwort:** Hier ist ein kleiner Codeausschnitt für diese Aktion:

```
const WebCall = await axios.get(url,{responseType: "arraybuffer"});
await Helper.Adapter.writeFileAsync(Helper.Adapter.namespace, `picture.jpg`, WebCall.data)
```

Anschließend gab es eine Warnung im ioBroker-Protokoll:<br> `writeFile will not write this file (picture.jpg) in future versions: <adapter> is not an object of type "meta"`<br> In io-package.json muss ein meta.user-Objekt in instanceObjects eingebunden werden:<br>

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

(09. Dezember 2020)