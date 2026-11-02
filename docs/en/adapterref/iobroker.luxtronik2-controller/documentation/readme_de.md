---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
---
## Konfiguration der Adapter-Instanz

Nach der Installation des Adapters öffnet sich die Konfigurationsoberfläche. Diese ist in übersichtliche Reiter (Tabs) unterteilt, um die Einrichtung und Optimierung deiner Wärmepumpe so intuitiv wie möglich zu gestalten.

---

### 1. Reiter: Verbindung

Auf dieser Seite werden die grundlegenden Netzwerkeinstellungen für die Kommunikation mit der Luxtronik-Steuerung vorgenommen sowie die Anzeigesprache des Adapters festgelegt.

#### Verbindungseinstellungen

- **IP-Adresse (Host):** Trage hier die lokale IP-Adresse deiner Wärmepumpe in deinem Netzwerk ein (z. B. `192.168.178.81`).
- **Wärmepumpen Port:** Der Kommunikationsport der Steuerung.
    - `8889` = Standard-Port für die klassische TCP-Kommunikation (oft bei Firmware V1.x / V2.x / V3.x).
    - `8214` = WebSocket-Port (wird für neuere Anlagen ab Firmware > V3.81 benötigt).
- **Abfrageintervall (Sekunden):** Gibt an, in welchem zeitlichen Abstand der Adapter neue Messwerte und Parameter von der Wärmepumpe abruft (Minimum: 10 Sekunden, Standard: 30 Sekunden).

> ⚠️ **WICHTIGER TIPP ZUM ABFRAGEINTERVALL:**
> Wähle diesen Wert **nicht zu gering**! Ein zu schnelles Polling flutet den internen Prozessor der Luxtronik-Steuerung permanent mit Anfragen. Dies führt dazu, dass die CPU der Wärmepumpe stark ausgelastet wird und die Steuerung (sowohl am Display als auch im Netzwerk) extrem träge reagiert. Empfohlen sind Werte zwischen **30 und 60 Sekunden**.

#### Optionen

- **Sprache für Texte und Werte:** Legt fest, in welcher Sprache (`Deutsch` oder `English`) Betriebszustände, Statusmeldungen, Fehlertexte und Auswahlwerte im ioBroker-Objektbaum ausgegeben werden.

_Beispiel: Wenn die Wärmepumpe Wasser aufheizt, schreibt der Adapter je nach Auswahl entweder `Warmwasser` (Deutsch) oder `Hot water` (Englisch) in den Objektbaum._

![Beispiel für übersetzte Werte im ioBroker Objektbaum](../admin/img/Objekte.png)

---

### 2. Reiter: Modbus (Hybrid)

Die Luxtronik-Steuerung speichert reguläre Parameteränderungen (über Port `8889` / `8214`) im internen EEPROM/Flash-Speicher, der nur eine begrenzte Anzahl an Schreibzyklen verträgt.

Mit dem **Hybrid-Modus (Modbus TCP)** kombiniert der Adapter das Beste aus beiden Welten:

- **Lesen:** Alle detaillierten Sensordaten und Telemetriewerte werden weiterhin zuverlässig über den nativen Port (`8889` / `8214`) ausgelesen.
- **Schreiben (0 % Verschleiß):** Ausgewählte, flüchtige Parameter (wie Sollwerte, Heizkurven oder Pumpen-Schalter) werden über **Modbus TCP** direkt in den Arbeitsspeicher (RAM) der Anlage geschrieben – komplett ohne Flash-Verschleiß!

#### Einstellungen

