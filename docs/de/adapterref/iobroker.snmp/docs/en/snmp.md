---
chapters: {"pages":{"en/adapterref/iobroker.snmp/README.md":{"title":{"en":"ioBroker.snmp"},"content":"en/adapterref/iobroker.snmp/README.md"},"en/adapterref/iobroker.snmp/docs/en/snmp.md":{"title":{"en":"SNMP adapter information"},"content":"en/adapterref/iobroker.snmp/docs/en/snmp.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.snmp/docs/en/snmp.md
title: SNMP-Adapterinformationen
hash: cLFiJbhXxj2TWJvVHjklYlA9BzgXN7cUf2IdAF8cXJQ=
---
# SNMP-Adapterinformationen

## allgemeine Informationen

Das Simple Network Management Protocol (SNMP) ist ein Internetstandardprotokoll zum Sammeln und Organisieren von Informationen über verwaltete Geräte in IP-Netzwerken und zum Ändern dieser Informationen, um das Geräteverhalten anzupassen. Zu den Geräten, die SNMP typischerweise unterstützen, gehören Kabelmodems, Router, Switches, Server, Workstations, Drucker und weitere.

SNMP wird in der Netzwerkverwaltung häufig zur Netzwerküberwachung eingesetzt. SNMP stellt Verwaltungsdaten in Form von Variablen auf den verwalteten Systemen bereit, die in einer Management Information Base (MIB) organisiert sind und den Systemstatus und die Konfiguration beschreiben. Diese Variablen können dann von Verwaltungsanwendungen remote abgefragt (und unter bestimmten Umständen auch manipuliert) werden.

Drei bedeutende Versionen von SNMP wurden entwickelt und eingesetzt. SNMPv1 ist die ursprüngliche Version des Protokolls. Neuere Versionen, SNMPv2c und SNMPv3, bieten Verbesserungen in Leistung, Flexibilität und Sicherheit. (Text entnommen aus Wikipedia, der freien Enzyklopädie)

Der SNMP-Adapter verwendet die sogenannten OIDs (Object Identifier), um diese Werte vom konfigurierten Gerät auszulesen.

## Konfiguration

Der Adapter fragt die angegebenen OIDs (Objektkennungen) ab, die in OID-Gruppen gruppiert und anschließend Geräten zugewiesen werden. Die Konfigurationsdaten werden auf mehreren Registerkarten in der Reihenfolge ihres Erscheinens eingegeben: zuerst die Geräte, dann die zugehörigen OIDs. Ein Gerät, dessen OID-Gruppe noch nicht existiert, kann gespeichert werden – der Adapter gibt in diesem Fall eine Warnung aus und überspringt das Gerät, bis dessen OIDs definiert wurden.

### TAB OID-Gruppen

Hier geben Sie alle OIDs an, die vom Adapter abgefragt werden sollen, eine OID pro Zeile.

<p align="center"><img src="img/snmp_tab_oids.jpg" width="600" /></p>

| Parameter    | Typ             | Beschreibung                                                     | Kommentar                                                                                                                     |
| ------------ | --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| aktiv        | boolescher Wert | Wenn auf „true“ gesetzt, wird OID verwendet.                     | kann verwendet werden, um eine einzelne OID zu deaktivieren.                                                                  |
| OID-Gruppe   | Text            | Name der OID-Gruppe                                              | wird verwendet, um einer Gruppe ein Gerät zuzuweisen.                                                                         |
| OID-Name     | Text            | Dem OID zugewiesener Name                                        | wird zur Benennung des Datenpunkts verwendet                                                                                  |
| OID          | Text            | oid string (1.2.3.4.)                                            | OID-Zeichenkette, wie vom Gerätehersteller angegeben                                                                          |
| Format       | wählen          | wie der Wert gespeichert wird                                    | Zeichenkette, Zahl, Boolescher Wert, JSON oder Automatisch – siehe _Format und Statustyp_ unten                               |
| beschreibbar | boolescher Wert | sollte auf „true“ gesetzt werden, wenn die OID beschreibbar ist. | Der Zustand wird beschreibbar gemacht und zurück auf das Gerät geschrieben (siehe _„Schreiben“_ unten).                       |
| optional     | boolescher Wert | sollte auf „true“ gesetzt werden, wenn OID optional ist.         | Wenn auf „true“ gesetzt, wird kein Fehler ausgelöst, wenn die OID unbekannt ist (Funktionalität nicht verfügbar mit SNMP V1). |

Sie können jede OID einfach durch Setzen des Aktivierungsflags aktivieren/deaktivieren. Beachten Sie, dass die ID des ioBroker-Status zum Speichern der gelesenen Daten normalerweise aus dem Gerätenamen (siehe Registerkarte „Geräte“) und dem hier angegebenen OID-Namen zusammengesetzt ist. Sie können Punkte innerhalb des OID-Namens verwenden, um eine Ordnerstruktur zu erstellen.

Falls einige OIDs nicht immer verfügbar sind, sollten Sie das optionale Flag setzen, um unnötige Fehler zu vermeiden. Bitte beachten Sie, dass dies die Verwendung von SNMP v2c oder SNMPv3 erfordert.

#### Format und Statusart

Das Format bestimmt, wie der gelesene Wert gespeichert wird und damit auch den Typ des ioBroker-Zustands:

| Format          | Bundeslandart   | Wert                                                                                                  |
| --------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| Zeichenkette    | Zeichenkette    | der Wert als Text                                                                                     |
| Nummer          | Nummer          | der numerische Wert; nicht-numerische Daten setzen die Qualität auf 0x01.                             |
| Boolescher Wert | boolescher Wert | false für 0 bzw. einen leeren Wert, true andernfalls                                                  |
| JSON            | Zeichenkette    | `{"type":"<type>","data":<value>}` sodass Skripte den Wert zusammen mit seinem Typ erhalten.          |
| Hex-Dump        | Zeichenkette    | die Bytes des Wertes als `76 01 04 00 27 10` Die Art und Weise, wie ein MIB-Browser Binärdaten anzeigt |
| Automatisch     | gemischt        | Der Typ entspricht dem SNMP-Typ des Wertes.                                                           |

**Ein Hex-Dump** ist für die Binärdaten gedacht, die manche Geräte als Antwort liefern – beispielsweise Wartungszähler eines Druckers. Ein solcher OctetString liest sich wie folgt: `vy'swz'tx{'u` Bei allen anderen Formaten ist dies nicht möglich, während der Hex-Dump die Verwendbarkeit erhält: Die Paare werden durch Leerzeichen getrennt, sodass `val.split(' ')` Ein Skript gibt die Bytes aus. Es funktioniert für OctetString, Opaque und Counter64 und gibt eine Ganzzahl als ihre eigene hexadezimale Darstellung wieder (10000 wird zu 10000). `27 10` Die Anfrage wird für eine OID oder eine IP-Adresse abgelehnt, da diese keine eigenen Bytes enthalten. Eine beschreibbare OID liefert einen Hex-Dump zurück, mit oder ohne Leerzeichen und mit oder ohne vorangestelltes Zeichen. `0x` Die

Bei **der automatischen** Einstellung wird ein Integer-Typ (Integer32, Counter32, Gauge32, TimeTicks, Counter64, …) zu einer Zahl, ein Boolean-Typ zu einem Boolean-Wert und alle anderen Typen (OctetString, OID, IpAddress, Opaque) zu einem String. Der Zustand wird wie folgt erstellt: `mixed` Da das Gerät entscheidet, was ankommt, wählen Sie eines der festen Formate, wenn ein Skript oder ein Diagramm einen festen Typ benötigt.

#### Vorlagen

Über der Tabelle tauscht **Templates** eine ganze OID-Gruppe als Datei aus, sodass ein einmal zusammengestellter Satz von OIDs wiederverwendet werden kann – auf einer anderen Instanz, auf einem zweiten Gerät desselben Typs oder von jemand anderem im Forum.

_Beim Speichern als Vorlage_ werden die OIDs der ausgewählten Gruppe in folgendes Verzeichnis geschrieben: `<group>.snmp-template.json` Die Gruppe selbst ist nicht Teil der Datei: Sie gehört zur Installation, nicht zur Geräteklasse, und wird beim Import erneut ausgewählt.

Der Import erfolgt über zwei Quellen: _Die mitgelieferte Vorlage_ enthält die mit dem Adapter mitgelieferten Sets, während die Option _„Aus Datei“_ eine Ihnen zugesandte Vorlage verwendet. Die Schaltfläche daneben fügt die OIDs der ausgewählten Gruppe hinzu; der Schalter dahinter wechselt in _den Modus „Ersetzen“_ , wodurch die bereits vorhandenen OIDs der Gruppe entfernt werden. Die Daten werden erst gespeichert, nachdem Sie im Dialogfeld auf „Speichern“ geklickt haben.

Geliefert werden `System` (die Systemgruppe, auf die jedes Gerät antwortet), `Interface 1` (die Zähler des ersten Ports eines Switches), `Host` (Betriebszeit, Speicher- und Prozessorlast eines Computers), `Printer` (Seitenzähler, Toner und Druckerstatus) und `UPS` (Akku und verbleibende Laufzeit). Sie verwenden die OIDs der Standard-MIBs – ein Gerät, das nur auf die MIB seines Herstellers antwortet, ist stattdessen mit dem MIB-Browser ausgestattet.

Eine Vorlage ist einfaches JSON und kann von Hand geschrieben werden:

```json
{
    "format": "snmp-template",
    "version": 1,
    "name": "Brother HL-L2350DW",
    "deviceClass": "network printer",
    "description": "what the template is good for",
    "mib": "Printer-MIB",
    "oids": [
        {
            "oidName": "pages",
            "oidOid": "1.3.6.1.2.1.43.10.2.1.4.1.1",
            "oidFormat": 1,
            "oidWriteable": false,
            "oidOptional": false
        }
    ]
}
```

`format` Und `name` müssen anwesend sein `oids` darf nicht leer sein und jeder Eintrag muss `oidName` Und `oidOid`; `deviceClass`, `description` Und `mib` werden beim Import angezeigt und sind optional. `oidFormat` ist das Format der Tabelle als Zahl - 0 Zeichenkette, 1 Zahl, 2 Boolescher Wert, 3 JSON, 4 Hex-Dump, 99 automatisch - und ein Eintrag ohne diese Angabe wird als automatisch interpretiert.

### TAB-Geräte

Hier legen Sie fest, welche Geräte abgefragt werden sollen.

Die Schaltfläche **„Gerät einrichten“** öffnet einen Assistenten, der Sie durch die drei Schritte führt, die für ein neues Gerät erforderlich sind: das Gerät selbst (Name, Adresse, SNMP-Version, Community), seine MIB-Dateien – die optional sind und direkt hochgeladen werden können – und die zu lesenden Werte. Im letzten Schritt wird das Gerät live ausgelesen, auch wenn es noch nicht gespeichert wurde. So können Sie die tatsächlich ausgelesenen Werte auswählen. Der Assistent schreibt das Gerät und seine OIDs in die Tabellen dieses Dialogfelds; das Speichern erfolgt über die Schaltfläche „Speichern“.

Die Schaltfläche **„Gerät einrichten“** öffnet einen Assistenten, der Sie durch die drei Schritte führt, die für ein neues Gerät erforderlich sind: das Gerät selbst (Name, Adresse, SNMP-Version, Community), seine MIB-Dateien – die optional sind und direkt hochgeladen werden können – und die zu lesenden Werte. Im letzten Schritt wird das Gerät live ausgelesen, auch wenn es noch nicht gespeichert wurde. So können Sie die tatsächlich ausgelesenen Werte auswählen. Der Assistent schreibt das Gerät und seine OIDs in die Tabellen dieses Dialogfelds; das Speichern erfolgt über die Schaltfläche „Speichern“.

<p align="center"><img src="img/snmp_tab_devices.jpg" width="600" /></p>

| Parameter                             | Typ             | Beschreibung                                                           | Kommentar                                                                                                                                                     |
| ------------------------------------- | --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aktiv                                 | boolescher Wert | Wenn auf „true“ gesetzt, wird das Gerät verwendet.                     | kann verwendet werden, um ein einzelnes Gerät zu deaktivieren                                                                                                 |
| Name                                  | Text            | Name des Geräts                                                        | wird verwendet, um Namen für Datenpunkte zu erstellen.                                                                                                        |
| IP-Adresse                            | Text            | IP-Adresse (IPv4 oder IPv6) oder Domänenname mit optionaler Portnummer | IPv4 1.2.3.4 oder 1.2.3.4:161, IPv6 2001:abcd::30ff, IPv6 \[2001:abcd::30ff] oder \[2001:abcd::30ff]:161, Domain myhost.domain.org oder myhost.domain.org:161 |
| IPv6                                  | boolescher Wert | Wenn IPv6 eingestellt ist, sollte es verwendet werden.                 |                                                                                                                                                               |
| OID-Gruppe                            | Text            | OID-Gruppe, die auf der Registerkarte „IOD-Gruppen“ angegeben ist      | Eine OID-Gruppe kann mehreren Geräten zugewiesen werden.                                                                                                      |
| SNMP-Version                          | wählen          | Zu verwendende SNMP-Version                                            |                                                                                                                                                               |
| Community (v1, v2c) oder Auth-ID (v3) | Text            | Community für SNMP v1 oder v2c, Autorisierungsgruppe für SNMP v3       |                                                                                                                                                               |
| Zeitüberschreitung (Sekunden)         | Nummer          | Verarbeitungs-Timeout in Sekunden                                      |                                                                                                                                                               |
| Wiederholung (Sek.)                   | Nummer          | Wiederholungsintervall in Sekunden                                     |                                                                                                                                                               |
| Umfrage (Sek.)                        | Nummer          | Abfrageintervall in Sekunden                                           |                                                                                                                                                               |

### TAB-Autorisierung

Dieser Tab enthält SNMP V3-Autorisierungsinformationen.

<p align=center><img src="img/snmp_tab_authorization.jpg" width="600" /></p>

| Parameter                 | Typ     | Beschreibung                       | Kommentar                                            |
| ------------------------- | ------- | ---------------------------------- | ---------------------------------------------------- |
| Name (ID)                 | Text    | ID der Autorisierungsdaten         | Die Auth-Id muss auf den Tab-Geräten übereinstimmen. |
| Sicherheitsstufe          | Auswahl | gewünschte Sicherheitsmethode      | Siehe Artikelbeschreibung                            |
| Benutzername              | Text    | Benutzername zur Authentifizierung |                                                      |
| Verfahren                 | Auswahl | Passwort-Hashing-Methode           | md5, sha, sha224, sha256, sha384 oder sha512         |
| Autorisierungsschlüssel   | Text    | Passwort zur Authentifizierung     |                                                      |
| Verschlüsselung           | Auswahl | Verschlüsselungsmethode            | des, aes, aes256b oder aes256r                       |
| Verschlüsselungsschlüssel | Text    | Verschlüsselungsschlüssel          |                                                      |

Beachten Sie, dass Name(id) eindeutig sein muss. Die Auth-Id eines Geräts auf der Registerkarte _„Geräte“_ muss mit einem dieser Namen übereinstimmen – führende und nachfolgende Leerzeichen werden ignoriert. Geräte, die SNMP v3 verwenden und deren Auth-Id keinem Namen entspricht, werden mit einer Warnung übersprungen, da der Adapter andernfalls ohne Benutzernamen fragen würde und das Gerät mit „Unbekannter Benutzername“ antworten würde, was keine Auskunft über die tatsächliche Ursache gibt.

Bei Auswahl des SNMP-V3-Protokolls ist eine erweiterte Authentifizierung erforderlich. Geben Sie bei den Geräten in der Spalte „Auth-Id“ den Namen eines Authentifizierungsblocks an. Auf dieser Registerkarte müssen Sie die gewünschte Sicherheitsstufe wie folgt auswählen:

- Minimum – nur ein Benutzername ist erforderlich.
- Authentifizierung – Benutzername und Passwort erforderlich
- Authentifizierung und Verschlüsselung – Benutzername, Passwort und Verschlüsselungsschlüssel sind erforderlich.

Bitte beachten Sie, dass das Zielgerät die angegebene Sicherheitsstufe unterstützen muss und Benutzername, Passwort und Verschlüsselungsschlüssel mit den auf dem Zielgerät eingegebenen Daten übereinstimmen müssen. Sie können denselben Autorisierungsblock für mehrere Geräte verwenden, sofern diese dieselben Daten verwenden.

### TAB MIB

Hier laden Sie die MIB-Dateien Ihrer Geräte hoch und durchsuchen deren Inhalte.

| Parameter   | Typ   | Beschreibung             | Kommentar                                                                                                    |
| ----------- | ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| MIB-Dateien | Datei | MIB-Dateien Ihrer Geräte | Alle hochgeladenen Dateien werden in einem Ordner gespeichert, sodass eine MIB eine andere importieren kann. |

Die mit dem Adapter gelieferten MIBs (SNMPv2-MIB, RFC1213-MIB, IF-MIB und die anderen SMI-Basismodule) sind immer verfügbar und müssen nicht hochgeladen werden.

<p align="center"><img src="img/snmp_tab_mib.jpg" width="600" /></p>

Unterhalb des Uploads zeigt der **MIB-Browser** das Gerät selbst an. Oben wählen Sie das **Gerät** aus, für das die OIDs erfasst werden – die zugehörige OID-Gruppe wird automatisch ausgefüllt, sodass Sie normalerweise keinen Gruppennamen eingeben müssen.

Die unten stehende Baumstruktur stellt stets das Gerät dar, das live und Ebene für Ebene ausgelesen wird: Die Start-OID gibt die erste Ebene an, das Öffnen eines Ordners liest dessen Inhalt. Es wird also nur das gelesen, was Sie tatsächlich betrachten, und Sie sehen die Werte, die tatsächlich existieren. Die hochgeladenen MIB-Dateien benennen diese Werte. `1.3.6.1.4.1.48690.10.2.1.2.1` wird `pName.1` Syntax, Zugriffsrechte und der Beschreibungstext werden als Tooltip angezeigt. Eine OID, die nicht von einer MIB abgedeckt wird, behält ihre Nummern. Die **MIB-** Modulliste springt zum Anfang einer MIB, sodass deren OID nicht bekannt sein muss; die Start-OID kann auch eingegeben werden.

Dies erfordert eine laufende Instanz, und das Gerät muss einmal gespeichert worden sein – ein Gerät, das nur im Dialogfeld existiert, kann noch nicht gelesen werden. Im Einrichtungsassistenten auf der Registerkarte _„Geräte“_ ist dies möglich, da dort das gesamte Gerät zusammen mit der Anfrage gesendet wird.

Ein aus einer Tabellenzeile gelesener Wert bringt seinen Index mit, sodass er unverändert übernommen wird. Eine Spalte selbst adressiert keinen Wert – sie ist markiert, und beim Öffnen werden die Zeilen angezeigt, aus denen der Wert ausgewählt werden kann. Ein Skalar wird übernommen als `<OID>.0`, wo SNMP seinen einzigen Wert speichert, und die `.0` wird wieder aus der Objekt-ID ausgelassen.

Die Plus-Schaltfläche einer Zeile fügt die entsprechende OID der darüber angezeigten OID-Gruppe hinzu. **„Alle hinzufügen“** fügt alle aktuell vom Filter angezeigten Einträge hinzu, und die Schaltfläche eines Ordners fügt alle Werte unterhalb des jeweiligen Knotens hinzu – die gesamte Tabelle mit einem Klick. Eine bereits in der Gruppe enthaltene OID wird mit einem Häkchen anstelle des Pluszeichens markiert, um ein doppeltes Hinzufügen zu verhindern. Der OID-Name wird aus der MIB übernommen, das Format ist auf _„automatisch“_ eingestellt und _die Schreibberechtigung_ wird aus der MAX-ACCESS-Klausel der MIB übernommen.

Die übliche Vorgehensweise für ein neues Gerät ist folgende: Erstellen Sie das Gerät mit seiner IP-Adresse auf der Registerkarte „ _Geräte“_ , laden Sie die zugehörige MIB-Datei hoch (falls vorhanden), wählen Sie das Gerät im MIB-Browser aus und legen Sie die gewünschten Werte fest – oder geben Sie die OIDs manuell auf der Registerkarte _„OID-Gruppen“_ ein. Solange die OID-Gruppe eines Geräts nicht mindestens eine aktive OID enthält, überspringt der Adapter dieses Gerät mit einer Warnung und läuft weiter, damit der MIB-Browser weiterhin die MIB-Dateien und das Gerät selbst lesen kann.

### TAB-Fallen

Eine Trap-Nachricht funktioniert in die andere Richtung: Das Gerät sendet sie selbstständig, sobald ein Ereignis eintritt – beispielsweise ein Port ausfällt, eine USV auf Akkubetrieb umschaltet oder dem Drucker das Papier ausgeht – und der Adapter empfängt diese Nachricht lediglich. Es findet keine Abfrage statt, sodass eine Trap-Nachricht genau dann ankommt, wenn sie eintrifft.

<p align=center><img src="img/snmp_tab_traps.jpg" width="600" /></p>

| Parameter                                      | Typ             | Beschreibung                                                             | Kommentar                                                                                            |
| ---------------------------------------------- | --------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Fallen empfangen                               | boolescher Wert | Öffne einen UDP-Socket und lausche auf Traps und Informs.                | Ohne ihn fragt der Adapter nur ab                                                                    |
| Hafen                                          | Nummer          | UDP-Port, auf dem gelauscht werden soll                                  | Geräte senden an Port 162; unter Linux kann ein Port unter 1024 nur vom Root-Benutzer belegt werden. |
| Bindungsadresse                                | Text            | Adresse dieses Hosts, auf dem zugehört werden soll                       | Empty hört auf jeder Schnittstelle zu.                                                               |
| IPv6 verwenden                                 | boolescher Wert | Lauschen Sie auf IPv6 statt auf IPv4                                     | Ein IPv4-Absender wird weiterhin erkannt, die Zuordnung `::ffff:` wird entfernt                       |
| Gemeinschaft                                   | Text            | Eine Community-Falle von SNMP v1 oder v2c muss mit sich führen           | Eine Falle mit einer anderen Community wird abgelehnt und protokolliert.                             |
| Autorisierungs-ID (SNMP v3)                    | Text            | ID eines Autorisierungssets, dessen Benutzer Traps senden darf           | Leer, wenn keine SNMP v3-Traps erwartet werden.                                                      |
| Akzeptiere jede Falle, ohne sie zu überprüfen. | boolescher Wert | Weder die Community noch der SNMP v3-Benutzer wird überprüft.            | Zur Einrichtung – jeder, der den Hafen erreicht, kann dann in die Staaten schreiben.                 |
| Akzeptieren Sie auch Fallen unbekannter Geräte | boolescher Wert | Verarbeite einen Trap, dessen Absender nicht als Gerät konfiguriert ist. | Eine solche Falle erreicht nur `info.trap.*`                                                          |

Eine Trap-Nachricht nennt kein Gerät, sie trifft einfach ein – die Absenderadresse bestimmt, zu welchem Gerät sie gehört. Traps von nicht konfigurierten Geräteadressen werden verworfen, es sei denn, die letzte Option ist aktiviert. Eine SNMPv1-Trap meldet zusätzlich die Adresse des zugehörigen Agenten. Diese wird verwendet, wenn der Absender selbst kein konfiguriertes Gerät ist – dies ermöglicht die Funktion eines Relays.

Eine Inform-Anfrage ist eine Falle, die bestätigt werden möchte; der Adapter beantwortet sie, bevor er sie verarbeitet, damit der Absender sie nicht wiederholt.

Beachten Sie, dass der Port erreichbar sein muss: Port 162 ist unter Linux ein privilegierter Port, und ein Container oder eine Firewall muss UDP-Verbindungen zulassen. Falls der Port nicht gebunden werden kann, wird der Grund im Log protokolliert.

### TAB-Optionen

Hier legen Sie einige allgemeine Optionen fest.

<p align=center><img src="img/snmp_tab_options.jpg" width="600" /></p>

| Parameter                                                   | Typ             | Beschreibung                                                                      | Kommentar                                                                                                                                           |
| ----------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paketgröße                                                  | ganze Zahl      | Maximale Anzahl von OIDs, die innerhalb einer einzelnen Anfrage gesendet werden   | Reduzieren Sie diesen Wert im Falle von ZU GROSSEN Fehlern.                                                                                         |
| Kompatibilitätsmodus                                        | boolescher Wert | Wenn diese Option aktiviert ist, basieren die Datenpunktnamen auf der IP-Adresse. | Hinweis: Veraltet – nicht mehr verwenden. Diese Option funktioniert nicht mit IPv6-Adressen. Wird möglicherweise in zukünftigen Versionen entfernt. |
| Die Sitzung darf bei einem Fehler nicht geschlossen werden. | boolescher Wert | Schließen und öffnen Sie die Lesesitzung eines Geräts nicht im Fehlerfall neu.    | Versuchen Sie Folgendes, wenn ein Gerät nach einer einzelnen fehlgeschlagenen Anfrage nicht mehr antwortet.                                         |
| MIB-Namen verwenden                                         | boolescher Wert | Das OID-Feld akzeptiert symbolische MIB-Namen, und die Objekt-IDs folgen der MIB. | Siehe unten. HINWEIS: Durch Aktivieren dieser Option werden die Objekt-IDs vorhandener OIDs geändert.                                               |
| Rohzustände hinzufügen                                      | boolescher Wert | einen zusätzlichen Zustand erstellen `<OID-name>-raw` pro OID                      | Die Variable \`varbind\` wird als JSON-Datei verwendet, um alle Formate abzudecken, die von den oben genannten Formaten nicht unterstützt werden.   |
| Füge Typenzustände hinzu                                    | boolescher Wert | einen zusätzlichen Zustand erstellen `<OID-name>-type` pro OID                     | der SNMP-Typ, mit dem das Gerät geantwortet hat, z.B. `OctetString`                                                                                  |
| Alle SNMP-Anfragen und -Antworten protokollieren            | boolescher Wert | Jede Anfrage und jede Antwort wird als JSON in das Protokoll geschrieben.         | Bei einem Supportfall wächst das Protokoll mit jeder Abfrage; schalten Sie es anschließend ab.                                                      |

Die Option „Paketgröße“ kann verwendet werden, um die Anzahl der in einer Anfrage abgefragten OIDs zu reduzieren. Je nach Zielgerät kann die Anzahl der mit einer Anfrage abgefragten OIDs begrenzt sein. In diesem Fall antwortet das Gerät möglicherweise mit dem Fehler „TOOBIG“. Versuchen Sie in diesem Fall, den Wert für die Option „Paketgröße“ zu verringern.

Die Option **„Sitzung bei Fehler nicht schließen“** sorgt dafür, dass die Lesesitzung eines Geräts auch bei fehlgeschlagenen Anfragen geöffnet bleibt. Normalerweise schließt der Adapter die Sitzung bei einem Fehler und öffnet für den nächsten Versuch eine neue, was für die meisten Geräte korrekt ist. Einige Geräte antworten jedoch nach einer solchen Wiederverbindung nicht mehr – aktivieren Sie in diesem Fall die Option.

Die Option **„Alle SNMP-Anfragen und -Antworten verfolgen“** schreibt jede vom Adapter gesendete Anfrage und jede empfangene Antwort als JSON-Datei in das Protokoll, gekennzeichnet mit einem Punkt. `[trace]` und das Gerät, zu dem es gehört:

```
[trace] [printer] get request ["1.3.6.1.2.1.43.11.1.1.9.1.1"]
[trace] [printer] get answer {"err":null,"varbinds":[{"oid":"1.3.6.1.2.1.43.11.1.1.9.1.1","type":2,"value":1200}]}
```

Es umfasst die Abfragen der Geräte, das Schreiben einer beschreibbaren OID und die Anfragen des MIB-Browsers. Binärdaten erscheinen als `{"type":"Buffer","data":[…]}` Dadurch geht beim Schreiben ins Protokoll nichts verloren. Die Zeilen werden auf Informationsebene geschrieben, sodass die Ablaufverfolgung erfasst werden kann, ohne die gesamte Instanz in den Debug-Modus zu versetzen. Da die Ablaufverfolgung jedoch mit jeder Abfrage zunimmt, sollte die Option nach Abschluss der Analyse deaktiviert werden.

Die Option **„MIB-Namen verwenden“** ändert zwei Dinge gleichzeitig. Die OID-Spalte der OID-Sätze akzeptiert dann auch einen symbolischen Namen wie z. B. `IF-MIB::ifDescr.1` (oder `ifDescr.1` Ohne das Modul), das der Adapter beim Start mithilfe der hochgeladenen MIB-Dateien in die numerische OID auflöst. Die ID des ioBroker-Status wird dann nicht mehr aus dem OID-Namen, sondern aus dem MIB-Symbol gebildet, sodass das obige Beispiel letztendlich zu folgendem Ergebnis führt: `snmp.0.<device>.ifDescr.1` anstatt `snmp.0.<device>.<OID-name>` Die

Achtung: Durch Aktivieren dieser Option ändern sich die Status-IDs aller OIDs, die von einer MIB abgedeckt werden. Die zuvor erstellten Objekte behalten ihre alten IDs und bleiben als verwaiste Objekte erhalten – löschen Sie sie manuell, falls sie nicht mehr benötigt werden. OIDs, die von keiner geladenen MIB abgedeckt werden, behalten ihren OID-Namen.

## Staaten und Objekte

Für jedes aktive Gerät erstellt der Adapter ein Geräteobjekt, einen Ordner. `info` mit dem Status dieses Geräts und einem Status pro aktiver OID der ihm zugewiesenen OID-Gruppe:

| Ausweis                           | Typ             | Rolle                | Bedeutung                                                                           |
| --------------------------------- | --------------- | -------------------- | ----------------------------------------------------------------------------------- |
| `snmp.<instance>.info.connection` | boolescher Wert | Indikator verbunden  | wahr, solange mindestens ein Gerät antwortet                                        |
| `<device>`                        | Gerät           | -                    | `common.statusStates` verweist auf die beiden unten stehenden Zustände              |
| `<device>.info.online`            | boolescher Wert | Indikator.Erreichbar | wahr, solange das Gerät antwortet                                                   |
| `<device>.info.error`             | boolescher Wert | Indikatorfehler      | Nach einem Fehler wahr, nach dem nächsten erfolgreichen Lesevorgang wieder falsch.  |
| `<device>.info.error_text`        | Zeichenkette    | Text                 | die Meldung des letzten Fehlers                                                     |
| `<device>.<OID-name>`             | siehe Format    | siehe unten          | Der Wert wird gelesen; Punkte im OID-Namen werden zu Ordnern                        |
| `<device>.<OID-name>-type`        | Zeichenkette    | Text                 | SNMP-Typ des Wertes, nur mit der Option _"Typ hinzufügen" Zustände_                 |
| `<device>.<OID-name>-raw`         | Zeichenkette    | json                 | Die Varbind-Funktion, wie sie ankam, nur mit der Option, _Rohzustände hinzuzufügen_ |

`<device>` ist der Name des Geräts; im Kompatibilitätsmodus ist es die IP-Adresse mit `_` anstatt `.` Diese IDs werden von Skripten und Diagrammen verwendet und ändern sich daher nicht – mit einer Ausnahme: die oben genannte Option _„MIB-Namensdokumente verwenden“_ .

Die Rolle des Wertzustands richtet sich nach seinem Typ, sodass eine Visualisierung weiß, was er ist:

| Bundeslandart                    | Nur lesen   | beschreibbar |
| -------------------------------- | ----------- | ------------ |
| Nummer                           | `value`     | `level`      |
| boolescher Wert                  | `indicator` | `switch`     |
| Zeichenkette                     | `text`      | `text`       |
| gemischt (Format _automatisch_ ) | `state`     | `state`      |

Mit aktiviertem Trap-Empfänger erhält jedes Gerät vier weitere Zustände, und der gleiche Satz existiert auch einmal unten. `info` die letzte Falle eines jeden Absenders halten:

| Ausweis                                     | Typ          | Rolle | Bedeutung                                                                             |
| ------------------------------------------- | ------------ | ----- | ------------------------------------------------------------------------------------- |
| `<device>.trap.oid`                         | Zeichenkette | Text  | numerischer Wert der letzten Falle                                                    |
| `<device>.trap.name`                        | Zeichenkette | Text  | das Symbol, das eine MIB ihr zuweist, die numerische OID, falls keine MIB sie abdeckt |
| `<device>.trap.json`                        | Zeichenkette | json  | die gesamte Falle mit all ihren Varbinds, siehe unten                                 |
| `<device>.trap.count`                       | Nummer       | Wert  | Traps, die seit dem Start der Instanz von diesem Gerät empfangen wurden               |
| `info.trap.address`                         | Zeichenkette | Text  | Adresse, von der die letzte Falle kam                                                 |
| `info.trap.oid` /`.name` /`.json` /`.count` |              |       | Gleiches gilt für die letzte Falle eines beliebigen Absenders.                        |

**Abonnieren `count` ** Auf eine Falle reagieren: Das ändert sich mit jeder einzelnen Falle, während `oid` Und `name` Der Zustand bleibt gleich, wenn sich ein Gerät wiederholt. Die anderen drei Zustände sind bereits geschrieben, wenn `count` Änderungen.

Die JSON-Datei enthält alle vom Trap gemeldeten Daten:

```json
{
    "oid": "1.3.6.1.6.3.1.1.5.3",
    "name": "IF-MIB::linkDown",
    "version": 1,
    "address": "192.168.1.2",
    "sender": "public",
    "inform": false,
    "upTime": 4,
    "enterprise": "1.3.6.1.4.1",
    "agentAddr": "192.168.1.2",
    "generic": 2,
    "specific": 0,
    "varbinds": [
        { "oid": "1.3.6.1.2.1.2.2.1.1.3", "name": "IF-MIB::ifIndex.3", "type": "Integer32", "value": 3 }
    ]
}
```

`version` ist 1, 2 oder 3, `sender` ist die Community bzw. der Benutzername, mit dem die Falle gesendet wurde, und `inform` sagt aus, ob es zur Kenntnis genommen werden musste. `enterprise`, `agentAddr`, `generic` Und `specific` Sie erscheinen nur bei einem SNMP v1-Trap – das sind die vier Felder, mit denen sich ein solcher Trap selbst beschreibt, und `oid` So definiert RFC 3584 sie, sodass ein v1- und ein v2c-Trap verglichen werden können. Die Varbinds sind in der Reihenfolge ihres Eintreffens aufgelistet, einschließlich der `sysUpTime.0` Und `snmpTrapOID.0` Ein SNMP v2c Trap beginnt mit; ihre Werte werden wie im Format _automatisch_ dekodiert.

### Qualität

Jeder Wert trägt den ioBroker-Qualitätscode, sodass ein Skript einen gültigen Wert von einem fehlenden unterscheiden kann:

| Qualität | Bedeutung                                                                                 |
| -------- | ----------------------------------------------------------------------------------------- |
| 0x00     | OK                                                                                        |
| 0x01     | Der Wert konnte nicht in das konfigurierte Format konvertiert werden.                     |
| 0x02     | Das Gerät hat nicht geantwortet (Zeitüberschreitung), der letzte Wert bleibt erhalten.    |
| 0x44     | Das Gerät meldete einen Fehler, der Wert wurde auf Null gesetzt.                          |
| 0x84     | Die OID existiert auf diesem Gerät nicht (NoSuchInstance), der Wert ist auf null gesetzt. |

### Schreiben

Eine als _beschreibbar_ gekennzeichnete OID erzeugt einen beschreibbaren Zustand, den der Adapter abonniert. Das Setzen dieser OID ohne vorherige Anmeldung ist nicht möglich. `ack` schreibt den Wert mit SNMP auf das Gerät. `set` Der Wert wird in den SNMP-Typ des zuletzt gelesenen Werts zurückkodiert, daher muss eine solche OID einmal gelesen worden sein, bevor sie geschrieben werden kann - bis dahin protokolliert der Adapter "kann nicht in nicht initialisierten Zustand schreiben".

## OID-Beispiele

Die Suche nach Hersteller und MIB ist in den meisten Fällen erfolgreich. Alternativ können Sie eine MIB-Browser-Software verwenden, um Ihr Zielgerät abzufragen, z. B. unter <https://www.ireasoning.com/mibbrowser.shtml>

### Drucker

Für die meisten Drucker existiert ein Standard (PRINTER MIB). <http://www.oidview.com/mibs/0/Printer-MIB.html>

Für den Samsung CLP320 Farblaser sind beispielsweise die folgenden OIDs gültig.

- Anzahl der gedruckten Seiten: 1.3.6.1.2.1.43.10.2.1.4.1.1
- Schwarzer Toner: 1.3.6.1.2.1.43.11.1.1.9.1.1
- Toner Cyan: 1.3.6.1.2.1.43.11.1.1.9.1.2
- Toner Magenta: 1.3.6.1.2.1.43.11.1.1.9.1.3
- Toner gelb: 1.3.6.1.2.1.43.11.1.1.9.1.4
- Life\_drum-Einheit: 1.3.6.1.2.1.43.11.1.1.9.1.7

### NAS-Systeme - Synology

Synology: SNMP ist auf Synology DiskStations standardmäßig deaktiviert und muss in der WebUI aktiviert werden. Wichtig ist, dass Port 161 standardmäßig verwendet wird und die Community korrekt eingestellt ist. In der Regel ist die Community „öffentlich“.

<https://global.download.synology.com/download/Document/MIBGuide/Synology_DiskStation_MIB_Guide.pdf>

### USV

Für APC USVs könnten Sie <https://www.opsview.com/resources/monitoring/blog/apc-ups-monitoring-useful-oids> besuchen.