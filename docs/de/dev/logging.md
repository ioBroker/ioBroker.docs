---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/logging.md
title: kein Titel
hash: FAhDtnxOJ7Fyo4YK2D/r3ZcDQdByr87vZusjjQx1iH0=
---
## Protokolltransporter
Wenn Sie bestimmte oder alle Protokolle von ioBroker-Adaptern abonnieren möchten, können Sie **logTransporter** verwenden.
Zur Aktivierung in Ihrem Adapter fügen Sie `"logTransporter": true` zur gemeinsamen Struktur Ihres `io-package.json` hinzu.




In Ihrem Adaptercode (wie in der `main.js`-Datei) müssen Sie dann zur Aktivierung `requireLog(true)` aufrufen.
Sobald requireLog() auf true gesetzt ist, können Sie `on('log', callback)` verwenden, um alle neuen Protokolle zu abonnieren, die von Adaptern hereinkommen.
Die Callback-Funktion gibt alle Protokolle mit folgendem Objekt zurück (Beispiel):

```
{from:'testlog.0', message: 'testlog.0 (12504) adapter disabled', severity: 'error', ts:1585413238439}
```

Vollständiges Beispiel aus einem `main.js`:

```
    adapter.requireLog(true);
    adapter.on('log', function(logObject) {
        // Here we have the log in "logObject" and can handle it accordingly.
        const severity = logObject.severity; // the log level (severity): info, warn, error, etc.
        // ....
});
```

## Hintergrundinformation
Es gibt eine spezielle Art von Adaptern, die Protokolle verwenden. Normalerweise schreiben alle Adapter ihre Meldungen in die Logdatei mit Logger.
Aber einige Adapter müssen etwas anderes anzeigen, um Protokolle anzuzeigen oder sie zu speichern.

Um einen solchen Adaptertyp zu erstellen, muss er das Flag **logTransporter** in einer gemeinsamen Struktur haben.

Wenn ein solches Flag vorhanden ist, erstellt die adapter.js automatisch den speziellen Status dafür - "system.adapter.adapterName.X.logging".
Diese Variable muss vom logTransport-Adapter auf „true“ gesetzt werden, wenn dieser Adapter Protokolle empfangen möchte.

"system.adapter.adapterName.X.logging" ist eine FIFO-Warteschlange der Redis-Typenliste.

Andere Adapter überwachen alle Variablen "*.logging" und schreiben die Logmeldungen in entsprechende Listen.
Die Liste ist standardmäßig auf 1000 Nachrichten begrenzt.

Die logTransport-Instanz erhält das Ereignis „log“ mit Meldung.

Um den Zustand „system.adapter.adapterName.X.logging“ zu steuern, muss der Adapter die Funktion *requireLog* verwenden.
Z.B. ```adapter.requireLog(true);```, um den Empfang von Protokollen zu ermöglichen.

![Illustration](../../en/dev/media/logging.png)

Die Funktionalität ist in *adapter.js* implementiert und der Entwickler sollte einfach das gemeinsame Flag *logTransporter* setzen und *requireLog()* aufrufen.

Die Funktionalität für Nicht-LogTransport-Adapter ist in *adapter.js* implementiert und der Entwickler muss sich nicht darum kümmern.