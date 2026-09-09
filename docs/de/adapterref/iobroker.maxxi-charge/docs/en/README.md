---
chapters: {"pages":{"en/adapterref/iobroker.maxxi-charge/README.md":{"title":{"en":"ioBroker.Maxxi-Charge"},"content":"en/adapterref/iobroker.maxxi-charge/README.md"},"en/adapterref/iobroker.maxxi-charge/docs/en/README.md":{"title":{"en":"ioBroker.Maxxi-Charge"},"content":"en/adapterref/iobroker.maxxi-charge/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.maxxi-charge/docs/en/README.md
title: ioBroker.Maxxi-Charge
hash: tposDjxy4ksGj4sH4fkVT29innJEQ9+Bh8aJ0Cs+z+E=
---
# ioBroker.Maxxi-Charge

**ioBroker.MaxxiCharge** ist ein Adapter für das ioBroker-System, der die Integration und Steuerung von MaxxiCharge CCU-Geräten ermöglicht. Der Adapter bietet verschiedene Funktionen, darunter das Auslesen von Gerätedaten, das Anpassen von Konfigurationen und das Senden von Steuerbefehlen.

## Merkmale

- **Datenabfrage** :
  - Liest Informationen wie IP-Adresse, Status oder Leistung der CCU.
  - Erstellt automatisch dynamische Datenpunkte für Gerätedaten.
  - Unterstützt mehrere CCU-Einheiten gleichzeitig.
- **Konfiguration** :
  - Passt Parameter wie maximale Ausgangsleistung, Schwellenwerte oder Ladeverhalten an.
  - **Sommer-/Wintermodus** : Passt die Ladeparameter dynamisch an die Jahreszeit an.
  - **Batteriekalibrierung** : Unterstützt einen automatisierten Kalibrierungsprozess für die Batterie.
  - **Einspeisesteuerung** : Konfiguriert die maximale Ladung, um die Energieeinspeisung in das Netz zu aktivieren oder zu deaktivieren.
- **Steuerbefehle** :
  - Dynamische Datenpunkte (`<deviceId>.sendcommand` ) werden verwendet, um Befehle an die CCU zu senden.
- **Festes Abfrageintervall (Cloud-Modus)** :
  - Das Abfrageintervall der CCU-Daten ist auf 5 Sekunden festgelegt.

## Anforderungen

| Komponente          | Beschreibung                                |
| ------------------- | ------------------------------------------- |
| **MaxxiCharge CCU** | Unterstütztes Gerät mit Netzwerkverbindung. |
| **ioBroker**        | ioBroker-Instanz installiert.               |
| **Node.js**         | Node.js 22.x oder neuer.                    |

## Installation

1. **Konfigurieren Sie den Adapter** :
   - Wählen Sie den API-Modus ( **Cloud** oder **Lokal** ).
     - **Wolke** :
       - Geben Sie den **CCU-Namen** ein (z. B.`maxxi-XXXXXX-YYY` ).
     - **Lokal:** Geben Sie die ioBroker-Adresse auf der MaxxiCharge-Webseite ein (`maxxi.local` ) unter`Api-Route` :`http://"ioBroker IP":"PORT"` Die

## Konfigurationsoptionen

| Einstellung               | Beschreibung                                                                                                                                                                                                                                        |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Maxxi CCU Name**        | Name oder IP-Adresse der Maxxi CCU.                                                                                                                                                                                                                 |
| **CCU-Abfrageintervall**  | Legacy-Einstellung. Im Cloud-Modus ist das CCU-Abfrageintervall auf 5 Sekunden festgelegt und nicht konfigurierbar.                                                                                                                                 |
| **Sommer-/Wintermodus**   | Die Ladeparameter werden automatisch auf Basis der festgelegten Winterdaten angepasst.                                                                                                                                                              |
| **Port für Local-API**    | Definiert den Port, an dem die Local-API lauscht.                                                                                                                                                                                                   |
| **Einspeisungssteuerung** | Legt fest, ob überschüssige Energie in das Stromnetz eingespeist wird.                                                                                                                                                                              |
| **Batteriekalibrierung**  | Startet den automatischen Kalibrierungsprozess für die Batterie.                                                                                                                                                                                    |
| **BKW-Modus**             | Bei einem Batteriestand von ≥ 97 % ermöglicht das Skript den BKW-Modus, um neben dem Eigenverbrauch konstant 600–800 W in das Netz einzuspeisen und gegebenenfalls eine Vergütung zu erhalten, wenn es als Balkonstromsystem (BKW) registriert ist. |

## Sommer-/Wintermodus

Der Sommer-/Wintermodus passt die Ladeparameter dynamisch an:

- **Wintermodus** :
  - Die Mindestladung beträgt täglich um 8:00 Uhr 60 %.
  - Wenn der Ladezustand (SOC) ≥ 55 % beträgt, wird die Mindestladung auf 40 % reduziert.
- **Sommermodus** :
  - Der Mindestaufschlag beträgt 10%.
  - Die maximale Ladung ist auf 95 % begrenzt.
- Die Aktivierung erfolgt über ein Kontrollkästchen in den Adaptereinstellungen, und die Zeiträume werden durch den Winterbeginn und das Winterende definiert.

## BKW-Modus

Der BKW-Modus ermöglicht die gezielte Einspeisung überschüssiger Energie aus dem Batteriespeicher in das öffentliche Stromnetz. Sobald der Ladezustand (SOC) der Batterie ≥ 97 % erreicht, aktiviert der Adapter automatisch den BKW-Modus. In diesem Modus wird neben dem normalen Haushaltsverbrauch kontinuierlich eine feste Leistung (z. B. 600 oder 800 W) in das Netz eingespeist. Dies ist sinnvoll, wenn eine Balkonstromanlage (BKW) offiziell registriert ist und eine Netzeinspeisung vergütet wird.

Sinkt der Ladezustand der Batterie unter 97 %, wird der BKW-Modus automatisch deaktiviert und die zusätzliche Netzeinspeisung reduziert oder gestoppt. Dieser Vorgang läuft vollautomatisch ab und erfordert keine weitere Benutzerinteraktion.

## Batteriekalibrierung

Die Batteriekalibrierungsfunktion unterstützt einen automatisierten Prozess:

1. **Start** :
   - Der Adapter reduziert die`minSOC` Einstellung auf 1 %, um die Batterie zu entladen.
2. **Aufladen** :
   - Nach Erreichen von <1% SOC,`minSOC` Die Einstellung wird auf 99 % erhöht.
3. **Abschluss** :
   - Sobald ein Ladezustand von 99 % erreicht ist, nimmt der Adapter den normalen Betrieb wieder auf.

Die Batteriekalibrierung kann in den Experteneinstellungen aktiviert werden.

## Einspeisungssteuerung

Die Feed-in-Control-Funktion ermöglicht die Konfiguration der maximalen Ladung (`maxSOC` ) um festzustellen, ob überschüssige Energie in das Netz eingespeist wird:

- **95 % / 90 % (Einspeisung aktiv)** :
  - Überschüssige Energie wird in das Stromnetz eingespeist, wenn der Ladezustand der Batterie 90 % übersteigt.
- **100 % (Einspeisung deaktiviert)** :
  - Es wird keine überschüssige Energie in das Netz eingespeist.

## Datenpunkte

Der Adapter erstellt dynamisch Datenpunkte basierend auf den vom CCU zurückgegebenen Informationen. Hier ein kleiner Auszug aus dem Layout der Datenpunktstruktur:

| Datenpunkt                  | Beschreibung                                 |
| --------------------------- | -------------------------------------------- |
| `<deviceId>.SOC`            | Akkuladestand.                               |
| `<deviceId>.PV_power_total` | Gesamt-PV-Leistung.                          |
| `<deviceId>.batteriesInfo`  | Batterieinformationen.                       |
| `<deviceId>.convertersInfo` | Konverterstatus.                             |
| `<deviceId>.settings.*`     | Gerätespezifische Einstellungen. (nur Cloud) |
| `<deviceId>.sendcommand.*`  | Steuerbefehle für die CCU.                   |

## Anmerkungen

- Änderungen an Datenpunkten in der`<deviceId>.sendcommand` Abschnitte werden automatisch erkannt und an die CCU gesendet.
- Sollten Probleme mit fehlenden Datenpunkten oder unerwartetem Verhalten auftreten, starten Sie den Adapter neu.

## Fehler

- **Fehler bei der Datenverarbeitung** :
  - `deviceId` nicht verfügbar → Starten Sie den Adapter nach Eingabe der CCU-Informationen neu.

- **Die Einträge auf der Webseite der App (online) werden zurückgesetzt** :
  - Verwenden Sie ausschließlich die`maxxi.local` Manuelle Eingaben können über die Website oder die IP-Adresse der CCU vorgenommen werden. Bei Verwendung der SendCommand-Steuerbefehle werden Online-Einträge überschrieben.