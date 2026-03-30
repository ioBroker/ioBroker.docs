---
title: Dateispeicherung in ioBroker-Adaptern
lastChanged: 2025.01.13
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/filestorage.md
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
hash: rZYjLZtcHGKr6b3Inzs9lQOkBV/1tGuWm7X2ieFLbuo=
---
# Dateispeicherung in ioBroker-Adaptern
Dieses Dokument erklärt, wie Dateien mithilfe von `writeFileAsync` korrekt in der ioBroker-Datenbank gespeichert werden. Es basiert auf Entwicklerdiskussionen, ist aber in einem **neutralen Dokumentationsstil** mit Beispielen verfasst.

---

## Übersicht
ioBroker-Adapter können Dateien in der internen Datenbank speichern. Dazu müssen Sie **Meta-Objekte** definieren, die als Speicher-Namespaces fungieren. Die Wahl des Meta-Objekts bestimmt, ob Dateien in Backups einbezogen werden oder nicht.

---

## Metaobjekte
Es gibt zwei relevante Arten von Metaobjekten:

- **`meta`**
- Die hier gespeicherten Dateien sind **nicht in den Backups enthalten**.
- Geeignet für temporäre oder regenerierbare Daten.

- **`meta.user`**
- Die hier gespeicherten Dateien **sind in den Backups enthalten**.
- Geeignet für persistente Benutzerdaten wie Schlüssel, Konfigurationsdateien oder hochgeladene Inhalte.

Ein Metaobjekt fungiert als **Einhängepunkt** für Dateien.
Der Befehl `writeFileAsync` schreibt dann Daten relativ zu diesem Basispfad.

---

## Definieren eines Metaobjekts
Vor dem Schreiben von Dateien muss ein Metaobjekt erstellt werden. Beispiel:

```json
{
  "_id": "keys",
  "type": "meta",
  "common": {
    "name": "keys",
    "role": "meta.user"
  },
  "native": {}
}
```

Hier:

- `_id`: definiert den Speicher-Namespace (in diesem Fall `keys`).
- `type: "meta"`: erforderlich für Speicherobjekte.
- `role: "meta.user"`: stellt sicher, dass die Daten in die Backups aufgenommen werden.

---

## Schreibdateien
Sobald ein Metaobjekt existiert, können Dateien mit `writeFileAsync` geschrieben werden.

### Beispiel: Schreiben eines privaten Schlüssels
```js
// Store private key in namespace "adapter.namespace.keys"
await adapter.writeFileAsync(
  `${adapter.namespace}.keys`,    // meta object mount point
  'private-key.pem',              // relative file path
  keys.privateKey                 // file content
);
```

### Beispiel: Schreiben einer temporären Datei
```js
// Store temporary data in namespace "adapter.namespace.temp"
await adapter.writeFileAsync(
  `${adapter.namespace}.temp`,    // meta object mount point
  'cache.json',                   // relative file path
  JSON.stringify(cacheData)       // file content
);
```

---

## Praktische Hinweise
- Ohne ein Meta-Objekt schlägt `writeFileAsync` fehl.
- Entscheiden Sie immer zwischen `meta` und `meta.user`:
- Verwenden Sie **`meta`**, wenn der Inhalt neu generiert werden kann und nicht gesichert werden soll.
- Verwenden Sie **`meta.user`** für persistente, benutzerbezogene Dateien, die auch nach der Datensicherung erhalten bleiben müssen.
- Der **erste Parameter** in `writeFileAsync` ist das Meta-Objekt (Speicher-Namespace).
- Der **zweite Parameter** ist der Pfad relativ zu diesem Namespace.

---

## Beispiel von ioBroker Sayit
Der [Sayit-Adapter](https://github.com/ioBroker/ioBroker.sayit) definiert zwei Speicher-Namespaces in seinem `io-package.json`:

1. `adapter.namespace` (temporärer Speicher, wird nicht gesichert)
2. `meta.user`-Speicher (persistent, gesichert)

Dieses Muster ermöglicht es dem Adapter, temporär generierte Dateien von benutzerseitig bereitgestellten Inhalten zu trennen.

---

## Zusammenfassung
- Verwenden Sie **Meta-Objekte**, um Speicher-Namespaces in ioBroker zu definieren.
- Entscheiden Sie sich zwischen:
- `meta` → temporär, von Backups ausgeschlossen.
- `meta.user` → persistent, in Backups enthalten.
- Metaobjekte als **Mountpunkte** behandeln.
- Immer bestehen:
- **erster Parameter** = Namespace (z. B. `adapter.namespace.keys`).
- **zweiter Parameter** = relativer Dateipfad.

Bei korrekter Anwendung wird sichergestellt, dass Dateien zuverlässig gespeichert und bei Bedarf in Backups einbezogen werden.