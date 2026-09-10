---
chapters: {"pages":{"en/adapterref/iobroker.hm-rpc/README.md":{"title":{"en":"ioBroker HomeMatic RPC Adapter"},"content":"en/adapterref/iobroker.hm-rpc/README.md"},"en/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md
title: kein Titel
hash: up9GvocF6yWIlMyRG2WXMTxgeUtaJ+QHhg7+J5/Bu70=
---
## Änderungsprotokoll

### 1.9.17 (2019-08-04)

- (foxriver76) Metawerte mit einem Maximalwert von 1,01 als 1 behandeln

### 1.9.16 (2019-07-18)

- (foxriver76) adapter.objects wird nicht mehr verwendet, wenn es nicht notwendig ist.
- (foxriver76) hat Metadaten hinzugefügt

### 1.9.15 (2019-07-01)

- (foxriver76) hat Metadaten und ein Symbol für HB-UNI-Sen-CAP-MOIST hinzugefügt.
- (foxriver76) Korrigiere den Datentyp von EPAPER\_TONE zu String

### 1.9.14 (2019-06-29)

- (foxriver76) Kleiner Bugfix für HM-Dis-EP-WM55
- (foxriver76) Abfangen von asynchronen Fehlern bei bin-RPC-Verbindungen

### 1.9.13 (2019-06-03)

- (foxriver76) Ein Fehler wurde behoben, durch den einige Metadaten im falschen Index gespeichert wurden.

### 1.9.12 (2019-05-27)

- (foxriver76) Wartungskanal von HM-Dis-EP-WM55 reparieren
- (foxriver76) Metadaten hinzugefügt

### 1.9.11 (2019-04-21)

- (foxriver76) create OPERATING\_VOLTAGE with unit V
- (foxriver76) create RSSI\_\* with unit dBm

### 1.9.10 (2019-04-12)

- (foxriver76) Meta-Fix
- (foxriver76) hat neue Metadaten hinzugefügt

### 1.9.9 (2019-03-17)

- (foxriver76) Fensterzustände sind jetzt rollenbasiert`value.window`

### 1.9.8 (2019-02-27)

- (foxriver76) Korrekturen für E-Paper-Zeilen und Symboltypen
- (foxriver76) Metas hinzugefügt

### 1.9.7 (2019-02-13)

- (foxriver76) hat Metas hinzugefügt
- (foxriver76) Wenn max 1,005 ist, dann setze max auf 1

### 1.9.6 (2019-02-02)

- (foxriver76) Metadaten für virtuelle Geräte korrigieren

### 1.9.5 (2019-01-29)

- (foxriver76) Alarmzustände ignorieren, da sie von Rega behandelt werden

### 1.9.4 (2019-01-26)

- (foxriver76) hat ein Bild hinzugefügt
- (foxriver76) hat den Homematic-Pfad aus der Benutzeroberfläche entfernt.

### 1.9.3 (2019-01-25)

- (foxriver76) hat Metadaten hinzugefügt

### 1.9.2 (2019-01-14)

- (foxriver76) hat Chinesisch hinzugefügt
- (foxriver76) kleinere Optimierungen

### 1.9.1 (2019-01-08)

- (foxriver76) Kompaktmodus reparieren

### 1.9.0 (2019-01-07)

- (foxriver76) Hinzufügen benutzerdefinierter Befehle zur Dokumentation und Protokollierung
- (Holuba & foxriver76) Korrekturen für die API virtueller Geräte
- (bluefox) Kompaktmodus aktivieren
- (marvingrieger) Einstellen der HmIP-Verschlüsse auf einen Maximalwert von 1

### 1.8.3 (2019-01-04)

- (foxriver76) Abhängigkeit beheben

### 1.8.2 (2018-12-30)

- (foxriver76) Metainformationen hinzugefügt
- (foxriver76) Neue Symbole hinzugefügt
- (foxriver76) Kleinere Verbesserungen

### 1.8.1 (2018-12-22)

- (foxriver76) Viele Metadaten hinzugefügt

### 1.8.0 (2018-11-27)

- (foxriver76) HTTPS-Kontrollkästchen hinzugefügt
- (foxriver76) Anstelle von http kann auch HTTPS verwendet werden.
- (foxriver76) Möglichkeit zur Authentifizierung über die API hinzugefügt.
- (foxriver76) Entschlüsselung und Verschlüsselung hinzugefügt

### 1.7.7 (2018-10-25)

- (foxriver76) Metainformationen für HmIP-WTH-2 und HMIP-eTRV hinzugefügt (um Probleme mit der Einheit und anderen Eigenschaften zu beheben)
- (foxriver76) Allgemeine Rollenzuordnung für SET\_POINT\_TEMPERATURE hinzugefügt

### 1.7.6 (2018-07-29)

- (bluefox) Der Konfigurationsdialog wurde korrigiert.

### 1.7.5 (2018-07-20)

- (bluefox) Die Rollen der Staaten wurden abgestimmt

### 1.7.4 (2018-06-28)

- (BuZZy1337) Metas für HM-Sen-MDIR-O-3 hinzugefügt

### 1.7.3 (2018-06-25)

- (bluefox) E-Paper wurde korrigiert

### 1.7.2 (2018-06-11)

- (apollon77) hat die Behandlung der Wiederverbindung geändert

### 1.7.1 (2018-06-11)

- (angelu) hat die Behandlung der Wiederverbindung geändert

### 1.7.0 (2018-06-03)

- (bluefox) Wichtige Änderungen: Die folgenden Zeichen \*,;'"\`<>\s?" in ADDRESS werden durch "\_" ersetzt.
- (bluefox) Einige Rollen wurden geändert

### 1.6.2 (2018-04-27)

- (BuZZy1337) Fehlende Metadaten für HM-IP-Geräte hinzugefügt

### 1.6.1 (2018-03-15)

- (bluefox) Das binrpc-Paket 2 wurde aktualisiert
- (bluefox) Der Ping für CUxD wurde deaktiviert.

### 1.6.0 (2018-02-19)

- (Apollon77) Aktualisierung der binrpc-Bibliothek

### 1.5.1 (2018-01-26)

- (bluefox) Bereit für Admin3

### 1.5.0 (2017-10-27)

- (bluefox) Neue Geräte in den Metainformationen hinzufügen
- (bluefox) Adapterstopp erzwingen

### 1.4.15 (2017-09-27)

- (bluefox) Option hinzugefügt, um die Geräte nicht zu löschen

### 1.4.14 (2017-06-19)

- (bluefox) Bilder reparieren