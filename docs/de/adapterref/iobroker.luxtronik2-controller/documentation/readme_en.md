---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md
title: kein Titel
hash: bdeubyo8ZiCPq/IqLfNhVGk4ilLnm+zlrW1EXUHHEGw=
---
## Konfiguration der Adapterinstanz

Nach der Installation des Adapters öffnet sich die Konfigurationsoberfläche. Diese ist in verschiedene Registerkarten unterteilt, um die Einrichtung so übersichtlich wie möglich zu gestalten.

### 1. Registerkarte: Verbindung

Diese Seite enthält die grundlegenden Netzwerkeinstellungen für die Kommunikation mit dem Luxtronik-Controller sowie die Anzeigesprache des Adapters.

#### Verbindungseinstellungen

- **IP-Adresse (Host):** Geben Sie hier die lokale IP-Adresse Ihrer Wärmepumpe in Ihrem Netzwerk ein (z. B. `192.168.178.12`).
- **Wärmepumpenanschluss:** Der Kommunikationsanschluss des Controllers.
  - `8889` = Standardport für die klassische TCP-Kommunikation (häufig verwendet mit Firmware V2.x).
  - `8214` = WebSocket-Port (in der Regel erforderlich für neuere Systeme ab Firmware-Version V3.81x).
- **Abfrageintervall (Sekunden):** Gibt das Zeitintervall an, in dem der Adapter neue Messwerte und Parameter von der Wärmepumpe abruft (Standard: 45 Sekunden).

> 💡 **WICHTIGER HINWEIS ZUM ABGESTIMMUNGSINTERVALL:** Wählen Sie **keinen** zu niedrigen Wert! Zu häufiges Abfragen (z. B. alle 10 Sekunden) überlastet den internen Prozessor des Luxtronik-Controllers permanent mit Anfragen. Dies führt zu einer hohen CPU-Last der Wärmepumpe und macht den Controller (sowohl auf dem Touchscreen als auch im Netzwerk) extrem träge. Empfohlen werden Werte zwischen 45 und 60 Sekunden.

---

#### Optionen

- **Sprache für Texte und Werte:** Diese Einstellung legt die Sprache fest, in der textbasierte Zustände und Betriebsmodi in die ioBroker-Datenpunkte geschrieben werden. Der Adapter übersetzt die numerischen Systemcodes automatisch in lesbaren Text.

_Beispiel: Wenn die Wärmepumpe Wasser erwärmt, schreibt der Adapter entweder `Warmwasser` (Deutsch) oder `Hot water` (Englisch) in den Objektbaum abhängig von Ihrer Auswahl._

![Beispiel für übersetzte Werte im ioBroker-Objektbaum](../../../../en/adapterref/iobroker.luxtronik2-controller/admin/img/Objekte.png)

### 2. Registerkarte: Zyklusoptimierung

Standardmäßig behandelt der Luxtronik-Regler Heizungs- und Warmwasserzyklen strikt getrennt. Dies führt häufig dazu, dass der Kompressor nach der Warmwasserbereitung abschaltet und kurz darauf für einen Heizzyklus wieder anspringt (erhöhter Verschleiß). Dieser Adapter koppelt diese Vorgänge intelligent, sodass der Kompressor nahtlos und effizient in einem einzigen, kontinuierlichen Zyklus läuft.

- **Intelligente Zyklusoptimierung aktivieren:** Ermöglicht es der übergeordneten Logik, unnötige Kompressorstopps zu verhindern.
  - **Auslöseregel (Vorzündung):** Wenn das Brauchwarmwasser abkühlt `(DHW Target - DHW Actual ≥ DHW Hysteresis - 1.5 K)` **UND** gleichzeitig besteht ein Wärmebedarf `(Return Actual ≤ Return Target)` Solange die Sommerheizbegrenzung nicht aktiv ist, greift der Adapter ein.
  - **Vorgehensweise:** Der Adapter startet direkt den Heizbetrieb und stellt die Rücklauftemperatur vorübergehend auf 35 °C ein, um den Kompressor sofort zu starten. Schaltet das System kurz darauf auf Warmwasser um, läuft der Kompressor einfach weiter.
- **Erzwingendes Aufheizen nach Warmwasserbereitung:** Im Aktivierungsmodus prüft der Adapter das System auch _nach_ einem Warmwasserzyklus. Der Rücklauf-Sollwert bleibt auf 35 °C erhöht, sodass der Kompressor nach der Warmwasserbereitung nicht abschaltet, sondern den Heizzyklus sofort fortsetzt.