- **Modbus TCP aktivieren:** Schaltet die hybride Schreibweiche ein. Beim Start prüft der Adapter automatisch per Pre-Check, ob der Modbus-Server der Wärmepumpe erreichbar ist.
- **Modbus Port:** Standardmäßig `502` (muss in der Luxtronik-Steuerung ebenfalls aktiviert sein).
- **Holding-Register (Parameter) auswählen:** Wähle per Checkbox aus, welche Sollwerte bei Änderungen über Modbus statt über den nativen Port geschrieben werden sollen (z. B. _Rücklauf Soll_, _Außentemperatur_, _Betriebsart Heizung/Warmwasser_, _Heizkurve Endpunkt/Parallelverschiebung_, _Feste Rücklaufsolltemperatur_, _Warmwasser Wunschwert_).
- **Coils (Schalter) auswählen:** Erlaubt das direkte Schalten von Ausgängen über Modbus (z. B. _BUP_, _HUP_, _Lüfter VEN_, _Zirkulationspumpe ZIP (Coil 7)_, _ZUP_, _SLP_, _Watchdog Modbus_, _Reset Error_).

> 💡 **Transparenz im Objektbaum:** Alle Datenpunkte, für die das hybride Schreiben per Modbus aktiviert wurde, erhalten im ioBroker-Objektbaum automatisch den Namenszusatz **`(Modbus)`**.

---

### 3. Reiter: Leerlauf - Vorgaben (Hardware-Schutz)

Um den internen Flash-Speicher der Luxtronik zu schonen, greift der Adapter bei aktiven Optimierungen (z. B. Takt-Optimierung oder HUP-Steuerung) nur während eines laufenden Taktes schreibend ein.

Sobald die Wärmepumpe wieder in den **Leerlauf (Standby)** wechselt, setzt diese Funktion alle temporär veränderten Parameter automatisch auf deine sicheren Originalwerte zurück.

> 💡 **Dringende Empfehlung:**
> Es wird dringend empfohlen, diese Vorgabewerte zu aktivieren, wenn du die **intelligente Takt-Optimierung (Warmwasser + Heizen)** und/oder die **dynamische HUP-Steuerung** nutzt!

