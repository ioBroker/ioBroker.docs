---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: id6hgF37n9I59yegQfQ2Jh4HNKHICnikRXvvgefINo0=
---
![Logo](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![Anzahl der Installationen](http://iobroker.live/badges/modbus-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.modbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.modbus.svg)

# Iobroker.modbus
![Testen und Freigeben](https://github.com/ioBroker/iobroker.modbus/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Implementierung von ModBus Slave und Master für ioBroker. Folgende Typen werden unterstützt:

- Modbus RTU über Seriell (Master)
- Modbus RTU über TCP (Master)
- Modbus TCP (Slave, Master)

## Einstellungen
### Partner-IP-Adresse
IP-Adresse des Modbus-Partners.

### Hafen
TCP-Port des Modbus-Partners, wenn als Master (Client) konfiguriert, oder eigener Port, wenn als Slave (Server) konfiguriert.

### Geräte ID
Modbus-Geräte-ID. Wichtig, wenn eine TCP/Modbus-Brücke verwendet wird.

### Typ
Slave (Server) oder Master (Client).

### Aliase als Adresse verwenden
Normalerweise können alle Register Adressen von 0 bis 65535 haben. Durch die Verwendung von Aliasnamen können Sie virtuelle Adressfelder für jeden Registertyp definieren. Normalerweise:

- diskrete Eingänge sind von 10001 bis 20000
- Spulen sind von 1 bis 1000
- Eingangsregister sind von 30001 bis 40000
- Halteregister sind von 40001 bis 60000

Jeder Alias wird intern einer Adresse zugeordnet, beispielsweise wird 30011 dem Eingaberegister 10 zugeordnet usw.

### Direkte Adressen
Wird für Binäreingänge und Spulen verwendet.
Ohne dieses Flag werden die Bits wie folgt adressiert: `0 => 15, 1 => 14, 2 => 13, ..., 15 => 0`.
Wenn dieses Flag aktiviert ist, werden die Bits wie folgt adressiert: `0 => 0, 1 => 1, 2 => 2, ..., 15 => 15`.

### Adressen nicht auf 16 Bit (Wort) ausrichten
Normalerweise werden die Adressen der Spulen und diskreten Eingänge auf 16 Bit ausgerichtet.
So werden Adressen von 3 bis 20 auf 0 bis 32 ausgerichtet.
Wenn diese Option aktiviert ist, werden die Adressen nicht ausgerichtet.

### Verwenden Sie nicht mehrere Register
Wenn der Slave den Befehl „Mehrere Register schreiben“ nicht unterstützt, können Sie ihn aktivieren, um Warnungen zu erhalten, wenn mehrere Register geschrieben werden.

### Verwenden Sie nur mehrere Schreibregister
Wenn der Slave nur den Befehl „Mehrere Register schreiben“ unterstützt, können Sie aktivieren, dass die Register immer mit dem Befehl FC15/FC16 geschrieben werden.

### Runden Sie reelle Zahlen auf
Wie viele Ziffern nach dem Komma für Float und Doubles.

### Datenabrufintervall
Zyklisches Poll-Intervall (Nur für Master relevant)

### Verzögerung bei erneuter Verbindung
Wiederverbindungsintervall (Nur für Master relevant)

### Zeitüberschreitung beim Lesen
Timeout für Leseanfragen in Millisekunden. Wenn in dieser Zeit keine Antwort von einem Slave eingeht, wird die Verbindung beendet.

### Pulszeit
Wenn Impulse für Spulen verwendet werden, definiert dies das Intervall in Millisekunden, wie lang der Impuls ist.

### Wartezeit
Wartezeit zwischen der Abfrage zweier unterschiedlicher Geräte-IDs in Millisekunden.

### Maximale Länge der Leseanforderung
Maximale Länge des Befehls READ_MULTIPLE_REGISTERS als Anzahl der zu lesenden Register.

Manche Systeme erfordern zuerst eine „Schreibanfrage“, um die Daten bei einer „Leseanfrage“ zu liefern.

Sie können diesen Modus erzwingen, indem Sie die „Maximale Länge der Leseanfrage“ auf 1 setzen.

**Hinweis:** Einige USB-Modbus-Lösungen (z. B. auf Socat basierend) können Probleme bei der Funktion mit dem Serialport-NPM-Modul haben.

Es gibt ein Software-Gateway [**Modbus RTU <-> Modbus RTU über TCP**](http://mbus.sourceforge.net/index.html), um die Verwendung der seriellen RTU über das TCP-Protokoll zu ermöglichen.

Beide Lösungen **RTU über TCP** und **TCP** funktionieren gut.

### Leseintervall
Verzögerung zwischen zwei Leseanforderungen in ms. Standardmäßig 0.

### Schreibintervall
Verzögerung zwischen zwei Schreibanforderungen in ms. Standardmäßig 0.

### Unveränderte Zustände aktualisieren
Normalerweise wird der Wert nicht in ioBroker geschrieben, wenn er sich nicht geändert hat.
Dieses Flag ermöglicht die Aktualisierung des Zeitstempels des Werts bei jedem Zyklus.

### Keine Adressen in die ID einschließen
Fügen Sie der generierten ioBroker-ID keine Adresse hinzu. `10_Input10` vs. `Input10`.

### Punkte in der ID beibehalten
Mit diesem Flag lautet der Name `Inputs.Input10`. Ohne => `Inputs_Input10`.

## Parameter für einzelne Adresszeile in der Konfiguration
### Adresse
Zu lesende Modbus-Adresse.

### Slave-ID
Falls mehrere Slaves vorhanden sind, ist dies die ID, sofern es sich nicht um die in der globalen Konfiguration angegebene Standard-ID handelt.

### Name
Dies ist der Name des Parameters.

### Beschreibung
Parameterbeschreibung.

### Einheit
Einheit des Parameters.

### Typ
Vom Bus zu lesender Datentyp. Einzelheiten zu den möglichen Datentypen finden Sie im Abschnitt Datentypen.

### Länge
Länge des Parameters. Für die meisten Parameter wird dies anhand des Datentyps bestimmt, für Zeichenfolgen definiert dies jedoch die Länge in Bytes/Zeichen.

### Faktor
Dieser Faktor wird verwendet, um den ausgelesenen Wert vom Bus für die statische Skalierung zu multiplizieren. Die Berechnung sieht also wie folgt aus: `val = x * Factor + Offset`.

### Versatz
Dieser Offset wird zum gelesenen Wert nach der obigen Multiplikation addiert. Die Berechnung sieht also folgendermaßen aus: `val = x * Factor + Offset`.

### Formel
Dieses Feld kann für erweiterte Berechnungen verwendet werden, wenn Faktor und Offset nicht ausreichen. **Wenn dieses Feld gesetzt ist, werden die Felder Faktor und Offset ignoriert.** Die Formel wird von der Funktion eval() ausgeführt. Daher werden alle gängigen Funktionen unterstützt. Insbesondere die mathematischen Funktionen. Die Formel muss der Javascript-Syntax entsprechen, achten Sie daher auch auf Groß- und Kleinschreibung.

In der Formel muss "x" für den aus Modbus ausgelesenen Wert verwendet werden. Beispiel: `x * Math.pow(10, sf['40065'])`

Mithilfe des „sf“-Arrays (siehe Beispiel oben) können Sie auf andere gelesene Modbus-Werte zugreifen, wenn diese in der Konfiguration als „Skalierungsfaktor“ gekennzeichnet sind (siehe unten Informationen zum „SF“-Flag).

Wenn die Formel zur Laufzeit nicht ausgewertet werden kann, schreibt der Adapter eine Warnmeldung in das Protokoll.

Ein weiterer Anwendungsfall für Formeln könnte auch die Vermeidung unplausibler Daten mit einer Formel wie `x > 2000000 ? null : x` sein.

### Rolle
Zuzuweisende ioBroker-Rolle.

### Zimmer
Zuzuweisender ioBroker-Raum.

### Umfrage
Wenn aktiviert, werden die Werte in einem vordefinierten Intervall vom Slave abgefragt.

### WP
Schreibimpuls

### CW
Zyklisches Schreiben

### SF
Wert als Skalierungsfaktor verwenden.
Dies ist für dynamische Skalierungsfaktoren erforderlich, die auf manchen Systemen über Werte auf der Schnittstelle bereitgestellt werden.
Wenn ein Wert mit diesem Flag markiert ist, wird der Wert in einer Variablen mit der folgenden Namenskonvention gespeichert: `sf['Modbus_address']`.
Diese Variable kann dann später in jeder Formel für andere Parameter verwendet werden. Beispielsweise kann die folgende Formel Folgendes festlegen: `(x * sf['40065']) + 50;`

## Datentypen
- `uint16be` - `Vorzeichenlose 16 Bit (Big Endian): AABB => AABB`
- `uint16le` - `Vorzeichenlose 16 Bit (Little Endian): AABB => BBAA`
- `int16be` - `Vorzeichenbehaftete 16 Bit (Big Endian): AABB => AABB`
- `int16le` - `Vorzeichenbehaftet 16 Bit (Little Endian): AABB => BBAA`
- `uint32be` - `Vorzeichenlose 32 Bit (Big Endian): AABBCCDD => AABBCCDD`
- `uint32le` - `Vorzeichenlose 32 Bit (Little Endian): AABBCCDD => DDCCBBAA`
- `uint32sw` - `Vorzeichenlose 32 Bit (Big Endian Word Swap): AABBCCDD => CCDDAABB`
- `uint32sb` - `Vorzeichenlose 32 Bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `int32be` - `Vorzeichenbehaftete 32-Bit (Big Endian): AABBCCDD => AABBCCDD`
- `int32le` - `Vorzeichenbehaftet 32 Bit (Little Endian): ABBCCDD => DDCCBBAA`
- `int32sw` - `Vorzeichenbehaftete 32-Bit (Big Endian Word Swap): AABBCCDD => CCDDAABB`
- `int32sb` - `Vorzeichenbehaftete 32 Bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `uint64be` - `Vorzeichenlose 64-Bit (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `uint64le` - `Vorzeichenlose 64-Bit (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `uint8be` - `Vorzeichenlose 8-Bit (Big Endian): AABB => BB`
- `uint8le` - `Vorzeichenlose 8 Bit (Little Endian): AABB => AA`
- `int8be` - `Vorzeichenbehaftete 8-Bit (Big Endian): AABB => BB`
- `int8le` - `Vorzeichenbehaftete 8-Bit (Little Endian): AABB => AA`
- `floatbe` - `Float (Big Endian): AABBCCDD => AABBCCDD`
- `floatle` - `Float (Little Endian): AABBCCDD => DDCCBBAA`
- `floatsw` - `Float (Big Endian Worttausch): AABBCCDD => CCDDAABB`
- `floatsb` - `Float (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `doublebe` - `Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `doublele` - `Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `string` - `String 8 bit (Null-Ende): ABCDEF\0 => ABCDEF\0`
- `stringle` - `String 8 Bit (Little Endian, Null-Ende): ABCDEF\0 => BADCFE\0`
- `string16` - `String 16 Bit (Null-Ende): \0A\0B\0C\0D\0E\0F\0\0 => ABCDEF\0`
- `string16le`- `String 16 Bit (Little Endian, Null-Ende): A\0B\0C\0D\0E\0F\0\0\0 => ABCDEF\0`
- `rawhex` – `Zeichenfolge mit Wert in Hex-Darstellung AABBCCDD.... => AABBCCDD....`

Die folgende Beschreibung wurde aus [Hier](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/) kopiert

Das Punkt-zu-Punkt-Modbus-Protokoll ist eine beliebte Wahl für RTU-Kommunikation, und sei es nur wegen seiner grundlegenden Benutzerfreundlichkeit. Das Protokoll selbst steuert die Interaktionen jedes Geräts in einem Modbus-Netzwerk, wie das Gerät eine bekannte Adresse erstellt, wie jedes Gerät seine Nachrichten erkennt und wie grundlegende Informationen aus den Daten extrahiert werden. Im Wesentlichen ist das Protokoll die Grundlage des gesamten Modbus-Netzwerks.

Ein solcher Komfort ist jedoch nicht ohne Komplikationen möglich, und das Modbus RTU-Nachrichtenprotokoll bildet hier keine Ausnahme.
Das Protokoll selbst wurde auf der Grundlage von Geräten mit einer Registerlänge von 16 Bit entwickelt.
Folglich waren bei der Implementierung von 32-Bit-Datenelementen besondere Überlegungen erforderlich.
Bei dieser Implementierung wurde die Verwendung von zwei aufeinanderfolgenden 16-Bit-Registern zur Darstellung von 32 Datenbits oder im Wesentlichen 4 Datenbytes festgelegt.
In diesen vier Datenbytes können Gleitkommadaten mit einfacher Genauigkeit in eine Modbus RTU-Nachricht kodiert werden.

### Die Bedeutung der Byte-Reihenfolge
Modbus selbst definiert keinen Gleitkomma-Datentyp, es ist jedoch allgemein anerkannt, dass es 32-Bit-Gleitkommadaten unter Verwendung des IEEE-754-Standards implementiert.
Der IEEE-Standard hat jedoch keine klare Definition der Byte-Reihenfolge der Datennutzlast.
Daher ist die wichtigste Überlegung beim Umgang mit 32-Bit-Daten, dass die Daten in der richtigen Reihenfolge adressiert werden.

Beispielsweise sieht die Zahl 123/456.00 gemäß der Definition im IEEE-754-Standard für 32-Bit-Gleitkommazahlen mit einfacher Genauigkeit wie folgt aus:

![Bild1](../../../en/adapterref/iobroker.modbus/img/img1.png)

Die Auswirkungen unterschiedlicher Byte-Reihenfolgen sind erheblich. So wird beispielsweise die Reihenfolge der 4 Datenbytes, die 123456,00 darstellen, in einer `B A D C`-Sequenz als „Byte-Swap“ bezeichnet. Bei der Interpretation als IEEE 744-Gleitkomma-Datentyp ist das Ergebnis ganz anders:

![Bild2](../../../en/adapterref/iobroker.modbus/img/img2.png)

Die Anordnung der gleichen Bytes in einer „C D A B“-Sequenz wird als „Worttausch“ bezeichnet. Auch hier unterscheiden sich die Ergebnisse drastisch vom ursprünglichen Wert 123456,00:

![Bild3](../../../en/adapterref/iobroker.modbus/img/img3.png)

Darüber hinaus würden sowohl ein `byte swap` als auch ein `word swap` die Byte-Reihenfolge im Wesentlichen vollständig umkehren und ein weiteres Ergebnis erzeugen:

![Bild4](../../../en/adapterref/iobroker.modbus/img/img4.png)

Beim Einsatz von Netzwerkprotokollen wie Modbus muss natürlich genau auf die Reihenfolge der Speicherbytes bei der Übertragung geachtet werden (auch als „Byte-Reihenfolge“ bezeichnet).

### Bestimmen der Byte-Reihenfolge
Das Modbus-Protokoll selbst wird gemäß der Modbus Application Protocol Specification, V1.1.b, als „Big-Endian“-Protokoll deklariert:

**Modbus verwendet eine „Big-Endian“-Darstellung für Adressen und Datenelemente.
Das bedeutet, dass bei der Übertragung einer numerischen Menge, die größer als ein einzelnes Byte ist, das höchstwertige Byte zuerst gesendet wird.**

Big-Endian ist das am häufigsten verwendete Format für Netzwerkprotokolle – so verbreitet, dass es auch als „Netzwerkreihenfolge“ bezeichnet wird.

Da das Modbus RTU-Nachrichtenprotokoll Big-Endian ist, muss die Byte-Reihenfolge sowohl des Masters als auch des Slaves berücksichtigt werden, um einen 32-Bit-Datentyp erfolgreich über eine Modbus RTU-Nachricht auszutauschen. Viele RTU-Master- und Slave-Geräte ermöglichen eine spezifische Auswahl der Byte-Reihenfolge, insbesondere bei softwaresimulierten Einheiten. Es muss nur sichergestellt werden, dass beide Einheiten auf die gleiche Byte-Reihenfolge eingestellt sind.

Als Faustregel gilt, dass die Familie des Mikroprozessors eines Geräts dessen Byte-Reihenfolge bestimmt. Normalerweise findet man den Big-Endian-Stil (das höchstwertige Byte wird zuerst gespeichert, gefolgt vom niederwertigen Byte) in CPUs, die mit einem Motorola-Prozessor entwickelt wurden. Der Little-Endian-Stil (das niederwertige Byte wird zuerst gespeichert, gefolgt vom höchstwertigen Byte) findet man in der Regel in CPUs, die die Intel-Architektur verwenden. Es ist eine Frage der persönlichen Perspektive, welcher Stil als „rückwärts“ betrachtet wird.

Wenn Byte-Reihenfolge und Byte-Reihenfolge jedoch keine konfigurierbaren Optionen sind, müssen Sie bestimmen, wie das Byte interpretiert werden soll. Dies kann durch Anfordern eines bekannten Gleitkommawerts vom Slave erfolgen. Wenn ein unmöglicher Wert zurückgegeben wird, d. h. eine Zahl mit einem zweistelligen Exponenten oder Ähnlichem, muss die Byte-Reihenfolge höchstwahrscheinlich geändert werden.

### Praktische Hilfe
Die FieldServer Modbus RTU-Treiber bieten mehrere Funktionsverschiebungen, die 32-Bit-Ganzzahlen und 32-Bit-Float-Werte verarbeiten. Noch wichtiger ist, dass diese Funktionsverschiebungen alle verschiedenen Formen der Byte-Sequenzierung berücksichtigen. Die folgende Tabelle zeigt die FieldServer-Funktionsverschiebungen, die zwei benachbarte 16-Bit-Register in einen 32-Bit-Ganzzahlwert kopieren.

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | Nicht zutreffend | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.i32-s | Byte- und Wort-Tausch | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.i32-sb | Byte-Swap | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.i32-sw | Wortvertauschung | [ a b ] [ c d ] | [ c d a b ] |

Die folgende Tabelle zeigt die Verschiebungen der FieldServer-Funktion, die zwei benachbarte 16-Bit-Register in einen 32-Bit-Gleitkommawert kopieren:

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | N/A | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.ifloat-s | Byte- und Worttausch | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.ifloat-sb | Byte-Swap | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.ifloat-sw | Worttausch | [ a b ] [ c d ] | [ c d a b ] |

Die folgende Tabelle zeigt die Verschiebungen der FieldServer-Funktion, die einen einzelnen 32-Bit-Gleitkommawert in zwei benachbarte 16-Bit-Register kopieren:

| Funktionsschlüsselwort | Swap-Modus | Quellbytes | Zielbytes |
|------------------|-------------------|-----------------|----------------|
| 1.float-2.i16 |N/A | [ a b ] [ c d ] | [ a b ][ c d ] |
| 1.float-2.i16-s |Byte- und Worttausch | [ a b ] [ c d ] | [ d c ][ b a ] |
| 1.float-2.i16-sb |Byte-Swap | [ a b ] [ c d ] | [ b a ][ d c ] |
| 1.float-2.i16-sw |Worttausch | [ a b ] [ c d ] | [ c d ][ a b ] |

Angesichts der verschiedenen FieldServer-Funktionsverschiebungen hängt die korrekte Verarbeitung von 32-Bit-Daten von der Auswahl der richtigen ab. Beachten Sie das folgende Verhalten dieser FieldServer-Funktionsverschiebungen bei dem bekannten einfachgenauen Dezimal-Float-Wert 123456,00:

|16-Bit-Werte | Funktion verschieben | Ergebnis | Funktion verschieben | Ergebnis |
|--------------|------------------|-----------|------------------|---------------|
|0x2000 0x47F1 | 2.i16-1.float | 123456,00 | 1.float-2.i16 | 0x2000 0x47F1 |
|0xF147 0x0020 | 2.i16-1.float-s | 123456,00 | 1.float-2.i16-s | 0xF147 0X0020 |
|0x0020 0xF147 | 2.i16-1.float-sb | 123456,00 | 1.float-2.i16-sb | 0x0020 0xF147 |
|0x47F1 0x2000 | 2.i16-1.float-sw | 123456,00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

Beachten Sie, dass unterschiedliche Byte- und Wortreihenfolgen die Verwendung der entsprechenden FieldServer-Funktionsverschiebung erfordern. Sobald die richtige Funktionsverschiebung ausgewählt ist, können die Daten in beide Richtungen konvertiert werden.

Von den vielen Hex-zu-Gleitkomma-Konvertern und -Rechnern, die im Internet verfügbar sind, erlauben nur sehr wenige tatsächlich die Manipulation der Byte- und Wortreihenfolge. Ein solches Dienstprogramm finden Sie unter www.61131.com/download.htm, wo sowohl Linux- als auch Windows-Versionen der Dienstprogramme heruntergeladen werden können. Nach der Installation wird das Dienstprogramm als ausführbare Datei mit einer einzigen Dialogoberfläche ausgeführt. Das Dienstprogramm stellt den dezimalen Gleitkommawert 123456,00 wie folgt dar:

![Bild5](../../../en/adapterref/iobroker.modbus/img/img5.png)

Anschließend können Bytes und/oder Wörter ausgetauscht werden, um zu analysieren, welche potenziellen Byte-Reihenfolgeprobleme zwischen Modbus RTU-Master- und -Slave-Geräten bestehen könnten.

## Export / Import von Registern
Mit der Export-/Importfunktion können Sie alle Registerdaten (nur eines Typs) in eine TSV-Datei (Tabulator-getrennte Werte) und zurück konvertieren, um Daten einfach von einem Gerät auf ein anderes zu kopieren oder Register in Excel zu bearbeiten.

Sie können Ihre Schemata mit anderen Benutzern in [Modbus-Vorlagen](https://github.com/ioBroker/modbus-templates) teilen oder dort einige Registerschemata finden.

## Prüfen
Im Ordner `test` befinden sich einige Programme zum Testen der TCP-Kommunikation:

- Ananas32/64 ist ein Slave-Simulator (nur Halteregister und Eingänge, keine Spulen und digitale Eingänge)
- RMMS ist Master-Simulator
- mod_RSsim.exe ist ein Slave-Simulator. Möglicherweise benötigen Sie [Microsoft Visual C++ 2008 SP1 Redistributable Package](https://www.microsoft.com/en-us/download/details.aspx?id=5582), um ihn zu starten (aufgrund eines SideBySide-Fehlers).

## Machen
- [ ] Analysieren Sie Dateien auf https://github.com/ioBroker/modbus-templates und ermöglichen Sie deren direkten Import vom Adapter

<!--

### **IN ARBEIT** -->

## Changelog
### 6.2.0 (2024-04-12)
* (PLCHome) String based on 16 bit values big endian as well as little endian
* (PLCHome) Raw data as a hex string
* (PLCHome) Fix issue stringle was always converted to number for slave
* (PLCHome) Enable formula for strings and hex strings

### 6.1.0 (2023-12-14)
* (nkleber78) Implement the connection keepAlive

### 6.0.1 (2023-10-30)
* (bluefox) Better tooltips in settings

### 6.0.0 (2023-10-27)
* (bluefox) GUI packages updated
* (bluefox) Added help for settings
* (bluefox) Minimal supported node.js version is 16

### 5.0.11 (2022-12-01)
* (clausmuus) fixed reconnect of serial communication

### 5.0.8 (2022-09-27)
* (bluefox) GUI packages updated

### 5.0.5 (2022-08-13)
* (Apollon77) Prevent some crash cases reported by Sentry

### 5.0.4 (2022-06-15)v
* (bluefox) Corrected the coils reading in slave mode
* (bluefox) Corrected type of connection indicator

### 5.0.3 (2022-05-13)
* (bluefox) Fixed error with mutli-devices

### 5.0.0 (2022-05-11)
* BREAKING: All space characters will be replaced with underscores now in the Objects IDs, not only the first one.
* (Apollon77) Catch error reported by sentry when invalid Master port is entered
* (bluefox) GUI migrated to mui-v5

### 4.0.4 (2022-03-25)
* (Apollon77/UncleSamSwiss) Prevent invalid state log

### 4.0.3 (2022-03-21)
* (bluefox) Updated serial port package
* (bluefox) Minimal node.js version is 12

### 3.4.17 (2021-11-11)
* (Apollon77) Catch errors in tasks processing to prevent crashes

### 3.4.15 (2021-11-09)
* (Apollon77) Catch errors in tasks processing to prevent crashes
* (Apollon77) make sure generated IDs do not end with "."

### 3.4.14 (2021-08-31)
* (nkleber78) Fixed issue with sorting
* (bluefox) Corrected the calculations with scaling factor
* (bluefox) Read times were optimized

### 3.4.11 (2021-07-31)
* (bluefox) Corrected import of last line

### 3.4.10 (2021-07-30)
* (Apollon77) Make sure that slave reconnections at least wait 1000ms to allow old connectio to close properly
* (bluefox) Corrected the error with write single registers

### 3.4.9 (2021-07-06)
* (bluefox) Changed edit behaviour

### 3.4.8 (2021-06-24)
* (Apollon77) Fix crash case on writing floats (Sentry IOBROKER-MODBUS-2D)

### 3.4.7 (2021-06-22)
* (bluefox) Corrected addressing with aliases in GUI

### 3.4.6 (2021-06-21)
* (bluefox) Corrected addressing with aliases

### 3.4.5 (2021-06-19)
* (bluefox) Corrected the "write multiple registers" option

### 3.4.4 (2021-06-16)
* (bluefox) GUI bugs were corrected
* (bluefox) Added output of error codes

### 3.4.2 (2021-06-15)
* (nkleber78) Corrected issue with the scale factors
* (bluefox) New react GUI added
* (bluefox) Add new option: Use only Write multiple registers, read interval

### 3.3.1 (2021-05-10)
* (bluefox) fixed the configuration dialog for "input registers" in slave mode

### 3.3.0 (2021-04-16)
* (Apollon77) Allow usage of write-only (no poll) states
* (Apollon77/TmShaz) F Write multiple registers
* (prog42) create states of type string with default value of type string

### 3.2.6 (2021-03-05)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-MODBUS-20)
* (Apollon77) Better handle invalid responses

### 3.2.4 (2021-01-30)
* (Sierra83) also support ttyXRUSB0 style devices

### 3.2.3 (2021-01-21)
* (Apollon77) Catch value encoding error and do not crash adapter (Sentry IOBROKER-MODBUS-1W)
* (Apollon77) add a meta object as instance object

### 3.2.2 (2020-12-15)
* (Apollon77) prevent a rash case (Sentry IOBROKER-MODBUS-1S)

### 3.2.1 (2020-12-12)
* (Apollon77) prevent a crash case (Sentry IOBROKER-MODBUS-1R)

### 3.2.0 (2020-12-09)
* (nkleber78) Fixed formula where return keyword was missing

### 3.1.13 (2020-12-07)
* (nkleber78) Added the possibility to use formulas for values

### 3.1.12 (2020-12-05)
* (Apollon77) fix admin serial port selection

### 3.1.10 (2020-09-25)
* (nkleber78) Corrected: the exported data cannot be imported without modification

### 3.1.9 (2020-09-17)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MODBUS-1C)

### 3.1.7 (2020-07-23)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-N)

### 3.1.6 (2020-07-06)
* (bluefox) Fix some Sentry crash reports (IOBROKER-MODBUS-J)

### 3.1.5 (2020-06-29)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-F)

### 3.1.4 (2020-06-24)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-4, IOBROKER-MODBUS-7, IOBROKER-MODBUS-6)
* (Apollon77) Change the way adapter restarts when reconnections do not help

### 3.1.3 (2020-06-12)
* (Apollon77) fix scheduled restart

### 3.1.2 (2020-06-12)
* (Apollon77) fix serialport list for Admin

### 3.1.1 (2020-06-11)
* (Apollon77) Add Sentry crash reporting when used with js-controller >=3.x

### 3.1.0 (2020-06-11)
* (Apollon77) Make sure that regular adapter stops do not terminate the process, so that scheduled restarts still work
* (Apollon77) update serialport, support nodejs 12/14

### 3.0.4 (2020-06-05)
* (bluefox) Added device ID by export/import
* (bluefox) Added the "write interval" parameter
* (bluefox) Added the disabling of write multiple registers

### 3.0.3 (2020-06-05)
* (bluefox) Corrected error after refactoring

### 3.0.2 (2020-06-01)
* (compton-git) Decodes 0xFF00 as coil ON

### 3.0.1 (2020-01-23)
* (BlackBird77) Fixes for Serial Timeouts done
* (bluefox) Refactoring

### 3.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 2.0.9 (2018-10-11)
* (Bjoern3003) Write registers was corrected

### 2.0.7 (2018-07-02)
* (bluefox) The server mode was fixed

### 2.0.6 (2018-06-26)
* (bluefox) rtu-tcp master mode was fixed

### 2.0.3 (2018-06-16)
* (bluefox) Fixed the rounding of numbers

### 2.0.2 (2018-06-12)
* (bluefox) The error with blocks reading was fixed
* (bluefox) The block reading for discrete values was implemented

### 2.0.1 (2018-05-06)
* (bluefox) Added the support of multiple device IDs

### 1.1.1 (2018-04-15)
* (Apollon77) Optimize reconnect handling

### 1.1.0 (2018-01-23)
* (bluefox) Little endian strings added
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-20)
* (bluefox) Fixed read of coils

### 0.5.4 (2017-09-27)
* (Apollon77) Several Fixes

### 0.5.0 (2017-02-11)
* (bluefox) Create all states each after other

### 0.4.10 (2017-02-10)
* (Apollon77) Do not recreate all data points on start of adapter
* (ykuendig) Multiple optimization and wording fixes

### 0.4.9 (2016-12-20)
* (bluefox) fix serial RTU

### 0.4.8 (2016-12-15)
* (Apollon77) update serialport library for node 6.x compatibility

### 0.4.7 (2016-11-27)
* (bluefox) Use old version of jsmodbus

### 0.4.6 (2016-11-08)
* (bluefox) backward compatibility with 0.3.x

### 0.4.5 (2016-10-25)
* (bluefox) better buffer handling on tcp and serial

### 0.4.4 (2016-10-21)
* (bluefox) Fix write of holding registers

### 0.4.1 (2016-10-19)
* (bluefox) Support of ModBus RTU over serial and over TCP (only slave)

### 0.3.11 (2016-08-18)
* (Apollon77) Fix wrong byte count in loop

### 0.3.10 (2016-02-01)
* (bluefox) fix lost of history settings.

### 0.3.9 (2015-11-09)
* (bluefox) Use always write_multiple_registers by write of holding registers.

### 0.3.7 (2015-11-02)
* (bluefox) add special read/write mode if "Max read request length" is 1.

### 0.3.6 (2015-11-01)
* (bluefox) add cyclic write for holding registers (fix)

### 0.3.5 (2015-10-31)
* (bluefox) add cyclic write for holding registers

### 0.3.4 (2015-10-28)
* (bluefox) add doubles and fix uint64

### 0.3.3 (2015-10-27)
* (bluefox) fix holding registers

### 0.3.2 (2015-10-27)
* (bluefox) fix import from text file

### 0.3.1 (2015-10-26)
* (bluefox) fix error with length of read block (master)
* (bluefox) support of read blocks and maximal length of read request (master)
* (bluefox) can define fields by import

### 0.3.0 (2015-10-24)
* (bluefox) add round settings
* (bluefox) add deviceID
* (bluefox) slave supports floats, integers and strings

### 0.2.6 (2015-10-22)
* (bluefox) add different types for inputRegisters and for holding registers ONLY FOR MASTER

### 0.2.5 (2015-10-20)
* (bluefox) fix names of objects if aliases used

### 0.2.4 (2015-10-19)
* (bluefox) fix error add new values

### 0.2.3 (2015-10-15)
* (bluefox) fix error with master

### 0.2.2 (2015-10-14)
* (bluefox) implement slave
* (bluefox) change addressing model

### 0.0.1
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2024 Bluefox <dogafox@gmail.com>

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