---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptersecurity.md
title: Sicherheitsrelevante Funktionen für Adapterentwickler
hash: 5yeiL/Kr0swPAF0K9PHmK2EFYsp6ACRLgh4MZOmurRk=
---
# Sicherheitsrelevante Funktionen für Adapterentwickler
## Verhindern Sie den Zugriff anderer Adapter auf sensible Daten
Wenn Sie ein Benutzerpasswort oder ein Token speichern müssen, das Benutzern Zugriff auf Ihren Dienst gewährt, kann es im Interesse der Benutzer liegen, dass externe Adapter nicht auf diese Informationen zugreifen können.
Zu diesem Zweck können Sie Ihrer Datei „SSSSS_1“ ein Feld „SSSSS_0“ hinzufügen. Dieses Feld muss ein Array aller Attribute enthalten, die im Attribut „SSSSS_2“ des zu schützenden Adapters gespeichert sind.

Beachten Sie, dass die Adapter `admin`, `cloud` und `iot` stets Zugriff auf geschützte Attribute haben. `admin` benötigt diesen Zugriff, um Benutzern das Lesen von Attributen auf der Konfigurationsseite des jeweiligen Adapters und das manuelle Bearbeiten geschützter Felder in `system.adapter.<namespace>.<instance>` zu ermöglichen.

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

## Automatische Ver- und Entschlüsselung sensibler Daten
Wenn Sie ein Benutzerpasswort oder ein Token speichern müssen, das Benutzern Zugriff auf Ihren Dienst gewährt, ist es möglicherweise im Interesse des Benutzers, dass diese sensiblen Informationen nicht im Klartext gespeichert werden.
Zu diesem Zweck können Sie Ihrer Datei `io-package.json` ein Feld `encryptedNative` hinzufügen. Dieses Feld muss ein Array aller Attribute enthalten, die im Attribut `native` des Adapters gespeichert sind. Diese Daten werden verschlüsselt gespeichert und zur Laufzeit des Adapters automatisch entschlüsselt.

Sobald der aktuell verwendete Verschlüsselungsalgorithmus unsicher wird, wird er im js-Controller geändert.

__Aktuell verwendeter Verschlüsselungsalgorithmus__

- js-controller >= 3.0: `default`
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
Wir stellen außerdem Adaptermethoden zur Verfügung, mit denen Sie Daten manuell in Ihrem Code verschlüsseln können.
Verwenden Sie dazu die Methoden `adapter.encrypt` und `adapter.decrypt`. Der Schlüssel für die Ver- und Entschlüsselung ist das systemweite, eindeutige Geheimnis der Benutzerinstallation. Wenn Sie stattdessen Ihren eigenen Schlüssel verwenden möchten, übergeben Sie diesen als **erstes** Argument und den Wert als zweites: `encrypt(key, value)` / `decrypt(key, value)`. Der Schlüssel ist ein 192-Bit-Schlüssel (24 Byte) und wird als Hexadezimalzeichenkette angegeben.

__Beispiel__:

```javascript
// encrypt data using users unique secret
const encryptedContent = adapter.encrypt('super secret message');

const decryptedContent = adapter.decrypt(encryptedContent);
// decryptedContent === 'super secret message'

// Or use your own 192 bit (24 byte) key, given as a hex string
const crypto = require('crypto');
const key = crypto.randomBytes(24).toString('hex');
const encryptedWithOwnKey = adapter.encrypt(key, 'super secret message');
const decryptedWithOwnKey = adapter.decrypt(key, encryptedWithOwnKey);
// decryptedWithOwnKey === 'super secret message'
```