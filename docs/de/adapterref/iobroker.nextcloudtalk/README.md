---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nextcloudtalk/README.md
title: ioBroker Nextcloud Talk Adapter
hash: AvcJQp7vvOTlRPuDaTvGbQyOHDDvlEj6jxsjSOT1sLo=
---
# ioBroker Nextcloud Talk Adapter

Dieser Adapter sendet Nachrichten an Nextcloud Talk-Räume und kann optional Nachrichten von einem Raum empfangen.

## Konfiguration

Dieser Adapter verwendet nun das ioBroker-JSON-Konfigurationssystem. Geben Sie die folgenden Einstellungen im Instanzdialog ein:

1. **Server-URL** – zum Beispiel `https://nextcloud.example.com`
2. **Benutzername** für die Basisauthentifizierung
3. Für den Benutzer wurde **ein App-Token** generiert.

## Anleitung zum Versenden

Schreiben Sie eine JSON-Zeichenfolge an `nextcloudtalk.0.send` Zimmer und Text gemeinsam auswählen:

```js
setState('nextcloudtalk.0.send', JSON.stringify({ roomId: 'abc123', text: 'Hello from ioBroker' }));
```

Beide Felder dürfen keine leeren Zeichenketten sein. Der Schreibvorgang muss Folgendes verwenden: `ack=false`, was die Standardeinstellung für `setState`. Der `send` Der Zustand ändert sich nicht `roomID` Die

Bestehende Skripte und Blockly-Regeln können weiterhin die alten Zustände verwenden: setzen `roomID` zum Chatraum-Token, dann schreiben Sie die Nachricht an `text` mit `ack=false` Die `roomID` wählt den Raum aus; Schreiben `text` sendet die Nachricht. Beide Sendemethoden verwenden Talk. `/ocs/v2.php/apps/spreed/api/v1/chat/{token}` Endpunkt.

## Anleitung erhalten

1. Aktivieren Sie in den Einstellungen der Adapterinstanz **den Empfang von Nachrichten** und geben Sie ein **Empfangsraum-Token** ein. Das konfigurierte Nextcloud-Konto muss zu dieser Konversation gehören. Der Empfang ist standardmäßig deaktiviert und überwacht nur diesen Raum.
2. Senden Sie eine _neue_ Nachricht von einem anderen Talk-Konto an diesen Raum. Die erste Umfrage ermittelt den aktuellen Stand und spielt ältere Nachrichten nicht erneut ab.
3. Betrachten `nextcloudtalk.0.received` Jede eingehende Benutzernachricht schreibt eine bestätigte JSON-Zeichenfolge, zum Beispiel:

   ```json
   {"roomId":"abc123","id":42,"text":"Light on","actorId":"alice","actorDisplayName":"Alice","timestamp":1780000000,"messageType":"comment"}
   ```

### Verwenden Sie die Nachricht in JavaScript

Abonnieren Sie jedes Update, analysieren Sie das JSON und entscheiden Sie, welche Absender und Texte Ihr Skript akzeptiert:

```js
on({ id: 'nextcloudtalk.0.received', change: 'any', ack: true }, obj => {
    const message = JSON.parse(obj.state.val);
    if (message.actorId === 'alice' && message.text === 'Light on') {
        // Perform your chosen ioBroker action here.
    }
});
```

### Verwenden Sie die Nachricht in Blockly

Erstelle einen Zustandsänderungstrigger für `nextcloudtalk.0.received` und wählen Sie **ein beliebiges Update** aus. Übergeben Sie darin den aktuellen Wert des Triggers an die **Funktion „JSON in Objekt konvertieren“** und speichern Sie das Ergebnis in einer Variablen wie z. B. `message` Verwenden Sie **das Attribut … des Objekts …** mit dieser Variablen, um zu lesen `text`, `actorId` oder einem anderen Feld. Vergleichen Sie beispielsweise `actorId` mit `alice` Und `text` mit `Light on` in einem **if-** Block vor der Ausführung einer Aktion.

Der Adapter ignoriert eigene Nachrichten und Nachrichten des Talk-Systems. Er markiert weder Nachrichten noch Benachrichtigungen als gelesen und führt keine Chat-Befehle aus. `nextcloudtalk.0.receiveCursor` Speichert das Raumtoken und die zuletzt verarbeitete Nachrichten-ID über Neustarts hinweg. Ein Neustart zwischen den Veröffentlichungen. `received` Das Speichern des Cursors kann eine Nachricht wiederholen; Skripte, die einen Duplikatschutz benötigen, sollten dies nachverfolgen. `roomId` Und `id` Erfolgreiche Abfragen werden im Adapterprotokoll nicht protokolliert; fehlgeschlagene Anfragen erzeugen Warnungen.

## Changelog

### Unreleased

### 2.0.0
* Add atomic per-message sending through `send` while keeping `roomID` and `text` compatible.
* Add optional single-room Talk message receiving through the `received` state.
* Add separate sending and receiving how-to guides.

### 1.0.3
* Adapter requires node.js >= 22 now

### 1.0.2
* updated logo
* tests

### 1.0.1
* initial version

### 1.0.0
* initial version

## License

Copyright (c) 2025-2026 Rello <github@scherello.de>

[GNU Affero General Public License v3.0](https://github.com/Rello/ioBroker.nextcloudtalk/blob/master/LICENSE)