> **⚠️ Wichtiger Hinweis:** Wenn Sie diese Zyklusoptimierung nutzen, wird **dringend empfohlen** , die Option _„Standardwerte im Leerlauf erzwingen“_ im Reiter _„Leerlauf“_ zu aktivieren. Nur so kann sichergestellt werden, dass der vorübergehend angepasste Zielwert von 35 °C am Ende des Zyklus wieder auf Ihre normalen Heizwerte zurückgesetzt wird!

![Beispiel für Zyklusoptimierung](../../../../en/adapterref/iobroker.luxtronik2-controller/admin/img/Takt_Optimierung_de.svg)

### 3. Registerkarte: Leerlauf (Hardwareschutz)

Der Luxtronik-Controller speichert geänderte Parameter in einem internen Flash-Speicher, der nur eine begrenzte Anzahl von Schreibzyklen aushält (EEPROM-Flash-Verschleiß). Um diesen Speicher zu schützen, führt der Adapter Schreibvorgänge nur durch, wenn das System aktiv läuft (Heizung oder Warmwasser).

Sobald die Wärmepumpe in den **Leerlauf (Standby)** wechselt, wird die Optimierung beendet. Um zu verhindern, dass das System mit temporären (geänderten) Parametern aus der Optimierung weiterläuft, versetzt der Adapter den Regler in einen sicheren Ausgangszustand zurück.

> **💡 Dringender Hinweis:** Wenn Sie die **intelligente Zyklusoptimierung** (Kopplung von Warmwasser und Heizung) und/oder die **dynamische HUP-Steuerung** nutzen, sollten Sie unbedingt die Speicherung der Standardwerte im Leerlauf aktivieren! Nur so ist sichergestellt, dass das System nach einem Eingriff des Adapters weiterhin mit Ihren ursprünglichen Sollwerten arbeitet.

