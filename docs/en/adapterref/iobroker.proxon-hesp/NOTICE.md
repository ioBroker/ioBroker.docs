---
chapters: {"pages":{"en/adapterref/iobroker.proxon-hesp/README.md":{"title":{"en":"ioBroker.proxon-hesp"},"content":"en/adapterref/iobroker.proxon-hesp/README.md"},"en/adapterref/iobroker.proxon-hesp/README.de.md":{"title":{"en":"ioBroker.proxon-hesp"},"content":"en/adapterref/iobroker.proxon-hesp/README.de.md"},"en/adapterref/iobroker.proxon-hesp/NOTICE.md":{"title":{"en":"Sources and acknowledgements"},"content":"en/adapterref/iobroker.proxon-hesp/NOTICE.md"}}}
---
# Sources and acknowledgements

*German version below / Deutsche Fassung weiter unten.*

This adapter is an independent community project and not affiliated with Zimmermann
Lüftungs- und Wärmesysteme. "PROXON" is a trademark of its owner.

Knowledge about the protocol and the data points comes from the following sources:

- **Markus Mauch – "Proxon P-Serie · HESP-Bus"**, https://markusmauch.github.io/proxon-hesp/
  Content licensed under Creative Commons Attribution 4.0 International (CC BY 4.0),
  https://creativecommons.org/licenses/by/4.0/
  Taken over, adapted and extended for this adapter: telegram structure, type nibble, meta data points,
  temperature sensor names, bypass, filter remaining time.
- **David Nierhaus – proxon-hesp-homeassistant**, https://github.com/DNier/proxon-hesp-homeassistant
  (MIT license): mappings for, among others, the temperature block 0x03B7, fan control and
  fan curves, fan level status words 0x0208, operating hours, calendar/time
  0x032E/0x0330, valve indicators 0x006C, heat pump thresholds 0x0115/0x011C, length field overflow for 128-byte replies.
  Its byte-wise checksum recursion is mathematically identical to the CRC-16 formulation
  used here (polynomial 0x8048 reflected, 16 shift steps per byte).
  Only the mappings (meaning of the data points) were taken over, no program code.
  Copyright notice of the project:

  > MIT License
  >
  > Copyright (c) 2026 David Nierhaus
  >
  > Permission is hereby granted, free of charge, to any person obtaining a copy
  > of this software and associated documentation files (the "Software"), to deal
  > in the Software without restriction, including without limitation the rights
  > to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  > copies of the Software, and to permit persons to whom the Software is
  > furnished to do so, subject to the following conditions:
  >
  > The above copyright notice and this permission notice shall be included in all
  > copies or substantial portions of the Software.
  >
  > THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  > IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  > FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  > AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  > LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  > OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  > SOFTWARE.
- Own bus captures and read queries on one installation (FWT 2-R, BDE Comfort) with room modules (addresses 10–15) and an air quality sensor (address 40, reports itself as "LQS-CO2RH…").

All mappings are based on observations, not on manufacturer documentation.

The manufacturer information (trademark PROXON, Zimmermann Lüftungs- und Wärmesysteme) only describes
which devices the adapter works with. Manufacturer documents are not part of this project.

---

## Quellen und Danksagung (Deutsch)

Dieser Adapter ist ein unabhängiges Community-Projekt und nicht mit Zimmermann
Lüftungs- und Wärmesysteme verbunden. „PROXON“ ist eine Marke ihres Inhabers.

Protokoll- und Datenpunktwissen stammt aus folgenden Quellen:

- **Markus Mauch – „Proxon P-Serie · HESP-Bus“**, https://markusmauch.github.io/proxon-hesp/
  Inhalte lizenziert unter Creative Commons Namensnennung 4.0 International (CC BY 4.0),
  https://creativecommons.org/licenses/by/4.0/deed.de
  Übernommen und für diesen Adapter angepasst und ergänzt: Telegrammaufbau, Typ-Nibble, Meta-Datenpunkte,
  Temperaturfühler-Namen, Bypass, Filter-Restlaufzeit.
- **David Nierhaus – proxon-hesp-homeassistant**, https://github.com/DNier/proxon-hesp-homeassistant
  (MIT-Lizenz): Zuordnungen u. a. für Temperaturblock 0x03B7, Lüfteransteuerung und
  -kennlinien, Lüfterstufen-Statuswörter 0x0208, Betriebsstunden, Kalender/Uhrzeit
  0x032E/0x0330, Ventilanzeigen 0x006C, WP-Schwellen 0x0115/0x011C, Längenfeld-Überlauf bei 128-Byte-Antworten.
  Dessen byteweise Prüfsummen-Rekursion ist mathematisch identisch mit der hier
  verwendeten CRC-16-Formulierung (Polynom 0x8048 reflektiert, 16 Schiebeschritte je Byte).
  Übernommen wurden die Zuordnungen (Bedeutung der Datenpunkte), kein Programmcode.
  Copyright-Hinweis des Projekts:

  > MIT License
  >
  > Copyright (c) 2026 David Nierhaus
  >
  > Permission is hereby granted, free of charge, to any person obtaining a copy
  > of this software and associated documentation files (the "Software"), to deal
  > in the Software without restriction, including without limitation the rights
  > to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  > copies of the Software, and to permit persons to whom the Software is
  > furnished to do so, subject to the following conditions:
  >
  > The above copyright notice and this permission notice shall be included in all
  > copies or substantial portions of the Software.
  >
  > THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  > IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  > FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  > AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  > LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  > OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  > SOFTWARE.
- Eigene Busmitschnitte und Lese-Anfragen an einer Anlage (FWT 2-R, BDE Comfort) mit Raummodulen (Adressen 10–15) und einem Luftqualitätssensor (Adresse 40, meldet sich als „LQS-CO2RH…“).

Alle Zuordnungen beruhen auf Beobachtungen, nicht auf Herstellerunterlagen.

Die Herstellerangaben (Marke PROXON, Zimmermann Lüftungs- und Wärmesysteme) dienen nur der Beschreibung,
mit welchen Geräten der Adapter zusammenarbeitet. Herstellerunterlagen sind nicht Teil dieses Projekts.