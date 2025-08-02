---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptersecurity.md
title: Sicherheitsrelevante Funktionen für Adapterentwickler
hash: X2HcDsT5TE/W4x20hMFpAqHF23iMYbOPyEK6TXNkyG4=
---
# Sicherheitsrelevante Funktionen für Adapterentwickler
## Verhindern Sie den Zugriff anderer Adapter auf vertrauliche Daten
Wenn Sie ein Benutzerkennwort oder ein Token speichern müssen, das Benutzern Zugriff auf den von Ihnen bereitgestellten Dienst gewährt, kann es im Interesse des Benutzers sein, dass fremde Adapter nicht auf diese Informationen zugreifen können.
Zu diesem Zweck können Sie Ihrer Datei `io-package.json` ein Feld `protectedNative` hinzufügen. Dieses Feld muss ein Array aller Attribute enthalten, die im Attribut `native` des zu schützenden Adapters gespeichert sind.

Beachten Sie, dass der Admin-Adapter immer Zugriff auf geschützte Attribute hat, um Benutzern die Möglichkeit zu geben, Attribute auf der eigenen Konfigurationsseite des Adapters zu lesen und geschützte Felder in `system.adapter.<namepsace>.<instance>` manuell zu bearbeiten.

__Beispiel__:

```json
...
"protectedNative": [
    "password"
],
"native": {
  "password": "topSecret"
}
...
```

## Sensible Daten automatisch verschlüsseln und entschlüsseln
Wenn Sie ein Benutzerkennwort oder ein Token speichern müssen, das Benutzern Zugriff auf den von Ihnen bereitgestellten Dienst gewährt, kann es im Interesse des Benutzers sein, dass diese vertraulichen Informationen nicht im Klartext gespeichert werden.
Zu diesem Zweck können Sie Ihrer Datei `io-package.json` ein Feld `encryptedNative` hinzufügen. Dieses Feld muss ein Array aller Attribute enthalten, die im Attribut `native` des Adapters gespeichert sind. Dieses wird verschlüsselt gespeichert und zur Laufzeit des Adapters automatisch entschlüsselt.

Wenn der aktuell verwendete Verschlüsselungsalgorithmus unsicher wird, wird er im JS-Controller geändert.

__Derzeit verwendeter Verschlüsselungsalgorithmus__

- js-controller >= 3.0: „Standard“
- js-controller >= 3.2: `aes-192-cbc`

Beachten Sie, dass diese Funktion mindestens js-controller 3.0.0 erfordert.

__Beispiel__:

```json
...
"encryptedNative": [
    "password"
],
"native": {
  "password": "topSecret"
}
...
```

## Sensible Daten manuell verschlüsseln und entschlüsseln
Wir bieten auch Adaptermethoden an, um Daten manuell in Ihrem Code zu verschlüsseln.
Hierfür können Sie die Methoden `adapter.encrypt` und `adapter.decrypt` verwenden. Der für die Ver- und Entschlüsselung verwendete Schlüssel ist das systemweit eindeutige Geheimnis der Benutzerinstallation. Wenn Sie Ihren eigenen Schlüssel (192-Bit-Hex) für die Verschlüsselung verwenden möchten, können Sie dies tun, indem Sie den Methoden `encrypt` und `decrypt` ein zweites Argument übergeben.

__Beispiel__:

```javascript
// encrypt data using users unique secret
const encryptedContent = adapter.encrypt('super secret message');

const decryptedContent = adapter.decrypt(encryptedContent);
// decryptedContent === 'super secret message'

// Or use your own key (24 byte Hex) for encryption
const crypto = require('crypto');
const key = crypto.randomBytes(24).toString('hex');
const encryptedContent = adapter.encrypt(key, 'super secret message');
const decryptedContent = adapter.decrypt(key, encryptedContent);
// decryptedContent === 'super secret message'
```