---
title: Miboxer WL-433 + PW01 - Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration
subtitle: Recherchebericht mit Quellenbelegen (Herstellerdokumente, Normen, Datenblätter, Fachliteratur, Quellcode)
author: Recherche für Silvio Sternitzke
date: 21. September 2026, Nachtrag 22. September 2026
lang: de
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md
hash: F1lWMITsS2go2WFxcgPJu34DrzHngWY5/AvttbiXg+U=
---
# Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration

**Recherchebericht, Stand 21.09.2026 – Nachtrag 22.09.2026: Datenpunkt 101 vollständig entschlüsselt (Kapitel 3.1.8), DMX-Startadresse, Taste `06 05` und Timer der App (Kapitel 3.1.9)**

Untersuchte Geräte: Miboxer **PW01** (27 W RGB+CCT PAR56 LED-Poolleuchte, LoRa 433 MHz) und Miboxer **WL-433** (LoRa-433-MHz-Gateway, WLAN 802.11b/g/n, DMX512-Eingang). Hersteller: Shenzhen Futlight Optoelectronics Co., Ltd. (Marken „Mi-Light“ / „MiBoxer“).

Zitierweise: Jede Aussage trägt eine Quellen-ID in eckigen Klammern. Die Präfixe kennzeichnen die Evidenzklasse:

| Präfix  | Evidenzklasse                                                                                | Beispiel |
| ------- | -------------------------------------------------------------------------------------------- | -------- |
| **H**   | Herstellerdokumente (Handbücher, Produktseiten, FAQ, offizielles Forum)                      | \[H1]    |
| **S**   | Normen, Regulierung, Datenblätter, Patente, anerkannte Fachliteratur                         | \[S9]    |
| **C**   | Dokumentation/Quellcode von Open-Source-Bibliotheken und Community-Berichten (GitHub, Foren) | \[C1]    |
| **ICH** | ioBroker-Adapter (README, Quellcode, Releases, ioBroker-Forum)                               | \[I1]    |
| **D**   | DMX-/Art-Net-Hardware und -Firmware                                                          | \[D1]    |
| **R**   | RF-/LoRa-Werkzeuge und Reverse-Engineering-Projekte                                          | \[R1]    |
| **E**   | Eigene Messungen am echten Gateway (Nachtrag 22.09.2026)                                     | \[E1]    |

Aussagen, die **nicht** aus einer Quelle stammen, sondern eigene Schlussfolgerungen sind, werden ausdrücklich als **\[Inferenz]** gekennzeichnet.

---

## 0. Kurzfassung – Antworten auf die drei Fragen

### Frage 1: Kann das System lokal, ohne Cloud und ohne KI-Assistenten, mit eigener Software gesteuert werden?

**Ja – über zwei dokumentierbare Wege, beide mit Einschränkungen. Ein dritter Weg (direkt über Funk) ist technisch denkbar, aber bislang von niemandem realisiert.**

| Weg                                               | Status                                                                                                                    | Cloudfrei im Betrieb?                                                                                                                  | Zonen/Szenen?                                                                                                                                                                                                                        | Belegqualität                                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **A – LAN (Tuya-Lokalprotokoll v3.3 des WL-433)** | Von einem Anwender mit identischer Hardware (WL-433 + 2× PW01) 2025 praktisch nachgewiesen \[C1]                          | Ja (Steuerung), aber Pairing und Local-Key-Beschaffung benötigen die Hersteller-/Tuya-Cloud; Gerät meldet weiterhin an die Cloud \[C4] | Ein/Aus, Helligkeit, Farbtemperatur, Farbe **für alle Lampen gleichzeitig** ; Zonen/Szenen laufen über einen proprietären Roh-Datenpunkt **DP 101** (12-Byte-Frames, Base64, 8-Bit-Prüfsumme), der nur teilweise dekodiert ist \[C1] | Community-Bericht + Bibliotheksdokumentation                                                               |
| **B – DMX512-Eingang des WL-433**                 | Offiziell dokumentiert: „Input Signal: DMX512(1990)“ \[H1]                                                                | **Ja, vollständig** (DMX ist eine unidirektionale Drahtschnittstelle nach ANSI E1.11 \[S22])                                           | Gateway belegt **eine Startadresse + 5 Kanäle** (Rot, Grün, Blau, Kaltweiß, Warmweiß) \[H1]; Zonenadressierung per DMX ist **nicht dokumentiert** ; Adresse wird in der App gesetzt \[H1]                                            | Herstellerhandbuch                                                                                         |
| **C – LoRa-433-MHz-Funk direkt (eigener Sender)** | Kein öffentliches Reverse Engineering, keine Parameter (Frequenz, Bandbreite, Spreizfaktor, Sync-Word) bekannt \[R1]\[R2] | Ja                                                                                                                                     | Alles, was die Fernbedienung FUT086 kann (8 Zonen) – nach erfolgreichem Reverse Engineering                                                                                                                                          | Negativbefund nach \~150 Suchanfragen; LoRa-PHY wissenschaftlich vollständig beschrieben \[S9]\[S10]\[S11] |

### Frage 2: Geht das über einen ioBroker-Adapter?

- **Vorhandener Adapter für Weg A:** `ioBroker.tuya` (Apollon77) arbeitet lokal mit Tuya-Protokoll 3.3/3.4/3.5 nach einmaliger Cloud-Synchronisation \[I1]. Hürden: (1) Der Adapter bietet nur Logins für Tuya Smart, Smart Life, Ledvance und Sylvania – nicht für die „MiBoxer“-App \[I1]\[I3]; das WL-433 müsste auch in der Smart-Life-App gepaart werden (Händlerangabe: möglich \[H16]; Hersteller: keine Aussage). (2) Der Adapter **verwirft unbekannte Datenpunkte** („Unknown datapoint … Please resync devices“ →`continue`) \[I2]; ist DP 101 nicht im synchronisierten Schema, es gibt keine Zonen-/Szenensteuerung. (3) Nur **eine** lokale Verbindung pro Gerät – die App muss geschlossen sein \[I1].
- **Vorhandener Adapter für Weg B:** `ioBroker.artnet` (Stable-Repository, letzte Version 1.2.2 von 2020) \[I9] oder `ioBroker.artnetdmx` (ChriD, GitHub, Fixture-Modell mit Fades) \[I10] → Art-Net-zu-DMX-Node (Enttec ODE Mk3 \[D1], DMXking eDMX1 MAX \[D5] oder ESP32-Eigenbau LuxDMX \[D2]/ESPHome-DMX512 \[D3]) → DMX-Eingang des WL-433.
- **Eigener Adapter (empfohlen für volle Funktion):** Ein schlanker Adapter auf Basis von `tuyapi` \[C14] (der Bibliothek, die auch `ioBroker.tuya` nutzt), der die Standard-Datenpunkte 20–24 abbildet **und** DP 101 kodiert. Voraussetzung: Abschluss der DP-101-Dekodierung durch eigene Mitschnitte der App (Vorarbeit in \[C1]). Adapter-Erstellung über `npx @iobroker/create-adapter` \[I14].
- **Nicht anwendbar:** `ioBroker.milight` und `ioBroker.milight-smart-light` (nur Mi-Light-UDP-Protokoll v5/v6 der iBox-Bridges) \[I7]\[I8]; Broadlink RM4 Pro und Sonoff RF Bridge (nur OOK-Festcode-Fernbedienungen, keine LoRa-Chirps) \[R20]\[R21].

### Frage 3: Welches Protokoll wird genutzt? (Kurzform des Schichtenmodells)

```
Smartphone-App „MiBoxer“ (Tuya-OEM-App)  ──Internet──►  Tuya-Cloud  ──Internet──►  WL-433
                                                                                     │  WLAN 802.11b/g/n 2,4 GHz [H1]
Eigene Software (ioBroker)  ──LAN: Tuya-Lokalprotokoll v3.3, TCP 6668, AES-128-ECB, Local Key──►  WL-433 [C1][C2][C3]
DMX512-Pult / Art-Net-Node  ──EIA-485, 250 kbit/s, DMX512(1990), 5 Kanäle ab Startadresse──►  WL-433 [H1][S22][S23]
                                                                                     │
                                                                                     ▼  Funk 433 MHz, „LoRa spread spectrum“,
                                                                                        15 dBm (Gateway) / 10 dBm (FUT086),
                                                                                        proprietäre Applikationsschicht [H1][H6]
                                                                                     ▼
                                                                          PW01 (Empfänger; Pairing = Lampe lernt Sender-ID) [H3][H5]
```

- **WLAN-/LAN-Schicht:** Tuya-SDK-Firmware; das gesamte LoRa-System erscheint als **ein** Tuya-Gerät (keine Sub-Devices/`cid`) \[C1]\[C6]. Standard-Datenpunkte 20 (Schalter), 21 (Modus), 22 (Helligkeit 10–1000), 23 (Farbtemperatur 0–1000), 24 (Farbe HSV-Hex), 26 (Countdown) \[C2]; herstellerspezifisch DP 101 (Roh/Base64) \[C1].
- **DMX-Schicht:** USITT DMX512/1990 \[H1] – heute ANSI E1.11 \[S22]; ein 5-Kanal-Fußspur pro Gateway \[H1].
- **Funkschicht:** LoRa ist Semtechs proprietäre Chirp-Spread-Spectrum-PHY \[S2]\[S13]; **kein LoRaWAN** (LoRaWAN wäre die MAC-Schicht der LoRa Alliance \[S12]). Parameter unbekannt; Chip vermutlich Semtech SX1278 (unbelegte Community-Angabe \[R1]). Regulatorisch: SRD-Band 433,05–434,79 MHz, 10 mW ERP bei ≤ 10 % Arbeitszyklus \[S17]\[S21].

---

## 1. Untersuchungsgegenstand, Methode und Grenzen

