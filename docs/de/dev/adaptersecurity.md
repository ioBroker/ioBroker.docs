---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptersecurity.md
title: Sicherheitsbezogene Funktionen für Adapterentwickler
hash: /NdARX0dTYJRe5UAHsq6Xdl6DY1zMplYgcLpB1LOemU=
---
# Sicherheitsbezogene Funktionen für Adapterentwickler
## Zugriff von anderen Adaptern auf sensible Daten verhindern
Wenn Sie ein Benutzerkennwort oder ein Token speichern müssen, das Benutzern den Zugriff auf den von Ihnen bereitgestellten Dienst ermöglicht, kann es im Interesse des Benutzers sein, dass fremde Adapter nicht auf diese Informationen zugreifen können.
Dazu können Sie Ihrer `io-package.json` Datei ein Feld `protectedNative` hinzufügen. Dieses Feld muss ein Array aller Attribute enthalten, die im Attribut `native` des zu schützenden Adapters gespeichert sind.

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

## Sensible Daten automatisch ver- und entschlüsseln
Wenn Sie ein Benutzerpasswort oder einen Token speichern müssen, der Benutzern den Zugriff auf die von Ihnen bereitgestellten Dienste ermöglicht, kann es im Interesse des Benutzers sein, dass diese sensiblen Informationen nicht im Klartext gespeichert werden.
Dazu können Sie Ihrer `io-package.json` Datei ein Feld `encryptedNative` hinzufügen. Dieses Feld muss ein Array aller Attribute enthalten, die im Attribut `native` des Adapters gespeichert sind, die verschlüsselt gespeichert und zur Laufzeit des Adapters automatisch entschlüsselt werden.

Immer wenn der aktuell verwendete Verschlüsselungsalgorithmus unsicher wird, wird er im js-Controller geändert.

__Aktuell verwendeter Verschlüsselungsalgorithmus__

- js-controller >= 3.0: `Standard`
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

## Sensible Daten manuell ver- und entschlüsseln
Wir bieten auch Adaptermethoden zum manuellen Verschlüsseln von Daten in Ihrem Code.
Dazu können Sie die Methoden `adapter.encrypt` und `adapter.decrypt` verwenden. Der für die Verschlüsselung und Entschlüsselung verwendete Schlüssel ist das systemweit eindeutige Geheimnis der Benutzerinstallation. Wenn Sie Ihren eigenen Schlüssel (192 Bit Hex) zur Verschlüsselung verwenden möchten, können Sie dies tun, indem Sie den Methoden `encrypt` und `decrypt` ein zweites Argument übergeben.

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