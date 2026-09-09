---
chapters: {"pages":{"en/adapterref/iobroker.ankersolix2/README.md":{"title":{"en":"ioBroker.ankersolix2"},"content":"en/adapterref/iobroker.ankersolix2/README.md"},"en/adapterref/iobroker.ankersolix2/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.ankersolix2/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ankersolix2/docs/en/README.md
title: kein Titel
hash: Ose5uwVzZN5bD5zACplldzeY59aJx3IkUdBJF90WM+Y=
---
## 📑 Inhaltsverzeichnis

- [AdminUI-Übersicht](#adminui)
- [Merkmale](#features)
- [Datenpunkte](#data-points)

---

## AdminUI

Übersicht der in der AdminUI verfügbaren Funktionen.

### Optionen

![....](../../../../../en/adapterref/iobroker.ankersolix2/docs/de/media/adminoptions.png)

- Anmeldeinformationen
  - Geben Sie die Anmeldedaten für Ihr Konto ein.\
    &#x20;Ab Ende Juli 2025 kann auch das Administratorkonto verwendet werden.\
    &#x20;da unterschiedliche Geräte sich nicht mehr gegenseitig mit ihren Token stören.
  - Der ausgewählte Server muss sowohl die Serveradresse als auch die Ländervorwahl enthalten.\
    &#x20;wo das Konto ursprünglich erstellt wurde. Andernfalls können Anmeldefehler auftreten.

- Batterieoptionen
  - Da die Anker Cloud keine direkten Informationen zum Batterietyp liefert (sondern nur zur Anzahl),\
    &#x20;Sie können manuell festlegen, wie viele Batterien jedes Typs installiert werden.\
    &#x20;Diese Eingabe ist unerlässlich für die Berechnung der gesamten in der Batterie gespeicherten Energie.\
    &#x20;(Datenpunkt:`battery_energy` der jeweiligen Solarbank).

### Statistiken

![....](../../../../../en/adapterref/iobroker.ankersolix2/docs/de/media/adminstat.png)

Hier können Sie auswählen, welche statistischen Daten aus der Cloud abgerufen werden und wie sie angezeigt werden.\
&#x20;Bitte deaktivieren Sie alle unnötigen Daten, um die Häufigkeit der Anfragen zu reduzieren.

### Kontrolle

![....](../../../../../en/adapterref/iobroker.ankersolix2/docs/de/media/admincontrol.png)

- Für die Steuerung des Standorts ist die Solarbank vorgesehen.\
  &#x20;Hier wird lediglich die Standort-ID ausgewählt, nicht die Solarbank selbst.\
  &#x20;Keine Sorge – wenn Sie Solarbank auswählen, wird ohnehin nur die Standort-ID verwendet.

- Steuerung über einen benutzerdefinierten Datenpunkt: Dieser ist frei wählbar.\
  &#x20;Sofern konfiguriert, überwacht der Adapter den Datenpunkt auf Änderungen.\
  &#x20;Ändert sich der Wert, schaltet der Adapter die Solarbank in den benutzerdefinierten Modus mit 24/7-Betrieb.\
  &#x20;und verwendet den Leistungswert aus dem Datenpunkt.\
  &#x20;Mit der Option „Maximale Ausgangsleistung für die Adaptersteuerung (W)“ kann ein zusätzlicher Grenzwert für diesen Wert festgelegt werden.

- Wenn der Wert im Datenpunkt höher ist als der konfigurierte Grenzwert, wird nur der auf den Grenzwert begrenzte Wert an die Anker Cloud übertragen.

  Warnung: Alle manuell konfigurierten benutzerdefinierten Zeitpläne werden überschrieben.\
  &#x20;Eine alternative Lösung finden Sie im Abschnitt „Energieplan“.

### Energieplan

![....](../../../../../en/adapterref/iobroker.ankersolix2/docs/de/media/adminenergy.png)

- Genau wie in der Anker-App können Sie auch hier einen Zeitplan festlegen.\
  &#x20;oder die vorhandene Datei aus der Cloud lesen und zurückschreiben.
- Ist diese Option aktiviert, können Sie den Zeitplan extern über den Datenpunkt reaktivieren:\
  `ankersolix2.x.control.SetPowerplan`
- Die Option „Beim Neuladen festlegen“ stellt sicher, dass der konfigurierte Plan automatisch angewendet wird.\
  &#x20;nach dem Neustart des Adapters.

### Benutzerdefinierter Zeitplan

![....](../../../../../en/adapterref/iobroker.ankersolix2/docs/de/media/adminenergy.png)

- Dadurch kann der Adapter den Betriebsmodus der Solarbank umschalten.\
  &#x20;nach einer bestimmten Zeit.

---

## Merkmale

- Daten aus der Anker Cloud lesen und als Datenpunkte (ungefiltert) anzeigen.
- Statistische Werte aus der Anker Cloud abrufen
- Konfigurieren Sie Zeitpläne mit automatischer Modusumschaltung.
- Bearbeiten Sie Energiepläne ähnlich wie in der offiziellen App.

---

## Datenpunkte

### ankersolix2.0.\<Site-ID>

| Name          | Beschreibung                                                                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `\<Site-ID\>` | Unter der Site-ID werden alle Daten des abgerufenen Systems angezeigt. Alle Werte sind schreibgeschützt und können nicht zu Steuerungszwecken verwendet werden. |

### ankersolix2.0.control.\*

| Name           | Beschreibung                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ACLoading`    | Ermöglicht externen Skripten, das Laden von Wechselstromgeräten über das Stromnetz auszulösen. Die Dauer ist fest: 12 Stunden ab dem Zeitpunkt der Aktivierung.`true` Die |
| `SetPowerplan` | Wendet den in der AdminUI konfigurierten Energiesparplan erneut an.                                                                                                       |

---