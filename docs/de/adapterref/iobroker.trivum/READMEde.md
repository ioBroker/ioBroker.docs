---
chapters: {"pages":{"en/adapterref/iobroker.trivum/README.md":{"title":{"en":"ioBroker.trivum"},"content":"en/adapterref/iobroker.trivum/README.md"},"en/adapterref/iobroker.trivum/READMEde.md":{"title":{"en":"ioBroker.trivum"},"content":"en/adapterref/iobroker.trivum/READMEde.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.trivum/READMEde.md
title: ioBroker.trivum
hash: TTOP35VBU3OqgONlJCA7Al0XXFva+AVoDr+9znJCpVE=
---
![Logo](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

# ioBroker.trivum

Der Adapter steuert ein trivum-Multiroom-Audiosystem über dessen lokale XML-API aus ioBroker.

## Konfiguration

Die IPv4-Adresse des trivum MusicCenters eintragen. Zonen und Steuerungen werden automatisch erkannt. Abfrageintervall und HTTP-Timeout sind konfigurierbar; Bestehende Installationen behalten die historischen Konfigurationsschlüssel`adresse` und`option3` Die

`Anzahl der Durchsage-Vorlagen` erzeugt globale Durchsage-Schaltflächen ab ID 0.

## Datenpunkte

Globale Steuerungen:

- `Global.ALLOFF` : alle Zonen ausschalten
- `Global.Aktive_zonen` : von trivum gemeldete aktive Zonen
- `Global.PagingN` : Durchsage-Vorlage N starten

Je erkannter Zone werden angelegt:

- `Muten` : Stummschaltung ein-/ausschalten
- `DEFAULT_STREAMING` : Standardstream starten
- `ZONECMD_DEFAULT_TUNER` : Standardtuner starten
- `VOLUME` : Lautstärke von 0 bis 100 Prozent lesen oder setzen
- `ZONECMD_POWER_OFF` Zone ausschalten
- `Status` : aktueller Zonenstatus

Schaltflächen werden nach erfolgreichem Aufruf automatisch zurückgesetzt.`info.connection` wird erst nach einer erfolgreichen Trivum-Antwort gesetzt;`info.lastError` enthält den letzten Kommunikationsfehler.

## Lizenz

Copyright © 2021–2026 TheBam <elektrobam@gmx.de>

MIT-Lizenz. Siehe [LICENSE](https://github.com/TheBam1990/ioBroker.trivum/blob/master/LICENSE) .

## Changelog

### 0.1.0

- Auf aktuelles ioBroker-Adaptertemplate und responsive JSON Config migriert
- Kompatibilität mit Node.js 22/24 und js-controller 6 ergänzt
- adapter-core, Abhängigkeiten, Linting, Tests und Release-Workflows aktualisiert
- Zonenerkennung, Abfrage, Verbindungsstatus und Fehlerbehandlung überarbeitet
- Zonenbefehle auf die erkannten Zonen-IDs korrigiert
- Lautstärke als numerischen Prozentwert umgesetzt und überlappende Abfragen verhindert