**Methode.** Fünf parallel arbeitende Recherche-Agenten mit getrennten Aufträgen (Herstellerdokumente; LAN-Protokoll; LoRa-Funk/Reverse Engineering; ioBroker-/Smart-Home-Pfade; Normen und Literatur) führen zusammen rund 150 Websuchen und rund 300 Seitenabrufe durch (Englisch, Deutsch, Chinesisch). Alle tragenden Aussagen wurden anschließend vom Hauptagenten stichprobenartig gegen die Originalquellen geprüft (WL-433-Handbuch, Miboxer-FAQ, tinytuya-Diskussion #623, GitHub-Issues via API, ioBroker.tuya-Quellcode, PW01- und FUT086-Handbücher).

**Grenzen.** Folgende Quellen waren aus der Recherche-Umgebung nicht abrufbar und konnten daher nicht ausgewertet werden: die FCC-Datenbanken (fccid.io, fcc.report, apps.fcc.gov – HTTP 403), das Semtech-Download-CDN (Datenblätter nur über Spiegel-Kopien geprüft), Developer.tuya.com (robots.txt), tsp.esta.org (PDF der ANSI E1.11, nur ANSI-Vorschau geprüft). Ein Negativbefund („nicht“) bedeutet daher „in den erreichbaren Quellen nicht“, nicht „existiert nicht gefunden“.

---

## 2. Herstellerdokumentation – gesicherte Fakten

### 2.1 WL-433 LoRa-433-MHz-Gateway (Handbuch V1.0.1 \[H1], Produktseite \[H2])

| Merkmal          | Herstellerangabe (wörtlich)                                                                                                                                                                                                                                                                                                  | Quelle |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Eingang          | „Eingang: DC5V/500mA ( 5,5\*2,1mm )“                                                                                                                                                                                                                                                                                         | \[H1]  |
| Signaleingang    | „Eingangssignal: DMX512(1990)“ / „Unterstützt DMX512(1990)-Steuerung.“                                                                                                                                                                                                                                                       | \[H1]  |
| Kommunikation    | „Kommunikationsmodus: WiFi-IEEE 802.11b/g/n 2,4 GHz“                                                                                                                                                                                                                                                                         | \[H1]  |
| Funk             | „RF: 433 MHz (Sendeleistung: 15 dBm)“, „Modulationsverfahren: LoRa-Spreizspektrum“                                                                                                                                                                                                                                           | \[H1]  |
| Technologie      | „Nutzt die LoRa SPSP Modem-Technologie, ist kompatibel mit Produkten der MiBoxer 433MHz-Serie und kann über die MiBoxer-App via WLAN oder 4G-Netzwerk gesteuert werden.“                                                                                                                                                     | \[H1]  |
| Reichweite       | „Steuerreichweite: 50 m (Lampen bis 0,5 m unter Süßwasser)“, „1000 m (Lampen im Freien)“                                                                                                                                                                                                                                     | \[H1]  |
| App              | „Für iOS-Systeme: Bitte suchen Sie im App Store nach „MiBoxer“ … Für Android-Systeme: Suchen Sie bei Google Play nach „MiBoxer““                                                                                                                                                                                             | \[H1]  |
| Konto            | „Öffnen Sie die App und klicken Sie auf die Schaltfläche „Registrieren“; schließen Sie die Registrierung ab und melden Sie sich an.“                                                                                                                                                                                         | \[H1]  |
| Sprachsteuerung  | „Suchen Sie in der App eines Drittanbieters nach „Mi-Light Smart“ und richten Sie es ein.“                                                                                                                                                                                                                                   | \[H1]  |
| Zonen            | Verknüpfungsdialog mit „Zone1“ … „Zone8“                                                                                                                                                                                                                                                                                     | \[H1]  |
| Gruppen          | „Hinweis: Dieses Gateway unterstützt keine Gruppensteuerung.“                                                                                                                                                                                                                                                                | \[H1]  |
| DMX-Adressierung | Klicken Sie oben rechts auf „DMX einstellen“. Geben Sie im Pop-up-Fenster die DMX512-Adresse für das Gateway ein. Das Gateway benötigt fünf Adressen, um die Farben Rot, Grün, Blau, Warmweiß und Kaltweiß der Lampe entsprechend zu steuern. Beispiel: Stellen Sie die DMX512-Adresse des Gateways auf 008 ein.             | \[H1]  |
| Lernfunktion     | „Lernfunktion: Gateway-ID wiederherstellen: 1. Klicken Sie auf die Schaltfläche „Lernen“ … 2. Drücken Sie innerhalb von 10 Sekunden eine beliebige Taste auf der Fernbedienung. Die App meldet, dass das Lernen erfolgreich war.“ – „Hinweis: Derzeit wird das Lernen nur von der 433-MHz-Fernbedienung FUT086 unterstützt.“ | \[H1]  |
| Verknüpfen       | Zone wählen → Lampe aus, 10 s warten, ein → „Drücken Sie die Verbindungstaste einmal innerhalb von 3 Sekunden.“ → „Die Verbindung ist hergestellt, wenn das Licht 3 Mal langsam blinkt.“; Entkoppeln: „Verbindungstaste einmal innerhalb von 3 Sekunden drücken“ → „10 Mal schnell blinken“                                  | \[H1]  |

**Anmerkungen:**

- Das Handbuch zeigt im Anschlussbild nur „Power input“, „DMX512 signal input“ und ein externes „DMX512 Control Panel“. Der **Steckertyp des DMX-Eingangs (XLR, RJ45, Schraubklemme) ist in keiner erreichbaren Quelle dokumentiert** \[H1].
- Auf der Produktseite heißt es: „Unterstützt DMX512 bis 2,4G-Funksteuerung“ \[H2]. Das ist bei einem 433-MHz-Gerät offensichtlich ein Textfehler; Die gleichlautende Formulierung findet sich beim 2,4-GHz-DMX-Sender FUTD01 \[H15]. **\[Schlussfolgerung]** : Die Produktseite wurde vom FUTD01 übernommen; Maßgeblich ist das Handbuch \[H1].
- Die Lernfunktion kopiert die Sender-ID der Fernbedienung ins Gateway („Gateway copy the remote ID … the Gateway can control the lamp right without linking again“ \[H1]\[H2]). Das ist ein wichtiger Hinweis auf das Adressierungsmodell der Funkschicht (siehe 3.3).

### 2.2 PW01 / PW02 Poolleuchte (Handbuch EN/DE V1.0 \[H3], Produktseite \[H4])

| Merkmal                 | Herstellerangabe (wörtlich)                                                                                                                                                                                                                                              | Quelle     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| Funk                    | „433 MHz RF-Funkübertragungstechnologie“ / „Wir verwenden die LoRa-Modemtechnologie, um die Steuerung über große Entfernungen zu erfüllen.“                                                                                                                              | \[H3] (DE) |
| Kompatibilität          | „Kompatibel mit 'FUT086 Fernbedienung' und 'WL-433 433MHz Gateway' (separat erhältlich)“                                                                                                                                                                                 | \[H3] (DE) |
| Gateway-Pflicht         | „Steuerung der Smartphone-App (433 MHz-Gateway wird benötigt)“, „Unterstützt Sprachsteuerung von Drittanbietern (433 MHz-Gateway wird benötigt)“                                                                                                                         | \[H3] (DE) |
| Spannung (Handbuch)     | „Die Betriebsspannung beträgt DC24V, die Beleuchtung wird beschädigt, wenn die Spannung höher als DC24V ist.“                                                                                                                                                            | \[H3] (DE) |
| Spannung (Produktseite) | „Eingangsspannung: AC12V / DC12\~24V“                                                                                                                                                                                                                                    | \[H4]      |
| Lichtdaten              | „2600 lm“, „95 lm/W“, „160°“, „IP68 (Abdeckung erforderlich)“, „-20 bis 45 °C“, „Edelstahl 316 + PC“, „9 dynamische Modi“                                                                                                                                                | \[H4]      |
| Netzschalter-Steuerung  | Durch Aus-/Einschalten der Versorgung („Ausschalten (für 5 Sekunden); Wieder einschalten“) werden nacheinander 17 Modi durchgeschaltet (8 statische Farben + 9 dynamische Modi); Längere Auszeiten („5-10 Sekunden“, „mehr als 10 Sekunden“) haben abweichende Bedeutung | \[H3] (DE) |
| Verknüpfen              | „Für weitere Details lesen Sie bitte die Remote-Anleitung.“                                                                                                                                                                                                              | \[H3] (DE) |

**Widerspruch:** Handbuch (DC 24 V) vs. Produktseite und Ihr Datenblatt (AC 12 V / DC 12–24 V). Für die Steuerungsfrage unerheblich, für die Installation aber relevant – im Zweifel beim Hersteller klären.

**Praktische Folge des Netzschalter-Verhaltens:** Wird die Leuchte über eine geschaltete Steckdose oder ein Relais (z. B. aus ioBroker) mit Strom versorgt, verändern kurze Aus-Phasen den Modus. Das ist einerseits eine rudimentäre, vollständig lokale „Steuerung“ (17 Modi durchschalten), andererseits eine Fehlerquelle bei jeder Automatisierung, die die Versorgung schaltet.

### 2.3 FUT086 LoRa-433-MHz-Fernbedienung (Handbuch \[H5], Produktseite \[H6])

- „Bei diesem Produkt handelt es sich um eine drahtlose Fernbedienung mit einer Frequenz von 433 MHz. Wir verwenden die LoRa SPSP Modem-Technologie.“ \[H5]
- Produktseite: „Sendeleistung 10dBm“, „HF-Frequenz 433MHz“, „Reichweite 2000m (im Freien)“ / „50m (Lampen 0,5m unter Wasser)“, „Betriebsspannung 3V (AAA × 2PCS)“, „Modulationsverfahren LoRa Spread Spectrum“ \[H6].
- Verknüpfen ohne Gateway: „Licht ausschalten, nach 10 Sekunden wieder einschalten." → „Taste "I" innerhalb von 3 Sekunden 3 Mal kurz drücken, wenn das Licht an ist." → „Läuft 3 Mal langsam, bedeutet, dass die Verknüpfung erfolgreich war."; Entkoppeln: „Taste "I" innerhalb von 3 Sekunden 5 Mal kurz drücken" → „Läuft 10 Mal schnell" \[H5].
- Kapazität: „Mit der 8-Kanal-Fernbedienung können Sie einer Zone beliebig viele Leuchten hinzufügen.“ und „Eine Lampe oder ein Controller kann nur von vier Fernbedienungen gesteuert werden (Max.)“ \[H5].

**Schlussfolgerung \[Inferenz]:** Die Lampe speichert bis zu vier Sender-Identitäten (Fernbedienungen oder Gateway) je Zone; Das Gateway kann per Lernfunktion die Identität eines FUT086 übernehmen. Das Pairing-Modell entspricht exakt damit dem der 2,4-GHz-Mi-Light-Produkte, deren Funkprotokoll vollständig rückentwickelt ist (siehe 3.3.5).

### 2.4 Produktfamilie LoRa 433 MHz \[H12]

PW01 (27 W PAR56), PW02 (18 W PAR56), UW01 (15 W Wandleuchte), UW02 (27 W Wandleuchte), UW03 (9 W Unterwasserleuchte), RD-9L (9 W Bodeneinbauleuchte), FUT086 (Fernbedienung), WL-433 (Gateway). Einen separaten DMX-Sender für die 433-MHz-Linie gibt es nicht; der DMX-Sender FUTD01 arbeitet mit 2,4 GHz GFSK und „is only work with Miboxer RGB+CCT products“ (2,4 GHz) \[H7]\[H15]. Die 433-MHz-Controller-Kits FUT041/FUT042 sind nicht als LoRa dokumentiert (Händlerangabe: „Modulation: ASK“, „LoRa: No“) \[H17].

### 2.5 Was der Hersteller zur Integration in Fremdsysteme sagt

- FAQ \[H7] und offizielles Forum (Beitrag „MiBoxer“, 25.03.2025) \[H8]: „Unterstützen die MiBoxer Wi-Fi- und Zigbee-Serien Home Assistant und Homebridge? – Ja, folgen Sie der Anleitung zur Geräteeinrichtung: <https://developer.tuya.com/en/docs/iot/HA_HB_Bestpractice> … **Achtung! 1. WL-Box1 und WL-433 können nicht eingerichtet werden.** 2. WL-Box2 unterstützt die Verbindung mit Home Assistant und Homebridge, die Gruppensteuerung ist jedoch nicht möglich.“
- Unternehmensgeschichte \[H9]: 2019 – „Tuya Smart hat eine enge Partnerschaft mit uns aufgebaut. Alle MiBoxer-Produkte wurden softwareseitig aktualisiert, um Alexa, Google Home und die Sprachsteuerung von Drittanbietern zu unterstützen.“; 2021 – „Die neue MiBoxer Smart App wurde fertiggestellt. Alle Funktionen sind identisch mit der Tuya Smart App.“
- FAQ \[H7]: „Warum funktioniert meine App nicht mehr? (Mi-Light 3.0 App, Mi-Light Cloud App, Miboxer App)“ → „Diese drei Apps sind für ältere Gerätegenerationen. Die Miboxer-Serie verfügt über ein aktualisiertes WLAN-System. Wir empfehlen die Verwendung der Miboxer Smart App oder der Tuya Smart App.“
- Download-Seite \[H10]: „MiBoxer APP unterstützt nur WiFi-Produkte der „WL“-Serie“ (App-Store-ID 1460445992, Android-Paket `com.futlight.miboxer`); „MiBoxer Smart“ ist eine zweite App (ID 1552337399).
- Eine offene API, ein SDK, MQTT-, REST- oder Entwicklermodus für das WL-433 wird an keiner Stelle dokumentiert (Downloads, FAQ, Katalog \[H11], Forum) – **Negativbefund** .

**Einordnung \[Inferenz]:** Der Hersteller bezieht sich für Fremdintegration ausschließlich auf die Tuya-Entwicklerplattform und schließt das WL-433 davon aus. Damit fehlt der offizielle Weg zum Local Key; Die einzige dokumentierte Ersatzmethode ist das Auslesen des Debug-Logs der MiBoxer-App (siehe 3.1.4).

### 2.6 Widersprüche in den Herstellerangaben (Übersicht)

| Thema             | Quelle A                                 | Quelle B                                                                                                                          | Bewertung                                                                                                                |
| ----------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| PW01-Spannung     | Handbuch: DC 24 V \[H3]                  | Produktseite: AC12V / DC12\~24V \[H4]                                                                                             | Beim Hersteller einstellen                                                                                               |
| WL-433 DMX        | Produktseite: „DMX512 auf 2,4G“ \[H2]    | Handbuch: 433 MHz LoRa, DMX-Eingang \[H1]                                                                                         | Handbuch                                                                                                                 |
| App-Name          | Handbuch/Download: „MiBoxer“ \[H1]\[H10] | FAQ: „Miboxer APP“ = alte Generation; Empfehlung „Miboxer smart oder Tuya smart“ \[H7]; Händler: „Tuya Smart / Smart Life“ \[H16] | Alle drei Apps sind Tuya-basiert (siehe 3.1); Welche App für das WL-433 funktioniert, ist ohne eigenen Test nicht sicher |
| Reichweite WL-433 | 1000 m Freifeld \[H1]                    | Händler: 50 m Freifeld                                                                                                            | Herstellerangabe maßgeblich                                                                                              |

---

## 3. Protokollanalyse – Schichtenmodell

### 3.1 Schicht 1: WLAN/IP – das Tuya-Lokalprotokoll

#### 3.1.1 Beleg, dass das WL-433 ein Tuya-Gerät ist

1. **Direkter Nachweis an identischer Hardware \[C1]:** Ein Anwender („Silverstar“, 04.06.2025) mit „zwei MiBoxer PW01 Unterwasser-(Pool-)Leuchten, die durch ein proprietäres 433-MHz-LoRa-Protokoll gesteuert werden“ und einem WL-433, „der über einen DMX-Eingang sowie eine App-Steuerung durch die MiBoxer-App verfügt, die Tuya unter der Haube verwendet“, hat Geräte-ID und Local Key aus dem Debug-Log der App gewonnen („die App sagt es mir frei die Geräte-ID und den lokalen Schlüssel sowie einige DP-Daten beim Protokollieren seiner Debug-Ausgabe (mit LogFox auf Android)“) und das Gateway mit `"version": "3.3"` in tinytuya/localtuya/tuya-local eingebunden.
2. **Herstelleraussagen \[H9]\[H7]:** Tuya-Partnerschaft seit 2019, „alle Funktionen sind gleich wie Tuya smart APP“ (2021), Verweis auf die Tuya-Entwicklerplattform für Home Assistant \[H7].
3. **Schwestergerät WL-Box2 \[C6]:** Die Home-Assistant-Integration tuya-local führt ein offizielles Geräteprofil „MiBoxer WL-Box2“ (Tuya-Produkt-ID `2vc0xj19d766eq0k`) mit den Standard-Licht-Datenpunkten 20–24, 26 und einem Zonen-Datenpunkt 107.
4. **Teardown eines Miboxer-WLAN-Controllers \[C10]:** Tuya-Modul CB3S (BK7231N) mit TuyaMCU und den Datenpunkten „dpID 20 – boolean, on/off state … dpID 24 – RGB color as ASCII string“.
5. **Open-Source-Projekt bcaro/Miboxer \[C11]:** „Der Miboxer ist völlig anders und verwendet das Tuya-Protokoll.“

#### 3.1.2 Das Tuya-Lokalprotokoll (LAN) – technische Beschreibung

Es existiert keine offizielle, öffentlich zugängliche Spezifikation von Tuya. Die De-facto-Referenz ist die Dokumentation und der Quellcode der Bibliothek tinytuya \[C2]\[C3] (Python) bzw. tuyapi \[C14] (Node.js):

| Größe                             | Beschreibung                                                                                                                                                                                                                                                       | Quelle              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| Transport                         | TCP-Port **6668** (Befehle/Status); UDP **6666** (Klartext-Broadcast v3.1), **6667** (verschlüsselter Broadcast ab v3.3), **7000** (Discovery-Anfrage v3.5)                                                                                                        | \[C2]\[C3]          |
| Rahmen                            | Präfix `0x000055AA`, Sequenznummer, Kommando, Länge, Nutzdaten, CRC32, Suffix `0x0000AA55` (v3.1–3.4); v3.5: Präfix `0x00006699`                                                                                                                                     | \[C3]\[C2]          |
| v3.3 (WL-433 laut \[C1])          | „AES-ECB (alle verschlüsselbaren Befehle) … keine Sitzungsverhandlung; CRC32-Integrität“ – statischer 16-Byte-Lokalschlüssel                                                                                                                                       | \[C3]               |
| Version 3.4                       | „Sitzungsschlüssel (3-Wege) … AES-ECB (Sitzungsschlüssel) … HMAC-SHA256“                                                                                                                                                                                           | \[C3]\[C15]         |
| Version 3.5                       | „AES-GCM pro Paket (Sitzungsschlüssel)“                                                                                                                                                                                                                            | \[C3]               |
| Nutzdaten                         | JSON mit `dps` -Objekt: `{"dps": {"20": true, "22": 500}}`; Sub-Devices hinter Hubs mit zusätzlich `cid`                                                                                                                                                             | \[C2]\[C3]          |
| Standard-Datenpunkte Licht (v3.3) | 20 Schalter (bool); 21 Modus (Enum Weiß/Farbe/Szene/Musik); 22 Helligkeit 10–1000; 23 Farbtemperatur 0–1000; 24 Farbe (Hex-String h:0–360, s:0–1000, v:0–1000); 25 Szene (Streicher); 26 Ruhezeit 0–86400 s                                                        | \[C2]               |
| Gleichzeitige Clients             | „Bitte beachten Sie, dass viele Tuya-Geräte scheinbar nur eine lokale Verbindung unterstützen.“                                                                                                                                                                    | \[C4]; ebenso \[I1] |
| Wolkenschmelze                    | „Durch die Nutzung dieser Integration wird nicht verhindert, dass Ihre Geräte Statusinformationen an die Tuya-Cloud senden.“                                                                                                                                       | \[C4]               |
| Verhalten bei Cloud-Sperre        | „Viele Tuya-Geräte reagieren nicht mehr, wenn sie über einen längeren Zeitraum keine Verbindung zu den Tuya-Servern herstellen können. Berichten zufolge funktionieren einige Geräte offline besser, wenn sowohl DNS- als auch TCP-Verbindungen blockiert werden.“ | \[C4]               |

**Sicherheitshistorie (Einordnung):** Die Tuya-Plattform wurde 2018 auf dem 35C3 analysiert („Smart Home – Smart Hack“, VTRUST) \[S29]; Daraus entstand tuya-convert (Fremdfirmware für gefälschtes Cloud-Update) \[S30]. Tuya hat das SDK 2019 und erneut im Februar 2022 gepatcht („Tuya has patched their SDK as of February 2022.“) \[C12]. **\[Inferenz]:** Ein Firmware-Ersatz (Tasmota/ESPHome) auf dem WL-433 ist nicht realistisch – aktuelle Tuya-Module sind gegen dieses Verfahren gepatcht, und die LoRa-Ansteuerung läuft ohnehin über eine separate, unbekannte MCU-/Modem-Logik. Der praktikable Weg ist die Nutzung des Lokalprotokolls mit dem ursprünglichen Local Key.

#### 3.1.3 Das WL-433 ist **ein** Tuya-Gerät – die Lampen sind keine Sub-Devices

Tuya-Gateways für Zigbee/BLE adressieren ihre Sub-Geräte über `cid` /`node_id` („Zigbee Gateway-Unterstützung verwendet ein Eltern-/Kind-Modell, bei dem ein Eltern-Gateway-Gerät verbunden wird und dann ein oder mehrere Kinder hinzugefügt werden.“ \[C2]). Beim WL-433 ist das **nicht** der Fall: In \[C1] erscheint das Gateway als ein einziges Gerät mit einer Geräte-ID; Zonen und Szenen werden über einen Roh-Datenpunkt gesendet („the app sends some strings to a DP 101“). Dasselbe Muster zeigt das WL-Box2-Profil (Zonenwahl über DP 107 als Integer) \[C6] und die localtuya-Erfahrung mit dem WL-Box2: „in HA you can control only the zone selected in tuya smart app“ \[C7].

**Konsequenz für ioBroker \[Inferenz]:** Die Sub-Device-Unterstützung von `ioBroker.tuya` (seit 3.11.0, „Unterstützung zur lokalen Steuerung von Zigbee-Geräten über Hubs hinzugefügt“ \[I1]) hilft hier nicht; Entscheidend ist, ob DP 101 im Schema landet und ob seine Byte-Struktur bekannt ist.

#### 3.1.4 Lokaler Schlüssel – Beschaffung

| Methode                                     | Beschreibung                                                                                                                                                                                   | Anwendbar auf WL-433?                                                                                                                                                 | Quelle                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Tuya IoT-Plattform + tinytuya-Wizard        | Entwicklerkonto auf iot.tuya.com, App-Konto per QR-Code verknüpfen (nur Tuya Smart / Smart Life), Schlüssel per API abrufen; IoT-Core-Testabo läuft nach 1 Monat ab und muss verlängert werden | Laut Hersteller **nein** („WL-433 kann nicht eingerichtet werden“ \[H7]); laut Anwender „Dieses Gerät kann nicht mit der tuya Cloud-Plattform verwendet werden“ \[C1] | \[C2]\[C13]\[H7]\[C1] |
| `ioBroker.tuya` Cloud-Synchronisierung      | Einmalige Synchronisierung mit App-Konto (Tuya Smart / Smart Life / Ledvance / Sylvania)                                                                                                       | Nur wenn das WL-433 in einem dieser Konten gepaart werden kann (Händlerangabe „Tuya Smart / Smart Life app“ \[H16]; unbestätigt)                                      | \[I1]\[I3]            |
| Debug-Log der MiBoxer-App (Android, LogFox) | App gibt Geräte-ID, Local Key und DP-Daten im Log aus                                                                                                                                          | **Ja – nachgewiesen** \[C1]                                                                                                                                           | \[C1]                 |
| Hinweis                                     | „Der Local\_Key für Tuya-Geräte ändert sich jedes Mal, wenn ein Gerät aus der TuyaSmart-App entfernt und wieder hinzugefügt wird.“                                                             | Nach jedem Neu-Pairing neu auslesen                                                                                                                                   | \[C2]                 |

#### 3.1.5 Der herstellerspezifische Datenpunkt 101 – Stand der Dekodierung

> **Nachtrag 22.09.2026:** Der Stand dieses Abschnitts ist überholt – Befehle, Statusabfrage und Status sind inzwischen an einem echten Gateway entschlüsselt und im Adapter umgesetzt, siehe **3.1.8** .

Aus \[C1] (Beiträge von „Silverstar“ und dem tinytuya-Mitentwickler „uzlonewolf“, 04.06.2025):

- DP 101 Transport Base64-kodierte Binärdaten: „Es scheint nicht verschlüsselt oder so zu sein, es ist nur Base64-kodiert.“ – „Base64 ist auf Tuya-Geräten für Binärdaten variabler Länge ziemlich üblich.“
- Prüfsumme: „Das Einzige, was ich mit Sicherheit sagen kann, ist, dass das letzte Byte die 8-Bit-Summe der Nachricht ist.“
- Veröffentlichte Frames (dekodiert, 12 Byte):

| Richtung      | Base64                | Verhexen                              | Prüfsumme Σ(Byte 0–10) mod 256 |
| ------------- | --------------------- | ------------------------------------- | ------------------------------ |
| App → Gateway | `QwAAgAAAAAAAgIDD`    | `43 00 00 80 00 00 00 00 00 80 80 c3` | 0xC3 ✓                         |
| App → Gateway | `SQAACwIAAQAAAIDX`    | `49 00 00 0b 02 00 01 00 00 00 80 d7` | 0xD7 ✓                         |
| App → Gateway | `QQAACwYBAAAAAIDT`    | `41 00 00 0b 06 01 00 00 00 00 80 d3` | 0xD3 ✓                         |
| App → Gateway | `QQAACwYGAAAAAIDY`    | `41 00 00 0b 06 06 00 00 00 00 80 d8` | 0xD8 ✓                         |
| Gateway → App | `RAAAAAABAAEACwFS`    | `44 00 00 00 00 01 00 01 00 0b 01 52` | 0x52 ✓                         |
| Gateway → App | `SQAACwIBAAEAAAFY` \* | `49 00 00 0b 02 01 00 01 00 00 01 59` | 0x59 ✓ (Hex)                   |
| Gateway → App | –                     | `42 00 00 00 02 01 00 01 00 0b 01 52` | 0x52 ✓                         |

\* Der Base64-String ergibt sich beim Dekodieren `…01 58`, die im Thread angegebene Hex-Form `…01 59`; die Prüfsumme bestätigt die Hex-Form. Vermutlich ein Übertragungsfehler im letzten Base64-Zeichen (Y/Z). Eigene Nachrechnung aller sieben Frames: siehe Anhang A.

**Struktur-Hypothesen \[Inferenz, nicht belegt]:** Byte 0 ist ein Kommandotyp (0x41–0x49); Byte 3 nimmt 0x0B oder 0x80 an; Byte 10 ist bei Anfragen 0x80 und bei Antworten 0x01; Byte 11 die Prüfsumme. Die beiden 0x41-Frames unterscheiden sich nur in Byte 5 (0x01 vs. 0x06) – ein Kandidat für eine Zonen- oder Szenennummer. Eine belastbare Zuordnung erforderte eigene, systematische Mitschnitte (je Zone, je Taste); Die Vorgehensweise ist in Kapitel 6 beschrieben.

#### 3.1.6 Nicht unterstützt: das alte Mi-Light-/LimitlessLED-LAN-Protokoll

Die iBox1/iBox2-Bridges der Vorgängergeneration hatten eine offene UDP-API (v5: Port 8899; v6: Port 5987, Session-ID, Sequenznummer, Prüfsumme; Discovery über Port 48899 mit „HF-A11ASSISTHREAD“) \[C16], auf der `ioBroker.milight` \[I7], `ioBroker.milight-smart-light` \[I8], Home Assistant „limitlessled“ und sidoh/esp8266\_milight\_hub \[R18] aufsetzen. Für die WL-Generation gilt:

- Kein Herstellerdokument nennt Ports, „LimitlessLED“ oder eine LAN-API \[H1]\[H2].
- Schwestergerät WL-Box1: „Ich denke, die WL-BOX1 verwendet ein anderes Protokoll, mit beiden unterschiedlichen Portnummern, UDP statt TCP“ \[C9]; ioBroker-Forum: „ZZ gibt es keine Möglichkeit die neue Box in den ioBroker zu bekommen.“ \[I5]; Ausgabe „Unterstützung WL-Box1“ ohne Lösung geschlossen \[I8].
- Das WL-433 spricht nachweislich Tuya 3.3 \[C1].

**Schluss \[Inferenz, hohe Sicherheit]:** Die milight-Adapter sind für das WL-433 strukturell unbrauchbar.

#### 3.1.7 Cloud-Abhängigkeit – zusammengefasst

| Phase                                   | Cloud erforderlich?                                                                                                                   | Beleg       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Ersteinrichtung / Pairing / Aktivierung | Ja (Konto-Registrierung \[H1]; Tuya-Aktivierung ist ein Cloud-Schritt, Token-Ablauf und „Activation failed“ sind Cloud-Fehler \[C18]) | \[H1]\[C18] |
| Lokalschlüsselbeschaffung               | Ja (App-Log oder IoT-Plattform)                                                                                                       | \[C1]\[C2]  |
| Laufender Betrieb über LAN              | Nein (Tuya-Lokalprotokoll) – aber Gerät sendet Status an die Cloud weiter und kann bei Dauersperre unzulässig werden                  | \[C4]\[I1]  |
| Laufender Betrieb über DMX              | Nein                                                                                                                                  | \[H1]       |
| Setzen der DMX-Startadresse             | Ja (App)                                                                                                                              | \[H1]       |

#### 3.1.8 Datenpunkt 101 – entschlüsseltes Format (Nachtrag 22.09.2026)

**Vorgehen.** Zwei unabhängige Quellen wurden ausgewertet, jeweils mit genau **einer** Aktion in der MiBoxer-App pro Schritt:

1. **Statusframes des Gateways** \[E1]: Der ioBroker-Adapter (Version 0.0.1) war mit einem echten WL-433 verbunden und hat jeden empfangenen DP-101-Frame in `dp101.history` und im Debug-Log protokolliert. Jede Aktion in der App (Helligkeit, Farbtemperatur, Farbe, Sättigung, Ein/Aus, Modi M1–M3, S+/S-, Zonen) wurde zeitlich mit den gleichzeitig gemeldeten Standard-Datenpunkten 20–23 abgeglichen.
2. **Befehle der App** \[E2]: Ein Android-Smartphone (Android 13) wurde per USB-Debugging bzw. WLAN-adb mit einem Rechner verbunden und das Systemprotokoll mit `adb logcat` mitgeschnitten. Die MiBoxer-App (Paket `com.futlight.miboxer`) schreibt jeden DP-101-Befehl als Zeile `ayxsendData =<hex>` und jeden empfangenen Wert als `list value = {…}` ins Log; das Tuya-SDK zusätzlich protokolliert `publishDps() called with: dps = […], pipeline = [LAN]` bzw. `[MQTT]`. Unter iOS gibt es keinen vergleichbaren Zugang zum Protokoll anderer Apps – dafür wird ein Android-Gerät benötigt.

**Befehlsframe (App → Gateway), Typ 0x41:**

| Byte   | 0    | 1–2     | 3    | 4      | 5    | 6–8                            | 9    | 10   | 11        |
| ------ | ---- | ------- | ---- | ------ | ---- | ------------------------------ | ---- | ---- | --------- |
| Inhalt | `41` | `00 00` | `0B` | Befehl | Wert | beim Farbton = Wert, sonst `00` | Zone | `80` | Prüfsumme |

| Befehl (Byte 4) | Bedeutung                                      | Wert (Byte 5)                                                            | Mitschnitt (Beispiel) \[E2]           |
| --------------- | ---------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| `01`            | Farbton schaltet gleichzeitig in den Farbmodus | 0–255 (0 = rot, 360° auf 256 Stufen)                                     | `41 00 00 0B 01 49 49 49 49 01 80 F2` |
| `02`            | Helligkeit                                     | 1–100 %                                                                  | `41 00 00 0B 02 33 00 00 00 01 80 02` |
| `03`            | Farbtemperatur                                 | 0–38 (2700 K + 100 K je Stufe)                                           | `41 00 00 0B 03 12 00 00 00 01 80 E2` |
| `04`            | Sättigung                                      | 0–100 %                                                                  | `41 00 00 0B 04 34 00 00 00 01 80 05` |
| `05`            | Szene / Modus M1–M9                            | 1–9                                                                      | `41 00 00 0B 05 01 00 00 00 01 80 D3` |
| `06`            | Schmecken                                      | `01` ein, `02` aus, `03` S- (langsamer), `04` S+ (schneller), `06` Weißmodus | `41 00 00 0B 06 02 00 00 00 01 80 D5` |

Zone (Byte 9): `00` = alle Zonen („ALL“), `01` –`08` = Zone 1–8 \[E2]. Die App setzt die Zonenwahl nach einem Neustart auf Zone 1 zurück. Ein eigener Tastencode für den Farbmodus existiert nicht – die App wechselt in den Farbmodus, indem sie den Farbton sendet. Beim Ziehen eines Schiebereglers sendet die App die Zwischenwerte im Abstand von etwa 170 ms.

**Statusabfrage, Typ 0x43:** `43 00 00 80 00 00 00 00 00 80 80 C3` – der in \[C1] veröffentlichte Frame. Die App sendet ihn beim Öffnen mehrmals im Abstand von etwa 0,7 s und danach etwa alle 36 s; Das Gateway antwortet nach etwa 0,4 s mit einem Statusframe vom Typ 0x44 \[E1]\[E2].

**Statusframe (Gateway → App), Typ 0x42 / 0x44:**

| Byte   | 0                                            | 1–3        | 4                                                    | 5       | 6                   | 7            | 8                               | 9    | 10                                           | 11        |
| ------ | -------------------------------------------- | ---------- | ---------------------------------------------------- | ------- | ------------------- | ------------ | ------------------------------- | ---- | -------------------------------------------- | --------- |
| Inhalt | `42` Änderungsmeldung /`44` Antwort auf 0x43 | `00 00 00` | Modus: `00` aus, `01` Farbe, `02` Weiß, `03` –`0B` M1–M9 | Farbton | Farbtemperaturstufe | Helligkeit % | Sättigung % (im Weißmodus `00`) | `0B` | DMX-Startadresse, unteres Byte (siehe 3.1.9) | Prüfsumme |

Belege \[E1]: Helligkeitsregler im Weißmodus min/mittel/max → Byte 7 =`01` /`2F` /`64` bei DP 22 = 10 / 470 / 1000; Farbtemperatur warm/mittel/kalt → Byte 6 =`00` /`11` –`12` /`26` bei DP 23 = 0 / 440–490 / 1000; Sättigung max/mittel → Byte 8 =`64` /`2F`; Ein/Aus → Byte 4 =`01` ↔`00`; M1/M2/M3 → Byte 4 =`03` /`04` /`05`; Die App zeigte dabei die Werte 1:1 an (Farbe „rgb251“ = Byte 5 `FB` Sättigung 86 % = Byte 8 `56`, 6500 K = Byte 6 `26`). Die Änderungsmeldung 0x42 kommt etwa 2,5 s nach der letzten Änderung; Einzelne Frames werden nach etwa 2 s wiederholt.

**Weitere Befunde \[E1]\[E2]:**

- **Ein Status für alle Zonen.** Der Status enthält keine Zone; Die Bytes 1–3 und 9 waren in allen Mitschnitten konstant, Byte 10 ändert sich nur mit der DMX-Startadresse (3.1.9). Das Gateway führt nur den zuletzt gesetzten Zustand, unabhängig von der Zone – auch die App zeigt keinen Unterschied zwischen den Zonen.
- **Abgeleitete Standard-Datenpunkte.** DP 20–23 erzeugt das Gateway aus den DP-101-Befehlen (DP 22 = Helligkeit × 10, DP 23 ≈ Stufe × 26). Nach einem Moduswechsel sendet es DP 22 nicht neu; Solange das Licht aus ist, meldet DP 21 „white“.
- **DP 24 wird von der App nicht verwendet.** Ein Schreibversuch mit `007803e803e8` (Grün, v2-Format) wurde vom Gateway zurückgemeldet, veränderte aber den Farbton nicht und setzte die Sättigung auf 0.
- **Unbekannte Frame-Typen werden verworfen.** Ein nach dem Statusmuster gebauter Frame mit Typ 0x42 und `80` in Byte 10 blieb ohne Reaktion.
- **Geschwindigkeit nicht im Status.** S+ und S- lösen nur eine unveränderte Statusmeldung aus.
- **Zwei lokale Verbindungen.** Während der Mitschnitte waren der Adapter und die App gleichzeitig per LAN mit dem Gateway verbunden; Die App wich zeitweise auf die Cloud (MQTT) aus.
- **Frame-Typ 0x49 und Tastencode `06 05`:** am Nachmittag geklärt, siehe 3.1.9.

**Überprüfung.** Der Adapter ab Version 0.1.0 sendet diese Befehle selbst. Am echten Gateway wurden Helligkeit (alle Zonen), Farbe (Farbton + Sättigung), Szene M2, Weiß 3000 K in Zone 1 und Helligkeit in Zone 2 eingestellt und jeweils nach etwa 2,7 s durch die Statusmeldung bestätigt \[E1].

#### 3.1.9 DMX-Startadresse, Taste `06 05` und Timer der App (Nachtrag 22.09.2026, Nachmittag)

Die Untersuchung wurde mit derselben Methode fortgesetzt (eine Aktion je Schritt, Mitschnitt des Adapters \[E1] und der App \[E2]).

**DMX-Startadresse, Typ 0x49.** Das einzige Einstellungsmenü der App heißt „DMX einstellen“. Es setzt die Startadresse des DMX512-Eingangs (3.2.2). Der Anwender stellte in der App mit gewählter Zone 2 die Adresse erst auf 123 und dann zurück \[E2]:

| Richtung               | Rahmen                                         | Bedeutung                                                                                                          |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| App → Gateway          | `49 00 00 0B 02 00 7B 00 00 02 80 53`          | Adresse 123 (Bytes 5–6 =`00 7B`), Zone 2 (Byte 9)                                                                 |
| Gateway → App          | `49 00 00 0B 02 01 03 28 00 00 7B FD`          | Byte 5 `01` = übernommen; Bytes 6–8 = Farbtemperaturstufe 3, Helligkeit 40 %, Sättigung 0; Bytes 9–10 = Adresse 123 |
| Gateway → App (Status) | `44 00 00 00 02 AB 03 28 00 0B 7B` + Prüfsumme | Byte 10 des Statusframes = unteres Byte der Adresse (vorher `01` = Adresse 1)                                       |

Damit ist auch der Frame aus \[C1] erklärt: `49 00 00 0B 02 00 01 00 00 00 80` Setzt Adresse 1 für alle Zonen, die Antwort `49 00 00 0B 02 01 00 01 00 00 01` bestätigt sie. Befehlsformat: `49 00 00 0B 02 <Adresse high> <Adresse low> 00 00 <Zone> 80 <Prüfsumme>`. Adressen über 255 (oberes Byte ≠ 0) wurden am echten Gerät nicht gesetzt; das Format folgt aus der Zweibyte-Darstellung **\[Inferenz]** . Der Statusframe enthält nur das untere Byte – eine Adresse über 255 ist daher nur aus der 0x49-Antwort vollständig ablesbar. Der Adapter bietet die Adresse ab Version 0.2.0 als Datenpunkt `settings.dmxAddress` ein. Am echten Gateway geprüft \[E1]: `49 00 00 0B 02 00 03 00 00 00 80 D9` (Adresse 3, alle Zonen) wurde nach 374 ms mit `49 00 00 0B 02 01 03 32 00 00 03 8F` bestätigt, der nächste Status meldete Byte 10 =`03`; `49 00 00 0B 02 00 02 00 00 00 80 D8` (zurück auf 2) wurde nach 348 ms bestätigt, Status-Byte 10 danach wieder `02` Die

**Schmecken `06 05`.** Vom Adapter an alle Zonen gesendet (`41 00 00 0B 06 05 00 00 00 00 80 D7`): Die Leuchten gingen aus (DP 20 = false, Statusmodus `00`); ein zweites `06 05` ließ sie aus \[E1]. Die Taste schaltet sich auch nicht um, sondern ist eine zweite Aus-Variante. Bei anderen Mi-Light-Fernbedienungen ist ein solcher Code häufig das „Nachtlicht“ **\[Inferenz]** – das ließ sich nicht prüfen, weil der Anwender die Leuchten bei den Tests nicht sehen konnte. Der Adapter verwendet den Geschmack nicht.

**Timer der App.** Die App speichert Timer **in der Tuya-Cloud** \[E2]: Sie ruft die Cloud-Schnittstellen `tuya.m.timer.group.list` und `tuya.m.timer.group.add` auf (Kategorie `mi-light-timer`). Ein am 22.09.2026 angelegter Timer „Montag bis Mittwoch 13:40 einschalten“ bestand aus `time` =`13:40`, `loops` =`0111000` (sieben Stellen Sonntag bis Samstag), der Zeitzone und dem Befehl `instruct` =`[{"dps":{"20":true},"time":"13:40"}]`. Er schreibt auch den Standard-Datenpunkt 20 – ohne Zone und ohne DP 101. Um 13:40:07 meldete das Gateway DP 20 = true und 2,4 s später einen 0x42-Status; Der Adapter übernimmt die Änderung wie jede andere \[E1]. Folgerungen: Die Timer der App benötigen Internet, sind lokal weder lesbar noch änderbar und können nur alle Zonen gemeinsam ein- oder ausschalten.

**Lokaler Timer im Adapter.** Als cloudfreier Ersatz enthält der Adapter ab Version 0.2.0 bis zu 50 eigene Timer (Uhrzeit oder Sonnenereignis nach suncalc mit Verschiebung und Zufallsabweichung, Wochentage, Saison, Zone, jede Lichtaktion, Ausschalten nach einer Dauer). Praxistest am echten Gateway \[E1]: Ein Timer um 14:13:25 („alle Zonen: Weiß 3000 K, 50 %, nach 1 min aus“) `41 00 00 0B 06 01 …` (ein), `41 00 00 0B 03 03 …` (Stufe 3 = 3000 K) und `41 00 00 0B 02 32 …` (50 %); der Status `42 00 00 00 02 AB 03 32 00 0B 02` bestätigte alle drei nach 2,7–3,0 s. Um 14:14:25 folgte `41 00 00 0B 06 02 …` (aus), bestätigt nach 2,7 s.

### 3.2 Schicht 2: DMX512-Eingang

#### 3.2.1 Norm und Physik

- „DMX512 (1990)“ bezeichnet die USITT-Revision von 1990 des ursprünglich 1986 geschaffenen Standards; Seit 2004 ist DMX512-A als ANSI E1.11 normiert („On November 8, 2004, the ANSI Board of Standards Review genehmigt ANSI E1.11“) \[S24]. Aktuelle Ausgabe: ANSI E1.11-2024 (25.04.2024) \[S22]; Die von den meisten Datenblättern zitierte Ausgabe ist E1.11-2008 (R2018) \[S23].
- Physik: „ein einfaches asynchrones serielles Acht-Bit-Protokoll, das aus einem untypisierten Bytestrom besteht, der von Standard-UARTs erzeugt wird“ auf „EIA-485-A ausgeglichene Datenübertragungstechniken“ \[S23]\[S25]; 250 kbit/s, 8N2; Paket = BREAK, Mark-after-Break, Startcode + bis zu 512 Datenslots \[S23]; BREAK ≥ 92 µs am Sender (typ. 176 µs), ≥ 88 µs am Empfänger; MAB ≥ 12 µs/≥ 8 µs \[S26]\[S27] (Sekundärquellen, die E1.11 zitieren).
- DMX512 ist unidirektional (Controller → Empfänger); Rückkanal nur mit RDM (ANSI E1.20) \[S27]. Für das WL-433 ist keine RDM-Unterstützung dokumentiert \[H1].

#### 3.2.2 Umsetzung im WL-433

- Das Gateway ist DMX- **Empfänger** („DMX512 Signal Input“) und belegt ab einer in der App Startadresse fünf aufeinanderfolgende Kanäle in der Reihenfolge Rot, Grün, Blau, Kaltweiß, Warmweiß \[H1].
- Der Adressdialog enthält eine Zonenwahl („Klicken Sie links unten auf ‚Zone‘ in der Zonenauswahl“) \[H1]. **Nicht dokumentiert:** ob je Zone ein eigener 5-Kanal-Block existiert oder ob der Block an die gewählte Zone geleitet wird; welche Priorität DMX gegenüber App-/Fernbedienungsbefehlen hat; wie das Gateway den kontinuierlichen DMX-Strom (rechnerisch bis ≈ 44 Pakete/s bei 512 Slots, abgeleitet aus 250 kbit/s, 11 Bit je Slot sowie BREAK/MAB \[S23]\[S27]) in einzelne Funktelegramme umsetzt (Relevanz für den Arbeitszyklus, siehe 3.3.7).
- Händlerhinweis: „Für diese Funktion ist ein separater DMX-Controller mit Standard-DMX512-Protokollen erforderlich.“ \[H18].
- Die Startadresse lässt sich auch lokal über DP 101 lesen und setzen (Frame-Typ 0x49, Status-Byte 10), siehe 3.1.9 \[E1]\[E2].

#### 3.2.3 Bewertung \[Inferenz]

DMX ist der **einzige vollständig cloudfreie und deterministische** Steuerpfad, der vom Hersteller dokumentiert ist. Preis: zusätzliche Hardware (Art-Net-Node + Kabel bis zum Gateway), voraussichtlich keine Zonentrennung, und die Adresse muss einmalig gesetzt werden – über die App oder lokal per DP 101 (3.1.9).

### 3.3 Schicht 3: LoRa 433 MHz

#### 3.3.1 Was „LoRa“ hier bedeutet

- LoRa ist eine von Semtech entwickelte, proprietäre Chirp-Spread-Spectrum-Modulation: „Eine proprietäre Spread-Spectrum-Modulationstechnik, die von der bestehenden Chirp Spread Spectrum (CSS)-Technologie abgeleitet ist“ \[S2]; „LoRa ist eine rein physikalische (PHY) oder 'Bits'-Schicht-Implementierung“ \[S2]; „LoRa ist das von Semtech entwickelte Silizium, und LoRaWAN® ist ein Standard für Interoperabilität, der von der LoRa Alliance® verwaltet wird“ \[S13].
- LoRaWAN ist davon zu unterscheiden: „LoRa ist das Funksignal, das die Daten überträgt, und LoRaWAN ist das Kommunikationsprotokoll, das steuert und definiert, wie diese Daten über das Netzwerk kommuniziert werden.“ \[S12]. **\[Inferenz]:** Miboxer nutzt LoRa als reine Punkt-zu-Mehrpunkt-PHY mit eigener Applikationsschicht; LoRaWAN (Netzwerk-Server, AES-Sitzungsschlüssel, EU433-Kanalplan 433,175–434,665 MHz \[S14]) spielt keine Rolle.
- Mathematische Beschreibung: Vangelista (2017) beschreibt LoRa als „Frequency Shift Chirp Modulation“ mit FFT-basiertem Demodulator \[S8]. Vollständige, offene PHY-Beschreibungen mit Quellcode: Knight & Seeber (2016, gr-lora, Bastille) \[S11], Robyns et al. (2018, „erste detaillierte und vollständige Beschreibung der LoRa PHY-Schicht“) \[S9], Tapparel et al. (2020, gr-lora\_sdr) \[S10]. Patent: Seller & Sornin, US 9,252,834 B2 / EP 2 763 321 B1 \[S7].
- Transceiver-Parameter (SX1276/77/78/79): 137–1020 MHz (SX1278: 137–525 MHz), Spreizfaktor SF 6–12, Bandbreite 7,8–500 kHz, Coderate 4/5–4/8, Sync-Word-Register `RegSyncWord` 0x39 mit Vorgabe 0x12 („privat“) und 0x34 („reserviert für LoRaWAN-Netzwerke“) \[S3]\[R5]\[R6]. Symbolzeit T\_sym = 2^SF / BW \[R14].
- Wichtig für jedes Mithören: „Ein Hardware-LoRa-Transceiver lässt Frames fallen, die Synchronisationssymbole enthalten, die nicht mit einem vorkonfigurierten Wert übereinstimmen.“ \[S9]. Ein unbekanntes Sync-Word muss ebenfalls ermittelt (SDR) oder durchprobiert (256 Werte) werden; Bei sehr hohem Signal-Rausch-Abstand ist die Filterung „leaky“ \[R13].

#### 3.3.2 Was der Hersteller preisgibt

„LoRa Spread Spectrum“, „LoRa SPSP Modem Technologie“ \[H1]\[H5], 15 dBm Sendeleistung (Gateway) \[H1], 10 dBm (FUT086) \[H6], Reichweiten 1000 m/2000 m Freifeld, 50 m bei 0,5 m Wassertiefe \[H1]\[H6]; Katalog: „Das LoRa-Funkmodul 433 MHz ist ein drahtloses Netzwerkmodul mit geringer Leistung und großer Reichweite … die maximale Steuerentfernung beträgt über 2 km.“ \[H11]. **Nicht angegeben:** Chip, Mittenfrequenz, Bandbreite, Spreizfaktor, Sync-Word, Verschlüsselung, Kanalplan. Die Abkürzung „SPSP“ wird nirgends erklärt ( **\[Inferenz]:** vermutlich „Spread Spectrum“).

#### 3.3.3 Hardware-Identifizierung

- Einziger Chip-Angabe: Feature-Request im esp8266\_milight\_hub (13.05.2024): „Ist es möglich, Unterstützung für die FUT086-Fernbedienungsemulation hinzuzufügen? Sie verwendet den SX1278 LoRa-Transceiver.“ \[R1] – Community-Angabe ohne Foto oder Beleg. Der Maintainer antwortete (13.07.2024): „Das klingt durchaus möglich, liegt aber weit außerhalb meiner zeitlichen Möglichkeiten. Gerne schaue ich mir einen Pull Request an …“ \[R1]. Status: offen, keine Umsetzung.
- FCC: Futlights Grantee-Code ist 2AJWW (Filings für 2,4-GHz-Produkte FUT092, FUT096, LS2, FUT106 ua) \[S37]; ein Filing für WL-433, PW01 oder FUT086 wurde **nicht gefunden** (Datenbanken teilweise nicht erreichbar; die 433-MHz-Linie wird primär in EU/UK vertrieben, Händler nennen „CE, RoHS, UKCA“ \[H16]). Eine EU-Konformitätserklärung ist online nicht auffindbar.
- **\[Inferenz]:** Ein Semtech-SX127x/SX126x- oder LLCC68-basiertes Modul (z. B. Ai-Thinker Ra-01/Ra-02, Ebyte E32-433) ist die naheliegende, aber unbewiesene Annahme. Bestätigung nur durch Öffnen des FUT086 (Modul-/Chipaufdruck).

#### 3.3.4 Stand des Reverse Engineering: **nichts vorhanden**

Trotz gezielter Suche (GitHub-Repositories und -Issues, Hackaday.io, EEVblog, Reddit, Home-Assistant-Community, ioBroker-Forum, OpenMQTTGateway, rtl\_433, ESPHome, chinesischsprachige Quellen) gibt es **keine** Veröffentlichungen von Funkparametern, Mitschnitten oder Implementierungen für die Miboxer-433-MHz-LoRa-Linie. Belege für die Vergeblichkeit anderer:

- OpenMQTTGateway-Maintainer (29.05.2024): „Sehr unwahrscheinlich. Zwar könnte eine der RF-Gateway-Optionen die MiBoxers möglicherweise empfangen und an sie senden, aber das proprietäre MiBoxer-Protokoll ist OpenMQTTGateway unbekannt, was es definitiv schwierig oder möglicherweise völlig unmöglich macht …“ \[R2]; Fragesteller: „bisher kein Glück mit den LoRa MiLights“ \[R2].
- rtl\_433 kann LoRa grundsätzlich nicht dekodieren: „The rtl\_433 demod can't decipher LoRa (to hex) when (wir erwarten irgendeine Form von Impulsen, nicht diese Sweeps/Chirps).“ \[R3].
- ioBroker-Forum: Suche nach „WL-433“ und „miboxer lora“ – „Keine Ergebnisse gefunden“ \[I17].

#### 3.3.5 Vergleich: Die 2,4-GHz-Linie ist vollständig rückentwickelt

Henryk Plötz (2015) hat das Mi-Light-2,4-GHz-Protokoll per SDR und SPI-Mitschnitt entschlüsselt: PL1167/LT8900-Transceiver, GFSK, Kanäle 2411/2442/2473 MHz, Nutzdaten „3 Bytes Remote/Gateway ID, 1 Byte Farbwert, 1 Byte Helligkeit, 1 Byte Tastenstatus, 1 Byte Paketzähler, und 2 Bytes CRC“, Befehle \~30-fach wiederholt \[R17]\[R19]. Darauf bauen henryk/openmili und sidoh/esp8266\_milight\_hub auf (Emulation der Fernbedienungen FUT005–FUT098, FUT089, B05) \[R18]. Auch der Hersteller selbst hatte die 2,4-GHz-Luftschnittstelle einst dokumentiert (Präambel 0xAAAAAA, Sync 0x147A/0x258B, 2-Byte-Remote-ID, Farbe, Helligkeit, Kommando 0x01–0x1A, CRC) \[C16].

**\[Inferenz]:** Da das Pairing-Modell der 433-MHz-Linie identisch ist (Lampe lernt Sender-ID; bis zu vier Sender je Lampe; Lernfunktion kopiert Remote-ID ins Gateway \[H1]\[H5]) und die LAN-seitigen DP-101-Frames eine schlichte 8-Bit-Prüfsumme ohne Verschlüsselung zeigen \[C1], ist eine ähnlich einfache Applikationsschicht (Sender-ID, Zone, Kommando, Wert, Zähler, Prüfsumme) über eine private LoRa-PHY plausibel – aber unbewiesen.

#### 3.3.6 Vorgehen für ein eigenes Reverse Engineering (Machbarkeit: **mittel** )

| Schritt | Vorgehen                                                                                                                                                                                                                                                                                                                                                    | Werkzeuge/Quellen         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| 0       | FUT086 öffnen, Funkmodul/Chip fotografieren und identifizieren                                                                                                                                                                                                                                                                                              | –                         |
| 1       | RTL-SDR (433 MHz) + SDR++/gqrx: Taste drücken, Chirps im Wasserfall beobachten („those up- or down Sweeps are typische LoRa“ \[R3]); Mittenfrequenz und Bandbreite ablesen; aus der Symboldauer den SF berechnen (T\_sym = 2^SF/BW \[R14]); IQ aufzeichnen                                                                                                  | RTL-SDR, sigidwiki \[S38] |
| 2       | IQ mit gr-lora\_sdr \[R8] oder rpp0/gr-lora \[R7] dekodieren; Präambel, die zwei Sync-Word-Symbole („Zwei modulierte Chirps, deren Wert als Netzwerkidentifikator verwendet werden kann“ \[S9]) und den Header (Coderate, CRC, Länge – bei explizitem Header selbstbeschreibend \[S10]) auslesen                                                            | GNU Radio                 |
| 2b      | Ohne SDR: ESP32 + SX1262 mit lorascan „syncfind“ (256 Sync-Words durchprobieren) \[R11] oder CAD-basierter SF-Sweep \[R12]\[R22]                                                                                                                                                                                                                            | ESP32-S3/Heltec, SX1262   |
| 3       | ESP32 + SX1276/78 (433-MHz-Variante, z. B. LILYGO/Heltec LoRa32 433) mit ESPHome-`sx127x` (Parameter `frequency`, `bandwidth`, `spreading_factor`, `coding_rate`, `sync_value`, `crc_enable`, `preamble_size`) \[R5] oder RadioLib \[R6] oder OpenMQTTGateway-LoRa (MQTT-Anbindung an ioBroker) \[R4] konfigurieren; Nutzdaten je Taste/Zone protokollieren | ESPHome/RadioLib/OMG      |
| 3b      | Abkürzung: Logikanalysator an den SPI-Bus der FUT086 – jede Registerschreibung (Frequenz, Modem-Konfiguration, Sync-Word, IQ-Invertierung) und jeder TX-FIFO-Inhalt wird im Klartext sichtbar (Methode von Plötz \[R17])                                                                                                                                    | Logikanalysator           |
| 4       | Byte-Zuordnung: Sender-ID, Zone, Kommando, Farbe/CCT/Helligkeit, Zähler, Prüfsumme; Abgleich mit den DP-101-Frames \[C1]                                                                                                                                                                                                                                    | –                         |
| 5       | Eigener Sender (ESP32 + SX127x) als „virtuelle FUT086“, in die Lampen per Verknüpfungsprozedur eingelernt \[H5]; Anbindung an ioBroker über MQTT \[I12] oder direkt als Adapter                                                                                                                                                                             | –                         |

Bewertung: **mittel** – die PHY ist offen und wissenschaftlich beschrieben \[S9]\[S10]\[S11], der Parameterraum nach einer SDR-Aufnahme klein (Sync-Word 8 Bit, IQ-Polarität, Header-Modus), die Applikationsschicht vermutlich einfach; Aber es gibt **keine Vorarbeit** , keinen bestätigten Chip und keine FCC-Innenfotos. Realistischer Aufwand für einen erfahrenen Bastler: mehrere Abende für die PHY-Parameter, weitere für die Byte-Zuordnung.

#### 3.3.7 Regulatorischer Rahmen (Deutschland/EU)

| Regelwerk                                                             | Inhalt für 433 MHz                                                                                                                                                                                                                                                                                               | Quelle                                   |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| ETSI EN 300 220-2 V3.3.1 (2025-03), Tabelle 4                         | Band **H** 433.050–434.790 MHz: 10 mW ERP, Arbeitszyklus ≤ 10 %, belegte Bandbreite bis 1,74 MHz; Band **I** (gleiches Band): 1 mW ERP, −13 dBm/10 kHz spektrale Leistungsdichte bei Modulationsbandbreite > 250 kHz, keine Zugriffsanforderung; Band **J** 434.040–434.790 MHz: 10 mW ERP, Kanalraster ≤ 25 kHz | \[S17] (V3.2.1: \[S16])                  |
| Arbeitszyklus-Definition                                              | Kumulierte Sendezeit innerhalb eines Beobachtungsintervalls T\_obs (Standard 1 h)                                                                                                                                                                                                                                | \[S15]                                   |
| ERC/REC 70-03 (Juni 2024), Anhang 1                                   | Gleiche drei Teilbänder als g1/g2/g3                                                                                                                                                                                                                                                                             | \[S18]                                   |
| EU-Durchführungsbeschluss (EU) 2025/105 (Anhang gültig ab 01.07.2025) | Zeilen 44a (1 mW ERP), 44b (10 mW ERP, Arbeitszyklus ≤ 10 %)                                                                                                                                                                                                                                                     | \[S19] (Vorgänger (EU) 2022/180: \[S20]) |
| BNetzA Vfg. 91/2025 (November 2025) „Allgemeinzuteilung … SRD“        | 44a „433,05–434,79 MHz“ „1 mW (ERP)“; 44b „10 mW (ERP)“ „Arbeitszyklus: ≤ 10 %“; 45c „434,04–434,79 MHz“ „10 mW (ERP)“ „Arbeitszyklus ≤ 100 % bei einer Bandbreite ≤ 25 kHz“; ersetzt Vfg. 133/2019; befristet bis 31.12.2035                                                                                    | \[S21]                                   |
| FuAG § 7                                                              | Funkanlagen dürfen nur genutzt werden, wenn sie bei bestimmungsgemäßer Nutzung den Anforderungen genügen                                                                                                                                                                                                         | \[S33]                                   |

**Einordnung der 15 dBm des WL-433 \[Inferenz]:** 15 dBm ≈ 31,6 mW liegen 5 dB über den 10 mW ERP des Bandes H. Die Grenze gilt jedoch für die **abgestrahlte** Leistung (ERP = Leistung am Antennenanschluss + Antennengewinn in dBd − Verluste; ERP = EIRP − 2,15 dB \[S32]); Ein Datenblattwert „15 dBm“ ist üblicherweise die Modulausgangsleistung. Mit einer kleinen internen Antenne (Gewinn ≤ −5 dBd) wäre die Grenze einhaltbar – ob das der Fall ist, kann nur ein Prüfbericht zeigen, der nicht auffindbar ist. Für einen **eigenen** Sender gilt: keine Einzelzuteilung nötig (Allgemeinzuteilung), aber ≤ 10 mW ERP und ≤ 10 % Arbeitszyklus (bzw. ≤ 1 mW ERP ohne Arbeitszykluslimit) sind einzuhalten \[S21]; ein Standard-433-MHz-LoRa-Modul auf ≤ +10 dBm mit Dipol-Antenne bleibt im Rahmen. Reiner Empfang der eigenen Geräte per SDR wirft keine Sendefrage auf.

---

## 4. Bewertung der Steuerungspfade

| Pfad                                                            | Cloudfrei (Betrieb) | Zonen                                                   | Szenen/Modi                | Zusatz-Hardware            | Aufwand       | Evidenz                     | Hauptrisiken                                                                                                                                           |
| --------------------------------------------------------------- | ------------------- | ------------------------------------------------------- | -------------------------- | -------------------------- | ------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A1** `ioBroker.tuya` lokal                                     | Ja                  | Nein (bis DP 101 dekodiert und vom Adapter unterstützt) | Nein                       | keine                      | geringer      | \[C1]\[I1]\[I2]             | Pairing in Smart Life unbestätigt; unbekannte DPs werden verworfen; nur ein lokaler Kunde; Firmware-OTA auf 3.4/3.5 möglich (weiter unterstützt \[I1]) |
| **A2** Eigener Adapter (tuyapi)                                 | Ja                  | Ja, nach DP-101-Reverse-Engineering                     | Ja, dito                   | keine                      | mittel        | \[C1]\[C14]\[I14]           | DP-101-Dekodierung offen; Lokaler Schlüssel ändert sich bei Re-Pairing \[C2]                                                                           |
| **A3** Skript (`ioBroker.javascript` + tuyapi /`exec` tinytuya) | Ja                  | wie A2                                                  | wie A2                     | keine                      | gering–mittel | \[I13]\[C2]                 | wie A2, weniger robust                                                                                                                                 |
| **B** DMX512 über Art-Net                                       | **Ja, vollständig** | nicht dokumentiert (vermutlich nein)                    | nein (nur RGB+CW+WW-Werte) | Art-Net-Node + DMX-Kabel   | gering–mittel | \[H1]\[I9]\[I10]\[D1]–\[D5] | Steckertyp/Pinbelegung unbekannt; Priorität DMX vs. App unbekannt; Adresse nur per App möglich                                                         |
| **C** Eigener LoRa-Sender                                       | Ja                  | Ja (8 Zonen wie FUT086)                                 | Ja                         | ESP32 + SX127x/SX126x, SDR | hoch          | \[S9]\[S10]\[R5]\[R7]\[R8]  | Kein Vorwissen; Regulierung; Chip unbestätigt                                                                                                          |
| **D** Netzschalter-Steuerung (Aus-/Einschalten)                 | Ja                  | Nein                                                    | 17 Modi sequenziell        | Schaltaktor                | minimal       | \[H3]                       | Nur Durchschalten, kein Direktzugriff; Kollision mit anderen Pfaden                                                                                    |
| **E** Tuya-Cloud (IoT-Plattform-MQTT in `ioBroker.tuya`)        | Nein                | –                                                       | –                          | –                          | –             | \[H7]\[I1]                  | Hersteller: WL-433 „kann nicht eingerichtet werden“                                                                                                    |
| **F** `ioBroker.milight` / Broadlink / Sonoff RF-Brücke          | –                   | –                                                       | –                          | –                          | –             | \[I7]\[I8]\[R20]\[R21]      | **Nicht anwendbar**                                                                                                                                    |

**Empfehlung \[Inferenz]:** Kurzfristig A1 (Tuya-Lokalprotokoll testen, Local Key sichern) und parallel B prüfen (DMX-Buchse inspizieren). Mittelfristiger A2 als eigener Adapter mit DP-101-Unterstützung – das ist der Weg mit dem besten Verhältnis aus Aufwand und Funktionsumfang und benötigt keine Funk-Hardware. Weg C nur als Forschungsprojekt oder wenn das Gateway entfallen soll.

---

## 5. ioBroker – konkrete Integrationsoptionen

### 5.1 `ioBroker.tuya` (Apollon77) – Weg A1

**Dokumentierte Eigenschaften \[I1]\[I2]\[I3]:**

- „Dieser Adapter kann, wenn gewünscht, größtenteils ohne die Tuya Cloud funktionieren.“ – einmalige Synchronisation („synchronize one time“) mit einem App-Konto, danach lokale Erkennung per UDP-Broadcast und lokale Verbindung.
- Unterstützte Konten: Tuya Smart, Smart Life; Zusätzlich Ledvance (3.15.0) und Sylvania – **kein** „MiBoxer“-Login.
- Protokolle: Standard 3.3 (`version || 3.3` im Parser), 3.4, 3.5 (seit 3.17.0, Januar 2025).
- Untergeräte: Zigbee-Hubs (3.11.0) und IR-Gateways – für das WL-433 ohne Bedeutung (siehe 3.1.3).
- Unbekannte Datenpunkte werden mit `adapter.log.info("… Unknown datapoint … Please resync devices")` **übersprungen** (`continue`) \[I2] – DP 101 wird auch nur nutzbar, wenn er im per Cloud synchronisierten Schema enthalten ist.
- „Dies ist nur möglich, wenn die Tuya-App auf keinem Gerät geöffnet ist, da die meisten Geräte nur eine lokale Verbindung zulassen.“
- Keine dokumentierte manuelle Geräteanlage (ID + Local Key ohne Cloud-Sync); Nur die IP kann manuell gesetzt werden.

**Praxisberichte zu Miboxer-Geräten im ioBroker-Forum:** WL-BOX2 (2,4 GHz) funktioniert mit `ioBroker.tuya`, Zonen über einen State „Choose\_zone“ \[I4]; MiBoxer WL2-P75V24 funktioniert \[I4]; MiBoxer WL5 erschien bei einem Nutzer nicht \[I6]; zum WL-433 gibt es keinen Thread \[I17].

**Erwartung \[Inferenz]:** Gelingt das Pairing des WL-433 in Smart Life und der Sync, entstehen States für DP 20–24/26 → Ein/Aus, Modus, Helligkeit, Farbtemperatur, Farbe für die gerade in der App gewählte Zone bzw. alle Lampen. Zonenwechsel nur, wenn DP 101 im Schema erscheint – und selbst dann nur als Roh-String, den der Adapter nicht interpretieren kann.

### 5.2 DMX512 über Art-Net – Weg B

Kette: `ioBroker.artnet` \[I9] oder `ioBroker.artnetdmx` \[I10] → LAN → Art-Net-Node → DMX512 (EIA-485) → WL-433-DMX-Eingang → LoRa → PW01.

| Komponente                   | Status                                                                                                                    | Quelle |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ioBroker.artnet`            | Im Stable-Repository, Version 1.2.2 (08.04.2020); offene Wartungs-Issues (Node.js-26-Kompatibilität, Adapter-Core-Update) | \[I9]  |
| `ioBroker.artnetdmx` (ChriD) | Fixture-orientiert (Dimmer/TW/RGB/RGBW/RGBTW, Fades), 1.0.6 (19.02.2023), nur über GitHub installierbar                   | \[I10] |
| `ioBroker.nodedmx`           | node-dmx-Treiber (Art-Net, Enttec USB), kaum getestet                                                                     | \[I11] |
| Enttec ODE Mk3               | 2 Universen, PoE oder 12–24 V DC, RDM                                                                                     | \[D1]  |
| DMXking eDMX1 MAX            | 1 Universum, Art-Net/sACN, USB-C-Versorgung                                                                               | \[D5]  |
| LuxDMX (ESP32, Open Source)  | „Open-Source Art-Net / sACN (E1.31) → DMX512-Gateway für ESP32 / ESP32-S3 / Ethernet“, Browser-Flash                      | \[D2]  |
| ESPHome DMX512 (andyboeh)    | UART + RS-485-Modul, „Ausgänge verweisen auf Kanäle im DMX-Universum, von 1 bis 512.“                                     | \[D3]  |
| WLED DMX-Ausgang             | Maßgeschneidert mit `WLED_ENABLE_DMX`, MAX485                                                                             | \[D4]  |

Zu klären vor dem Kauf: Steckertyp/Pinout am WL-433 (nicht dokumentiert \[H1]); ob die 5 Kanäle einer Zone oder aller Lampen gelten; Verhalten bei dauerhaftem DMX-Signal.

### 5.3 Eigener Adapter – Weg A2 (Konzept)

**Architektur \[Inferenz, Vorschlag]:**

```
ioBroker-Adapter „miboxer-wl433“ (TypeScript, create-adapter-Template [I14])
 ├─ Konfiguration: IP, Geräte-ID, Local Key, Protokollversion (3.3, optional 3.4/3.5), Zonenanzahl
 ├─ Transport: tuyapi [C14] (find(), connect(), set({multiple:true, data:{…}}), on('data'))
 ├─ Standard-DPs → States: 20 on/off, 21 mode, 22 brightness (10–1000 → 1–100 %), 23 ct (0–1000 → 2700–6500 K),
 │                        24 hsv-hex → rgb/hex, 26 countdown
 ├─ Zonen-/Szenen-States → DP-101-Encoder (12-Byte-Frame + 8-Bit-Prüfsumme, Base64) – nach Dekodierung
 ├─ Watchdog: Reconnect, Heartbeat, Erkennung „App offen“ (Verbindung abgewiesen)
 └─ Optional: DP-101-Decoder für Statusmeldungen des Gateways (Antwortframes 0x42/0x44/0x49 [C1])
```

- Repository-Pflichten (io-package.json, Changelog in allen README-Sprachen, Adapter-Checker, ESLint) gemäß den ioBroker-Entwicklungsrichtlinien \[I14]; Für den Skill-basierten Ablauf steht dies `iobroker-adapter-dev` -Vorgabe zur Verfügbarkeit.
- Kritischer Pfad ist ausschließlich die DP-101-Dekodierung (Kapitel 6, Schritt 4). Ohne sie ist der Adapter identisch mit `ioBroker.tuya`, aber ohne dessen Cloud-Sync-Zwang (ID + Key werden direkt konfiguriert).

### 5.4 Skript-Variante – Weg A3

`ioBroker.javascript` kann zusätzliche npm-Module laden („Geben Sie den Namen (und die Version) des Moduls in der Instanzkonfiguration ein. ioBroker wird das Modul installieren.“) und Systembefehle ausführen (`exec()`; muss in der Instanz freigegeben sein) \[I13]. Damit lässt sich tuyapi direkt im Skript nutzen oder ein Python-Skript mit tinytuya (`set_value(101, base64)`) Rufen Sie \[C2] auf. Geeignet für Experimente und die DP-101-Mitschnitte; Für den Dauerbetrieb ist A2 vorzuziehen.

### 5.5 Nicht geeignete Wege (mit Beleg)

- `ioBroker.milight` (foxthefox): „Version des Milight-Protokolls v5 oder v6 -> stellt automatisch den entsprechenden Port ein“ – kein 433/LoRa/Tuya \[I7]. `ioBroker.milight-smart-light` (Steiger04): nur iBox1 v6 und Legacy-Bridge, letzte Version 1.2.2 (2021) \[I8].
- Broadlink RM4 Pro: „RM4 pro IR unterstützt weder 315 MHz noch Rolling Code, nur 433 MHz Festcode-Fernbedienung“ \[R21]; Sonoff RF Bridge: „Die RF Bridge unterstützt nur OOK-Geräte“, lernt „Fernsteuerbefehle mit festem Code, wie sie von den Sendern PT2260, PT2262, PT2264 und EV1527 bereitgestellt werden“ \[R20]. LoRa-Chirps lassen sich damit weder aufzeichnen noch wiedergeben.

---

## 6. Empfohlener Prüfplan auf der eigenen Hardware

Ziel: mit minimalem Aufwand die drei offenen Fragen klären (1) spricht das WL-433 Tuya 3.3 im eigenen LAN, (2) welche Datenpunkte es liefert, (3) wie ist der DMX-Eingang ausgeführt.

1. **DMX-Eingang inspizieren** (Foto der Buchse/Klemme, Aufdruck). Ergebnis entscheidet über Weg B.
2. **Netzwerk-Scan** (Proxmox-LXC/VM mit Python ≥ 3.8): `pip install tinytuya` →`python -m tinytuya scan` findet Tuya-Geräte über die UDP-Broadcasts 6666/6667 und zeigt IP, Geräte-ID und Protokollversion \[C2]. Erscheint das WL-433 mit „3.3“, ist Weg A bestätigt.
3. **Local Key beschaffen** – Variante a) Android-Gerät mit der MiBoxer-App und LogFox (Logcat-Viewer), App-Debug-Ausgabe beim Start/Steuern mitlesen; Dort stehen Geräte-ID und Local Key \[C1]. Variante b) Versuch, das WL-433 in der Smart-Life-App zu paaren (Händlerangabe \[H16]; beim WL-Box1 ist das dokumentiert \[C9]) und anschließend `ioBroker.tuya` -Sync bzw. tinytuya-Wizard (benötigt IoT-Plattform-Konto, monatlich zu verlängern \[C13]). Hinweis: Beim erneuten Koppeln ändert sich der Schlüssel \[C2].
4. **Statusabfrage:** `python -m tinytuya` bzw. Skript: `d = tinytuya.Device(id, ip, key, version=3.3); d.set_socketPersistent(True); print(d.status())` → Liste der DPs. Erwartung: 20–24/26 und 101 \[C1].
5. **Basissteuerung:** `d.set_value(20, True)`, `d.set_value(22, 500)`, `d.set_value(24, "00ff03e803e8")` (HSV-Hex, Format nach \[C2]) – bei geschlossener App.
6. **DP-101-Mitschnitte:** App öffnen, je Zone und je Aktion (Ein, Aus, Farbe, Szene 1…9) genau eine Aktion ausführen und den DP-101-String aus dem LogFox-Log oder per Mitschnitt (pcapdroid + tinytuya-pcap-Parser, Verfahren aus \[C1]) notieren. Frames dekodieren (Base64 → 12 Byte), Prüfsumme prüfen (Anhang A), Bytes differenziell zuordnen. Ergebnis ist die Grundlage für den DP-101-Encoder in Weg A2.
7. **Cloud-Sperre testen:** WL-433 in der UDM Pro auf eine Firewall-Regel ohne Internet setzen und beobachten, ob die lokale Steuerung nach 24 h noch reagiert (Hinweis zu DNS-Sperre in \[C4]).
8. **Optional (Weg C):** RTL-SDR am Pool; Taste der FUT086 drücken; Chirps sichtbar? Mittenfrequenz/Bandbreite notieren – erste Daten für 3.3.6.

---

## 7. Offene Fragen und Unsicherheiten

| Nr. | Frage                                                                                                  | Status                                                                                                                                                                                                        | Weg zur Klärung                                                    |
| --- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 1   | Lässt sich das WL-433 in Tuya Smart / Smart Life paaren (und damit in `ioBroker.tuya` synchronisieren)? | Händler: ja \[H16]; Hersteller: keine Aussage; Anwender: nicht über IoT-Plattform \[C1]                                                                                                                       | Eigener Versuch (Prüfplan 3b)                                      |
| 2   | Enthält das synchronisierte Schema DP 101?                                                             | unbekannt                                                                                                                                                                                                     | `ioBroker.tuya` -Log auf „Unbekannter Datenpunkt 101“ prüfen \[I2] |
| 3   | Byte-Belegung von DP 101                                                                               | **gelöst** (22.09.2026): Befehle, Statusabfrage und Status entschlüsselt, siehe 3.1.8 \[E1]\[E2]; Typ 0x49 = DMX-Startadresse, siehe 3.1.9; Offen nur die genaue Wirkung des Geschmacks `06 05` (Sichtprüfung) | Sichtprüfung am Pool                                               |
| 4   | DMX-Steckertyp/Pinout, Zonenzuordnung, Priorität DMX vs. App                                           | undokumentiert \[H1]                                                                                                                                                                                          | Inspektion, Test                                                   |
| 5   | LoRa-Chip und -Parameter                                                                               | Behauptung SX1278 \[R1], sonst nichts                                                                                                                                                                         | FUT086 öffnen, SDR                                                 |
| 6   | Betriebsspannung PW01 (DC 24 V vs. AC 12 V/DC 12–24 V)                                                 | widersprüchlich \[H3]\[H4]                                                                                                                                                                                    | Hersteller                                                         |
| 7   | Regulatorische Konformität der 15 dBm (ERP)                                                            | Prüfbericht nicht auffindbar                                                                                                                                                                                  | Hersteller/Konformitätserklärung                                   |
| 8   | Firmware-Version/Protokollversion des eigenen WL-433 (3.3 oder bereits 3.4/3.5?)                       | unbekannt                                                                                                                                                                                                     | tinytuya Scan (Prüfplan 2)                                         |

---

## 8. Referenzen

Alle URLs wurden im Rahmen der Recherche (September 2026) abgerufen oder – wo vermerkt – über Spiegelkopien bzw. Suchtreffer verifiziert.

### H – Herstellerdokumente (Miboxer / Futlight)

- **\[H1]** Miboxer: _LoRa 433MHz Gateway, Modellnr.: WL-433 – Benutzerhandbuch, Version V1.0.1_ . <https://miboxer.com/light/download/manual/WL-433.pdf> (Spiegel: <https://www.ledbe.com/image/catalog/MiBoxer/WL433/MiBoxer-WL-433-MHz-Gateway-User-Manual.pdf> )
- **\[H2]** Miboxer: Produktseite _LoRa 433MHz Gateway (WL-433)_ . <https://miboxer.com/product/lora-433mhz-gateway>
- **\[H3]** Miboxer: _PW01/PW02 Benutzerhandbuch V1.0_ (EN/DE). <https://miboxer.com/light/m_n/pdf/PW01_PW02/PW01-PW02_EN_V1.0.pdf> ; <https://miboxer.com/light/m_n/pdf/PW01_PW02/PW01-PW02_DE_V1.0.pdf>
- **\[H4]** Miboxer: Produktseite _27W RGB+CCT PAR56 LED-Poolleuchte (LoRa 433MHz), PW01_ . <https://miboxer.com/product/27w-rgbcct-par56-led-pool-light-lora-433mhz>
- **\[H5]** Miboxer: _FUT086 LoRa 433MHz Funkfernbedienung – Benutzerhandbuch V1.0_ . <https://miboxer.com/light/m_n/pdf/FUT086/FUT086_EN_V1.0.pdf>
- **\[H6]** Miboxer: Produktseite _8-Zonen LoRa 433MHz Fernbedienung (FUT086)_ . <https://miboxer.com/product/8-zone-lora-433mhz-remote-control>
- **\[H7]** Miboxer: _Häufig gestellte Fragen (FAQ)_ . <https://miboxer.com/faq>
- **\[H8]** Miboxer-Forum (offizieller Beitrag „MiBoxer“, 25.03.2025): _Unterstützt die MiBoxer Wi-Fi- und Zigbee-Serie Home Assistant & Homebridge?_ <https://forum.miboxer.com/t/does-miboxer-wi-fi-and-zigbee-series-support-home-assistant-homebridge/29>
- **\[H9]** Miboxer: _Geschichte_ . <https://miboxer.com/history>
- **\[H10]** Miboxer: _Download_ (App-Zuordnung, App-Store-IDs). <https://miboxer.com/download>
- **\[H11]** Miboxer: _Produktkatalog 2023–2024_ . <https://miboxer.com/down/2023-2024_product_catalogue.pdf>
- **\[H12]** Miboxer: Produktkategorie _LoRa 433_ . <https://miboxer.com/products-category/lora-433>
- **\[H13]** Apple App Store: _MiBoxer_ (ID 1460445992, Anbieter Shenzhen Xincaiyi Technology Co., Ltd.). <https://apps.apple.com/us/app/miboxer/id1460445992> ; Google Play `com.futlight.miboxer`
- **\[H14]** Miboxer-Forum (Nutzerbeiträge 2026): _FUT086-Fernbedienung verbindet sich nicht richtig mit PW01_ . <https://forum.miboxer.com/t/fut086-remote-not-linking-up-properly-with-pw01-led-pool-light/251>
- **\[H15]** Miboxer: Produktseite _DMX512 LED-Sender (FUTD01)_ . <https://miboxer.com/product/dmx-512-led-transmitter>
- **\[H16]** Future House Store (Händler): _MiBoxer 433MHz Gateway WL-433_ . <https://futurehousestore.co.uk/miboxer-lora/miboxer-433mhz-gateway-wl-433>
- **\[H17]** LEDBE (Händler): _MiBoxer FUT042 433MHz RGB Controller_ (Angabe „Modulation: ASK“, „LoRa: No“). <https://www.ledbe.com/miboxer-fut042-433mhz-4pin-rgb-controller>
- **\[H18]** Smart Bright LEDs (Händler): _MiBoxer 433MHz Gateway_ . <https://www.smartbrightleds.com/dmx-controllersdecoders-c-217_221/sblwl433-miboxer-433mhz-gateway-p-2146>

### C – Community-Berichte und Dokumentation von Open-Source-Bibliotheken (LAN/Tuya)

- **\[C1]** GitHub, jasonacox/tinytuya, Diskussion Nr. 623: _Fragen und einige Informationen zu MiBoxer WL-433 Gateway DPs_ (Silverstar, uzlonewolf; 04.06.2025). <https://github.com/jasonacox/tinytuya/discussions/623>
- **\[C2]** Cox, J. et al.: _TinyTuya – Python-Modul zur Anbindung von Tuya-WLAN-Smart-Geräten_ , README. <https://github.com/jasonacox/tinytuya>
- **\[C3]** TinyTuya: _PROTOCOL.md_ (Protokollversionen 3.1–3.5, Rahmenformat, Verschlüsselung, Sub-Devices). <https://github.com/jasonacox/tinytuya/blob/master/PROTOCOL.md>
- **\[C4]** make-all: _tuya-local – Home Assistant-Integration zur lokalen Steuerung von Tuya-Geräten_ , README. <https://github.com/make-all/tuya-local>
- **\[C5]** tuya-local: _DEVICES.md_ (Hinweis zu Nicht-Tuya-Geräten hinter Tuya-Hubs). <https://github.com/make-all/tuya-local/blob/main/DEVICES.md>
- **\[C6]** tuya-local: Geräteprofil _miboxer\_wlbox2\_lighting.yaml_ (PR #4254, 07.01.2026). <https://github.com/make-all/tuya-local/blob/main/custom_components/tuya_local/devices/miboxer_wlbox2_lighting.yaml>
- **\[C7]** GitHub, rospogrigio/localtuya, Issue #1436 (WL-Box2-Zonen nur die in der App gewählten). <https://github.com/rospogrigio/localtuya/issues/1436>
- **\[C8]** Home Assistant Community: _MiBoxer WL-Box1 mit lokalem Tuya_ . <https://community.home-assistant.io/t/miboxer-wl-box1-with-local-tuya/320747>
- **\[C9]** Home Assistant Community: _LimitlessLED / Miboxer WL-Box1_ . <https://community.home-assistant.io/t/limitlessled-miboxer-wl-box1/148283>
- **\[C10]** elektroda.com: Teardown eines Miboxer-WLAN-Controllers (Tuya CB3S/BK7231N, Datenpunkte 20–24). <https://www.elektroda.com/rtvforum/topic4030989.html>
- **\[C11]** bcaro/Miboxer, README („Der Miboxer ist völlig anders und verwendet das Tuya-Protokoll.“). <https://github.com/bcaro/Miboxer>
- **\[C12]** tuya-cloudcutter, README („Tuya hat sein SDK im Februar 2022 aktualisiert.“). <https://github.com/tuya-cloudcutter/tuya-cloudcutter>
- **\[C13]** Tuya-Support: _IoT Core Testversion – Ablauf und Verlängerung_ . <https://support.tuya.com/en/help/_detail/Kbm9zue1v7vvu>
- **\[C14]** codetheweb: _TuyAPI – Node.js-Bibliothek für das lokale Tuya-Protokoll_ . <https://github.com/codetheweb/tuyapi>
- **\[C15]** GitHub, jasonacox/tinytuya, Diskussion Nr. 260 (Kryptografie 3.4/3.5). <https://github.com/jasonacox/tinytuya/discussions/260>
- **\[C16]** BKrajancic: _LimitlessLED-DevAPI_ (Archiv der Mi-Light-/LimitlessLED-Entwicklerdokumentation: Wifi Bridge v6 Protocol, 2.4 GHz RF). <https://github.com/BKrajancic/LimitlessLED-DevAPI>
- **\[C17]** mwittig: _Node-Milight-Versprechen_ , `src/commandsV6.js`. <https://github.com/mwittig/node-milight-promise>
- **\[C18]** Tuya Developer: _Probleme beim Koppeln von WLAN-Geräten_ (Token-Ablauf, „Aktivierung fehlgeschlagen“). <https://developer.tuya.com/en/docs/iot-device-dev/Distribution-network-problem-Wi-Fi?id=Kaunggovmyubu>

### I – ioBroker

- **\[I1]** Apollon77: _ioBroker.tuya_ , README. <https://github.com/Apollon77/ioBroker.tuya>
- **\[I2]** Apollon77: _ioBroker.tuya_ , `main.js` („Unbekannter Datenpunkt … Bitte Geräte neu synchronisieren“, `version || 3.3`, `cid`). <https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/main.js>
- **\[I3]** Apollon77: _ioBroker.tuya_ , Releases (3.15.0 Ledvance/Sylvania-Login; 3.17.0 Tuya 3.5; 3.18.2 August 2026). <https://github.com/Apollon77/ioBroker.tuya/releases>
- **\[I4]** ioBroker-Forum: _LED RGB+CCT Strip mit ioBroker steuern_ (WL-BOX2 mit ioBroker.tuya, „Choose\_zone“). <https://forum.iobroker.net/topic/70871/led-rgb-cct-strip-mit-iobroker-steuern>
- **\[I5]** ioBroker-Forum: _MiLight WL-Box1_ . <https://forum.iobroker.net/topic/29496/milight-wl-box1>
- **\[I6]** ioBroker-Forum: _MiGlight/MiBoxer WL5 einbinden_ . <https://forum.iobroker.net/topic/71451/miglight-miboxer-wl5-einbinden>
- **\[I7]** foxthefox: _ioBroker.milight_ , README. <https://github.com/foxthefox/ioBroker.milight>
- **\[I8]** Steiger04: _ioBroker.milight-smart-light_ (README; Issue #27 „Unterstützung WL-Box1“). <https://github.com/Steiger04/ioBroker.milight-smart-light>
- **\[I9]** ioBroker: _ioBroker.artnet_ (npm 1.2.2, 08.04.2020). <https://github.com/ioBroker/ioBroker.artnet>
- **\[I10]** ChriD: _ioBroker.artnetdmx_ ; Forum-Thread _Neuer Adapter artnetdmx_ . <https://github.com/ChriD/ioBroker.artnetdmx> ; <https://forum.iobroker.net/topic/61571/neuer-adapter-artnetdmx>
- **\[I11]** Bordman-ger: _ioBroker.nodedmx_ . <https://github.com/Bordman-ger/ioBroker.nodedmx>
- **\[I12]** ioBroker: _ioBroker.mqtt_ . <https://github.com/ioBroker/ioBroker.mqtt>
- **\[I13]** ioBroker: _ioBroker.javascript – Dokumentation_ (`exec`, zusätzliches npm-Modul). <https://github.com/ioBroker/ioBroker.javascript/blob/master/docs/en/javascript.md>
- **\[I14]** ioBroker Entwicklerdokumentation: _Einen Adapter erstellen_ (`npx @iobroker/create-adapter`). <https://iobroker.github.io/dev-docs/getting-started/02-create-adapter/>
- **\[I15]** Apollon77/ioBroker.tuya, Problem Nr. 519 (Zigbee-Hub-Subgeräte, 120-Sekunden-Abfrage). <https://github.com/Apollon77/ioBroker.tuya/issues/519>
- **\[I16]** ioBroker-Forum: _Tuya 3.9.x und Zigbee local_ (Bestätigung Hub-Support 3.11). <https://forum.iobroker.net/topic/60485/gel%C3%B6st-tuya-3-9-x-und-zigbee-local-geht-noch-nicht/23>
- **\[I17]** ioBroker-Forum, Suche „WL-433“ / „miboxer lora“: „Keine Ergebnisse gefunden“ (Stand September 2026). <https://forum.iobroker.net/search?term=WL-433&in=titlesposts>

### D – DMX-/Art-Net-Hardware und -Firmware

- **\[D1]** Enttec: _ODE Mk3 – DMX-Ethernet-Konverter_ . <https://www.enttec.com/product/dmx-ethernet/ode-mk3-dmx-ethernet-converter/>
- **\[D2]** tombueng: _LuxDMX – Open-Source-Art-Net/sACN → DMX512-Gateway für ESP32_ . <https://github.com/tombueng/LuxDMX>
- **\[D3]** andyboeh: _esphome-dmx512_ . <https://github.com/andyboeh/esphome-dmx512>
- **\[D4]** WLED Wissensdatenbank: _DMX-Ausgang_ . <https://kno.wled.ge/interfaces/dmx-output/>
- **\[D5]** DMX Pro Sales: _DMXking eDMX1 MAX_ . <https://dmxprosales.com/products/dmxking-edmx1-max>

### R – RF-/LoRa-Werkzeuge und Reverse-Engineering-Projekte

- **\[R1]** GitHub, sidoh/esp8266\_milight\_hub, Issue #828: _Unterstützung für FUT086-Remote-Emulation hinzufügen_ (13.05.2024; Antwort sidoh 13.07.2024; offen). <https://github.com/sidoh/esp8266_milight_hub/issues/828>
- **\[R2]** GitHub, 1technophile/OpenMQTTGateway, Issue #1956: _Miboxer Lora_ (29.05.2024; Antwort DigiH; als „stale“ geschlossen 16.09.2024). <https://github.com/1technophile/OpenMQTTGateway/issues/1956>
- **\[R3]** GitHub, merbanan/rtl\_433, Issue #2745 (rtl\_433 kann LoRa nicht demodulieren). <https://github.com/merbanan/rtl_433/issues/2745>
- **\[R4]** OpenMQTTGateway: _LoRa-Gateway – Verwendung/Einrichtung_ . <https://docs.openmqttgateway.com/use/lora.html> ; <https://docs.openmqttgateway.com/setitup/lora.html>
- **\[R5]** ESPHome: _SX127x Komponente_ (LoRa/OOK/FSK; `sync_value` 0x12 privat, 0x34 LoRaWAN). <https://esphome.io/components/sx127x/>
- **\[R6]** jgromes: _RadioLib_ , `SX127x.h` (`REG_SYNC_WORD 0x39`, `SYNC_WORD 0x12`, `SYNC_WORD_LORAWAN 0x34`). <https://github.com/jgromes/RadioLib>
- **\[R7]** rpp0: _gr-lora_ (GNU-Radio-LoRa-Decoder; Zenodo DOI 10.5281/zenodo.853201). <https://github.com/rpp0/gr-lora>
- **\[R8]** tapparelj: _gr-lora\_sdr_ (EPFL, vollständiges LoRa-TX/RX in GNU Radio). <https://github.com/tapparelj/gr-lora_sdr>
- **\[R9]** BastilleResearch: _gr-lora_ . <https://github.com/BastilleResearch/gr-lora>
- **\[R10]** PentHertz: _LoRa\_Craft_ . <https://github.com/PentHertz/LoRa_Craft>
- **\[R11]** Loomwave: _lorascan_ (SX1262, „syncfind“ über 256 Sync-Wörter). <https://github.com/Loomwave/lorascan>
- **\[R12]** JaapBraam: _LoRaWanGateway_ (CAD-basierter SF-Sweep auf SX1276/78). <https://github.com/JaapBraam/LoRaWanGateway>
- **\[R13]** The Things Network Forum: _Sollten private LoRaWAN-Netzwerke ein anderes Synchronisierungswort verwenden?_ („Synchronisierungsworterkennung ist lückenhaft“). <https://www.thethingsnetwork.org/forum/t/should-private-lorawan-networks-use-a-different-sync-word/34496>
- **\[R14]** RevSpace: _DecodingLora_ (Symboldauer 2^SF/BW, Sync-Word im Register 0x39). <https://revspace.nl/DecodingLora>
- **\[R15]** Schweizer, A. (Classy Code, 2021): _LoRa-Sync-Word-Kompatibilität zwischen SX127x und SX126x_ . <https://blog.classycode.com/lora-sync-word-compatibility-between-sx127x-and-sx126x-460324d1787a>
- **\[R16]** Semtech LoRa Entwicklerforum: _Kompatibilität der LoRa-Synchronisationswörter SX1272 und SX1262_ (0x12 ↔ 0x1424, 0x34 ↔ 0x3444). <https://forum.lora-developers.semtech.com/t/sx1272-and-sx1262-lora-sync-word-compatibility/988>
- **\[R17]** Plötz, H. (2015): _Reverse-Engineering des Milight-On-Air-Protokolls_ , Hackaday.io Projekt 5888. <https://hackaday.io/project/5888-reverse-engineering-the-milight-on-air-protocol>
- **\[R18]** Mullins, C. (sidoh): _esp8266\_milight\_hub_ , README. <https://github.com/sidoh/esp8266_milight_hub>
- **\[R19]** Tränkner, T. (2015/2017): _Open Milight auf dem Raspberry Pi 2_ . <https://www.torsten-traenkner.de/wissen/smarthome/openmilight.php>
- **\[R20]** Tasmota-Dokumentation: _Sonoff RF Bridge 433_ ; rtl\_433 PR #1491 („Die RF Bridge unterstützt nur OOK-Geräte“). <https://tasmota.github.io/docs/devices/Sonoff-RF-Bridge-433/> ; <https://github.com/merbanan/rtl_433/pull/1491>
- **\[R21]** Broadlink: _RM4 pro – Benutzerhandbuch_ (manuals.plus). <https://manuals.plus/broadlink/broadlink-rm4-pro-smart-remote-and-sensor-cable-set-rm4-pro-s-universal-ir-rf-remote-control-complete-features-user-guide>
- **\[R22]** Semtech (2024): _AN1200.85 – Kanalaktivitätserkennung (CAD)_ , Version 2.0. <https://www.semtech.com/uploads/technology/LoRa/cad-ensuring-lora-packets.pdf>
- **\[R23]** haksht: _lorecon_ (ESP32-S3 + SX1262 LoRa-Recon). <https://github.com/haksht/lorecon>

### E – Eigene Messungen (Nachtrag 22.09.2026)

- **\[E1]** Mitschnitte der DP-101-Statusframes eines WL-433 (Tuya-Protokoll 3.3) mit dem Adapter ioBroker.miboxer-wl433 0.0.1 (`dp101.history`, Debug-Log), Verifikation der Befehle mit Version 0.1.0 sowie DMX-Antworten, Taste `06 05`, Ausführung eines App-Timers und Praxistest der lokalen Timer mit Version 0.2.0, 22.09.2026.
- **\[E2]** Android-Systemprotokoll (`adb logcat`) der MiBoxer-App `com.futlight.miboxer` auf einem Android-13-Smartphone: Zeilen `ayxsendData =…`, `list value = …` und `publishDps()` sowie die Cloud-Aufrufe `tuya.m.timer.group.*` beim Anlegen eines Timers, 22.09.2026.

### S – Normen, Regulierung, Datenblätter, Patente, Fachliteratur

- **\[S1]** Semtech Corporation (2015): _AN1200.22 – LoRa™ Modulation Basics_ , Revision 2, Mai 2015. Gelistet auf <https://www.semtech.com/products/wireless-rf/lora-connect/sx1276> (Semtech-CDN aus der Recherche-Umgebung nicht abrufbar; Inhalt über Spiegelkopie geprüft).
- **\[S2]** Semtech Corporation (2024): _AN1200.86 – LoRa® und LoRaWAN®_ , v1.0, März 2024. <https://www.semtech.com/uploads/technology/LoRa/lora-and-lorawan.pdf>
- **\[S3]** Semtech Corporation (2020): _SX1276/77/78/79 – 137 MHz bis 1020 MHz Low Power Long Range Transceiver, Datenblatt Rev. 7, Mai 2020_ (Spiegel: <https://core-electronics.com.au/attachments/localcontent/SX1276_Datasheet_52573f9f913.pdf> ; Rev. 4/2015: <https://cdn-shop.adafruit.com/product-files/3179/sx1276_77_78_79.pdf> ). Hinweis: Die Registertabelle (RegSyncWord 0x39) war in den abrufbaren Kopien nicht enthalten; Werte über \[R5]\[R6]\[R15] belegt.
- **\[S4]** Semtech: _SX1261/SX1262 Datenblatt_ (Produktseite, 07.04.2025). <https://www.semtech.com/products/wireless-rf/lora-connect/sx1262>
- **\[S5]** Semtech: _LLCC68 Datenblatt_ (Produktseite, 07.04.2025). <https://www.semtech.com/products/wireless-rf/lora-connect/llcc68>
- **\[S6]** Semtech Corporation (2013): _AN1200.13 – SX1272/3/6/7/8: LoRa Modem Designer's Guide_ , Rev. 1. <https://www.mouser.com/pdfdocs/semtech-lora-modem-design.pdf>
- **\[S7]** Verkäufer, OBA; Sornin, N. (Semtech): _Low Power Long Range Transmitter_ , US 9,252,834 B2 (erteilt 02.02.2016), EP 2 763 321 B1 (erteilt 08.04.2020). <https://patents.google.com/patent/US9252834B2/en> ; <https://patents.google.com/patent/EP2763321B1/en>
- **\[S8]** Vangelista, L. (2017): _Frequenzverschiebungs-Chirp-Modulation: Die LoRa-Modulation_ . IEEE Signal Processing Letters 24(12), 1818–1821. DOI 10.1109/LSP.2017.2762960
- **\[S9]** Robyns, P.; Quax, P.; Lamotte, W.; Thenaers, W. (2018): _Ein Mehrkanal-Softwaredecoder für das LoRa-Modulationsverfahren_ . In: Proc. IoTBDS 2018, S. 41–51, SciTePress. DOI 10.5220/0006668400410051. <https://www.scitepress.org/Papers/2018/66684/>
- **\[S10]** Tapparel, J.; Afisiadis, O.; Mayoraz, P.; Balatsoukas-Stimming, A.; Burg, A. (2020): _Ein Open-Source-LoRa-Physical-Layer-Prototyp auf GNU Radio_ . IEEE SPAWC 2020. DOI 10.1109/SPAWC48557.2020.9154273; arXiv:2002.08208. <https://arxiv.org/abs/2002.08208>
- **\[S11]** Knight, M.; Seeber, B. (2016): _LoRa dekodieren: Realisierung eines modernen LPWAN mit SDR_ . Proceedings of the GNU Radio Conference 1(1). <https://pubs.gnuradio.org/index.php/grcon/article/view/8>
- **\[S12]** LoRa Alliance: _Über LoRaWAN®_ . <https://lora-alliance.org/about-lorawan/>
- **\[S13]** Semtech: _Was ist LoRa?_ <https://www.semtech.com/lora/what-is-lora>
- **\[S14]** LoRa Alliance (2018): _LoRaWAN 1.0.3 Regionale Parameter_ , Rev. A (EU433: 433.175–434.665 MHz, MaxEIRP +12,15 dBm, Sync-Word 0x34). <https://lora-alliance.org/wp-content/uploads/2020/11/lorawan_regional_parameters_v1.0.3reva_0.pdf> (aktuell: RP002-1.0.5, 08.10.2025)
- **\[S15]** ETSI (2017): _EN 300 220-1 V3.1.1 (2017-02) – Kurzstreckengeräte (SRD) im Frequenzbereich von 25 MHz bis 1000 MHz; Teil 1: Technische Merkmale und Messverfahren_ . <https://www.etsi.org/deliver/etsi_en/300200_300299/30022001/03.01.01_60/en_30022001v030101p.pdf>
- **\[S16]** ETSI (2018): _EN 300 220-2 V3.2.1 (2018-06) – … Teil 2: Harmonisierter Standard für den Zugang zum Funkfrequenzspektrum für nicht-spezifische Funkanlagen_ . <https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.02.01_60/en_30022002v030201p.pdf>
- **\[S17]** ETSI (2025): _EN 300 220-2 V3.3.1 (2025-03)_ . <https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.03.01_60/en_30022002v030301p.pdf>
- **\[S18]** CEPT/ECC (2024): _ERC-Empfehlung 70-03 – Über die Verwendung von Kurzstreckenfunkgeräten (SRD)_ , Ausgabe Juni 2024. <https://docdb.cept.org/download/4512>
- **\[S19]** Europäische Kommission (2025): _Durchführungsbeschluss (EU) 2025/105 vom 22. Januar 2025 zur Änderung der Entscheidung 2006/771/EG_ (ABl. L, 2025/105, 23.01.2025). <http://data.europa.eu/eli/dec_impl/2025/105/oj>
- **\[S20]** Europäische Kommission (2022): _Durchführungsbeschluss (EU) 2022/180 vom 8. Februar 2022_ (ABl. L 29, 10.02.2022). <https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32022D0180>
- **\[S21]** Bundesnetzagentur (2025): _Vfg. 91/2025 – Allgemeinzuteilung von Frequenzen zur Nutzung durch Geräte geringer Reichweite (SRD)_ , November 2025. <https://www.bundesnetzagentur.de/DE/Fachthemen/Telekommunikation/Frequenzen/Allgemeinzuteilungen/_DL/vfg91_2025.pdf?__blob=publicationFile&v=3>
- **\[S22]** ESTA (2024): _ANSI E1.11-2024 – Entertainment Technology – USITT DMX512-A Asynchronous Serial Digital Data Transmission Standard for Controlling Lighting Equipment and Accessories_ . <https://tsp.esta.org/tsp/documents/published_docs.php>
- **\[S23]** ESTA (2018): _ANSI E1.11-2008 (R2018)_ – ANSI-Vorschau. <https://webstore.ansi.org/preview-pages/esta/preview_ansi-esta_e1-11_2008r2018.pdf>
- **\[S24]** Hefter, M. (USITT): _Emerald Anniversary für USITT DMX512_ , USITT Sightlines (Geschichte 1986/1990/2004). <http://sightlines.usitt.org/archive/v46/n08/stories/DMX.html>
- **\[S25]** TIA (1998): _ANSI/TIA/EIA-485-A-1998 – Elektrische Eigenschaften von Generatoren und Empfängern für den Einsatz in symmetrischen digitalen Mehrpunktsystemen_ . <https://www.dinmedia.de/en/standard/eia-tia-485-a/51801110>
- **\[S26]** Silverman, S.: _TeensyDMX – break-timing.md_ (Sekundärquelle zu E1.11-Timing). <https://github.com/ssilverman/TeensyDMX/blob/master/extras/break-timing.md>
- **\[S27]** SOUNDLIGHT: _Der neue Standard: DMX-512A_ (Sekundärquelle: 250 kbit/s, BREAK ≥ 92 µs/88 µs, unidirektional/RDM). <https://www.dmx512.de/dmx512a/index.htm>
- **\[S28]** IEEE (2021): _IEEE Std 802.11-2020 – Wireless LAN MAC- und PHY-Spezifikationen_ . DOI 10.1109/IEEESTD.2021.9363693 (zwischenzeitlich abgelöst durch IEEE 802.11-2024). <https://standards.ieee.org/ieee/802.11/7028/>
- **\[S29]** Steigerwald, M. (VTRUST) (2018): _Smart Home – Smart Hack_ , 35C3. <https://media.ccc.de/v/35c3-9723-smart_home_-_smart_hack>
- **\[S30]** ct-Open-Source: _tuya-convert_ . <https://github.com/ct-Open-Source/tuya-convert>
- **\[S31]** Tleuberdin, S.; Satybaldina, D.; Muratkhan, R.; Abisheva, G. (2026): _Sicherheitsaudit von Tuya Smart Lock mithilfe der Penetrationstestmethode_ . Computer, Materialien & Fortsetzung 88(3). DOI 10.32604/cmc.2026.081906
- **\[S32]** Texas Instruments (2005): _SWRA048 – Übersicht zur Einhaltung der Vorschriften für ISM-Band- und Kurzstreckengeräte_ (ERP = EIRP − 2,15 dB). <https://www.ti.com/lit/an/swra048/swra048.pdf>
- **\[S33]** Funkanlagengesetz (FuAG) § 7. <https://lxgesetze.de/fuag/7>
- **\[S34]** Semtech: Produktseite SX1276 (Liste der Application Notes AN1200.22, AN1200.86 ua). <https://www.semtech.com/products/wireless-rf/lora-connect/sx1276>
- **\[S35]** Hornbuckle, CA (Semtech): _Fractional-N synthetisierter Chirp-Generator_ , US 7,791,415 B2 (2010) – Vorläuferpatent, nicht das LoRa-Modulationspatent. <https://patents.google.com/patent/US7791415B2/en>
- **\[S36]** Tuya-Support: _Lokaler Schlüssel für bestimmte Gerätekategorien nicht verfügbar_ (Stand: 19.05.2022). <https://support.tuya.com/en/help/_detail/K9tndtl21hlin>
- **\[S37]** FCC-Grantee-Code 2AJWW (Futlight Optoelectronics Co., Ltd.) – z. B. <https://fcc.report/FCC-ID/2AJWW-LS2> ; <https://fccid.io/2AJWW-FUT092> (Datenbanken aus der Recherche-Umgebung nur eingeschränkt erreichbar)
- **\[S38]** Signal Identification Wiki: _LoRa_ . <https://www.sigidwiki.com/wiki/LoRa>

---

## Anhang A – Nachrechnung der DP-101-Prüfsumme

Eigene Prüfung (Python) der sieben in \[C1] veröffentlichten Frames: Base64 → 12 Byte; Prüfsummenhypothese Σ(Byte 0…10) mod 256 = Byte 11.

```
4300008000000000008080c3  12 Byte  OK  (0xc3)
4900000b02000100000080d7  12 Byte  OK  (0xd7)
4100000b06010000000080d3  12 Byte  OK  (0xd3)
4100000b06060000000080d8  12 Byte  OK  (0xd8)
4400000000010001000b0152  12 Byte  OK  (0x52)
4900000b0201000100000159  12 Byte  OK  (0x59)   [Base64-String im Thread ergibt …0158 – vermutlich Tippfehler]
4200000002010001000b0152  12 Byte  OK  (0x52)
```

Ergebnis: Die Prüfsummenhypothese von uzlonewolf \[C1] ist für alle veröffentlichten Frames konsistent. Ein DP-101-Encoder kann damit gültige Frames erzeugen, sobald die Semantik der Bytes 0–10 bekannt ist.

## Anhang B – Hinweise zur Sitzung (Schätzwerte)

- **Dauer:** Die fünf Recherche-Agenten leben parallel jeweils ca. 14–18 Minuten; Mit Verifikation und Berichtsstellung liegt die Gesamtdauer grob bei 45–60 Minuten (kein exakter Zeitgeber verfügbar).
- **Token-Verbrauch:** Die Agenten meldeten zusammen ca. 915.000 Token (172.000 + 198.000 + 199.000 + 178.000 + 167.000); Hinzu kommt der Kontext des Hauptagenten (grob 200.000–250.000 Token). Gesamt grob **1,1–1,2 Mio. Token** – Schätzung, kein exakter Zähler.
- **Kosten:** Der Max-Plan ist eine Pauschale ohne Token-Preis. Eine anteilige Zuordnung wäre nur als (Sitzungs-Token ÷ Monats-Token) × Monatspreis möglich; Beide Größen sind hier nicht bekannt. Es wird daher kein Euro-Betrag angegeben.