---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md
title: kein Titel
hash: bAOVdajmtIqtf9jEI7uH4oA+iQZZxe2DGcjctk5fGWE=
---
## Konfiguration der Adapter-Instanz

Nach der Installation des Adapters öffnet sich die Konfigurationsoberfläche. Diese ist in verschiedene Reiter (Tabs) unterteilt, um die Einrichtung so übersichtlich wie möglich zu gestalten.

### 1. Reiter: Verbindung

Auf dieser Seite werden die grundlegenden Netzwerkeinstellungen für die Kommunikation mit der Luxtronik-Steuerung vorgenommen sowie die Anzeigesprache des Adapters festgelegt.

#### Verbindungseinstellungen

- **IP-Adresse (Host):** Trage hier die lokale IP-Adresse deiner Wärmepumpe in deinem Netzwerk ein (z. B.`192.168.178.12` ).
- **Wärmepumpen Port:** Der Kommunikationssport der Steuerung.
  - `8889` = Standard-Port für die klassische TCP-Kommunikation (oft bei Firmware V2.x).
  - `8214` = WebSocket-Port (wird in der Regel für neuere Anlagen ab Firmware V3.81x benötigt).
- **Abfrageintervall (Sekunden):** Gibt an, in welchem zeitlichen Abstand der Adapter neue Messwerte und Parameter von der Wärmepumpe abruft (Standard: 45 Sekunden).

> 💡 **WICHTIGER TIPP ZUM ABFRAGEINTERVALL:** Wähle diesen Wert **nicht zu gering** ! Ein zu schnelles Polling (z. B. alle 10 Sekunden) flutet den internen Prozessor der Luxtronik-Steuerung permanent mit Anfragen. Dies führt dazu, dass die CPU der Wärmepumpe stark ausgelastet wird und die Steuerung (sowohl am Touch-Display als auch im Netzwerk) extrem träge reagiert. Empfohlen sind Werte zwischen 45 und 60 Sekunden.

---

#### Optionen

- **Sprache für Texte und Werte:** Diese Einstellung legt fest, in welcher Sprache die textbasierten Zustände und Betriebsmodi in die ioBroker-Datenpunkte geschrieben werden. Der Adapter übersetzt die Zahlencodes der Anlage dann automatisch in lesbaren Text.

_Beispiel: Wenn die Wärmepumpe Wasser aufheizt, schreibt der Adapter je nach Auswahl entweder`Warmwasser` (Deutsch) oder`Hot water` (Englisch) in den Objektbaum._

![Beispiel für übersetzte Werte im ioBroker Objektbaum](../../../../en/adapterref/iobroker.luxtronik2-controller/admin/img/Objekte.png)

### 2. Reiter: Takt-Optimierung

Standardmäßig behandelt die Luxtronik-Steuerung Heiz- und Warmwassertakte streng getrennt. Dies führt oft dazu, dass der Verdichter nach der Warmwasserbereitung stoppt, nur um kurz darauf für einen Heiztakt wieder anzulaufen (erhöhter Verschleiß). Dieser Adapter koppelt die Vorgänge intelligent, sodass der Verdichter nahtlos und effizient in einem einzigen Takt durchläuft.

- **Intelligente Takt-Optimierung aktivieren:** Schaltet die übergreifende Logik zur Vermeidung unnötigen Verdichter-Stopps ein.
  - **Auslöser-Regel (Vorzündung):** Wenn das Warmwasser abgekühlt ist`(WW Soll - WW Ist ≥ WW Hysterese - 1,5 K)` **UND** gleichzeitig Heizbedarf besteht`(Rücklauf Ist ≤ Rücklauf Soll)` sowie die Sommer-Heizgrenze nicht aktiv ist, greift der Adapter ein.
  - **Aktion:** Der Adapter startet direkt den Heizbetrieb und setzt den Rücklauf-Sollwert temporär auf 35°C, um das sofortige Anlaufen des Verdichters zu erzwingen. Wenn die Anlage kurz darauf auf Warmwasser umgeschaltet wird, läuft der Verdichter einfach weiter.
- **Heizen nach Warmwasser erzwingen:** Wenn aktiv, prüft der Adapter das System auch _nach_ einem Warmwassertakt. Der Rücklauf-Sollwert bleibt auf 35°C angehoben, damit der Verdichter nach der Warmwasserbereitung nicht abschaltet, sondern sofort den Heiztakt fortsetzt.

