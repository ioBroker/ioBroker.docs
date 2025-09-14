---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nextcloudtalk/README.md
title: ioBroker Nextcloud Talk Adapter
hash: FghpMM1/d+igV6WEaRTugKo8SPF1Vuy9vr7WKzKEnyU=
---
# IoBroker Nextcloud Talk Adapter
Dieser Adapter ermöglicht das Senden von Benachrichtigungen an Nextcloud Talk-Räume.

## Konfiguration
Dieser Adapter verwendet nun das ioBroker JSON-Konfigurationssystem. Geben Sie im Instanzdialog die folgenden Einstellungen ein:

1. **Server-URL** – zum Beispiel `https://nextcloud.example.com`
2. **Benutzername** für die Basisauthentifizierung
3. **App-Token** für den Benutzer generiert

## Staaten
- `roomID` (Zeichenfolge): Diskussionsraum-Token, an das Nachrichten gesendet werden sollen.
- `text` (Zeichenfolge): Wenn dieser Status geändert wird, sendet der Adapter den neuen Wert als Nachricht an den konfigurierten Raum.

## Verwendung
Aktualisieren Sie den Status `text` von Skripten oder anderen Adaptern, um eine Nachricht zu senden.
Nachrichten werden über den Nextcloud Talk API-Endpunkt `/ocs/v2.php/apps/spreed/api/v1/chat/{token}` gesendet.

## Changelog

### **WORK IN PROGRESS**

### 1.0.2
* updated logo
* tests

### 1.0.1
* initial version

### 1.0.0
* initial version

## License

Copyright (c) 2025 Rello

MIT