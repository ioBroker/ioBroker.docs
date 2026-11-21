---
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miboxer-wl433/README.md
title: ioBroker.miboxer-wl433
hash: cIg8cEoRyLm1TUeCCEnX+dGJZ5barpPrxThodcMgh/A=
---
![Logo](../../../en/adapterref/iobroker.miboxer-wl433/admin/miboxer-wl433.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.miboxer-wl433.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.miboxer-wl433.svg)
![Anzahl der Installationen](https://iobroker.live/badges/miboxer-wl433-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/miboxer-wl433-stable.svg)
![NPM](https://nodei.co/npm/iobroker.miboxer-wl433.png?downloads=true)
![Test und Freigabe](https://github.com/ssbingo/ioBroker.miboxer-wl433/workflows/Test%20and%20Release/badge.svg)

# IoBroker.miboxer-wl433
---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img alt="Kauf mir einen Kaffee" src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

## MiBoxer WL-433 Poollichtadapter für ioBroker
Lokale Steuerung der **MiBoxer PW01 / PW02** LoRa-Poolleuchten (433 MHz) über das **MiBoxer WL-433** Gateway - ohne Cloud, ohne Sprachassistent, direkt in Ihrem lokalen Netzwerk.

Hersteller: [MiBoxer (Futlight Optoelectronics)](https://miboxer.com/) - Produktseiten: [WL-433-Gateway](https://miboxer.com/product/lora-433mhz-gateway), [PW01 Poolleuchte](https://miboxer.com/product/27w-rgbcct-par56-led-pool-light-lora-433mhz), [FUT086 Fernbedienung](https://miboxer.com/product/8-zone-lora-433mhz-remote-control)

### Haftungsausschluss
Dies ist ein **inoffizielles Community-Projekt**. Es steht in keiner Verbindung zu Shenzhen Futlight Optoelectronics Co., Ltd. (MiBoxer / Mi-Light) oder Tuya und wird von diesen weder unterstützt noch empfohlen. „MiBoxer“, „Mi-Light“ und „Tuya“ sind Marken ihrer jeweiligen Inhaber und werden hier lediglich zur Beschreibung der Gerätekompatibilität verwendet. Die Verwendung dieses Adapters erfolgt auf eigene Gefahr.

### So funktioniert es
Das WL-433-Gateway enthält ein Tuya-WLAN-Modul. Im lokalen Netzwerk fungiert es als **ein einziges** Tuya-Gerät - alle daran angeschlossenen Lampen werden über dieses eine Gerät gesteuert. Das Gateway leitet die Befehle per LoRa (433 MHz) an die Lampen weiter.
Der Adapter kommuniziert direkt mit dem Gateway über das **Tuya-LAN-Protokoll 3.3** (TCP-Port 6668, AES-verschlüsselt mit dem lokalen Schlüssel des Geräts). Grundlage hierfür ist die bewährte Bibliothek [tuyapi](https://github.com/codetheweb/tuyapi) (die auch von ioBroker.tuya verwendet wird). Die Protokollversionen 3.1, 3.4 und 3.5 werden ebenfalls unterstützt, falls ein Firmware-Update Änderungen mit sich bringt.

Lampen, Zonen und Szenen werden über die herstellerspezifischen Befehle des Gateways im **Datenpunkt 101** gesteuert - dieselben Befehle, die die MiBoxer-App sendet. Das Gateway meldet seinen Status auf dieselbe Weise; der Adapter fragt ihn ebenfalls beim Verbindungsaufbau und bei jeder Statusaktualisierung ab.

```text
ioBroker (this adapter) ──LAN: Tuya protocol 3.3, TCP 6668──► WL-433 ──LoRa 433 MHz──► PW01 / PW02
```

**Benutzerhandbuch** mit Schritt-für-Schritt-Anleitung für Anfänger (Installation, Einstellungen, Zonen, Timer, Beispiele, Fehlerbehebung): [Englisch](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Manual_miboxer-wl433.pdf)) · [Deutsch](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Handbuch_miboxer-wl433.pdf)).

Die Hintergrundrecherche (Protokollanalyse, Quellen, Testplan, dekodierter Datenpunkt 101) ist auf Deutsch verfügbar: [doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.pdf)). Eine Anfängeranleitung zur Anbindung der Lampen an das Gateway: [doc/Guide_connect_PW01_to_WL-433.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Guide_connect_PW01_to_WL-433.pdf); Deutsch: [PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Anleitung_PW01_mit_WL-433_verbinden.pdf)).

### Unterstützte Hardware
| Gerät | Rolle | Status |
| --- | --- | --- |
| MiBoxer WL-433 LoRa 433 MHz Gateway | Erforderlich, der Adapter wird daran angeschlossen | Getestet mit einem realen Gateway (Tuya-Protokoll 3.3, Datenpunkt 101) |
| MiBoxer PW01 (27 W RGB+CCT PAR56) | Poolbeleuchtung, mit dem Gateway verbunden | Zielgerät |
| MiBoxer PW02 (18 W RGB+CCT PAR56) | Poolleuchte, mit dem Gateway verbunden | Gleiche Produktfamilie, funktioniert voraussichtlich |
| Andere MiBoxer LoRa 433 MHz Lampen (UW01, UW02, UW03, RD-9L) | Mit dem Gateway verbundene Lampen | Nicht getestet |

### Voraussetzungen
1. Das Gateway wird in der MiBoxer-App eingerichtet und die Lampen werden damit verbunden.
2. **Geräte-ID und lokaler Schlüssel** des Gateways. Der Hersteller unterstützt die Tuya-Entwicklerplattform nicht für das Gateway.

WL-433, aber die MiBoxer-App schreibt beide Werte in ihr Debug-Log: Unter Android lesen Sie das Log mit einem Logcat-Viewer wie *LogFox*, während die App startet und das Gateway steuert. **Der lokale Schlüssel ändert sich bei jeder erneuten Kopplung des Gateways** - er muss dann erneut ausgelesen und eingegeben werden. Eine Schritt-für-Schritt-Anleitung für Anfänger (für Android, iPhone und iPad): [doc/Guide_device-ID_and_local-key.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md) ([PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Guide_device-ID_and_local-key.pdf); Deutsch: [doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md)).

3. Das Gateway ist von ioBroker aus erreichbar (gleiches Netzwerk). Eine DHCP-Reservierung für das Gateway wird empfohlen; falls keine IP-Adresse zugewiesen wird, …

Sobald die Adresse konfiguriert ist, findet der Adapter das Gateway über seine UDP-Broadcasts (Ports 6666/6667).

4. **Tuya-Geräte akzeptieren üblicherweise nur eine lokale Verbindung.** In einem Test wurden die MiBoxer-App und der Adapter verbunden.

gleichzeitig, aber wenn die Verbindung immer wieder fehlschlägt, schließen Sie die App auf Telefonen im selben Netzwerk und steuern Sie das Gateway nicht gleichzeitig mit anderen lokalen Integrationen (ioBroker.tuya, Home Assistant, tinytuya).

### Konfiguration
Die Instanzeinstellungen haben zwei Registerkarten: **Gateway** (Verbindungs- und Zonensteuerung) und **Timer** (siehe [Timer](#timers)).

| Einstellungen (Registerkarte Gateway) | Beschreibung |
| --- | --- |
| Geräte-ID | Tuya-Geräte-ID des WL-433-Gateways |
| Lokaler Schlüssel | 16-stelliger Tuya-Lokalschlüssel (verschlüsselt gespeichert) |
| IP-Adresse des Gateways | Feld leer lassen, um das Gateway im lokalen Netzwerk automatisch zu finden |
| Tuya-Protokollversion | 3.3 für WL-433 (3.1, 3.4 und 3.5 sind auswählbar) |
| Gateway im lokalen Netzwerk suchen | Schaltfläche: Findet das Gateway anhand seiner Geräte-ID und füllt IP-Adresse und Protokollversion automatisch aus. Ohne Geräte-ID werden alle gefundenen Tuya-Geräte aufgelistet. |
| Wiederverbindungsverzögerung | Sekunden, bis eine verlorene oder fehlgeschlagene Verbindung erneut versucht wird (Standard: 30) |
| Statusaktualisierungsintervall | Sekunden zwischen vollständigen Statusanfragen (Standard 60, 0 = nur die vom Gateway gesendeten Aktualisierungen verwenden) |
| Zonensteuerung | *Zonenauswahl* (Standard) oder *ein Kanal pro Zone*, siehe [Zonen](#zones) |

### Zonen
Das Gateway steuert bis zu 8 Zonen (wie die Fernbedienung FUT086). Jeder Befehl kann an eine oder alle Zonen gesendet werden, das Gateway meldet jedoch **nur einen Status für alle Lampen: die letzte Einstellung, unabhängig von der Zone, an die der Befehl gesendet wurde**. Auch die MiBoxer-App zeigt keinen separaten Status pro Zone an. Die Einstellung *Zonensteuerung* bietet zwei Varianten:

| Variante | Bundesstaaten | Geeignet für |
| --- | --- | --- |
| **Zonenauswahl** (Standard) | `light.*` zeigt den Status des Gateways an. `light.zone` (0 = alle Zonen, 1-8) wählt die Zone aus, an die die Befehle von `light.*` gesendet werden. | Die meisten Benutzer: Jeder Status zeigt die Meldungen des Gateways an. |
| **Ein Kanal pro Zone** | `light.*` zeigt den Status des Gateways an und sendet ihn an alle Zonen. Zusätzlich steuern `zones.zone1` … `zones.zone8` jede Zone separat. Ein Zonenkanal zeigt die zuletzt an diese Zone gesendeten und vom Gateway bestätigten Werte an; er bleibt leer, bis Daten an die Zone gesendet wurden. | Skripte und Visualisierungen, die Zonen direkt ansprechen |

Wenn die Einstellung geändert wird, werden die Zustände der anderen Variante gelöscht.

### Timer
Der Tab **Timer** in den Instanzeinstellungen bietet Platz für bis zu **50 Timer**. Diese laufen lokal im Adapter, auch ohne Internetverbindung, und bieten mehr Funktionen als die Timer der MiBoxer-App: Sonnenereignisse mit Offset, zufällige Verschiebung, Jahreszeiten, Zonen, Farben, Szenen und automatisches Abschalten nach einer bestimmten Zeit. Timer lassen sich mit dem **+**-Symbol hinzufügen, bearbeiten, kopieren oder löschen. Änderungen werden nach dem Speichern der Einstellungen (Neustart der Instanz) wirksam.

| Feld | Beschreibung |
| --- | --- |
| Aktiv | Schaltet diesen Timer aus, ohne ihn zu löschen |
| Name | Wird im Protokoll und in `timers.overview` angezeigt |
| Auslöser | *Tageszeit* oder Sonnenereignis: Morgendämmerung, Sonnenaufgang, goldene Stunde (Abend), Sonnenuntergang, Abenddämmerung, Nacht |
| Tageszeit | Nur für den Auslöser *Tageszeit* |
| Offset | Minuten (−720 bis 720), negativ = früher - z. B. Sonnenuntergang −15 |
| Zufällige Verschiebung | Bis zu ± Minuten (0-120), für jeden Durchlauf neu berechnet - für eine Präsenzsimulation |
| Saison von / bis | `DD.MM.`, z. B. `01.05.` bis `30.09.`; eine Saison über das neue Jahr (`01.11.` bis `28.02.`) funktioniert ebenfalls; leer = ganzes Jahr |
| Saison von / bis | `TT.MM.`, z. B. `01.05.` bis `30.09.`; eine Saison über das neue Jahr (`01.11.` bis `28.02.`) funktioniert ebenfalls; leer = ganzes Jahr |
| Zone | Alle Zonen oder Zone 1-8 |
| Aktion | Ein-/Ausschalten, Weißlicht (Farbtemperatur 2700-6500 K), Farbe, Szene M1-M9, nur Helligkeit |
| Helligkeit | 1-100 %, leer = unverändert (nicht für *Ausschalten*) |
| Ausschalten nach | Minuten (0-1440), 0 = nicht ausschalten (nicht für *Ausschalten*) |

- **Sonnenereignisse** werden anhand der Position in den ioBroker-Systemeinstellungen (Breitengrad und Längengrad) berechnet mit

[Sonnenrechner](https://github.com/mourner/suncalc). Ohne Positionsangabe werden diese Timer ignoriert und eine Warnung ausgegeben. An Tagen ohne Ereignis (Polarregionen) läuft der Timer nicht.

- Ein Timer sendet die gleichen Befehle wie die Zustände: im Zonenmodus *Zonenauswahl* an seine Zone (`light.zone` ist nicht

geändert), im Modus *ein Kanal pro Zone* bis `zones.zone<n>` (alle Zonen: `light.*`). Das Gateway bestätigt sie wie jeden Befehl.

- Wenn das Gateway zum Zeitpunkt des Ablaufs eines Timers nicht verbunden ist, wird dieser Durchlauf übersprungen (Warnung im Protokoll) - er wird nicht wiederholt.

  später.

- Timer mit unvollständigen Einstellungen werden ignoriert; der Grund dafür wird im Protokoll und in `timers.overview` angegeben.
- Die angegebenen Zeiten sind die Ortszeiten des ioBroker-Systems; die Sommerzeit wird berücksichtigt.
Die **Timer der MiBoxer-App** werden in der Tuya-Cloud gespeichert und ausgeführt (sie schalten lediglich alle Zonen über die Cloud ein oder aus).

Datenpunkt 20 und Internetverbindung erforderlich). Der Adapter kann diese Werte weder lesen noch ändern, erkennt ihre Auswirkung aber im Status.
Beide Timer-Typen können gleichzeitig verwendet werden.

### Staaten
| Bundesland | Beschreibung |
| --- | --- |
| `info.connection` | Verbindung zum Gateway |
| `light.on` | Ein / Aus |
| `light.mode` | `white`, `colour` oder `scene` - Durch Schreiben wird der Modus umgeschaltet (Farbmodus mit dem letzten Farbton, Szenenmodus mit der letzten Szene) |
| `light.brightness` | Helligkeit 1-100 % des aktuellen Modus. 0 schaltet aus, ein Wert über 0 schaltet ein |
| `light.colorTemperature` | Farbtemperatur 2700-6500 K in Schritten von 100 K (schaltet in den Weißmodus) |
| `light.color` | Farbe wie `#rrggbb` bei voller Helligkeit (schaltet in den Farbmodus). Beim Schreiben werden Farbton und Sättigung festgelegt, die Helligkeit des RGB-Wertes wird ignoriert - verwenden Sie `light.brightness` |
| `light.hue` | Farbton 0-360° (schaltet in den Farbmodus) |
| `light.saturation` | Sättigung 0-100 % (schaltet in den Farbmodus) |
| `light.scene` | Szene 1-9 (M1-M9 in der App), 0 = keine Szene. Durch Eingabe von 1-9 wird die Szene gestartet. |
| `light.speedUp` / `light.speedDown` | Tasten S+ / S- der App: Szene schneller / langsamer. Das Gateway meldet die Geschwindigkeit nicht. |
| `light.countdown` | Sekunden bis das Gateway die Lampen umschaltet (0 = aus, Standarddatenpunkt 26) |
| `light.zone` | Nur mit dem Zonenselektor: Zone der `light.*` Befehle, 0 = alle Zonen, 1-8 |
| `zones.zone<n>.*` | Nur mit einem Kanal pro Zone: `on`, `mode`, `brightness`, `colorTemperature`, `color`, `hue`, `saturation`, `scene`, `speedUp`, `speedDown` für Zone n |
| `settings.dmxAddress` | Startadresse 1-512 des DMX512-Eingangs des Gateways - von dort werden 5 Kanäle verwendet: Rot, Grün, Blau, Kaltweiß, Warmweiß (Menü *DMX* in der App). Das Schreiben sendet es an die Zone `light.zone` (Zonenauswahl) oder an alle Zonen; das Gateway bestätigt dies. |
| `timers.active` | `false` pausiert alle Timer (z. B. während Feiertagen oder durch ein Skript), `true` startet sie wieder |
| `timers.nextRun` | Nächster Timerlauf mit dem Namen des Timers (`paused (…)` während `timers.active` `false` ist) |
| `timers.lastRun` | Letzter Timerlauf mit Name und Aktion |
| `timers.overview` | JSON-Liste aller Timer: Zeitplan, Aktion, nächster Lauf, Grund, falls der Timer ignoriert wird |
| `dp101.raw` | Letzter Datenpunkt 101 Frame als Base64 - Schreiben sendet den Wert unverändert |
| `dp101.hex` | Letzter Datenpunkt 101 des Frames als Hex-Bytes - Schreiben sendet den Frame, die Prüfsumme wird automatisch hinzugefügt oder korrigiert |
| `dp101.checksumValid` | Die Prüfsumme des letzten Frames ist gültig |
| `dp101.history` | JSON-Liste der letzten 50 Frames (`rx` = empfangen, `tx` = gesendet) mit Zeitstempel; wiederholte identische Statusantworten werden nicht hinzugefügt |
| `raw.dp<n>` | Jeder weitere vom Gateway gemeldete Datenpunkt wird automatisch erstellt (beschreibbar) |
| `raw.dp<n>` | Jeder weitere vom Gateway gemeldete Datenpunkt wird automatisch erstellt (beschreibbar). |

Werte, die einen Modus erfordern oder das Einschalten der Beleuchtung notwendig machen, werden wie in der MiBoxer-App gesendet: Beispielsweise schaltet eine Farbtemperaturänderung im Farbmodus zunächst in den Weißmodus, eine Helligkeitsänderung bei ausgeschalteter Beleuchtung schaltet diese zunächst ein. Schnelle Änderungen (z. B. über einen Schieberegler) werden zusammengefasst, wobei nur der letzte Wert gesendet wird. Befehle werden nur akzeptiert, solange eine Verbindung zum Gateway besteht. Ein Befehl gilt als ausgeführt, sobald der nächste Status des Gateways seine Werte anzeigt (ca. 2,5 Sekunden später); bis dahin wird der Status nicht bestätigt.

### Datenpunkt 101 - Protokoll
Der WL-433 überträgt Lampen, Zonen und Szenen im herstellerspezifischen Datenpunkt 101: 12-Byte-Frames, Base64-kodiert, wobei das letzte Byte die 8-Bit-Summe der Bytes 0-10 ist. Das Format wurde am 22.09.2026 aus den Status-Frames eines realen Gateways und den Befehlen, die die MiBoxer-App in ihr Android-Protokoll schreibt, dekodiert:

| Frame | Bytes (hex) | Bedeutung |
| --- | --- | --- |
| Befehl (App / Adapter → Gateway) | `41 00 00 0B cc vv vv vv vv zz 80 ss` | `cc` Befehl: `01` Farbton 0-255 (Wert in Bytes 5-8, schaltet in den Farbmodus), `02` Helligkeit 1-100 %, `03` Farbtemperatur 0-38 (2700 K + 100 K pro Schritt), `04` Sättigung 0-100 %, `05` Szene 1-9, `06` Taste (`01` ein, `02` aus, `03` S-, `04` S+, `06` Weißmodus); `zz` Zone: `00` Alle, `01`-`08` |
| Status (Gateway → App) | `42`/`44` `00 00 00 mm hh tt bb ss 0B dd xx` | `42` Änderungsbericht (ca. 2,5 s nach der letzten Änderung), `44` Antwort auf die Anfrage; `mm` Modus: `00` Aus, `01` Farbe, `02` Weiß, `03`-`0B` Szene 1-9; `hh` Farbton, `tt` Farbtemperaturschritt, `bb` Helligkeit, `ss` Sättigung (0 im Weißmodus), `dd` niedrigstes Byte der DMX-Startadresse. Die Zone ist nicht Teil des Status. |
| DMX-Startadresse | `49 00 00 0B 02 aa aa 00 00 zz 80 ss` | `aa aa` Adresse 1-512 (höchstes Byte, niedrigstes Byte), `zz` Zone; Antwort `49 00 00 0B 02 01 tt bb ss aa aa xx` |
| DMX-Startadresse | `49 00 00 0B 02 aa aa 00 00 zz 80 ss` | `aa aa` Adresse 1-512 (höchstes Byte, niedrigstes Byte), `zz` Zone; Antwort `49 00 00 0B 02 01 tt bb ss aa aa xx` |

Die Taste `06 05` schaltet die Lichter ebenfalls aus (beim zweiten Mal bleiben sie aus, es handelt sich nicht um einen Schalter); die Funktion im Vergleich zu `06 02` ist noch unbekannt, da der Adapter sie nicht verwendet. Die Standard-Datenpunkte 20-23 werden vom Gateway aus diesen Befehlen abgeleitet; der Adapter verwendet nur Datenpunkt 20 (Ein/Aus, wird vor dem Status gemeldet) und richtet sich für alle anderen Werte nach dem Statusdatenpunkt 101. Das Schreiben des Tuya-Farbdatenpunkts 24 ändert die Farbe der Lampen nicht - die MiBoxer-App verwendet ihn ebenfalls nicht.

Direkter Zugriff für eigene Experimente: `dp101.hex` akzeptiert 11 Bytes (die Prüfsumme wird angehängt), z. B.

`43 00 00 80 00 00 00 00 00 80 80` fordert den Status an.

### Einschränkungen
- Das Gateway meldet einen Status für alle Lampen (die letzte Einstellung) und nicht den Status jeder einzelnen Zone - siehe [Zonen](#Zonen).
- Die Geschwindigkeit einer Szene (S+ / S-) wird vom Gateway nicht gemeldet.
- Ob eine Lampe tatsächlich einen Befehl über LoRa empfangen hat, kann nicht gesehen werden: Der Status wird vom Gateway bereitgestellt.
Das Gateway meldet seinen Status weiterhin an die Tuya-Cloud. Eine vollständige Blockierung des Internetzugangs könnte dies verhindern.

unzuverlässig. Die Timer der MiBoxer-App benötigen die Cloud, die Timer des Adapters nicht.

### Protokollierung und Debugging
Der Adapter protokolliert nach einem festen Konzept, daher ist ein Protokolleintrag jederzeit für die Fehlersuche sinnvoll:

| Ebene | Was wird protokolliert? |
| --- | --- |
| Fehler | Konfigurationsfehler, die den Adapter stoppen (Geräte-ID fehlt, lokaler Schlüssel nicht 16 Zeichen lang) |
| Warnung | Probleme, auf die Sie reagieren müssen - werden nur einmal gemeldet und nur auf Debug-Ebene wiederholt, bis sie behoben sind: Gateway verweigert Verbindungen, Daten, die nicht dekodiert werden können (falscher lokaler Schlüssel), Befehle, die das Gateway nicht bestätigt hat, Statusabfragen, die nicht beantwortet werden, unerwartete Datenpunktwerte oder Statusframes, Timer mit unvollständigen Einstellungen oder ohne Position für Sonnenereignisse, Timer, die die Lichter nicht schalten konnten, eine DMX-Startadresse, die das Gateway nicht bestätigt hat |
| Info | Meilensteine: Konfigurationsübersicht beim Start, Gateway gefunden, Verbindung hergestellt, Verbindung verloren, Verbindung wiederhergestellt, Objekte der anderen Zonenvariante entfernt, Anzahl aktiver Timer, Timer pausiert oder wieder aktiv |
| debug | Jeder Schritt mit seinen Eingaben, Entscheidungen und Dauern: Zustandsänderung → Übersetzung in Datenpunkt-101-Frames (mit Begründung für zusätzliche Frames wie z. B. „Schalter zuerst einschalten“) → Befehlswarteschlange → Senden → Bestätigung durch den Status (oder welcher Wert noch fehlt), jeder empfangene Datenpunkt und Status sowie die von ihm aktualisierten Zustände, Statusabfragen, Erkennung, jeder Timer mit seinem Zeitplan, nächster Lauf (Sonnenereignis, Offset, zufällige Verschiebung) und Ausführung. Befehle (`#12`) und Verbindungsversuche (`Attempt #3`) sind nummeriert, sodass alle Zeilen eines Befehls verfolgt werden können. |
| albern | Zusätzlich die Protokollaufzeichnung der tuyapi-Bibliothek (Pakete, Ping/Pong) mit dem Tag `[tuyapi]` |

Jede Nachricht beginnt mit einem Komponenten-Tag: `[cfg]` Konfiguration, `[conn]` Verbindung, `[rx]` Gateway → Zustände, `[cmd]` Zustände → Befehle, `[queue]` Befehlswarteschlange, `[poll]` Statusaktualisierung und Statusabfrage, `[disc]` Erkennung, `[dp101]` Rohdaten, `[timer]` Timer, `[unload]` Herunterfahren, `[tuyapi]` Bibliotheks-Trace. Der lokale Schlüssel und die Sitzungsschlüssel werden im Protokoll nicht angezeigt - die Konfigurationszusammenfassung zeigt lediglich die Schlüssellänge an.

So ändern Sie die Protokollierungsstufe: Admin → **Instanzen** → Expertenmodus → Protokollierungsstufe `miboxer-wl433.0` → `debug` (oder `silly` für die Protokollverfolgung; starten Sie die Instanz anschließend neu). Bitte fügen Sie Ihrer Problembeschreibung ein Debug-Protokoll und den Inhalt von `dp101.history` bei.

## Entwicklung
`npm run build` kompiliert die TypeScript-Quellen, `npm test` führt die Unit- und Pakettests aus. `npm run test:e2e` testet den Adapter in einer temporären ioBroker-Installation gegen ein simuliertes WL-433-Gateway (Tuya-Protokoll 3.3 auf `127.0.0.1:6668`, UDP-Broadcasts auf Port 6667, Datenpunkt-101-Befehle und Status wie beim realen Gateway) - diese Ports müssen frei sein.

Lokales Testsystem mit [Entwicklungsserver](https://github.com/ioBroker/dev-server) (Admin auf Port 8091):

```bash
npx dev-server setup --adminPort 8091 --symlinks   # once, creates .dev-server/
npm run simulator                                   # optional: simulated WL-433 in a second terminal
npm run dev-server watch                            # starts ioBroker + adapter, restarts on code changes
```

Admin: `http://<IP of the development machine>:8091` (Der Entwicklungsserver lauscht lokal auf allen Schnittstellen unter <http://127.0.0.1:8091>). Konfigurieren Sie die Instanz ohne reale Hardware mit den von `npm run simulator` ausgegebenen Werten (Geräte-ID, lokaler Schlüssel, IP `127.0.0.1`). `npm run dev-server debug` startet den Adapter mit einem Inspektor für den VS Code-Debugger.

## Dokumentation
Übersetzte Dokumentation:

- 🇩🇪 [Deutsche Dokumentation](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/de/README.md)
- 🇷🇺 [Dokumente auf Russisch](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/ru/README.md)
- 🇳🇱 [Nederlandse documentatie](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/nl/README.md)
- 🇫🇷 [Documentation française](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/fr/README.md)
- 🇮🇹 [Italienische Dokumentation](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/it/README.md)
- 🇪🇸 [Dokumentation auf Spanisch](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/es/README.md)
- 🇵🇱 [Polnisches Dokument](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/pl/README.md)
- 🇵🇹 [Portugiesische Dokumentation](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/pt/README.md)
- 🇺🇦 [Документація українською](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/uk/README.md)
- 🇨🇳 [简体中文文档](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/zh-cn/README.md)

Quellenangaben: Die Prüfsumme von Datenpunkt 101 und die ersten veröffentlichten Frames stammen aus der tinytuya-Diskussion [#623](https://github.com/jasonacox/tinytuya/discussions/623) (Benutzer *Silverstar* und *uzlonewolf*). Sonnenereignisse wurden mit [Sonnenrechner](https://github.com/mourner/suncalc) von Vladimir Agafonkin berechnet (BSD-2-Clause-Lizenz).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.2 (2026-11-02)

- (ssbingo) English versions of the beginner guides (device ID and local key, linking PW01 lamps to the gateway); the guide button in the instance settings opens the guide in English or, with German admin language, in German; dependency updates

### 0.2.1 (2026-09-22)

- (ssbingo) Object names in all 11 languages of the admin (object check E6001 of the ioBroker repository); existing objects are updated at the next start

### 0.2.0 (2026-09-22)

- (ssbingo) Local timers in the new tab *Timers* of the instance settings (up to 50): time of day or sun event with offset and random shift, weekdays, season, zone, every light action and switching off after a duration; states `timers.active`, `timers.nextRun`, `timers.lastRun` and `timers.overview`
- (ssbingo) DMX start address of the gateway's DMX512 input readable and writable (`settings.dmxAddress`)
- (ssbingo) Documented: DMX command, key `06 05`, cloud timers of the MiBoxer app; manuals with a new timer chapter

### 0.1.0 (2026-09-22)

- (ssbingo) Datapoint 101 decoded: lamps, zones and scenes are now controlled with the gateway's own commands (the colour could not be set before), the status is read from datapoint 101 and requested actively
- (ssbingo) New states: hue, saturation, scene M1–M9, buttons S+ / S-; zones selectable in the settings as zone selector (`light.zone`) or one channel per zone
- (ssbingo) Commands are confirmed by the status of the gateway, a warning is logged if the gateway does not confirm them; detailed debug output for every step
- (ssbingo) German and English user manual for beginners

### 0.0.1 (2026-09-21)

- (ssbingo) Initial release: local control of the WL-433 gateway via the Tuya LAN protocol (on/off, mode, brightness, colour temperature, colour, countdown), raw access to datapoint 101 with checksum handling and gateway search in the local network, detailed component-tagged debug logging with correlation IDs and durations (secrets are never logged)

Older changelog entries can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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