> **⚠️ Wichtiger Hinweis:** Wenn Sie diese Takt-Optimierung nutzen, wird **dringend empfohlen** , im Reiter _„Leerlauf“_ die Option _„Standardwerte im Leerlauf erzwingen“_ zu aktivieren. Nur so ist garantiert, dass der temporär manipulierte 35°C-Sollwert am Ende des Taktes wieder sauber auf deine normalen Heizungs-Werte zurückgesetzt wird!

![Beispiel für die Taktoptimierung](../../../../en/adapterref/iobroker.luxtronik2-controller/admin/img/Takt_Optimierung_de.svg)

### 3. Reiter: Leerlauf (Hardware-Schutz)

Die Luxtronik-Steuerung speichert geänderte Parameter in einem internen Flash-Speicher, der nur eine begrenzte Anzahl an Schreibzyklen verträgt (EEPROM Flash Wear). Um diesen Speicher zu schonen, greift der Adapter nur dann ein, wenn die Anlage aktiv läuft (Heizen oder Warmwasser).

Sobald die Wärmepumpe in den **Leerlauf (Standby)** wechselt, ist die Optimierung beendet. Um zu verhindern, dass die Anlage mit temporären (veränderten) Parametern aus der Optimierung weiterläuft, zwingt der Adapter die Steuerung zurück in einen sicheren Ausgangszustand.

> **💡 Dringende Empfehlung:** Wenn du die **intelligente Takt-Optimierung** (Kopplung von Warmwasser und Heizung) und/oder die **dynamische HUP-Steuerung** nutzt, solltest du das Setzen der Standardwerte im Leerlauf unbedingt aktivieren! Nur so ist garantiert, dass die Anlage nach einem Eingriff des Adapters wieder exakt mit deinen ursprünglichen Wunschwerten weiterarbeitet.