- **Standardwerte:** Geben Sie hier unbedingt die genauen ursprünglichen Standardwerte Ihres Heizsystems ein (z. B. Standard-Hysterese für Heizung/Warmwasser, Basispunkt, Endpunkt und Pumpenspannung).
- **Visuelle Heizkurve:** Zur besseren Orientierung generiert der Adapter eine grafische Live-Vorschau Ihrer Heizkurve (Zielwert), sobald Sie die Start- und Endpunkte eingeben. _(Vielen Dank an [mnemotron.de](https://www.mnemotron.de/lux/heatcurve.html) für die Inspiration zu dieser Darstellung!)_

### 4. Registerkarte: Heizungsumwälzpumpe (HUP)

Die Heizungsumwälzpumpe transportiert das warme Wasser von der Wärmepumpe in den Heizkreislauf. Eine feste Pumpenleistung ist jedoch ineffizient: Ist sie zu hoch, strömt das Wasser zu schnell durch die Rohre und kann die Wärme nicht optimal an den Raum abgeben. Ist sie zu niedrig, kühlt das Wasser zu stark ab, und die Wärmepumpe verliert an Effizienz.

Dieser Adapter löst das Problem durch **dynamische Regelung auf Basis der Temperaturdifferenz** (Differenz zwischen Vor- und Rücklauf). Während eines Heizzyklus wird die Pumpensteuerspannung in regelmäßigen Abständen in kleinen Schritten erhöht oder verringert, um stets präzise im optimalen Zielbereich zu bleiben.

> **⚠️ Wichtige Voraussetzungen (Bitte vor der Aktivierung prüfen!)**
>
> 1. **Hardwarekompatibilität:** Nutzen Sie diese Funktion nur, wenn Ihre Umwälzpumpe tatsächlich über ein Steuerkabel (0–10 V oder PWM) mit der Luxtronik-Platine verbunden ist! Wenn Ihre Pumpe den Volumenstrom selbstständig regelt (z. B. eine _Grundfos ALPHA2 AutoAdapt_ im Modus „Auto“), dürfen Sie diese Funktion **nicht** aktivieren. Andernfalls regeln sich Adapter und Pumpe permanent gegenseitig entgegen.
> 2. **Spannungsfaktor (Firmware):** Ältere Firmware-Versionen der Version 2.x erwarten die Steuerspannung in einem anderen Datenformat als neuere Firmware-Versionen der Version 3.x (z. B. beim LWCV 82). Stellen Sie sicher, dass Sie in der Konfiguration den korrekten Hardwarefaktor für Ihr System auswählen (`100` für V2.x vs. `10` für V3.x).
> 3. **Sicherheitsreset (Leerlauf):** Aktivieren Sie unbedingt die Funktion _„Standardwerte im Leerlauf erzwingen“_ im Reiter „Leerlauf“. Dadurch wird sichergestellt, dass die Pumpe am Ende des Heizzyklus auf ihre feste Standardspannung zurückfällt, anstatt auf dem eingestellten Wert zu verharren.

#### Systemkonfiguration

Die optimale Temperaturverteilung ist für jedes Haus extrem individuell und hängt vom Heizsystem ab:

- **Fußbodenheizung (UFH):** Funktioniert mit einem großen Wasservolumen und niedrigen Temperaturen. Hier ist eine Temperaturdifferenz von **3 bis 5 Kelvin** oft optimal.
- **Heizkörper:** Sie benötigen höhere Vorlauftemperaturen und kühlen den Raum deutlich stärker ab. Hier ist typischerweise mit einer Temperaturdifferenz von **7 bis 10 Kelvin** zu rechnen.

Geben Sie unter _„Minimale/Maximale Streuung“_ die für Ihr System geeigneten Grenzwerte ein. Der Adapter prüft dann alle _X Minuten_ (einstellbares Intervall), ob die Streuung noch im Zielbereich liegt. Ist die Streuung zu gering (Wasser fließt zu schnell), wird die Pumpenspannung um den eingestellten _Schritt_ (z. B. 0,25 V) reduziert. Ist die Streuung zu hoch, wird sie schrittweise erhöht.

![Beispiel für HUP-Optimierung](../../../../en/adapterref/iobroker.luxtronik2-controller/admin/img/HUP_Optimierung_de.svg)

### 5. Registerkarte: Umwälzpumpe (ZIP)

Die Umwälzpumpe (ZIP) sorgt dafür, dass an den Wasserhähnen im Haus (z. B. Dusche, Waschbecken) sofort warmes Wasser zur Verfügung steht. Läuft sie jedoch ständig oder zu häufig über eine Zeitschaltuhr, kühlt sie den Warmwasserspeicher stark ab (Energieverlust) und verbraucht unnötig Strom.

Dieser Adapter bietet intelligente Automatisierungen, damit die ZIP-Datei nur dann ausgeführt wird, wenn sie tatsächlich benötigt wird.

- **Intelligente ZIP-Optimierung:** Im aktiven Zustand überwacht der Adapter die Wärmepumpe. So kann beispielsweise die Zirkulation vollständig synchron mit der Warmwasserbereitung erfolgen.
- **Laufzeit nach Aktivierung:** Definiert, wie lange (in Sekunden) die Pumpe laufen soll, wenn sie durch den Adapter oder manuell (über den `Activate_Zip` (Schalter im Objektbaum). Es wird üblicherweise empfohlen, das Rohrsystem einmal in kurzen Intervallen von 120 bis 180 Sekunden mit warmem Wasser zu spülen.
- **Bewegungsmelder (auf Abruf):** Maximales Sparpotenzial! Hier können Sie die ioBroker-Datenpunkte Ihrer Smart-Home-Bewegungsmelder eingeben (z. B. Zigbee-Sensoren in Bad oder Küche). Sobald jemand den Raum betritt, startet der Adapter einen kurzen Wasserdurchlauf. Das Wasser ist warm, sobald Sie am Waschbecken stehen – ganz ohne Energieverschwendung.
- **Externe Aktoren (z. B. Smart Plugs):** Wenn Ihre Umwälzpumpe nicht direkt an die Luxtronik-Platine, sondern an ein intelligentes Relais (z. B. Shelly, Osram Smart Plug usw.) angeschlossen ist, können Sie die Datenpunkte der Steckdosen hier speichern. Der Adapter schaltet Ihre WLAN-/Zigbee-Steckdosen dann automatisch mithilfe der internen Logik ein und aus. _(Vorteil: Dadurch werden keine Flash-Schreibvorgänge im Speicher der Wärmepumpe durchgeführt!)_

**💡 Tipp! Hardwareschutz (EEPROM-Flash-Verschleiß – Bitte beachten!)** Um ständiges Schreiben in den Controller zu minimieren, tragen Sie die regulären Postleitzahlenzeiten einmalig in die Tabelle „Mo–So“ ein und geben Sie dort 00:00–00:00 ein. Stellen Sie die Zykluszeiten auf „Aus: 60 Minuten“ und „Ein: 0 Minuten“ ein.

**Um die Schreibvorgänge auf dem Controller zu reduzieren, wird empfohlen, die ZIP(s) über einen externen Aktor zu steuern ➔ 0 Schreibvorgänge im Controller!** **Zum Vergleich:** Die Aktivierung über den Luxtronik2-Controller erfordert 4 Schreibvorgänge für das Entlüftungsprogramm. Die Verwendung der ZIP-Steuertabelle erfordert zwischen 4 (im besten Fall) und 14 (im schlimmsten Fall) Schreibvorgänge im Flash-Speicher pro ZIP-Zyklus.