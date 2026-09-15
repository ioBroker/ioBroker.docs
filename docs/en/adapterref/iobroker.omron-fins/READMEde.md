---
chapters: {"pages":{"en/adapterref/iobroker.omron-fins/README.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/README.md"},"en/adapterref/iobroker.omron-fins/READMEde.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/READMEde.md"}}}
---
![Logo](admin/omron-fins.png)

# ioBroker.omron-fins

Der Adapter verbindet Omron-SPS der Reihen CP, CV, CS, CJ, NJ und kompatible NX-Steuerungen über das FINS-Protokoll per UDP oder TCP mit ioBroker.

## Konfiguration

In der responsiven Adapterkonfiguration werden IP-Adresse, FINS-Port (normalerweise `9600`), Protokoll und Abfrageintervall eingetragen. Ziel- und Quellknoten können normalerweise auf `0` für automatische Erkennung bleiben. Bei gerouteten FINS-Netzen lassen sich DA1 und SA1 ausdrücklich vorgeben.

Variablen können mit eindeutigem Namen, FINS-Adresse und Datentyp manuell eingetragen werden. Beispiele sind `CIO0.00` (oder historisch `CB0:00`), `W31.00`, `H0.01`, `A0.00`, `D100`, Timer und Zähler.

Jede Variable wird als ioBroker-Datenpunkt angelegt. Schreibvorgänge werden erst bestätigt, wenn die SPS den FINS-Befehl erfolgreich beantwortet hat.

## CX-Programmer-Symboltabelle importieren

Die Symboltabelle in CX-Programmer als CSV oder tabulatorgetrennten Text exportieren und in das vorgesehene Konfigurationsfeld einfügen. Der Adapter erkennt deutsche und englische Spalten für Name, Adresse und Datentyp automatisch. Komma, Semikolon und Tabulator werden unterstützt. Manuelle Einträge überschreiben importierte Symbole gleichen Namens.

## Fehlerbehebung

- `info.connection` wird erst nach einer erfolgreichen SPS-Antwort gesetzt.
- `info.lastError` enthält den letzten Kommunikations- oder Konfigurationsfehler.
- UDP-/TCP-Port 9600 sowie FINS-/ETN-Einstellungen der SPS prüfen.
- Wenn die automatische Knotenerkennung nicht funktioniert, DA1 und SA1 ausdrücklich konfigurieren.

## Changelog

### 0.1.0

- Kompatibilität mit Node.js 22/24, js-controller 6 und aktuellem adapter-core
- Alte Administrationsseite durch responsive JSON Config ersetzt
- UDP/TCP-, Timeout- und FINS-Knoteneinstellungen ergänzt
- Automatischen Import von CX-Programmer-CSV-/TSV-Symboltabellen ergänzt
- Überlappende Abfragen verhindert und Verbindungs-/Fehlerbehandlung verbessert
- Tests, Linting, Release- und Dependabot-Workflows aktualisiert

## Lizenz

Copyright (c) 2021-2026 TheBam <elektrobam@gmx.de>

MIT-Lizenz. Siehe [LICENSE](https://github.com/TheBam1990/ioBroker.omron-fins/blob/master/LICENSE).