- **Vorgabewerte:** Tragen hier zwingend die exakten Original-Vorgabewerte Ihrer Heizung ein (z. B. Standard-Hysterese für Heizen/Warmwasser, Fußpunkt, Endpunkt und Pumpenspannungen).
- **Visuelle Heizkurve:** Zur besseren Orientierung generiert der Adapter live eine grafische Vorschau Ihrer Heizkurve (Rücklauf-Soll), sobald du Fuß- und Endpunkt einträgst. _(Ein großes Dankeschön an [mnemotron.de](https://www.mnemotron.de/lux/heatcurve.html) für die Inspiration zu dieser Darstellung!)_

### 4. Reiter: Heizumwälzpumpe (HUP)

Die Heizumwälzpumpe (HUP) fördert das warme Wasser von der Wärmepumpe in deinem Heizkreis. Eine feste Pumpenleistung ist jedoch ineffizient: Ist sie zu hoch, rauscht das Wasser zu schnell durch die Rohre und kann die Wärme nicht optimal an den Raum abgeben. Ist sie zu niedrig, kühlt das Wasser zu stark ab und die Wärmepumpe verliert an Effizienz.

Dieser Adapter löst das Problem über eine **dynamische Steuerung anhand der Temperaturspreizung** (Differenz zwischen Vorlauf und Rücklauf). Die Steuerspannung der Pumpe wird während eines Heiztaktes in regelmäßigen Abständen in winzigen Schritten erhöht oder verringert, um immer genau im perfekten Zielbereich zu bleiben.

> **⚠️ Wichtige Voraussetzungen (Bitte vor Aktivierung prüfen!)**
>
> 1. **Hardware-Kompatibilität:** Nutze diese Funktion nur, wenn deine Umwälzpumpe wirklich über ein Steuerkabel (0-10V oder PWM) an die Luxtronik-Platine angeschlossen ist! Besitzt du eine Pumpe, die den Volumenstrom eigenständig regelt (z. B. einen _Grundfos ALPHA2 AutoAdapt_ auf Stellung „Auto“), darfst du die Funktion **nicht** aktivieren. Andernfalls würden der Adapter und die Pumpe permanent gegeneinander regeln.
> 2. **Spannungsfaktor (Firmware):** Ältere V2.x-Firmwares erwarten die Steuerspannung in einem anderen Datenformat als neuere V3.x-Firmwares (z. B. bei der LWCV 82). Wählen Sie in der Konfiguration unbedingt den richtigen Hardware-Faktor für Ihre Anlage aus (`100` für V2.x vs.`10` für V3.x).
> 3. **Sicherheits-Reset (Leerlauf):** Aktiviere unbedingt die Funktion _„Standardwerte im Leerlauf erzwingen“_ im Reiter „Leerlauf“. Dadurch fällt die Pumpe nach Ende des Heiztaktes wieder auf ihre feste Standardspannung zurück, anstatt auf dem manipulierten Wert zu bleiben.

#### Konfiguration deiner Anlage

Die optimale Temperaturspreizung ist für jedes Haus extrem individuell und hängt vom Heizsystem ab:

- **Fußbodenheizung (FBH):** Arbeitet mit viel Wasser und niedrigen Temperaturen. Hier sind **3 bis 5 Kelvin** Spreizung oft optimal.
- **Heizkörper (Radiatoren):** Erfordert höhere Vorlauftemperaturen und kühlt im Raum stärker ab. Hier rechnet man meist mit **7 bis 10 Kelvin** Spreizung.

Trage unter _Minimum/Maximum Spreizung_ die für dein System passenden Grenzwerte ein. Der Adapter wird dann alle _X Minuten_ (Einstellintervall) prüfen, ob die Spreizung noch im Zielkorridor liegt. Ist die Spreizung zu gering (Wasser fließt zu schnell), wird die Pumpenspannung um die eingestellte _Schrittgröße_ (z. B. 0,25 V) verringert. Ist die Spreizung zu hoch, wird sie sanft erhöht.

![Beispiel für die HUP-Optimierung](../../../../en/adapterref/iobroker.luxtronik2-controller/admin/img/HUP_Optimierung_de.svg)

### 5. Reiter: Zirkulationspumpe (ZIP)

Die Zirkulationspumpe (ZIP) sorgt dafür, dass an den Zapfstellen im Haus (z. B. Dusche, Waschbecken) sofort warmes Wasser anliegt. Läuft sie jedoch dauerhaft oder zeitgesteuert zu oft, kühlt sie den Warmwasserspeicher massiv aus (Energieverlust) und verbraucht unnötig Strom.

Dieser Adapter bietet smarte Automatisierungen, um die ZIP nur exakt dann laufen zu lassen, wenn sie auch wirklich benötigt wird.

- **Intelligente ZIP-Optimierung:** Wenn aktiv, überwacht der Adapter die Wärmepumpe. Die Zirkulation kann so zum Beispiel völlig synchron zur Warmwasserbereitung laufen.
- **Laufzeit bei Aktivierung:** Definiert, wie lange (in Sekunden) die Pumpe laufen soll, wenn sie durch den Adapter oder manuell (über den Schalter) durchgeführt wird`Activate_Zip` im Objektbaum) ausgelöst wird. Empfohlen sind meist kurze Intervalle von 120 bis 180 Sekunden, um das Rohrsystem einmal mit warmem Wasser durchzuspülen.
- **Bewegungsmelder (On-Demand):** Das absolute Spar-Potenzial! Du kannst hier die ioBroker-Datenpunkte deines Smart-Home-Bewegungsmelders (z. B. Zigbee-Sensoren im Badezimmer oder in der Küche) eintragen. Betritt jemand den Raum, startet der Adapter sofort einen kurzen Zirkulationstakt. Das Wasser ist warm, sobald man am Waschbecken steht, und es wird keine Energie verschwendet.
- **Externe Aktoren (z. B. smarte Steckdosen):** Wenn deine Zirkulationspumpe nicht direkt an der Luxtronik-Platine angeklemmt ist, sondern an einem smarten Relais (z. B. Shelly, Osram Smart Plug etc.) hängt, kannst du hier die Datenpunkte der Steckdosen hinterlegen. Der Adapter schaltet Ihre WLAN-/Zigbee-Steckdosen dann vollautomatisch mit der internen Logik ein und aus. _(Vorteil: Dies verursacht 0 Flash-Schreibvorgänge auf dem Speicher der Wärmepumpe!)_

**💡 Tipp! Hardware-Schutz (EEPROM Flash-Wear - dringend beachten!)** Um das ständige Schreiben im Regler zu minimieren, stellen Sie die regulären ZIP-Zeiten einmalig auf die Tabelle Mo-So und tragen Sie dort 00:00 - 00:00 ein. Die Taktzeiten setzen Sie auf Aus: 60 Minuten und An: 0 Minuten.

**Um die Schreibvorgänge auf dem Regler zu reduzieren, ist es empfehlenswert, die ZIP(s) über einen externen Aktor zu steuern ➔ 0 Schreibvorgänge im Regler! Zum Vergleich: Eine Aktivierung pro Luxtronik2 Regler benötigt für das Entlüftungsprogramm 4 Schreibvorgänge. Über die ZIP-Steuertabelle sind es im besten Fall 4 und im schlechtesten Fall 14 Schreibvorgänge im Flash-Speicher pro Zip Durchlauf.**