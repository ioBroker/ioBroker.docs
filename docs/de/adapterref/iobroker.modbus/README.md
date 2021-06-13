---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: gNmu0hv+Aq+NEhK/K4rv7rBlSTc+rbgpabulbpGAzyI=
---
![Logo](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![Anzahl der Installationen](http://iobroker.live/badges/modbus-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.modbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.modbus.svg)

#iobroker.modbus
![Testen und freigeben](https://github.com/ioBroker/iobroker.modbus/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Implementierung von ModBus Slave und Master für ioBroker. Folgende Typen werden unterstützt:

- Modbus RTU über seriell (Master)
- Modbus RTU über TCP (Master)
- Modbus TCP (Slave, Master)

## Die Einstellungen
### Partner-IP-Adresse
IP-Adresse des Modbus-Partners.

### Hafen
TCP Port des Modbus-Partners bei Konfiguration als Master (Client) oder eigener Port bei Konfiguration als Slave (Server).

### Geräte ID
Modbus-Geräte-ID. Wichtig, wenn TCP/Modbus-Bridge verwendet wird.

### Art
Slave (Server) oder Master (Client).

### Aliasse als Adresse verwenden
Normalerweise können alle Register Adressen von 0 bis 65535 haben. Durch die Verwendung von Aliasen können Sie virtuelle Adressfelder für jeden Registertyp definieren. Normalerweise:

- diskrete Eingänge sind von 10001 bis 20000
- Spulen sind von 1 bis 1000
- Eingangsregister sind von 30001 bis 40000
- Halteregister sind von 40001 bis 60000

Jeder Alias wird intern auf eine Adresse gemappt, z.B. 30011 wird dem Eingangsregister 10 zugeordnet und so weiter.

### Adressen nicht an Wort ausrichten
Normalerweise sind die Spulen und die diskreten Eingangsadressen auf 16 Bit ausgerichtet. Gleiche Adressen von 3 bis 20 werden auf 0 bis 32 ausgerichtet.
Wenn diese Option aktiv ist, werden die Adressen nicht ausgerichtet.

### Round Real to
Wie viele Stellen nach dem Komma für Float und Doubles.

### Poll-Verzögerung
Zyklisches Poll-Intervall (Nur für Master relevant)

### Wiederverbindungszeit
Wiederverbindungsintervall (Nur für Master relevant)

### Pulszeit
Wenn Puls für Spulen verwendet wird, definiert dies das Intervall, wie lange der Puls ist.

### Max. Leseanforderungslänge
Maximale Länge des Befehls READ_MULTIPLE_REGISTERS als Anzahl der zu lesenden Register.

Einige Systeme erfordern eine erste "Schreibanforderung", um die Daten auf "Leseanforderung" zu liefern.
Sie können diesen Modus erzwingen, indem Sie die "Max. Leseanforderungslänge" auf 1 setzen.

**Hinweis:** Einige USB-Modbus-Lösungen (z. B. basierend auf socat) können Probleme haben, mit dem Serialport-npm-Modul zu arbeiten.

Es gibt ein Software-[**Modbus RTU <-> Modbus RTU über TCP**](http://mbus.sourceforge.net/index.html) Gateway, um die Verwendung des seriellen RTU über das TCP-Protokoll zu ermöglichen.

Beide Lösungen **RTU over TCP** und **TCP** funktionieren gut.

### Verwenden Sie nicht mehrere Register
Wenn der Slave den Befehl "Mehrere Register schreiben" nicht unterstützt, können Sie ihn aktivieren, um Warnungen zu erhalten, wenn mehrere Register geschrieben werden.

### Schreibintervall
Verzögerung zwischen zwei Schreibanforderungen in ms. Standard 0.

## Parameter für einzelne Adresszeile in der Konfiguration
### Adresse
Zu lesende Modbus-Adresse

### Slave-ID
Falls es mehrere Slaves gibt, ist dies die ID, wenn nicht die Standard-ID, die in der globalen Konfiguration angegeben ist

### Name
Dies ist der Name für den Parameter

### Beschreibung
Parameterbeschreibung

###Einheit
Einheit des Parameters

### Art
Datentyp, der vom Bus gelesen werden soll. Details zu den möglichen Datentypen finden Sie im Abschnitt Datentypen

### Länge
Länge des Parameters. Bei den meisten Parametern wird dies anhand des Datentyps bestimmt, bei Strings jedoch die Länge in Bytes / Zeichen

### Faktor
Dieser Faktor wird verwendet, um den gelesenen Wert vom Bus für die statische Skalierung zu multiplizieren. Die Berechnung sieht also wie folgt aus val = x * Factor + Offset

### Offset
Dieser Offset wird nach obiger Multiplikation zum gelesenen Wert addiert. Die Berechnung sieht also wie folgt aus val = x * Factor + Offset

###Formel
Dieses Feld kann für erweiterte Berechnungen verwendet werden, wenn Faktor und Offset nicht ausreichen. Wenn dieses Feld gesetzt ist, werden die Felder Faktor und Offset ignoriert.
Die Formel wird von der Funktion eval() ausgeführt. Daher werden alle gängigen Funktionen unterstützt. Vor allem die Math-Funktionen. Die Formel muss der Javascript-Syntax entsprechen, achten Sie daher auch auf Groß- und Kleinschreibung.

In der Formel muss "x" für den gelesenen Wert von Modbus verwendet werden. Z.B. `x * Math.pow(10, sf['40065'])`

Kann die Formel zur Laufzeit nicht ausgewertet werden, schreibt der Adapter eine Warnmeldung in das Protokoll.

Ein weiterer Anwendungsfall für Formeln könnte auch sein, unplausible Daten mit einer Formel wie "x > 2000000 ? null : x" zu verhindern.

###Rolle
ioBroker-Rolle zuzuweisen.

### Zimmer
ioBroker-Raum zuzuweisen.

###Umfrage
Wenn aktiviert, werden die Werte in vordefinierten Intervallen vom Slave abgefragt.

### WP
Schreibimpuls

### CW
Zyklisches Schreiben

###SF
Wert als Skalierungsfaktor verwenden. Dies ist erforderlich, um dynamische Skalierungsfaktoren zu verwenden, die auf einigen Systemen durch Werte auf der Schnittstelle bereitgestellt werden. Wenn ein Wert mit diesem Flac gekennzeichnet ist, wird der Wert in einer Variablen mit folgender Namenskonvention gespeichert: sf['Modbus_Adresse']. Diese Variable kann dann später in jeder Formel für andere Parameter verwendet werden. Z.B. folgende Formel kann gesetzt werden: "(x * sf['40065']) + 50;"

## Datentypen
- uint16be - Unsigned 16 bit (Big Endian): AABB => AABB
- uint16le - Unsigned 16 bit (Little Endian): AABB => BBAA
- int16be - Vorzeichenbehaftete 16 Bit (Big Endian): AABB => AABB
- int16le - 16 Bit mit Vorzeichen (Little Endian): AABB => BBAA
- uint32be - Unsigned 32 bit (Big Endian): AABBCCDD => AABBCCDD
- uint32le - Unsigned 32 bit (Little Endian): AABBCCDD => DDCCBBAA
- uint32sw - Unsigned 32 bit (Big Endian Word Swap): AABBCCDD => CCDDAABB
- uint32sb - Unsigned 32 bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- int32be - 32 Bit mit Vorzeichen (Big Endian): AABBCCDD => AABBCCDD
- int32le - 32 Bit mit Vorzeichen (Little Endian): ABBCCDD => DDCCBBAA
- int32sw - 32 Bit mit Vorzeichen (Big Endian Word Swap): AABBCCDD => CCDDAABB
- int32sb - 32 Bit mit Vorzeichen (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- uint64be - Unsigned 64 bit (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- uint64le - Unsigned 64 bit (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- uint8be - Unsigned 8 bit (Big Endian): AA => AA
- uint8le - Unsigned 8 bit (Little Endian): AA => AA
- int8be - 8 Bit mit Vorzeichen (Big Endian): AA => AA
- int8le - 8 Bit mit Vorzeichen (Little Endian): AA => AA
- floatbe - Float (Big Endian): AABBCCDD => AABBCCDD
- floatle - Float (Little Endian): AABBCCDD => DDCCBBAA
- floatsw - Float (Big Endian Word Swap): AABBCCDD => CCDDAABB
- floatsb - Float (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- doublebe - Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- doublele - Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- string - String (Null-Ende): ABCDEF\0 => ABCDEF\0
- stringle - String (Little Endian, Zero-End): BADCFE\0 => ABCDEF\0

Folgende Beschreibung wurde aus [Hier](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/) kopiert

Das Punkt-zu-Punkt-Modbus-Protokoll ist eine beliebte Wahl für die RTU-Kommunikation, wenn es nicht aus anderen Gründen als grundlegender Komfort dient. Das Protokoll selbst steuert die Interaktionen jedes Geräts in einem Modbus-Netzwerk, wie das Gerät eine bekannte Adresse aufbaut, wie jedes Gerät seine Nachrichten erkennt und wie grundlegende Informationen aus den Daten extrahiert werden. Im Wesentlichen ist das Protokoll die Grundlage des gesamten Modbus-Netzwerks.

Dieser Komfort ist jedoch nicht ohne Komplikationen und das Modbus RTU Message-Protokoll ist keine Ausnahme. Das Protokoll selbst wurde auf Basis von Geräten mit 16-Bit-Registerlänge entwickelt. Folglich waren bei der Implementierung von 32-Bit-Datenelementen besondere Überlegungen erforderlich. Diese Implementierung entschied sich für die Verwendung von zwei aufeinanderfolgenden 16-Bit-Registern, um 32 Datenbits oder im Wesentlichen 4 Datenbytes darzustellen. Innerhalb dieser 4 Datenbytes können Gleitkommadaten mit einfacher Genauigkeit in eine Modbus RTU-Nachricht codiert werden.

### Die Bedeutung der Byte-Reihenfolge
Modbus selbst definiert keinen Gleitkomma-Datentyp, aber es wird allgemein akzeptiert, dass es 32-Bit-Gleitkommadaten unter Verwendung des IEEE-754-Standards implementiert. Der IEEE-Standard hat jedoch keine eindeutige Definition der Byte-Reihenfolge der Datennutzlast. Daher ist die wichtigste Überlegung beim Umgang mit 32-Bit-Daten, dass die Daten in der richtigen Reihenfolge adressiert werden.

Die Zahl 123/456.00, wie sie im IEEE 754-Standard für 32-Bit-Gleitkommazahlen mit einfacher Genauigkeit definiert ist, sieht beispielsweise wie folgt aus:

![Bild1](../../../en/adapterref/iobroker.modbus/img/img1.png)

Die Auswirkungen verschiedener Byte-Anordnungen sind signifikant. Zum Beispiel wird die Anordnung der 4 Datenbytes, die 123456.00 darstellen, in einer „B A D C“-Sequenz als „Byte-Swap“ bezeichnet. Bei der Interpretation als IEEE 744 Gleitkomma-Datentyp sieht das Ergebnis ganz anders aus:

![Bild2](../../../en/adapterref/iobroker.modbus/img/img2.png)

Das Anordnen derselben Bytes in einer „C D A B“-Sequenz wird als „Worttausch“ bezeichnet. Auch hier weichen die Ergebnisse drastisch vom ursprünglichen Wert von 123456,00 ab:

![Bild3](../../../en/adapterref/iobroker.modbus/img/img3.png)

Darüber hinaus würden sowohl ein „Byte-Swap“ als auch ein „Wort-Swap“ die Reihenfolge der Bytes im Wesentlichen umkehren, um ein weiteres Ergebnis zu erzielen:

![Bild4](../../../en/adapterref/iobroker.modbus/img/img4.png)

Natürlich muss bei der Verwendung von Netzwerkprotokollen wie Modbus streng darauf geachtet werden, wie die Bytes des Speichers bei der Übertragung angeordnet sind, auch bekannt als „Byte-Reihenfolge“.

### Byte-Reihenfolge bestimmen
Das Modbus-Protokoll selbst ist gemäß der Modbus Application Protocol Specification, V1.1.b, als „Big-Endian“-Protokoll deklariert:

```Modbus uses a “big-Endian” representation for addresses and data items. This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.```

Big-Endian ist das am häufigsten verwendete Format für Netzwerkprotokolle – so verbreitet, dass es auch als „Netzwerkreihenfolge“ bezeichnet wird.

Da das Modbus RTU-Nachrichtenprotokoll Big-Endian ist, muss für den erfolgreichen Austausch eines 32-Bit-Datentyps über eine Modbus RTU-Nachricht die Endianness sowohl des Masters als auch des Slaves berücksichtigt werden. Viele RTU-Master- und -Slave-Geräte erlauben eine gezielte Auswahl der Byte-Reihenfolge, insbesondere bei Software-simulierten Einheiten. Es muss lediglich sichergestellt werden, dass beide Einheiten auf die gleiche Byte-Reihenfolge eingestellt sind.

Als Faustregel gilt, dass die Familie des Mikroprozessors eines Geräts seine Endianness bestimmt. Typischerweise findet sich der Big-Endian-Stil (das höherwertige Byte wird zuerst gespeichert, gefolgt vom niederwertigen Byte) im Allgemeinen in CPUs, die mit einem Motorola-Prozessor ausgestattet sind. Der Little-Endian-Stil (das niederwertige Byte wird zuerst gespeichert, dann das höherwertige Byte) findet sich im Allgemeinen in CPUs mit der Intel-Architektur. Es ist eine Frage der persönlichen Perspektive, welcher Stil als „rückständig“ gilt.

Wenn Byte-Reihenfolge und Endianness jedoch keine konfigurierbare Option sind, müssen Sie festlegen, wie das Byte interpretiert wird. Dazu kann ein bekannter Gleitkommawert vom Slave angefordert werden. Wenn ein unmöglicher Wert zurückgegeben wird, d. h. eine Zahl mit einem zweistelligen Exponenten oder dergleichen, muss die Byte-Reihenfolge höchstwahrscheinlich geändert werden.

### Praktische Hilfe
Die FieldServer Modbus RTU-Treiber bieten mehrere Funktionsverschiebungen, die 32-Bit-Ganzzahlen und 32-Bit-Floatwerte verarbeiten. Noch wichtiger ist, dass diese Funktionsbewegungen alle verschiedenen Formen der Bytesequenzierung berücksichtigen. Die folgende Tabelle zeigt die Verschiebungen der FieldServer-Funktion, die zwei benachbarte 16-Bit-Register in einen 32-Bit-Ganzzahlwert kopieren.

| Funktionsschlüsselwort | Wechselmodus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | k.A. | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.i32-s | Byte- und Worttausch | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.i32-sb | Byte-Swap | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.i32-sw | Wortwechsel | [ a b ] [ c d ] | [ c d a b ] |

Die folgende Tabelle zeigt die Verschiebungen der FieldServer-Funktion, die zwei benachbarte 16-Bit-Register in einen 32-Bit-Gleitkommawert kopieren:

| Funktionsschlüsselwort | Wechselmodus | Quellbytes | Zielbytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | k.A. | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.ifloat-s | Byte- und Worttausch | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.ifloat-sb | Byte-Swap | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.ifloat-sw | Wortwechsel | [ a b ] [ c d ] | [ c d a b ] |

Die folgende Tabelle zeigt die Verschiebungen der FieldServer-Funktion, die einen einzelnen 32-Bit-Gleitkommawert in zwei benachbarte 16-Bit-Register kopieren:

| Funktionsschlüsselwort | Wechselmodus | Quellbytes | Zielbytes |
|------------------|-------------------|-----------------|----------------|
| 1.float-2.i16 |N/A | [ a b ] [ c d ] | [ a b ][ c d ] |
| 1.float-2.i16-s |Byte- und Worttausch | [ a b ] [ c d ] | [ d c ][ b a ] |
| 1.float-2.i16-sb |Byte-Swap | [ a b ] [ c d ] | [ b a ][ d c ] |
| 1.float-2.i16-sw |Worttausch | [ a b ] [ c d ] | [ c d ][ a b ] |

Angesichts der verschiedenen FieldServer-Funktionsbewegungen hängt die korrekte Handhabung von 32-Bit-Daten von der Auswahl der richtigen ab. Beobachten Sie das folgende Verhalten dieser FieldServer-Funktionsbewegungen auf dem bekannten dezimalen Gleitkommawert mit einfacher Genauigkeit von 123456.00:

|16-Bit-Werte | Funktion Verschieben | Ergebnis | Funktion Verschieben | Ergebnis |
|---------------|-------------------|-----------|-------------------|---------------|
|0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.float-2.i16 | 0x2000 0x47F1 |
|0xF147 0x0020 | 2.i16-1.float-s | 123456.00 | 1.float-2.i16-s | 0xF147 0X0020 |
|0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.float-2.i16-sb | 0x0020 0xF147 |
|0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

Beachten Sie, dass unterschiedliche Byte- und Wortreihenfolgen die Verwendung der entsprechenden FieldServer-Funktionsverschiebung erfordern. Sobald die richtige Funktion Move ausgewählt ist, können die Daten in beide Richtungen konvertiert werden.

Von den vielen Hex-zu-Gleitkomma-Umsetzern und -Rechnern, die im Internet verfügbar sind, erlauben nur sehr wenige tatsächlich eine Manipulation der Byte- und Wortreihenfolge. Ein solches Dienstprogramm befindet sich unter www.61131.com/download.htm, wo sowohl Linux- als auch Windows-Versionen der Dienstprogramme heruntergeladen werden können. Nach der Installation wird das Dienstprogramm als ausführbare Datei mit einer einzigen Dialogschnittstelle ausgeführt. Das Dienstprogramm stellt den dezimalen Gleitkommawert von 123456.00 wie folgt dar:

![Bild5](../../../en/adapterref/iobroker.modbus/img/img5.png)

Anschließend können Bytes und/oder Wörter ausgetauscht werden, um zu analysieren, welche potenziellen Endianness-Probleme zwischen Modbus RTU-Master- und -Slave-Geräten bestehen können.

## Prüfung
Im Ordner *test' befinden sich einige Programme zum Testen der TCP-Kommunikation:

- Ananas32/64 ist Slave-Simulator (nur Halteregister und Eingänge, keine Spulen und digitale Eingänge)
- RMMS ist Mastersimulator
- mod_RSsim.exe ist ein Slave-Simulator. Es kann sein, dass Sie [Microsoft Visual C++ 2008 SP1 Redistributable Package](https://www.microsoft.com/en-us/download/details.aspx?id=5582) benötigen, um es zu starten (wegen eines SideBySide-Fehlers).

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->

## Changelog
### __WORK IN PROGRESS__
* (nkleber78) Corrected issue with the scale factors
* (bluefox) New react GUI added
* (bluefox) Add new option: Use only Write multiple registers

### 3.3.1 (2021-05-10)
* (bluefox) fixed the configuration dialog for "input registers" in slave mode 

### 3.3.0 (2021-04-16)
* (Apollon77) Allow to use write-only (no poll) states
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
* (bluefox) Added the write interval parameter
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
* (Apollon77) Do not recreate all datapoints on start of adapter
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

Copyright (c) 2015-2021 Bluefox <dogafox@gmail.com>

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