- **Standardwerte im Leerlauf erzwingen:** Aktiviert den automatischen Reset bei Wechsel in den Standby.
- **Vorgabewerte Heizen:** Trage hier die originalen Werte deiner Heizungsanlage ein (_Fußpunkt (°C)_, _Endpunkt (°C)_, _Heizen Hysterese (K)_ sowie _HUP Min_ und _HUP Nom_ für den Heizbetrieb).
- **Vorgabewerte Warmwasser:** Trage hier deine Standardwerte für die Warmwasserbereitung ein (_WW Soll (°C)_, _WW Hysterese (K)_ sowie _HUP Min_ und _HUP Nom_ für Warmwasser).
- **Interaktive Heizkurven-Vorschau:** Sobald du Fuß- und Endpunkt anpasst, generiert der Adapter live ein interaktives Diagramm deiner Heizkurve (inkl. Tooltips für jedes Grad Außentemperatur von -20 °C bis +20 °C). _(Ein großes Dankeschön an [mnemotron.de](https://www.mnemotron.de/lux/heatcurve.html) für die Inspiration!)_

---

### 4. Reiter: Effizienz / COP

Berechnet vollautomatisch die Arbeitszahl (**COP** bzw. Jahresarbeitszahl **JAZ**) deiner Wärmepumpe über verschiedene Zeiträume (**Heute**, **Letzte 7 Tage**, **Aktueller Monat**, **Aktuelles Jahr**) – jeweils getrennt nach **Gesamt**, **Heizen** und **Warmwasser**.

- **COP / Effizienz-Berechnung aktivieren:** Startet die laufende Auswertung. Alle Zwischenstände und Snapshots werden absturzsicher in der internen Adapter-Datenbank (`hidden.cop_buckets`) gespeichert und überleben jeden Neustart.
- **1. Elektrische Energie (Stromverbrauch):**
    - _Intern (Luxtronik Schätzwerte):_ Nutzt den internen Energiezähler der Wärmepumpe.
    - _Externe Objekt-ID (z. B. Shelly):_ Verlinke einen externen, geeichten Stromzähler (Gesamt-kWh-Datenpunkt, z. B. Shelly 3EM) für hochpräzise Messungen.
- **2. Thermische Energie (Wärmeerzeugung):**
    - _Intern (Luxtronik Zähler):_ Nutzt die interne Wärmemengenerfassung der Luxtronik.
    - _Externe Objekt-ID (z. B. M-Bus Zähler):_ Verlinke einen externen Wärmemengenzähler (WMZ Gesamt-kWh).

---

### 5. Reiter: Takt-Optimierung

Standardmäßig behandelt die Luxtronik-Steuerung Heiz- und Warmwassertakte strikt getrennt. Dies führt oft dazu, dass der Verdichter nach der Warmwasserbereitung stoppt, nur um kurz darauf für einen Heiztakt wieder anzulaufen (erhöhter Verschleiß). Dieser Adapter koppelt die Vorgänge, sodass der Verdichter ohne Zwischenstopp nahtlos durchläuft.

- **Intelligente Takt-Optimierung aktivieren:** Schaltet die übergreifende Logik zur Vermeidung unnötiger Verdichter-Stopps ein (auch über den Datenpunkt `Actions.Regelung_Aktiv` schaltbar).
    - **Auslöser-Regel (Vorzündung):** Wenn `(WW Soll - WW Ist) ≥ (WW Hysterese - 1,5 K)` **UND** `Heizung Rücklauf ≤ Rücklauf Soll` und die Heizgrenze nicht aktiv ist, wird direkt der Heizbetrieb gestartet und der Fußpunkt temporär auf **35 °C** gesetzt, um das Anlaufen des Verdichters zu erzwingen.
    - **Übergang zu Warmwasser:** Erreicht der Rücklauf am Ende des Heiztaktes das Ziel und das Warmwasser ist um mehr als 2 K abgekühlt, wird der Warmwasser-Sollwert kurzzeitig angehoben, damit der Verdichter nahtlos in die Warmwasserbereitung übergeht.
- **Heizen nach Warmwasser erzwingen:** Wenn aktiv, hält der Adapter den Fußpunkt während der Warmwasserbereitung auf 35 °C (sofern kein Heizgrenzen-Stopp vorliegt), damit der Verdichter nach dem Warmwassertakt ohne Abschaltung direkt weiterheizt.

> ⚠️ **Wichtiger Hinweis:** Aktiviere bei Nutzung dieser Funktion unbedingt auch **„Standardwerte im Leerlauf erzwingen“** im Reiter _Leerlauf - Vorgaben_!

![Beispiel für die Taktoptimierung](../admin/img/Takt_Optimierung.svg)

---

### 6. Reiter: HUP Steuerung

Dynamische Spannungsregelung für steuerbare **0–10V Heizungsumwälzpumpen (HUP)** anhand der Temperaturspreizung (Differenz zwischen Vorlauf und Rücklauf). Die Steuerspannung wird während eines laufenden Heiztaktes (sobald der Verdichter mindestens 10 Minuten läuft) schrittweise angepasst, um die Spreizung im optimalen Zielkorridor zu halten.

> ⚠️ **Wichtige Voraussetzungen:**
>
> 1. **Hardware-Check & PWM-Erkennung:** Aktiviere dies nur, wenn deine Pumpe über ein analoges **0–10V Signal** vom Luxtronik-Regler gesteuert wird. Ist deine Anlage auf eine **PWM-Pumpe** konfiguriert (`heating_max_circ_pump_speed > 0`), erkennt der Adapter dies automatisch und überspringt die 0–10V Regelung sicherheitshalber.
> 2. **Anlagentyp:** Die optimale Spreizung ist individuell. Eine **Fußbodenheizung (FBH)** benötigt meist **3 bis 5 Kelvin**, klassische **Radiatoren (Heizkörper)** oft **7 bis 10 Kelvin**.
> 3. **Hardware Spannungs-Faktor:** Wähle zwingend die passende Skalierung zu deiner Firmware:
>     - `100` für Standard / Firmware V2.x (`1000 = 10,0 V`)
>     - `10` für neuere Firmware V3.x, z. B. LWCV 82 (`100 = 10,0 V`)

#### Parameter

- **Dynamische HUP-Spreizungsregelung aktivieren:** Schaltet die Regelung ein.
- **Ziel-Temperaturspreizung & Intervalle:** Definiere die _Minimale Spreizung (K)_, _Maximale Spreizung (K)_ und das _Regelintervall (Minuten)_ (Standard: 10 Min).
- **Spannungsbegrenzungen:** Lege die _Untere Grenze (V)_, _Obere Grenze (V)_ und die _Schrittweite (V)_ (z. B. `0,25 V`) fest, mit der nachgeregelt wird.

![Beispiel für die HUP-Optimierung](../admin/img/HUP_Optimierung.svg)

---

### 7. Reiter: Zirkulationspumpe (ZIP)

Die Zirkulationspumpe (ZIP) sorgt für sofortiges Warmwasser an den Zapfstellen, kühlt bei Dauerbetrieb jedoch den Speicher stark aus. Über diesen Reiter trennst du die **Auslöse-Logik** (Bewegungsmelder, Warmwasser-Kopplung, Button) sauber von der **Hardware-Ansteuerung**.

#### 1. Wie wird deine Zirkulationspumpe (ZIP) gesteuert? (`zip_control_mode`)

Wähle im Dropdown-Menü deine physische Ansteuerung aus – nicht benötigte Felder werden automatisch ausgeblendet:

- **Über Luxtronik Regler (Intern):** Der Adapter schaltet die Pumpe über die interne Handsteuerung/Entlüftung (im Standby) bzw. über die Zeittabelle.
    - ⚠️ _Hinweis:_ Verursacht Schreibvorgänge im Flash-Speicher der Luxtronik (4 bis 14 Schreibvorgänge pro Lauf). Falls ein externes Relais seinen Betriebsstrom direkt vom ZIP-Ausgang der Wärmepumpe bezieht, muss der Haken bei _„Deaktiviere reguläre ZIP Werte“_ entfernt werden!
- **Über externen Aktor (z. B. Shelly) – _Empfohlen_:** Der physische Luxtronik-Ausgang wird dauerhaft stillgelegt (`00:00` Uhr / `0 Min An`) und der Adapter steuert dein smartes Relais (Shelly, Zigbee-Steckdose etc.) direkt über ioBroker an ➔ **0 % Flash-Verschleiß!**
- **Über Modbus TCP (Hybrid):** Die Pumpe wird komplett ohne Flash-Verschleiß direkt über **Modbus Coil 7** geschaltet (setzt aktiviertes Modbus im Reiter _Modbus_ voraus) ➔ **0 % Flash-Verschleiß!**

#### 2. Optionen & Vorgabewerte

- **Deaktiviere reguläre ZIP Werte (Luxtronik-Timer auf 0):** Überschreibt beim Start einmalig die internen Luxtronik-Timer mit `00:00` (`Aus: 60 Min / An: 0 Min`), um die interne Zeitsteuerung dauerhaft ruhigzustellen.
- **ZIP-Optimierung zulassen:** Aktiviert die zeit- und bedarfsgesteuerte Logik.
- **ZIP Dauer an (s):** Laufzeit der Pumpe bei Auslösung (Standard: `120 s`).
- **ZIP Dauer aus (s):** Sperrzeit (Cooldown) zwischen zwei Läufen zum Schutz vor ständigem Takten (Standard: `1200 s` = 20 Min).
- **ZIP Dauer an bei Warmwasserbetrieb (s):** Bei verschleißfreier Steuerung (Aktor oder Modbus) kann die Zirkulationspumpe automatisch synchron zur Warmwasserbereitung mitlaufen (Standard: `600 s`).

#### 3. Bewegungssensoren & Externe Aktoren

- **Bewegungssensoren aktiv nutzen:** Klappt eine Tabelle auf, in der du beliebig viele Bewegungsmelder oder Taster (Boolean-Datenpunkte aus ioBroker, z. B. Bad/Küche) hinterlegen kannst. Bei Bewegung startet die ZIP sofort für die eingestellte Dauer (unter Beachtung der Sperrzeit).
- **Externe Relais/Aktoren:** (Nur sichtbar im Modus _Externer Aktor_) Tabelle zum Hinterlegen deiner Relais-Datenpunkte (z. B. `shelly.0...Switch`).

> 💡 **Virtuelle Datenpunkte für deine Visualisierung (VIS / Lovelace):**
> Unter `Information.03_Outputs` stellt der Adapter unabhängig von der gewählten Steuerungsart immer zwei Live-Datenpunkte bereit:
>
> - `Virtual_ZIP_Status`: Zeigt an, ob aktuell ein Zirkulationszyklus aktiv ist (`true`/`false`).
> - `Virtual_ZIP_Remaining_Time`: Ein **Live-Countdown in Sekunden**, der die verbleibende Restlaufzeit des aktuellen ZIP-Taktes herunterzählt!

---

### 8. Reiter: Datenpunkte / Objekte

Hier bestimmst du im Detail, welche Datenpunkte und Ordner der Adapter im ioBroker-Objektbaum anlegen und aktualisieren soll. Deaktivierte Datenpunkte und leere Ordner werden beim Start des Adapters automatisch bereinigt.

- **Nicht unterstützte Hardware-Parameter automatisch ausblenden (`filter_visibility`):** Wenn aktiviert (Standard), fragt der Adapter beim Start die internen Sichtbarkeiten der Wärmepumpe ab (Command `3005`) und blendet nicht verbaute Anlagenteile (z. B. Kühlung, Solar, Lüftung oder ungenutzte Mischkreise) vollautomatisch aus.
- **Kategorien & Einzel-Datenpunkte:** Du kannst komplette Kategorien (z. B. `Information.01 Temperatures` bis `Information.16 Efficiency` sowie `Settings.01` bis `Settings.12`) mit einem Klick ein-/ausschalten oder einzelne Datenpunkte gezielt abwählen.
- **Systemrelevante Datenpunkte:** Datenpunkte, die der Adapter zwingend für seine internen Schutz- und Optimierungsfunktionen benötigt (z. B. Rücklauftemperatur, Betriebszustand oder die Flash-Schreibzähler `write_cycles_today` / `write_cycles_total`), sind ausgegraut und immer aktiv.

---

### 9. Reiter: Benachrichtigungen

Der Adapter überwacht kontinuierlich den **Fehlerspeicher**, den **Abschalt-Speicher** (inkl. kritischer Wärmepumpen-Störungen und **Durchfluss-Problemen** mit 60-Minuten-Spam-Schutz) sowie den **Verbindungsstatus** zur Anlage.

- **Fehlermeldungen per Telegram senden:** Sendet detaillierte Alarm- und Warnmeldungen (inkl. Fehlercode, Klartext-Beschreibung und Zeitstempel) über eine ausgewählte **Telegram-Instanz**.
- **Empfänger (Name / Chat-ID - Optional):** Leer lassen für Versand an alle bekannten Telegram-Nutzer oder gezielt einen Benutzernamen bzw. eine numerische Chat-ID eintragen.
- **Fehler auch als Benachrichtigung (Glocke) zeigen:** Trägt Alarme zusätzlich direkt im nativen **ioBroker Notification Center** (Glocken-Symbol oben rechts im Admin) ein.
- **Button „TEST: LETZTEN FEHLER SENDEN“:** Liest den aktuellsten Eintrag aus dem Fehlerspeicher (oder erzeugt eine Testnachricht) und sendet ihn sofort über die gewählten Kanäle, um deine Einrichtung zu testen.

---

### 10. Reiter: Updates (Firmware)

Der Adapter kann automatisch das offizielle Alpha Innotec Download-Portal auf neue Firmware-Versionen für deine Wärmepumpe prüfen.

- **Automatisch nach Firmware-Updates suchen:** Aktiviert die Hintergrundprüfung.
- **Zeitplan für automatische Prüfung:** Ein frei definierbarer Cron-Job (Standard: `0 12 * * *` = Täglich um 12:00 Uhr).
- **Telegram-Benachrichtigung bei neuem Update senden:** Informiert dich direkt via Telegram, sobald eine neue Version mitsamt Changelog bereitsteht.
- **Manuelle Prüfung:** Über den neuen Button `Information.12_SystemInfo.check_firmware` im Objektbaum kann die Update-Prüfung jederzeit per Klick angestoßen werden.

> 💡 **Hinweis:** Die gesammelten Ergebnisse (Verfügbare Version, Update-Indikator für Visualisierungen und die offiziellen Release Notes) legt der Adapter unter `Information.12_SystemInfo` ab.

---

### 11. Reiter: PV / Überschuss

Integrierte "PV-Ready" Steuerung: Nutzt deinen überschüssigen Solarstrom, um die Wärmepumpe als thermischen Akku zu verwenden. Sobald deine Solaranlage genug Leistung ins Netz einspeist, hebt der Adapter vollautomatisch und verschleißfrei (via Modbus-RAM) die Sollwerte für Warmwasser und/oder Heizung an.

- **PV-Überschusssteuerung aktivieren:** Schaltet die Logik ein.
- **Datenpunkt für aktuelle Netzleistung:** Verlinke hier den Live-Datenpunkt deines Smart-Meters oder Wechselrichters (z.B. SMA, Shelly 3EM, Kostal).
- **Batterieladung zum Überschuss addieren (Wärmepumpe priorisieren):** Optionaler Datenpunkt deiner Hausbatterie. Zieht die Batterie gerade Solarstrom, wird dieser als "nutzbarer Überschuss" gewertet. Die Wärmepumpe fängt den Strom somit als primärer thermischer Akku ab, bevor er in den Haus-Akku fließt.
- **Aktivierung (Einschaltbedingungen):**
    - Lege den _Überschuss-Schwellenwert_ (z.B. 2000 Watt) und eine _Mindestdauer_ (z.B. 5 Minuten) fest, um nervöses Takten bei Wolken zu vermeiden.
    - Gib an, um wie viel Kelvin das Warmwasser und die Heizkurve angehoben werden sollen.
    - **Boost-Priorität (Reihenfolge):** Wähle, ob die Wärme _Gleichzeitig_, _Warmwasser zuerst_ oder _Heizen zuerst_ ins System geleitet wird. Die intelligente Sättigungsprüfung leitet den Strom während des Boosts automatisch um, sobald das priorisierte Ziel seine Maximaltemperatur erreicht hat.
- **Deaktivierung (Rückfallbedingungen):**
    - **Ausschalt-Schwellenwert (Schalthysterese):** Verhindert den klassischen Feedback-Loop. Sinkt der Überschuss durch den Eigenverbrauch der startenden Wärmepumpe, bricht der Boost nicht ab, solange dieser separate Schwellenwert (z.B. 0 Watt = Netzbezug) nicht unterschritten wird.
    - **Verzögerung vor Rücksetzung:** Verhindert einen sofortigen Abbruch, wenn die Sonne kurz verdeckt wird.
    - **Aktiven Takt nach Reset bis zum Normalwert zu Ende fahren (Hardware-Schutz):** Fällt der Überschuss weg, wird der Sollwert nicht sofort hart zurückgesetzt. Der Adapter wartet, bis der aktuelle Zyklus seinen regulären (niedrigeren) Zielwert erreicht hat, um den Verdichter nicht abzuwürgen.
    - _Verzögerung vor Rücksetzung:_ Verhindert einen sofortigen Abbruch, wenn die Sonne kurz verdeckt wird.
    - _Aktiven Takt nach Reset bis zum Normalwert zu Ende fahren (Hardware-Schutz):_ Fällt der Überschuss weg, wird der Sollwert nicht sofort hart zurückgesetzt. Der Adapter wartet intelligent, bis der aktuelle Heiz- oder Warmwasserzyklus seinen regulären (niedrigeren) Zielwert erreicht hat, um den Verdichter nicht abzuwürgen.
      ![Example PV](../admin/img/PV.png)

---

### 12. Reiter: Eigene Werte (Custom)

Deine Wärmepumpe liefert auf einem bestimmten Index einen speziellen Wert, der noch nicht im Standard-Mapping enthalten ist? In dieser Tabelle kannst du beliebige eigene Datenpunkte definieren, die automatisch im Ordner **`Custom`** angelegt werden:

- **Aktiv:** Schaltet den benutzerdefinierten Datenpunkt ein oder aus.
- **Luxtronik ID (Index):** Die Registernummer aus dem Array der Wärmepumpe (Tipp: Über den Button `Actions.Dump_Raw_To_Log` kannst du dir alle verfügbaren Indizes deiner Anlage ins ioBroker-Log schreiben lassen).
- **Datenquelle:**
    - _Messwert (`rawValues` / Telemetry):_ Reine Lese-Datenpunkte aus Befehl `3004`.
    - _Parameter (`rawParams`):_ Konfigurationswerte aus Befehl `3003` – diese Datenpunkte werden automatisch **beschreibbar (`write: true`)** angelegt!
- **Name, Datentyp, Faktor & Einheit:** Vergib einen freien Namen (z. B. `Meine Temperatur`), wähle den Datentyp (`Zahl`, `Text`, `Wahr/Falsch`, `Datum/Uhrzeit (Unix)`), einen optionalen Umrechnungsfaktor (z. B. `0.1` für Zehntelgrad) und die Einheit (z. B. `°C`).

---

### 13. Reiter: Backup & Diagnose

Über den internen Webserver der Luxtronik-Steuerung lassen sich detaillierte System-Logs (`.dta`-Dateien) herunterladen und am PC mit kostenlosen Werkzeugen wie **[OpenDTA](https://sourceforge.net/projects/opendta/)** grafisch analysieren.

#### Manueller Download

- **Live DTA (`/NewProc`):** Zwingt die Anlage, sofort einen frischen Speicherabzug zu generieren und lädt diesen im Browser herunter.
- **Vorhandenes DTA (`/proclog`):** Lädt die letzte automatisch auf der Anlage gespeicherte Datei herunter (oft 2–3 Stunden alt).

#### Automatisches DTA-Backup

- **Automatischen DTA-Download aktivieren:** Wenn aktiviert, ruft der Adapter das Live-DTA-Log vollautomatisch im Hintergrund von der Wärmepumpe ab (inkl. Fallback auf `/procdta`).
- **Zeitplan (Cron):** Lege fest, wann das Backup erfolgen soll (Standard: `0 2 * * *` – jede Nacht um 02:00 Uhr).
- **Speicherort:** Die Backups werden mit Zeitstempel (`dta_live_YYYY-MM-DDTHH-mm-ss.dta`) sicher im globalen ioBroker-Dateisystem abgelegt. Du findest sie im ioBroker-Hauptmenü unter **„Dateien“** im Ordner **`0_userdata.0/luxtronik_backups`**.

---

## 🛡️ Eingebaute Hardware-Schutzfunktionen

1. **Read-Before-Write Schutz (`safeRawWrite` / `writePumpSafe`):** Bevor ein Befehl über Port `8889`/`8214` gesendet wird, prüft der Adapter im Cache, ob der Parameter auf der Wärmepumpe bereits exakt diesen Wert hat. Unnötige Schreibzugriffe auf den EEPROM werden so komplett blockiert.
2. **Flash-Schreibzähler:** Unter `Information.12_SystemInfo` protokolliert der Adapter über `write_cycles_today` (wird um Mitternacht zurückgesetzt) und `write_cycles_total` transparent jeden physischen Schreibzugriff mit.
3. **Firmware `.90` Crash-Schutzschild:** Die Hersteller-Firmwares `V1.90` und `V2.90` besitzen einen bekannten Bug, der beim Beschreiben von Parametern über das Netzwerk zu Systemabstürzen führt. Erkennt der Adapter eine `.90`-Firmware, werden Schreibbefehle automatisch zum Schutz deiner Hardware blockiert und eine Warnung im Log ausgegeben.

---

## 🛠 Fehleranalyse / Troubleshooting

### 1. Hinweis für Raspberry Pi / ARM-Nutzer (Installations-Log)

Falls während der Adapter-Installation im ioBroker-Log rote Fehlermeldungen bezüglich **`node-gyp`**, **`serialport`** oder **`usocket`** auftauchen, können diese **komplett ignoriert werden**.
Diese Pakete sind lediglich optionale Unterabhängigkeiten für serielle Kabelverbindungen (Modbus RTU), die beim Kompilieren auf ARM-Systemen fehlschlagen können. Da der Adapter ausschließlich über das Netzwerk (TCP / WebSockets) kommuniziert, funktioniert alles ohne Einschränkungen.

### 2. Raw TCP Test-Skript (`Test_Script.ts`)

In seltenen Fällen (insbesondere bei älteren Firmware-Versionen wie V1.x) kann es zu Verbindungsabbrüchen oder Timeouts beim Schreiben von Werten kommen (z. B. `Timeout writing TCP parameter 105`).

Um herauszufinden, ob das Problem am Adapter oder an der Wärmepumpe selbst liegt, liegt diesem Repository ein isoliertes Test-Skript (`Test_Script.ts` im Ordner `Scripte`) bei. Dieses Skript kommuniziert komplett am Adapter vorbei direkt über rohe TCP-Sockets mit der Luxtronik-Steuerung. Es testet den Schreib- und Lesezugriff, indem es den Warmwasser-Sollwert ausliest, ihn testweise minimal erhöht und sofort wieder den Originalwert herstellt.

#### Ausführung im ioBroker:

1. 🛑 **WICHTIG:** Stoppe zwingend **alle** laufenden Luxtronik-Adapter-Instanzen im ioBroker (auf „Rot“ stellen)! Alte Luxtronik-Steuerungen lassen nur eine einzige gleichzeitige Netzwerkverbindung zu. Läuft ein Adapter im Hintergrund weiter, ist der Port blockiert und das Skript rennt unweigerlich in einen Timeout.
2. Kopiere den Inhalt der Datei `Test_Script.ts` in ein neues Skript im ioBroker **JavaScript-Adapter** (Typ: _TypeScript_ auswählen).
3. Passe ganz oben im Skript die Konstante `HOST` an die IP-Adresse deiner Wärmepumpe an.
4. Starte das Skript und prüfe die Log-Ausgabe des ioBrokers.

#### Ergebnis-Auswertung:

- **✅ ERFOLG:** Das Skript läuft zügig durch und die Wärmepumpe bestätigt den Schreibbefehl. Das bedeutet, deine Anlage (und die Firmware) akzeptieren Schreibbefehle fehlerfrei.
- **❌ TIMEOUT / FEHLER:** Das Skript bleibt beim Lesen/Schreiben hängen oder wird abgewiesen. Dies bedeutet, dass die Anlage die TCP-Kommunikation physisch verweigert. Ursachen hierfür sind oft blockierte Ports (durch Loxone, FHEM oder andere Smart-Home-Systeme), Firmware-Schutzmechanismen oder aufgehängte Netzwerkkarten in der Wärmepumpe (hier hilft oft ein Strom-Reset der Anlage). Der Adapter kann dieses tiefliegende Netzwerkproblem nicht umgehen.