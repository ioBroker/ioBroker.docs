---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/logging.md
title: kein Titel
hash: lqS7I0eLZt6tvBnm62QI2XrnTsl3mo5xbcJoPKJRbG8=
---
## Protokolltransporter
Wenn Sie bestimmte oder alle Protokolle von ioBroker-Adaptern abonnieren möchten, können Sie **logTransporter** verwenden. Um in Ihrem Adapter zu aktivieren, fügen Sie `"logTransporter": true` zur allgemeinen Struktur Ihrer `io-package.json` hinzu.<br><br> In Ihrem Adaptercode (wie in der Datei `main.js`) müssen Sie dann `requireLog(true)` aufrufen, um ihn zu aktivieren. Sobald requireLog () auf true gesetzt ist, können Sie mit `on('log', callback)` alle neuen Protokolle abonnieren, die von Adaptern eingehen. Die Rückruffunktion gibt alle Protokolle mit dem folgenden Objekt zurück (Beispiel):

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
Es gibt einen speziellen Adaptertyp, der Protokolle verwendet. Normalerweise schreiben alle Adapter ihre Nachrichten mit Logger in die Protokolldatei.
Einige Adapter müssen jedoch Protokolle anzeigen oder etwas anderes speichern.

Um einen solchen Adaptertyp zu erstellen, muss das Flag **logTransporter** in der gemeinsamen Struktur vorhanden sein.

Wenn ein solches Flag vorhanden ist, erstellt die Datei adapter.js automatisch den speziellen Status dafür - "system.adapter.adapterName.X.logging".
Diese Variable muss vom logTransport-Adapter auf true gesetzt werden, wenn dieser Adapter Protokolle empfangen möchte.

"system.adapter.adapterName.X.logging" ist eine FIFO-Warteschlange der Redis-Typ-Liste.

Andere Adapter überwachen alle Variablen "* .logging" und schreiben die Protokollmeldungen in entsprechende Listen.
Die Liste ist auf 1000 Nachrichten begrenzt (standardmäßig).

Die logTransport-Instanz empfängt das Ereignis "log" mit einer Nachricht.

Um den Status "system.adapter.adapterName.X.logging" zu steuern, muss der Adapter die Funktion *requireLog* verwenden.
Z.B. ```adapter.requireLog(true);```, um den Empfang von Protokollen zu ermöglichen.

![Illustration](../../en/dev/media/logging.png)

Die Funktionalität ist in *adapter.js* implementiert und der Entwickler sollte einfach das gemeinsame Flag *logTransporter* setzen und *requireLog ()* aufrufen.

Die Funktionalität für Nicht-logTransport-Adapter ist in *adapter.js* implementiert, und der Entwickler muss sich nicht darum kümmern.