---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/logging.md
title: ohne Titel
hash: lqS7I0eLZt6tvBnm62QI2XrnTsl3mo5xbcJoPKJRbG8=
---
## Holztransporter
Wenn Sie bestimmte oder alle Protokolle von ioBroker-Adaptern abonnieren möchten, können Sie **logTransporter** verwenden. Um es in Ihrem Adapter zu aktivieren, fügen Sie `"logTransporter": true` zur gemeinsamen Struktur Ihres `io-package.json` hinzu.<br><br> In Ihrem Adaptercode (wie in der Datei `main.js`) müssen Sie dann `requireLog(true)` aufrufen, um die Funktion zu aktivieren. Sobald requireLog() auf true gesetzt ist, können Sie `on('log', callback)` verwenden, um alle neuen Protokolle zu abonnieren, die von Adaptern eingehen. Die Callback-Funktion gibt alle Protokolle mit dem folgenden Objekt zurück (Beispiel):

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

## Hintergrundinformationen
Es gibt einen speziellen Adaptertyp, der Protokolle verwendet. Normalerweise schreiben alle Adapter ihre Meldungen mit Logger in die Protokolldatei.
Aber manche Adapter müssen Protokolle anzeigen oder sie anderweitig speichern.

Um einen solchen Adaptertyp zu erstellen, muss er in der gemeinsamen Struktur das Flag **logTransporter** haben.

Wenn ein solches Flag vorhanden ist, erstellt adapter.js automatisch den speziellen Status dafür - "system.adapter.adapterName.X.logging".
Diese Variable muss vom logTransport-Adapter auf true gesetzt werden, wenn dieser Adapter Protokolle empfangen möchte.

„system.adapter.adapterName.X.logging“ ist eine FIFO-Warteschlange der Redis-Typliste.

Andere Adapter überwachen alle Variablen "*.logging" und schreiben die Logmeldungen in entsprechende Listen.
Die Liste ist auf 1000 Meldungen begrenzt (standardmäßig).

Die logTransport-Instanz empfängt das Ereignis „log“ mit der Meldung.

Um den Status „system.adapter.adapterName.X.logging“ zu steuern, muss der Adapter die Funktion *requireLog* verwenden.
Zum Beispiel ```adapter.requireLog(true);```, um den Empfang von Protokollen zu aktivieren.

![Illustration](../../en/dev/media/logging.png)

Die Funktionalität ist in *adapter.js* implementiert und der Entwickler muss nur das allgemeine Flag *logTransporter* setzen und *requireLog()* aufrufen.

Die Funktionalität für Nicht-LogTransport-Adapter ist in *adapter.js* implementiert und der Entwickler muss sich nicht darum kümmern.