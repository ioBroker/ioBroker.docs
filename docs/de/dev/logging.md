---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/logging.md
title: kein Titel
hash: FAhDtnxOJ7Fyo4YK2D/r3ZcDQdByr87vZusjjQx1iH0=
---
## Holztransporter
Wenn Sie bestimmte oder alle Protokolle von ioBroker-Adaptern abonnieren möchten, können Sie **logTransporter** verwenden. Um in Ihrem Adapter zu aktivieren, fügen Sie `"logTransporter": true` zur gemeinsamen Struktur Ihres `io-package.json` hinzu.<br><br> In Ihrem Adaptercode (wie in der `main.js` Datei) müssen Sie dann zur Aktivierung `requireLog(true)` aufrufen. Sobald requireLog() auf true gesetzt ist, können Sie `on('log', callback)` verwenden, um alle neuen Protokolle zu abonnieren, die von Adaptern eingehen. Die Callback-Funktion gibt alle Logs mit folgendem Objekt zurück (Beispiel):

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
Es gibt eine spezielle Art von Adaptern, die Protokolle verbrauchen. Normalerweise schreiben alle Adapter ihre Meldungen mit logger in die Logdatei.
Aber manche Adapter müssen Logs anzeigen oder anders speichern.

Um einen solchen Adaptertyp zu erstellen, muss er das Flag **logTransporter** in der gemeinsamen Struktur haben.

Wenn ein solches Flag vorhanden ist, erstellt die adapter.js automatisch den speziellen Zustand dafür - "system.adapter.adapterName.X.logging".
Diese Variable muss vom logTransport-Adapter auf true gesetzt werden, wenn dieser Adapter Protokolle empfangen möchte.

"system.adapter.adapterName.X.logging" ist eine Fifo-Warteschlange der Redis-Typliste.

Andere Adapter überwachen alle Variablen "*.logging" und schreiben die Log-Meldungen in entsprechende Listen.
Die Liste ist auf 1000 Nachrichten begrenzt (standardmäßig).

Die logTransport-Instanz erhält das Ereignis "log" mit Meldung.

Um den Zustand "system.adapter.adapterName.X.logging" zu steuern, muss der Adapter die Funktion *requireLog* verwenden.
Z.B. ```adapter.requireLog(true);``` um den Empfang von Logs zu ermöglichen.

![Illustration](../../en/dev/media/logging.png)

Die Funktionalität ist in *adapter.js* implementiert und der Entwickler sollte nur das gemeinsame Flag *logTransporter* setzen und *requireLog()* aufrufen.

Die Funktionalität für Nicht-logTransport-Adapter ist in *adapter.js* implementiert und der Entwickler muss sich nicht darum kümmern.