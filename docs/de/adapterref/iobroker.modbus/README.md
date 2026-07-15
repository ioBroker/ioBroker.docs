---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: PbHW49eOEqaAyxf25EGWOgN9XjyDPCkKLXXndbtEQO8=
---
![Logo](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![Anzahl der Installationen](http://iobroker.live/badges/modbus-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.modbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.modbus.svg)

# Iobroker.modbus
![Test und Freigabe](https://github.com/ioBroker/iobroker.modbus/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Implementierung von Modbus Slave und Master für ioBroker. Folgende Typen werden unterstützt:

- Modbus RTU über seriell (Master)
- Modbus RTU über TCP (Master)
- Modbus TCP (Slave, Master)
- Modbus TCP mit SSL/TLS (Master)

## SSL/TLS-Unterstützung
Für sichere Verbindungen zu Geräten, die SSL/TLS-Verschlüsselung erfordern (wie z. B. der Kostal KSEM Smart Energy Meter an Port 802), können Sie „TCP mit SSL/TLS“ als Verbindungstyp auswählen. Dadurch stehen Ihnen folgende Konfigurationsoptionen zur Verfügung:

- **Pfad zur SSL-Zertifikatsdatei**: Pfad zu Ihrer SSL-Zertifikatsdatei im PEM-Format
- **Pfad zur SSL-Privatschlüsseldatei**: Pfad zu Ihrer SSL-Privatschlüsseldatei im PEM-Format
- **Pfad zur SSL-CA-Zertifikatsdatei**: Pfad zur CA-Zertifikatsdatei im PEM-Format (optional)
- **Nicht autorisierte Zertifikate ablehnen**: Deaktivieren Sie dieses Kontrollkästchen, um selbstsignierte Zertifikate zuzulassen.

Hinweis: Die Zertifikatsdateien müssen für den ioBroker-Prozess zugänglich sein und im PEM-Format vorliegen.

## Einstellungen
### Partner-IP-Adresse
IP-Adresse des Modbus-Partners.

### Hafen
TCP-Port des Modbus-Partners, wenn dieser als Master (Client) konfiguriert ist, oder eigener Port, wenn er als Slave (Server) konfiguriert ist.

### Geräte-ID
Modbus-Geräte-ID. Wichtig, wenn eine TCP/Modbus-Brücke verwendet wird.

### Typ
Slave (Server) oder Master (Client).

### Gerät auswählen über (seriell)
Bei seriellen Verbindungen können Sie die Adressierungsmethode für das Gerät auswählen:

- **Serielle Schnittstelle**: Wählen Sie einen festen Portpfad (z. B. `COM3` oder `/dev/ttyUSB0`).
- **USB-Geräte-ID**: Wählen Sie das Gerät anhand seiner festen USB-Kennung (Hersteller-ID/Produkt-ID/Seriennummer) aus. Der tatsächliche Port wird beim Start aufgelöst, sodass die Verbindung auch dann funktioniert, wenn das Betriebssystem einen anderen Portnamen zuweist (z. B. nach einem Neustart oder erneutem Anschließen).

### Aliase als Adresse verwenden
Normalerweise können alle Register Adressen von 0 bis 65535 haben. Mithilfe von Aliasen lassen sich virtuelle Adressfelder für jeden Registertyp definieren. Normalerweise:

- Die diskreten Eingänge liegen zwischen 10001 und 20000
- Spulen gibt es von 1 bis 1000
- Die Eingangsregister reichen von 30001 bis 40000
- Die Halteregister reichen von 40001 bis 60000

Jeder Alias wird intern einer Adresse zugeordnet, z. B. wird 30011 dem Eingangsregister 10 zugeordnet usw.

### Direkte Adressen
Wird für Binäreingänge und Spulen verwendet.
Ohne dieses Flag werden die Bits wie folgt adressiert: `0 => 15, 1 => 14, 2 => 13, ..., 15 => 0`.
Mit aktiviertem Flag werden die Bits wie folgt adressiert: `0 => 0, 1 => 1, 2 => 2, ..., 15 => 15`.

### Adressen nicht an 16 Bit (Wort) ausrichten
Normalerweise sind die Adressen der Spulen und der diskreten Eingänge 16-Bit-ausgerichtet.
Beispielsweise werden Adressen von 3 bis 20 an 0 bis 32 Bit ausgerichtet. Wenn diese Option aktiviert ist, werden die Adressen nicht ausgerichtet.

### Verwenden Sie keine mehreren Register.
Falls ein Slave den Befehl "write multiple registers" nicht unterstützt, können Sie ihn aktivieren, um Warnungen zu erhalten, wenn mehrere Register beschrieben werden.

### Verwenden Sie nur mehrere Schreibregister
Wenn ein Slave nur den Befehl "write multiple registers" unterstützt, können Sie dies aktivieren, sodass die Register immer mit dem Befehl FC15/FC16 beschrieben werden.

### Runde Real auf
Wie viele Nachkommastellen stehen bei Gleitkommazahlen und Gleitkommazahlen?

### Datenabfrageintervall
Zyklisches Abfrageintervall (Nur relevant für Master)

### Wiederverbindungsverzögerung
Wiederverbindungsintervall (Nur relevant für Master)

### Lesetimeout
Timeout für Leseanfragen in Millisekunden. Wenn innerhalb dieser Zeit keine Antwort von einem Slave empfangen wird, wird die Verbindung getrennt.

### Pulszeit
Wenn für Spulen ein Impuls verwendet wird, definiert dies das Intervall in Millisekunden, also wie lange der Impuls ist.

### Wartezeit
Wartezeit zwischen dem Abfragen zweier verschiedener Geräte-IDs in Millisekunden.

### Maximale Länge einer Leseanforderung
Maximale Länge des Befehls READ_MULTIPLE_REGISTERS: Anzahl der zu lesenden Register.

Manche Systeme erfordern, dass zunächst eine Schreibanforderung ausgeführt wird, bevor die Daten bei einer Leseanforderung bereitgestellt werden.
Sie können diesen Modus erzwingen, indem Sie die maximale Leseanforderungslänge auf 1 setzen.

**Hinweis:** Bei einigen USB-Modbus-Lösungen (z. B. basierend auf `socat`) kann es zu Problemen bei der Zusammenarbeit mit dem npm-Modul `serialport` kommen.

Es gibt ein Software-Gateway [**Modbus RTU <-> Modbus RTU über TCP**](http://mbus.sourceforge.net/index.html), um die Verwendung von serieller RTU über das TCP-Protokoll zu ermöglichen.

Beide Lösungen, **RTU über TCP** und **TCP**, funktionieren gut.

### Leseintervall
Verzögerung zwischen zwei Leseanfragen in Millisekunden. Standardwert: 0.

### Schreibintervall
Verzögerung zwischen zwei Schreibanforderungen in Millisekunden. Standardwert: 0.

### Aktualisierung unveränderter Zustände
Normalerweise wird ein Wert, der sich nicht geändert hat, nicht in ioBroker geschrieben.
Dieses Flag ermöglicht die Aktualisierung des Zeitstempels des Werts in jedem Zyklus.

### Wertbereinigung
Aktivieren Sie die automatische Bereinigung ungültiger Registerwerte (NaN, Unendlich, extreme Gleitkommazahlen wie ±3,4e38).
Diese Funktion verhindert, dass fehlerhafte Modbus-Gleitkommazahlen in die ioBroker-Zustände gelangen. Dies ist besonders nützlich für Geräte wie SolarEdge-Wechselrichter, die aufgrund von Timeouts oder internen Skalierungsfehlern gelegentlich ungültige Werte zurückgeben.

Wenn diese Option aktiviert ist, können Sie die Bereinigungsoptionen pro Register konfigurieren:

- **Bereinigung**: Aktivieren Sie die Bereinigung für dieses Register.
- **Bereinigungsaktion**: Wählen Sie, wie ungültige Werte behandelt werden sollen.
- *Letzten gültigen Wert beibehalten*: Speichert den letzten bekannten gültigen Wert, wenn ein ungültiger Wert erkannt wird.
- *Ersetzen durch 0*: Ersetzt ungültige Werte durch 0
- **Mindestgültigkeitswert**: Optionaler Mindestgültigkeitswert-Schwellenwert
- **Maximaler gültiger Wert**: Optionaler Schwellenwert für den maximalen gültigen Wert

Ungültige Werte erkannt:

- `NaN` (Keine Zahl)
- `Unendlich` oder `-Unendlich`
- Extreme Gleitkommawerte (≥3,4e38 oder ≤-3,4e38) - typische Modbus-Fehlerwerte
- Werte außerhalb des konfigurierten Minimal-/Maximalbereichs

### Adressen dürfen nicht in die ID aufgenommen werden.
Fügen Sie keine Adresse in die generierte ioBroker-ID ein. `10_Input10` vs `_Input10`.

### Punkte in ID beibehalten
Mit diesem Flag lautet der Name `Inputs.Input10`. Ohne Flag => `Inputs_Input10`.

## Parameter für eine einzelne Adressleitung in der Konfiguration
### Adresse
Zu lesende Modbus-Adresse.

### Slave-ID
Falls mehrere Slaves vorhanden sind, handelt es sich hier um die ID, sofern nicht die in der globalen Konfiguration angegebene Standard-ID verwendet wird.

### Name
Dies ist der Name für den Parameter.

### Beschreibung
Parameterbeschreibung.

### Einheit
Einheit des Parameters.

### Typ
Der aus Bus zu lesende Datentyp. Einzelheiten zu den möglichen Datentypen finden Sie im Abschnitt Datentypen.

### Länge
Länge des Parameters. Bei den meisten Parametern wird diese anhand des Datentyps bestimmt, bei Zeichenketten hingegen definiert sie die Länge in Bytes / Zeichen.

### Faktor
Dieser Faktor dient zur Multiplikation des vom Bus gelesenen Werts für die statische Skalierung. Die Berechnung sieht daher wie folgt aus: `val = x * Factor + Offset`.

### Offset
Dieser Offset wird nach der obigen Multiplikation zum gelesenen Wert addiert. Die Berechnung sieht also wie folgt aus: `val = x * Factor + Offset`.

### Formel
Dieses Feld kann für erweiterte Berechnungen verwendet werden, falls Faktor und Offset nicht ausreichen. **Wenn dieses Feld gesetzt ist, werden die Felder Faktor und Offset ignoriert.** Die Formel wird von der Funktion `eval()` ausgeführt. Daher werden alle gängigen Funktionen unterstützt, insbesondere mathematische Funktionen. Die Formel muss der JavaScript-Syntax entsprechen; daher ist auf Groß- und Kleinschreibung zu achten.

In der Formel muss „x“ für den von Modbus gelesenen Wert verwendet werden. Z. B. `x * Math.pow(10, sf['40065'])`

Mithilfe des "sf"-Arrays (siehe obiges Beispiel) können Sie auf andere gelesene Modbus-Werte zugreifen, wenn diese in der Konfiguration als "Skalierungsfaktor" gekennzeichnet sind (siehe unten Informationen zum "SF"-Flag).

Kann die Formel zur Laufzeit nicht ausgewertet werden, schreibt der Adapter eine Warnmeldung in das Protokoll.

Ein weiterer Anwendungsfall für Formeln könnte auch darin bestehen, unplausible Daten mit einer Formel wie `x > 2000000 ? null : x` zu verhindern.

### Rolle
ioBroker-Rolle zuweisen.

### Zimmer
ioBroker-Raum zuweisen.

### Umfrage
Wenn diese Funktion aktiviert ist, werden die Werte in einem vordefinierten Intervall von einem Slave abgefragt.

### WP
Schreibimpuls

### CW
Zyklisch schreiben

### SF
Wert als Skalierungsfaktor verwenden.
Dies ist erforderlich für dynamische Skalierungsfaktoren, die auf manchen Systemen über Schnittstellenwerte bereitgestellt werden.
Wenn ein Wert mit diesem Flag markiert ist, wird er in einer Variablen mit folgender Namenskonvention gespeichert: `sf['Modbus_address']`.

Diese Variable kann anschließend in beliebigen Formeln für andere Parameter verwendet werden. Beispielsweise kann die folgende Formel den Wert `(x * sf['40065']) + 50;` festlegen.

### Desinfizieren (Expertenmodus)
Aktivieren Sie die Wertbereinigung für dieses Register. Diese Option ist nur verfügbar, wenn die „Wertbereinigung“ in den Adaptereinstellungen global aktiviert ist.

### Desinfektionsaktion (Expertenmodus)
Wählen Sie die Aktion aus, die ausgeführt werden soll, wenn ein ungültiger Wert erkannt wird:

- **Letzten gültigen Wert beibehalten**: Behält den zuletzt bekannten gültigen Wert bei.
- **Durch 0 ersetzen**: Ersetzt den ungültigen Wert durch 0

### Minimale Gültigkeit / Maximale Gültigkeit (Expertenmodus)
Optionale Mindest- und Höchstwerte für die Bereichsvalidierung. Werte außerhalb dieses Bereichs werden als ungültig behandelt und gemäß der Bereinigungsaktion gelöscht.

## Datentypen
- `uint16be` - `Unsigned 16 bit (Big Endian): AABB => AABB`
- `uint16le` – `Unsigned 16 bit (Little Endian): AABB => BBAA`
- `int16be` - `Signed 16 bit (Big Endian): AABB => AABB`
- `int16le` – `Signiertes 16-Bit (Little Endian): AABB => BBAA`
- `uint32be` - `Unsigned 32 bit (Big Endian): AABBCCDD => AABBCCDD`
- `uint32le` - `Unsigned 32 bit (Little Endian): AABBCCDD => DDCCBBAA`
- `uint32sw` - `Unsigned 32 bit (Big Endian Word Swap): AABBCCDD => CCDDAABB`
- `uint32sb` - `Unsigned 32 bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `int32be` - `Vorzeichenbehafteter 32-Bit-Datentyp (Big Endian): AABBCCDD => AABBCCDD`
- `int32le` - `Vorzeichenbehafteter 32-Bit-Wert (Little Endian): ABBCCDD => DDCCBBAA`
- `int32sw` - `Vorzeichenbehafteter 32-Bit-Wert (Big Endian Word Swap): AABBCCDD => CCDDAABB`
- `int32sb` - `Signed 32 bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `uint64be` – `Unsigned 64 bit (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `uint64le` - `Unsigned 64 bit (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `uint8be` - `Vorzeichenloser 8-Bit-Wert (Big Endian): AABB => BB`
- `uint8le` - `Vorzeichenlose 8-Bit-Zahl (Little Endian): AABB => AA`
- `int8be` - `Signed 8 bit (Big Endian): AABB => BB`
- `int8le` - `Signed 8 bit (Little Endian): AABB => AA`
- „floatbe“ – „Float (Big Endian): AABBCCDD => AABBCCDD“.
- `floatle` - `Float (Little Endian): AABBCCDD => DDCCBBAA`
- `floatsw` - `Float (Big Endian Word Swap): AABBCCDD => CCDDAABB`
- `floatsb` - `Float (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `doublebe` - `Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `doublele` - `Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `string` - `String 8 Bit (Nullende): ABCDEF\0 => ABCDEF\0`
- `stringle` - `8-Bit-String (Little Endian, Nullende): ABCDEF\0 => BADCFE\0`
- `string16` - `16-Bit-Zeichenkette (Nullende): \0A\0B\0C\0D\0E\0F\0\0 => ABCDEF\0`
- `string16le`- `16-Bit-String (Little Endian, Nullende): A\0B\0C\0D\0E\0F\0\0\0 => ABCDEF\0`
- `rawhex` - `Zeichenkette mit Wert in Hexadezimaldarstellung AABBCCDD.... => AABBCCDD....`

Die folgende Beschreibung wurde aus [Hier](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/) kopiert.

Das Punkt-zu-Punkt-Modbus-Protokoll ist aufgrund seiner einfachen Handhabung eine beliebte Wahl für die Kommunikation mit Remote-Terminals (RTUs). Das Protokoll selbst regelt die Interaktionen der einzelnen Geräte in einem Modbus-Netzwerk: wie die Geräte eine Adresse zuweisen, wie sie ihre Nachrichten erkennen und wie grundlegende Informationen aus den Daten extrahiert werden. Im Wesentlichen bildet das Protokoll die Grundlage des gesamten Modbus-Netzwerks.

Diese Bequemlichkeit bringt jedoch auch Komplikationen mit sich, und das Modbus-RTU-Nachrichtenprotokoll bildet da keine Ausnahme.

Das Protokoll selbst wurde für Geräte mit einer Registerlänge von 16 Bit entwickelt.

Daher waren bei der Implementierung von 32-Bit-Datenelementen besondere Überlegungen erforderlich.

Bei dieser Implementierung wurden zwei aufeinanderfolgende 16-Bit-Register verwendet, um 32 Bit Daten bzw. im Wesentlichen 4 Byte Daten darzustellen.
Innerhalb dieser vier Byte Daten können Gleitkommadaten einfacher Genauigkeit in eine Modbus-RTU-Nachricht kodiert werden.

### Die Bedeutung der Byte-Reihenfolge
Modbus selbst definiert keinen Gleitkomma-Datentyp, es gilt jedoch als allgemein anerkannt, dass es 32-Bit-Gleitkommadaten gemäß dem IEEE-754-Standard implementiert.

Der IEEE-Standard legt die Byte-Reihenfolge der Nutzdaten jedoch nicht eindeutig fest.
Daher ist bei der Verarbeitung von 32-Bit-Daten die korrekte Adressierung der Daten von größter Bedeutung.

Beispielsweise sieht die Zahl 123/456,00 gemäß der IEEE-754-Norm für 32-Bit-Gleitkommazahlen einfacher Genauigkeit wie folgt aus:

![Bild 1](../../../en/adapterref/iobroker.modbus/img/img1.png)

Die Auswirkungen unterschiedlicher Byte-Reihenfolgen sind erheblich. Beispielsweise wird die Anordnung der 4 Datenbytes, die 123456.00 darstellen, in einer `B A D C`-Sequenz als „Byte-Swap“ bezeichnet. Bei der Interpretation als IEEE-744-Gleitkomma-Datentyp ist das Ergebnis jedoch völlig anders:

![Bild 2](../../../en/adapterref/iobroker.modbus/img/img2.png)

Die Anordnung gleicher Bytes in einer „C D A B“-Sequenz wird als „Worttausch“ bezeichnet. Auch hier weichen die Ergebnisse drastisch vom ursprünglichen Wert von 123456,00 ab:

![Bild 3](../../../en/adapterref/iobroker.modbus/img/img3.png)

Des Weiteren würden sowohl `byte swap` als auch `word swap` die Byte-Sequenz im Wesentlichen komplett umkehren und ein weiteres Ergebnis erzeugen:

![Bild 4](../../../en/adapterref/iobroker.modbus/img/img4.png)

Bei der Verwendung von Netzwerkprotokollen wie Modbus muss natürlich genau darauf geachtet werden, in welcher Reihenfolge die Speicherbytes bei der Übertragung angeordnet sind, die sogenannte „Byte-Reihenfolge“.

### Byte-Reihenfolge bestimmen
Das Modbus-Protokoll selbst ist gemäß der Modbus Application Protocol Specification, V1.1.b, als „Big-Endian“-Protokoll deklariert:

Modbus verwendet eine „Big-Endian“-Darstellung für Adressen und Datenelemente.
Das bedeutet, dass bei der Übertragung einer numerischen Größe, die größer als ein Byte ist, das höchstwertige Byte zuerst gesendet wird.

Big-Endian ist das am häufigsten verwendete Format für Netzwerkprotokolle – so häufig, dass es auch als „Netzwerkordnung“ bezeichnet wird.

Da das Modbus-RTU-Nachrichtenprotokoll Big-Endian ist, muss für den erfolgreichen Austausch eines 32-Bit-Datentyps über eine Modbus-RTU-Nachricht die Byte-Reihenfolge von Master und Slave berücksichtigt werden. Viele RTU-Master- und Slave-Geräte ermöglichen die Auswahl der Byte-Reihenfolge, insbesondere bei softwaresimulierten Einheiten. Es muss lediglich sichergestellt werden, dass beide Einheiten auf dieselbe Byte-Reihenfolge eingestellt sind.

Grundsätzlich bestimmt die Familie des Mikroprozessors eines Geräts dessen Byte-Reihenfolge (Endianness). Typischerweise findet man Big-Endian (das höherwertige Byte wird zuerst gespeichert, gefolgt vom niederwertigen) bei CPUs mit Motorola-Prozessor. Little-Endian (das niederwertige Byte wird zuerst gespeichert, gefolgt vom höherwertigen) findet man hingegen typischerweise bei CPUs mit Intel-Architektur. Welcher der beiden Stile als „rückständig“ gilt, ist Ansichtssache.

Sind Byte-Reihenfolge und Byte-Reihenfolge jedoch nicht konfigurierbar, müssen Sie die Interpretation des Bytes festlegen. Dies kann durch Anfordern eines bekannten Gleitkommawertes vom Slave erfolgen. Wird ein unmöglicher Wert zurückgegeben, beispielsweise eine Zahl mit einem zweistelligen Exponenten, muss die Byte-Reihenfolge höchstwahrscheinlich angepasst werden.

### Praktische Hilfe
Die FieldServer Modbus RTU-Treiber bieten verschiedene Funktionsoperationen zur Verarbeitung von 32-Bit-Ganzzahlen und 32-Bit-Gleitkommazahlen. Wichtiger noch: Diese Funktionsoperationen berücksichtigen alle möglichen Byte-Sequenzierungen. Die folgende Tabelle zeigt die FieldServer-Funktionsoperationen, die zwei benachbarte 16-Bit-Register in einen 32-Bit-Ganzzahlwert kopieren.

| Funktionsschlüsselwort | Tauschmodus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | N/A | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.i32-s | Byte- und Worttausch | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.i32-sb | Byte-Tausch | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.i32-sw | Worttausch | [ a b ] [ c d ] | [ c d a b ] |

Die folgende Tabelle zeigt die FieldServer-Funktionsschritte, die zwei benachbarte 16-Bit-Register in einen 32-Bit-Gleitkommawert kopieren:

| Funktionsschlüsselwort | Tauschmodus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | N/A | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.ifloat-s | Byte- und Worttausch | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.ifloat-sb | Byte-Swap | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.ifloat-sw | Worttausch | [ a b ] [ c d ] | [ c d a b ] |

Die folgende Tabelle zeigt die FieldServer-Funktionsschritte, die einen einzelnen 32-Bit-Gleitkommawert in zwei benachbarte 16-Bit-Register kopieren:

| Funktionsschlüsselwort | Tauschmodus | Quellbytes | Zielbytes |
|------------------|--------------------|-----------------|----------------|
| 1.float-2.i16 | N/A | [ a b ] [ c d ] | [ a b ][ c d ] |
| 1.float-2.i16-s | Byte- und Worttausch | [ a b ] [ c d ] | [ d c ][ b a ] |
| 1.float-2.i16-sb | Byte-Tausch | [ a b ] [ c d ] | [ b a ][ d c ] |
| 1.float-2.i16-sw | Worttausch | [ a b ] [ c d ] | [ c d ][ a b ] |

Angesichts der verschiedenen FieldServer-Funktionsschritte hängt die korrekte Verarbeitung von 32-Bit-Daten von der Auswahl des richtigen Schritts ab. Beobachten Sie das folgende Verhalten dieser FieldServer-Funktionsschritte bei dem bekannten einfachgenauen Dezimal-Gleitkommawert 123456,00:

| 16-Bit-Werte | Funktionsverschiebung | Ergebnis | Funktionsverschiebung | Ergebnis |
|---------------|------------------|-----------|------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.float-2.i16 | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.float-s | 123456.00 | 1.float-2.i16-s | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.float-2.i16-sb | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

Beachten Sie, dass unterschiedliche Byte- und Wortreihenfolgen die Verwendung der entsprechenden FieldServer-Funktion „move“ erfordern. Sobald die richtige Funktion ausgewählt ist, können die Daten in beide Richtungen konvertiert werden.

Von den vielen Hexadezimal-zu-Gleitkomma-Umrechnern und -Rechnern im Internet erlauben nur wenige die Manipulation der Byte- und Wortreihenfolge.

Ein solches Programm findet sich unter www.61131.com/download.htm, wo sowohl Linux- als auch Windows-Versionen heruntergeladen werden können.

Nach der Installation wird das Programm als ausführbare Datei mit einer einzigen Benutzeroberfläche gestartet.

Das Programm zeigt den Dezimalwert 123456,00 wie folgt an:

![Bild 5](../../../en/adapterref/iobroker.modbus/img/img5.png)

Anschließend können Bytes und/oder Wörter vertauscht werden, um zu analysieren, welche potenziellen Endianness-Probleme zwischen Modbus RTU Master- und Slave-Geräten bestehen könnten.

## Export / Import von Registern
Mit der Export-/Importfunktion können Sie alle Registerdaten (nur eines Typs) in eine TSV-Datei (Tab-Separated Values) konvertieren und wieder zurück, um Daten einfach von einem Gerät auf ein anderes zu kopieren oder das Register in Excel zu bearbeiten.

Sie können Ihre Schemas mit anderen Benutzern in [modbus-templates,](https://github.com/ioBroker/modbus-templates) teilen oder dort einige registrierte Schemas finden.

## Prüfen
Im Ordner `test` befinden sich einige Programme zum Testen der TCP-Kommunikation:

- Ananas32/64 ist ein Slave-Simulator (hält nur Register und Eingänge, keine Spulen und digitale Eingänge)
RMMS ist ein Master-Simulator
- mod_RSsim.exe ist ein Slave-Simulator. Möglicherweise benötigen Sie das [Microsoft Visual C++ 2008 SP1 Redistributable Package](https://www.microsoft.com/en-us/download/details.aspx?id=5582), um ihn zu starten (aufgrund eines Side-by-Side-Fehlers).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Fixed repeated `Can not set value: The value of "offset" is out of range` errors when a device answers a combined read block with fewer registers than requested (issue #502, via `@iobroker/modbus`): the short response is now reported with a single clear warning and the values that were returned are still stored. Workaround without the update: set "Max address gap to combine" to 0
- (@GermanBluefox) Added Modbus/UDP support as a master (issue #222): select "UDP (Master)" as the connection type. Requires `@iobroker/modbus` >= 7.6.0
- (@GermanBluefox) The register table export/import dialog can now use CSV (`;`-separated, quoted) or JSON in addition to TSV, and the data can be saved to / loaded from a file (issue #249): pick the format in the dialog to mass-edit the data points in Excel or a text editor. Empty columns (e.g. an unused "name") are preserved, so a round-trip export→edit→import no longer breaks the format
- (@GermanBluefox) Register tables with many data points are now much faster to edit (issue #249): rows are virtualized (only the visible ones are rendered), and a new "freeze order" toolbar button keeps rows from re-sorting/jumping while you type
- (@GermanBluefox) When "Multi device IDs" is enabled, register tables can be shown as a tree grouped by slave/device ID with collapsible sections (issue #249): toggle it with the new "Group by device ID" toolbar button

### 8.3.0 (2026-07-03)
- (@GermanBluefox) Added a "Max address gap to combine" setting (issue #581): controls how large an address gap may be bridged when combining registers into one read request. Set it to 0 to read only contiguous configured registers, so devices that reject a non-existent register in a gap no longer fail the whole read (requires `@iobroker/modbus` >= 7.5.1)
- (@GermanBluefox) Added per-device timeout and wait time (issue #605): when "Multi device IDs" is enabled, the Connection tab shows a table of all device IDs used in the register tables, each with its own timeout and wait time (blank = global value)
- (@GermanBluefox) Added a proxy mode (issue #775): a master can additionally serve its polled data as a Modbus TCP slave. Enable it in the Connection tab (requires `@iobroker/modbus` >= 7.5.1)
- (@GermanBluefox) Fixed the TCP/SSL master not recovering after a communication loss (issue #594, via `@iobroker/modbus`): the receive buffer is now cleared and the socket recreated on every reconnect, so a frame cut off by the disconnect can no longer desync the parser and permanently break polling until an adapter restart
- (@GermanBluefox) Fixed cyclic write of non-polled holding registers in immediate-write mode `maxBlock < 2` (follow-up to issue #771, via `@iobroker/modbus`)
- (@GermanBluefox) Updated the `@iobroker/modbus` package: fixed `Put.floatle()` to write a valid IEEE-754 little-endian float and to stop dropping data written after it

### 8.2.2 (2026-07-01)
- (@johannes-lode) Fixed FC1 coil reads returning stale data: the slave now refreshes the coil buffer before responding (event name matched the listener)
- (@johannes-lode) Fixed the TCP slave crashing on server listen errors (e.g. address already in use or privileged port without permission); such errors are now logged instead
- (@johannes-lode) Fixed coil/discrete-input reads being written to the wrong buffer bit for start addresses other than 0
- (@johannes-lode) Fixed the coil/discrete-input buffer size when the highest address is a multiple of 8 (`ceil(addressHigh / 8)`)

### 8.2.1 (2026-06-27)
- (@GermanBluefox) Allowed the selection of port by USB path

### 8.2.0 (2026-05-29)
- (@GermanBluefox) Added selection of the serial device by its stable USB ID (vendor/product/serial), so the connection keeps working even if the OS reassigns the port name

### 8.1.3 (2026-04-13)
- (@GermanBluefox) Corrected room definition for the first register

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2015-2026 Bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.