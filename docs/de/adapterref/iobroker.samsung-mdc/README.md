---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.samsung-mdc/README.md
title: ioBroker.samsung-mdc
hash: h35QmA/GA+hdcRki2d3/KlHXBzPwIs586PCKoy/Nsu8=
---
![Logo](../../../en/adapterref/iobroker.samsung-mdc/admin/samsung-mdc.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.samsung-mdc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.samsung-mdc.svg)
![Anzahl der Installationen](https://iobroker.live/badges/samsung-mdc-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/samsung-mdc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.samsung-mdc.png?downloads=true)
![Test und Freigabe](https://github.com/AlanSRU/ioBroker.samsung-mdc/workflows/Test%20and%20Release/badge.svg)

# ioBroker.samsung-mdc

## Samsung-MDC-Adapter für ioBroker

Steuern Sie [kommerzielle Samsung-Signage-Displays](https://www.samsung.com/business/displays/) (die QBC/QMC/QEC/QHC-Familien und andere Panels mit MDC) über das Multiple Display Control (MDC)-Protokoll auf TCP 1515: Ein-/Ausschalten, Eingangsquelle, Lautstärke, Stummschaltung und Status.

## Was es tut

Eine einzige Instanz kann beliebig viele Displays ansteuern. MDC arbeitet außerhalb des regulären Datenverkehrs: Es ist keine App auf dem Display und keine Kopplung erforderlich, und ein Panel reagiert weiterhin im Standby-Modus, solange der Netzwerk-Standby aktiviert ist. Der Adapter öffnet für jede Anfrage eine neue TCP-Verbindung, sodass ein defektes Panel die anderen nicht blockieren kann.

Dieser Adapter ist für **kommerzielle Digital Signage-** Panels bestimmt. Samsung-Fernseher für Endverbraucher unterstützen MDC nicht.

## Anforderungen

- Node.js 22 oder neuer
- js-controller 6.0.11 oder neuer
- Admin 7.6.20 oder neuer
- Auf jedem Display:
  - **System → Energiesteuerung → Netzwerk-Standby: Ein** (und Maximale Energiesparfunktion: Aus). Ohne diese Einstellung reagiert das Bedienfeld etwa eine Minute nach dem Ausschalten nicht mehr und kann nicht über MDC wieder eingeschaltet werden.
  - Die MDC-Steuerung über das Netzwerk ist aktiviert, und die Set-ID des Displays ist bekannt (0 für ein Panel mit eigener Adresse).

## Konfiguration

| Einstellung                               |                                                                                                                                                                                                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzeigen                                  | Eine Zeile pro Anzeige: Name, IP-Adresse, Port (1515), Anzeige-ID (die MDC-Set-ID) und optional eine MAC-Adresse für Wake-on-LAN. Der Name dient als Objektordner; lassen Sie das Feld leer, um die IP-Adresse zu verwenden. Eine deaktivierte Zeile behält ihre Objekte.       |
| Suche nach Displays                       | Prüft einen Adressbereich auf Panels, die MDC-Anfragen auf Port 1515 mit der ID 0 beantworten, und fügt sie der Tabelle hinzu. Siehe [Discovery](#discovery) .                                                                                                                  |
| Abstimmungsintervall                      | Die Abfragehäufigkeit der einzelnen Displays liegt zwischen 5 und 3600 Sekunden (Standardwert: 30 Sekunden); 0 deaktiviert die Abfrage. Die Displays werden im Abstand von 250 ms abgefragt, sodass nicht mehrere Displays gleichzeitig abgefragt werden.                       |
| Standardlautstärke beim Einschalten       | Optionale Lautstärke (0-100) wird nach jedem Einschaltbefehl gesendet.                                                                                                                                                                                                          |
| Verwenden Sie Wake-on-LAN zum Einschalten | Sendet vor dem Einschaltbefehl ein Magic Packet an die MAC-Adresse des Displays. Dies ist nur für vollständig ausgeschaltete Displays erforderlich; im Netzwerk-Standby-Modus ist es nicht notwendig. Es erreicht nur Displays im selben Netzwerksegment wie der ioBroker-Host. |

## Staaten

```
info.connection                     true if any display answered its last poll
<display>.info.connection           this display is answering
<display>.control.power    (rw)     power on/off
<display>.control.input    (rw)     input source: 33 HDMI1, 35 HDMI2, 37 DisplayPort, 96 MagicInfo
<display>.media.volume     (rw)     volume 0-100
<display>.media.mute       (rw)     mute
```

Die Eingangscodes variieren je nach Modell. Beim QB43C werden nur HDMI1, HDMI2 und MagicInfo akzeptiert; DisplayPort ist für größere Panels mit diesem Anschluss aufgeführt.

### Anzeigeverhalten, über das man Bescheid wissen sollte

- **Das Einschalten dauert über den Steuerkanal etwa 30 Sekunden.** Nach dem Einschaltbefehl startet der MDC-Dienst neu und reagiert für etwa 30 Sekunden nicht, obwohl das Bild deutlich schneller wieder da ist. Der Adapter erwartet dies: Er meldet das Display während dieser Zeit nicht als nicht erreichbar.
- **Die Stummschaltung wird im Standby-Modus nicht aktualisiert.** Ein Panel im Standby-Modus meldet immer „Stummschaltung aktiviert“, was jedoch nichts über die Audioausgabe aussagt. Daher wird der letzte Wert beibehalten.
- **Ein Befehl, der aufgrund eines Timeouts abgebrochen wurde, kann dennoch ausgeführt worden sein.** Der Adapter liest die Anzeige kurz nach jedem Befehl aus, sodass die angezeigten Zustände das tatsächliche Verhalten der Anzeige widerspiegeln.

## Befehle aus Skripten (sendTo)

Jeder Befehl benötigt `device` Die Ordner-ID des Displays, sein konfigurierter Name oder seine IP-Adresse. Diese Angabe kann weggelassen werden, wenn nur ein Display konfiguriert ist.

```javascript
sendTo('samsung-mdc.0', 'getStatus', { device: 'pitch_west' }, result => log(JSON.stringify(result)));
sendTo('samsung-mdc.0', 'power', { device: 'pitch_west', value: true });
sendTo('samsung-mdc.0', 'input', { device: 'pitch_west', value: 0x21 });
sendTo('samsung-mdc.0', 'volume', { device: 'pitch_west', value: 20 });
sendTo('samsung-mdc.0', 'mute', { device: 'pitch_west', value: false });
```

Die Antwort lautet: `{ ok: true }` (oder der Status für `getStatus`), oder `{ error: '...' }` Die

## Entdeckung

MDC sendet keine Ankündigungen oder Broadcasts, daher können Displays nicht passiv ermittelt werden. **Die Suche** verbindet sich mit Port 1515 auf jeder Adresse im Bereich und sendet eine Statusanfrage; ein Display, das die Anfrage bestätigt, wird mit einem leeren Namen zur Tabelle hinzugefügt. Der Bereich akzeptiert `192.168.230.0/24`, `192.168.230.10-60`, `192.168.230.10-192.168.231.20` oder einzelne, durch Komma getrennte Adressen, bis zu 4096 Adressen (eine /24-Suche dauert etwa 12 Sekunden). Die Suche funktioniert über geroutete Subnetze hinweg, sofern der ioBroker-Host diese erreichen kann.

Die Suche integriert sich in die **gespeicherte** Konfiguration. Speichern Sie daher zuerst alle ausstehenden Änderungen. Anzeigen, die hinter einem anderen Panel mit einer anderen Set-ID in Reihe geschaltet sind, werden nicht gefunden und müssen manuell hinzugefügt werden.

## Ein Display ohne ioBroker in Betrieb nehmen

`test-mdc.js` Im Repository befindet sich eine eigenständige Sonde (nur Node.js, keine Abhängigkeiten), die ein Panel direkt liest und beschreibt und die Rohdaten ausgibt:

```bash
node test-mdc.js 192.168.230.200            # status, power, volume, mute, input
node test-mdc.js 192.168.230.200 power on
node test-mdc.js 192.168.230.200 discover   # try set IDs 0, 1 and 254
```

## Haftungsausschluss

Samsung ist eine Marke der Samsung Electronics Co., Ltd. Dieser Adapter steht in keiner Verbindung zu Samsung und wird von Samsung auch nicht unterstützt.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2026-09-25)
* (Alan Paris) First public release: any number of displays per instance, discovery by address range, Wake-on-LAN
* (Alan Paris) A display is reported unreachable only after two failed polls in a row, and not while it restarts after a power-on
* (Alan Paris) Switched-off display rows keep their objects

### 0.0.1 (2026-09-25)
* (Alan Paris) initial release

Older changes can be found in CHANGELOG_OLD.md

## License
MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.